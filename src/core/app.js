import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import Boot from './boot';
import logger from 'utils/logger';
import httpLogger from 'middlewares/httpLogger';
import errorHandler from 'middlewares/errorHandler';

class App extends Boot {
  constructor(router, repository) {
    super(router, repository);
    this.express = express();
    this.port = process.env.PORT || 5000;
    this.environment = process.env.NODE_ENV || 'production';
    this.host = '0.0.0.0';
    this.expressRouter = express.Router();
    this.logger = logger;
  }

  appRegisterRoute(uri, httpMethod, boundAction) {
    this.expressRouter.route(uri)[httpMethod](boundAction);
  }

  registerMiddlewares() {
    this.express.use(compression());
    this.express.use(bodyParser.json());
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(httpLogger);
    this.express.use(errorHandler);
  }

  run() {
    super.run();
    this.registerMiddlewares();

    this.express.use('/', this.expressRouter);
    this.express.use('/', (req, res) => res.send({ message: 'Not Found' }));
    this.express.listen(this.port, this.host);
    logger.log('info', `🚀 Server ready at http://${this.host}:${this.port}`, { tags: 'server' });

    return this.express;
  }
}

export default App;
