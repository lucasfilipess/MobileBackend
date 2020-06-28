const express = require('express');

const { celebrate } = require('celebrate');
const routes = express.Router();

const auth = require('./middlewares/auth');
const authEmail = require('./middlewares/authEmail');
const authUpdateEmail = require('./middlewares/authUpdateEmail');
const { login, register, idea, ideaEdit } = require('./middlewares/schemas');

const IdeasController = require('./controllers/IdeasController');
const UsersController = require('./controllers/UsersController');
const SessionController = require('./controllers/SessionController');

routes.get('/users', UsersController.index);
routes.get('/users/my-data', auth, UsersController.getMyData);

routes.post(
  '/users',
  authEmail,
  celebrate({
    body: register,
  }),
  UsersController.create
);

routes.put(
  '/users',
  auth,
  authUpdateEmail,
  celebrate({
    body: register,
  }),
  UsersController.update
);

routes.post(
  '/login',
  celebrate({
    body: login,
  }),
  SessionController.login
);

routes.get('/ideas/recent', IdeasController.index);
routes.get('/ideas/old', IdeasController.old);
routes.get('/ideas/likes', IdeasController.likes);
routes.get('/ideas/deslikes', IdeasController.deslikes);
routes.delete('/ideas/delete/:id', auth, IdeasController.delete);

routes.get('/my-ideas', auth, IdeasController.myIdeas);

routes.post(
  '/ideas',
  auth,
  celebrate({
    body: idea,
  }),
  IdeasController.create
);
routes.put(
  '/ideas',
  auth,
  celebrate({
    body: ideaEdit,
  }),
  IdeasController.update
);
routes.put('/like/:id', auth, IdeasController.like);

routes.put('/deslike/:id', auth, IdeasController.deslike);

module.exports = routes;
