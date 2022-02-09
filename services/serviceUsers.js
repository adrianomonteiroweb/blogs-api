const { User } = require('../models');
const { checkUserSchema } = require('./schemasValidation');
const errorConstructor = require('../utils/functions/index');
const status = require('../utils/codes');
const { alreadyRegistered } = require('../utils/messages');

const serviceUsersCreate = async (user) => {
  const { error } = checkUserSchema.validate(user);

  const passwordMSG = error && error.message.replace(' at least 6', ' 6');

  if (error) return errorConstructor(status.BAD_REQUEST, passwordMSG);

  const searchEmail = await User.findAll({
    where: {
      email: user.email,
    },
  });

  if (searchEmail.length > 0) return errorConstructor(status.CONFLICT, alreadyRegistered);

  const userCreated = await User.create(user);

  return userCreated;
};

const serviceSearchUsers = async () => {
  const users = await User.findAll();

  return users;
};

module.exports = {
  serviceUsersCreate,
  serviceSearchUsers,
};
