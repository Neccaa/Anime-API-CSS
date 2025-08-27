  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [react(), tailwindcss],
    server: {
      host: true,       // penting agar bind ke 0.0.0.0
      port: 5174,       // kamu bisa ganti jika port bentrok
    },
  })
