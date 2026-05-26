# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Estágio de produção
FROM node:18-alpine

WORKDIR /app

# Instalar dumb-init para gerenciar sinais corretamente
RUN apk add --no-cache dumb-init

# Copiar node_modules e código do estágio anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY . .

# Expor porta
EXPOSE 3001

# Usar dumb-init como entrypoint
ENTRYPOINT ["dumb-init", "--"]

# Comando para executar migrações e iniciar o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
