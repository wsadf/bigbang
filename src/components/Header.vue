<template>
  <header class="header" role="banner">
    <div class="header-content">
      <a href="/" class="logo-link" aria-label="BigBang - Ir para página inicial">
        <img 
          src="@/assets/images/logo.svg" 
          alt="BigBang Logo" 
          class="logo"
          width="87"
          height="30"
        />
      </a>
      <nav class="nav-menu" role="navigation" aria-label="Navegação principal">
        <a href="#" class="nav-item active" aria-current="page">Dashboard</a>
        <a href="#" class="nav-item">Pagamentos</a>
        <a href="#" class="nav-item">Invoices</a>
        <a href="#" class="nav-item">Insights</a>
      </nav>
      <div class="header-actions" role="group" aria-label="Ações do cabeçalho">
        <button 
          class="icon-button" 
          aria-label="Notificações"
          @keydown.enter.prevent="handleNotifications"
          @keydown.space.prevent="handleNotifications"
        >
          <img 
            src="@/assets/icons/notification.svg" 
            alt="Notificações" 
            class="notification-icon"
            width="24"
            height="24"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
/**
 * Componente de cabeçalho com navegação
 * Inclui logo, menu de navegação e ações do usuário
 */
export default {
  name: 'Header',
  methods: {
    /**
     * Handler para o botão de notificações
     * TODO: Implementar funcionalidade
     */
    handleNotifications() {
      // Implementar funcionalidade de notificações
      console.log('Notificações')
    }
  }
}
</script>

<style scoped>
.header {
  background: #1a1a1a;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.3s;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo {
  width: 87px;
  height: 30px;
  display: block;
  object-fit: contain;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0;
  transition: all 0.3s;
  font-size: 0.95rem;
  background: transparent;
}

.nav-item:hover:not(.active) {
  opacity: 0.8;
}

.nav-item.active {
  color: white;
  background: #ef4444;
  border-radius: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.icon-button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.notification-icon {
  width: 24px;
  height: 24px;
  display: block;
}

/* Tablet */
@media (max-width: 1024px) {
  .header {
    padding: 1.25rem 1.5rem;
  }

  .nav-menu {
    gap: 1rem;
  }

  .nav-item {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .header-content {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 0.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 0.5rem;
  }

  .nav-menu::-webkit-scrollbar {
    display: none;
  }

  .nav-item {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .logo {
    width: 70px;
    height: 24px;
  }

  .header-actions {
    margin-left: auto;
  }
}

/* Mobile pequeno */
@media (max-width: 480px) {
  .header {
    padding: 0.75rem;
  }

  .nav-menu {
    gap: 0.25rem;
  }

  .nav-item {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  .logo {
    width: 60px;
    height: 20px;
  }

  .icon-button {
    padding: 0.4rem;
  }

  .notification-icon {
    width: 20px;
    height: 20px;
  }
}
</style>

