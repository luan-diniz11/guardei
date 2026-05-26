import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Guardei" className="w-8 h-8" />
            <span className="text-xl font-bold text-orange-default">Guardei</span>
          </Link>
          <div className="flex space-x-6">
            <Link to="/clients" className="hover:text-orange-default transition duration-300">
              Clientes
            </Link>
            <Link to="/products" className="hover:text-orange-default transition duration-300">
              Produtos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
