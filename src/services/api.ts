/**
 * Serviço de API para o Dashboard Financeiro
 * Gerencia todas as requisições HTTP usando Axios
 * 
 * Features:
 * - Tratamento completo de erros (404, 500, timeout, network)
 * - Retry automático com backoff exponencial
 * - Validação de dados
 * - TypeScript para type safety
 */

import axios, { AxiosError, AxiosInstance } from 'axios'
import type {
  ApiResponse,
  TransformedDashboardData,
  ApiError
} from '@/types/api'

// URL base da API
const API_URL = 'https://api.jsonbin.io/v3/b/691b5807d0ea881f40ee8674'

// Configuração de retry
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 segundo base
const TIMEOUT = 10000 // 10 segundos

/**
 * Instância configurada do Axios
 * - Timeout configurável
 * - Headers padrão para JSON
 * - Interceptors para tratamento de erros
 */
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Aguarda um tempo antes de retry
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Trata erros da API de forma detalhada
 */
function handleApiError(error: unknown): never {
  const axiosError = error as AxiosError

  // Timeout
  if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
    throw new Error('Timeout: A requisição demorou muito para responder. Tente novamente.')
  }

  // Erro de resposta (servidor respondeu com erro)
  if (axiosError.response) {
    const status = axiosError.response.status
    const statusText = axiosError.response.statusText

    switch (status) {
      case 400:
        throw new Error('Requisição inválida (400). Verifique os dados enviados.')
      case 401:
        throw new Error('Acesso não autorizado (401). Verifique suas credenciais.')
      case 403:
        throw new Error('Acesso proibido (403). Você não tem permissão para acessar este recurso.')
      case 404:
        throw new Error('API não encontrada (404). O endpoint solicitado não existe.')
      case 408:
        throw new Error('Timeout da requisição (408). O servidor demorou muito para processar.')
      case 429:
        throw new Error('Muitas requisições (429). Aguarde um momento antes de tentar novamente.')
      case 500:
        throw new Error('Erro interno do servidor (500). Tente novamente mais tarde.')
      case 502:
        throw new Error('Bad Gateway (502). O servidor está temporariamente indisponível.')
      case 503:
        throw new Error('Serviço indisponível (503). O servidor está em manutenção.')
      case 504:
        throw new Error('Gateway Timeout (504). O servidor demorou muito para responder.')
      default:
        throw new Error(`Erro na requisição: ${status} ${statusText}`)
    }
  }

  // Erro de rede (sem resposta do servidor)
  if (axiosError.request) {
    throw new Error('Erro de conexão. Verifique sua conexão com a internet e tente novamente.')
  }

  // Erro desconhecido
  throw new Error('Erro desconhecido ao carregar dados. Tente novamente.')
}

/**
 * Retry automático com backoff exponencial
 */
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES
): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    const axiosError = error as AxiosError

    // Não faz retry para erros 4xx (exceto 408, 429)
    if (axiosError.response) {
      const status = axiosError.response.status
      if (status >= 400 && status < 500 && ![408, 429].includes(status)) {
        throw error
      }
    }

    // Não faz retry se não houver mais tentativas
    if (retries <= 0) {
      throw error
    }

    // Aguarda antes de retry (backoff exponencial)
    const delayMs = RETRY_DELAY * Math.pow(2, MAX_RETRIES - retries)
    await delay(delayMs)

    // Tenta novamente
    return fetchWithRetry(fn, retries - 1)
  }
}

/**
 * Valida dados transformados
 */
function validateTransformedData(data: any): data is TransformedDashboardData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.saldoTotal === 'number' &&
    typeof data.rendimento === 'number' &&
    Array.isArray(data.estatisticas) &&
    Array.isArray(data.transacoes) &&
    typeof data.analise === 'object' &&
    typeof data.analise.ganhos === 'number' &&
    typeof data.analise.saidas === 'number' &&
    Array.isArray(data.analise.categorias)
  )
}

/**
 * Mapeia categorias da API
 */
function mapCategory(category: string): string {
  const map: Record<string, string> = {
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
 * Transforma dados da API para o formato do dashboard
 */
function transformData(apiData: any): TransformedDashboardData {
  // Se já estiver no formato esperado, valida e retorna
  if (apiData.saldoTotal !== undefined) {
    if (validateTransformedData(apiData)) {
      return apiData
    }
    throw new Error('Dados em formato inválido')
  }

  // Transforma do formato da API
  const transformed: TransformedDashboardData = {
    saldoTotal: apiData.balance?.total ?? 0,
    rendimento: apiData.balance?.yield?.percentage ?? 0,
    estatisticas: (apiData.statistics?.cards || []).map((card: any) => ({
      id: card.id || '',
      titulo: card.title || '',
      valor: card.value ?? 0
    })),
    transacoes: (apiData.recentTransactions?.transactions || []).map((txn: any) => ({
      id: txn.id || '',
      nome: txn.merchant || '',
      categoria: mapCategory(txn.category || ''),
      valor: txn.amount ?? 0,
      cor: txn.color
    })),
    analise: {
      ganhos: apiData.analysis?.summary?.earnings?.value ?? 0,
      saidas: apiData.analysis?.summary?.expenses?.value ?? 0,
      categorias: (apiData.analysis?.breakdown || []).map((cat: any) => ({
        nome: cat.label || '',
        percentual: cat.percentage ?? 0,
        cor: cat.color
      }))
    }
  }

  if (!validateTransformedData(transformed)) {
    throw new Error('Falha na validação dos dados transformados')
  }

  return transformed
}

/**
 * Busca dados do dashboard com retry automático
 * 
 * @throws {Error} Erro detalhado em caso de falha
 * @returns {Promise<TransformedDashboardData>} Dados do dashboard transformados
 */
export async function fetchDashboardData(): Promise<TransformedDashboardData> {
  return fetchWithRetry(async () => {
    try {
      const { data } = await api.get<ApiResponse>('')
      const dashboard = data.record?.dashboard || data.record || data

      if (!dashboard) {
        throw new Error('Resposta da API está vazia')
      }

      return transformData(dashboard)
    } catch (error) {
      handleApiError(error)
    }
  })
}

/**
 * Formata valor para Real brasileiro
 * 
 * @param {number} value - Valor numérico a ser formatado
 * @returns {string} Valor formatado como moeda brasileira
 */
export function formatCurrency(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'R$ 0,00'
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

/**
 * Formata percentual
 * 
 * @param {number} value - Valor numérico a ser formatado
 * @returns {string} Percentual formatado
 */
export function formatPercentage(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%'
  }

  return `${Math.round(value)}%`
}

