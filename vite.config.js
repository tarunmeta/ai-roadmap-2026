import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/scheduler')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/firebase'))  return 'vendor-firebase'
          if (id.includes('node_modules/three'))     return 'vendor-three'
          if (id.includes('node_modules/recharts'))  return 'vendor-charts'
          if (id.includes('node_modules/date-fns') ||
              id.includes('node_modules/react-router')) return 'vendor-utils'
        },
      }
    },
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
})
