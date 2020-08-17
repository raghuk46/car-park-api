class BaseController {
  constructor({ params, query, req, next, body, send, uriGenerator, logger, repository, redis }) {
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
    this.validationErrorOptions = {
      errors: {
        wrap: {
          label: '',
        },
      },
    };
  }

  error(err) {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    this.logger.error({ ...err, status, statusCode, message: 'something went wrong' });
    this.send(statusCode, { ...err });
  }

  errorResponse(status, message, data) {
    const jsonData = { status: 'error', message, data };

    const statusCode = status;
    this.logger.info(jsonData);
    this.send(statusCode, jsonData);
  }

  created(location, data) {
    if (location) {
      this.send(201, null, location);
    }

    this.send(201, data);
  }

  ok(data) {
    this.logger.info(data);
    this.send(200, data);
  }

  okResponse(data, message = '', status = 200) {
    this.logger.info(data);

    const jsonData = {};
    jsonData.status = 'success';

    if (data !== null) jsonData.data = data;
    if (message !== '') jsonData.message = message;

    this.send(status, jsonData);
  }

  noContent() {
    this.send(204);
  }
}

export default BaseController;
