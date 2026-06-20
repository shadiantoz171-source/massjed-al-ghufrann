const pool = require('../config/database');

class Student {
  // إنشاء طالب جديد
  static async create(studentData) {
    const {
      student_name,
      father_name,
      mother_name,
      father_job,
      student_phone,
      mother_phone,
      father_phone,
      birth_date,
      education_level,
      teacher_id,
      created_by
    } = studentData;

    try {
      const result = await pool.query(
        `INSERT INTO students 
        (student_name, father_name, mother_name, father_job, student_phone, 
         mother_phone, father_phone, birth_date, education_level, teacher_id, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [student_name, father_name, mother_name, father_job, student_phone,
         mother_phone, father_phone, birth_date, education_level, teacher_id, created_by]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // البحث عن طالب بواسطة ID
  static async findById(id) {
    try {
      const result = await pool.query(
        `SELECT s.*, t.full_name as teacher_name FROM students s 
         LEFT JOIN teachers t ON s.teacher_id = t.id 
         WHERE s.id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // الحصول على جميع الطلاب
  static async getAll(filters = {}) {
    try {
      let query = `SELECT s.*, t.full_name as teacher_name FROM students s 
                   LEFT JOIN teachers t ON s.teacher_id = t.id WHERE 1=1`;
      const params = [];

      if (filters.teacherId) {
        params.push(filters.teacherId);
        query += ` AND s.teacher_id = $${params.length}`;
      }

      if (filters.educationLevel) {
        params.push(filters.educationLevel);
        query += ` AND s.education_level = $${params.length}`;
      }

      query += ' ORDER BY s.created_at DESC';
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // تحديث بيانات الطالب
  static async update(id, updateData) {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updateData)) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);
      values.push(id);

      const query = `UPDATE students SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // حذف الطالب
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // الحصول على تسميعات الطالب
  static async getTaskmeat(studentId) {
    try {
      const result = await pool.query(
        `SELECT t.*, p.page_number, s.surah_name, tr.full_name as teacher_name 
         FROM tasmee t
         LEFT JOIN quran_pages p ON t.page_id = p.id
         LEFT JOIN quran_surahs s ON t.surah_id = s.id
         LEFT JOIN teachers tr ON t.teacher_id = tr.id
         WHERE t.student_id = $1
         ORDER BY t.completion_date DESC`,
        [studentId]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Student;
