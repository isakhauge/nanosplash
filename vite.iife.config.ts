import { defineConfig } from 'vite'

export default defineConfig(() => ({
	build: {
		outDir: 'dist/iife',
		lib: {
			entry: './src/ts/main.ts',
			name: 'Nanosplash',
			formats: ['iife'],
			fileName: 'ns',
		},
		cssCodeSplit: true,
	},
}))
