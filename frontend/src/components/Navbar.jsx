import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('client')
    localStorage.removeItem('clientId')
    onLogout()
    navigate('/login')
  }

  const client = JSON.parse(localStorage.getItem('client') || '{}')

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-orange-500">🛍️ Guardei</span>
          </Link>
          <div className="flex space-x-6 items-center">
            <Link to="/clients" className="hover:text-orange-500 transition duration-300">
              Clientes
            </Link>
            <Link to="/products" className="hover:text-orange-500 transition duration-300">
              Produtos
            </Link>
            <div className="border-l border-gray-700 pl-6 flex items-center space-x-4">
              <span className="text-sm text-gray-400">{client.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition duration-300"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
