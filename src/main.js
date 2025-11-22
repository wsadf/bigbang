/**
 * Entry point da aplicação
 * Inicializa o Vue app e importa estilos globais
 */
import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/main.css'

createApp(App).mount('#app')

