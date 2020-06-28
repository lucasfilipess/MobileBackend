const { Joi } = require('celebrate');

module.exports = {
  register: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    profile_picture: Joi.string().required(),
    password: Joi.string().required().min(1),
  }),

  login: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(1),
  }),

  idea: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    references: Joi.string(),
  }),
  ideaEdit: Joi.object().keys({
    id: Joi.number().integer().max(9).required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    references: Joi.string(),
  }),
};
