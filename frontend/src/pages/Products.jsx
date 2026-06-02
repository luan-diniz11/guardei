import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts, getFavorites, addFavorite } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [products, setProducts] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [productsData, favoritesData] = await Promise.all([
        getProducts(),
        getFavorites()
      ])

      setProducts(Array.isArray(productsData) ? productsData : [])
      setFavorites(
        new Set(
          Array.isArray(favoritesData)
            ? favoritesData.map((favorite) => favorite.id)
            : []
        )
      )
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async (productId) => {
    try {
      await addFavorite(productId)
      setFavorites(new Set([...favorites, productId]))
      setSuccess('Produto favoritado com sucesso!')
      setError('')
      setTimeout(() => setSuccess(''), 3500)
    } catch (err) {
      setError(err.message)
      setSuccess('')
    }
  }

  const isFavorited = (productId) => {
    return favorites.has(productId)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Produtos</h1>
          <button
            onClick={() => navigate('/favorites')}
            className="px-5 py-3 bg-orange-default text-white rounded-lg hover:bg-orange-600 transition duration-300 font-semibold"
          >
            Meus Favoritos
          </button>
        </div>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-6">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-default"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando produtos...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum produto disponível</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onFavorite={handleFavorite}
                isFavorited={isFavorited(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
