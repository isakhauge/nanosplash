import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        coverage: {
            reporter: ['text', 'html'],
            exclude: [
                'node_modules/',
                'dist/',
                'docs/',
            ],
        },
    }
})
