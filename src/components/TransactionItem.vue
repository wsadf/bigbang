<template>
  <div class="transaction-item">
    <div class="transaction-icon" :style="{ backgroundColor: transaction.cor || getIconColor(transaction.categoria) }">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      </svg>
    </div>
    <div class="transaction-info">
      <div class="transaction-name">{{ transaction.nome }}</div>
      <div class="transaction-category">{{ transaction.categoria }}</div>
    </div>
    <div class="transaction-amount">{{ formatCurrency(transaction.valor) }}</div>
  </div>
</template>

<script>
import { formatCurrency } from '../services/api'

export default {
  name: 'TransactionItem',
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatCurrency,
    getIconColor(category) {
      const colors = {
        'Compras': '#fbbf24',
        'Boletos': '#ef4444',
        'Investimentos': '#8b5cf6',
        'Outros': '#3b82f6'
      }
      return colors[category] || '#6b7280'
    }
  }
}
</script>

<style scoped>
.transaction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  transition: background 0.3s;
}

.transaction-item:hover {
  background: #f9fafb;
}

.transaction-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.transaction-info {
  flex: 1;
}

.transaction-name {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.transaction-category {
  font-size: 0.85rem;
  color: #666;
}

.transaction-amount {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .transaction-item {
    padding: 0.75rem;
  }

  .transaction-icon {
    width: 40px;
    height: 40px;
  }

  .transaction-amount {
    font-size: 1rem;
  }
}
</style>

