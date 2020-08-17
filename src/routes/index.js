import RoutesCollection from 'utils/routesCollection';
import jwtAuth from 'middlewares/auth';
import cache from 'middlewares/cache';

class Router {
  constructor(routes) {
    this.routes = routes;
  }

  registerRoutes(registerRoute, createRouteAction) {
    this.routes.forEach((builder) => {
      const routes = builder.getRoutes();
      routes.forEach(({ controllerClass, action, uri, httpMethod }) => {
        RoutesCollection.addRouteData(controllerClass, action, {
          uri,
          httpMethod,
        });
        const boundAction = createRouteAction(controllerClass, action);
        registerRoute(uri, httpMethod, [boundAction]);
      });

      // Handling Secured Routes
      const protectedRoutes = builder.getSecuredRoutes();
      protectedRoutes.forEach(({ controllerClass, action, uri, httpMethod, cacheKey }) => {
        RoutesCollection.addRouteData(controllerClass, action, {
          uri,
          httpMethod,
        });
        const boundAction = createRouteAction(controllerClass, action);
        registerRoute(uri, httpMethod, [jwtAuth, cache(cacheKey), boundAction]);
      });
    });
  }
}

export default Router;
