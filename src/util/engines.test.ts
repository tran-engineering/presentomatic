import { describe, expect, it } from 'vitest';
import pkg from '../../package.json';

describe('package engines', () => {
  it('declares the minimum Node.js version', () => {
    expect(pkg.engines?.node).toBe('>=20');
  });
});
