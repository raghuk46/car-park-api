class RoutesCollection {
  static addRouteData(controller, action, routeData) {
    routeData.controller = controller.name;
    routeData.action = action;

    if (!RoutesCollection[controller.name]) {
      RoutesCollection[controller.name] = {};
    }

    RoutesCollection[controller.name] = {
      ...RoutesCollection[controller.name],
      [action]: routeData,
    };
  }
}

export default RoutesCollection;
