import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Clients from './pages/Clients'
import Products from './pages/Products'
import Favorites from './pages/Favorites'
import './index.css'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen dark">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/clients" element={<Clients />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clients/:id/favorites" element={<Favorites />} />
            <Route path="/" element={<Navigate to="/clients" replace />} />
          </Routes>
        </main>
        <footer className="bg-black text-white text-center py-6 mt-12">
          <p className="text-sm text-gray-400">
            © 2025 Guardei — José Luan Diniz, Wellington Almeida, Carlos Eduardo França
          </p>
        </footer>
      </div>
    </Router>
  )
}
