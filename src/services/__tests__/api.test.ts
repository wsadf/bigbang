/**
 * Testes unitários para o serviço de API
 * Cobre tratamento de erros, retry, validação e formatação
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import { fetchDashboardData, formatCurrency, formatPercentage } from '../api'
import type { ApiResponse } from '@/types/api'

// Mock do axios
vi.mock('axios')
const mockedAxios = axios as any

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('fetchDashboardData', () => {
    it('deve buscar dados do dashboard com sucesso', async () => {
      const mockData: ApiResponse = {
        record: {
          dashboard: {
            balance: {
              total: 304.78,
              currency: 'BRL',
              yield: { percentage: 124, period: 'últimos 7 dias' }
            },
            statistics: {
              period: 'últimos 7 dias',
              cards: [
                { id: 'conta_pj', title: 'Conta PJ', value: 39882, currency: 'BRL', type: 'account' }
              ]
            },
            recentTransactions: {
              period: 'últimos 7 dias',
              transactions: []
            },
            analysis: {
              period: 'últimos 7 dias',
              summary: {
                earnings: { label: 'Ganhos', value: 2789.21, currency: 'BRL' },
                expenses: { label: 'Saídas', value: 1278.47, currency: 'BRL' }
              },
              breakdown: []
            }
          }
        }
      }

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockData })
      })

      const result = await fetchDashboardData()

      expect(result).toHaveProperty('saldoTotal')
      expect(result).toHaveProperty('rendimento')
      expect(result).toHaveProperty('estatisticas')
      expect(result).toHaveProperty('transacoes')
      expect(result).toHaveProperty('analise')
    })

    it('deve tratar erro 404 corretamente', async () => {
      const error = {
        response: { status: 404, statusText: 'Not Found' },
        code: 'ERR_BAD_REQUEST'
      }

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(error)
      })

      await expect(fetchDashboardData()).rejects.toThrow('API não encontrada (404)')
    })

    it('deve tratar erro 500 corretamente', async () => {
      const error = {
        response: { status: 500, statusText: 'Internal Server Error' },
        code: 'ERR_BAD_RESPONSE'
      }

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(error)
      })

      await expect(fetchDashboardData()).rejects.toThrow('Erro interno do servidor (500)')
    })

    it('deve tratar timeout corretamente', async () => {
      const error = {
        code: 'ECONNABORTED',
        message: 'timeout of 10000ms exceeded'
      }

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(error)
      })

      await expect(fetchDashboardData()).rejects.toThrow('Timeout')
    })

    it('deve tratar erro de conexão corretamente', async () => {
      const error = {
        request: {},
        code: 'ERR_NETWORK'
      }

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockRejectedValue(error)
      })

      await expect(fetchDashboardData()).rejects.toThrow('Erro de conexão')
    })

    it('deve tratar erro 429 (rate limit) e fazer retry', async () => {
      const error429 = {
        response: { status: 429, statusText: 'Too Many Requests' },
        code: 'ERR_BAD_RESPONSE'
      }

      const mockData: ApiResponse = {
        record: {
          dashboard: {
            balance: { total: 100, currency: 'BRL', yield: { percentage: 10, period: '7 dias' } },
            statistics: { period: '7 dias', cards: [] },
            recentTransactions: { period: '7 dias', transactions: [] },
            analysis: {
              period: '7 dias',
              summary: {
                earnings: { label: 'Ganhos', value: 0, currency: 'BRL' },
                expenses: { label: 'Saídas', value: 0, currency: 'BRL' }
              },
              breakdown: []
            }
          }
        }
      }

      const mockGet = vi.fn()
        .mockRejectedValueOnce(error429)
        .mockResolvedValueOnce({ data: mockData })

      mockedAxios.create.mockReturnValue({
        get: mockGet
      })

      // Usar vi.useFakeTimers para controlar delays
      vi.useFakeTimers()
      
      const promise = fetchDashboardData()
      await vi.runAllTimersAsync()
      const result = await promise

      expect(result).toBeDefined()
      vi.useRealTimers()
    })
  })

  describe('formatCurrency', () => {
    it('deve formatar valores corretamente', () => {
      expect(formatCurrency(1000)).toBe('R$ 1.000,00')
      expect(formatCurrency(304.78)).toBe('R$ 304,78')
      expect(formatCurrency(0)).toBe('R$ 0,00')
    })

    it('deve tratar valores inválidos', () => {
      expect(formatCurrency(NaN)).toBe('R$ 0,00')
      expect(formatCurrency(Infinity)).toBe('R$ 0,00')
    })
  })

  describe('formatPercentage', () => {
    it('deve formatar percentuais corretamente', () => {
      expect(formatPercentage(124)).toBe('124%')
      expect(formatPercentage(12.5)).toBe('13%')
      expect(formatPercentage(0)).toBe('0%')
    })

    it('deve tratar valores inválidos', () => {
      expect(formatPercentage(NaN)).toBe('0%')
      expect(formatPercentage(Infinity)).toBe('0%')
    })
  })
})

