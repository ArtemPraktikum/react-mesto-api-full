// 404 — карточка или пользователь не найден, или был запрошен несуществующий роут;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = NotFoundError;
