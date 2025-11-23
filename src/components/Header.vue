<template>
  <header class="header" role="banner">
    <div class="header-content">
      <div class="header-left">
        <button 
          class="menu-toggle"
          aria-label="Abrir menu de navegação"
          aria-expanded="isMenuOpen"
          aria-controls="nav-menu"
          @click="toggleMenu"
          @keydown.enter.prevent="toggleMenu"
          @keydown.space.prevent="toggleMenu"
        >
          <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
          <span class="hamburger-line" :class="{ 'active': isMenuOpen }"></span>
        </button>
        <a href="/" class="logo-link" aria-label="BigBang - Ir para página inicial" @click="closeMenu">
          <img 
            src="@/assets/images/logo.svg" 
            alt="BigBang Logo" 
            class="logo"
            width="87"
            height="30"
          />
        </a>
      </div>
      <nav 
        id="nav-menu"
        class="nav-menu" 
        :class="{ 'menu-open': isMenuOpen }"
        role="navigation" 
        aria-label="Navegação principal"
      >
        <a href="#" class="nav-item active" aria-current="page" @click="closeMenu">Dashboard</a>
        <a href="#" class="nav-item" @click="closeMenu">Pagamentos</a>
        <a href="#" class="nav-item" @click="closeMenu">Invoices</a>
        <a href="#" class="nav-item" @click="closeMenu">Insights</a>
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
    <!-- Overlay para fechar o menu ao clicar fora -->
    <div 
      v-if="isMenuOpen" 
      class="menu-overlay" 
      @click="closeMenu"
      aria-hidden="true"
    ></div>
  </header>
</template>

<script>
/**
 * Componente de cabeçalho com navegação responsiva
 * Inclui logo, menu de navegação com hambúrguer para mobile e ações do usuário
 */
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false // Estado do menu mobile
    }
  },
  methods: {
    /**
     * Alterna o estado do menu mobile
     */
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      // Previne scroll do body quando o menu está aberto
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    /**
     * Fecha o menu mobile
     */
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    },
    /**
     * Handler para o botão de notificações
     * TODO: Implementar funcionalidade
     */
    handleNotifications() {
      // Implementar funcionalidade de notificações
      console.log('Notificações')
    },
    /**
     * Fecha o menu ao pressionar ESC
     */
    handleEscape(e) {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu()
      }
    }
  },
  mounted() {
    // Adiciona listener para fechar menu com ESC
    document.addEventListener('keydown', this.handleEscape)
    // Fecha o menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.closeMenu()
      }
    })
  },
  beforeUnmount() {
    // Remove listeners ao desmontar o componente
    document.removeEventListener('keydown', this.handleEscape)
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.header {
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
  position: relative;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
  position: relative;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.logo-link::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.logo-link:hover::after {
  left: 100%;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo {
  width: 87px;
  height: 30px;
  display: block;
  object-fit: contain;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  background: transparent;
  display: block;
  position: relative;
}

.nav-item:hover:not(.active) {
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-1px);
}

.nav-item.active {
  color: white;
  background: #ef4444;
  border-radius: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
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
  transition: all 0.3s ease;
}

.icon-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.1);
}

.notification-icon {
  width: 24px;
  height: 24px;
  display: block;
}

.menu-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

/* ============================================
   RESPONSIVE - TABLET (até 1024px)
   ============================================ */
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

/* ============================================
   RESPONSIVE - MOBILE (até 768px)
   ============================================ */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
    background: #1a1a1a;
  }

  .header-content {
    flex-wrap: nowrap;
    gap: 0;
    position: relative;
  }

  .header-left {
    gap: 0.75rem;
    flex: 0 0 auto;
  }

  .menu-toggle {
    display: flex;
  }

  .logo-link {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .logo {
    width: 70px;
    height: 24px;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    left: -100%;
    width: 280px;
    height: 100vh;
    background: #1a1a1a;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5rem 1.5rem 2rem;
    gap: 0;
    z-index: 100;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    transition: left 0.3s ease;
    overflow-y: auto;
  }

  .nav-menu.menu-open {
    left: 0;
  }

  .nav-item {
    width: 100%;
    padding: 1rem 1.25rem;
    font-size: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    white-space: normal;
    text-align: left;
  }

  .nav-item:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-item:hover:not(.active) {
    background: rgba(255, 255, 255, 0.08);
    opacity: 1;
    transform: translateX(4px);
  }

  .nav-item.active {
    background: #ef4444;
  }

  .header-actions {
    margin-left: auto;
    flex: 0 0 auto;
  }

  .menu-overlay {
    display: block;
  }
}

/* ============================================
   RESPONSIVE - MOBILE PEQUENO (até 480px)
   ============================================ */
@media (max-width: 480px) {
  .header {
    padding: 0.75rem;
    background: #1a1a1a;
  }

  .header-left {
    gap: 0.5rem;
  }

  .menu-toggle {
    width: 24px;
    height: 24px;
  }

  .hamburger-line {
    height: 2px;
  }

  .hamburger-line.active:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .hamburger-line.active:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  .logo-link {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .logo {
    width: 60px;
    height: 20px;
  }

  .nav-menu {
    width: 260px;
    padding: 4.5rem 1.25rem 2rem;
  }

  .nav-item {
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
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

