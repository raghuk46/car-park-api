class BaseRoutes {
  constructor() {
    this.routes = [];
  }

  addRoute(uri, httpMethod, controllerClass, action, cacheKey = null) {
    this.routes.push({
      controllerClass,
      action,
      uri,
      httpMethod,
      cacheKey,
    });
  }
}

export default BaseRoutes;
