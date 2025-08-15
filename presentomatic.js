#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import { createServer, build, defineConfig } from 'vite'
import { program } from 'commander';
import { resolve } from 'node:path';

const __dirname = fileURLToPath(new URL('.', import.meta.url))



const reloader = () => ({
  name: "custom-hmr",
  enforce: "post",
  // HMR
  handleHotUpdate({ file, server }) {
    if (file.endsWith(".md")) {
      console.log("Hot reload: Markdown changed!");

      server.ws.send({
        type: "full-reload",
        path: "*",
      });
    }
  },
});

function viteConfig(args, options) {
    return defineConfig({
        configFile: false,
        root: __dirname,
        server: {
            port: options.port,
        },
        publicDir: resolve(args[0]),
        build: {
            outDir: options.output ? resolve(options.output) : undefined,
        },
        plugins: [reloader()]
    });
};


program
    .command('serve')
    .description('Serve the presentation')
    .option('-p, --port <port>', 'Port to run the server on', '1337')
    .argument('[string]', 'Path to the public directory defaults to current directory. Must contain PRESENTATION.md', '.')
    .action(async (args, options) => {

        const server = await createServer(viteConfig(args, options));
        await server.listen();

        server.printUrls();
    });

program
    .command('build')
    .option('-o, --output <dir>', 'Output directory for the built files', 'dist')
    .argument('[string]', 'Path to the public directory defaults to current directory. Must contain PRESENTATION.md', '.')
    .action(async (args, options) => {
        await build(viteConfig(args, options));
    });

program.parse();

