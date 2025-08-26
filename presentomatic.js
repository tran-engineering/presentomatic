#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import { createServer, build, defineConfig } from 'vite'
import { program } from 'commander';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import path from 'path';
import pdflib from 'pdf-lib';
import { svelte } from '@sveltejs/vite-plugin-svelte'

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

async function viteConfig(arg, options) {
  const dir = resolve(arg);
  const markdownFiles = (await fs.readdir(dir)).filter(file => file.endsWith(".md"));
  if (markdownFiles.length === 0) {
    throw new Error("No markdown files found");
  }
  return defineConfig({
    configFile: false,
    root: __dirname,
    server: {
      port: options.port,
      host: true,
    },
    publicDir: resolve(arg),
    build: {
      outDir: options.output ? resolve(options.output) : undefined,
    },
    plugins: [
      svelte(), reloader()
    ],
    base: '',
    define: {
      VITE_MARKDOWN_FILES: JSON.stringify(markdownFiles),
    }
  });
};


program
  .command('serve')
  .description('Serve the presentation')
  .option('-p, --port <port>', 'Port to run the server on', '1337')
  .argument('[string]', 'Path to the public directory defaults to current directory. Must contain PRESENTATION.md', '.')
  .action(async (arg, options) => {

    const server = await createServer(await viteConfig(arg, options));
    await server.listen();

    server.printUrls();
  });

program
  .command('build')
  .description('Build static html for the presentation')
  .option('-o, --output <dir>', 'Output directory for the built files', 'dist')
  .argument('[string]', 'Path to the public directory defaults to current directory. Must contain PRESENTATION.md', '.')
  .action(async (args, options) => {
    await build(await viteConfig(args, options));
  });

program
  .command('pdf')
  .description('Save presentation to a PDF')
  .option('-p, --port <port>', 'Port to run the server on', '1337')
  .option('-o, --output <file>', 'Output file for the PDF', 'PRESENTATION.pdf')
  .argument('[string]', 'Path to the public directory defaults to current directory. Must contain PRESENTATION.md', '.')
  .action(async (arg, options) => {

    const server = await createServer(await viteConfig(arg, options));
    await server.listen();

    console.log(`Server is running on port: ${server.resolvedUrls.local[0]}`);
    const countPages = ((await fs.readFile(path.join(arg, 'PRESENTATION.md'), 'utf-8')).match(/---/g) || []).length + 1;
    console.log(`Total pages: ${countPages}`);
    const urls = [];
    for (let i = 0; i < countPages; i++) {
      urls.push(`${server.resolvedUrls.local[0]}?no-animations#${i+1}`)
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pdfDoc = await pdflib.PDFDocument.create();

    for (const url of urls) {
      console.log(`Goto ${url}`);
      await page.goto(url);
      await delay(300); // Wait for the page to load
      const pdfBytes = await page.pdf({ format: 'A4', landscape: true, printBackground: true });
      const pdfPage = await pdflib.PDFDocument.load(pdfBytes);
      const [p] = await pdfDoc.copyPages(pdfPage, [0]);
      pdfDoc.addPage(p);
    }

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(options.output, pdfBytes);
    console.log(`PDF saved to ${options.output}!`);
    await browser.close();
    await server.close();
  });

program.parse();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  });
}
