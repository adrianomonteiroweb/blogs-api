const routes = require('express').Router();

const {
  controllerCategoryCreate,
  controllerCategoryGetAll,
} = require('../controller/controllerCategories');
const { controllerPostCreate } = require('../controller/controllerPosts');
const {
  controllerUserCreate,
  controllerLogin,
  controllerSearchUsers,
  controllerSearchById,
} = require('../controller/controllerUsers');
const auth = require('../middlewares/auth');

routes.post('/user', controllerUserCreate);
routes.post('/login', controllerLogin);

routes.get('/user', auth, controllerSearchUsers);
routes.get('/user/:id', auth, controllerSearchById);

routes.post('/categories', auth, controllerCategoryCreate);
routes.get('/categories', auth, controllerCategoryGetAll);

routes.post('/post', auth, controllerPostCreate);

module.exports = routes;
