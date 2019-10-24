import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PessoasController from './app/controllers/PessoasController';
import FileController from './app/controllers/FileController';

import ConsultaCPFController from './app/controllers/ConsultaCPFController';
import ConsultaBioController from './app/controllers/ConsultaBioController';

import CondenadoController from './app/controllers/CondenadoController';

import TemplatesController from './app/controllers/TemplatesController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// routes.put('/users', UserController.update); nao funciona

routes.post('/pessoas', PessoasController.store);
routes.put('/pessoas', PessoasController.update);
// routes.get('/pessoas', PessoasController.index); get o body vai pela url

routes.post('/consultacpf', ConsultaCPFController.index);
routes.post('/consultabio', ConsultaBioController.index);

routes.get('/condenados', CondenadoController.index);

routes.get('/templates', TemplatesController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
