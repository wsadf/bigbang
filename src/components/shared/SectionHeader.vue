<template>
  <div class="section-header">
    <div class="header-left">
      <img 
        :src="icon" 
        :alt="iconAlt" 
        class="section-icon"
        width="20"
        height="20"
        aria-hidden="true"
      />
      <h3 :id="titleId">{{ title }}</h3>
      <span v-if="timePeriod" class="time-period" :aria-label="`Período: ${timePeriod}`">
        {{ timePeriod }}
      </span>
    </div>
    <div v-if="showSeeAll" class="header-right">
      <a href="#" class="see-all-link" :aria-label="seeAllLabel">
        Ver tudo
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    icon: {
      type: String,
      required: true
    },
    iconAlt: {
      type: String,
      default: 'Ícone da seção'
    },
    title: {
      type: String,
      required: true
    },
    titleId: {
      type: String,
      required: true
    },
    timePeriod: {
      type: String,
      default: ''
    },
    showSeeAll: {
      type: Boolean,
      default: true
    },
    seeAllLabel: {
      type: String,
      default: 'Ver todos os itens'
    }
  }
}
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.25rem 0.625rem 1.25rem;
  padding-bottom: 27px;
  border-bottom: 1px solid var(--border-color-light);
  flex-wrap: wrap;
  gap: 0.5rem;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.section-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
}

.header-left h3 {
  font-size: var(--font-size-xl);
  font-weight: 500;
  margin: 0;
  padding: 0;
  color: var(--text-primary);
  line-height: 1;
}

.header-left .time-period {
  margin-left: 0.5rem;
  color: var(--text-muted-dark);
  font-size: var(--font-size-sm);
}

.header-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.see-all-link {
  color: var(--color-link);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-base) ease;
  position: relative;
}

.see-all-link:hover {
  color: var(--color-link-hover);
  text-decoration: underline;
  transform: translateX(2px);
}

/* ============================================
   RESPONSIVE - MOBILE (até 768px)
   ============================================ */
@media (max-width: 768px) {
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

/* ============================================
   RESPONSIVE - MOBILE PEQUENO (até 480px)
   ============================================ */
@media (max-width: 480px) {
  .section-header {
    margin-bottom: 1rem;
  }

  .header-left h3 {
    font-size: 1rem;
  }

  .section-icon {
    width: 18px;
    height: 18px;
  }

  .see-all-link {
    font-size: 0.8rem;
  }
}
</style>

