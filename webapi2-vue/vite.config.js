import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '' /********************************************************************************************
              base: './' (alternative) - to publish to any root/subfolder and fix asset path
              source: https://stackoverflow.com/questions/69744253/vite-build-always-using-static-paths 
            ********************************************************************************************/
})