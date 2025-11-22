<template>
  <section class="general-analysis" aria-labelledby="analysis-title">
    <div class="section-header">
      <div class="header-left">
        <img 
          src="@/assets/icons/story.svg" 
          alt="Ícone de análise" 
          class="analysis-icon"
          width="20"
          height="20"
          aria-hidden="true"
        />
        <h3 id="analysis-title">Análise geral</h3>
      </div>
      <div class="header-right">
        <span class="time-period" aria-label="Período: últimos 7 dias">últimos 7 dias</span>
        <a href="#" class="see-all-link" aria-label="Ver análise completa">Ver tudo</a>
      </div>
    </div>
    <div class="analysis-content">
      <div class="divider"></div>
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

export default {
  name: 'GeneralAnalysis',
  components: {
    CategoryItem
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

.analysis-icon {
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

.analysis-content {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.divider {
  width: 100%;
  height: 1px;
  background: #e5e7eb;
  margin: 1rem 0;
}

.summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-label {
  font-size: 0.9rem;
  color: #000;
  font-weight: 400;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 1rem;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .general-analysis {
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

  .summary-row {
    grid-template-columns: 1fr;
  }
}
</style>

