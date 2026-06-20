const Student = require('../models/Student');

class StudentController {
  // إنشاء طالب جديد
  static async createStudent(req, res) {
    try {
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
        teacher_id
      } = req.body;

      // التحقق من البيانات المطلوبة
      if (!student_name || !father_name || !mother_name || !birth_date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const student = await Student.create({
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
        created_by: req.user.id
      });

      res.status(201).json({
        message: 'Student created successfully',
        student
      });
    } catch (error) {
      console.error('Create student error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // الحصول على طالب بواسطة ID
  static async getStudent(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.json(student);
    } catch (error) {
      console.error('Get student error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // الحصول على جميع الطلاب
  static async getAllStudents(req, res) {
    try {
      const { teacherId, educationLevel } = req.query;
      const filters = {};

      if (teacherId) filters.teacherId = teacherId;
      if (educationLevel) filters.educationLevel = educationLevel;

      const students = await Student.getAll(filters);
      res.json(students);
    } catch (error) {
      console.error('Get all students error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // تحديث بيانات الطالب
  static async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const updatedStudent = await Student.update(id, req.body);
      res.json({
        message: 'Student updated successfully',
        student: updatedStudent
      });
    } catch (error) {
      console.error('Update student error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // حذف الطالب
  static async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      await Student.delete(id);
      res.json({ message: 'Student deleted successfully' });
    } catch (error) {
      console.error('Delete student error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // الحصول على تسميعات الطالب
  static async getStudentTaskmeat(req, res) {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);

      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // تحقق من أن المستخدم هو المعلم أو المدير أو الطالب نفسه
      if (
        req.user.role_name !== 'admin' &&
        req.user.role_name !== 'teacher' &&
        student.teacher_id !== req.user.id
      ) {
        return res.status(403).json({ error: 'Access denied' });
      }

      const tasmeat = await Student.getTaskmeat(id);
      res.json(tasmeat);
    } catch (error) {
      console.error('Get student tasmeat error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = StudentController;
