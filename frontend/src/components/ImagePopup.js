function ImagePopup(props) {
  return (
    <section className={`popup popup_fullscreen ${props.card.link && 'popup_is-opened'}`}>
      <figure className='fullscreen'>
        <button type='button' className='popup__close-button' onClick={props.onClose} />
        <img src={props.card.link} alt={props.card.name} className='fullscreen__image' />
        <figcaption className='fullscreen__text'>{props.card.name}</figcaption>
      </figure>
    </section>
  )
}
export default ImagePopup
