-- إدراج بيانات أجزاء القرآن الكريم

-- إدراج الأجزاء 1-29
INSERT INTO quran_parts (part_number, part_name, total_pages, is_surahs_based) 
VALUES
  (1, 'الجزء الأول', 20, false),
  (2, 'الجزء الثاني', 20, false),
  (3, 'الجزء الثالث', 20, false),
  (4, 'الجزء الرابع', 20, false),
  (5, 'الجزء الخامس', 20, false),
  (6, 'الجزء السادس', 20, false),
  (7, 'الجزء السابع', 20, false),
  (8, 'الجزء الثامن', 20, false),
  (9, 'الجزء التاسع', 20, false),
  (10, 'الجزء العاشر', 20, false),
  (11, 'الجزء ال��ادي عشر', 20, false),
  (12, 'الجزء الثاني عشر', 20, false),
  (13, 'الجزء الثالث عشر', 20, false),
  (14, 'الجزء الرابع عشر', 20, false),
  (15, 'الجزء الخامس عشر', 20, false),
  (16, 'الجزء السادس عشر', 20, false),
  (17, 'الجزء السابع عشر', 20, false),
  (18, 'الجزء الثامن عشر', 20, false),
  (19, 'الجزء التاسع عشر', 20, false),
  (20, 'الجزء العشرون', 20, false),
  (21, 'الجزء الحادي والعشرون', 20, false),
  (22, 'الجزء الثاني والعشرون', 20, false),
  (23, 'الجزء الثالث والعشرون', 20, false),
  (24, 'الجزء الرابع والعشرون', 20, false),
  (25, 'الجزء الخامس والعشرون', 20, false),
  (26, 'الجزء السادس والعشرون', 20, false),
  (27, 'الجزء السابع والعشرون', 20, false),
  (28, 'الجزء الثامن والعشرون', 20, false),
  (29, 'الجزء التاسع والعشرون', 20, false),
  (30, 'الجزء الثلاثون - جزء عم', 17, true)
ON CONFLICT DO NOTHING;

-- إدراج سور جزء عم (الجزء 30)
INSERT INTO quran_surahs (surah_number, surah_name, part_id, verse_count)
SELECT 78, 'النبأ', id, 40 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 79, 'النازعات', id, 46 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 80, 'عبس', id, 42 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 81, 'التكوير', id, 29 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 82, 'الإنفطار', id, 19 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 83, 'المطففين', id, 36 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 84, 'الإنشقاق', id, 25 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 85, 'البروج', id, 22 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 86, 'الطارق', id, 17 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 87, 'الأعلى', id, 19 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 88, 'الغاشية', id, 26 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 89, 'الفجر', id, 30 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 90, 'البلد', id, 20 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 91, 'الشمس', id, 15 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 92, 'الليل', id, 21 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 93, 'الضحى', id, 11 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 94, 'الشرح', id, 8 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 95, 'التين', id, 8 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 96, 'العلق', id, 19 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 97, 'القدر', id, 5 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 98, 'البينة', id, 8 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 99, 'الزلزلة', id, 8 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 100, 'العاديات', id, 11 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 101, 'القارعة', id, 11 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 102, 'التكاثر', id, 8 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 103, 'العصر', id, 3 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 104, 'الهمزة', id, 9 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 105, 'الفيل', id, 5 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 106, 'قريش', id, 4 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 107, 'الماعون', id, 7 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 108, 'الكوثر', id, 3 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 109, 'الكافرون', id, 6 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 110, 'النصر', id, 3 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 111, 'المسد', id, 5 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 112, 'الإخلاص', id, 4 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 113, 'الفلق', id, 5 FROM quran_parts WHERE part_number = 30
UNION ALL
SELECT 114, 'الناس', id, 6 FROM quran_parts WHERE part_number = 30
ON CONFLICT DO NOTHING;
