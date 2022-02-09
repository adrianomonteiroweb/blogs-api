const jwt = require('jsonwebtoken');

require('dotenv').config();

const status = require('../utils/codes');

const SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(status.UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const { data } = jwt.verify(token, SECRET);
    req.user = data;

    return next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};
