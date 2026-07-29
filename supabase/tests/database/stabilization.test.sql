BEGIN;
SELECT plan(20);

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
