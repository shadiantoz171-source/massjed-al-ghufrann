-- نظام تسميعات مسجد الغفران
-- قاعدة البيانات الأولية

-- جدول الأدوار (Roles)
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE,
  role_id INTEGER REFERENCES roles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المعلمين
CREATE TABLE IF NOT EXISTS teachers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  qualification TEXT,
  hiring_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الطلاب
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255) NOT NULL,
  mother_name VARCHAR(255) NOT NULL,
  father_job VARCHAR(100),
  student_phone VARCHAR(20),
  mother_phone VARCHAR(20),
  father_phone VARCHAR(20),
  birth_date DATE NOT NULL,
  education_level VARCHAR(100),
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الأجزاء (Parts)
CREATE TABLE IF NOT EXISTS quran_parts (
  id SERIAL PRIMARY KEY,
  part_number INTEGER UNIQUE NOT NULL,
  part_name VARCHAR(100),
  total_pages INTEGER,
  is_surahs_based BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول السور (للجزء الثلاثين)
CREATE TABLE IF NOT EXISTS quran_surahs (
  id SERIAL PRIMARY KEY,
  surah_number INTEGER NOT NULL,
  surah_name VARCHAR(100) NOT NULL,
  part_id INTEGER REFERENCES quran_parts(id) ON DELETE CASCADE,
  verse_count INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الصفحات
CREATE TABLE IF NOT EXISTS quran_pages (
  id SERIAL PRIMARY KEY,
  page_number INTEGER NOT NULL,
  part_id INTEGER REFERENCES quran_parts(id) ON DELETE CASCADE,
  surah_id INTEGER REFERENCES quran_surahs(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page_number, part_id)
);

-- جدول السنوات الدراسية
CREATE TABLE IF NOT EXISTS academic_years (
  id SERIAL PRIMARY KEY,
  year INTEGER UNIQUE NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول التسميعات
CREATE TABLE IF NOT EXISTS tasmee (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  page_id INTEGER REFERENCES quran_pages(id) ON DELETE SET NULL,
  surah_id INTEGER REFERENCES quran_surahs(id) ON DELETE SET NULL,
  teacher_id INTEGER NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
  academic_year_id INTEGER NOT NULL REFERENCES academic_years(id),
  completion_date DATE NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'completed',
  color_status VARCHAR(20) DEFAULT 'green', -- 'green' للحديثة، 'yellow' للقديمة
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول السجلات (Logs) لتتبع الأنشطة
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INTEGER,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- الفهارس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_teachers_user_id ON teachers(user_id);
CREATE INDEX IF NOT EXISTS idx_students_teacher_id ON students(teacher_id);
CREATE INDEX IF NOT EXISTS idx_tasmee_student_id ON tasmee(student_id);
CREATE INDEX IF NOT EXISTS idx_tasmee_academic_year ON tasmee(academic_year_id);
CREATE INDEX IF NOT EXISTS idx_tasmee_completion_date ON tasmee(completion_date);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);

-- إدراج الأدوار الافتراضية
INSERT INTO roles (name, description) VALUES
  ('admin', 'المدير - تحكم كامل'),
  ('teacher', 'المعلم - إدارة الطلاب والتسميعات'),
  ('student', 'الطالب - عرض البيانات والتسميعات')
ON CONFLICT (name) DO NOTHING;
