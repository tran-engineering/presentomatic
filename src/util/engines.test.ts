import { describe, expect, it } from 'vitest';
import pkg from '../../package.json';

describe('package engines', () => {
  it('declares the minimum Node.js version', () => {
    expect(pkg.engines?.node).toBe('>=22.22.2');
  });
});

describe('package metadata', () => {
  it('uses the MIT license', () => {
    expect(pkg.license).toBe('MIT');
  });
});
