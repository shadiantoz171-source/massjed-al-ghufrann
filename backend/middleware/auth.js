const jwt = require('jsonwebtoken');

// التحقق من التوكن
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// التحقق من الصلاحيات
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role_name)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// التحقق من أن المستخدم هو المدير
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role_name === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// التحقق من أن المستخدم معلم أو مدير
const isTeacherOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role_name === 'admin' || req.user.role_name === 'teacher')) {
    next();
  } else {
    res.status(403).json({ error: 'Teacher or Admin access required' });
  }
};

module.exports = {
  authenticateToken,
  authorize,
  isAdmin,
  isTeacherOrAdmin
};
