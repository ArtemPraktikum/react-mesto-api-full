const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  celebrate, Joi, errors, CelebrateError,
} = require('celebrate');
const validator = require('validator');
const NotFoundError = require('./errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
// логгеры ошибок
const { requestLogger, errorLogger } = require('./middlewares/logger');
// порт сервера
const { PORT = 3000 } = process.env;
// сервер
const app = express();
app.use(cookieParser());
// юзер роутер
const userRouter = require('./routes/users');
// карточный роутер
const cardRouter = require('./routes/cards');
// подключение к бд
mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  // Если бд работает, консоль подтвердит
  console.log('Connected to the Database. Yayzow!');
})
  .catch((err) => {
    console.log(err);
  });
app.use(requestLogger);
app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(20),
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new CelebrateError('Некорректный URL');
      }
      return value;
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(userRouter);
app.use(cardRouter);

// обработка запросов на несуществующий роут.
app.use((req, res) => {
  throw new NotFoundError('Запрашиваемый роут не найден');
});

// логгер ошибок
app.use(errorLogger);
// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибки
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: `${err.message}` });
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка, ${err.message}` });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
