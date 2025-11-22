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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
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
  border-radius: 6px;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
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

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .nav-menu {
    gap: 0.5rem;
    font-size: 0.85rem;
  }

  .nav-item {
    padding: 0.5rem;
  }

  .logo {
    width: 70px;
    height: 24px; /* Mantém proporção 87:30 */
  }
}
</style>

