<template>
  <article 
    class="statistic-card" 
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
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
  background: var(--bg-white);
  border-radius: 0;
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--transition-base);
  min-height: 180px;
}

.card-title {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  margin: 0 0 var(--spacing-lg) 0;
}

.card-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0 0 auto 0;
  flex-grow: 1;
  line-height: 1.2;
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
}

.details-button {
  background: transparent;
  border: 1px solid var(--border-color-dark);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: 0;
  transition: all var(--transition-base);
  flex: 1;
}

.details-button:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

.menu-button {
  background: transparent;
  border: 1px solid var(--border-color-dark);
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-sm);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.menu-button:hover {
  border-color: var(--text-secondary);
  color: var(--text-primary);
}

/* Tablet */
@media (max-width: 1024px) {
  .statistic-card {
    padding: 1.35rem;
  }

  .card-value {
    font-size: 1.85rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .statistic-card {
    padding: 1.25rem;
  }

  .card-title {
    font-size: 0.85rem;
  }

  .card-value {
    font-size: 1.75rem;
  }

  .details-button {
    font-size: 0.85rem;
    padding: 0.45rem 0.9rem;
  }

  .menu-button {
    width: 36px;
    height: 36px;
  }
}

/* Mobile pequeno */
@media (max-width: 480px) {
  .statistic-card {
    padding: 1rem;
  }

  .card-title {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }

  .card-value {
    font-size: 1.5rem;
  }

  .card-actions {
    margin-top: 0.75rem;
    gap: 0.4rem;
  }

  .details-button {
    font-size: 0.8rem;
    padding: 0.4rem 0.75rem;
  }

  .menu-button {
    width: 32px;
    height: 32px;
    padding: 0.4rem;
  }
}
</style>

