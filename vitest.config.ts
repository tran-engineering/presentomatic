import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['src/test/setup.ts'],
    alias: {
      svelte: 'svelte'
    }
  },
  resolve: {
    conditions: ['browser']
  },
  define: {
    MARKDOWN_FILES: JSON.stringify(['test.md']),
    CSS_FILES: JSON.stringify([])
  }
});
