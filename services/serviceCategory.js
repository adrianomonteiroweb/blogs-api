const { checkCategorySchema } = require('./schemasValidation');
const errorConstructor = require('../utils/functions');
const status = require('../utils/codes');
const { Categories } = require('../models');

const serviceCategoryCreate = async (requestBody) => {
  const { error } = checkCategorySchema.validate(requestBody);

  if (error) return errorConstructor(status.BAD_REQUEST, error.message);

  const { _previousDataValues } = await Categories.create(requestBody);

  return _previousDataValues;
};

const serviceCategoryGetAll = async () => {
  const allCategories = await Categories.findAll();

  return allCategories;
};

module.exports = {
  serviceCategoryCreate,
  serviceCategoryGetAll,
};
