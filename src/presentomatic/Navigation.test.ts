import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Navigation from './Navigation.svelte';

const files = ['00-intro.md', '01-middle.md', '02-end.md'];

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
