#!/usr/bin/env node
// Regression guard for https://github.com/vitejs/rolldown-vite/issues/304:
// Vite 8's Rolldown dependency scanner could not resolve relative `.svelte`
// imports inside Svelte's virtual modules, breaking every `presentomatic
// serve`. It only reproduces against a real `npm install`ed package run
// through its `bin` symlink from outside the package directory — the exact
// shape of a real `npm i -g presentomatic` — not against the dev repo, so
// the regular vitest suite can't catch it. This packs and installs the
// package fresh and exercises that path.

import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(fileURLToPath(import.meta.url), '../..');
const port = 18934;
const readyTimeoutMs = 120000;
const stagingDir = mkdtempSync(path.join(tmpdir(), 'presentomatic-smoke-'));
const globalPrefix = path.join(stagingDir, 'global');

let child;
let output = '';

try {
  console.log('Packing presentomatic...');
  execFileSync('npm', ['pack', repoRoot, '--silent', '--pack-destination', stagingDir]);
  const tarball = readdirSync(stagingDir).find((f) => f.endsWith('.tgz'));
  const tarballPath = path.join(stagingDir, tarball);

  console.log('Installing into a clean global prefix...');
  execFileSync('npm', ['install', '-g', '--prefix', globalPrefix, tarballPath], { stdio: 'inherit' });

  const bin = path.join(globalPrefix, 'bin', 'presentomatic');
  const exampleDir = path.join(globalPrefix, 'lib', 'node_modules', 'presentomatic', 'example-presentation');

  console.log('Starting the dev server through the installed bin symlink...');
  child = spawn(bin, ['serve', exampleDir, '-p', String(port)], {
    cwd: tmpdir() // a real global install is always run from outside the package
  });
  // Stream output live (not just on failure) so CI logs show real-time
  // progress instead of one dump at the end.
  child.stdout.on('data', (chunk) => {
    output += chunk.toString();
    process.stdout.write(chunk);
  });
  child.stderr.on('data', (chunk) => {
    output += chunk.toString();
    process.stderr.write(chunk);
  });
  let spawnFailure = null;
  child.on('error', (err) => {
    spawnFailure = err;
  });
  child.on('exit', (code, signal) => {
    spawnFailure ??= new Error(`presentomatic exited before becoming ready (code=${code}, signal=${signal})`);
  });

  // Poll the actual HTTP endpoint instead of scraping log text for a ready
  // banner — robust to log-format changes and gives an honest readout of
  // how long startup actually takes on a given runner.
  console.log(`Waiting for http://localhost:${port}/ to respond (timeout ${readyTimeoutMs}ms)...`);
  const start = Date.now();
  let ready = false;
  while (Date.now() - start < readyTimeoutMs) {
    if (spawnFailure) {
      throw spawnFailure;
    }
    try {
      const res = await fetch(`http://localhost:${port}/`);
      if (res.ok) {
        ready = true;
        break;
      }
    } catch {
      // not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (!ready) {
    throw new Error(`Timed out after ${readyTimeoutMs}ms waiting for the dev server to respond`);
  }
  console.log(`Server responded after ${Date.now() - start}ms.`);

  // Triggers Vite's module graph crawl (main.ts -> Presentomatic.svelte ->
  // Slide/Navigation/Laserpointer.svelte) and dependency pre-bundling,
  // which is where the Rolldown scanner failed.
  const response = await fetch(`http://localhost:${port}/src/main.ts`);
  if (response.status !== 200) {
    throw new Error(`Expected 200 from /src/main.ts, got ${response.status}`);
  }

  // Give the background dependency scan time to log a failure, if any.
  await new Promise((resolve) => setTimeout(resolve, 5000));

  if (output.includes('Failed to run dependency scan') || output.includes('UNRESOLVED_IMPORT')) {
    throw new Error('Dependency pre-bundling failed on a freshly installed package');
  }

  console.log('OK: dev server started cleanly on a freshly installed package.');
} finally {
  child?.kill();
  rmSync(stagingDir, { recursive: true, force: true });
}
