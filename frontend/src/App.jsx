import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Clients from './pages/Clients'
import Products from './pages/Products'
import Favorites from './pages/Favorites'
import './index.css'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const client = localStorage.getItem('client')
    setIsLoggedIn(!!client)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-xl">Carregando...</div>
    </div>
  }

  const handleLogin = () => setIsLoggedIn(true)

  return (
    <Router>
      <div className="flex flex-col min-h-screen dark">
        {isLoggedIn && <Navbar onLogout={() => setIsLoggedIn(false)} />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/products" replace /> : <Login onLogin={handleLogin} />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/products" replace /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/products" replace /> : <Signup />} />
            <Route path="/clients" element={isLoggedIn ? <Clients /> : <Navigate to="/login" replace />} />
            <Route path="/products" element={isLoggedIn ? <Products /> : <Navigate to="/login" replace />} />
            <Route path="/favorites" element={isLoggedIn ? <Favorites /> : <Navigate to="/login" replace />} />
            <Route path="/clients/:id/favorites" element={isLoggedIn ? <Favorites /> : <Navigate to="/login" replace />} />
          </Routes>
        </main>
        {isLoggedIn && (
          <footer className="bg-black text-white text-center py-6 mt-12">
            <p className="text-sm text-gray-400">
              © 2025 Guardei — José Luan Diniz, Wellington Almeida, Carlos Eduardo França
            </p>
          </footer>
        )}
      </div>
    </Router>
  )
}
