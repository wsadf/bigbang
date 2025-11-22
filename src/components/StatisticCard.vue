<template>
  <article class="statistic-card" :aria-labelledby="`stat-${id}`">
    <div class="card-header">
      <h4 :id="`stat-${id}`" class="card-title">{{ title }}</h4>
      <button 
        class="menu-button" 
        :aria-label="`Menu de opções para ${title}`"
        @keydown.enter.prevent="handleMenu"
        @keydown.space.prevent="handleMenu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </button>
    </div>
    <div class="card-value" :aria-label="`${title}: ${formatCurrency(value)}`">
      {{ formatCurrency(value) }}
    </div>
    <button 
      class="details-button"
      :aria-label="`Ver mais detalhes de ${title}`"
      @keydown.enter.prevent="handleDetails"
      @keydown.space.prevent="handleDetails"
    >
      Ver mais detalhes
    </button>
  </article>
</template>

<script>
/**
 * Componente de card de estatística
 * Exibe título, valor formatado e botão de detalhes
 */
import { formatCurrency } from '../services/api'

export default {
  name: 'StatisticCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    formatCurrency,
    /**
     * Handler para o menu de opções
     * TODO: Implementar funcionalidade
     */
    handleMenu() {
      console.log('Menu:', this.id)
    },
    /**
     * Handler para ver detalhes
     * TODO: Implementar funcionalidade
     */
    handleDetails() {
      console.log('Detalhes:', this.id)
    }
  }
}
</script>

<style scoped>
.statistic-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.statistic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  margin: 0;
}

.menu-button {
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.3s;
}

.menu-button:hover {
  color: #333;
}

.card-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.details-button {
  background: transparent;
  border: none;
  color: #8b5cf6;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0;
  text-decoration: underline;
  transition: color 0.3s;
}

.details-button:hover {
  color: #7c3aed;
}

@media (max-width: 768px) {
  .statistic-card {
    padding: 1.25rem;
  }

  .card-value {
    font-size: 1.75rem;
  }
}
</style>

