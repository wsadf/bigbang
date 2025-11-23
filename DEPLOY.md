# Guia de Deploy - BigBang Dashboard

## 🚀 Opção 1: Vercel (RECOMENDADO - Mais Simples)

### Passo a Passo:

1. **Acesse [vercel.com](https://vercel.com)** e faça login com sua conta GitHub

2. **Clique em "Add New Project"**

3. **Importe seu repositório** do GitHub (wsadf/bigbang)

4. **Configurações automáticas** - A Vercel detecta automaticamente:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Clique em "Deploy"** - Pronto! 🎉

6. **Sua aplicação estará online** em alguns segundos em uma URL como:
   - `https://bigbang-xxxxx.vercel.app`

### Vantagens:
- ✅ Deploy automático a cada push no GitHub
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Zero configuração necessária
- ✅ Preview de PRs automaticamente

---

## 🌐 Opção 2: Netlify (Também Muito Simples)

### Passo a Passo:

1. **Acesse [netlify.com](https://netlify.com)** e faça login com GitHub

2. **Clique em "Add new site" → "Import an existing project"**

3. **Conecte seu repositório** do GitHub

4. **Configure o build:**
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Clique em "Deploy site"**

6. **Sua aplicação estará online** em uma URL como:
   - `https://bigbang-xxxxx.netlify.app`

### Vantagens:
- ✅ Deploy automático
- ✅ HTTPS gratuito
- ✅ Formulários e funções serverless (se precisar no futuro)

---

## 📄 Opção 3: GitHub Pages (Mais Trabalhoso)

### Passo a Passo:

1. **Instale o gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Adicione no package.json:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Configure o base no vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/bigbang/', // nome do seu repositório
     // ... resto da config
   })
   ```

4. **Execute:**
   ```bash
   npm run deploy
   ```

5. **Ative no GitHub:**
   - Settings → Pages → Source: gh-pages branch

### Vantagens:
- ✅ Gratuito
- ✅ Integrado ao GitHub

### Desvantagens:
- ❌ Requer configuração manual
- ❌ URL será: `https://wsadf.github.io/bigbang/`

---

## 🎯 Recomendação Final

**Use Vercel** - É a opção mais simples e rápida:
- Zero configuração
- Deploy em menos de 2 minutos
- Melhor performance
- Interface mais intuitiva

Basta conectar o repositório GitHub e clicar em Deploy! 🚀

