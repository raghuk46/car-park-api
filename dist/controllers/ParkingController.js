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

let ParkingController = /*#__PURE__*/function (_BaseController) {
  _inherits(ParkingController, _BaseController);

  var _super = _createSuper(ParkingController);

  function ParkingController() {
    _classCallCheck(this, ParkingController);

    return _super.apply(this, arguments);
  }

  _createClass(ParkingController, [{
    key: "getTotalSlots",
    value: async function getTotalSlots() {
      try {
        const response = await this.repository.parking.getTotalSlots(this.redis);
        this.ok(response);
      } catch (err) {
        this.error(err);
      }
    }
  }, {
    key: "setTotalSlots",
    value: async function setTotalSlots() {
      try {
        const {
          totalSlots
        } = this.body;
        await _validations.totalSlotsSchema.validateAsync(this.body);
        const response = await this.repository.parking.updateSlots(totalSlots, this.redis);
        this.ok(response);
      } catch (err) {
        this.errorResponse(422, 'Unprocessible Entity', err.details);
      }
    }
  }, {
    key: "getAvailablefreeSlots",
    value: async function getAvailablefreeSlots() {
      try {
        const response = await this.repository.parking.getAvailablefreeSlots(this.redis);
        this.ok(response);
      } catch (err) {
        this.error(err);
      }
    }
  }, {
    key: "parkCar",
    value: async function parkCar() {
      try {
        await _validations.parkingSchema.validateAsync(this.body);
        const response = await this.repository.parking.parkCar(this.body, this.redis);
        this.ok(response);
      } catch (err) {
        this.errorResponse(422, 'Unprocessible Entity', err.details);
      }
    }
  }, {
    key: "unparkCar",
    value: async function unparkCar() {
      try {
        const {
          slotId
        } = this.params;
        await _validations.unparkSchema.validateAsync(this.params);
        const response = await this.repository.parking.unparkCar(slotId, this.redis);
        this.ok(response);
      } catch (err) {
        this.errorResponse(422, 'Unprocessible Entity', err.details);
      }
    }
  }, {
    key: "getCarsByType",
    value: async function getCarsByType() {
      try {
        const {
          type
        } = this.query;
        await _validations.typeSchema.validateAsync(this.query);
        const response = await this.repository.parking.getAllByType(type, 'type');
        this.ok(response);
      } catch (err) {
        console.log(err);
        this.errorResponse(422, 'Unprocessible Entity', err.details);
      }
    }
  }, {
    key: "getCarByNo",
    value: async function getCarByNo() {
      try {
        const {
          plateNo
        } = this.query;
        await _validations.plateNoSchema.validateAsync(this.query);
        const response = await this.repository.parking.getAllByType(plateNo, 'plateNo');
        this.ok(response);
      } catch (err) {
        this.errorResponse(422, 'Unprocessible Entity', err.details);
      }
    }
  }]);

  return ParkingController;
}(_BaseController2.default);

var _default = ParkingController;
exports.default = _default;
//# sourceMappingURL=ParkingController.js.map