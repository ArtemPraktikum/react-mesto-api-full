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
    .then((c) => res.status(201).send({ data: c }))
    .catch(next);
};
// удаляет карточку по идентификатору.
const deleteCard = (req, res, next) => {
  card.findById(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError('Карточка по указанному _id не найдена.');
    })
    .then((c) => {
      if (c.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      } else {
        card.findByIdAndDelete(req.params._id)
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
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (c) {
        res.status(201).send(c);
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передаётся невалидный id'));
      }
      next(err);
    });
};
// убрать лайк с карточки.
const dislikeCard = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((c) => {
      if (c) {
        res.status(201).send(c);
      } else {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передаётся невалидный id'));
      }
      next(err);
    });
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};