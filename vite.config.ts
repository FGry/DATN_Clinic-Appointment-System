import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Keep the app on a single dev port so local URLs stay consistent.
    port: 5173,
    strictPort: true,
    host: true,
    hmr: {
      clientPort: 5173,
      host: 'localhost',
      protocol: 'ws',
      port: 5173,
    },
    // Proxy API requests to the backend to avoid CORS in development.
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
})
