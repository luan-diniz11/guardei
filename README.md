# 🛍️ Guardei - Plataforma de Favoritos

> Uma aplicação full-stack para salvar produtos favoritos de forma segura e organizada, permitindo que usuários criem listas de compras personalizadas para futuras aquisições.

## 📋 Visão Geral

**Guardei** é uma plataforma moderna que permite aos usuários:
- ✅ Gerenciar múltiplos clientes/usuários
- ✅ Navegar por um catálogo de produtos (integração com Fake Store API)
- ✅ Adicionar produtos favoritos por cliente
- ✅ Organizar e remover favoritos
- ✅ Interface intuitiva e responsiva

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js 18** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Prisma ORM** - ORM moderno para acesso ao banco de dados
- **MySQL 8.0** - Banco de dados relacional
- **Axios** - Cliente HTTP para requisições
- **CORS** - Middleware para requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React 18** - Biblioteca UI com hooks
- **Vite** - Build tool ultrarrápido
- **React Router v6** - Roteamento entre páginas
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para comunicação com API
- **Nginx** - Servidor web em produção (Docker)

### Infraestrutura
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Nginx** - Reverse proxy e servidor estático

---

## 📁 Estrutura do Projeto

```
guardei/
├── backend/
│   ├── src/
│   │   ├── index.js              # Servidor Express
│   │   └── routes/
│   │       ├── clients.js        # Rotas de clientes
│   │       ├── favorites.js      # Rotas de favoritos
│   │       └── products.js       # Rotas de produtos
│   ├── prisma/
│   │   ├── schema.prisma         # Schema do banco de dados
│   │   └── migrations/           # Histórico de migrações
│   ├── .env                      # Variáveis de ambiente
│   ├── Dockerfile               # Build do backend
│   ├── package.json             # Dependências Node.js
│   └── SETUP.md                 # Documentação de setup
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── ClientCard.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── FavoriteCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/               # Páginas da aplicação
│   │   │   ├── Clients.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Favorites.jsx
│   │   ├── services/
│   │   │   └── api.js           # Cliente Axios configurado
│   │   ├── App.jsx              # Componente raiz
│   │   ├── main.jsx             # Entrada da aplicação
│   │   └── index.css            # Estilos globais
│   ├── .env                     # Variáveis de ambiente
│   ├── Dockerfile              # Build do frontend
│   ├── nginx.conf              # Configuração do Nginx
│   ├── vite.config.js          # Configuração do Vite
│   ├── tailwind.config.js      # Configuração do Tailwind
│   ├── package.json            # Dependências Node.js
│   └── SETUP.md                # Documentação de setup
│
├── docker-compose.yml          # Orquestração de containers
├── .env.example                # Exemplo de variáveis de ambiente
├── .dockerignore               # Arquivos ignorados no build Docker
├── README.md                   # Este arquivo
└── LICENSE                     # Licença do projeto
```

---

## 🚀 Execução Local

### Pré-requisitos
- **Node.js** 16+ (recomendado 18 LTS)
- **npm** ou **yarn**
- **MySQL** 8.0+ instalado e rodando

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/guardei.git
cd guardei
```

### Passo 2: Configurar Variáveis de Ambiente

#### Backend
```bash
cd backend
cp .env .env.local  # Copiar configuração padrão
# Editar .env.local se necessário
```

**Conteúdo do `.env` para desenvolvimento local:**
```env
DB_USER=root
DB_PASSWORD=seu_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=guardei_dev

DATABASE_URL="mysql://root:seu_password@localhost:3306/guardei_dev"
PORT=3001
NODE_ENV=development
```

#### Frontend
```bash
cd ../frontend
cat > .env << 'EOF'
VITE_API_URL=http://localhost:3001
EOF
```

### Passo 3: Instalar Dependências

```bash
# Backend
cd backend
npm install

# Frontend (em outro terminal)
cd frontend
npm install
```

### Passo 4: Criar Banco de Dados e Executar Migrações

```bash
cd backend
npx prisma migrate dev --name init
```

Isso irá:
1. Criar o banco de dados
2. Executar as migrações Prisma
3. Gerar o Prisma Client

### Passo 5: Iniciar os Servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Servidor estará em: **http://localhost:3001**

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Servidor estará em: **http://localhost:5173**

---

## 🐳 Execução com Docker

### Pré-requisitos
- **Docker** 20.10+
- **Docker Compose** 2.0+

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/guardei.git
cd guardei
```

### Passo 2: Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

**Conteúdo do `.env` para Docker:**
```env
# ===== BANCO DE DADOS =====
DB_USER=guardei_user
DB_PASSWORD=guardei_secure_password
DB_HOST=db
DB_PORT=3306
DB_NAME=guardei_db

DATABASE_URL="mysql://guardei_user:guardei_secure_password@db:3306/guardei_db"

# ===== SERVIDOR =====
PORT=3001
NODE_ENV=production

# ===== FRONTEND =====
VITE_API_URL=http://backend:3001
```

### Passo 3: Construir e Iniciar os Containers

```bash
docker-compose up --build
```

Isso irá:
1. Construir a imagem do backend
2. Construir a imagem do frontend
3. Iniciar o MySQL
4. Executar as migrações do Prisma
5. Iniciar backend e frontend

**Primeiros acessos podem levar 30-60 segundos enquanto o banco de dados inicia.**

### Passo 4: Acessar a Aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

---

## 📦 Portas Utilizadas

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| Frontend (Nginx) | 5173 | Aplicação React |
| Backend (Express) | 3001 | API REST |
| MySQL | 3306 | Banco de dados |

---

## 🔗 Endpoints da API

### Clientes
```
GET    /clients              - Listar todos os clientes
POST   /clients              - Criar novo cliente
GET    /clients/:id          - Buscar cliente por ID
PUT    /clients/:id          - Atualizar cliente
DELETE /clients/:id          - Deletar cliente
```

### Favoritos
```
GET    /clients/:id/favorites           - Listar favoritos do cliente
POST   /clients/:id/favorites           - Adicionar favorito
DELETE /clients/:id/favorites/:favId    - Remover favorito
```

### Produtos
```
GET    /products            - Listar todos os produtos (Fake Store API)
GET    /products/:id        - Buscar produto por ID (Fake Store API)
```

### Health Check
```
GET    /health             - Status do servidor
```

---

## 🛠️ Comandos Úteis

### Desenvolvimento Local

```bash
# Backend - iniciar em modo desenvolvimento
cd backend && npm run dev

# Frontend - iniciar servidor Vite
cd frontend && npm run dev

# Backend - abrir Prisma Studio (gerenciador visual de BD)
cd backend && npm run prisma:studio

# Backend - executar migrações
cd backend && npx prisma migrate dev
```

### Docker

```bash
# Construir e iniciar tudo
docker-compose up --build

# Iniciar containers (sem rebuild)
docker-compose up

# Parar containers
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Executar comando em um container
docker-compose exec backend npm run prisma:studio
docker-compose exec backend npx prisma migrate deploy

# Reconstruir uma imagem específica
docker-compose up --build backend
```

---

## 🔐 Variáveis de Ambiente

### Backend (`.env`)

```env
# Banco de dados
DB_USER=guardei_user              # Usuário do MySQL
DB_PASSWORD=guardei_password      # Senha do MySQL
DB_HOST=db                        # Host (db para Docker, localhost para local)
DB_PORT=3306                      # Porta do MySQL
DB_NAME=guardei_db                # Nome do banco de dados

# URL completa do Prisma
DATABASE_URL="mysql://..."        # String de conexão

# Servidor
PORT=3001                         # Porta do servidor Express
NODE_ENV=production               # Ambiente (development/production)
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3001    # URL da API (local)
VITE_API_URL=http://backend:3001      # URL da API (Docker)
```

---

## 🐛 Solução de Problemas

### Problema: "Cannot connect to database"
**Solução:**
- Aguarde 30-60 segundos para o MySQL iniciar
- Verifique se MySQL está rodando: `docker-compose logs db`
- Verifique as credenciais em `.env`

### Problema: "Frontend não consegue conectar ao backend"
**Solução:**
- Em desenvolvimento local: use `http://localhost:3001`
- Em Docker: use `http://backend:3001`
- Verifique a variável `VITE_API_URL` no `.env` do frontend
- Certifique-se de que CORS está ativado no backend

### Problema: "Porta já está em uso"
**Solução:**
```bash
# Mudar portas em docker-compose.yml
# ou parar processos existentes
lsof -i :5173  # Encontrar processo
kill -9 <PID>  # Matar processo
```

### Problema: "Build do Vite falha"
**Solução:**
- Verifique se `npm install` foi executado
- Delete `node_modules` e `package-lock.json`, execute `npm install` novamente
- Verifique sintaxe no `vite.config.js`

---

## ✅ Checklist de Verificação

- [ ] Clone do repositório realizado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` configurado
- [ ] Banco de dados criado e migrações executadas
- [ ] Backend inicia em `http://localhost:3001/health`
- [ ] Frontend carrega em `http://localhost:5173`
- [ ] Consegue criar um cliente
- [ ] Consegue adicionar um produto aos favoritos
- [ ] Docker Compose constrói sem erros
- [ ] Todos os serviços iniciam com `docker-compose up --build`

---

## 👥 Contribuidores

- **José Luan Diniz**
- **Wellington Almeida**
- **Carlos Eduardo França**

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🔗 Links Úteis

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## 📞 Suporte

Para reportar problemas ou sugerir melhorias, abra uma [issue](https://github.com/seu-usuario/guardei/issues) no repositório.

---

**Desenvolvido com ❤️ para simplificar o gerenciamento de produtos favoritos**
