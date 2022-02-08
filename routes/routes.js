const routes = require('express').Router();

const {
  controllerUserCreate,
  controllerLogin,
} = require('../controller/controllerUsers');

routes.post('/user', controllerUserCreate);
routes.post('/login', controllerLogin);

module.exports = routes;
