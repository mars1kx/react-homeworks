import React, { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import logger from '../../utils/logger'
import './LoginForm.css'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    
    logger.info('Login form submitted', { email })
    
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      logger.info('Login form navigation to home page')
      navigate('/')
    } catch (err) {
      logger.error('Login form error', err as Error)
      setError('Failed to sign in')
    }
    
    setLoading(false)
  }

  return (
    <div className="login-form-wrapper">
      <h2 className="login-title">Log in</h2>
      
      <div className="login-form-container">
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