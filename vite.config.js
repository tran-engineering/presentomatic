import { defineConfig } from "vite";
import { analyzer } from 'vite-bundle-analyzer'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const reloader = () => ({
  name: "custom-hmr",
  enforce: "post",
  // HMR
  handleHotUpdate({ file, server }) {
    if (file.endsWith(".md")) {
      console.log("Markdown changed...");

      server.ws.send({
        type: "full-reload",
        path: "*",
      });
    }
  },
});

export default defineConfig({
  plugins: [
    reloader(), 
    svelte(),
  ],
  base: ''
});
