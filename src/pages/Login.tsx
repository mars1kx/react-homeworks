import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm'
import BackgroundWrapper from '../components/BackgroundWrapperMenu/BackgroundWrapperMenu'
import { useTheme } from '../contexts/ThemeContext'

const Login: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <BackgroundWrapper>
      <div className={`login-page ${theme}`}>
        <LoginForm />
      </div>
    </BackgroundWrapper>
  )
}

export default Login 