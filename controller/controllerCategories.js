const {
  serviceCategoryCreate,
  serviceCategoryGetAll,
} = require('../services/serviceCategory');
const status = require('../utils/codes');
const { internatServerError } = require('../utils/messages');

const controllerCategoryCreate = async (req, res, next) => {
  let categoryCreated;
  try {
    categoryCreated = await serviceCategoryCreate(req.body);
  } catch (error) {
    console.error(error.message);
    error.status = status.INTERNAL_SERVER_ERROR;
    error.message = internatServerError;
    return next(error);
  }
  console.log(categoryCreated);
  return categoryCreated.status
  ? res.status(categoryCreated.status).json({ message: categoryCreated.message })
  : res.status(status.CREATED).json(categoryCreated);
};

const controllerCategoryGetAll = async (_req, res, next) => {
  let categories;
  try {
    categories = await serviceCategoryGetAll();
  } catch (error) {
    console.error(error.message);
    error.status = status.INTERNAL_SERVER_ERROR;
    error.message = internatServerError;
    return next(error);
  }

  return categories.status
  ? res.status(categories.status).json({ message: categories.message })
  : res.status(status.OK).json(categories);
};

module.exports = {
  controllerCategoryCreate,
  controllerCategoryGetAll,
};
