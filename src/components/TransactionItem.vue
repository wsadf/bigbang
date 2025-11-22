<template>
  <div class="transaction-item">
    <div 
      class="transaction-icon" 
      :style="{ 
        backgroundColor: transaction.cor || getIconColor(transaction.categoria),
        borderColor: getBorderColor(transaction.cor || getIconColor(transaction.categoria))
      }"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    </div>
    <div class="transaction-name">{{ transaction.nome }}</div>
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
    },
    getBorderColor(color) {
      // Cria uma versão mais clara da cor para a borda
      if (!color) return '#e5e7eb'
      // Se for uma cor hex, adiciona opacidade ou clareia
      return color + '80' // Adiciona 50% de opacidade
    }
  }
}
</script>

<style scoped>
.transaction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e7eb;
  position: relative;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.transaction-name {
  flex: 1;
  font-weight: 400;
  color: #000;
  font-size: 1rem;
}

.transaction-amount {
  font-weight: 400;
  color: #000;
  font-size: 1rem;
  flex-shrink: 0;
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

