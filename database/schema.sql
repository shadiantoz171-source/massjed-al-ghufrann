-- Initial database schema for Massjed Al-Ghufrann
-- No audio files included. Students do not have login passwords; only admin/teachers have user accounts.

-- users: system users (admin, teacher). Students stored in a separate table without login credentials.
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin','teacher')),
  full_name VARCHAR(200),
  email VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- teachers: additional teacher metadata linked to users
CREATE TABLE IF NOT EXISTS teachers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  phone VARCHAR(30),
  notes TEXT
);

-- students: student records (no password). Created/managed by admin or teachers.
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  -- user_id left NULL because students do not have login accounts in this system
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  father_name VARCHAR(100),
  mother_name VARCHAR(100),
  father_job VARCHAR(150),
  phone_student VARCHAR(30),
  phone_father VARCHAR(30),
  phone_mother VARCHAR(30),
  dob DATE,
  education_level VARCHAR(100),
  created_by INTEGER, -- users.id of the admin or teacher who created this record
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- surahs: Quran surah reference (used primarily for Juz 30 / Surah-level recordings)
CREATE TABLE IF NOT EXISTS surahs (
  id SERIAL PRIMARY KEY,
  name_ar VARCHAR(200) NOT NULL,
  name_en VARCHAR(200),
  start_page INTEGER,
  end_page INTEGER,
  surah_order INTEGER
);

-- juz_pages: mapping of juz (1..30) to page numbers; is_part30 true for Juz 30 (surah-level)
CREATE TABLE IF NOT EXISTS juz_pages (
  id SERIAL PRIMARY KEY,
  juz_number INTEGER NOT NULL,
  page_number INTEGER NOT NULL,
  is_part30 BOOLEAN DEFAULT false,
  surah_id INTEGER REFERENCES surahs(id)
);

-- years: academic years; used to determine active year for coloring (green=current, yellow=older)
CREATE TABLE IF NOT EXISTS years (
  id SERIAL PRIMARY KEY,
  label VARCHAR(50) NOT NULL, -- e.g., "2025-2026" or "2026"
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT false
);

-- recitations: records of student recitations (no audio). For Juz 30, use surah_id instead of page_number.
CREATE TABLE IF NOT EXISTS recitations (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  entered_by INTEGER, -- users.id of admin or teacher who entered the record
  year_id INTEGER REFERENCES years(id),
  juz_number INTEGER NOT NULL,
  page_number INTEGER,     -- NULL when recording at surah level (Juz 30)
  surah_id INTEGER,        -- NULL in general; used for Juz 30 or surah-level records
  date_recorded DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Useful indexes
CREATE INDEX IF NOT EXISTS idx_recitations_student_year ON recitations(student_id, year_id);
CREATE INDEX IF NOT EXISTS idx_juz_pages_juz_page ON juz_pages(juz_number, page_number);
