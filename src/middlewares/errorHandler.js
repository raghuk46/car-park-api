import logger from 'utils/logger';

const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  console.log('******** Global handler ******', err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
  res.status(err.status || 500).json({ status: err.status, message: err.message });
};

export default errorHandler;
