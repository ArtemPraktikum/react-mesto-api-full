import { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup(props) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function setNameInState(e) {
    setName(e.target.value)
  }
  function setLinkInState(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateGalery({
      name,
      link,
    })
  }
  useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      popupClass='add-popup'
      formName='formAddCard'
      title='Новое место'
      submitButtonText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className='popup__input'>
        <label className='popup__field'>
          <input
            type='text'
            className='popup__item'
            id='placeName'
            name='nameInFormAddCard'
            placeholder='Название'
            required
            minLength={2}
            maxLength={30}
            onChange={setNameInState}
            value={name}
          />
          <span className='popup__item-error placeName-error' />
        </label>
        <label className='popup__field'>
          <input
            type='url'
            className='popup__item'
            id='link'
            name='aboutMeInFormAddCard'
            placeholder='Ссылка на картинку'
            required
            onChange={setLinkInState}
            value={link}
          />
          <span className='popup__item-error link-error' />
        </label>
      </fieldset>
    </PopupWithForm>
  )
}
export default AddPlacePopup
