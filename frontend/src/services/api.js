import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const getClientId = () => {
  const clientId = localStorage.getItem('clientId')
  if (!clientId) {
    throw new Error('Cliente não autenticado')
  }
  return clientId
}

// ===== AUTENTICAÇÃO =====
export const loginClient = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao fazer login: ' + error.message)
  }
}

export const registerClient = async (clientData) => {
  try {
    const response = await api.post('/auth/register', clientData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao registrar: ' + error.message)
  }
}

// ===== CLIENTES =====
export const getClients = async () => {
  try {
    const response = await api.get('/clients', { headers: getAuthHeaders() })
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar clientes: ' + error.message)
  }
}

export const createClient = async (clientData) => {
  try {
    const response = await api.post('/clients', clientData, { headers: getAuthHeaders() })
    return response.data
  } catch (error) {
    throw new Error('Erro ao criar cliente: ' + error.message)
  }
}

export const updateClient = async (id, clientData) => {
  try {
    const response = await api.put(`/clients/${id}`, clientData, { headers: getAuthHeaders() })
    return response.data
  } catch (error) {
    throw new Error('Erro ao atualizar cliente: ' + error.message)
  }
}

export const deleteClient = async (id) => {
  try {
    await api.delete(`/clients/${id}`, { headers: getAuthHeaders() })
  } catch (error) {
    throw new Error('Erro ao deletar cliente: ' + error.message)
  }
}

// ===== PRODUTOS =====
export const getProducts = async () => {
  try {
    const response = await api.get('/products', { headers: getAuthHeaders() })
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar produtos: ' + error.message)
  }
}

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`, { headers: getAuthHeaders() })
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar produto: ' + error.message)
  }
}

// ===== FAVORITOS =====
export const getFavorites = async () => {
  try {
    const clientId = getClientId()
    const response = await api.get(`/clients/${clientId}/favorites`, { headers: getAuthHeaders() })
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar favoritos: ' + error.message)
  }
}

export const addFavorite = async (productId) => {
  try {
    const clientId = getClientId()
    const response = await api.post(
      `/clients/${clientId}/favorites`,
      { productId },
      { headers: getAuthHeaders() }
    )
    return response.data
  } catch (error) {
    throw new Error('Erro ao adicionar favorito: ' + error.message)
  }
}

export const removeFavorite = async (favoriteId) => {
  try {
    const clientId = getClientId()
    await api.delete(`/clients/${clientId}/favorites/${favoriteId}`, {
      headers: getAuthHeaders()
    })
  } catch (error) {
    throw new Error('Erro ao remover favorito: ' + error.message)
  }
}

export default api
