import { LibraryFormats, defineConfig } from 'vite'

const format = (process.env?.format ?? '') as LibraryFormats
const entry = (process.env?.entry ?? '') as string

export default defineConfig({
	build: {
		outDir: `dist/${format}`,
		lib: {
			entry,
			name: 'Nanosplash',
			formats: [format] as LibraryFormats[],
			fileName: 'ns',
		},
	},
})
