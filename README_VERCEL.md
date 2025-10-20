# 📘 Sistema de Contadores - Vercel Edition

Este projeto foi adaptado para funcionar na Vercel com armazenamento persistente usando Vercel KV.

## 🔄 Diferenças entre Local e Vercel

### Local (Desenvolvimento)
- ✅ Usa `server.js` com Express
- ✅ Dados salvos em `contadores.txt`
- ✅ Roda em `localhost:3001` (backend) e `localhost:5175` (frontend)

### Vercel (Produção)
- ✅ Usa funções serverless em `/api`
- ✅ Dados salvos no Vercel KV (Key-Value database)
- ✅ Tudo em uma URL (ex: `https://seu-app.vercel.app`)

## 🎯 Dados Iniciais

Os contadores iniciais estão definidos em `api/counters.js`:

```javascript
const defaultCounters = [
  { name: 'Isabela', value: 0, image: '/avatars/isabela.jpg' },
  { name: 'Dedeai', value: 0, image: '/avatars/dedeai.png' },
  { name: 'Bibs', value: 0, image: '/avatars/bibs.svg' },
  { name: 'Lali', value: 0, image: '/avatars/lali.jpeg' },
  { name: 'Samuel', value: 0, image: '/avatars/samuel.svg' },
  { name: 'Lari', value: 0, image: '/avatars/lari.svg' }
];
```

### Para alterar os contadores:

1. Edite `api/counters.js`
2. Modifique o array `defaultCounters`
3. Commit e push:
   ```bash
   git add api/counters.js
   git commit -m "Update default counters"
   git push
   ```

### Para resetar os contadores:

Na Vercel Dashboard:
1. Vá em Storage → seu KV database
2. Encontre a chave `counters`
3. Delete ou edite manualmente

## 📂 Estrutura de Arquivos

```
smt/
├── api/                    # Funções serverless da Vercel
│   ├── counters.js        # GET /api/counters - Lista contadores
│   └── increment.js       # POST /api/increment - Incrementa contador
├── client/                # Frontend React
│   ├── public/
│   │   └── avatars/       # Imagens dos avatares
│   └── src/
│       └── App.jsx        # Componente principal
├── vercel.json           # Configuração da Vercel
├── DEPLOY.md             # Guia completo de deploy
└── COMANDOS_RAPIDOS.md   # Comandos rápidos
```

## 🔧 Comandos Úteis

### Desenvolvimento Local
```bash
# Terminal 1 - Backend
bun run server

# Terminal 2 - Frontend  
cd client && bun run dev
```

### Deploy
```bash
# Commit changes
git add .
git commit -m "Update"
git push

# Deploy automático na Vercel!
```

## 🎨 Personalização de Avatares

1. Coloque suas imagens em `client/public/avatars/`
2. Nomes dos arquivos:
   - `isabela.jpg`
   - `dedeai.png`
   - `bibs.svg`
   - `lali.jpeg`
   - `samuel.svg`
   - `lari.svg`
3. Commit e push

## 🌐 URLs

### Desenvolvimento
- Frontend: http://localhost:5175
- Backend: http://localhost:3001

### Produção (exemplo)
- Site completo: https://seu-app.vercel.app
- API: https://seu-app.vercel.app/api/counters

## 📞 Suporte

Para mais detalhes, veja:
- `DEPLOY.md` - Guia completo de deploy
- `COMANDOS_RAPIDOS.md` - Comandos essenciais
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Vercel KV](https://vercel.com/docs/storage/vercel-kv)

