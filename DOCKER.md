# 🐳 Guia de Docker - Guardei

Este documento fornece instruções detalhadas para executar a aplicação Guardei com Docker.

---

## 📋 Pré-requisitos

- **Docker** 20.10+ instalado ([Download](https://www.docker.com/products/docker-desktop))
- **Docker Compose** 2.0+ instalado (vem com Docker Desktop)
- **Git** para clonar o repositório

### Verificar instalação

```bash
docker --version
docker-compose --version
```

---

## 🚀 Início Rápido

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/guardei.git
cd guardei
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Editea o arquivo `.env` se necessário. Valores padrão:
```env
DB_USER=guardei_user
DB_PASSWORD=guardei_password
DB_HOST=db
DB_PORT=3306
DB_NAME=guardei_db
```

### 3. Construa e inicie os containers

```bash
docker-compose up --build
```

Aguarde alguns segundos enquanto os containers iniciam. Você verá logs indicando:

```
✓ MySQL iniciou e está pronto
✓ Backend executou migrações e iniciou
✓ Frontend fez build e iniciou
```

### 4. Acesse a aplicação

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

---

## 📁 Estrutura de Containers

```
guardei-app
├── guardei-db (MySQL 8.0)
│   ├── Volume: mysql_data
│   └── Porta: 3306
│
├── guardei-backend (Node 18 + Express)
│   ├── Porta: 3001
│   ├── Healthcheck: /health
│   └── Script: Migrações automáticas
│
└── guardei-frontend (Node 18 + Vite + Nginx)
    ├── Porta: 5173
    └── Healthcheck: /
```

---

## 🔧 Comandos Principais

### Iniciar aplicação (reconstruir imagens)

```bash
docker-compose up --build
```

### Iniciar aplicação (sem reconstruir)

```bash
docker-compose up
```

### Parar aplicação

```bash
docker-compose down
```

### Parar e remover dados (limpar tudo)

```bash
docker-compose down -v
```

### Ver logs

```bash
# Todos os logs
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend

# Apenas banco de dados
docker-compose logs -f db
```

### Executar comandos em containers

```bash
# Abrir shell do backend
docker-compose exec backend sh

# Executar Prisma Studio
docker-compose exec backend npm run prisma:studio

# Executar migrações manualmente
docker-compose exec backend npx prisma migrate deploy

# Abrir MySQL CLI
docker-compose exec db mysql -u guardei_user -p guardei_db
# Senha: guardei_password
```

---

## 🔄 Modos de Execução

### Produção (Recomendado)

Usa `docker-compose.yml`:

```bash
docker-compose up --build
```

**Características:**
- Build otimizado (multi-stage)
- Nginx para servir frontend
- MySQL com volume persistente
- Healthchecks ativados
- Migrações automáticas

### Desenvolvimento

Usa `docker-compose.dev.yml` com hot reload:

```bash
docker-compose -f docker-compose.dev.yml up
```

**Características:**
- Hot reload para backend e frontend
- Volumes montados para edição em tempo real
- Logs mais verbosos
- Sem otimizações de produção

---

## 📝 Arquivos de Configuração

### `docker-compose.yml`

Configuração para **produção**:
- Builds otimizados
- Nginx como reverse proxy
- Volumes para persistência
- Healthchecks

### `docker-compose.dev.yml`

Configuração para **desenvolvimento**:
- Hot reload dos aplicativos
- Volumes para edição em tempo real
- Sem build de produção

### `.env`

Variáveis de ambiente globais:
```env
DB_USER=guardei_user
DB_PASSWORD=guardei_password
DB_HOST=db
DB_PORT=3306
DB_NAME=guardei_db
```

### `backend/Dockerfile`

Build do backend com:
- Multi-stage build
- Prisma migrations automáticas
- dumb-init para sinais

### `frontend/Dockerfile`

Build do frontend com:
- Build otimizado do Vite
- Nginx como servidor estático
- SPA routing configurado

### `frontend/nginx.conf`

Configuração do Nginx:
- Suporte a SPA (Single Page Application)
- Cache de assets estáticos
- Regras de rewrite

---

## 🔐 Segurança

### Produção

1. **Altere a senha do MySQL** em `.env`:
   ```env
   DB_PASSWORD=sua_senha_forte_aqui
   ```

2. **Use variáveis de ambiente**:
   ```bash
   export DB_PASSWORD=sua_senha_forte
   docker-compose up
   ```

3. **Não comite `.env` no Git**:
   - Está no `.gitignore` por padrão
   - Use `.env.example` para documentar variáveis

4. **Revise o CORS** em `backend/src/index.js`:
   ```javascript
   app.use(cors()); // Atualmente aceita qualquer origem
   ```

### Desenvolvimento

Use valores padrão simples para facilitar testes:
```env
DB_PASSWORD=guardei_password
```

---

## 🐛 Solução de Problemas

### "Cannot connect to MySQL"

```bash
# Verifique se o container está rodando
docker-compose ps

# Verifique os logs do banco
docker-compose logs db

# Aguarde mais tempo (MySQL pode levar 30-60s)
```

### "Address already in use"

```bash
# Identifique qual processo está usando a porta
lsof -i :3001  # Backend
lsof -i :5173  # Frontend
lsof -i :3306  # MySQL

# Ou mude a porta em docker-compose.yml
```

### "Build failed"

```bash
# Reconstrua sem cache
docker-compose up --build --no-cache

# Ou limpe tudo e recomece
docker-compose down -v
docker-compose up --build
```

### "Frontend não consegue conectar ao backend"

Verifique a URL da API:

- **Em Docker**: use `http://backend:3001` (nome do service)
- **Localmente**: use `http://localhost:3001`

No `frontend/src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://backend:3001'
```

### "Migrations failed"

```bash
# Execute migrações manualmente
docker-compose exec backend npx prisma migrate deploy

# Ou resete o banco
docker-compose down -v
docker-compose up --build
```

---

## 📊 Monitoramento

### Ver status dos containers

```bash
docker-compose ps
```

### Ver uso de recursos

```bash
docker stats
```

### Ver histórico de logs

```bash
# Últimas 100 linhas
docker-compose logs --tail 100

# Com timestamp
docker-compose logs -f --timestamps
```

---

## 🔄 Backup e Restauração

### Fazer backup do banco de dados

```bash
# Exportar dados
docker-compose exec db mysqldump -u guardei_user -p guardei_db > backup.sql
# Insira a senha: guardei_password
```

### Restaurar banco de dados

```bash
# Importar dados
docker-compose exec -T db mysql -u guardei_user -p guardei_db < backup.sql
# Insira a senha: guardei_password
```

### Backup do volume Docker

```bash
# Fazer backup
docker run --rm -v guardei_mysql_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/mysql_backup.tar.gz -C /data .

# Restaurar
docker run --rm -v guardei_mysql_data:/data -v $(pwd):/backup \
  alpine tar xzf /backup/mysql_backup.tar.gz -C /data
```

---

## 🚀 Deploy em Produção

### Docker Swarm

```bash
# Iniciar Swarm
docker swarm init

# Deploy da stack
docker stack deploy -c docker-compose.yml guardei
```

### Kubernetes (com Helm)

Crie um `values.yaml`:
```yaml
backend:
  image: seu-repo/guardei-backend:1.0.0
  replicas: 3

frontend:
  image: seu-repo/guardei-frontend:1.0.0
  replicas: 2

database:
  password: seu_password_seguro
```

---

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Desenvolvido com ❤️ para facilitar deployment com Docker**
