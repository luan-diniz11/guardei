const express = require('express');
const axios = require('axios');

const router = express.Router();
const FAKE_STORE_API = 'https://fakestoreapi.com';

// GET /products - listar todos
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/products`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
});

// GET /products/:id - buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${FAKE_STORE_API}/products/${id}`);
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

module.exports = router;
