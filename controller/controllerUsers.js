const { serviceLogin } = require('../services/serviceLogin');
const {
  serviceUsersCreate,
  serviceSearchUsers,
  serviceSearchById,
} = require('../services/serviceUsers');
const status = require('../utils/codes');
const {
  alreadyRegistered,
  internatServerError,
} = require('../utils/messages');

const controllerUserCreate = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  let user;
  try {
    user = await serviceUsersCreate({ displayName, email, password, image });
    console.log(user);
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

const controllerSearchUsers = async (req, res, next) => {
  let users;
  try {
    users = await serviceSearchUsers();
  } catch (err) {
    console.error(err.message);
    err.status = status.UNAUTHORIZED;
    err.message = { message: internatServerError };
    next(err);
  }

  return res.status(status.OK).json(users);
};

const controllerSearchById = async (req, res, next) => {
  const { id } = req.params;
  let users;

  try {
    users = await serviceSearchById(id);
  } catch (err) {
    console.error(err.message);
    err.status = status.UNAUTHORIZED;
    err.message = { message: internatServerError };
    next(err);
  }

  return users
  ? res.status(status.OK).json(users)
  : res.status(status.NOT_FOUND).json({ message: 'User does not exist' });
};

module.exports = {
  controllerUserCreate,
  controllerLogin,
  controllerSearchUsers,
  controllerSearchById,
};
