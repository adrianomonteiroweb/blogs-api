const {
  servicePostCreate,
  servicePostsSearch,
  servicePostSearchById,
} = require('../services/servicePosts');
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

const controllerPostsSearch = async (_req, res, next) => {
  let allPosts;
  try {
    allPosts = await servicePostsSearch();
  } catch (error) {
    console.error(error.message);
    error.status = status.INTERNAL_SERVER_ERROR;
    error.message = internatServerError;
    return next(error);
  }

  return allPosts.status
  ? res.status(allPosts.status).json({ message: allPosts.message })
  : res.status(status.OK).json(allPosts);
};

const controllerPostSearchById = async (req, res, next) => {
  let post;
  try {
    post = await servicePostSearchById(req.params.id);
  } catch (error) {
    console.error(error.message);
    error.status = status.INTERNAL_SERVER_ERROR;
    error.message = internatServerError;
    return next(error);
  }

  return post.status
  ? res.status(post.status).json({ message: post.message })
  : res.status(status.OK).json(post);
};

module.exports = {
  controllerPostCreate,
  controllerPostsSearch,
  controllerPostSearchById,
};
