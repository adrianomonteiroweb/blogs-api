const routes = require('express').Router();

const {
  controllerUserCreate,
  controllerLogin,
  controllerSearchUsers,
} = require('../controller/controllerUsers');
const auth = require('../middlewares/auth');

routes.post('/user', controllerUserCreate);
routes.post('/login', controllerLogin);
routes.get('/user', auth, controllerSearchUsers);

module.exports = routes;
