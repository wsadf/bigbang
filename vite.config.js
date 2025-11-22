import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Configuração do Vite com otimizações de performance
 */
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Otimizações de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true
      }
    },
    // Code splitting para melhor performance
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue'],
          'api': ['axios']
        }
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },
  // Otimizações de performance
  optimizeDeps: {
    include: ['vue', 'axios']
  }
})

