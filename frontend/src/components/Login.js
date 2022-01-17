import { useState } from 'react'

function Login(props) {
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
    props.onAuthorization(password, email)
  }

  return (
    <form onSubmit={handleSubmit} className='authentication-form'>
      <h2 className='authentication-form__title'>Вход</h2>
      <fieldset className='authentication-form__fieldset'>
        <input
          name='email-login'
          type='email'
          className='authentication-form__input'
          id='email-login'
          placeholder='Email'
          required
          minLength={2}
          maxLength={40}
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          name='password-login'
          type='password'
          className='authentication-form__input'
          id='password-login'
          placeholder='Пароль'
          required
          minLength={2}
          maxLength={200}
          value={password}
          onChange={handleChangePassword}
        />
      </fieldset>
      <button type='submit' className='authentication-form__sumbit-button'>
        Войти
      </button>
    </form>
  )
}
export default Login
