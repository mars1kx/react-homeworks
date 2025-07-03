import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Login from './pages/Login'
import Order from './pages/Order'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { useAppDispatch } from './store/hooks'
import { checkAuthState } from './store/slices/authSlice'
import { ThemeProvider } from './contexts/ThemeContext'

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App 