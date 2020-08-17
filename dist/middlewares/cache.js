"use strict";

var _redis = _interopRequireDefault(require("redis"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = key => (req, res, next) => {
  const client = _redis.default.createClient({
    host: 'redis-server',
    port: process.env.REDIS_PORT || 6379
  });

  if (!(0, _lodash.isNull)(key)) {
    client.get(key, (err, data) => {
      if (err) next(err);

      if (!(0, _lodash.isNull)(data)) {
        let obj = {
          [key]: parseInt(data)
        };
        res.send(_objectSpread({
          status: 'success'
        }, obj));
      } else {
        next();
      }
    });
  } else {
    next();
  }
};
//# sourceMappingURL=cache.js.map