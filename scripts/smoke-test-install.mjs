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
  child.stdout.on('data', (chunk) => (output += chunk.toString()));
  child.stderr.on('data', (chunk) => (output += chunk.toString()));

  // CI runners are slower/colder than a local dev machine, so give the
  // server plenty of time to print its ready banner, and fail fast (rather
  // than waiting out the full timeout) if the process errors or exits first.
  await waitForReady(child, () => output.includes('Local:'), 60000);

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
    throw new Error('Dependency pre-bundling failed on a freshly installed package');
  }

  console.log('OK: dev server started cleanly on a freshly installed package.');
} catch (err) {
  console.error(output);
  throw err;
} finally {
  child?.kill();
  rmSync(stagingDir, { recursive: true, force: true });
}

function waitForReady(proc, condition, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (condition()) {
        cleanup();
        resolve();
      }
    }, 100);
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out after ${timeoutMs}ms waiting for the dev server to start`));
    }, timeoutMs);
    const onError = (err) => {
      cleanup();
      reject(err);
    };
    const onExit = (code, signal) => {
      cleanup();
      reject(new Error(`presentomatic exited before becoming ready (code=${code}, signal=${signal})`));
    };
    proc.once('error', onError);
    proc.once('exit', onExit);

    function cleanup() {
      clearInterval(timer);
      clearTimeout(timeout);
      proc.off('error', onError);
      proc.off('exit', onExit);
    }
  });
}
