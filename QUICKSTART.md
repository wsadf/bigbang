# Guia Rápido de Início

## Instalação e Execução

1. **Instalar dependências:**
```bash
npm install
```

2. **Iniciar servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Acessar no navegador:**
```
http://localhost:3000
```

## Estrutura de Dados da API

A API deve retornar um objeto JSON com a seguinte estrutura:

```json
{
  "saldoTotal": 304.78,
  "rendimento": 124,
  "estatisticas": [
    {
      "id": "conta-pj",
      "titulo": "Conta PJ",
      "valor": 39882
    }
  ],
  "transacoes": [
    {
      "id": "1",
      "nome": "Mercadinho da Cidade",
      "categoria": "Compras",
      "valor": 10.98
    }
  ],
  "analise": {
    "ganhos": 2789.21,
    "saidas": 1278.47,
    "categorias": [
      {
        "nome": "Compras",
        "percentual": 62
      }
    ]
  }
}
```

## Testando com Dados Mock

Se a API não estiver disponível, você pode modificar temporariamente o arquivo `src/components/Dashboard.vue` para usar dados mock:

```javascript
import { mockDashboardData } from '../data/mockData.js'

// No método loadData(), substitua:
this.dashboardData = await Promise.race([dataPromise, timeoutPromise])
// Por:
this.dashboardData = mockDashboardData
```

## Build de Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## Preview do Build

```bash
npm run preview
```

