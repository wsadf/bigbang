# BigBang - Dashboard Financeiro

Dashboard financeiro responsivo desenvolvido com Vue.js que consome dados de uma API e exibe informações financeiras de forma clara e intuitiva.

## 🚀 Funcionalidades

- **Consumo de API**: Requisições HTTP para buscar dados dinamicamente
- **Dashboard Principal**: 
  - Exibição de saldo total com rendimento
  - Cards de estatísticas (Conta PJ, Recebimentos, Lucro)
  - Lista de transações recentes com ícones e valores
  - Análise geral com ganhos, saídas e breakdown por categoria
- **Estados de Loading**: Indicadores visuais durante o carregamento
- **Tratamento de Erros**: Mensagens amigáveis para erros de API (404, 500, timeout)
- **Formatação**: Valores em Real (R$) e percentuais formatados corretamente
- **Responsividade**: Layout adaptável para desktop e mobile

## 🛠️ Tecnologias

- **Vue.js 3**: Framework JavaScript reativo
- **Vite**: Build tool e dev server
- **CSS3**: Estilização moderna e responsiva
- **ES6+**: JavaScript moderno

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd bigbang
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:3000
```

## 🏗️ Estrutura do Projeto

```
/
├── src/
│   ├── assets/                    # Recursos estáticos
│   │   ├── styles/                # Estilos CSS
│   │   │   ├── main.css          # Estilos globais
│   │   │   └── variables.css     # Variáveis CSS
│   │   ├── images/               # Imagens
│   │   ├── icons/                # Ícones
│   │   └── fonts/                # Fontes customizadas
│   ├── components/               # Componentes Vue
│   │   ├── __tests__/            # Testes dos componentes
│   │   ├── Dashboard.vue         # Componente principal
│   │   ├── Header.vue            # Cabeçalho com navegação
│   │   ├── BalanceSection.vue    # Seção de saldo e rendimento
│   │   ├── StatisticsPanel.vue   # Painel de estatísticas
│   │   ├── StatisticCard.vue     # Card individual de estatística
│   │   ├── RecentTransactions.vue # Transações recentes
│   │   ├── TransactionItem.vue   # Item individual de transação
│   │   ├── GeneralAnalysis.vue   # Análise geral
│   │   └── CategoryItem.vue      # Item de categoria
│   ├── services/                 # Serviços
│   │   ├── __tests__/            # Testes dos serviços
│   │   └── api.js                # Serviço de API e formatação
│   ├── data/                     # Dados mock (desenvolvimento)
│   │   └── mockData.js
│   ├── App.vue                   # Componente raiz
│   └── main.js                   # Entry point
├── index.html
├── package.json
├── vite.config.js
├── vitest.config.js
└── README.md
```

### 📁 Assets

A pasta `src/assets/` contém todos os recursos estáticos:
- **styles/**: Estilos CSS globais e variáveis
- **images/**: Imagens e fotos
- **icons/**: Ícones SVG ou PNG
- **fonts/**: Fontes customizadas

Para usar assets nos componentes, utilize o alias `@`:
```vue
<img src="@/assets/images/logo.png" alt="Logo" />
```

## 📡 API

O dashboard consome dados da seguinte API:

**Endpoint**: `https://api.jsonbin.io/v3/b/691b5807d0ea881f40ee8674`

### Estrutura esperada dos dados:

```json
{
  "saldoTotal": 304.78,
  "rendimento": 124,
  "estatisticas": [
    {
      "id": "conta-pj",
      "titulo": "Conta PJ",
      "valor": 39882
    },
    {
      "id": "recebimentos",
      "titulo": "Recebimentos",
      "valor": 765.88
    },
    {
      "id": "lucro",
      "titulo": "Lucro",
      "valor": 15887
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

## 🎨 Design

O dashboard replica o design fornecido no Figma com:
- Tema escuro na seção superior (header e saldo)
- Tema claro na seção inferior (transações e análise)
- Cores e tipografia consistentes
- Ícones SVG para melhor qualidade
- Animações suaves e transições

## 📱 Responsividade

O layout é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- **Desktop**: Layout em grid com múltiplas colunas
- **Tablet**: Ajuste de colunas e espaçamentos
- **Mobile**: Layout em coluna única com otimizações de toque

## ♿ Acessibilidade

- Navegação por teclado
- Atributos ARIA em elementos interativos
- Contraste adequado de cores
- Foco visível em elementos interativos

## 🧪 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera build de produção
- `npm run preview`: Preview do build de produção

## 📝 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

## 👨‍💻 Desenvolvido por

Desenvolvido com ❤️ usando Vue.js

