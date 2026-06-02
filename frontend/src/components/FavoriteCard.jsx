export default function FavoriteCard({ product, onRemove }) {
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
          onClick={() => onRemove(product.favoriteId)}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 font-semibold"
        >
          ✕ Remover dos Favoritos
        </button>
      </div>
    </div>
  )
}
