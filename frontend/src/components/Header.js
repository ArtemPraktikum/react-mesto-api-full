import logo from '../images/logo.svg'
import { Link, useLocation } from 'react-router-dom'

function Header(props) {
  const currentLink = useLocation()
  return (
    <header className='header'>
      <img src={logo} alt='Логотип Место' className='header__logo' />
      {props.loggedIn ? (
        <div className='header__mail-menu'>
          <p className='header__email'>{props.userMail}</p>
          <Link className='header__text header__text_dark' to='/sign-in' onClick={props.signOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <>
          {currentLink.pathname === '/sign-in' ? (
            <Link className='header__text' to='/sign-up'>
              Регистрация
            </Link>
          ) : (
            <Link className='header__text' to='/sign-in'>
              Войти
            </Link>
          )}
        </>
      )}
    </header>
  )
}
export default Header
