BEGIN;
SELECT plan(25);

SELECT ok(has_table_privilege('anon', 'public.lessons', 'SELECT'), 'anon can read lessons');
SELECT ok(NOT has_table_privilege('anon', 'public.lessons', 'UPDATE'), 'anon cannot update lessons');
SELECT ok(NOT has_table_privilege('anon', 'public.products', 'UPDATE'), 'anon cannot update products');
SELECT ok(has_table_privilege('authenticated', 'public.exercise_attempts', 'INSERT'), 'authenticated can insert attempts');
SELECT ok(NOT has_function_privilege('anon', 'public.get_student_metrics(uuid)', 'EXECUTE'), 'anon cannot execute student metrics');
SELECT ok(has_function_privilege('authenticated', 'public.get_student_metrics(uuid)', 'EXECUTE'), 'authenticated can execute student metrics');
SELECT ok(has_function_privilege('authenticated', 'public.course_completion_percentage(uuid,text)', 'EXECUTE'), 'authenticated can calculate course completion');
SELECT ok(NOT has_function_privilege('anon', 'public.course_completion_percentage(uuid,text)', 'EXECUTE'), 'anon cannot calculate course completion');
SELECT ok(NOT has_function_privilege('anon', 'public.increment_study_time(integer)', 'EXECUTE'), 'anon cannot increment study time');
SELECT is(to_regclass('public.quiz_attempts'), NULL::regclass, 'legacy quiz_attempts table is removed');
SELECT ok(
  EXISTS (
    SELECT 1 FROM pg_class
    WHERE oid = 'public.v_enrollment_completion'::regclass
      AND reloptions @> ARRAY['security_invoker=true']
  ),
  'enrollment view uses invoker security'
);
SELECT is(
  (SELECT count(*)::integer FROM public.lessons WHERE quiz_data IS NOT NULL),
  73,
  'all 73 lesson quizzes are present'
);
SELECT is(
  (SELECT count(*)::integer FROM public.lessons
   WHERE quiz_data IS NOT NULL
     AND jsonb_array_length(quiz_data -> 'questions') <> 5),
  0,
  'every lesson quiz has five questions'
);
SELECT is(
  (SELECT count(*)::integer
   FROM public.lessons lesson
   CROSS JOIN LATERAL jsonb_array_elements(lesson.quiz_data -> 'questions') AS question(value)
   WHERE lesson.quiz_data IS NOT NULL
     AND (
       jsonb_typeof(question.value -> 'options_th') IS DISTINCT FROM 'array'
       OR jsonb_array_length(question.value -> 'options_th')
          <> jsonb_array_length(question.value -> 'options')
     )),
  0,
  'every lesson quiz choice has a complete Thai localization'
);
SELECT is(
  (SELECT count(*)::integer
   FROM public.lessons lesson
   CROSS JOIN LATERAL jsonb_array_elements(lesson.quiz_data -> 'questions') AS question(value)
   WHERE lesson.quiz_data IS NOT NULL
     AND (
       EXISTS (
         SELECT 1 FROM jsonb_array_elements_text(question.value -> 'options_th') AS option(value)
         WHERE btrim(option.value) = ''
       )
       OR jsonb_array_length(question.value -> 'options_th') <> (
         SELECT count(DISTINCT lower(btrim(option.value)))
         FROM jsonb_array_elements_text(question.value -> 'options_th') AS option(value)
       )
     )),
  0,
  'Thai lesson quiz choices are non-empty and unique within each question'
);
SELECT is(
  (WITH question_lengths AS (
     SELECT
       lesson.id AS lesson_id,
       question.ordinality AS question_no,
       (question.value ->> 'correct_index')::integer AS correct_index,
       bool_and(option.value ~ '[ก-๙]') AS all_options_contain_thai,
       bool_and((question.value -> 'options' ->> (option.ordinality - 1)::integer) !~ '\s')
         AS all_source_options_are_single_tokens,
       array_agg(
         length(regexp_replace(option.value, '[^[:alnum:]ก-๙]', '', 'g'))
         ORDER BY option.ordinality
       ) AS lengths,
       array_agg(
         length(regexp_replace(
           question.value -> 'options' ->> (option.ordinality - 1)::integer,
           '[^[:alnum:]]',
           '',
           'g'
         ))
         ORDER BY option.ordinality
       ) AS source_lengths
     FROM public.lessons lesson
     CROSS JOIN LATERAL jsonb_array_elements(lesson.quiz_data -> 'questions')
       WITH ORDINALITY AS question(value, ordinality)
     CROSS JOIN LATERAL jsonb_array_elements_text(question.value -> 'options_th')
       WITH ORDINALITY AS option(value, ordinality)
     WHERE lesson.quiz_data IS NOT NULL
     GROUP BY lesson.id, question.ordinality, question.value
   )
   SELECT count(*)::integer
   FROM question_lengths
   WHERE all_options_contain_thai
     AND NOT all_source_options_are_single_tokens
     AND NOT (
       source_lengths[correct_index + 1] - (
         SELECT max(length_value)
         FROM unnest(source_lengths) WITH ORDINALITY AS distractor(length_value, option_no)
         WHERE option_no <> correct_index + 1
       ) > 6
       AND source_lengths[correct_index + 1] > 1.2 * (
         SELECT max(length_value)
         FROM unnest(source_lengths) WITH ORDINALITY AS distractor(length_value, option_no)
         WHERE option_no <> correct_index + 1
       )
     )
     AND lengths[correct_index + 1] - (
       SELECT max(length_value)
       FROM unnest(lengths) WITH ORDINALITY AS distractor(length_value, option_no)
       WHERE option_no <> correct_index + 1
     ) > 6
     AND lengths[correct_index + 1] > 1.2 * (
       SELECT max(length_value)
       FROM unnest(lengths) WITH ORDINALITY AS distractor(length_value, option_no)
       WHERE option_no <> correct_index + 1
     )),
  0,
  'correct Thai choices are not materially longer than their distractors'
);
SELECT ok(
  EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.lessons'::regclass
      AND conname = 'lessons_quiz_options_th_check'
      AND contype = 'c'
  ),
  'lesson quizzes enforce complete Thai choice arrays'
);
SELECT throws_like(
  $$UPDATE public.lessons
    SET quiz_data = jsonb_set(
      quiz_data,
      '{questions,0}',
      (quiz_data #> '{questions,0}') - 'options_th'
    )
    WHERE id = 'lesson-ccna001-01'$$,
  '%violates check constraint "lessons_quiz_options_th_check"%',
  'lesson quiz rejects a question without Thai choices'
);

INSERT INTO auth.users (id, instance_id, aud, role, email, created_at, updated_at)
VALUES
  ('11111111-1111-4111-8111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'owner@example.test', now(), now()),
  ('22222222-2222-4222-8222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'other@example.test', now(), now());

SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub', '11111111-1111-4111-8111-111111111111', true);
SELECT set_config(
  'request.jwt.claims',
  '{"sub":"11111111-1111-4111-8111-111111111111","app_metadata":{"role":"student"}}',
  true
);

SELECT lives_ok(
  $$INSERT INTO public.user_progress (
      user_id, lesson_id, course_id, status, progress_percentage, completed_at, last_accessed_at
    ) VALUES (
      '11111111-1111-4111-8111-111111111111', 'lesson-ccna001-01',
      'ccna-001', 'completed', 100, now(), now()
    )$$,
  'owner can save lesson progress through the enrollment sync trigger'
);
SELECT lives_ok(
  $$INSERT INTO public.exercise_attempts (
      user_id, exercise_id, lesson_id, course_id, passed, score, execution_timestamp
    ) VALUES (
      '11111111-1111-4111-8111-111111111111', 'quiz:lesson:lesson-ccna001-01',
      'lesson-ccna001-01', 'ccna-001', true, 100, now()
    )$$,
  'owner can insert an exercise attempt'
);
SELECT is(
  (SELECT count(*)::integer FROM public.exercise_attempts),
  1,
  'owner reads only their own attempt'
);
SELECT throws_like(
  $$INSERT INTO public.exercise_attempts (
      user_id, exercise_id, lesson_id, course_id, passed, score, execution_timestamp
    ) VALUES (
      '22222222-2222-4222-8222-222222222222', 'quiz:lesson:lesson-ccna001-01',
      'lesson-ccna001-01', 'ccna-001', true, 100, now()
    )$$,
  '%row-level security policy%',
  'cross-user attempt insert is denied'
);
SELECT lives_ok(
  $$SELECT public.get_student_metrics('11111111-1111-4111-8111-111111111111')$$,
  'owner can read their metrics'
);
SELECT throws_like(
  $$SELECT public.get_student_metrics('22222222-2222-4222-8222-222222222222')$$,
  '%Not authorized%',
  'cross-user metrics access is denied'
);

SELECT set_config(
  'request.jwt.claims',
  '{"sub":"11111111-1111-4111-8111-111111111111","app_metadata":{"role":"admin"}}',
  true
);
SELECT lives_ok(
  $$SELECT public.get_student_metrics('22222222-2222-4222-8222-222222222222')$$,
  'admin app_metadata role can read cross-user metrics'
);

SELECT * FROM finish();
ROLLBACK;
