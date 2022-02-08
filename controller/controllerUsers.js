const { serviceUsersCreate } = require('../services/serviceUsers');
const status = require('../utils/codes');
const { alreadyRegistered } = require('../utils/messages');

const controllerUserCreate = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  let user;
  try {
    user = await serviceUsersCreate({ displayName, email, password, image });
  } catch (err) {
    console.error(err.message);
    err.status = status.UNAUTHORIZED;
    err.message = { message: alreadyRegistered };
    return next(err);
  }
  if (user.status) return res.status(user.status).json({ message: user.message });
  return user
  ? res.status(status.CREATED).json(user)
  : [];
};

module.exports = {
  controllerUserCreate,
};
