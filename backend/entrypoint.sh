#!/bin/sh
set -e

echo "Aguardando banco de dados estar pronto..."
sleep 10

echo "Executando migrações do Prisma..."
npx prisma migrate deploy

echo "Iniciando servidor..."
node src/index.js
