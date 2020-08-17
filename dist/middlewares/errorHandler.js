"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  console.log('******** Global handler ******', err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  _logger.default.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(err.status || 500).json({
    status: err.status,
    message: err.message
  });
};

var _default = errorHandler;
exports.default = _default;
//# sourceMappingURL=errorHandler.js.map