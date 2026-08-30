import { defineConfig, type LibraryFormats } from 'vite-plus'
import path from 'node:path'
import { config } from 'dotenv'
import postcss from 'postcss'
import cssnano from 'cssnano'
config()

const name = 'ns'
const format = (process.env?.format ?? '') as LibraryFormats
const entry = (process.env?.entry ?? '') as string

export default defineConfig({
  fmt: {
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    printWidth: 80,
  },
  lint: {
    ignorePatterns: ['docs/index.html'],
  },
  test: {
    environment: 'jsdom',
    css: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['lcov', 'text'],
      reportsDirectory: './coverage',
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
  build: {
    lib: {
      entry: entry, // Path to your library's entry point
      name: name,
      formats: [format], // ESM, CommonJS, IIFE
      fileName: (format) => `${name}.${format}.js`,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    // @ts-expect-error Because postcss is missing types.
    postcss({
      plugins: [
        cssnano({
          preset: 'default', // Use default preset for standard CSS minification
        }),
      ],
    }),
  ],
})
