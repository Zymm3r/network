-- Recreate schema to match seed.sql exactly

DROP TABLE IF EXISTS public.practice_exercises CASCADE;
DROP TABLE IF EXISTS public.user_bookmarks CASCADE;
DROP TABLE IF EXISTS public.certificates CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.learning_paths CASCADE;
DROP TABLE IF EXISTS public.resources CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;

-- 1. courses
CREATE TABLE public.courses (
    id TEXT PRIMARY KEY,
    name_th TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_th TEXT,
    description_en TEXT,
    level TEXT,
    minutes_per_lesson INTEGER,
    min_modules INTEGER,
    availability TEXT,
    includes TEXT[],
    highlights TEXT[],
    image_url TEXT,
    rating NUMERIC(3,1),
    review_count INTEGER,
    tags TEXT[],
    modules_left INTEGER,
    estimated_hours INTEGER,
    prerequisites TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. resources
CREATE TABLE public.resources (
    id TEXT PRIMARY KEY,
    name_th TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_th TEXT,
    description_en TEXT,
    resource_type TEXT,
    location TEXT,
    category TEXT,
    distance TEXT,
    walk_time TEXT,
    hours TEXT,
    rating NUMERIC(3,1),
    price_range TEXT,
    tags TEXT[],
    phone TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. learning_paths
CREATE TABLE public.learning_paths (
    id TEXT PRIMARY KEY,
    name_th TEXT NOT NULL,
    name_en TEXT NOT NULL,
    description_th TEXT,
    description_en TEXT,
    from_level TEXT,
    to_level TEXT,
    duration TEXT,
    estimated_hours INTEGER,
    path_type TEXT,
    price NUMERIC,
    availability TEXT,
    seats_left INTEGER,
    modules TEXT[],
    operator TEXT,
    frequency TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. lessons
CREATE TABLE public.lessons (
    id TEXT PRIMARY KEY,
    course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
    title_th TEXT NOT NULL,
    title_en TEXT NOT NULL,
    content_th TEXT,
    content_en TEXT,
    lesson_type TEXT,
    duration_minutes INTEGER,
    order_index INTEGER,
    video_url TEXT,
    thumbnail_url TEXT,
    difficulty TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. practice_exercises
CREATE TABLE public.practice_exercises (
    id TEXT PRIMARY KEY,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
    name_th TEXT,
    name_en TEXT,
    description_th TEXT,
    description_en TEXT,
    exercise_type TEXT,
    location TEXT,
    duration TEXT,
    price NUMERIC,
    group_size TEXT,
    difficulty TEXT,
    availability TEXT,
    target_audience TEXT[],
    includes TEXT[],
    highlights TEXT[],
    image_url TEXT,
    rating NUMERIC(3,1),
    best_time TEXT,
    question_th TEXT,
    question_en TEXT,
    options TEXT[],
    correct_index INTEGER,
    explanation_th TEXT,
    explanation_en TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. enrollments
CREATE TABLE public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    status TEXT DEFAULT 'active',
    progress_percentage INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- 7. user_progress
CREATE TABLE public.user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT REFERENCES public.courses(id) ON DELETE SET NULL,
    path_id TEXT REFERENCES public.learning_paths(id) ON DELETE SET NULL,
    exercise_id TEXT REFERENCES public.practice_exercises(id) ON DELETE SET NULL,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'not_started',
    progress_percentage INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_progress_lesson UNIQUE (user_id, lesson_id)
);

-- 8. certificates
CREATE TABLE public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    certificate_url TEXT
);

-- 9. user_bookmarks
CREATE TABLE public.user_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT REFERENCES public.courses(id) ON DELETE SET NULL,
    lesson_id TEXT REFERENCES public.lessons(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS and default SELECT policies
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.courses TO anon, authenticated;
CREATE POLICY "Public read courses" ON public.courses FOR SELECT USING (true);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.resources TO anon, authenticated;
CREATE POLICY "Public read resources" ON public.resources FOR SELECT USING (true);

ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.learning_paths TO anon, authenticated;
CREATE POLICY "Public read paths" ON public.learning_paths FOR SELECT USING (true);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.lessons TO anon, authenticated;
CREATE POLICY "Public read lessons" ON public.lessons FOR SELECT USING (true);

ALTER TABLE public.practice_exercises ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.practice_exercises TO anon, authenticated;
CREATE POLICY "Public read practice_exercises" ON public.practice_exercises FOR SELECT USING (true);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.enrollments TO anon, authenticated;
CREATE POLICY "Users read own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own enrollments" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own enrollments" ON public.enrollments FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.user_progress TO anon, authenticated;
CREATE POLICY "Users read own progress" ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own progress" ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.certificates TO anon, authenticated;
CREATE POLICY "Users read own certificates" ON public.certificates FOR SELECT USING (auth.uid() = user_id);

ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.user_bookmarks TO anon, authenticated;
CREATE POLICY "Users read own bookmarks" ON public.user_bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own bookmarks" ON public.user_bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own bookmarks" ON public.user_bookmarks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own bookmarks" ON public.user_bookmarks FOR DELETE USING (auth.uid() = user_id);
