import { describe, it, expect } from 'vite-plus/test'

describe('docs entry', () => {
  it('exposes the useNs factory on window', async () => {
    await import('@/docs')

    expect(typeof window.useNs).toBe('function')

    const ns = window.useNs()
    expect(typeof ns.show).toBe('function')
    expect(typeof ns.hide).toBe('function')
    expect(typeof ns.version).toBe('string')
  })
})
