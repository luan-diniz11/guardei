const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// GET /clients - listar todos
router.get('/', async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: { favorites: true }
    });
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
});

// GET /clients/:id - buscar por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) },
      include: { favorites: true }
    });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar cliente' });
  }
});

// POST /clients - criar novo
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Verificar se email já existe
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    const client = await prisma.client.create({
      data: { name, email }
    });

    res.status(201).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

// PUT /clients/:id - editar
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Verificar se cliente existe
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) }
    });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Se email está sendo alterado, verificar unicidade
    if (email && email !== client.email) {
      const existingClient = await prisma.client.findUnique({
        where: { email }
      });

      if (existingClient) {
        return res.status(409).json({ error: 'Email já cadastrado' });
      }
    }

    const updatedClient = await prisma.client.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(email && { email })
      }
    });

    res.json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// DELETE /clients/:id - remover
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se cliente existe
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) }
    });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    await prisma.client.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Cliente removido com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover cliente' });
  }
});

module.exports = router;
