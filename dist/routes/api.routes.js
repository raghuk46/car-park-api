"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("./base.routes"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _ParkingController = _interopRequireDefault(require("../controllers/ParkingController"));

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

let ApiRoutes = /*#__PURE__*/function (_BaseRoutes) {
  _inherits(ApiRoutes, _BaseRoutes);

  var _super = _createSuper(ApiRoutes);

  function ApiRoutes() {
    _classCallCheck(this, ApiRoutes);

    return _super.apply(this, arguments);
  }

  _createClass(ApiRoutes, [{
    key: "getRoutes",
    // TO Register Routes this is pattern

    /**
     * 1. endpoint url decleration
     * 2. method associated like (GET, PUT, POST, DELETE, PATCH)
     * 3. controller name
     * 4. method you want to expose from the specific contoller.
     */
    value: function getRoutes() {
      /* campaigns */
      this.addRoute('/register', 'post', _UsersController.default, 'register');
      this.addRoute('/login', 'post', _UsersController.default, 'authenticate');
      return this.routes;
    } // Secured router list those required jWT Token Authorization.

  }, {
    key: "getSecuredRoutes",
    value: function getSecuredRoutes() {
      this.addRoute('/userInfo', 'get', _UsersController.default, 'getUserInfo');
      this.addRoute('/slots', 'get', _ParkingController.default, 'getTotalSlots', 'totalSlots');
      this.addRoute('/updateSlots', 'post', _ParkingController.default, 'setTotalSlots');
      this.addRoute('/getFreeSlots', 'get', _ParkingController.default, 'getAvailablefreeSlots', 'freeSlots');
      this.addRoute('/parkCar', 'post', _ParkingController.default, 'parkCar');
      this.addRoute('/unparkCar/:slotId', 'get', _ParkingController.default, 'unparkCar');
      this.addRoute('/getCarsByType', 'get', _ParkingController.default, 'getCarsByType');
      this.addRoute('/getCarByNo', 'get', _ParkingController.default, 'getCarByNo');
      return this.routes;
    }
  }]);

  return ApiRoutes;
}(_base.default);

var _default = ApiRoutes;
exports.default = _default;
//# sourceMappingURL=api.routes.js.map