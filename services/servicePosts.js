const { checkPostSchema } = require('./schemasValidation');
const errorConstructor = require('../utils/functions');
const status = require('../utils/codes');
const { Categories, BlogPosts, Users } = require('../models');

const servicePostCreate = async (userId, title, content, categoryIds) => {
  const { error } = checkPostSchema.validate({ title, content, categoryIds });

  if (error) return errorConstructor(status.BAD_REQUEST, error.message);
  const getCategory = await Categories.findOne({ where: { id: categoryIds } });

  if (!getCategory) return errorConstructor(status.BAD_REQUEST, '"categoryIds" not found');

  const { dataValues } = await BlogPosts.create({ userId, title, content, categoryIds });
  // console.log('service: ', dataValues);
  return dataValues;
};

const servicePostsSearch = async () => {
  const allPosts = await BlogPosts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  console.log('service: ', allPosts);
  return allPosts;
};

module.exports = {
  servicePostCreate,
  servicePostsSearch,
};
