const { serviceCategoryCreate } = require('../services/serviceCategory');
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

module.exports = {
  controllerCategoryCreate,
};
