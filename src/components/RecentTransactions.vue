<template>
  <section class="recent-transactions" aria-labelledby="transactions-title">
    <div class="section-header">
      <div class="header-left">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
          <line x1="12" y1="12" x2="19" y2="12"></line>
          <line x1="5" y1="12" x2="12" y2="12"></line>
        </svg>
        <h3 id="transactions-title">Transações recentes</h3>
      </div>
      <div class="header-right">
        <span class="time-period" aria-label="Período: últimos 7 dias">últimos 7 dias</span>
        <a href="#" class="see-all-link" aria-label="Ver todas as transações">Ver tudo</a>
      </div>
    </div>
    <ul class="transactions-list" role="list" aria-label="Lista de transações recentes">
      <li v-for="transaction in transactions" :key="transaction.id" role="listitem">
        <TransactionItem :transaction="transaction" />
      </li>
      <li v-if="transactions.length === 0" role="listitem">
        <p class="empty-state" aria-live="polite">
          Nenhuma transação encontrada
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
/**
 * Componente de lista de transações recentes
 * Exibe as últimas transações do usuário
 */
import TransactionItem from './TransactionItem.vue'

export default {
  name: 'RecentTransactions',
  components: {
    TransactionItem
  },
  props: {
    transactions: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.recent-transactions {
  background: white;
  border-radius: 0;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
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
  color: #1a1a1a;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.time-period {
  color: #999;
  font-size: 0.9rem;
}

.see-all-link {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.see-all-link:hover {
  color: #2563eb;
  text-decoration: underline;
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 2rem;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .recent-transactions {
    padding: 1.25rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }
}
</style>

