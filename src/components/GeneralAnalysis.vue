<template>
  <section class="general-analysis card-container" aria-labelledby="analysis-title">
    <SectionHeader
      :icon="storyIcon"
      icon-alt="Ícone de análise"
      title="Análise geral"
      title-id="analysis-title"
      time-period="últimos 7 dias"
      see-all-label="Ver análise completa"
    />
    <div class="analysis-content">
      <div class="summary-row" role="group" aria-label="Resumo financeiro">
        <div class="summary-item">
          <span class="summary-label">Ganhos</span>
          <span class="summary-value" :aria-label="`Ganhos: ${formatCurrency(analysis.ganhos)}`">
            {{ formatCurrency(analysis.ganhos) }}
          </span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Saídas</span>
          <span class="summary-value" :aria-label="`Saídas: ${formatCurrency(analysis.saidas)}`">
            {{ formatCurrency(analysis.saidas) }}
          </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="categories-list" role="list" aria-label="Breakdown por categoria">
        <CategoryItem
          v-for="category in analysis.categorias"
          :key="category.nome"
          :category="category"
        />
        <p v-if="!analysis.categorias || analysis.categorias.length === 0" class="empty-state" aria-live="polite">
          Nenhuma categoria encontrada
        </p>
      </div>
    </div>
  </section>
</template>

<script>
/**
 * Componente de análise geral
 * Exibe resumo de ganhos, saídas e breakdown por categoria
 */
import { formatCurrency } from '../services/api'
import CategoryItem from './CategoryItem.vue'
import SectionHeader from './shared/SectionHeader.vue'
import storyIcon from '@/assets/icons/story.svg'

export default {
  name: 'GeneralAnalysis',
  components: {
    CategoryItem,
    SectionHeader
  },
  data() {
    return {
      storyIcon
    }
  },
  props: {
    analysis: {
      type: Object,
      required: true,
      default: () => ({
        ganhos: 0,
        saidas: 0,
        categorias: []
      })
    }
  },
  methods: {
    formatCurrency
  }
}
</script>

<style scoped>
.general-analysis {
  /* Estilos herdados de .card-container */
}

.analysis-content {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  overflow: visible;
  min-height: 0;
  padding: 15px 1.25rem 1.25rem 1.25rem;
}

.divider {
  margin: 0.125rem 0 0.25rem 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 0.125rem 0;
  flex-shrink: 0;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 0 0 auto;
}

.summary-label {
  font-size: 0.85rem;
  color: #000;
  font-weight: 400;
  line-height: 1.2;
}

.summary-value {
  font-size: 1.35rem;
  font-weight: 700;
  color: #000;
  line-height: 1.2;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.empty-state {
  padding: 1rem;
}

/* ============================================
   RESPONSIVE - TABLET (até 1024px)
   ============================================ */
@media (max-width: 1024px) {
  .summary-value {
    font-size: 1.35rem;
  }
}

/* ============================================
   RESPONSIVE - MOBILE (até 768px)
   ============================================ */
@media (max-width: 768px) {

  .summary-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem 0;
  }

  .summary-item {
    width: 100%;
  }

  .summary-value {
    font-size: 1.35rem;
  }

  .divider {
    margin: 0.75rem 0;
  }

  .categories-list {
    gap: 1rem;
    padding-top: 1.25rem;
  }
}

/* ============================================
   RESPONSIVE - MOBILE PEQUENO (até 480px)
   ============================================ */
@media (max-width: 480px) {

  .summary-row {
    padding: 1rem 0;
    gap: 0.75rem;
  }

  .summary-label {
    font-size: 0.85rem;
  }

  .summary-value {
    font-size: 1.25rem;
  }

  .divider {
    margin: 0.5rem 0;
  }

  .categories-list {
    gap: 0.75rem;
    padding-top: 1rem;
  }
}
</style>

