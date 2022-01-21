const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  console.log(req.headers.authorization);
  console.log(token);
  if (!token) {
    throw new UnauthorizedError('Необходимо залогиниться');
  } else {
    let payload;
    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
    } catch (err) {
      throw new UnauthorizedError('Необходимо залогиниться');
    }
    req.user = payload;
    next();
  }
};

module.exports = auth;
