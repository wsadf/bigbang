/**
 * Testes unitários para o serviço de API
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { fetchDashboardData, formatCurrency, formatPercentage } from '../api'

// Mock do axios
vi.mock('axios')

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchDashboardData', () => {
    it('deve buscar e transformar dados da API corretamente', async () => {
      const mockApiResponse = {
        data: {
          record: {
            dashboard: {
              balance: {
                total: 304.78,
                yield: { percentage: 124 }
              },
              statistics: {
                cards: [
                  { id: 'conta-pj', title: 'Conta PJ', value: 39882 }
                ]
              },
              recentTransactions: {
                transactions: [
                  { id: '1', merchant: 'Teste', amount: 10.98, category: 'mercado', color: '#FFF' }
                ]
              },
              analysis: {
                summary: {
                  earnings: { value: 2789.21 },
                  expenses: { value: 1278.47 }
                },
                breakdown: [
                  { label: 'Compras', percentage: 62, color: '#FF6B6B' }
                ]
              }
            }
          }
        }
      }

      axios.get.mockResolvedValue(mockApiResponse)

      const result = await fetchDashboardData()

      expect(result).toHaveProperty('saldoTotal', 304.78)
      expect(result).toHaveProperty('rendimento', 124)
      expect(result.estatisticas).toHaveLength(1)
      expect(result.transacoes).toHaveLength(1)
      expect(result.analise.ganhos).toBe(2789.21)
    })

    it('deve tratar erro 404 corretamente', async () => {
      axios.get.mockRejectedValue({
        response: { status: 404 }
      })

      await expect(fetchDashboardData()).rejects.toThrow('API não encontrada (404)')
    })

    it('deve tratar erro 500 corretamente', async () => {
      axios.get.mockRejectedValue({
        response: { status: 500 }
      })

      await expect(fetchDashboardData()).rejects.toThrow('Erro interno do servidor (500)')
    })

    it('deve tratar timeout corretamente', async () => {
      axios.get.mockRejectedValue({
        code: 'ECONNABORTED'
      })

      await expect(fetchDashboardData()).rejects.toThrow('Timeout: A requisição demorou muito')
    })

    it('deve tratar erro de conexão corretamente', async () => {
      axios.get.mockRejectedValue({
        request: {}
      })

      await expect(fetchDashboardData()).rejects.toThrow('Erro de conexão')
    })
  })

  describe('formatCurrency', () => {
    it('deve formatar valores em Real brasileiro', () => {
      expect(formatCurrency(1000)).toBe('R$ 1.000,00')
      expect(formatCurrency(304.78)).toBe('R$ 304,78')
      expect(formatCurrency(0)).toBe('R$ 0,00')
    })
  })

  describe('formatPercentage', () => {
    it('deve formatar percentuais corretamente', () => {
      expect(formatPercentage(124)).toBe('124%')
      expect(formatPercentage(62.5)).toBe('63%')
      expect(formatPercentage(0)).toBe('0%')
    })
  })
})

