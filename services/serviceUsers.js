const { Users } = require('../models');
const { checkUserSchema } = require('./schemasValidation');
const errorConstructor = require('../utils/functions/index');
const status = require('../utils/codes');
const { alreadyRegistered } = require('../utils/messages');

const serviceUsersCreate = async (user) => {
  const { error } = checkUserSchema.validate(user);

  const passwordMSG = error && error.message.replace(' at least 6', ' 6');

  if (error) return errorConstructor(status.BAD_REQUEST, passwordMSG);

  const searchEmail = await Users.findOne({
    where: {
      email: user.email,
    },
  });

  if (searchEmail) return errorConstructor(status.CONFLICT, alreadyRegistered);

  const userCreated = await Users.create(user);

  return userCreated;
};

const serviceSearchUsers = async () => {
  const users = await Users.findAll();

  return users;
};

const serviceSearchById = async (id) => {
  const users = await Users.findByPk(id);
  
  return users;
};

module.exports = {
  serviceUsersCreate,
  serviceSearchUsers,
  serviceSearchById,
};
