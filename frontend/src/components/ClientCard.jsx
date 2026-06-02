import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ClientCard({ client, onEdit, onDelete, onViewFavorites }) {
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false)

  const handleDelete = () => {
    if (isDeleteConfirming) {
      onDelete(client.id)
      setIsDeleteConfirming(false)
    } else {
      setIsDeleteConfirming(true)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{client.email}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(client)}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 text-sm"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className={`px-3 py-1 rounded-md transition duration-300 text-sm ${
              isDeleteConfirming
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-400'
            }`}
          >
            {isDeleteConfirming ? 'Confirmar' : 'Deletar'}
          </button>
        </div>
      </div>
      <Link
        to="/favorites"
        className="inline-block mt-4 px-4 py-2 bg-orange-default text-white rounded-md hover:bg-orange-500 transition duration-300"
      >
        Ver Favoritos
      </Link>
    </div>
  )
}
