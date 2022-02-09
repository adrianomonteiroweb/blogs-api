const routes = require('express').Router();

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

module.exports = routes;
