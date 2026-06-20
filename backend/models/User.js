const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  // إنشاء مستخدم جديد
  static async create(username, password, roleId, email = null) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO users (username, password, email, role_id) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role_id, created_at',
        [username, hashedPassword, email, roleId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // البحث عن مستخدم بواسطة ID
  static async findById(id) {
    try {
      const result = await pool.query(
        'SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // البحث عن مستخدم بواسطة اسم المستخدم
  static async findByUsername(username) {
    try {
      const result = await pool.query(
        'SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.username = $1',
        [username]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // التحقق من كلمة المرور
  static async verifyPassword(username, password) {
    try {
      const user = await this.findByUsername(username);
      if (!user) return null;
      
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // تحديث المستخدم
  static async update(id, updateData) {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updateData)) {
        if (key === 'password') {
          fields.push(`${key} = $${paramCount}`);
          values.push(await bcrypt.hash(value, 10));
        } else {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
        }
        paramCount++;
      }

      fields.push(`updated_at = NOW()`);
      values.push(id);

      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // الحصول على جميع المستخدمين
  static async getAll(filters = {}) {
    try {
      let query = 'SELECT u.*, r.name as role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE 1=1';
      const params = [];

      if (filters.roleId) {
        params.push(filters.roleId);
        query += ` AND u.role_id = $${params.length}`;
      }

      if (filters.isActive !== undefined) {
        params.push(filters.isActive);
        query += ` AND u.is_active = $${params.length}`;
      }

      query += ' ORDER BY u.created_at DESC';
      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // حذف المستخدم
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
