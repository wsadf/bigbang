# BigBang - Dashboard Financeiro

Dashboard financeiro responsivo desenvolvido com Vue.js que consome dados de uma API e exibe informações financeiras de forma clara e intuitiva. O projeto replica um design do Figma e apresenta dados de saldo, rendimento, estatísticas, transações recentes e análise de gastos.

## Tecnologias Utilizadas

- **Vue.js 3** - Framework JavaScript reativo para construção da interface
- **TypeScript** - Tipagem estática para maior segurança e manutenibilidade do código
- **Vite** - Build tool moderna e rápida para desenvolvimento e produção
- **Axios** - Cliente HTTP para consumo da API
- **Vitest** - Framework de testes unitários
- **CSS3** - Estilização moderna com variáveis CSS e media queries
- **ES6+** - JavaScript moderno com async/await, destructuring, arrow functions

## Como Instalar Dependências

```bash
npm install
```

## Como Rodar o Projeto Localmente

1. **Instale as dependências** (se ainda não instalou):
```bash
npm install
```

2. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

3. **Acesse no navegador**:
```
http://localhost:3000
```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção com type checking
- `npm run preview` - Preview do build de produção
- `npm run type-check` - Verifica tipos TypeScript
- `npm run test` - Executa testes unitários
- `npm run test:ui` - Executa testes com interface gráfica
- `npm run test:coverage` - Executa testes com relatório de cobertura

## Link do Deploy

(Adicione o link do deploy aqui quando disponível)

## Screenshots

Screenshots da aplicação funcionando estão disponíveis na pasta [`screenshots/`](./screenshots/).

## Decisões Técnicas Tomadas

### Arquitetura e Estrutura
- **Componentes Vue reutilizáveis**: Criação de componentes compartilhados como `SectionHeader` para evitar duplicação de código
- **Separação de responsabilidades**: Serviços isolados (`api.ts`) para lógica de negócio, componentes para apresentação
- **TypeScript**: Implementado para type safety, melhor autocomplete e detecção de erros em tempo de desenvolvimento
- **Organização de assets**: Estrutura clara com pastas separadas para estilos, ícones, imagens e fontes

### Tratamento de Erros
- **Retry automático com backoff exponencial**: Implementado para lidar com falhas temporárias da API (até 3 tentativas)
- **Tratamento detalhado de erros HTTP**: Mensagens específicas para cada tipo de erro (404, 500, timeout, network)
- **Validação de dados**: Validação da estrutura de dados recebida da API antes de processar

### Performance
- **Lazy loading de componentes**: Uso de `defineAsyncComponent` para carregar componentes apenas quando necessário
- **Code splitting**: Configuração do Vite para separar chunks de vendor (Vue, Axios) e reduzir bundle inicial
- **Memoização**: Uso de computed properties para evitar recálculos desnecessários
- **Otimizações de build**: Minificação, tree shaking e remoção de console.log em produção

### Acessibilidade
- **ARIA completo**: Atributos ARIA em todos os componentes interativos para suporte a screen readers
- **Navegação por teclado**: Suporte completo a Tab, Enter, Space e Escape
- **Focus management**: Skip links e focus trap para melhor experiência de navegação
- **Detecção de navegação por teclado**: Estilos diferenciados quando o usuário navega via teclado

### Responsividade
- **Mobile-first approach**: Design pensado primeiro para mobile, depois expandido para desktop
- **Breakpoints consistentes**: Padronização de breakpoints (1024px, 768px, 480px) em todos os componentes
- **Menu mobile**: Implementação de menu hambúrguer com overlay para melhor UX em dispositivos móveis

### Testes
- **Vitest**: Escolhido por ser rápido, compatível com Vite e ter boa integração com Vue
- **Cobertura de casos críticos**: Testes focados em tratamento de erros, transformação de dados e formatação

## Melhorias Futuras

- [ ] Implementar cache de dados da API para reduzir requisições
- [ ] Adicionar filtros e ordenação nas transações
- [ ] Implementar gráficos interativos para visualização de dados
- [ ] Adicionar modo escuro/claro configurável pelo usuário
- [ ] Implementar PWA (Progressive Web App) para uso offline
- [ ] Adicionar mais testes de integração e E2E
- [ ] Implementar internacionalização (i18n) para múltiplos idiomas
- [ ] Adicionar animações mais elaboradas e micro-interações
- [ ] Implementar virtual scrolling para listas muito grandes
- [ ] Adicionar exportação de dados (PDF, CSV)
- [ ] Implementar notificações em tempo real
- [ ] Adicionar dashboard de métricas de performance
