"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let BaseController = /*#__PURE__*/function () {
  function BaseController({
    params,
    query,
    req,
    next,
    body,
    send,
    uriGenerator,
    logger,
    repository,
    redis
  }) {
    _classCallCheck(this, BaseController);

    this.uriGenerator = uriGenerator;
    this.params = params;
    this.query = query;
    this.req = req;
    this.next = next;
    this.body = body;
    this.send = send;
    this.logger = logger;
    this.repository = repository;
    this.redis = redis;
  }

  _createClass(BaseController, [{
    key: "error",
    value: function error(err) {
      const statusCode = err.statusCode || 500;
      const status = err.status || 'error';
      this.logger.error(_objectSpread(_objectSpread({}, err), {}, {
        status,
        statusCode,
        message: 'something went wrong'
      }));
      this.send(statusCode, _objectSpread({}, err));
    }
  }, {
    key: "errorResponse",
    value: function errorResponse(status, message, data) {
      const jsonData = {
        status: 'error',
        message,
        data
      };
      const statusCode = status;
      this.logger.info(jsonData);
      this.send(statusCode, jsonData);
    }
  }, {
    key: "created",
    value: function created(location, data) {
      if (location) {
        this.send(201, null, location);
      }

      this.send(201, data);
    }
  }, {
    key: "ok",
    value: function ok(data) {
      this.logger.info(data);
      this.send(200, data);
    }
  }, {
    key: "okResponse",
    value: function okResponse(data, message = '', status = 200) {
      this.logger.info(data);
      const jsonData = {};
      jsonData.status = 'success';
      if (data !== null) jsonData.data = data;
      if (message !== '') jsonData.message = message;
      this.send(status, jsonData);
    }
  }, {
    key: "noContent",
    value: function noContent() {
      this.send(204);
    }
  }]);

  return BaseController;
}();

var _default = BaseController;
exports.default = _default;
//# sourceMappingURL=BaseController.js.map