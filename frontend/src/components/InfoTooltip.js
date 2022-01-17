import vseOk from '../images/vseOk.svg'
import vseNeOk from '../images/vseNeOk.svg'

function InfoTooltip(props) {
  return (
    <section className={`popup infoTooltip-popup ${props.isOpen && 'popup_is-opened'}`}>
      <div className='popup__container infoTooltip'>
        <button className='popup__close-button' type='button' onClick={props.onClose} />
        <img
          className='infoTooltip__image'
          alt='Регистрация,Авторизация'
          src={props.onCondition ? vseOk : vseNeOk}
        />
        <h2 className='infoTooltip__text'>
          {props.onCondition
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  )
}

export default InfoTooltip
