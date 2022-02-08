const { serviceLogin } = require('../services/serviceLogin');
const { serviceUsersCreate } = require('../services/serviceUsers');
const status = require('../utils/codes');
const { alreadyRegistered, internatServerError } = require('../utils/messages');

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

const controllerLogin = async (req, res, next) => {
  let login;
  try {
    login = await serviceLogin(req.body);
  } catch (err) {
    console.error(err.message);
    err.status = status.UNAUTHORIZED;
    err.message = { message: internatServerError };
    next(err);
  }
  if (login.status) return res.status(login.status).json({ message: login.message });
  return res.status(status.OK).json(login);
};

module.exports = {
  controllerUserCreate,
  controllerLogin,
};
