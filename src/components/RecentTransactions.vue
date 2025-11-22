<template>
  <section class="recent-transactions" aria-labelledby="transactions-title">
    <div class="section-header">
      <div class="header-left">
        <img 
          src="@/assets/icons/box-2.svg" 
          alt="Ícone de transações" 
          class="transactions-icon"
          width="20"
          height="20"
          aria-hidden="true"
        />
        <h3 id="transactions-title">Transações recentes</h3>
        <span class="time-period" aria-label="Período: últimos 7 dias">últimos 7 dias</span>
      </div>
      <div class="header-right">
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
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 479px;
  height: 307px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex-shrink: 0;
}

.header-right {
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.header-left .time-period {
  margin-left: 0.5rem;
}

.transactions-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
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
  color: #7986FE;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s;
}

.see-all-link:hover {
  color: #6b78ee;
  text-decoration: underline;
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 2rem;
  font-size: 0.95rem;
}

/* Tablet */
@media (max-width: 1024px) {
  .recent-transactions {
    padding: 1.35rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .recent-transactions {
    padding: 1.25rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .header-left {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .header-left h3 {
    font-size: 1.1rem;
  }

  .header-left .time-period {
    margin-left: 0;
    font-size: 0.85rem;
  }

  .header-right {
    width: 100%;
    justify-content: flex-start;
  }

  .see-all-link {
    font-size: 0.85rem;
  }
}

/* Mobile pequeno */
@media (max-width: 480px) {
  .recent-transactions {
    padding: 1rem 0.75rem;
  }

  .section-header {
    margin-bottom: 1rem;
  }

  .header-left h3 {
    font-size: 1rem;
  }

  .transactions-icon {
    width: 18px;
    height: 18px;
  }

  .see-all-link {
    font-size: 0.8rem;
  }
}
</style>

