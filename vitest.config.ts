// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      enabled: true, // Enable coverage collection
      provider: 'v8', // Use 'v8' (default) or 'istanbul' provider
      reporter: ['lcov'], // Output coverage in LCOV format
      reportsDirectory: './coverage', // Directory for coverage reports
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
