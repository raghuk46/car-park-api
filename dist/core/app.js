"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _boot = _interopRequireDefault(require("./boot"));

var _logger = _interopRequireDefault(require("../utils/logger"));

var _httpLogger = _interopRequireDefault(require("../middlewares/httpLogger"));

var _errorHandler = _interopRequireDefault(require("../middlewares/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

let App = /*#__PURE__*/function (_Boot) {
  _inherits(App, _Boot);

  var _super = _createSuper(App);

  function App(router, repository) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, router, repository);
    _this.express = (0, _express.default)();
    _this.port = process.env.PORT || 3000;
    _this.environment = process.env.NODE_ENV || 'production';
    _this.host = 'localhost';
    _this.expressRouter = _express.default.Router();
    _this.logger = _logger.default;
    return _this;
  }

  _createClass(App, [{
    key: "appRegisterRoute",
    value: function appRegisterRoute(uri, httpMethod, boundAction) {
      this.expressRouter.route(uri)[httpMethod](boundAction);
    }
  }, {
    key: "registerMiddlewares",
    value: function registerMiddlewares() {
      this.express.use((0, _compression.default)());
      this.express.use(_bodyParser.default.json());
      this.express.use((0, _cors.default)());
      this.express.use((0, _helmet.default)());
      this.express.use(_bodyParser.default.urlencoded({
        extended: true
      }));
      this.express.use(_httpLogger.default);
      this.express.use(_errorHandler.default);
    }
  }, {
    key: "run",
    value: function run() {
      _get(_getPrototypeOf(App.prototype), "run", this).call(this);

      this.registerMiddlewares();
      this.express.use('/', this.expressRouter);
      this.express.use('/', (req, res) => res.send({
        message: 'Not Found'
      }));
      this.express.listen(this.port, this.host);

      _logger.default.log('info', `🚀 Server ready at http://${this.host}:${this.port}`, {
        tags: 'server'
      });

      return this.express;
    }
  }]);

  return App;
}(_boot.default);

var _default = App;
exports.default = _default;
//# sourceMappingURL=app.js.map