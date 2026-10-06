import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5280,
    strictPort: true,
    watch: {
      ignored: ['**/public/docs/**', '**/public/media/**'],
    },
    proxy: {
      '/api': 'http://127.0.0.1:4080',
    },
  },
})
