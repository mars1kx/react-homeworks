import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logger from '../../utils/logger'
import './LoginForm.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { loginUser, clearError } from '../../store/slices/authSlice'
import { useTheme } from '../../contexts/ThemeContext'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { theme } = useTheme()
  
  const dispatch = useAppDispatch()
  const { loading, error, currentUser } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (currentUser) {
      logger.info('Login form navigation to home page')
      navigate('/')
    }
    
    return () => {
      dispatch(clearError())
    }
  }, [currentUser, navigate, dispatch])

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    
    logger.info('Login form submitted', { email })
    
    dispatch(loginUser({ email, password }))
  }

  return (
    <div className={`login-form-wrapper ${theme}`}>
      <h2 className="login-title">Log in</h2>
      
      <div className={`login-form-container ${theme}`}>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Email" 
              className="form-input"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••••••••••••" 
              className="form-input"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="submit-button" disabled={loading}>Submit</button>
            <button type="button" className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm 