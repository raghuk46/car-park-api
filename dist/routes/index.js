"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _routesCollection = _interopRequireDefault(require("../utils/routesCollection"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _cache = _interopRequireDefault(require("../middlewares/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let Router = /*#__PURE__*/function () {
  function Router(routes) {
    _classCallCheck(this, Router);

    this.routes = routes;
  }

  _createClass(Router, [{
    key: "registerRoutes",
    value: function registerRoutes(registerRoute, createRouteAction) {
      this.routes.forEach(builder => {
        const routes = builder.getRoutes();
        routes.forEach(({
          controllerClass,
          action,
          uri,
          httpMethod
        }) => {
          _routesCollection.default.addRouteData(controllerClass, action, {
            uri,
            httpMethod
          });

          const boundAction = createRouteAction(controllerClass, action);
          registerRoute(uri, httpMethod, [boundAction]);
        }); // Handling Secured Routes

        const protectedRoutes = builder.getSecuredRoutes();
        protectedRoutes.forEach(({
          controllerClass,
          action,
          uri,
          httpMethod,
          cacheKey
        }) => {
          _routesCollection.default.addRouteData(controllerClass, action, {
            uri,
            httpMethod
          });

          const boundAction = createRouteAction(controllerClass, action);
          registerRoute(uri, httpMethod, [_auth.default, (0, _cache.default)(cacheKey), boundAction]);
        });
      });
    }
  }]);

  return Router;
}();

var _default = Router;
exports.default = _default;
//# sourceMappingURL=index.js.map