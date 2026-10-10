import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const DEV_SERVER_PORT = 5173

export default defineConfig({
  plugins: [react()],
  server: {
    port: DEV_SERVER_PORT,
    strictPort: true,
    watch: {
      usePolling: process.env.VITE_USE_POLLING === 'true',
    },
  },
})
