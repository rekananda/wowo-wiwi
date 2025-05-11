import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql/v1': {
        target: process.env.VITE_SUPABASE_URL,
        changeOrigin: true,
        secure: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@queries": resolve(__dirname, "./src/utils/queries"),
      "@Atom": resolve(__dirname, "./src/Components/Atom"),
      "@Molecule": resolve(__dirname, "./src/Components/Molecule"),
      "@Organisme": resolve(__dirname, "./src/Components/Organisme"),
    },
  },
})
