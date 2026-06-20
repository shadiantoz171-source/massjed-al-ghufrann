const pool = require('../config/database');

class Teacher {
  // إنشاء معلم جديد
  static async create(userId, teacherData) {
    const {
      full_name,
      phone,
      email,
      qualification,
      hiring_date
    } = teacherData;

    try {
      const result = await pool.query(
        `INSERT INTO teachers (user_id, full_name, phone, email, qualification, hiring_date)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [userId, full_name, phone, email, qualification, hiring_date]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // البحث عن معلم بواسطة ID
  static async findById(id) {
    try {
      const result = await pool.query(
        `SELECT t.*, u.username, u.email as user_email FROM teachers t
         LEFT JOIN users u ON t.user_id = u.id
         WHERE t.id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // البحث عن معلم بواسطة user_id
  static async findByUserId(userId) {
    try {
      const result = await pool.query(
        `SELECT t.*, u.username FROM teachers t
         LEFT JOIN users u ON t.user_id = u.id
         WHERE t.user_id = $1`,
        [userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // الحصول على جميع المعلمين
  static async getAll() {
    try {
      const result = await pool.query(
        `SELECT t.*, u.username FROM teachers t
         LEFT JOIN users u ON t.user_id = u.id
         ORDER BY t.created_at DESC`
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // تحديث بيانات المعلم
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

      const query = `UPDATE teachers SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // حذف معلم
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM teachers WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // الحصول على طلاب المعلم
  static async getStudents(teacherId) {
    try {
      const result = await pool.query(
        `SELECT * FROM students WHERE teacher_id = $1 ORDER BY created_at DESC`,
        [teacherId]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // إحصائيات المعلم
  static async getStatistics(teacherId) {
    try {
      const result = await pool.query(
        `SELECT 
          COUNT(DISTINCT s.id) as total_students,
          COUNT(DISTINCT t.id) as total_tasmeat,
          COUNT(DISTINCT CASE WHEN t.color_status = 'green' THEN t.id END) as recent_tasmeat,
          COUNT(DISTINCT CASE WHEN t.color_status = 'yellow' THEN t.id END) as old_tasmeat
         FROM teachers te
         LEFT JOIN students s ON te.id = s.teacher_id
         LEFT JOIN tasmee t ON s.id = t.student_id
         WHERE te.id = $1`,
        [teacherId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Teacher;
