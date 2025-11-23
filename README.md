# BigBang Dashboard

Dashboard financeiro responsivo desenvolvido com Vue.js que consome dados de uma API e exibe informações financeiras de forma clara e intuitiva. O projeto apresenta dados de saldo, rendimento, estatísticas, transações recentes e análise de gastos.

## 🛠️ Tecnologias Utilizadas

- **Vue 3** - Framework JavaScript reativo
- **TypeScript** - Tipagem estática para maior segurança de código
- **Vite** - Build tool moderna e rápida
- **Axios** - Cliente HTTP para requisições à API
- **CSS3** - Estilização com variáveis CSS e design responsivo
- **Vitest** - Framework de testes

## 📦 Como Instalar Dependências

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior) e o npm.

```bash
# Clone o repositório
git clone https://github.com/wsadf/bigbang.git

# Entre na pasta do projeto
cd bigbang

# Instale as dependências
npm install
```

## 🚀 Como Rodar o Projeto Localmente

Após instalar as dependências, você pode rodar o projeto em modo de desenvolvimento:

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:3000` (ou outra porta se a 3000 estiver ocupada).

### Outros comandos úteis:

```bash
# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Verificação de tipos TypeScript
npm run type-check

# Executar testes
npm run test
```

## 🌐 Deploy

Acesse o projeto: [https://bigbang-gamma.vercel.app/](https://bigbang-gamma.vercel.app/) (Ctrl+Click ou Cmd+Click para abrir em nova guia)

## 🎯 Decisões Técnicas Tomadas

### Arquitetura e Estrutura
- **Componentes Vue 3 com Composition API**: Escolhido para melhor organização e reutilização de código
- **TypeScript**: Implementado para type safety e melhor experiência de desenvolvimento
- **Separação de responsabilidades**: Componentes, serviços, tipos e utilitários organizados em pastas distintas

### Performance
- **Lazy loading de componentes**: Componentes pesados são carregados sob demanda usando `defineAsyncComponent`
- **Code splitting**: Configurado no Vite para dividir o bundle em chunks menores
- **Otimizações de build**: Minificação com esbuild, tree shaking e otimização de assets

### Acessibilidade
- **ARIA labels**: Implementados em todos os elementos interativos
- **Navegação por teclado**: Suporte completo para navegação sem mouse
- **Screen readers**: Elementos semânticos e labels apropriados

### Responsividade
- **Mobile-first approach**: Design pensado primeiro para mobile
- **Breakpoints**: 480px (mobile pequeno), 768px (mobile), 1024px (tablet)
- **Menu hambúrguer**: Implementado para navegação mobile

### Estilização
- **Variáveis CSS**: Uso de variáveis para cores, espaçamentos e tipografia
- **Scoped styles**: Estilos isolados por componente para evitar conflitos
- **Design system**: Padrões consistentes de cores, espaçamentos e componentes

### Tratamento de Erros
- **Retry automático**: Implementado com backoff exponencial para requisições falhadas
- **Estados de loading e erro**: Feedback visual claro para o usuário
- **Validação de dados**: Validação de tipos e estrutura dos dados da API

## 🔮 Melhorias Futuras

- [ ] Implementar testes unitários mais abrangentes
- [ ] Adicionar testes E2E com Cypress ou Playwright
- [ ] Implementar cache de dados da API
- [ ] Adicionar suporte a temas (dark/light mode)
- [ ] Implementar filtros e ordenação nas transações
- [ ] Adicionar gráficos interativos para visualização de dados
- [ ] Implementar notificações em tempo real
- [ ] Adicionar suporte a múltiplas moedas
- [ ] Implementar exportação de relatórios (PDF/CSV)
- [ ] Adicionar autenticação de usuários
- [ ] Implementar PWA (Progressive Web App)
- [ ] Adicionar internacionalização (i18n)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes Vue
│   ├── shared/         # Componentes compartilhados
│   └── __tests__/      # Testes dos componentes
├── services/           # Serviços (API)
│   └── __tests__/      # Testes dos serviços
├── assets/             # Assets estáticos
│   ├── icons/          # Ícones SVG
│   ├── images/         # Imagens
│   └── styles/         # Estilos globais
├── types/              # Definições TypeScript
└── utils/              # Utilitários
```
