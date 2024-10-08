import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import adonisjs from '@adonisjs/vite/client'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
    react(),
    adonisjs({
      entrypoints: ['inertia/app/app.tsx', 'resources/js/app.js'],
      reload: ['resources/views/**/*.edge'],
      assetsUrl: 'https://cdn.example.com/',
    }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/inertia/`,
      '@': `${getDirname(import.meta.url)}/inertia/lib`,
    },
  },
})
