import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card(props) {
  // Подписка на контекст
  const traverseUserContext = useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === traverseUserContext._id
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `${
    isOwn ? 'element__trash-button element__trash-button_visible' : 'element__trash-button'
  }`

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((like) => like._id === traverseUserContext._id)
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${
    isLiked ? 'element__like-button element__like-button_active' : 'element__like-button'
  }`

  function handleClick() {
    props.onCardClick(props.card)
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function deleteCard() {
    props.onCardDelete(props.card)
  }

  return (
    <article className='element'>
      <button type='button' className={cardDeleteButtonClassName} onClick={deleteCard} />
      <img
        src={props.card.link}
        alt={props.card.name}
        className='element__image'
        onClick={handleClick}
      />
      <div className='element__discription'>
        <h2 className='element__title'>{props.card.name}</h2>
        <div className='element__like-section'>
          <button type='button' className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className='element__like-counter'>{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
export default Card
