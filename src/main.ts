/**
 * Entry point da aplicação
 * Inicializa o Vue app e importa estilos globais
 * 
 * Features:
 * - Inicialização de utilitários de acessibilidade
 * - Preload de recursos críticos
 * - Performance monitoring
 */
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/main.css'
import { initKeyboardNavigationDetection, preloadResource } from '@/utils/accessibility'

// Inicializa detecção de navegação por teclado
initKeyboardNavigationDetection()

// Preload de recursos críticos
if (typeof window !== 'undefined') {
  // Preload de fontes
  preloadResource(
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    'style'
  )
}

const app = createApp(App)
app.mount('#app')
