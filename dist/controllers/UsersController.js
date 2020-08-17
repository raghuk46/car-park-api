"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BaseController2 = _interopRequireDefault(require("./BaseController"));

var _validations = require("../helpers/validations");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

let UsersController = /*#__PURE__*/function (_BaseController) {
  _inherits(UsersController, _BaseController);

  var _super = _createSuper(UsersController);

  function UsersController() {
    _classCallCheck(this, UsersController);

    return _super.apply(this, arguments);
  }

  _createClass(UsersController, [{
    key: "register",
    value: async function register() {
      try {
        await _validations.registrationSchema.validateAsync(this.body);
        const response = await this.repository.user.createUser(this.body);
        response.statusCode === 201 ? this.created('', response) : this.ok(response);
      } catch (err) {
        this.errorResponse(422, 'Unprocessible Entity', err.details);
      }
    }
  }, {
    key: "authenticate",
    value: async function authenticate() {
      try {
        await _validations.authSchema.validateAsync(this.body);
        const response = await this.repository.user.authenticate(this.body);
        this.ok(response);
      } catch (err) {
        console.log(err);
        this.errorResponse(422, 'Unprocessible Entity', err.details);
      }
    }
  }, {
    key: "getUserInfo",
    value: async function getUserInfo() {
      try {
        const response = await this.repository.user.getById(this.req.userId);
        this.ok(response);
      } catch (err) {
        this.logger.error(err);
      }
    }
  }]);

  return UsersController;
}(_BaseController2.default);

var _default = UsersController;
exports.default = _default;
//# sourceMappingURL=UsersController.js.map