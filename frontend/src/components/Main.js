import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Card from './Card.js'
import Footer from './Footer.js'

function Main(props) {
  const traverseUserContext = useContext(CurrentUserContext)

  return (
    <>
      <main className='content'>
        <section className='profile'>
          <div className='profile__avatar-section'>
            <img
              src={traverseUserContext.avatar}
              alt='Аватар профиля'
              className='profile__avatar'
            />
            <button type='button' className='profile__avatar-button' onClick={props.onEditAvatar} />
          </div>
          <div className='profile__info'>
            <div className='profile__heading'>
              <h1 className='profile__title'>{traverseUserContext.name}</h1>
              <button
                type='button'
                className='profile__edit-button'
                onClick={props.onEditProfile}
              />
            </div>
            <p className='profile__subtitle'>{traverseUserContext.about}</p>
          </div>
          <button type='button' className='profile__add-button' onClick={props.onAddPlace} />
        </section>
        <section className='elements'>
          {props.cards.map((item) => {
            return (
              <Card
                card={item}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                key={item._id}
              />
            )
          })}
        </section>
      </main>
      <Footer />
    </>
  )
}
export default Main
