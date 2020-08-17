"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redis = _interopRequireDefault(require("redis"));

var _uriGenerator = _interopRequireDefault(require("../utils/uriGenerator"));

var _constants = _interopRequireDefault(require("../config/constants"));

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let Boot = /*#__PURE__*/function () {
  function Boot(router, repository) {
    _classCallCheck(this, Boot);

    this.router = router;
    this.repository = repository;
    this.logger = _logger.default;
    this.constants = _constants.default;
    this.appRegisterRoute = this.appRegisterRoute.bind(this);
    this.appCreateRouteAction = this.appCreateRouteAction.bind(this);
    this.redis = _redis.default.createClient({
      host: 'redis-server',
      port: process.env.REDIS_PORT || 6379
    });
  }

  _createClass(Boot, [{
    key: "appRegisterRoute",
    value: function appRegisterRoute(uri, httpMethod, boundAction) {
      throw new Error('Not Implemented Exception');
    }
  }, {
    key: "appCreateRouteAction",
    value: function appCreateRouteAction(controllerClass, method) {
      const result = [(req, res, next) => {
        this.buildControllerInstance(controllerClass, req, res, next)[method](req, res, next);
      }];
      return result;
    }
  }, {
    key: "buildControllerInstance",
    value: function buildControllerInstance(ControllerClass, req, res, next) {
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
        uriGenerator: new _uriGenerator.default(),
        redis: this.redis,
        send: (statusCode, resource, location) => {
          if (location) {
            res.location(location);
          }

          res.status(statusCode).json(resource);
        }
      });
    }
  }, {
    key: "run",
    value: function run() {
      this.repository.registerRepositories(this.logger);
      this.router.registerRoutes(this.appRegisterRoute, this.appCreateRouteAction);
    }
  }]);

  return Boot;
}();

var _default = Boot;
exports.default = _default;
//# sourceMappingURL=boot.js.map