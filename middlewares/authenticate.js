const jwt = require('jsonwebtoken');
const isUserVerified = require('./isUserVerified');

const 
authenticate = (req, res, next) => {
  const token = req.cookies.token;
  // Check if token is present
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    isUserVerified(req, res, next , decoded)
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
};

module.exports = authenticate;
