import dotenv from 'dotenv';
import App from 'core/app';
import Router from 'routes';
import ApiRoutes from 'routes/api.routes';
import db from 'models';
// import Service from 'services';
import Repository from 'repositories';

const enviroment = process.env.NODE_ENV || 'production';

dotenv.config();

const initServer = () => {
  const router = new Router([new ApiRoutes()]);
  const repository = new Repository(db);
  // const service = new Service(repository);
  const server = new App(router, repository);
  return server.run();
};

if (enviroment !== 'test') {
  initServer();
}

module.exports = initServer;
