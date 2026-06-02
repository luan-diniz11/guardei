import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFavorites, removeFavorite } from '../services/api'
import FavoriteCard from '../components/FavoriteCard'

export default function Favorites() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [clientName, setClientName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const client = JSON.parse(localStorage.getItem('client') || '{}')
    setClientName(client.name || '')
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    setLoading(true)
    try {
      const favoritesData = await getFavorites()
      setFavorites(Array.isArray(favoritesData) ? favoritesData : [])
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (favoriteId) => {
    try {
      await removeFavorite(favoriteId)
      fetchFavorites()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Favoritos de {clientName}
            </h1>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700 transition duration-300 font-semibold"
          >
            ← Voltar para Produtos
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-default"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando favoritos...</p>
            </div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Você ainda não tem favoritos
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <FavoriteCard
                key={product.favoriteId}
                product={product}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
