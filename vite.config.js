import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Agar sayt root’da host qilinadi, base "/" bo‘lsin
export default defineConfig({
  plugins: [react()],
  base: '/',  // Shu qator juda muhim, 404 oldini oladi
})
