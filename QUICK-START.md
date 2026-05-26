# 📚 Guia Rápido de Referência - Guardei

## 🚀 Início Rápido

### Execução Local (Sem Docker)

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev
# Acesse: http://localhost:3001

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
# Acesse: http://localhost:5173
```

### Execução com Docker

```bash
# Certifique-se de que Docker Desktop está rodando

# Construir e iniciar tudo
docker compose up --build

# Acessar
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
```

---

## 📁 Estrutura de Arquivos

```
guardei/
├── 📄 docker-compose.yml      → Produção
├── 📄 docker-compose.dev.yml  → Desenvolvimento
├── 📄 .env.example            → Exemplo de variáveis
├── 📄 .dockerignore           → Arquivos ignorados no Docker
├── 📄 README.md               → Documentação completa
├── 📄 DOCKER.md               → Guia específico de Docker
│
├── backend/
│   ├── 🐳 Dockerfile          → Build do Node + Express
│   ├── 📄 .env                → Variáveis do backend
│   ├── 📄 entrypoint.sh       → Script de migrações
│   ├── src/
│   │   ├── index.js           → Servidor Express
│   │   └── routes/            → Endpoints da API
│   └── prisma/
│       └── schema.prisma      → Modelo de dados
│
└── frontend/
    ├── 🐳 Dockerfile          → Build Vite + Nginx
    ├── 📄 nginx.conf          → Configuração Nginx
    ├── 📄 .env                → Variáveis (desenvolvimento)
    ├── 📄 .env.production     → Variáveis (produção Docker)
    └── src/
        ├── App.jsx            → Componente raiz
        ├── main.jsx           → Entrada
        ├── services/api.js    → Cliente API
        ├── pages/             → Páginas
        └── components/        → Componentes
```

---

## 🔌 Portas

| Serviço | Porta | URL |
|---------|-------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 3001 | http://localhost:3001 |
| MySQL | 3306 | localhost:3306 |

---

## 📝 Variáveis de Ambiente

### Backend (`.env`)
```env
DB_USER=guardei_user
DB_PASSWORD=guardei_password
DB_HOST=db                  # 'db' para Docker, 'localhost' para local
DB_PORT=3306
DB_NAME=guardei_db
DATABASE_URL="mysql://guardei_user:guardei_password@db:3306/guardei_db"
PORT=3001
NODE_ENV=production
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:3001     # Local
VITE_API_URL=http://backend:3001       # Docker
```

---

## 🎯 Comandos Essenciais

```bash
# DOCKER
docker compose up --build              # Iniciar tudo (reconstruir)
docker compose up                      # Iniciar (sem rebuild)
docker compose down                    # Parar
docker compose down -v                 # Parar e limpar volumes
docker compose logs -f                 # Ver logs
docker compose logs -f backend         # Ver logs do backend

# LOCAL
cd backend && npm run dev              # Backend
cd frontend && npm run dev             # Frontend
cd backend && npm run prisma:studio    # Gerenciador visual BD

# PRISMA (em Docker)
docker compose exec backend npx prisma migrate deploy   # Executar migrações
docker compose exec backend npm run prisma:studio       # Abrir Prisma Studio
```

---

## ✅ Checklist de Validação

- [ ] Docker Desktop instalado e rodando
- [ ] Clone do repositório
- [ ] Arquivo `.env` configurado
- [ ] `docker compose up --build` sem erros
- [ ] MySQL iniciou (aguarde 30-60s)
- [ ] Backend em http://localhost:3001/health retorna `{"status":"OK"}`
- [ ] Frontend em http://localhost:5173 carrega
- [ ] Consegue criar um cliente
- [ ] Consegue favoritar um produto
- [ ] Consegue ver favoritos do cliente

---

## 🔍 Endpoints Principais

```
GET    http://localhost:3001/clients              # Listar clientes
POST   http://localhost:3001/clients              # Criar cliente
GET    http://localhost:3001/products             # Listar produtos
POST   http://localhost:3001/clients/1/favorites  # Favoritar
GET    http://localhost:3001/clients/1/favorites  # Ver favoritos
GET    http://localhost:3001/health               # Health check
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Cannot connect to MySQL" | Aguarde 60s, verifique logs: `docker compose logs db` |
| "Address already in use" | Mude porta em docker-compose.yml ou mate processo: `lsof -i :3001` |
| "Frontend não conecta backend" | Verifique VITE_API_URL: local=localhost:3001, Docker=backend:3001 |
| "Docker não inicia" | Certifique-se Docker Desktop está rodando |
| "Build falha" | Execute: `docker compose down -v && docker compose up --build` |

---

## 📚 Documentação Completa

- **README.md** - Documentação completa do projeto
- **DOCKER.md** - Guia detalhado de Docker
- **backend/SETUP.md** - Setup do backend
- **frontend/SETUP.md** - Setup do frontend

---

## 🎓 Para Apresentação Acadêmica

1. **Ambiente de Demo**:
   ```bash
   docker compose up --build
   ```

2. **URLs para Abrir**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

3. **Teste Funcional**:
   - Criar cliente
   - Visualizar produtos
   - Favoritar produto
   - Ver favoritos por cliente

4. **Mostrar Código**:
   - `backend/src/index.js` - Servidor Express
   - `frontend/src/App.jsx` - Aplicação React
   - `backend/prisma/schema.prisma` - Modelo de dados
   - `docker-compose.yml` - Orquestração

---

**Desenvolvido com ❤️ para demonstração profissional**
