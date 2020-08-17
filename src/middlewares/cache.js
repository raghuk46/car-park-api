import redis from 'redis';
import { isNull } from 'lodash';

module.exports = (key) => (req, res, next) => {
  const client = redis.createClient(process.env.REDIS_URL);

  if (!isNull(key)) {
    client.get(key, (err, data) => {
      if (err) next(err);
      if (!isNull(data)) {
        let obj = { [key]: parseInt(data) };
        res.send({ status: 'success', ...obj });
      } else {
        next();
      }
    });
  } else {
    next();
  }
};
