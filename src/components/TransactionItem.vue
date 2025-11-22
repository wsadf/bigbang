<template>
  <div class="transaction-item">
    <div 
      class="transaction-icon" 
      :style="{ 
        backgroundColor: transactionBackgroundColor,
        borderColor: transactionBorderColor
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
    getTransactionColor() {
      // Cores específicas por nome de transação
      const specificColors = {
        'Mercadinho da Cidade': '#FDFF9D',
        'Tenda Nostra': '#FF9D9D',
        'Farmácia Um': '#C8FF9D',
        'Academia Body': '#AB9DFF',
        'ShopOnline': '#FF9DEF'
      }
      
      // Se houver cor específica para esta transação, usa ela
      if (specificColors[this.transaction.nome]) {
        return specificColors[this.transaction.nome]
      }
      
      // Caso contrário, usa a cor da API ou a cor padrão da categoria
      return this.transaction.cor || this.getIconColor(this.transaction.categoria)
    },
    getBorderColor(color) {
      // Cria uma versão mais clara da cor para a borda
      if (!color) return '#e5e7eb'
      
      // Cores específicas para bordas
      const specificBorderColors = {
        '#FDFF9D': '#fef9c3', // amarelo claro para Mercadinho da Cidade
        '#FF9D9D': '#ffd4d4', // rosa claro para Tenda Nostra
        '#C8FF9D': '#e6ffd4', // verde claro para Farmácia Um
        '#AB9DFF': '#e0d9ff', // roxo claro para Academia Body
        '#FF9DEF': '#ffd4f7'  // rosa claro para ShopOnline
      }
      
      if (specificBorderColors[color]) {
        return specificBorderColors[color]
      }
      
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
  },
  computed: {
    transactionBackgroundColor() {
      return this.getTransactionColor()
    },
    transactionBorderColor() {
      return this.getBorderColor(this.transactionBackgroundColor)
    }
  }
}
</script>

<style scoped>
.transaction-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0;
  border-bottom: 1px solid #B3B3B3;
  position: relative;
  height: 50px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.transaction-item:last-child {
  border-bottom: 1px solid #B3B3B3;
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

/* Tablet */
@media (max-width: 1024px) {
  .transaction-item {
    padding: 0.9rem 0;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .transaction-item {
    padding: 0.75rem 0;
    gap: 0.75rem;
  }

  .transaction-icon {
    width: 40px;
    height: 40px;
  }

  .shop-icon {
    width: 18px;
    height: 18px;
  }

  .transaction-name {
    font-size: 0.95rem;
  }

  .transaction-amount {
    font-size: 0.95rem;
  }
}

/* Mobile pequeno */
@media (max-width: 480px) {
  .transaction-item {
    padding: 0.65rem 0;
    gap: 0.65rem;
  }

  .transaction-icon {
    width: 36px;
    height: 36px;
  }

  .shop-icon {
    width: 16px;
    height: 16px;
  }

  .transaction-name {
    font-size: 0.9rem;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .transaction-amount {
    font-size: 0.9rem;
  }
}
</style>

