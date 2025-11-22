<template>
  <section class="balance-section" aria-labelledby="balance-title">
    <div class="balance-content">
      <div class="balance-info">
        <h2 id="balance-title" class="balance-label">Saldo total</h2>
        <div class="balance-value" aria-label="Saldo total: {{ formatCurrency(balance) }}">
          {{ formatCurrency(balance) }}
        </div>
        <div class="yield-info" aria-label="Rendimento de {{ formatPercentage(yield) }}">
          <img 
            src="@/assets/icons/ray.svg" 
            alt="Ícone de raio" 
            class="yield-icon"
            width="20"
            height="20"
            aria-hidden="true"
          />
          <span>rendendo {{ formatPercentage(yield) }}</span>
        </div>
      </div>
      <div class="balance-actions" role="group" aria-label="Ações do saldo">
        <button 
          class="action-button primary" 
          aria-label="Enviar dinheiro"
          @keydown.enter.prevent="handleSendMoney"
          @keydown.space.prevent="handleSendMoney"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          Enviar dinheiro
        </button>
        <button 
          class="action-button secondary" 
          aria-label="Adicionar transação"
          @keydown.enter.prevent="handleAdd"
          @keydown.space.prevent="handleAdd"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * Componente de exibição do saldo total e rendimento
 * Mostra o saldo formatado e botões de ação
 */
import { formatCurrency, formatPercentage } from '../services/api'

export default {
  name: 'BalanceSection',
  props: {
    balance: {
      type: Number,
      required: true,
      default: 0
    },
    yield: {
      type: Number,
      required: true,
      default: 0
    }
  },
  methods: {
    formatCurrency,
    formatPercentage,
    /**
     * Handler para o botão de enviar dinheiro
     * TODO: Implementar funcionalidade
     */
    handleSendMoney() {
      // Implementar funcionalidade de enviar dinheiro
      console.log('Enviar dinheiro')
    },
    /**
     * Handler para o botão de adicionar
     * TODO: Implementar funcionalidade
     */
    handleAdd() {
      // Implementar funcionalidade de adicionar
      console.log('Adicionar')
    }
  }
}
</script>

<style scoped>
.balance-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 3rem 2rem;
  color: white;
}

.balance-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.balance-info {
  flex: 1;
}

.balance-label {
  font-size: 0.9rem;
  color: white;
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.balance-value {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.yield-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1rem;
}

.yield-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
}

.balance-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.action-button.primary {
  background: #a78bfa;
  color: white;
  border-radius: 8px;
}

.action-button.primary:hover {
  background: #8b5cf6;
  transform: translateY(-2px);
}

.action-button.secondary {
  background: #a78bfa;
  color: white;
  padding: 0.875rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.action-button.secondary:hover {
  background: #8b5cf6;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .balance-section {
    padding: 2rem 1rem;
  }

  .balance-value {
    font-size: 2rem;
  }

  .balance-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .balance-actions {
    width: 100%;
  }

  .action-button {
    flex: 1;
    justify-content: center;
  }
}
</style>

