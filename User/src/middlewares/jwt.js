const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(200).json({ code: '0', message: 'No token provided' });
  }
  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;
  jwt.verify(tokenWithoutBearer, "vazir123456", (err, decoded) => {
    if (err) {
      return res.status(200).json({ code: '0', message: 'Unauthorized access' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
