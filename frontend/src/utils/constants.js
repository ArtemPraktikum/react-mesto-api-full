// попап 'о себе'
const profilePopup = document.querySelector('.profile-popup')
// попап 'карточка'
const addPopup = document.querySelector('.add-popup')
// попап 'аватар'
const avatarPopup = document.querySelector('.avatar-popup')

// форма в попапе 'о себе'
export const formProfile = profilePopup.querySelector('.popup__container')
// форма в попапе 'карточка'
export const formAddCard = addPopup.querySelector('.popup__container')
// форма в попапе 'аватар'
export const formAvatar = avatarPopup.querySelector('.popup__container')

// инпуты в форме в попапе 'о себе': Имя, обо мне.
export const nameInput = formProfile.querySelector('#name')
export const aboutInput = formProfile.querySelector('#aboutMe')

// кнопка открыть попап 'о себе'
export const openPopupAboumeButton = document.querySelector('.profile__edit-button')
// кнопка открыть попап 'карточка'
export const openAddPopupButton = document.querySelector('.profile__add-button')
// кнопка открыть попап 'аватар'
export const openAvatarPopupButton = document.querySelector('.profile__avatar-button')

// кнопка submit в попапе 'о себе'
export const submitPopupAboumeButton = profilePopup.querySelector('.popup__sumbit-button')
// кнопка submit в попапе 'карточка'
export const submitAddPopupButton = addPopup.querySelector('.popup__sumbit-button')
// кнопка submit в попапе 'аватар'
export const submitAvatarPopupButton = avatarPopup.querySelector('.popup__sumbit-button')

// обьект с селекторами html элементов c данными юзера
export const userSelectors = {
  nameSelector: '.profile__title',
  aboutMeSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
}
// обьект с селекторами для валидации форм
export const formConfig = {
  inputErrorClass: 'popup__item_error',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__sumbit-button',
  inactiveButtonClass: 'popup__sumbit-button_inactive',
  errorClass: 'popup__item-error_active',
}
