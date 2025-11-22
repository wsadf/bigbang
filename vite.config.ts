import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

/**
 * Configuração do Vite com otimizações de performance
 * 
 * Features:
 * - Code splitting automático
 * - Tree shaking
 * - Minificação otimizada
 * - Preload de recursos críticos
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
    open: true,
    // HMR otimizado
    hmr: {
      overlay: true
    }
  },
  build: {
    // Otimizações de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // Code splitting para melhor performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vendor-vue'
            }
            if (id.includes('axios')) {
              return 'vendor-axios'
            }
            return 'vendor'
          }
        },
        // Nomes de arquivos otimizados
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Otimizações de assets
    assetsInlineLimit: 4096, // Inline assets < 4kb
    // Source maps para produção (opcional, pode remover)
    sourcemap: false
  },
  // Otimizações de performance
  optimizeDeps: {
    include: ['vue', 'axios'],
    exclude: []
  },
  // Preload de recursos críticos
  experimental: {
    renderBuiltUrl(filename: string) {
      return `/${filename}`
    }
  }
})

