// 401 — передан неверный логин или пароль. Ещё эту ошибку возвращает авторизационный middleware,
// если передан неверный JWT;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = UnauthorizedError;
