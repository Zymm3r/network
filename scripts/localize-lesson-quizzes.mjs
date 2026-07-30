import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const seedPath = resolve(root, 'supabase', 'seed.sql');
const localizationPath = resolve(root, 'supabase', 'quiz-options-th.json');

const technicalLiteralNames = new Set([
  '[10,000,000 / Bandwidth + Delay] × 256',
  'DoS / DDoS',
  'IANA / RIRs',
  'OpenSSL',
  'Syslog',
  'WinPcap / Npcap',
  'X-Auth-Token',
  'vEdge',
  'vManage',
]);

const technicalCommandPattern = /^(?:area|crypto|debug|def|delete_|discard_|distribute-list|dns$|domain-name-service$|ebgp-multihop|execute_|filter-list|get_|git|http$|interface|ip|json=|logging|monitor|neighbor|no debug|params=|payload=|port |push_|redistribute|requests\.|retrieve_|rollback\(|route-filter|router|run |send_|service|show|stop debugging|summary-address|switchport|track|undebug|write_)/i;

function isTechnicalLiteral(value) {
  const option = value.trim();
  if (!/[A-Za-z]/.test(option)) return true;
  if (/^[A-Z0-9_./ -]+$/.test(option)) return true;
  if (technicalLiteralNames.has(option)) return true;
  if (technicalCommandPattern.test(option)) return true;
  if (/^\/|[<>=;]|->|\w+\(\)|\.cfg$|^[A-Za-z][A-Za-z0-9]*_[A-Za-z0-9_]+$/.test(option)) return true;
  return false;
}

function localSupabaseEnvironment() {
  const supabaseCommand = process.platform === 'win32' ? 'npx supabase@2.75.0' : 'supabase';
  const output = execSync(`${supabaseCommand} status -o env`, {
    cwd: root,
    encoding: 'utf8',
    shell: process.platform === 'win32' ? 'powershell.exe' : '/bin/sh',
  });
  return Object.fromEntries(
    output.split(/\r?\n/).flatMap(line => {
      const match = line.match(/^([A-Z_]+)="(.*)"$/);
      return match ? [[match[1], match[2]]] : [];
    }),
  );
}

async function loadQuizzes() {
  const local = localSupabaseEnvironment();
  const apiUrl = process.env.SUPABASE_URL || local.API_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || local.SERVICE_ROLE_KEY;
  const response = await fetch(
    `${apiUrl}/rest/v1/lessons?select=id,title_th,title_en,quiz_data&quiz_data=not.is.null&order=id`,
    { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
  );
  if (!response.ok) throw new Error(`Could not load lessons: ${response.status} ${await response.text()}`);
  return response.json();
}

function optionLength(value) {
  return [...value.replace(/[\s\p{P}\p{S}]/gu, '')].length;
}

function qualityProblems(question, optionsTh) {
  const problems = [];
  if (!Array.isArray(optionsTh) || optionsTh.length !== question.options.length) {
    return [`expected ${question.options.length} options`];
  }
  if (optionsTh.some(option => typeof option !== 'string' || option.trim().length === 0)) {
    problems.push('contains an empty option');
  }
  if (new Set(optionsTh.map(option => option.trim().toLocaleLowerCase('th'))).size !== optionsTh.length) {
    problems.push('contains duplicate options');
  }
  if (optionsTh.some(option => /^(?:ข้อ\s*)?[ก-ฮA-D][.)]\s*/u.test(option))) {
    problems.push('contains answer labels');
  }
  const untranslated = optionsTh.filter(option => (
    !/[\u0E00-\u0E7F]/u.test(option) && !isTechnicalLiteral(option)
  ));
  if (untranslated.length > 0) {
    problems.push(`contains untranslated prose: ${untranslated.join(' | ')}`);
  }
  const lengths = optionsTh.map(optionLength);
  const correctLength = lengths[question.correct_index];
  const longestDistractor = Math.max(...lengths.filter((_, index) => index !== question.correct_index));
  if (correctLength - longestDistractor > 6 && correctLength > longestDistractor * 1.2) {
    problems.push(`correct option is materially longer than distractors (${lengths.join(', ')})`);
  }
  return problems;
}

function localizationByKey() {
  const localizations = JSON.parse(readFileSync(localizationPath, 'utf8'));
  return {
    localizations,
    byKey: new Map(localizations.map(entry => [`${entry.lesson_id}:${entry.question_no}`, entry.options_th])),
  };
}

function sqlString(value) {
  return `'${value.replaceAll("'", "''")}'`;
}

function findQuizJsonLiterals(seed) {
  const matches = [];
  const pattern = /'(\{"questions":\s*\[.*?\]\})', NULL\)/gs;
  for (const match of seed.matchAll(pattern)) {
    const decoded = match[1].replaceAll("''", "'");
    try {
      const quiz = JSON.parse(decoded);
      if (Array.isArray(quiz.questions)) {
        matches.push({ start: match.index + 1, end: match.index + 1 + match[1].length, quiz });
      }
    } catch {
      // Ignore non-JSON SQL string literals.
    }
  }
  return matches;
}

async function applyLocalization(migrationPath) {
  const lessons = await loadQuizzes();
  const { localizations, byKey } = localizationByKey();
  if (byKey.size !== 365) throw new Error(`Expected 365 localizations, found ${byKey.size}`);

  const firstQuestionToLesson = new Map(lessons.map(lesson => [lesson.quiz_data.questions[0].question_en, lesson]));
  const seed = readFileSync(seedPath, 'utf8');
  const literals = findQuizJsonLiterals(seed);
  if (literals.length !== 73) throw new Error(`Expected 73 quiz literals in seed.sql, found ${literals.length}`);

  let updatedSeed = seed;
  for (const literal of literals.reverse()) {
    const lesson = firstQuestionToLesson.get(literal.quiz.questions[0].question_en);
    if (!lesson) throw new Error(`Could not identify seed quiz: ${literal.quiz.questions[0].question_en}`);
    const updatedQuiz = structuredClone(literal.quiz);
    updatedQuiz.questions.forEach((question, questionNo) => {
      question.options_th = byKey.get(`${lesson.id}:${questionNo}`);
    });
    const encoded = JSON.stringify(updatedQuiz).replaceAll("'", "''");
    updatedSeed = `${updatedSeed.slice(0, literal.start)}${encoded}${updatedSeed.slice(literal.end)}`;
  }
  writeFileSync(seedPath, updatedSeed);

  const values = localizations.map(entry => (
    `  (${sqlString(entry.lesson_id)}, ${entry.question_no}, ${sqlString(JSON.stringify(entry.options_th))}::jsonb)`
  )).join(',\n');
  const migration = `-- Localize lesson quiz choices while preserving the English source options.\n` +
`WITH localized(lesson_id, question_no, options_th) AS (\nVALUES\n${values}\n),\n` +
`rebuilt AS (\n  SELECT l.id, jsonb_set(\n    l.quiz_data,\n    '{questions}',\n    jsonb_agg(\n` +
`      CASE WHEN localized.options_th IS NULL THEN question.value\n` +
`           ELSE jsonb_set(question.value, '{options_th}', localized.options_th, true) END\n` +
`      ORDER BY question.ordinality\n    )\n  ) AS quiz_data\n  FROM public.lessons l\n` +
`  CROSS JOIN LATERAL jsonb_array_elements(l.quiz_data -> 'questions')\n` +
`    WITH ORDINALITY AS question(value, ordinality)\n` +
`  LEFT JOIN localized ON localized.lesson_id = l.id\n` +
`    AND localized.question_no = question.ordinality - 1\n` +
`  WHERE l.quiz_data IS NOT NULL\n  GROUP BY l.id, l.quiz_data\n)\n` +
`UPDATE public.lessons AS lesson\nSET quiz_data = rebuilt.quiz_data, updated_at = now()\n` +
`FROM rebuilt\nWHERE lesson.id = rebuilt.id;\n\n` +
`ALTER TABLE public.lessons\n  DROP CONSTRAINT IF EXISTS lessons_quiz_options_th_check;\n\n` +
`ALTER TABLE public.lessons\n  ADD CONSTRAINT lessons_quiz_options_th_check CHECK (\n` +
`    quiz_data IS NULL OR NOT jsonb_path_exists(\n      quiz_data,\n` +
`      '$.questions[*] ? (!exists(@.options_th) || @.options_th.type() != "array" || @.options_th.size() != @.options.size())'\n` +
`    )\n  ) NOT VALID;\n\n` +
`ALTER TABLE public.lessons\n  VALIDATE CONSTRAINT lessons_quiz_options_th_check;\n`;
  writeFileSync(resolve(root, migrationPath), migration);
}

async function collectProblems() {
  const lessons = await loadQuizzes();
  const { byKey } = localizationByKey();
  return {
    lessons,
    count: byKey.size,
    problems: lessons.flatMap(lesson => lesson.quiz_data.questions.flatMap((question, questionNo) => {
      const optionsTh = byKey.get(`${lesson.id}:${questionNo}`);
      const issues = qualityProblems(question, optionsTh);
      if (JSON.stringify(question.options_th) !== JSON.stringify(optionsTh)) {
        issues.unshift('database options_th differs from canonical localization');
      }
      return issues.length === 0 ? [] : [{
        lesson_id: lesson.id,
        lesson_title_th: lesson.title_th,
        question_no: questionNo,
        question_th: question.question_th,
        options_en: question.options,
        options_th: optionsTh,
        correct_index: question.correct_index,
        issues,
      }];
    })),
  };
}

async function validateLocalization() {
  const { lessons, count, problems } = await collectProblems();
  console.log(`Validated ${lessons.length} lessons, ${count} questions, ${problems.length} problems.`);
  if (problems.length > 0) {
    console.log(problems.map(problem => (
      `${problem.lesson_id}:${problem.question_no}: ${problem.issues.join('; ')}`
    )).join('\n'));
    process.exitCode = 1;
  }
}

async function exportProblems(targetPath) {
  const { problems } = await collectProblems();
  writeFileSync(resolve(root, targetPath), `${JSON.stringify(problems, null, 2)}\n`);
  console.log(`Exported ${problems.length} problems to ${targetPath}.`);
}

const [command, argument] = process.argv.slice(2);
if (command === 'validate') await validateLocalization();
else if (command === 'problems' && argument) await exportProblems(argument);
else if (command === 'apply' && argument) await applyLocalization(argument);
else throw new Error('Usage: node scripts/localize-lesson-quizzes.mjs validate | problems <path> | apply <migration-path>');
