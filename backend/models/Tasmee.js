const pool = require('../config/database');

class Tasmee {
  // إنشاء تسميع جديد
  static async create(tasmeeData) {
    const {
      student_id,
      page_id,
      surah_id,
      teacher_id,
      academic_year_id,
      completion_date,
      notes,
      color_status
    } = tasmeeData;

    try {
      const result = await pool.query(
        `INSERT INTO tasmee 
        (student_id, page_id, surah_id, teacher_id, academic_year_id, completion_date, notes, color_status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [student_id, page_id, surah_id, teacher_id, academic_year_id, completion_date, notes, color_status || 'green']
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // البحث عن تسميع بواسطة ID
  static async findById(id) {
    try {
      const result = await pool.query(
        `SELECT t.*, 
                p.page_number, 
                s.surah_name, 
                qp.part_number,
                st.student_name,
                tr.full_name as teacher_name
         FROM tasmee t
         LEFT JOIN quran_pages p ON t.page_id = p.id
         LEFT JOIN quran_surahs s ON t.surah_id = s.id
         LEFT JOIN quran_parts qp ON p.part_id = qp.id
         LEFT JOIN students st ON t.student_id = st.id
         LEFT JOIN teachers tr ON t.teacher_id = tr.id
         WHERE t.id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // الحصول على تسميعات الطالب
  static async getStudentTasmeat(studentId, filters = {}) {
    try {
      let query = `SELECT t.*, 
                          p.page_number, 
                          s.surah_name, 
                          qp.part_number,
                          ay.year,
                          tr.full_name as teacher_name
                   FROM tasmee t
                   LEFT JOIN quran_pages p ON t.page_id = p.id
                   LEFT JOIN quran_surahs s ON t.surah_id = s.id
                   LEFT JOIN quran_parts qp ON p.part_id = qp.id
                   LEFT JOIN academic_years ay ON t.academic_year_id = ay.id
                   LEFT JOIN teachers tr ON t.teacher_id = tr.id
                   WHERE t.student_id = $1`;
      
      const params = [studentId];

      if (filters.academicYearId) {
        params.push(filters.academicYearId);
        query += ` AND t.academic_year_id = $${params.length}`;
      }

      if (filters.colorStatus) {
        params.push(filters.colorStatus);
        query += ` AND t.color_status = $${params.length}`;
      }

      query += ' ORDER BY t.completion_date DESC';
      
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // الحصول على تسميعات المعلم
  static async getTeacherTasmeat(teacherId, filters = {}) {
    try {
      let query = `SELECT t.*, 
                          p.page_number, 
                          s.surah_name, 
                          qp.part_number,
                          st.student_name,
                          ay.year
                   FROM tasmee t
                   LEFT JOIN quran_pages p ON t.page_id = p.id
                   LEFT JOIN quran_surahs s ON t.surah_id = s.id
                   LEFT JOIN quran_parts qp ON p.part_id = qp.id
                   LEFT JOIN students st ON t.student_id = st.id
                   LEFT JOIN academic_years ay ON t.academic_year_id = ay.id
                   WHERE t.teacher_id = $1`;
      
      const params = [teacherId];

      if (filters.academicYearId) {
        params.push(filters.academicYearId);
        query += ` AND t.academic_year_id = $${params.length}`;
      }

      if (filters.colorStatus) {
        params.push(filters.colorStatus);
        query += ` AND t.color_status = $${params.length}`;
      }

      query += ' ORDER BY t.completion_date DESC';
      
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // تحديث التسميع
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

      const query = `UPDATE tasmee SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // حذف التسميع
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM tasmee WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // الحصول على إحصائيات التسميعات
  static async getStatistics(filters = {}) {
    try {
      let query = `SELECT 
                    COUNT(*) as total_tasmeat,
                    COUNT(DISTINCT student_id) as total_students,
                    COUNT(CASE WHEN color_status = 'green' THEN 1 END) as recent_tasmeat,
                    COUNT(CASE WHEN color_status = 'yellow' THEN 1 END) as old_tasmeat
                   FROM tasmee WHERE 1=1`;
      
      const params = [];

      if (filters.academicYearId) {
        params.push(filters.academicYearId);
        query += ` AND academic_year_id = $${params.length}`;
      }

      if (filters.teacherId) {
        params.push(filters.teacherId);
        query += ` AND teacher_id = $${params.length}`;
      }

      const result = await pool.query(query, params);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // تحويل التسميعات الخضراء إلى صفراء (للسنة الجديدة)
  static async resetYearlyColors(academicYearId) {
    try {
      const result = await pool.query(
        `UPDATE tasmee 
         SET color_status = 'yellow'
         WHERE academic_year_id = $1 AND color_status = 'green'
         RETURNING COUNT(*)`,
        [academicYearId]
      );
      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Tasmee;
