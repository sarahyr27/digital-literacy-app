import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueRouter from 'vue-router/vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: [
        {
          src: 'src/pages',
          path: '',
          // override globals
          exclude: (excluded) => excluded,
          filePatterns: (filePatterns) => filePatterns,
          extensions: (extensions) => extensions,
        },
      ],
      extensions: ['.vue'],
    }),
    tailwindcss(),
    vueDevTools(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: './',
})
