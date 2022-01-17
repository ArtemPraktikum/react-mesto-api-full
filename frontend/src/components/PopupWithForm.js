function PopupWithForm(props) {
  return (
    <section className={`popup ${props.popupClass} ${props.isOpen && 'popup_is-opened'}`}>
      <form name={props.formName} onSubmit={props.onSubmit} className='popup__container'>
        <h2 className='popup__title'>{props.title}</h2>
        {props.children}
        <button type='submit' className='popup__sumbit-button'>
          {props.submitButtonText}
        </button>
        <button type='button' className='popup__close-button' onClick={props.onClose} />
      </form>
    </section>
  )
}
export default PopupWithForm
