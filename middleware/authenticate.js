const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// // JWT token verification middleware
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  } else {
    jwt.verify(token, 'secretKey', (err, decoded) => {
      if (err) {
      return res.status(401).json({ error: 'Invalid token' });
      }
      req.userId = decoded._id;
      next();
    });
  }
}

module.exports = verifyToken;