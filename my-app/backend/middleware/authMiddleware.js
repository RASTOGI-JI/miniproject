const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token. Authorization denied.' });
  }

  // Check if JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set in environment variables');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
