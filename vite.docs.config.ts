import { LibraryFormats, defineConfig } from 'vite'

const entry = (process.env?.entry ?? '') as string

export default defineConfig({
	build: {
		outDir: `docs/.vitepress/theme/js`,
		lib: {
			entry,
			name: 'Nanosplash',
			formats: ['iife'] as LibraryFormats[],
			fileName: 'ns',
		},
	},
})
