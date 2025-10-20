# 🔐 Configurar Conta do GitHub

## Problema: Git está usando conta errada (PilgrimsCode)

### Solução: Atualizar credenciais do Windows

#### Opção 1: Gerenciador de Credenciais do Windows (Mais Fácil)

1. Pressione `Win + R`
2. Digite: `control /name Microsoft.CredentialManager`
3. Clique em "Credenciais do Windows"
4. Procure por entradas do GitHub:
   - `git:https://github.com`
   - `github.com`
5. Clique em cada uma e depois em "Remover"
6. Tente fazer push novamente - vai pedir login

#### Opção 2: Via PowerShell

```powershell
# Remover credenciais antigas
git credential-manager-core erase https://github.com
```

Depois tente push novamente:
```bash
git push -u origin main
```

#### Opção 3: Usar Token de Acesso Pessoal (Recomendado)

1. Vá em: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Classic"
3. Marque: `repo` (full control)
4. Copie o token gerado

Depois use o token no push:
```bash
git remote set-url origin https://SEU_TOKEN@github.com/AkemiBia/smt.git
git push -u origin main
```

#### Opção 4: SSH (Mais Seguro)

1. Gerar chave SSH:
```bash
ssh-keygen -t ed25519 -C "beatrizakemi040@gmail.com"
```

2. Copiar chave pública:
```bash
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
```

3. Adicionar no GitHub:
   - Vá em: https://github.com/settings/keys
   - Clique em "New SSH key"
   - Cole a chave e salve

4. Mudar URL do repositório:
```bash
git remote set-url origin git@github.com:AkemiBia/smt.git
git push -u origin main
```

## 🎯 Qual método você prefere?

- **Mais Rápido**: Opção 1 (Gerenciador de Credenciais)
- **Mais Prático**: Opção 3 (Token)
- **Mais Seguro**: Opção 4 (SSH)

