const jwt = require('jsonwebtoken');

// Use environment variable for JWT secret, with fallback for development
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production-NEVER-USE-IN-PROD';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken, SECRET_KEY };
