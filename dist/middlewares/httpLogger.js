"use strict";

var _morgan = _interopRequireDefault(require("morgan"));

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = (0, _morgan.default)('combined', {
  stream: _logger.default.stream
});
//# sourceMappingURL=httpLogger.js.map