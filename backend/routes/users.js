const express = require('express');

const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const userRouter = express.Router();
const auth = require('../middlewares/auth');
// контроллер юзера
const {
  getUsers, getUser, patchUser, patchAvatar, getMyUser,
} = require('../controllers/users');

// GET /users — возвращает всех пользователей
userRouter.get('/users', auth, getUsers);

// GET /users/:userId - возвращает пользователя по _id
userRouter.get('/users/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
}), getUser);

// PATCH /users/me — обновляет профиль
userRouter.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(20),
  }),
}), patchUser);

// PATCH /users/me/avatar — обновляет аватар
userRouter.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new CelebrateError('Некорректный URL');
      }
      return value;
    }),
  }),
}), patchAvatar);

// GET /me - возвращает информацию о текущем пользователе
userRouter.get('/me', auth, getMyUser);

module.exports = userRouter;
