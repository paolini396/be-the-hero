const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create); // route de login da ONG.

routes.get('/ongs', OngController.index); //route para listar todas as "ONGS" do banco de dados.

routes.post('/ongs', celebrate({
  //Validação do cadastro
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create); //route para criação da "ONG".

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index); //route listando incidents (casos) de apenas uma ONG.

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index); // route para listar todos os incidentes (caso ocorrido) na ONG.

// fazer a validação  da criação (BOODY, HEADERS)
routes.post('/incidents', IncidentController.create); // route para criar um incidente (caso ocorrido) na ONG.

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete); //route para delear um indicente ( um caso da ONG).


routes.delete('/ongs/:id', OngController.delete);

module.exports = routes;

