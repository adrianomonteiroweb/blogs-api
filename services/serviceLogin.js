const jwt = require('jsonwebtoken');

const { checkLoginSchema } = require('./schemasValidation');
const errorConstructor = require('../utils/functions/index');
const status = require('../utils/codes');
const { Users } = require('../models');
const { invalidFields } = require('../utils/messages');

const SECRET = 'secret';
const EXPIRES = { expiresIn: '7d', algorithm: 'HS256' };

const serviceLogin = async (requestBody) => {
  const { error } = checkLoginSchema.validate(requestBody);

  if (error) return errorConstructor(status.BAD_REQUEST, error.message);

  const searchEmail = await Users.findAll({
    where: {
      email: requestBody.email,
    },
  });

  if (!searchEmail.length > 0) return errorConstructor(status.BAD_REQUEST, invalidFields);

  const { password: passBD, ...userWithoutPassword } = searchEmail;
  const token = jwt.sign({ data: userWithoutPassword }, SECRET, EXPIRES);

  return { token };
};

module.exports = {
  serviceLogin,
};
