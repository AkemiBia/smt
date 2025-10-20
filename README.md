# 🎯 Sistema de Contadores

Um sistema de contadores em tempo real construído com React, Tailwind CSS e Express.

## 📋 Funcionalidades

- ✅ Exibição de múltiplos contadores
- ✅ Incremento de contadores com um clique
- ✅ Persistência automática em arquivo
- ✅ Interface moderna e responsiva com Tailwind CSS
- ✅ Sincronização em tempo real com o servidor

## 🚀 Como Usar

### Instalação

```bash
# Instalar dependências do servidor
bun install

# Instalar dependências do cliente
cd client
bun install
cd ..
```

### Executar o Projeto

**Opção 1: Executar tudo junto (recomendado)**
```bash
bun install concurrently
bun run dev
```

**Opção 2: Executar separadamente**

Em um terminal:
```bash
bun run server
```

Em outro terminal:
```bash
cd client
bun run dev
```

### Acessar

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## 📁 Estrutura do Projeto

```
smt/
├── client/              # Aplicação React
│   ├── src/
│   │   ├── App.jsx     # Componente principal
│   │   ├── index.css   # Estilos Tailwind
│   │   └── main.jsx    # Entry point
│   └── package.json
├── server.js           # Servidor Express
├── contadores.txt      # Arquivo de dados
└── package.json
```

## 🎨 Tecnologias

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Express + Node.js
- **Runtime**: Bun
- **Persistência**: Arquivo de texto

## 📝 Formato do Arquivo

O arquivo `contadores.txt` segue o formato:
```
Nome do Contador 1 - 0 - /avatars/imagem.svg
Nome do Contador 2 - 0 - /avatars/imagem2.jpg
```

**Campos:**
- **Nome**: Nome do contador
- **Número**: Valor atual do contador
- **Imagem**: Caminho para a imagem de perfil (opcional)

Você pode editar manualmente este arquivo para adicionar mais contadores ou alterar os valores.

### Avatares

As imagens de perfil devem estar na pasta `client/public/avatars/`.
Formatos suportados: JPG, PNG, SVG, WEBP, GIF.

## 🛠️ Personalização

Para adicionar mais contadores, edite o arquivo `contadores.txt`:
```
Contador 1 - 0
Contador 2 - 0
Contador 3 - 0
Novo Contador - 100
```

## 📦 API Endpoints

- `GET /api/counters` - Retorna todos os contadores
- `POST /api/counters/:index/increment` - Incrementa um contador específico

## 🌟 Features

- Interface responsiva que funciona em desktop e mobile
- Animações suaves e transições
- Feedback visual ao interagir com os botões
- Tratamento de erros
- Recarregamento manual dos contadores

