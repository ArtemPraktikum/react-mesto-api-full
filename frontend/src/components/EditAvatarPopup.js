import { useRef } from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {
  const userAvatarRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateAvatar(userAvatarRef.current.value)
  }

  return (
    <PopupWithForm
      popupClass='avatar-popup'
      formName='formAvatar'
      title='Обновить аватар'
      submitButtonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='popup__input'>
        <label className='popup__field'>
          <input
            ref={userAvatarRef}
            type='url'
            className='popup__item'
            id='linkAvatar'
            name='avatarInformAvatar'
            placeholder='Ссылка на аватар'
            required
          />
          <span className='popup__item-error linkAvatar-error' />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
export default EditAvatarPopup
