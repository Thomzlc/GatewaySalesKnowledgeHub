import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gateway-sales-knowledge-hub/' // MUST match repo name
})
