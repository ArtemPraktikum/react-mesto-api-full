// 403 — попытка удалить чужую карточку;

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

module.exports = ForbiddenError;
