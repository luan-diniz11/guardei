# 🛍️ Guardei - Frontend

Frontend da plataforma **Guardei** — salve seus produtos favoritos para futuras compras.

## 🚀 Stack Tecnológico

- **React 18** - Biblioteca UI
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Navegação entre páginas
- **Axios** - Cliente HTTP

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn

## 📦 Instalação

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
VITE_API_URL=http://localhost:3001
```

### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O aplicativo será aberto automaticamente em `http://localhost:5173`

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Clients.jsx        # Página de clientes
│   │   ├── Products.jsx       # Página de produtos
│   │   └── Favorites.jsx      # Página de favoritos
│   ├── components/
│   │   ├── Navbar.jsx         # Barra de navegação
│   │   ├── ClientCard.jsx     # Card de cliente
│   │   ├── ProductCard.jsx    # Card de produto
│   │   └── FavoriteCard.jsx   # Card de favorito
│   ├── services/
│   │   └── api.js             # Serviço de API
│   ├── App.jsx                # Componente raiz
│   ├── main.jsx               # Entrada da aplicação
│   └── index.css              # Estilos globais
├── .env                       # Variáveis de ambiente
├── index.html                 # Arquivo HTML
├── vite.config.js             # Configuração do Vite
├── tailwind.config.js         # Configuração do Tailwind
└── package.json               # Dependências do projeto
```

## 🎨 Recursos

### Páginas

#### 🧑‍💼 Clientes (`/clients`)
- Listar todos os clientes em cards
- Formulário para criar novo cliente (nome + email)
- Editar cliente com inline update
- Deletar cliente com confirmação
- Botão "Ver Favoritos" que navega para `/clients/:id/favorites`

#### 📦 Produtos (`/products`)
- Listar todos os produtos da API
- Card com imagem, título, preço e avaliação
- Botão "Favoritar" que abre modal para selecionar cliente
- Feedback visual quando produto já está favoritado
- Responsivo para mobile e desktop

#### ❤️ Favoritos (`/clients/:id/favorites`)
- Listar favoritos do cliente selecionado
- Card com imagem, título, preço e avaliação
- Botão para remover dos favoritos
- Botão voltar para a página de clientes

### 🎯 Navegação
- Navbar sticky com logo e links de navegação
- Breadcrumb intuitivo de rotas
- Transições suaves entre páginas

### 🌙 Dark Mode
- Design limpo e moderno
- Dark mode ativado por padrão
- Cores principais:
  - Preto: `#000000`
  - Branco: `#FFFFFF`
  - Laranja (destaque): `#F97316`

### 📱 Responsividade
- Grid adaptativo (1 coluna mobile, 2 tablets, 3-4 desktop)
- Navegação otimizada para mobile
- Cards com hover animado

### 🔖 Rodapé
- Texto fixo em todas as páginas
- © 2025 Guardei — José Luan Diniz, Wellington Almeida, Carlos Eduardo França

## 🛠️ Scripts

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🔌 API

O frontend consome uma API REST do backend em `http://localhost:3001` com os seguintes endpoints:

### Clientes
- `GET /clients` - Listar todos
- `POST /clients` - Criar novo
- `PUT /clients/:id` - Atualizar
- `DELETE /clients/:id` - Deletar

### Produtos
- `GET /products` - Listar todos
- `GET /products/:id` - Buscar por ID

### Favoritos
- `GET /clients/:id/favorites` - Listar favoritos de um cliente
- `POST /clients/:id/favorites` - Adicionar favorito
- `DELETE /clients/:id/favorites/:productId` - Remover favorito

## 📝 Tratamento de Erros

- Mensagens de erro amigáveis em português
- Loading states durante requisições
- Validação de formulários
- Tratamento de conexão com API

## 🚀 Deploy

Para fazer deploy em produção:

```bash
# Build
npm run build

# A pasta `dist` contém os arquivos prontos para deploy
```

## 📄 Licença

MIT

---

**Desenvolvido com ❤️ para Guardei**
