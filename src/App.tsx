import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Login from './pages/Login'
import { AuthProvider } from './contexts/AuthContext'

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App 