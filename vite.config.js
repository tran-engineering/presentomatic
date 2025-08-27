import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import svelteConfig from './svelte.config.js';

export default defineConfig({
  plugins: [svelte(svelteConfig)],
  build: {
    outDir: 'dist-app',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  }
});