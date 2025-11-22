<template>
  <div class="category-item">
    <div class="category-content">
      <div class="category-icon-wrapper">
        <img 
          :src="getCategoryIcon(category.nome)" 
          :alt="`Ícone de ${category.nome}`" 
          class="category-icon"
          width="20"
          height="20"
          aria-hidden="true"
        />
      </div>
      <div class="category-info">
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
        'Compras': '#FF6B6B',
        'Boletos': '#A78BFA',
        'Investimentos': '#F8BBD0',
        'Outros': '#6b7280'
      }
      return colors[categoryName] || '#6b7280'
    },
    getCategoryIcon(categoryName) {
      // Por enquanto retorna um ícone padrão, pode ser ajustado depois
      const icons = {
        'Compras': '@/assets/icons/shop.svg',
        'Boletos': '@/assets/icons/shop.svg',
        'Investimentos': '@/assets/icons/shop.svg'
      }
      return icons[categoryName] || '@/assets/icons/shop.svg'
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

.category-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.category-icon-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-icon {
  width: 20px;
  height: 20px;
  display: block;
}

.category-info {
  flex: 1;
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
  font-weight: 400;
  color: #000;
  font-size: 0.95rem;
}

.category-percentage {
  font-weight: 400;
  color: #000;
  font-size: 0.95rem;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 0;
  transition: width 0.5s ease;
}
</style>

