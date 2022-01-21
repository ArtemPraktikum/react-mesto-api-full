//апи
const authUrl = 'https://api.artem.mesto.students.nomoredomains.work'

function checkResponse(response) {
  if (response.ok) {
    return response.json()
  }

  return Promise.reject(`Ошибка: ${response.status}`)
}
//регистрация
export const registration = (password, email) => {
  return fetch(`${authUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse)
}
//авторизация
export const authorization = (password, email) => {
  return fetch(`${authUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  })
  .then(checkResponse)
  .then((response) => {
    console.log(response);
    if (response.token) {
      localStorage.setItem("token", response.token);
      return response;
    }})
}
//Параметры запроса для проверки валидности токена и получения email для вставки в шапку сайта
export const tokenValidate = (token) => {
  return fetch(`${authUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(checkResponse)
}
