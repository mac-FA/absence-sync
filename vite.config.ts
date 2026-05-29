import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base MUST match the GitHub Pages repo path, or every asset 404s on Pages.
// Repo: mac-FA/absence-sync -> served at /absence-sync/
export default defineConfig({
  base: '/absence-sync/',
  plugins: [react(), tailwindcss()],
})
