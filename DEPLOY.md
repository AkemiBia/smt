# 🚀 Deploy na Vercel

Guia passo a passo para fazer deploy do Sistema de Contadores na Vercel.

## 📋 Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Vercel CLI instalado: `bun add -g vercel`
3. Git instalado

## 🔧 Preparação

### 1. Configurar Git (se ainda não tiver)

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Criar repositório no GitHub

1. Vá para [GitHub](https://github.com) e crie um novo repositório
2. Conecte seu repositório local:

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

## 🌐 Deploy na Vercel

### Opção 1: Via Dashboard (Recomendado)

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em "Add New..." → "Project"
3. Importe seu repositório do GitHub
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: Deixe o padrão
   - **Output Directory**: `client/dist`

5. **IMPORTANTE**: Configure o Vercel KV:
   - No dashboard do projeto, vá em "Storage"
   - Clique em "Create Database"
   - Selecione "KV" (Key-Value Database)
   - Dê um nome (ex: "contadores-db")
   - Conecte ao seu projeto

6. Clique em "Deploy"

### Opção 2: Via CLI

```bash
# Login na Vercel
vercel login

# Deploy
vercel

# Siga as instruções:
# - Set up and deploy? Y
# - Which scope? [sua conta]
# - Link to existing project? N
# - Project name? [deixe o padrão ou escolha um nome]
# - Directory? ./
# - Override settings? N
```

Depois, configure o KV storage:

```bash
# Criar KV Database
vercel kv create contadores-db

# Linkar ao projeto
vercel link
```

## 🔑 Variáveis de Ambiente

Após criar o KV Database, a Vercel automaticamente adiciona as variáveis:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

Não é necessário configurar manualmente!

## 🎨 Configurar Avatares

Os avatares estão em `client/public/avatars/`. Para usar suas próprias imagens:

1. Substitua os arquivos SVG pelas suas fotos
2. Mantenha os mesmos nomes ou atualize `api/counters.js` com os novos caminhos
3. Faça commit e push:

```bash
git add client/public/avatars/*
git commit -m "Update avatars"
git push
```

A Vercel vai fazer deploy automaticamente!

## ✅ Verificar Deploy

Após o deploy:

1. A Vercel vai fornecer uma URL (ex: `https://seu-projeto.vercel.app`)
2. Acesse a URL e teste:
   - Ver contadores ✓
   - Incrementar contadores ✓
   - Ver avatares ✓

## 🔄 Atualizações Futuras

Toda vez que você fizer push para o repositório, a Vercel faz deploy automaticamente:

```bash
git add .
git commit -m "Sua mensagem"
git push
```

## 🐛 Troubleshooting

### Erro: "KV is not defined"
- Certifique-se de ter criado o KV Database no dashboard
- Verifique se está conectado ao projeto

### Avatares não aparecem
- Verifique se os arquivos estão em `client/public/avatars/`
- Verifique os caminhos no arquivo de dados

### API não funciona
- Verifique os logs no dashboard da Vercel
- Vá em "Deployments" → clique no deployment → "Functions" → veja os logs

## 📱 Domínio Customizado

Para usar seu próprio domínio:

1. No dashboard do projeto, vá em "Settings" → "Domains"
2. Adicione seu domínio
3. Configure o DNS conforme instruções da Vercel

## 🎉 Pronto!

Seu sistema de contadores está online e acessível de qualquer lugar!

URL exemplo: `https://seu-projeto.vercel.app`

