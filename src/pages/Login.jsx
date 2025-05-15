import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import BackgroundWrapper from '../components/BackgroundWrapperMenu/BackgroundWrapperMenu'

const Login = () => {
  return (
    <BackgroundWrapper>
      <div className="login-page">
        <LoginForm />
      </div>
    </BackgroundWrapper>
  )
}

export default Login 