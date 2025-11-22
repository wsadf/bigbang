<template>
  <article 
    class="statistic-card" 
    :class="{ 'highlighted': isHighlighted }"
    :aria-labelledby="`stat-${id}`"
  >
    <h4 :id="`stat-${id}`" class="card-title">{{ title }}</h4>
    <div class="card-value" :aria-label="`${title}: ${formatCurrency(value)}`">
      {{ formatCurrency(value) }}
    </div>
    <div class="card-actions">
      <button 
        class="details-button"
        :aria-label="`Ver mais detalhes de ${title}`"
        @keydown.enter.prevent="handleDetails"
        @keydown.space.prevent="handleDetails"
      >
        Ver mais detalhes
      </button>
      <button 
        class="menu-button" 
        :aria-label="`Menu de opções para ${title}`"
        @keydown.enter.prevent="handleMenu"
        @keydown.space.prevent="handleMenu"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
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
    },
    highlighted: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isHighlighted() {
      return this.highlighted || this.id === 'recebimentos'
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
  border-radius: 0;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  border: 2px solid transparent;
  transition: box-shadow 0.3s;
}

.statistic-card.highlighted {
  border-color: #3b82f6;
}

.card-title {
  font-size: 0.9rem;
  color: #000;
  font-weight: 500;
  margin: 0 0 1rem 0;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 auto 0;
  flex-grow: 1;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.details-button {
  background: transparent;
  border: 1px solid #999;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0;
  transition: all 0.3s;
  flex: 1;
}

.details-button:hover {
  border-color: #666;
  color: #333;
}

.menu-button {
  background: transparent;
  border: 1px solid #999;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  transition: all 0.3s;
  flex-shrink: 0;
}

.menu-button:hover {
  border-color: #666;
  color: #333;
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

