class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl
    this._headers = headers
  }
  _checkResponse = (response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`)
  }
  updateAvatar(avatarLink, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse)
  }

  changeLikeCardStatus = (cardId, isLiked, token) => {
    if (!isLiked) {
      return this._likeCard(cardId, token)
    } else {
      return this._UnlikeCard(cardId, token)
    }
  }
  _UnlikeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse)
  }
  _likeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse)
  }

  postCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse)
  }

  updateUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse)
  }
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: { ...this._headers, authorization: `Bearer ${token}` },
    }).then(this._checkResponse)
  }
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
    }).then(this._checkResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://api.artem.mesto.students.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json',
  },
})
