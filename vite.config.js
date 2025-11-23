import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

/**
 * Configuração do Vite com otimizações de performance
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Otimizações de build
    minify: 'esbuild',
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

