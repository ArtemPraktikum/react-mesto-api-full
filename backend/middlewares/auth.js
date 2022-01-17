const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const bearerToken = req.cookies.cookieToken;

  if (!bearerToken) {
    throw new UnauthorizedError('Необходимо залогиниться');
  }

  const authToken = bearerToken.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(authToken, 'supa-dupa-secret-key');
  } catch (err) {
    // выкинуть ошибку если верификация токена не удалась.
    throw new UnauthorizedError('Необходимо залогиниться');
  }

  req.user = payload;

  next();
};

module.exports = auth;
