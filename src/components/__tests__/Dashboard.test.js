/**
 * Testes unitários para o componente Dashboard
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Dashboard from '../Dashboard.vue'
import * as api from '../../services/api'

// Mock do serviço de API
vi.mock('../../services/api', () => ({
  fetchDashboardData: vi.fn()
}))

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deve exibir loading inicialmente', () => {
    api.fetchDashboardData.mockImplementation(() => new Promise(() => {}))
    
    const wrapper = mount(Dashboard)
    
    expect(wrapper.find('.loading-container').exists()).toBe(true)
    expect(wrapper.text()).toContain('Carregando dados')
  })

  it('deve exibir dados após carregamento bem-sucedido', async () => {
    const mockData = {
      saldoTotal: 304.78,
      rendimento: 124,
      estatisticas: [],
      transacoes: [],
      analise: { ganhos: 0, saidas: 0, categorias: [] }
    }

    api.fetchDashboardData.mockResolvedValue(mockData)
    
    const wrapper = mount(Dashboard)
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(wrapper.find('.dashboard-content').exists()).toBe(true)
  })

  it('deve exibir erro quando a API falha', async () => {
    api.fetchDashboardData.mockRejectedValue(new Error('Erro de conexão'))
    
    const wrapper = mount(Dashboard)
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(wrapper.find('.error-container').exists()).toBe(true)
    expect(wrapper.text()).toContain('Erro ao carregar dados')
  })

  it('deve permitir tentar novamente após erro', async () => {
    api.fetchDashboardData
      .mockRejectedValueOnce(new Error('Erro'))
      .mockResolvedValueOnce({ saldoTotal: 100, rendimento: 10, estatisticas: [], transacoes: [], analise: { ganhos: 0, saidas: 0, categorias: [] } })
    
    const wrapper = mount(Dashboard)
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const retryButton = wrapper.find('.retry-button')
    await retryButton.trigger('click')
    
    await wrapper.vm.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 100))
    
    expect(api.fetchDashboardData).toHaveBeenCalledTimes(2)
  })
})

