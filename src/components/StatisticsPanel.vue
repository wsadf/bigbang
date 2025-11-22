<template>
  <section class="statistics-panel">
    <div class="panel-content">
      <div class="panel-header">
        <div class="header-left">
          <img 
            src="@/assets/icons/bubble.svg" 
            alt="Ícone de painel" 
            class="panel-icon"
            width="20"
            height="20"
            aria-hidden="true"
          />
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
  background: transparent;
  padding: var(--spacing-xl);
}

.panel-content {
  max-width: 1400px;
  margin: 0 auto;
}

.panel-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  color: white;
  gap: 18px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.panel-icon {
  width: var(--icon-size-base);
  height: var(--icon-size-base);
  display: block;
  flex-shrink: 0;
}

.header-left h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  margin: 0;
}

.time-period {
  color: var(--text-muted);
  font-size: var(--font-size-sm);
}

.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  grid-column: 1 / -1;
  color: var(--text-muted);
}

/* Tablet */
@media (max-width: 1024px) {
  .statistics-panel {
    padding: 1.75rem 1.5rem;
  }

  .statistics-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .statistics-panel {
    padding: 1.5rem 1rem;
  }

  .statistics-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .panel-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .header-left h3 {
    font-size: 1.1rem;
  }

  .time-period {
    font-size: 0.85rem;
  }
}

/* Mobile pequeno */
@media (max-width: 480px) {
  .statistics-panel {
    padding: 1.25rem 0.75rem;
  }

  .panel-header {
    gap: 0.25rem;
  }

  .header-left h3 {
    font-size: 1rem;
  }

  .panel-icon {
    width: 18px;
    height: 18px;
  }
}
</style>

