"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  file: {
    level: 'info',
    filename: `./logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = _winston.default.createLogger({
  transports: [new _winston.default.transports.File(options.file), new _winston.default.transports.Console(options.console)],
  exitonError: false
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};
var _default = logger;
exports.default = _default;
//# sourceMappingURL=logger.js.map