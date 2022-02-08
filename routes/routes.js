const routes = require('express').Router();

const {
  controllerUserCreate,
} = require('../controller/controllerUsers');

routes.post('/user', controllerUserCreate);

module.exports = routes;
