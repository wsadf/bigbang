<template>
  <section class="statistics-panel">
    <div class="panel-content">
      <div class="panel-header">
        <div class="header-left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"></path>
          </svg>
          <h3>Painel de estatísticas</h3>
        </div>
        <span class="time-period">últimos 7 dias</span>
      </div>
      <div class="statistics-grid">
        <StatisticCard
          v-for="stat in statistics"
          :key="stat.id"
          :title="stat.titulo"
          :value="stat.valor"
          :id="stat.id"
        />
        <p v-if="statistics.length === 0" class="empty-state">
          Nenhuma estatística disponível
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import StatisticCard from './StatisticCard.vue'

export default {
  name: 'StatisticsPanel',
  components: {
    StatisticCard
  },
  props: {
    statistics: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.statistics-panel {
  background: #1a1a1a;
  padding: 2rem;
}

.panel-content {
  max-width: 1400px;
  margin: 0 auto;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: white;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header-left h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.time-period {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  font-size: 0.95rem;
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .statistics-panel {
    padding: 1.5rem 1rem;
  }

  .statistics-grid {
    grid-template-columns: 1fr;
  }

  .panel-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

