"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./core/app"));

var _routes = _interopRequireDefault(require("./routes"));

var _api = _interopRequireDefault(require("./routes/api.routes"));

var _models = _interopRequireDefault(require("./models"));

var _repositories = _interopRequireDefault(require("./repositories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Service from 'services';
const enviroment = process.env.NODE_ENV || 'production';

_dotenv.default.config();

const initServer = () => {
  const router = new _routes.default([new _api.default()]);
  const repository = new _repositories.default(_models.default); // const service = new Service(repository);

  const server = new _app.default(router, repository);
  return server.run();
};

if (enviroment !== 'test') {
  initServer();
}

module.exports = initServer;
//# sourceMappingURL=server.js.map