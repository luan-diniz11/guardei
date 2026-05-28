const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// POST /auth/login - Fazer login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    // Buscar cliente pelo email
    const client = await prisma.client.findUnique({
      where: { email }
    });

    if (!client) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    // Verificar senha (sem hash por enquanto, apenas comparação simples)
    // TODO: Implementar bcrypt para hash de senhas
    if (client.password !== password) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }

    // Retornar dados do cliente (sem a senha)
    const { password: _, ...clientData } = client;
    res.json(clientData);

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// POST /auth/register - Registrar novo cliente
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }

    // Verificar se email já existe
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    // Criar novo cliente
    const newClient = await prisma.client.create({
      data: {
        name,
        email,
        password // TODO: Hash da senha com bcrypt
      }
    });

    console.log('✓ Cliente registrado:', newClient.email);

    // Retornar dados do cliente (sem a senha)
    const { password: _, ...clientData } = newClient;
    res.status(201).json(clientData);

  } catch (error) {
    console.error('Erro ao registrar cliente:', error.message);
    
    // Tratamento específico de erros do Prisma
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }
    
    res.status(500).json({ 
      message: 'Erro ao registrar cliente',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
