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
const stagingDir = mkdtempSync(path.join(tmpdir(), 'presentomatic-smoke-'));
const globalPrefix = path.join(stagingDir, 'global');

let child;
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
  let output = '';
  child = spawn(bin, ['serve', exampleDir, '-p', String(port)], {
    cwd: tmpdir() // a real global install is always run from outside the package
  });
  child.stdout.on('data', (chunk) => (output += chunk.toString()));
  child.stderr.on('data', (chunk) => (output += chunk.toString()));

  await waitFor(() => output.includes('Local:'), 15000);

  // Triggers Vite's module graph crawl (main.ts -> Presentomatic.svelte ->
  // Slide/Navigation/Laserpointer.svelte) and dependency pre-bundling,
  // which is where the Rolldown scanner failed.
  const response = await fetch(`http://localhost:${port}/src/main.ts`);
  if (response.status !== 200) {
    throw new Error(`Expected 200 from /src/main.ts, got ${response.status}`);
  }

  // Give the background dependency scan time to log a failure, if any.
  await new Promise((resolve) => setTimeout(resolve, 3000));

  if (output.includes('Failed to run dependency scan') || output.includes('UNRESOLVED_IMPORT')) {
    console.error(output);
    throw new Error('Dependency pre-bundling failed on a freshly installed package');
  }

  console.log('OK: dev server started cleanly on a freshly installed package.');
} finally {
  child?.kill();
  rmSync(stagingDir, { recursive: true, force: true });
}

async function waitFor(condition, timeoutMs) {
  const start = Date.now();
  while (!condition()) {
    if (Date.now() - start > timeoutMs) {
      throw new Error('Timed out waiting for the dev server to start');
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
