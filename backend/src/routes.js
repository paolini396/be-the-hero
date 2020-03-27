const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create); // route de login da ONG.

routes.get('/ongs', OngController.index); //route para listar todas as "ONGS" do banco de dados.
routes.post('/ongs', OngController.create); //route para criação da "ONG".

routes.get('/profile', ProfileController.index); //route listando incidents (casos) de apenas uma ONG.

routes.get('/incidents', IncidentController.index); // route para listar todos os incidentes (caso ocorrido) na ONG.
routes.post('/incidents', IncidentController.create); // route para criar um incidente (caso ocorrido) na ONG.

routes.delete('/incidents/:id', IncidentController.delete); //route para delear um indicente ( um caso da ONG).



module.exports = routes;

