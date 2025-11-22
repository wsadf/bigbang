/**
 * Tipos TypeScript para a API do Dashboard
 */

export interface DashboardBalance {
  total: number
  currency: string
  yield: {
    percentage: number
    period: string
  }
}

export interface StatisticCard {
  id: string
  title: string
  value: number
  currency: string
  type: 'account' | 'income' | 'profit'
}

export interface Statistics {
  period: string
  cards: StatisticCard[]
}

export interface Transaction {
  id: string
  merchant: string
  amount: number
  currency: string
  category: string
  icon: string
  color: string
  date: string
}

export interface RecentTransactions {
  period: string
  transactions: Transaction[]
}

export interface AnalysisSummary {
  earnings: {
    label: string
    value: number
    currency: string
  }
  expenses: {
    label: string
    value: number
    currency: string
  }
}

export interface CategoryBreakdown {
  id: string
  label: string
  percentage: number
  icon: string
  color: string
}

export interface Analysis {
  period: string
  summary: AnalysisSummary
  breakdown: CategoryBreakdown[]
}

export interface ApiResponse {
  record: {
    dashboard: {
      balance: DashboardBalance
      statistics: Statistics
      recentTransactions: RecentTransactions
      analysis: Analysis
    }
    metadata?: {
      id: string
      private: boolean
      createdAt: string
    }
  }
}

export interface TransformedDashboardData {
  saldoTotal: number
  rendimento: number
  estatisticas: Array<{
    id: string
    titulo: string
    valor: number
  }>
  transacoes: Array<{
    id: string
    nome: string
    categoria: string
    valor: number
    cor?: string
  }>
  analise: {
    ganhos: number
    saidas: number
    categorias: Array<{
      nome: string
      percentual: number
      cor?: string
    }>
  }
}

export interface ApiError {
  code?: string
  message: string
  response?: {
    status: number
    data?: any
  }
  request?: any
}

