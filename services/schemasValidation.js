const Joi = require('joi');

const checkUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const checkLoginSchema = Joi.object({
  email: Joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  checkUserSchema,
  checkLoginSchema,
};
