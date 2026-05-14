-- =====================================================
  -- Network Fundamentals 101 - Supabase Database Schema
  -- Migration File
  -- =====================================================

  -- Drop existing tables if they exist (in reverse order)
  DROP TABLE IF EXISTS certificates CASCADE;
  DROP TABLE IF EXISTS user_bookmarks CASCADE;
  DROP TABLE IF EXISTS user_progress CASCADE;
  DROP TABLE IF EXISTS resources CASCADE;
  DROP TABLE IF EXISTS practice_exercises CASCADE;
  DROP TABLE IF EXISTS learning_paths CASCADE;
  DROP TABLE IF EXISTS courses CASCADE;

  -- Drop existing types if they exist
  DROP TYPE IF EXISTS course_level CASCADE;
  DROP TYPE IF EXISTS availability_status CASCADE;
  DROP TYPE IF EXISTS exercise_difficulty CASCADE;
  DROP TYPE IF EXISTS resource_type CASCADE;
  DROP TYPE IF EXISTS path_type CASCADE;

  -- =====================================================
  -- ENUMS
  -- =====================================================

  CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced');
  CREATE TYPE availability_status AS ENUM ('available', 'limited', 'full',
  'coming_soon');
  CREATE TYPE exercise_difficulty AS ENUM ('easy', 'moderate',
  'challenging');
  CREATE TYPE resource_type AS ENUM ('tool', 'tutorial', 'documentation',
  'video', 'external_link');
  CREATE TYPE path_type AS ENUM ('sequential', 'optional', 'milestone');

  -- =====================================================
  -- COURSES TABLE
  -- =====================================================

  CREATE TABLE courses (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name_th TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_th TEXT,
      description_en TEXT,
      level course_level NOT NULL DEFAULT 'beginner',
      price_per_module INTEGER DEFAULT 0,
      min_modules INTEGER DEFAULT 1,
      availability availability_status NOT NULL DEFAULT 'available',
      includes TEXT[],
      highlights TEXT[],
      image_url TEXT,
      rating DECIMAL(2,1) DEFAULT 0,
      review_count INTEGER DEFAULT 0,
      tags TEXT[],
      modules_left INTEGER,
      estimated_hours INTEGER,
      prerequisites TEXT[],
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- =====================================================
  -- LEARNING PATHS TABLE
  -- =====================================================

  CREATE TABLE learning_paths (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name_th TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_th TEXT,
      description_en TEXT,
      from_level TEXT NOT NULL,
      to_level TEXT NOT NULL,
      duration TEXT,
      path_type path_type NOT NULL DEFAULT 'sequential',
      price INTEGER DEFAULT 0,
      availability availability_status NOT NULL DEFAULT 'available',
      seats_left INTEGER,
      modules TEXT[],
      operator TEXT,
      frequency TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- =====================================================
  -- PRACTICE EXERCISES TABLE
  -- =====================================================

  CREATE TABLE practice_exercises (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name_th TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_th TEXT,
      description_en TEXT,
      exercise_type TEXT NOT NULL,
      location TEXT,
      duration TEXT NOT NULL,
      price INTEGER DEFAULT 0,
      group_size TEXT,
      difficulty exercise_difficulty NOT NULL DEFAULT 'easy',
      availability availability_status NOT NULL DEFAULT 'available',
      target_audience TEXT[],
      includes TEXT[],
      highlights TEXT[],
      image_url TEXT,
      rating DECIMAL(2,1) DEFAULT 0,
      best_time TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- =====================================================
  -- RESOURCES TABLE
  -- =====================================================

  CREATE TABLE resources (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      name_th TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_th TEXT,
      description_en TEXT,
      resource_type resource_type NOT NULL,
      location TEXT,
      category TEXT,
      distance TEXT,
      walk_time TEXT,
      hours TEXT,
      rating DECIMAL(2,1) DEFAULT 0,
      price_range TEXT,
      tags TEXT[],
      phone TEXT,
      notes TEXT,
      is_free BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- =====================================================
  -- USER PROGRESS TABLE
  -- =====================================================

  CREATE TABLE user_progress (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,
      path_id TEXT REFERENCES learning_paths(id) ON DELETE SET NULL,
      exercise_id TEXT REFERENCES practice_exercises(id) ON DELETE SET NULL,
      status TEXT DEFAULT 'not_started',
      progress_percentage INTEGER DEFAULT 0,
      completed_at TIMESTAMPTZ,
      last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, course_id, path_id, exercise_id)
  );

  -- =====================================================
  -- USER BOOKMARKS TABLE
  -- =====================================================

  CREATE TABLE user_bookmarks (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
      item_type TEXT NOT NULL,
      item_id TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(user_id, item_type, item_id)
  );

  -- =====================================================
  -- CERTIFICATES TABLE
  -- =====================================================

  CREATE TABLE certificates (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
      user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
      course_id TEXT REFERENCES courses(id) ON DELETE SET NULL,
      path_id TEXT REFERENCES learning_paths(id) ON DELETE SET NULL,
      certificate_name TEXT NOT NULL,
      issued_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ,
      verification_code TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- =====================================================
  -- RLS POLICIES
  -- =====================================================

  ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
  ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
  ALTER TABLE practice_exercises ENABLE ROW LEVEL SECURITY;
  ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_bookmarks ENABLE ROW LEVEL SECURITY;
  ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "Anyone can read courses" ON courses FOR SELECT USING (true);
  CREATE POLICY "Anyone can read learning paths" ON learning_paths FOR SELECT
   USING (true);
  CREATE POLICY "Anyone can read exercises" ON practice_exercises FOR SELECT
  USING (true);
  CREATE POLICY "Anyone can read resources" ON resources FOR SELECT USING
  (true);

  CREATE POLICY "Users can read own progress" ON user_progress FOR SELECT
  USING (auth.uid() = user_id);
  CREATE POLICY "Users can read own bookmarks" ON user_bookmarks FOR SELECT
  USING (auth.uid() = user_id);
  CREATE POLICY "Users can read own certificates" ON certificates FOR SELECT
  USING (auth.uid() = user_id);

  CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);
  CREATE POLICY "Users can insert own bookmarks" ON user_bookmarks FOR INSERT
   WITH CHECK (auth.uid() = user_id);
  CREATE POLICY "Users can delete own bookmarks" ON user_bookmarks FOR DELETE
   USING (auth.uid() = user_id);

  -- =====================================================
  -- SEED DATA - COURSES
  -- =====================================================

  INSERT INTO courses (id, name_th, name_en, description_th, description_en,
  level, price_per_module, min_modules, availability, includes, highlights,
  image_url, rating, review_count, tags, modules_left, estimated_hours,
  prerequisites)
  VALUES
  ('course-001', 'พื้นฐาน OSI Model', 'OSI Model Fundamentals', 'เรียนรู้ 7 ชั้นของ
  OSI Model อย่างละเอียด', 'Learn the 7 layers of the OSI Model in depth',
  'beginner', 0, 1, 'available', ARRAY['สไลด์บรรยาย', 'แบบฝึกหัด',
  'ใบรับรอง']::TEXT[], ARRAY['ทำความเข้าใจ 7 ชั้น', 'Protocols พื้นฐาน', 'การ
  Troubleshooting']::TEXT[],
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', 4.9,
  156, ARRAY['พื้นฐาน', 'OSI', 'Networking']::TEXT[], 10, 4, NULL::TEXT[]),

  ('course-002', 'TCP/IP Protocol Suite', 'TCP/IP Protocol Suite', 'เข้าใจ
  TCP/IP และการทำงานของ Internet', 'Understand TCP/IP and how the Internet
  works', 'beginner', 0, 1, 'available', ARRAY['สไลด์', 'Lab',
  'Quiz']::TEXT[], ARRAY['TCP/IP Layers', 'IP Addressing', 'Port
  Numbers']::TEXT[],
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 4.8,
  203, ARRAY['TCP/IP', 'Internet', 'Protocols']::TEXT[], 15, 6,
  ARRAY['course-001']::TEXT[]),

  ('course-003', 'การตั้งค่า IP Address', 'IP Address Configuration',
  'เรียนรู้การตั้งค่า IP บน Windows และ Linux', 'Learn IP address configuration on
  Windows and Linux', 'intermediate', 0, 1, 'available', ARRAY['Lab Guide',
  'Video Tutorial', 'Assignment']::TEXT[], ARRAY['Static IP', 'DHCP',
  'IPv4/IPv6']::TEXT[],
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800', 4.7, 89,
   ARRAY['IP', 'Configuration', 'Windows', 'Linux']::TEXT[], 8, 3,
  ARRAY['course-002']::TEXT[]),

  ('course-004', 'Subnetting และ CIDR', 'Subnetting and CIDR', 'เทคนิคการแบ่ง
  Subnet และการคำนวณ', 'Subnet division techniques and calculations',
  'intermediate', 0, 1, 'available', ARRAY['Calculator Tool', 'Practice
  Problems', 'Solutions']::TEXT[], ARRAY['VLSM', 'CIDR Notation', 'Subnet
  Mask']::TEXT[],
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', 4.9,
  312, ARRAY['Subnet', 'CIDR', 'VLSM', 'Calculation']::TEXT[], 12, 5,
  ARRAY['course-003']::TEXT[]),

  ('course-005', 'DNS และ Domain Name System', 'DNS and Domain Name System',
  'เข้าใจการทำงานของ DNS และการ Config', 'Understand DNS operation and
  configuration', 'intermediate', 0, 1, 'available', ARRAY['DNS Tools', 'Zone
   Files', 'Records Guide']::TEXT[], ARRAY['Record Types', 'DNS Resolution',
  'BIND']::TEXT[],
  'https://images.unsplash.com/photo-1563206767-5b1d97289374?w=800', 4.6, 78,
   ARRAY['DNS', 'Domain', 'Records']::TEXT[], 6, 4,
  ARRAY['course-002']::TEXT[]),

  ('course-006', 'DHCP Protocol', 'DHCP Protocol', 'การ Config DHCP Server
  และ Client', 'DHCP Server and Client configuration', 'intermediate', 0, 1,
  'limited', ARRAY['Lab Environment', 'Config Examples']::TEXT[], ARRAY['IP
  Pool', 'Reservation', 'VLAN DHCP']::TEXT[],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 4.5, 45,
   ARRAY['DHCP', 'Server', 'Automation']::TEXT[], 3, 2,
  ARRAY['course-003']::TEXT[]);

  -- =====================================================
  -- SEED DATA - LEARNING PATHS
  -- =====================================================

  INSERT INTO learning_paths (id, name_th, name_en, description_th,
  description_en, from_level, to_level, duration, path_type, price,
  availability, seats_left, modules, operator, frequency)
  VALUES
  ('path-001', 'สายอาชีพ Network Engineer', 'Network Engineer Career Path',
  'เส้นทางสู่ Network Engineer มืออาชีพ', 'Path to becoming a professional Network
   Engineer', 'เริ่มต้น', 'ขั้นกลาง', '2 เดือน', 'sequential', 0, 'available', 20,
  ARRAY['course-001', 'course-002', 'course-003', 'course-004']::TEXT[],
  'Network101 Team', 'ทุกเดือน'),

  ('path-002', 'Network Troubleshooting Expert', 'Network Troubleshooting
  Expert', 'เชี่ยวชาญการแก้ปัญหาเครือข่าย', 'Become an expert in network
  troubleshooting', 'ขั้นกลาง', 'ขั้นสูง', '3 เดือน', 'milestone', 0, 'available',
  15, ARRAY['course-003', 'course-004', 'course-005', 'course-006']::TEXT[],
  'Network101 Team', 'ทุกไตรมาส'),

  ('path-003', 'พื้นฐานสู่ CCNA', 'CCNA Foundations', 'เตรียมตัวสอบ CCNA พื้นฐาน',
  'Prepare for CCNA certification', 'เริ่มต้น', 'ขั้นกลาง', '4 เดือน',
  'sequential', 1500, 'limited', 5, ARRAY['course-001', 'course-002',
  'course-003', 'course-004', 'course-005']::TEXT[], 'Network101 Academy',
  'ทุกภาคเรียน');

  -- =====================================================
  -- SEED DATA - PRACTICE EXERCISES
  -- =====================================================

  INSERT INTO practice_exercises (id, name_th, name_en, description_th,
  description_en, exercise_type, location, duration, price, group_size,
  difficulty, availability, target_audience, includes, highlights, image_url,
   rating, best_time)
  VALUES
  ('exercise-001', 'Packet Tracing Lab 1', 'Packet Tracing Lab 1', 'ฝึกวิเคราะห์
   Packet ด้วย Wireshark', 'Practice packet analysis with Wireshark',
  'packet_tracing', 'Wireshark', '3 ชั่วโมง', 0, '1-2 คน', 'easy', 'available',
   ARRAY['beginner', 'intermediate']::TEXT[], ARRAY['Wireshark', 'Sample PCAP
   Files', 'Guide']::TEXT[], ARRAY['Analyze HTTP Traffic', 'Filter Packets',
  'Identify Issues']::TEXT[],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', 4.9,
  'ทุกเวลา'),

  ('exercise-002', 'Subnet Calculator Challenge', 'Subnet Calculator
  Challenge', 'ทดสอบความสามารถในการคำนวณ Subnet', 'Test your subnet
  calculation skills', 'subnet_calc', 'Online Calculator', '2 ชั่วโมง', 0, '1
  คน', 'moderate', 'available', ARRAY['intermediate']::TEXT[],
  ARRAY['Calculator Tool', 'Problem Set', 'Answer Key']::TEXT[], ARRAY['50
  Problems', 'Timed Challenge', 'Scoring']::TEXT[],
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', 4.8,
  'วันธรรมดา'),

  ('exercise-003', 'Router Config Lab', 'Router Config Lab', 'ฝึก Config
  Router ด้วย Cisco', 'Practice router configuration with Cisco', 'config',
  'Cisco Packet Tracer', '4 ชั่วโมง', 0, '2-4 คน', 'challenging', 'available',
  ARRAY['intermediate', 'advanced']::TEXT[], ARRAY['Packet Tracer', 'Topology
   Files', 'Solution Guide']::TEXT[], ARRAY['Static Routing', 'RIP',
  'ACL']::TEXT[],
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800', 4.7,
  'สุดสัปดาห์'),

  ('exercise-004', 'DNS Troubleshooting', 'DNS Troubleshooting', 'แก้ปัญหา DNS
  จริงในระบบ', 'Solve real DNS problems in the system', 'troubleshooting',
  'Live Lab', '2 ชั่วโมง', 0, '1-2 คน', 'moderate', 'limited',
  ARRAY['intermediate']::TEXT[], ARRAY['Lab Environment', 'Logs Access',
  'Hint System']::TEXT[], ARRAY['Real Scenarios', 'Debug Tools',
  'Scoring']::TEXT[],
  'https://images.unsplash.com/photo-1563206767-5b1d97289374?w=800', 4.6,
  'เย็นวันอังคาร/พฤหัส'),

  ('exercise-005', 'VLAN Configuration Lab', 'VLAN Configuration Lab',
  'Config VLAN บน Switch จริง', 'Configure VLAN on real switches', 'config',
  'Physical Lab', '3 ชั่วโมง', 200, '3-6 คน', 'challenging', 'coming_soon',
  ARRAY['advanced']::TEXT[], ARRAY['Switch Hardware', 'Cables',
  'Guide']::TEXT[], ARRAY['802.1Q', 'Trunking', 'VTP']::TEXT[],
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', 5.0,
  'นัดหมายล่วงหน้า');

  -- =====================================================
  -- SEED DATA - RESOURCES
  -- =====================================================

  INSERT INTO resources (id, name_th, name_en, description_th,
  description_en, resource_type, location, category, rating, price_range,
  tags, is_free, notes)
  VALUES
  ('resource-001', 'Subnet Calculator', 'Subnet Calculator', 'เครื่องมือคำนวณ
  Subnet ออนไลน์', 'Online subnet calculation tool', 'tool',
  'https://subnetcalc.example.com', 'network_tool', 4.9, '$',
  ARRAY['Calculator', 'IPv4', 'Free']::TEXT[], true, 'รองรับ VLSM และ CIDR'),

  ('resource-002', 'Wireshark Documentation', 'Wireshark Documentation',
  'เอกสารอย่างเป็นทางการของ Wireshark', 'Official Wireshark documentation',
  'documentation', 'https://www.wireshark.org/docs/', 'reference', 4.8, '$',
  ARRAY['Wireshark', 'Packet Analysis', 'Official']::TEXT[], true, 'มี
  Tutorial Video'),

  ('resource-003', 'Thai Cisco Learning', 'Thai Cisco Learning', 'วิดีโอสอน
  Cisco ภาษาไทย', 'Thai language Cisco tutorials', 'video',
  'https://youtube.com/c/ThaiCisco', 'tutorial', 4.7, '$$', ARRAY['Cisco',
  'Thai', 'Video']::TEXT[], false, 'มีค่าสมัครสมาชิก'),

  ('resource-004', 'RFC 791 - IP Standard', 'RFC 791 - IP Standard', 'มาตรฐาน
   IP Protocol แบบต้นฉบับ', 'Original IP Protocol standard', 'documentation',
  'https://datatracker.ietf.org/doc/html/rfc791', 'reference', 5.0, '$',
  ARRAY['RFC', 'IP', 'Standard']::TEXT[], true, 'เอกสารต้นฉบับของ Internet'),

  ('resource-005', 'GNS3 Network Simulator', 'GNS3 Network Simulator',
  'ซอฟต์แวร์จำลองเครือข่ายฟรี', 'Free network simulation software', 'tool',
  'https://www.gns3.com/', 'network_tool', 4.8, '$', ARRAY['Simulator',
  'Free', 'Windows', 'Linux']::TEXT[], true, 'รองรับ Cisco IOS'),

  ('resource-006', 'Thai Networking Forum', 'Thai Networking Forum',
  'ชุมชนผู้ใช้งานเครือข่ายภาษาไทย', 'Thai networking community', 'external_link',
  'https://thainetwork.io', 'community', 4.5, '$', ARRAY['Community', 'Thai',
   'QA']::TEXT[], true, 'มีผู้เชี่ยวชาญช่วยตอบ'),

  ('resource-007', 'IP Calculator Pro', 'IP Calculator Pro', 'แอปคำนวณ IP
  บนมือถือ', 'Mobile IP calculation app', 'tool',
  'https://play.google.com/app/ipcalc', 'network_tool', 4.6, '$$',
  ARRAY['Mobile', 'Android', 'Calculator']::TEXT[], false, 'มีใน Play Store'),

  ('resource-008', 'Thai TCP/IP Tutorial', 'Thai TCP/IP Tutorial', 'บทความ
  TCP/IP ภาษาไทย', 'Thai TCP/IP articles', 'tutorial',
  'https://net101.th/tutorial/tcpip', 'tutorial', 4.7, '$', ARRAY['Thai',
  'Tutorial', 'Beginner']::TEXT[], true, 'เหมาะสำหรับผู้เริ่มต้น');

  -- =====================================================
  -- INDEXES
  -- =====================================================

  CREATE INDEX idx_courses_level ON courses(level);
  CREATE INDEX idx_courses_availability ON courses(availability);
  CREATE INDEX idx_courses_tags ON courses USING GIN(tags);
  CREATE INDEX idx_learning_paths_level ON learning_paths(from_level,
  to_level);
  CREATE INDEX idx_learning_paths_availability ON
  learning_paths(availability);
  CREATE INDEX idx_exercises_difficulty ON practice_exercises(difficulty);
  CREATE INDEX idx_exercises_type ON practice_exercises(exercise_type);
  CREATE INDEX idx_resources_type ON resources(resource_type);
  CREATE INDEX idx_resources_category ON resources(category);
  CREATE INDEX idx_user_progress_user ON user_progress(user_id);
  CREATE INDEX idx_user_progress_course ON user_progress(course_id);
  CREATE INDEX idx_user_progress_status ON user_progress(status);

  -- =====================================================
  -- FUNCTIONS & TRIGGERS
  -- =====================================================

  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH
  ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON
  learning_paths FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER update_practice_exercises_updated_at BEFORE UPDATE ON
  practice_exercises FOR EACH ROW EXECUTE FUNCTION
  update_updated_at_column();
  CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR
  EACH ROW EXECUTE FUNCTION update_updated_at_column();
  CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON
  user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  -- =====================================================
  -- GRANT ACCESS FOR DATA API
  -- =====================================================

  GRANT SELECT ON courses TO anon;
  GRANT SELECT ON learning_paths TO anon;
  GRANT SELECT ON practice_exercises TO anon;
  GRANT SELECT ON resources TO anon;
  GRANT ALL ON courses TO authenticated;
  GRANT ALL ON learning_paths TO authenticated;
  GRANT ALL ON practice_exercises TO authenticated;
  GRANT ALL ON resources TO authenticated;
  GRANT ALL ON user_progress TO authenticated;
  GRANT ALL ON user_bookmarks TO authenticated;
  GRANT ALL ON certificates TO authenticated;
  GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
  GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;