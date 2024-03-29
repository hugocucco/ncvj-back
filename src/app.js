import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors()); // para dev
    // this.server.use(cors({ origin: 'https://<endereco>.com.br' }));  para prod
    // apenas para testar
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
