// монгус для ошибок
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// схемы и модели юзера
const user = require('../models/user');

// контроллер login, который получает из запроса почту и пароль и проверяет их.
const login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  // достать почту пароль из запроса
  const { email, password } = req.body;
  // выкинуть ошибку если их нету
  if (!email || !password) {
    throw new BadRequestError('Не передан email или пароль');
  }
  // получить хеш пароля этого юзера
  user.findOne({ email })
    .select('+password')
    .then((u) => {
      // если у юзера нет хеша выкинуть ошибку
      if (!u) {
        throw new UnauthorizedError('Передан неверный логин или пароль.');
      }
      // сравнить пароль который передаёт юзер с хешем в бд
      bcrypt.compare(password, u.password)
        .then((match) => {
          // если не совпало выкинем ошибку
          if (!match) {
            throw new UnauthorizedError('Передан неверный логин или пароль.');
          }
          // создадим токен на 7 дней
          const token = jwt.sign({ _id: u._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          // запишем токен в куку на 7 дней
          res.cookie('cookieToken', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            //  хотел добавить sameSite: true, но постман  тогда не может получить куки(
          })
          // вернём юзеру его токен
            .send({ token });
        })
        .catch(next);
    })
    .catch(next);
};
// возвращает информацию о текущем пользователе.
const getMyUser = (req, res, next) => {
  user.findById(req.user._id)
    .orFail()
    .then((me) => res.status(200).send(me))
    .catch(next);
};
// возвращает всех пользователей.
const getUsers = (req, res, next) => {
  user.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};
// возвращает пользователя по _id.
const getUser = (req, res, next) => {
  user.findById(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError('Пользователь по указанному _id не найден.');
    })
    .then((u) => {
      res.status(200).send(u);
    })
    .catch(next);
};
// создаёт пользователя.
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new ConflictError('Юзер с данным email адресом уже зарегистрирован');
      } else next(err);
    })
    .then((u) => res.status(201).send({
      data: {
        name: u.name, about: u.about, avatar: u.avatar, email: u.email,
      },
    }))
    .catch(next);
};
// обновляет профиль.
const patchUser = (req, res, next) => {
  user.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((u) => {
      if (!u) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(u);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные при обновлении профиля.');
      }
    })
    .catch(next);
};
// обновляет аватар.
const patchAvatar = (req, res, next) => {
  user.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((a) => {
      if (!a) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(a);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные при обновлении аватара.');
      }
    })
    .catch(next);
};
module.exports = {
  getUsers, getUser, createUser, patchUser, patchAvatar, login, getMyUser,
};
