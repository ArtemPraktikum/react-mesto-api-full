const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

// схемы и модели карточки
const card = require('../models/card');

// возвращает все карточки.
const getCards = (req, res, next) => {
  card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};
// создаёт карточку.
const createCard = (req, res, next) => {
  const owner = req.user._id;
  card.create({ ...req.body, owner })
    .then((c) => res.status(201).send(c))
    .catch((err) => {
      throw new BadRequestError('Переданы некорректные данные при создании карточки');
    })
    .catch(next);
};
// удаляет карточку по идентификатору.
const deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .orFail()
    .catch(() => {
      throw new NotFoundError('Карточка по указанному cardId не найдена.');
    })
    .then((c) => {
      if (c.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      } else {
        card.findByIdAndDelete(req.params.cardId)
          .then((deletedCard) => {
            res.status(200).send(deletedCard);
          });
      }
    })
    .catch(next);
};
// поставить лайк карточке.
const likeCard = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (c) {
        res.status(201).send(c);
      } else {
        throw new NotFoundError('Карточка с указанным cardId не найдена.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передаётся невалидный cardId'));
      }
      next(err);
    });
};
// убрать лайк с карточки.
const dislikeCard = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (c) {
        res.status(201).send(c);
      } else {
        throw new NotFoundError('Карточка с указанным cardId не найдена.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передаётся невалидный cardId'));
      }
      next(err);
    });
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
