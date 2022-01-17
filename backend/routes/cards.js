const express = require('express');

const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const cardRouter = express.Router();
const auth = require('../middlewares/auth');
// контроллер карточки
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// GET /cards — возвращает все карточки.
cardRouter.get('/cards', auth, getCards);

// POST /cards — создаёт карточку.
cardRouter.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new CelebrateError('Некорректный URL');
      }
      return value;
    }).required(),
  }),
}), createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
cardRouter.delete('/cards/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
cardRouter.put('/cards/:_id/likes', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
}), likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
cardRouter.delete('/cards/:_id/likes', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
}), dislikeCard);

module.exports = cardRouter;
