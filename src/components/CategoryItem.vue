<template>
  <div class="category-item">
    <div class="category-header">
      <span class="category-name">{{ category.nome }}</span>
      <span class="category-percentage">{{ formatPercentage(category.percentual) }}</span>
    </div>
    <div class="progress-bar-container">
      <div 
        class="progress-bar" 
        :style="{ 
          width: `${category.percentual}%`,
          backgroundColor: category.cor || getCategoryColor(category.nome)
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { formatPercentage } from '../services/api'

export default {
  name: 'CategoryItem',
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPercentage,
    getCategoryColor(categoryName) {
      const colors = {
        'Compras': '#ef4444',
        'Boletos': '#3b82f6',
        'Investimentos': '#8b5cf6',
        'Outros': '#6b7280'
      }
      return colors[categoryName] || '#6b7280'
    }
  }
}
</script>

<style scoped>
.category-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-name {
  font-weight: 500;
  color: #1a1a1a;
  font-size: 0.95rem;
}

.category-percentage {
  font-weight: 600;
  color: #666;
  font-size: 0.95rem;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}
</style>

