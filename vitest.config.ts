// vitest.config.ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    css: true,
    coverage: {
      enabled: true, // Enable coverage collection
      provider: 'v8', // Use 'v8' (default) or 'istanbul' provider
      reporter: ['lcov', 'text'], // Output coverage in LCOV format
      reportsDirectory: './coverage', // Directory for coverage reports
      include: ['src/**/*.ts'],
      exclude: ['**/*.d.ts'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
