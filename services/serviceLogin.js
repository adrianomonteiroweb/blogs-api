const jwt = require('jsonwebtoken');

require('dotenv').config();

const { checkLoginSchema } = require('./schemasValidation');
const errorConstructor = require('../utils/functions/index');
const status = require('../utils/codes');
const { Users } = require('../models');
const { invalidFields } = require('../utils/messages');

const SECRET = process.env.SECRET || 'secret';
const EXPIRES = { expiresIn: '2h', algorithm: 'HS256' };

const serviceLogin = async (requestBody) => {
  const { error } = checkLoginSchema.validate(requestBody);

  if (error) return errorConstructor(status.BAD_REQUEST, error.message);

  const searchEmail = await Users.findOne({
    where: {
      email: requestBody.email,
    },
  });

  if (!searchEmail) return errorConstructor(status.BAD_REQUEST, invalidFields);

  const { password: passBD, ...userWithoutPassword } = searchEmail;
  const token = jwt.sign({ data: userWithoutPassword }, SECRET, EXPIRES);

  return { token };
};

module.exports = {
  serviceLogin,
};
