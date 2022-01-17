import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.onRegistration(password, email)
  }

  return (
    <form onSubmit={handleSubmit} className='authentication-form'>
      <h2 className='authentication-form__title'>Регистрация</h2>
      <fieldset className='authentication-form__fieldset'>
        <input
          name='email-register'
          type='email'
          className='authentication-form__input'
          id='email-register'
          placeholder='Email'
          required
          minLength={2}
          maxLength={40}
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          name='password-register'
          type='password'
          className='authentication-form__input'
          id='password-register'
          placeholder='Пароль'
          required
          minLength={2}
          maxLength={200}
          value={password}
          onChange={handleChangePassword}
        />
      </fieldset>
      <button type='submit' className='authentication-form__sumbit-button'>
        Зарегистрироваться
      </button>
      <p className='authentication-form__span'>
        Уже зарегистрированы?{' '}
        <Link className='authentication-form__span' to='/sign-in'>
          Войти
        </Link>
      </p>
    </form>
  )
}

export default Register
