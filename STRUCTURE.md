# 📊 Estrutura Final do Projeto Guardei

```
guardei-main/
│
├── 🐳 DOCKER & ORQUESTRAÇÃO
│   ├── docker-compose.yml              ← Produção com Nginx + Healthchecks
│   ├── docker-compose.dev.yml          ← Desenvolvimento com hot reload
│   └── .dockerignore                   ← Otimização de build
│
├── 📚 DOCUMENTAÇÃO
│   ├── README.md                       ← Guia completo do projeto
│   ├── DOCKER.md                       ← Guia detalhado de Docker
│   ├── QUICK-START.md                  ← Referência rápida
│   ├── CHANGES.md                      ← Este resumo de alterações
│   ├── LICENSE                         ← Licença MIT
│   └── .env.example                    ← Modelo de variáveis
│
├── 🔙 BACKEND (Express + Prisma + MySQL)
│   │
│   ├── 🐳 Dockerfile                   ← Multi-stage build
│   ├── 📄 .env                         ← Produção Docker
│   ├── 📄 .env.local                   ← Desenvolvimento local
│   ├── 📄 entrypoint.sh                ← Script de migrações
│   │
│   ├── 📁 src/
│   │   ├── index.js                    ← Servidor Express
│   │   └── routes/
│   │       ├── clients.js              ← CRUD de clientes
│   │       ├── favorites.js            ← Gerenciamento de favoritos
│   │       └── products.js             ← Integração API produtos
│   │
│   ├── 📁 prisma/
│   │   ├── schema.prisma               ← Modelo de dados
│   │   └── migrations/                 ← Histórico de alterações
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── node_modules/
│   ├── SETUP.md
│   ├── app.py
│   └── server.log
│
├── 🎨 FRONTEND (React + Vite + Tailwind + Nginx)
│   │
│   ├── 🐳 Dockerfile                   ← Vite build + Nginx
│   ├── 📄 nginx.conf                   ← Configuração Nginx/SPA
│   ├── 📄 .env                         ← Desenvolvimento (localhost)
│   ├── 📄 .env.production              ← Produção Docker
│   │
│   ├── 📁 src/
│   │   ├── App.jsx                     ← Componente raiz
│   │   ├── main.jsx                    ← Entrada da app
│   │   ├── index.css                   ← Estilos globais
│   │   │
│   │   ├── pages/
│   │   │   ├── Clients.jsx             ← CRUD clientes
│   │   │   ├── Products.jsx            ← Lista produtos
│   │   │   └── Favorites.jsx           ← Favoritos por cliente
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx              ← Navegação
│   │   │   ├── ClientCard.jsx          ← Card cliente
│   │   │   ├── ProductCard.jsx         ← Card produto
│   │   │   └── FavoriteCard.jsx        ← Card favorito
│   │   │
│   │   └── services/
│   │       └── api.js                  ← Cliente Axios
│   │
│   ├── public/                         ← Assets estáticos
│   ├── vite.config.js                  ← Configuração Vite
│   ├── tailwind.config.js              ← Configuração Tailwind
│   ├── postcss.config.js               ← PostCSS
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── node_modules/
│   └── SETUP.md
│
└── 📋 Git
    ├── .git/                           ← Repositório Git
    ├── .gitignore                      ← Arquivos ignorados
    └── package-lock.json
```

---

## 🎯 Mapeamento de Serviços Docker

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Compose Network                        │
│                      guardei-network                             │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
    ┌──────────┐         ┌──────────┐        ┌──────────┐
    │   MySQL  │         │ Backend  │        │ Frontend │
    │  8.0     │         │ Express  │        │  Nginx   │
    │ (port    │         │ (port    │        │ (port    │
    │  3306)   │         │  3001)   │        │  5173)   │
    └──────────┘         └──────────┘        └──────────┘
         ▲                    ▲                    │
         │                    │                    │
         └────────────────────┘                    │
           DATABASE_URL                    VITE_API_URL
        mysql://user:pass@db          http://backend:3001
           :3306/guardei_db
         
         Volume: mysql_data (persistente)
```

---

## 📦 Portas Expostas

| Container | Porta Interna | Porta Host | URL |
|-----------|---------------|-----------|-----|
| frontend | 80 | **5173** | http://localhost:5173 |
| backend | 3001 | **3001** | http://localhost:3001 |
| db (mysql) | 3306 | **3306** | localhost:3306 |

---

## 🚀 Comandos de Execução

### Produção (Docker Recomendado)
```bash
# Build e iniciar
docker compose up --build

# Apenas iniciar (sem rebuild)
docker compose up

# Parar
docker compose down

# Parar e limpar dados
docker compose down -v

# Ver logs
docker compose logs -f backend
```

### Desenvolvimento Local
```bash
# Terminal 1
cd backend && npm install && npm run dev
# Backend: http://localhost:3001

# Terminal 2
cd frontend && npm install && npm run dev
# Frontend: http://localhost:5173
```

### Desenvolvimento com Docker
```bash
docker compose -f docker-compose.dev.yml up
```

---

## 🔐 Variáveis de Ambiente

### Banco de Dados
```env
DB_USER=guardei_user              # Usuário MySQL
DB_PASSWORD=guardei_password      # Senha MySQL
DB_HOST=db                        # Host (docker) / localhost (local)
DB_PORT=3306                      # Porta MySQL
DB_NAME=guardei_db                # Nome do banco
DATABASE_URL=mysql://...          # String de conexão Prisma
```

### Servidor
```env
PORT=3001                         # Porta Express
NODE_ENV=production               # production / development
```

### Frontend
```env
VITE_API_URL=http://backend:3001  # URL da API (Docker)
VITE_API_URL=http://localhost:3001 # URL da API (Local)
```

---

## 📡 Arquitetura da Aplicação

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                         │
│                      http://localhost:5173                       │
│                       React + Tailwind CSS                       │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 │ fetch/axios (http)
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (Nginx Container)                    │
│                                                                  │
│  - Serve aplicação React (dist/)                               │
│  - SPA routing (try_files)                                     │
│  - Cache de assets (30 dias)                                   │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 │ Requisição HTTP
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js Container)                    │
│                                                                  │
│  - Express.js (servidor)                                       │
│  - CORS habilitado                                            │
│  - Rotas RESTful:                                             │
│    • GET /clients (listar)                                    │
│    • POST /clients (criar)                                   │
│    • GET /products (da Fake Store API)                       │
│    • POST /clients/:id/favorites (favoritar)                 │
│    • GET /clients/:id/favorites (ver favoritos)              │
│    • GET /health (healthcheck)                               │
└────────────────┬──────────────────────────────────────────────────┘
                 │
                 │ Query SQL via Prisma ORM
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                  DATABASE (MySQL Container)                     │
│                                                                  │
│  - MySQL 8.0                                                  │
│  - Tabelas: Client, Favorite                                 │
│  - Volume persistente: mysql_data                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              EXTERNA (Fake Store API - Pública)                 │
│            https://fakestoreapi.com/products                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ Pontos de Validação

### 1. Database
- [x] MySQL 8.0 Alpine rodando
- [x] Banco `guardei_db` criado
- [x] Tabelas criadas (Prisma migrations)
- [x] Volume persistente configurado

### 2. Backend
- [x] Express iniciado em porta 3001
- [x] CORS ativado
- [x] Migrações Prisma executadas
- [x] /health respondendo OK
- [x] Rotas funcionando

### 3. Frontend
- [x] React app compilado
- [x] Nginx servindo static files
- [x] SPA routing funcionando
- [x] API_URL apontando para backend correto

### 4. Comunicação
- [x] Frontend consegue chamar backend
- [x] Backend consegue acessar MySQL
- [x] Dados sendo salvos persistentemente

---

## 🎯 Para Apresentação Acadêmica

### Setup Mínimo
```bash
git clone <repo>
cd guardei-main
docker compose up --build
```

### URLs para Demo
1. **Frontend**: http://localhost:5173
2. **Backend**: http://localhost:3001
3. **Health**: http://localhost:3001/health

### Fluxo de Demo
1. Criar cliente: Nome + Email
2. Ver lista de clientes
3. Navegar para produtos
4. Favoritar um produto (seleciona cliente)
5. Ver favoritos do cliente
6. Remover um favorito
7. Mostrar logs: `docker compose logs -f`

---

## 🔄 Ciclo de Vida do Container

```
1. docker compose up --build
        ↓
2. Docker cria rede: guardei-network
        ↓
3. Inicia MySQL (aguarda healthcheck)
        ↓
4. MySQL healthcheck OK ✓
        ↓
5. Backend inicia, executa migrações Prisma
        ↓
6. Backend responde em http://backend:3001/health ✓
        ↓
7. Frontend constrói (VITE_API_URL=http://backend:3001)
        ↓
8. Frontend responde em http://localhost:5173 ✓
        ↓
9. Aplicação totalmente pronta! 🎉
```

---

## 📊 Estatísticas

| Métrica | Valor |
|---------|-------|
| Arquivos criados | 10+ |
| Linhas de código Docker | 200+ |
| Documentação | 3 arquivos |
| Serviços Docker | 3 (db, backend, frontend) |
| Portas configuradas | 3 (3306, 3001, 5173) |
| Variáveis de ambiente | 10+ |
| Healthchecks | 3 |
| Volumes persistentes | 1 |
| Networks isoladas | 1 |

---

**Projeto totalmente dockerizado e pronto para produção! ✨**
