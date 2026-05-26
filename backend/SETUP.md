# Guardei Backend

Backend da aplicação Guardei — uma plataforma onde usuários salvam produtos favoritos para futuras compras.

## Estrutura do Projeto

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── index.js
│   └── routes/
│       ├── clients.js
│       ├── favorites.js
│       └── products.js
├── .env
└── package.json
```

## Tecnologias

- **Node.js + Express** - Framework web
- **Prisma ORM + SQLite** - Banco de dados
- **Axios** - Cliente HTTP para consumir API externa
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - CORS middleware

## Setup Rápido

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Criar banco de dados
```bash
npx prisma migrate dev --name init
```

### 3. Iniciar o servidor
```bash
npm run dev
```

O servidor estará rodando em **http://localhost:3001**

## Endpoints da API

### Clientes (`/clients`)
- `GET /clients` - Listar todos os clientes
- `GET /clients/:id` - Buscar cliente por ID
- `POST /clients` - Criar novo cliente
- `PUT /clients/:id` - Atualizar cliente
- `DELETE /clients/:id` - Deletar cliente

### Favoritos (`/clients/:clientId/favorites`)
- `GET /clients/:clientId/favorites` - Listar favoritos com dados da API
- `POST /clients/:clientId/favorites` - Adicionar favorito
- `DELETE /clients/:clientId/favorites/:favoriteId` - Remover favorito

### Produtos (`/products`)
- `GET /products` - Listar todos os produtos (Fake Store API)
- `GET /products/:id` - Buscar produto por ID (Fake Store API)

### Health Check
- `GET /health` - Status do servidor

## Variáveis de Ambiente (`.env`)

```
DATABASE_URL="file:./dev.db"
PORT=3001
```

## Regras de Negócio

✅ Email único entre clientes  
✅ Produto deve existir na Fake Store API antes de favoritar  
✅ Produto não pode ser duplicado para o mesmo cliente  
✅ Erros com mensagens claras em português  
✅ Status HTTP corretos (200, 201, 400, 404, 409, 500)

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Migrar banco de dados
npm run prisma:migrate

# Abrir Prisma Studio (UI para gerenciar BD)
npm run prisma:studio
```

## Modelos de Dados

### Client
- `id` - ID único (autoincrement)
- `name` - Nome do cliente
- `email` - Email único
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização
- `favorites` - Relação com favoritos

### Favorite
- `id` - ID único (autoincrement)
- `productId` - ID do produto na Fake Store
- `clientId` - ID do cliente (FK)
- `createdAt` - Data de criação
- Restrição: `[clientId, productId]` único

## Exemplo de Uso

### Criar cliente
```bash
curl -X POST http://localhost:3001/clients \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@example.com"}'
```

### Listar favoritos
```bash
curl http://localhost:3001/clients/1/favorites
```

### Adicionar favorito
```bash
curl -X POST http://localhost:3001/clients/1/favorites \
  -H "Content-Type: application/json" \
  -d '{"productId":1}'
```

---

**Desenvolvido com Node.js, Express e Prisma** 🚀
