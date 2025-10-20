# ⚡ Comandos Rápidos - Deploy na Vercel

## 🚀 Deploy Rápido (3 passos)

### 1. Inicializar Git e fazer commit

```bash
git init
git add .
git commit -m "Initial commit - Sistema de Contadores"
```

### 2. Criar repositório no GitHub

```bash
# Criar repositório no GitHub primeiro
# Depois conectar:
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git branch -M main
git push -u origin main
```

### 3. Deploy na Vercel via Dashboard

1. Acesse: https://vercel.com/new
2. Importe seu repositório do GitHub
3. **Configure Storage:**
   - Antes de fazer o primeiro deploy, clique em "Storage" tab
   - "Create Database" → "KV" → nome: "contadores-db"
   - Conecte ao projeto
4. Clique em "Deploy"

## 📝 Checklist

- [ ] Git instalado
- [ ] Repositório no GitHub criado
- [ ] Código commitado e pushed
- [ ] Conta na Vercel criada
- [ ] KV Database criado e conectado
- [ ] Deploy realizado

## 🔄 Deploy via CLI (Alternativa)

```bash
# Instalar Vercel CLI
bun add -g vercel

# Login
vercel login

# Deploy
vercel

# Criar KV Database
vercel kv create contadores-db

# Fazer deploy de produção
vercel --prod
```

## ✅ Verificar

Após deploy, teste em: `https://seu-projeto.vercel.app`

## 🛠️ Atualizar o site

```bash
git add .
git commit -m "Atualização"
git push
```

Deploy automático! 🎉

