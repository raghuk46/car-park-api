import redis from 'redis';

import URIGenerator from 'utils/uriGenerator';
import constants from 'config/constants';
import logger from 'utils/logger';

class Boot {
  constructor(router, repository) {
    this.router = router;
    this.repository = repository;
    this.logger = logger;
    this.constants = constants;
    this.appRegisterRoute = this.appRegisterRoute.bind(this);
    this.appCreateRouteAction = this.appCreateRouteAction.bind(this);
    this.redis = redis.createClient({ host: 'redis-server', port: process.env.REDIS_PORT || 6379 });
  }

  appRegisterRoute(uri, httpMethod, boundAction) {
    throw new Error('Not Implemented Exception');
  }

  appCreateRouteAction(controllerClass, method) {
    const result = [
      (req, res, next) => {
        this.buildControllerInstance(controllerClass, req, res, next)[method](req, res, next);
      },
    ];

    return result;
  }

  buildControllerInstance(ControllerClass, req, res, next) {
    return new ControllerClass({
      base: `${req.protocol}://${req.get('host')}`,
      req,
      next,
      params: req.params,
      query: req.query,
      body: req.body,
      repository: this.repository,
      constants: this.constants,
      logger: this.logger,
      uriGenerator: new URIGenerator(),
      redis: this.redis,
      send: (statusCode, resource, location) => {
        if (location) {
          res.location(location);
        }
        res.status(statusCode).json(resource);
      },
    });
  }

  run() {
    this.repository.registerRepositories(this.logger);
    this.router.registerRoutes(this.appRegisterRoute, this.appCreateRouteAction);
  }
}

export default Boot;
