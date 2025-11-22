<template>
  <main class="dashboard" role="main" aria-label="Dashboard financeiro">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container" role="status" aria-live="polite" aria-label="Carregando dados">
      <div class="loading-spinner" aria-hidden="true"></div>
      <p>Carregando dados...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container" role="alert" aria-live="assertive">
      <h2>Erro ao carregar dados</h2>
      <p>{{ error }}</p>
      <button @click="loadData" class="retry-button" aria-label="Tentar carregar dados novamente">
        Tentar novamente
      </button>
    </div>

    <!-- Dashboard Content -->
    <div v-else-if="dashboardData" class="dashboard-content">
      <Header />
      <BalanceSection 
        :balance="dashboardData.saldoTotal || 0" 
        :yield="dashboardData.rendimento || 0" 
      />
      <StatisticsPanel 
        :statistics="dashboardData.estatisticas || []" 
      />
      <div class="bottom-section">
        <RecentTransactions 
          :transactions="dashboardData.transacoes || []" 
        />
        <GeneralAnalysis 
          :analysis="dashboardData.analise || { ganhos: 0, saidas: 0, categorias: [] }" 
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Componente principal do Dashboard Financeiro
 * Gerencia o estado de loading, erro e exibição dos dados
 */
import { fetchDashboardData } from '../services/api'
import Header from './Header.vue'
import BalanceSection from './BalanceSection.vue'
import StatisticsPanel from './StatisticsPanel.vue'
import RecentTransactions from './RecentTransactions.vue'
import GeneralAnalysis from './GeneralAnalysis.vue'

export default {
  name: 'Dashboard',
  components: {
    Header,
    BalanceSection,
    StatisticsPanel,
    RecentTransactions,
    GeneralAnalysis
  },
  data() {
    return {
      dashboardData: null, // Dados do dashboard vindos da API
      loading: true, // Estado de carregamento
      error: null // Mensagem de erro, se houver
    }
  },
  /**
   * Lifecycle hook: Carrega os dados quando o componente é montado
   */
  async mounted() {
    await this.loadData()
  },
  methods: {
    /**
     * Carrega os dados do dashboard da API
     * Gerencia estados de loading e erro
     */
    async loadData() {
      this.loading = true
      this.error = null
      
      try {
        this.dashboardData = await fetchDashboardData()
      } catch (err) {
        this.error = err.message || 'Erro desconhecido ao carregar dados'
        console.error('Erro ao carregar dados:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f5f5f5;
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #8b5cf6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container h2 {
  color: #ef4444;
  margin-bottom: 1rem;
}

.error-container p {
  color: #666;
  margin-bottom: 1.5rem;
}

.retry-button {
  padding: 0.75rem 1.5rem;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.retry-button:hover {
  background: #7c3aed;
}

.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
}

.bottom-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

@media (max-width: 768px) {
  .bottom-section {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
</style>

