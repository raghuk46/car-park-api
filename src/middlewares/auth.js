import jwt from 'jsonwebtoken';

module.exports = async function (req, res, next) {
  try {
    const token = req.headers['x-access-token'] || req.headers.authorization;

    if (!token)
      return res
        .status(401)
        .send({ statusCode: 401, status: 'failed', message: 'UnAuthorized. Token Not Specified' });
    const extractTokenHash = token.split(' ');

    if (extractTokenHash[0] !== 'Bearer') {
      res.status(400).send({ message: 'Invalid token.' });
    }

    const { uuid } = jwt.verify(extractTokenHash[1], process.env.JWT_SECRET);

    if (uuid === null || uuid === undefined) {
      res.status(400).send({ message: 'Invalid token.' });
    }

    req.userId = uuid;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).send({ statusCode: 401, status: 'success', message: 'Session Expired' });
    }
  }
};
