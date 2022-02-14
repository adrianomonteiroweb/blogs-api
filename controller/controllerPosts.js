const { servicePostCreate } = require('../services/servicePosts');
const { serviceGetUserByEmail } = require('../services/serviceUsers');
const status = require('../utils/codes');
const { internatServerError } = require('../utils/messages');

const controllerPostCreate = async (req, res, next) => {
  const { email } = req.user.dataValues;
  
  const { id } = await serviceGetUserByEmail(email);
  const { title, content, categoryIds } = req.body;
  let postCreated;
  try {
    postCreated = await servicePostCreate(id, title, content, categoryIds);
  } catch (error) {
    console.error(error.message);
    error.status = status.INTERNAL_SERVER_ERROR;
    error.message = internatServerError;
    return next(error);
  }
  // console.log('controller: ', postCreated.message);
  return postCreated.status
  ? res.status(postCreated.status).json({ message: postCreated.message })
  : res.status(status.CREATED).json(postCreated);
};

module.exports = {
  controllerPostCreate,
};
