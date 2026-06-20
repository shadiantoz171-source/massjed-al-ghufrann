const Tasmee = require('../models/Tasmee');

class TasmeeController {
  // إنشاء تسميع جديد
  static async createTasmee(req, res) {
    try {
      const {
        student_id,
        page_id,
        surah_id,
        academic_year_id,
        completion_date,
        notes
      } = req.body;

      // التحقق من البيانات المطلوبة
      if (!student_id || !academic_year_id || !completion_date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (!page_id && !surah_id) {
        return res.status(400).json({ error: 'Either page_id or surah_id is required' });
      }

      const tasmee = await Tasmee.create({
        student_id,
        page_id: page_id || null,
        surah_id: surah_id || null,
        teacher_id: req.user.id,
        academic_year_id,
        completion_date,
        notes: notes || null,
        color_status: 'green'
      });

      res.status(201).json({
        message: 'Tasmee recorded successfully',
        tasmee
      });
    } catch (error) {
      console.error('Create tasmee error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // الحصول على تسميع بواسطة ID
  static async getTasmee(req, res) {
    try {
      const { id } = req.params;
      const tasmee = await Tasmee.findById(id);

      if (!tasmee) {
        return res.status(404).json({ error: 'Tasmee not found' });
      }

      res.json(tasmee);
    } catch (error) {
      console.error('Get tasmee error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // الحصول على تسميعات الطالب
  static async getStudentTasmeat(req, res) {
    try {
      const { studentId } = req.params;
      const { academicYearId, colorStatus } = req.query;

      const filters = {};
      if (academicYearId) filters.academicYearId = academicYearId;
      if (colorStatus) filters.colorStatus = colorStatus;

      const tasmeat = await Tasmee.getStudentTasmeat(studentId, filters);
      res.json(tasmeat);
    } catch (error) {
      console.error('Get student tasmeat error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // الحصول على تسميعات المعلم
  static async getTeacherTasmeat(req, res) {
    try {
      const { academicYearId, colorStatus } = req.query;

      const filters = {};
      if (academicYearId) filters.academicYearId = academicYearId;
      if (colorStatus) filters.colorStatus = colorStatus;

      const tasmeat = await Tasmee.getTeacherTasmeat(req.user.id, filters);
      res.json(tasmeat);
    } catch (error) {
      console.error('Get teacher tasmeat error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // تحديث التسميع
  static async updateTasmee(req, res) {
    try {
      const { id } = req.params;
      const tasmee = await Tasmee.findById(id);

      if (!tasmee) {
        return res.status(404).json({ error: 'Tasmee not found' });
      }

      // تحقق من أن المستخدم هو معلم التسميع أو مدير
      if (req.user.role_name !== 'admin' && tasmee.teacher_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const updatedTasmee = await Tasmee.update(id, req.body);
      res.json({
        message: 'Tasmee updated successfully',
        tasmee: updatedTasmee
      });
    } catch (error) {
      console.error('Update tasmee error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // حذف التسميع
  static async deleteTasmee(req, res) {
    try {
      const { id } = req.params;
      const tasmee = await Tasmee.findById(id);

      if (!tasmee) {
        return res.status(404).json({ error: 'Tasmee not found' });
      }

      // تحقق من أن المستخدم هو معلم التسميع أو مدير
      if (req.user.role_name !== 'admin' && tasmee.teacher_id !== req.user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }

      await Tasmee.delete(id);
      res.json({ message: 'Tasmee deleted successfully' });
    } catch (error) {
      console.error('Delete tasmee error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // الحصول على إحصائيات التسميعات
  static async getStatistics(req, res) {
    try {
      const { academicYearId, teacherId } = req.query;

      const filters = {};
      if (academicYearId) filters.academicYearId = academicYearId;
      if (teacherId) filters.teacherId = teacherId;

      const statistics = await Tasmee.getStatistics(filters);
      res.json(statistics);
    } catch (error) {
      console.error('Get statistics error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // تحويل التسميعات من أخضر إلى أصفر (للسنة الجديدة)
  static async resetYearlyColors(req, res) {
    try {
      const { academicYearId } = req.body;

      if (!academicYearId) {
        return res.status(400).json({ error: 'academicYearId is required' });
      }

      // تحقق من أن المستخدم هو مدير
      if (req.user.role_name !== 'admin') {
        return res.status(403).json({ error: 'Only admins can reset colors' });
      }

      const count = await Tasmee.resetYearlyColors(academicYearId);
      res.json({ message: `${count} tasmeat colors were reset` });
    } catch (error) {
      console.error('Reset yearly colors error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = TasmeeController;
