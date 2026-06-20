const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Teacher = require('../models/Teacher');

class AuthController {
  // تسجيل الدخول
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const user = await User.verifyPassword(username, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      if (!user.is_active) {
        return res.status(403).json({ error: 'Account is inactive' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role_id: user.role_id,
          role_name: user.role_name
        },
        process.env.JWT_SECRET || 'your_secret_key',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role_name: user.role_name
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // التحقق من التوكن
  static async verifyToken(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role_name: user.role_name
        }
      });
    } catch (error) {
      console.error('Verify token error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // الحصول على بيانات المستخدم الحالي
  static async getCurrentUser(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        role_name: user.role_name
      };

      // إذا كان المستخدم معلماً، احصل على بيانات المعلم
      if (user.role_name === 'teacher') {
        const teacher = await Teacher.findByUserId(user.id);
        userData.teacher = teacher;
      }

      res.json(userData);
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // تسجيل الخروج (اختياري - في الأساس يتم حذف التوكن من العميل)
  static async logout(req, res) {
    try {
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // تغيير كلمة المرور
  static async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Old and new passwords are required' });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ error: 'New password must be at least 6 characters' });
      }

      const user = await User.findById(req.user.id);
      const isValid = await require('bcryptjs').compare(oldPassword, user.password);

      if (!isValid) {
        return res.status(401).json({ error: 'Old password is incorrect' });
      }

      await User.update(req.user.id, { password: newPassword });

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = AuthController;
