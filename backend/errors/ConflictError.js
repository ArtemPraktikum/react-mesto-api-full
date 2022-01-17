// 409 — при регистрации указан email, который уже существует на сервере;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = ConflictError;
