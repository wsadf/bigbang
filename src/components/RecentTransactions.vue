<template>
  <section class="recent-transactions card-container" aria-labelledby="transactions-title">
    <SectionHeader
      :icon="boxIcon"
      icon-alt="Ícone de transações"
      title="Transações recentes"
      title-id="transactions-title"
      time-period="últimos 7 dias"
      see-all-label="Ver todas as transações"
    />
    <ul class="transactions-list scrollable-list" role="list" aria-label="Lista de transações recentes">
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
import SectionHeader from './shared/SectionHeader.vue'
import boxIcon from '@/assets/icons/box-2.svg'

export default {
  name: 'RecentTransactions',
  components: {
    TransactionItem,
    SectionHeader
  },
  props: {
    transactions: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      boxIcon
    }
  }
}
</script>

<style scoped>
.recent-transactions {
  /* Estilos herdados de .card-container */
}
</style>

