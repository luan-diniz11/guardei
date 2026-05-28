import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

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
    const response = await api.get('/clients')
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar clientes: ' + error.message)
  }
}

export const createClient = async (clientData) => {
  try {
    const response = await api.post('/clients', clientData)
    return response.data
  } catch (error) {
    throw new Error('Erro ao criar cliente: ' + error.message)
  }
}

export const updateClient = async (id, clientData) => {
  try {
    const response = await api.put(`/clients/${id}`, clientData)
    return response.data
  } catch (error) {
    throw new Error('Erro ao atualizar cliente: ' + error.message)
  }
}

export const deleteClient = async (id) => {
  try {
    await api.delete(`/clients/${id}`)
  } catch (error) {
    throw new Error('Erro ao deletar cliente: ' + error.message)
  }
}

// ===== PRODUTOS =====
export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar produtos: ' + error.message)
  }
}

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar produto: ' + error.message)
  }
}

// ===== FAVORITOS =====
export const getFavorites = async (clientId) => {
  try {
    const response = await api.get(`/clients/${clientId}/favorites`)
    return response.data
  } catch (error) {
    throw new Error('Erro ao buscar favoritos: ' + error.message)
  }
}

export const addFavorite = async (clientId, productId) => {
  try {
    const response = await api.post(`/clients/${clientId}/favorites`, { productId })
    return response.data
  } catch (error) {
    throw new Error('Erro ao adicionar favorito: ' + error.message)
  }
}

export const removeFavorite = async (clientId, productId) => {
  try {
    await api.delete(`/clients/${clientId}/favorites/${productId}`)
  } catch (error) {
    throw new Error('Erro ao remover favorito: ' + error.message)
  }
}

export default api
