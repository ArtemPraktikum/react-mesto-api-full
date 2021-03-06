import { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { api } from '../utils/Api.js'
import { registration, authorization, tokenValidate } from '../utils/authApi.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './Header.js'
import Main from './Main.js'
import ImagePopup from './ImagePopup.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import ProtectedRoute from './ProtectedRoute.js'
import Login from './Login.js'
import Register from './Register.js'
import InfoTooltip from './InfoTooltip.js'

function App() {
  //состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  //состояние регистрации
  const [regCondition, setRegCondition] = useState(false)
  //переменная юзер емейла
  const [usermail, setUserMail] = useState('')
  // состояние выбранной корточки
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  //навигация в react router dom
  const history = useHistory()
  //карточки
  const [cards, setСards] = useState([])
  // юзер
  const [currentUser, setCurrentUser] = useState({})
  //переменная логин да/нет
  const [loggedIn, setLoggedIn] = useState(false)




  useEffect(() => {
    function handleTokenCheck() {
      const token = localStorage.getItem("token");
      if (token) {
        tokenValidate(token)
          .then((res) => {
            if (res) {
              setUserMail(res.email);
              setLoggedIn(true);
              history.push("/");
            }
          });
      }
    }
    handleTokenCheck();
    if (loggedIn) {
      const token = localStorage.getItem("token");

      api
        .getUserInfo(token)
        .then((result) => {
          setCurrentUser(result);
        })
        .catch((err) => console.log(err));
      
      api
        .getInitialCards(token)
        .then((result) => {
          setСards(result);
        })
        .catch((err) => console.log(err));
    }
  }, [history, loggedIn]);


  function handleCardLike(card) {
    const token = localStorage.getItem("token");
    const isLiked = card.likes.some((i) => i === currentUser._id)

    api
      .changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setСards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
      })
      .catch((error) => {
        console.log(error)
      })
  }
  function handleCardDelete(card) {
    const token = localStorage.getItem("token");

    api
      .deleteCard(card._id, token)
      .then((newCard) => {
        const newCardArr = cards.filter((item) => (item._id === card._id ? null : newCard))
        setСards(newCardArr)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleUpdateUser = (data) => {
    const token = localStorage.getItem("token");

    api
      .updateUserInfo(data.name, data.about, token)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleUpdateAvatar = (avatar) => {
    const token = localStorage.getItem("token");

    api
      .updateAvatar(avatar, token)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleAddPlaceSubmit = (data) => {
    const token = localStorage.getItem("token");

    api
      .postCard(data.name, data.link, token)
      .then((newCard) => {
        setСards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }
  const handleCardClick = (card) => {
    setSelectedCard({
      name: card.name,
      link: card.link,
    })
  }
  // esc закрытие попапов
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard({ name: '', link: '' })
  }
  //авторизация юзера+запоминание токена
  function onLogin(password, email) {
    authorization(password, email)
      .then((response) => {
        if (response.token) {
        localStorage.setItem("token", response.token);
        setLoggedIn(true)
        setUserMail(email)
        history.push('/')
        }
      })
      .catch((error) => {
        console.log(error)
        setRegCondition(false)
        setIsInfoTooltipOpen(true)
      })
  }
  //рег в апи+попап успешной рег.
  function onRegister(password, email) {
    registration(password, email)
      .then((response) => {
        setRegCondition(true)
        history.push('/')
      })
      .catch((error) => {
        setRegCondition(false)
        console.log(error)
      })
      .finally(() => {
        setIsInfoTooltipOpen(true)
      })
  }

  //убрать токен\разлогиниться\перейти на стр. логина
  function onSignOut() {
    localStorage.removeItem('token')
    setUserMail('')
    setLoggedIn(false)
    setCurrentUser({})
    history.push('/sign-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} signOut={onSignOut} userMail={usermail} />

      <Switch>
        <ProtectedRoute
          exact
          path='/'
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Route path='/sign-in'>
          <Login onAuthorization={onLogin} />
        </Route>
        <Route path='/sign-up'>
          <Register onRegistration={onRegister} />
        </Route>
      </Switch>

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        onUpdateGalery={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} onCondition={regCondition} />
    </CurrentUserContext.Provider>
  )
}

export default App
