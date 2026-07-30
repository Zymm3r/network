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

const preferredTechnicalTerms = new Map([
  ['Dijkstra SPF', 'Dijkstra SPF'],
  ['Bellman-Ford', 'Bellman-Ford'],
  ['DUAL (Diffusing Update Algorithm)', 'DUAL'],
  ['Path Vector', 'Path Vector'],
  ['Classic Mode', 'Classic Mode'],
  ['Named EIGRP Mode', 'Named EIGRP Mode'],
  ['Autonomous System Mode', 'Autonomous System Mode'],
  ['Global Config Mode', 'Global Configuration Mode'],
  ['K1 and K2', 'K1 และ K2'],
  ['K1 and K3', 'K1 และ K3'],
  ['K2 and K4', 'K2 และ K4'],
  ['K3 and K5', 'K3 และ K5'],
  ['Route Maps', 'Route Map'],
  ['Distribute Lists', 'Distribute List'],
  ['Prefix Lists', 'Prefix List'],
  ['Access List', 'Access List'],
  ['Prefix List', 'Prefix List'],
  ['AS Path Access List (ip as-path access-list)', 'AS Path Access List'],
  ['Distribute List', 'Distribute List'],
  ['Link State', 'Link State'],
  ['Distance Vector', 'Distance Vector'],
  ['Hybrid', 'Hybrid'],
  ['Local Preference', 'Local Preference'],
  ['Weight', 'Weight'],
  ['MED', 'MED'],
  ['MED (Multi-Exit Discriminator)', 'MED (Multi-Exit Discriminator)'],
  ['Origin', 'Origin'],
  ['Highest Local Preference', 'Local Preference สูงสุด'],
  ['Highest Weight (Cisco)', 'Weight สูงสุด (Cisco)'],
  ['Shortest AS_PATH', 'AS_PATH สั้นที่สุด'],
  ['Lowest MED', 'MED ต่ำสุด'],
  ['VTP Server', 'VTP Server'],
  ['VTP Client', 'VTP Client'],
  ['VTP Transparent', 'VTP Transparent'],
  ['VTP Off', 'ปิด VTP'],
  ['VTP Pruning', 'VTP Pruning'],
  ['Port Security', 'Port Security'],
  ['DHCP Snooping', 'DHCP Snooping'],
  ['Dynamic ARP Inspection', 'Dynamic ARP Inspection (DAI)'],
  ['IP Source Guard', 'IP Source Guard'],
  ['Loopback Interface', 'Loopback Interface'],
  ['Switch Virtual Interface (SVI)', 'Switch Virtual Interface (SVI)'],
  ['Subinterface', 'Subinterface'],
  ['Tunnel Interface', 'Tunnel Interface'],
  ['Assurance API', 'Assurance API'],
  ['Assurance APIs', 'Assurance APIs'],
  ['Intent-based API', 'Intent-based API'],
  ['Intent-based APIs (Provisioning / Policy)', 'Intent-based APIs (Provisioning / Policy)'],
  ['Integration API', 'Integration API'],
  ['System Integration APIs', 'System Integration APIs'],
  ['Command Runner API', 'Command Runner API'],
  ['Command Runner APIs', 'Command Runner APIs'],
  ['PPP', 'PPP'],
  ['IPsec (IP Security)', 'IPsec'],
  ['Transport Mode', 'Transport Mode'],
  ['Tunnel Mode', 'Tunnel Mode'],
  ['MD5', 'MD5'],
  ['AES', 'AES'],
  ['Crypto Map', 'Crypto Map'],
  ['Security Association', 'Security Association (SA)'],
  ['AH (Authentication Header)', 'AH (Authentication Header)'],
  ['ESP (Encapsulating Security Payload)', 'ESP (Encapsulating Security Payload)'],
  ['Remote Access VPN', 'Remote Access VPN'],
  ['Promiscuous mode', 'Promiscuous Mode'],
  ['Analyze Traffic', 'Analyze Traffic (วิเคราะห์ทราฟฟิก)'],
  ['Follow TCP Stream', 'Follow TCP Stream (ติดตามสตรีม TCP)'],
  ['Decode As', 'Decode As (ถอดรหัสเป็น)'],
  ['Expert Info', 'Expert Info (ข้อมูลผู้เชี่ยวชาญ)'],
  ['HTTP Get', 'HTTP GET'],
  ['UDP Jitter', 'UDP Jitter'],
  ['Staging Area', 'Staging Area'],
  ['Working Directory (Working Tree)', 'Working Directory (Working Tree)'],
  ['Local Repository', 'Local Repository'],
  ['Remote Repository', 'Remote Repository'],
  ['Frame', 'Frame'],
  ['Bit', 'Bit'],
  ['Packet', 'แพ็กเก็ต'],
  ['Simplex', 'Simplex'],
  ['IP', 'IP'],
  ['UDP', 'UDP'],
  ['ARP', 'ARP'],
  ['ICMP', 'ICMP'],
  ['ISL', 'ISL'],
  ['VTP', 'VTP'],
  ['OSPF', 'OSPF'],
  ['Successor', 'Successor'],
  ['Feasible Successor', 'Feasible Successor'],
  ['Reported Distance', 'Reported Distance (RD)'],
  ['Feasible Distance', 'Feasible Distance (FD)'],
  ['ISDN', 'ISDN'],
  ['HDLC', 'HDLC'],
  ['PAP', 'PAP'],
  ['NCP', 'NCP'],
  ['CHAP', 'CHAP'],
  ['SDLC', 'SDLC'],
  ['BGP', 'BGP'],
  ['RIP', 'RIP'],
  ['DORA', 'DORA'],
  ['pat', 'PAT'],
  ['dynamic', 'dynamic'],
  ['enable', 'enable'],
  ['overload', 'overload'],
  ['SNMP', 'SNMP'],
  ['Syslog', 'Syslog'],
  ['Stratum', 'Stratum'],
  ['SSH', 'SSH'],
  ['LDAP', 'LDAP'],
  ['vSmart', 'vSmart'],
  ['vBond', 'vBond'],
  ['vManage', 'vManage'],
  ['vEdge', 'vEdge'],
  ['API-Key', 'API-Key'],
  ['JSON', 'JSON'],
  ['XML', 'XML'],
  ['YAML', 'YAML'],
  ['HTML', 'HTML'],
  ['Play', 'Play'],
  ['Inventory', 'Inventory'],
  ['Wireshark', 'Wireshark'],
  ['device_type', 'device_type'],
  ['platform', 'platform'],
  ['WinSock', 'WinSock'],
  ['Paramiko', 'Paramiko'],
  ['OpenSSL', 'OpenSSL'],
  ['List', 'List (ลิสต์)'],
  ['Dictionary', 'Dictionary (ดิกชันนารี)'],
  ['Set', 'Set (เซต)'],
  ['Tuple', 'Tuple (ทูเพิล)'],
  ['String', 'String (สตริง)'],
  ['Divide-and-conquer', 'Divide-and-Conquer (แบ่งปัญหาแล้วพิชิต)'],
  ['Follow-the-path', 'Follow-the-Path (ไล่ตรวจตามเส้นทาง)'],
  ['SYN only', 'เฉพาะ SYN'],
  ['SYN-ACK followed by ACK', 'SYN-ACK แล้วตามด้วย ACK'],
  ['Cost', 'Cost'],
  ['Man-in-the-Middle (MitM)', 'Man-in-the-Middle (MitM)'],
  ['SQL Injection', 'SQL Injection'],
  ['All of the above', 'ถูกทุกข้อ'],
]);

const technicalCommandPattern = /^(?:area|crypto|debug|def|delete_|discard_|distribute-list|dns$|domain-name-service$|ebgp-multihop|execute_|filter-list|get_|git|http$|interface|ip|json=|logging|monitor|neighbor|no debug|params=|payload=|port |push_|redistribute|requests\.|retrieve_|rollback\(|route-filter|router|run |send_|service|show|stop debugging|summary-address|switchport|track|undebug|write_)/i;
const sourceCommandPattern = /^(?:aaa |access-class |api-key:|area |authorization:|crypto |data=|debug (?:ip|off)|def |distribute-list |dns$|domain-name-service$|encapsulation |filter-list |git (?:abort|add|branch|checkout|clone|commit|create|diff|download|fetch|history|import|init|log|merge|move|publish|pull|push|record|reset|restore|rollback|save|show|stage|start|status|switch|update|upload)|http$|ike |interface (?!and\b)|ip (?:access|dhcp|encapsulation|forward|helper|logging|nat|port|route|sla|summary)|ip\.proto |json=|line access-list |logging |maximum-paths |metric weights$|monitor |neighbor (?=<)|no debug|params=|payload=|redistribute |requests\.|route add |route-filter |router |send logging|service |show (?:crypto|debug|history|ip|logging|monitor|nat|syslog|track)|stop debugging|subinterface |summary-address|switchport |syslog (?:filter|server)|syslog-server |tcp\.port |terminal monitor$|track |traffic-filter |udp\.port |undebug|update-source |variance |x-[a-z0-9-]+:|load-balance unequal$)/i;
const preferredTechnicalValues = new Set(preferredTechnicalTerms.values());

const preferredContextTerms = new Map([
  ['devnet-004-lesson-4:1:0', 'Authorization (ส่วนหัว HTTP)'],
  ['lesson-adv002-02:3:2', 'เพื่อเปิดใช้การยืนยันตัวตนโดยอัตโนมัติ'],
  ['lesson-adv002-01:2:0', 'Feasible Distance ต้องน้อยกว่า Reported Distance ของ Successor'],
  ['lesson-adv002-02:3:3', 'เพื่อลดโอเวอร์เฮดการประมวลผลของ CPU'],
  ['lesson-adv003-02:0:2', 'เปิดใช้คำสั่ง variance'],
  ['lesson-adv003-05:2:2', 'หยุดการทำงานของ Route Map'],
  ['lesson-adv003-05:3:1', 'ถูกปฏิเสธโดยปริยายและทิ้งเส้นทาง'],
  ['lesson-adv003-05:3:3', 'Route Map แสดงคำเตือน'],
  ['lesson-ccna006-01:0:2', 'การเชื่อมต่อ การแยกส่วน การยืนยันตัวตน'],
  ['lesson-ccna002-05:4:0', 'ทิ้งประกาศ VTP โดยไม่ส่งต่อ'],
  ['lesson-ccna002-02:0:3', 'เพื่อกำหนดเส้นทางทราฟฟิกระหว่างอาคารที่อยู่คนละสถานที่'],
  ['lesson-ccna002-05:0:0', 'การกำหนดค่า IP Routing'],
  ['lesson-ccna002-05:0:2', 'การตรวจสอบ Port Security'],
  ['lesson-ccna002-05:0:3', 'การคำนวณเส้นทาง Spanning Tree'],
  ['lesson-ccna003-02:0:1', 'ไม่ใช้ CPU และแบนด์วิธของลิงก์เพื่อส่งประกาศเส้นทาง'],
  ['lesson-ccna003-04:1:3', 'ค่า Metric Weight ตาม Reliability'],
  ['lesson-ccna004-04:0:0', 'เพื่อลดค่าบริการรายเดือน'],
  ['lesson-ccna005-01:2:0', 'ไคลเอนต์: UDP 67; เซิร์ฟเวอร์: UDP 68'],
  ['lesson-ccna005-01:2:1', 'ไคลเอนต์: UDP 68; เซิร์ฟเวอร์: UDP 67'],
  ['lesson-ccna005-01:2:2', 'ไคลเอนต์: UDP 53; เซิร์ฟเวอร์: UDP 53'],
  ['lesson-ccna005-01:2:3', 'ไคลเอนต์: UDP 161; เซิร์ฟเวอร์: UDP 162'],
  ['lesson-ccna005-02:0:0', 'กำหนดที่อยู่ IP ให้ไคลเอนต์ใหม่แบบไดนามิก'],
  ['lesson-ccna005-04:4:0', 'ใกล้ปลายทางของทราฟฟิกมากที่สุด'],
  ['lesson-ccna005-04:4:1', 'ใกล้ต้นทางของทราฟฟิกมากที่สุด'],
  ['lesson-ccna005-05:2:2', 'กำหนดเส้นทางทราฟฟิกระหว่างอาคารต่างๆ'],
  ['lesson-ccna005-05:2:3', 'แปลงชื่อโดเมนเป็นที่อยู่ IP'],
  ['lesson-ccna006-01:4:0', 'การยืนยันตัวตน'],
  ['lesson-ccna006-01:4:1', 'การกำหนดสิทธิ์'],
  ['lesson-ccna006-01:4:2', 'การบันทึกการใช้งาน'],
  ['lesson-ccna006-04:0:1', 'การยืนยันตัวตน การกำหนดสิทธิ์ การบันทึกการใช้งาน'],
  ['lesson-ccna006-04:1:0', 'การยืนยันตัวตน'],
  ['lesson-ccna006-04:1:1', 'การกำหนดสิทธิ์'],
  ['lesson-ccna006-04:1:2', 'การบันทึกการใช้งาน'],
  ['lesson-git-04:0:0', 'เกิดข้อผิดพลาดในการยืนยันตัวตนเมื่อ push ไปยัง GitHub'],
  ['lesson-sec002-04:2:0', 'Clientless ต้องติดตั้ง Cisco AnyConnect แต่ Client-based ไม่ต้องติดตั้ง'],
  ['lesson-sec002-04:2:1', 'Clientless ใช้ Web Portal ส่วน Client-based เข้าถึงได้ทั้งเครือข่าย'],
  ['lesson-sec002-04:2:2', 'Clientless ปลอดภัยกว่าเสมอ'],
  ['lesson-sec002-04:2:3', 'Client-based รองรับเฉพาะ IPv6'],
  ['lesson-sec002-04:4:0', 'แบ่งลิงก์จริงหนึ่งเส้นเป็นสวิตช์เสมือนสองตัว'],
  ['lesson-sec002-04:4:1', 'ส่งทราฟฟิกองค์กรผ่าน VPN ส่วนอินเทอร์เน็ตทั่วไปออก Local Gateway'],
  ['lesson-sec002-04:4:2', 'บังคับให้ทราฟฟิกทั้งหมดผ่าน VPN Tunnel'],
  ['lesson-sec002-04:4:3', 'ใช้ผู้ให้บริการอินเทอร์เน็ตสองรายพร้อมกัน'],
  ['lesson-wireshark-03:2:0', 'ที่อยู่ IP เป้าหมายที่กำลังค้นหา'],
  ['lesson-wireshark-03:3:3', 'แพ็กเก็ตตอบกลับ DNS มีค่า Cost ของ OSPF'],
  ['lesson-wireshark-03:4:3', 'คำขอหมดเวลา'],
]);

function isTechnicalLiteral(value) {
  const option = value.trim();
  if (!/[A-Za-z]/.test(option)) return true;
  if (/^[A-Z0-9_./ -]+$/.test(option)) return true;
  if (technicalLiteralNames.has(option)) return true;
  if (preferredTechnicalValues.has(option)) return true;
  if (technicalCommandPattern.test(option)) return true;
  if (/^\/|[<>=;]|->|\w+\(\)|\.cfg$|^[A-Za-z][A-Za-z0-9]*_[A-Za-z0-9_]+$/.test(option)) return true;
  return false;
}

function mustPreserveSourceOption(value) {
  const option = value.trim();
  return sourceCommandPattern.test(option)
    || /^[A-Za-z_][\w.]*\([^)]*\)$|^\//.test(option);
}

function isSourceTechnicalOption(value) {
  const option = value.trim();
  return preferredTechnicalTerms.has(option)
    || mustPreserveSourceOption(option)
    || !/[A-Za-z]/.test(option)
    || /^[A-Z0-9_./ -]+$/.test(option);
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

function qualityProblems(question, optionsTh, contextKey) {
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
  const untranslated = optionsTh.filter((option, index) => (
    !/[\u0E00-\u0E7F]/u.test(option)
    && !isTechnicalLiteral(option)
    && !mustPreserveSourceOption(question.options[index])
  ));
  if (untranslated.length > 0) {
    problems.push(`contains untranslated prose: ${untranslated.join(' | ')}`);
  }
  question.options.forEach((sourceOption, index) => {
    const preferred = preferredContextTerms.get(`${contextKey}:${index}`)
      || preferredTechnicalTerms.get(sourceOption);
    if (preferred && optionsTh[index] !== preferred) {
      problems.push(`uses non-standard technical term: ${sourceOption} => ${optionsTh[index]}`);
    }
    if (mustPreserveSourceOption(sourceOption) && optionsTh[index] !== sourceOption) {
      problems.push(`translates command syntax: ${sourceOption} => ${optionsTh[index]}`);
    }
  });
  const lengths = optionsTh.map(optionLength);
  const correctLength = lengths[question.correct_index];
  const longestDistractor = Math.max(...lengths.filter((_, index) => index !== question.correct_index));
  const isTechnicalQuestion = question.options.every((option, index) => (
    isSourceTechnicalOption(option) || preferredContextTerms.has(`${contextKey}:${index}`)
  ));
  if (!isTechnicalQuestion && correctLength - longestDistractor > 6 && correctLength > longestDistractor * 1.2) {
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

async function applyGlossary() {
  const lessons = await loadQuizzes();
  const { localizations, byKey } = localizationByKey();
  for (const lesson of lessons) {
    lesson.quiz_data.questions.forEach((question, questionNo) => {
      const key = `${lesson.id}:${questionNo}`;
      const optionsTh = byKey.get(key);
      if (!optionsTh) throw new Error(`Missing localization for ${key}`);
      question.options.forEach((sourceOption, optionNo) => {
        const preferred = preferredContextTerms.get(`${key}:${optionNo}`)
          || preferredTechnicalTerms.get(sourceOption);
        if (preferred) optionsTh[optionNo] = preferred;
        else if (mustPreserveSourceOption(sourceOption)) optionsTh[optionNo] = sourceOption;
      });
    });
  }
  writeFileSync(localizationPath, `${JSON.stringify(localizations, null, 2)}\n`);
  console.log(`Applied terminology glossary to ${localizations.length} quiz questions.`);
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
      const issues = qualityProblems(question, optionsTh, `${lesson.id}:${questionNo}`);
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
else if (command === 'glossary') await applyGlossary();
else throw new Error('Usage: node scripts/localize-lesson-quizzes.mjs validate | problems <path> | glossary | apply <migration-path>');
