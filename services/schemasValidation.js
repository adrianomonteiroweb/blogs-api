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

const checkCategorySchema = Joi.object({
  name: Joi.string().required(),
});

const checkPostSchema = Joi.object({
  title: Joi.required(),
  content: Joi.required(),
  categoryIds: Joi.required(),
});

module.exports = {
  checkUserSchema,
  checkLoginSchema,
  checkCategorySchema,
  checkPostSchema,
};
