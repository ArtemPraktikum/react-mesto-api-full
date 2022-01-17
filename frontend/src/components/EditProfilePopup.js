import { useContext, useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {
  const traverseUserContext = useContext(CurrentUserContext)

  useEffect(() => {
    setName(traverseUserContext.name)
    setDescription(traverseUserContext.about)
  }, [traverseUserContext, props.isOpen])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function setNameInState(e) {
    setName(e.target.value)
  }
  function setDescriptionInState(e) {
    setDescription(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      popupClass='profile-popup'
      formName='formProfile'
      title='Редактировать профиль'
      submitButtonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='popup__input'>
        <label className='popup__field'>
          <input
            type='text'
            className='popup__item'
            id='name'
            name='nameInFormProfile'
            placeholder='Имя'
            required
            minLength={2}
            maxLength={40}
            value={name || ''}
            onChange={setNameInState}
          />
          <span className='popup__item-error name-error' />
        </label>
        <label className='popup__field'>
          <input
            type='text'
            className='popup__item'
            id='aboutMe'
            name='aboutMeInFormProfile'
            placeholder='Обо мне'
            required
            minLength={2}
            maxLength={200}
            value={description || ''}
            onChange={setDescriptionInState}
          />
          <span className='popup__item-error aboutMe-error' />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup
