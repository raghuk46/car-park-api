import morgan from 'morgan';

import logger from 'utils/logger';

module.exports = morgan('combined', {
  stream: logger.stream,
});
