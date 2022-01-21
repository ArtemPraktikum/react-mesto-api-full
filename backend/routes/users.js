const express = require('express');

const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const userRouter = express.Router();
// контроллер юзера
const {
  getUsers, getUser, patchUser, patchAvatar, getMyUser,
} = require('../controllers/users');

// GET /users — возвращает всех пользователей
userRouter.get('/', getUsers);

// GET /users/:userId - возвращает пользователя по _id
userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUser);

// PATCH /users/me — обновляет профиль
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(20),
  }),
}), patchUser);

// PATCH /users/me/avatar — обновляет аватар
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new CelebrateError('Некорректный URL');
      }
      return value;
    }),
  }),
}), patchAvatar);

// GET /users/me - возвращает информацию о текущем пользователе
userRouter.get('/me', getMyUser);

module.exports = userRouter;
