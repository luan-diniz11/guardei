import { useState } from 'react'

export default function ProductCard({ product, onFavorite, isFavorited }) {
  const [showSelectClient, setShowSelectClient] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.title || product.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.title || product.name}
        </h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-orange-default">
            R$ {(product.price || 0).toFixed(2)}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
              {typeof product.rating === 'object' ? product.rating?.rate || '0' : product.rating || '0'}/5
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowSelectClient(true)}
          className={`w-full px-4 py-2 rounded-md transition duration-300 font-semibold ${
            isFavorited
              ? 'bg-orange-default text-white hover:bg-orange-500'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'
          }`}
        >
          {isFavorited ? '♥ Favoritado' : '♡ Favoritar'}
        </button>
      </div>

      {showSelectClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Selecione o cliente
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Você será redirecionado para selecionar um cliente...
              </p>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowSelectClient(false)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onFavorite(product.id)
                  setShowSelectClient(false)
                }}
                className="flex-1 px-4 py-2 bg-orange-default text-white rounded-md hover:bg-orange-500 transition duration-300"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
