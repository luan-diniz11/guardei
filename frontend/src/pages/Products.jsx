import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts, getClients, addFavorite } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [products, setProducts] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showClientModal, setShowClientModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedClient, setSelectedClient] = useState(null)
  const [favorites, setFavorites] = useState(new Set())
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [productsData, clientsData] = await Promise.all([
        getProducts(),
        getClients()
      ])
      setProducts(Array.isArray(productsData) ? productsData : [])
      setClients(Array.isArray(clientsData) ? clientsData : [])
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = (productId) => {
    setSelectedProduct(productId)
    if (clients.length === 0) {
      setError('Você precisa ter clientes cadastrados para favoritar produtos')
      return
    }
    setShowClientModal(true)
  }

  const handleAddFavorite = async () => {
    if (!selectedClient) {
      setError('Selecione um cliente')
      return
    }

    try {
      await addFavorite(selectedClient, selectedProduct)
      setFavorites(new Set([...favorites, `${selectedClient}-${selectedProduct}`]))
      setShowClientModal(false)
      setSelectedProduct(null)
      setSelectedClient(null)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  const isFavorited = (productId) => {
    // Verifica se o produto está favoritado por qualquer cliente
    return Array.from(favorites).some((fav) => fav.endsWith(`-${productId}`))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Produtos</h1>

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

      {/* Modal para selecionar cliente */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Selecione um cliente
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
              {clients.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Nenhum cliente disponível
                </p>
              ) : (
                clients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClient(client.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                      selectedClient === client.id
                        ? 'bg-orange-default text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {client.name}
                    <p className="text-sm opacity-75">{client.email}</p>
                  </button>
                ))
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowClientModal(false)
                  setSelectedProduct(null)
                  setSelectedClient(null)
                }}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddFavorite}
                disabled={!selectedClient}
                className="flex-1 px-4 py-2 bg-orange-default text-white rounded-md hover:bg-orange-500 transition duration-300 disabled:opacity-50"
              >
                Favoritar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
