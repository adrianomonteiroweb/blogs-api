const jwt = require('jsonwebtoken');

const status = require('../utils/codes');

const SECRET = 'secret';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { data } = jwt.verify(token, SECRET);
    req.user = data;

    return next();
  } catch (err) {
    res.status(status.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
    return next(err);
  }
};
