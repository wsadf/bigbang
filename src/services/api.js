/**
 * Serviço de API para o Dashboard Financeiro
 * Gerencia todas as requisições HTTP usando Axios
 */

import axios from 'axios'

// URL base da API
const API_URL = 'https://api.jsonbin.io/v3/b/691b5807d0ea881f40ee8674'

/**
 * Instância configurada do Axios
 * - Timeout de 10 segundos para evitar requisições infinitas
 * - Headers padrão para JSON
 */
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Busca dados do dashboard
 */
export async function fetchDashboardData() {
  try {
    const { data } = await api.get('')
    const dashboard = data.record?.dashboard || data.record || data
    
    return transformData(dashboard)
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout: A requisição demorou muito')
    }
    if (error.response) {
      const status = error.response.status
      if (status === 404) throw new Error('API não encontrada (404)')
      if (status === 500) throw new Error('Erro interno do servidor (500)')
      if (status === 401 || status === 403) throw new Error('Acesso não autorizado')
      throw new Error(`Erro na requisição: ${status}`)
    }
    if (error.request) {
      throw new Error('Erro de conexão. Verifique sua internet.')
    }
    throw new Error('Erro desconhecido ao carregar dados')
  }
}

/**
 * Transforma dados da API para o formato do dashboard
 */
function transformData(apiData) {
  // Se já estiver no formato esperado, retorna como está
  if (apiData.saldoTotal !== undefined) {
    return apiData
  }

  return {
    saldoTotal: apiData.balance?.total || 0,
    rendimento: apiData.balance?.yield?.percentage || 0,
    estatisticas: (apiData.statistics?.cards || []).map(card => ({
      id: card.id,
      titulo: card.title,
      valor: card.value
    })),
    transacoes: (apiData.recentTransactions?.transactions || []).map(txn => ({
      id: txn.id,
      nome: txn.merchant,
      categoria: mapCategory(txn.category),
      valor: txn.amount,
      cor: txn.color
    })),
    analise: {
      ganhos: apiData.analysis?.summary?.earnings?.value || 0,
      saidas: apiData.analysis?.summary?.expenses?.value || 0,
      categorias: (apiData.analysis?.breakdown || []).map(cat => ({
        nome: cat.label,
        percentual: cat.percentage,
        cor: cat.color
      }))
    }
  }
}

/**
 * Mapeia categorias da API
 */
function mapCategory(category) {
  const map = {
    mercado: 'Compras',
    restaurante: 'Compras',
    farmacia: 'Compras',
    academia: 'Compras',
    compras_online: 'Compras',
    compras: 'Compras',
    boletos: 'Boletos',
    investimentos: 'Investimentos'
  }
  return map[category] || 'Outros'
}

/**
 * Formata valor para Real brasileiro
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

/**
 * Formata percentual
 */
export function formatPercentage(value) {
  return `${value.toFixed(0)}%`
}
