import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';
import { compile, preprocess } from 'svelte/compiler';
import Navigation from './Navigation.svelte';

const files = ['00-intro.md', '01-middle.md', '02-end.md'];

describe('Navigation reactivity', () => {
  it('declares reassigned bound elements with $state', async () => {
    const filename = resolve(__dirname, 'Navigation.svelte');
    const source = readFileSync(filename, 'utf8');
    const { code } = await preprocess(
      source,
      {
        script: ({ content }) => ({
          code: ts.transpileModule(content, {
            compilerOptions: { target: ts.ScriptTarget.ESNext, verbatimModuleSyntax: true }
          }).outputText
        })
      },
      { filename }
    );
    const { warnings } = compile(code, { filename });

    expect(warnings.map((w) => w.code)).not.toContain('non_reactive_update');
  });
});

describe('Navigation file switching', () => {
  let originalLocation: Location;

  beforeEach(() => {
    originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: { search: '?f=01-middle.md', hash: '#3' },
      writable: true
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', { value: originalLocation, writable: true });
  });

  function renderAt(currentFile: string) {
    return render(Navigation, {
      props: { slides: [], currentSlide: undefined, disableAnimations: true, currentFile, files }
    });
  }

  function openedFile() {
    return new URLSearchParams(window.location.search).get('f');
  }

  it('opens the next file when Next is clicked', async () => {
    renderAt('01-middle.md');

    await fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(openedFile()).toBe('02-end.md');
    expect(window.location.hash).toBe('');
  });

  it('opens the previous file when Previous is clicked', async () => {
    renderAt('01-middle.md');

    await fireEvent.click(screen.getByRole('button', { name: 'Previous' }));

    expect(openedFile()).toBe('00-intro.md');
  });

  it('wraps around at both ends of the file list', async () => {
    renderAt('02-end.md');
    await fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(openedFile()).toBe('00-intro.md');
  });

  it('hides the file switcher when there is only one file', () => {
    render(Navigation, {
      props: {
        slides: [],
        currentSlide: undefined,
        disableAnimations: true,
        currentFile: 'only.md',
        files: ['only.md']
      }
    });

    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
  });
});
