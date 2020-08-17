"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserRepository = _interopRequireDefault(require("./UserRepository"));

var _ParkingRepository = _interopRequireDefault(require("./ParkingRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let Repository = /*#__PURE__*/function () {
  function Repository(db) {
    _classCallCheck(this, Repository);

    this.db = db;
  }

  _createClass(Repository, [{
    key: "registerRepositories",
    value: function registerRepositories(logger) {
      this.user = new _UserRepository.default(this.db, logger);
      this.parking = new _ParkingRepository.default(this.db, logger);
    }
  }]);

  return Repository;
}();

var _default = Repository;
exports.default = _default;
//# sourceMappingURL=index.js.map