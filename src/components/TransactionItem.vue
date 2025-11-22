<template>
  <div class="transaction-item">
    <div 
      class="transaction-icon" 
      :style="{ 
        backgroundColor: transaction.cor || getIconColor(transaction.categoria),
        borderColor: getBorderColor(transaction.cor || getIconColor(transaction.categoria))
      }"
    >
      <img 
        src="@/assets/icons/shop.svg" 
        alt="Ícone de loja" 
        class="shop-icon"
        width="20"
        height="20"
        aria-hidden="true"
      />
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
      // Mapeia cores para versões mais claras
      const lightColors = {
        '#fbbf24': '#fef3c7', // amarelo claro
        '#ef4444': '#fecaca', // vermelho claro
        '#8b5cf6': '#e9d5ff', // roxo claro
        '#3b82f6': '#dbeafe', // azul claro
        '#6b7280': '#e5e7eb'  // cinza claro
      }
      return lightColors[color] || color + '80'
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

.shop-icon {
  width: 20px;
  height: 20px;
  display: block;
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

