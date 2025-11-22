/**
 * Dados mock para desenvolvimento e testes
 * Estrutura esperada da API
 */
export const mockDashboardData = {
  saldoTotal: 304.78,
  rendimento: 124,
  estatisticas: [
    {
      id: 'conta-pj',
      titulo: 'Conta PJ',
      valor: 39882
    },
    {
      id: 'recebimentos',
      titulo: 'Recebimentos',
      valor: 765.88
    },
    {
      id: 'lucro',
      titulo: 'Lucro',
      valor: 15887
    }
  ],
  transacoes: [
    {
      id: '1',
      nome: 'Mercadinho da Cidade',
      categoria: 'Compras',
      valor: 10.98
    },
    {
      id: '2',
      nome: 'Tenda Nostra',
      categoria: 'Compras',
      valor: 26.38
    },
    {
      id: '3',
      nome: 'Farmácia Um',
      categoria: 'Compras',
      valor: 43.17
    },
    {
      id: '4',
      nome: 'Academia Body',
      categoria: 'Compras',
      valor: 62.12
    },
    {
      id: '5',
      nome: 'ShopOnline',
      categoria: 'Compras',
      valor: 135.24
    }
  ],
  analise: {
    ganhos: 2789.21,
    saidas: 1278.47,
    categorias: [
      {
        nome: 'Compras',
        percentual: 62
      },
      {
        nome: 'Boletos',
        percentual: 14
      },
      {
        nome: 'Investimentos',
        percentual: 5
      }
    ]
  }
}

