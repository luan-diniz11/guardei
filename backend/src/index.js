require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const clientsRouter = require('./routes/clients');
const favoritesRouter = require('./routes/favorites');
const productsRouter = require('./routes/products');

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/clients', clientsRouter);
app.use('/clients', favoritesRouter);
app.use('/products', productsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Tratamento de erros geral
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
