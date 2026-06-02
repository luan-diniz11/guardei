const express = require('express');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();
const FAKE_STORE_API = 'https://fakestoreapi.com';

router.use(authenticateToken);

// GET /clients/:clientId/favorites - listar favoritos com dados da API
router.get('/:clientId/favorites', async (req, res) => {
  try {
    const clientId = req.user.id;

    if (req.params.clientId && parseInt(req.params.clientId) !== clientId) {
      return res.status(403).json({ error: 'Operação não permitida para este cliente' });
    }

    // Verificar se cliente autenticado existe
    const authenticatedClient = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!authenticatedClient) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Buscar favoritos do cliente autenticado
    const favorites = await prisma.favorite.findMany({
      where: { clientId }
    });

    // Buscar dados de cada produto na API externa
    const favoritesWithData = await Promise.all(
      favorites.map(async (favorite) => {
        try {
          const response = await axios.get(`${FAKE_STORE_API}/products/${favorite.productId}`);
          const product = response.data;

          return {
            favoriteId: favorite.id,
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            rating: product.rating || null
          };
        } catch (error) {
          console.error(`Erro ao buscar produto ${favorite.productId}:`, error.message);
          return null;
        }
      })
    );

    // Filtrar produtos que falharam
    const validFavorites = favoritesWithData.filter(f => f !== null);

    res.json(validFavorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar favoritos' });
  }
});

// POST /clients/:clientId/favorites - adicionar favorito
router.post('/:clientId/favorites', async (req, res) => {
  try {
    const clientId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'productId é obrigatório' });
    }

    if (req.params.clientId && parseInt(req.params.clientId) !== clientId) {
      return res.status(403).json({ error: 'Operação não permitida para este cliente' });
    }

    // Verificar se cliente autenticado existe
    const authenticatedClient = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!authenticatedClient) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar se produto existe na API externa
    try {
      await axios.get(`${FAKE_STORE_API}/products/${productId}`);
    } catch (error) {
      return res.status(404).json({ error: 'Produto não encontrado na API externa' });
    }

    // Verificar se já não é favorito
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        clientId_productId: {
          clientId,
          productId: parseInt(productId)
        }
      }
    });

    if (existingFavorite) {
      return res.status(409).json({ error: 'Este produto já é um favorito deste cliente' });
    }

    // Criar favorito
    const favorite = await prisma.favorite.create({
      data: {
        productId: parseInt(productId),
        clientId
      }
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar favorito' });
  }
});

// DELETE /clients/:clientId/favorites/:favoriteId - remover favorito
router.delete('/:clientId/favorites/:favoriteId', async (req, res) => {
  try {
    const clientId = req.user.id;
    const favoriteId = parseInt(req.params.favoriteId);

    if (req.params.clientId && parseInt(req.params.clientId) !== clientId) {
      return res.status(403).json({ error: 'Operação não permitida para este cliente' });
    }

    // Verificar se cliente autenticado existe
    const authenticatedClient = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!authenticatedClient) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar se favorito existe e pertence ao cliente
    const favorite = await prisma.favorite.findUnique({
      where: { id: favoriteId }
    });

    if (!favorite || favorite.clientId !== clientId) {
      return res.status(404).json({ error: 'Favorito não encontrado' });
    }

    // Remover favorito
    await prisma.favorite.delete({
      where: { id: favoriteId }
    });

    res.json({ message: 'Favorito removido com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover favorito' });
  }
});

module.exports = router;
