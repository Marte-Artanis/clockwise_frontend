import '@testing-library/jest-dom/vitest'

// Polyfill ResizeObserver for recharts ResponsiveContainer
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!('ResizeObserver' in globalThis)) {
  // @ts-ignore
  globalThis.ResizeObserver = ResizeObserverMock
} 