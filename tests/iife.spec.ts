import { describe, it, expect } from 'vitest'
import type { INanosplash } from '@/types/interfaces/INanosplash'

describe('iife entry', () => {
    it('exposes the Nanosplash API on window after the load event', async () => {
        await import('@/iife')

        window.dispatchEvent(new Event('load'))

        const api = (window as Window & { ns?: INanosplash }).ns
        expect(api).toBeTruthy()
        expect(typeof api?.show).toBe('function')
        expect(typeof api?.hide).toBe('function')
        expect(typeof api?.version).toBe('string')
    })
})
