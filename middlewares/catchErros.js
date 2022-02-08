const status = require('../utils/codes');
const { internatServerError } = require('../utils/messages');

module.exports = (err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });

  return res.status(status.INTERNAL_SERVER_ERROR).json({ message: internatServerError });
};
