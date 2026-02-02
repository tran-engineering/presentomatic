import '@testing-library/jest-dom/vitest'

// Mock window.MARKDOWN_FILES for components that access it
declare global {
  interface Window {
    MARKDOWN_FILES: string[]
  }
}

window.MARKDOWN_FILES = ['test.md']

// Mock WebKitCSSMatrix for d3 animations in jsdom
class MockDOMMatrix {
  a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
  m11 = 1; m12 = 0; m13 = 0; m14 = 0;
  m21 = 0; m22 = 1; m23 = 0; m24 = 0;
  m31 = 0; m32 = 0; m33 = 1; m34 = 0;
  m41 = 0; m42 = 0; m43 = 0; m44 = 1;
  is2D = true;
  isIdentity = true;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_init?: string | number[]) {}

  inverse() { return new MockDOMMatrix(); }
  multiply() { return new MockDOMMatrix(); }
  rotateAxisAngle() { return new MockDOMMatrix(); }
  rotate() { return new MockDOMMatrix(); }
  scale() { return new MockDOMMatrix(); }
  translate() { return new MockDOMMatrix(); }
  transformPoint() { return { x: 0, y: 0, z: 0, w: 1 }; }
  toFloat32Array() { return new Float32Array(16); }
  toFloat64Array() { return new Float64Array(16); }
}

// @ts-expect-error - jsdom doesn't have WebKitCSSMatrix
globalThis.WebKitCSSMatrix = MockDOMMatrix
// @ts-expect-error - jsdom doesn't have DOMMatrix
globalThis.DOMMatrix = MockDOMMatrix
