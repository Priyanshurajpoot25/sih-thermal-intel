import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // Proxy /api/* and /public/* to the Python backend
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:5002',
          changeOrigin: true,
          secure: false,
        },
        '/public': {
          target: env.VITE_API_URL || 'http://localhost:5002',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  }
})
