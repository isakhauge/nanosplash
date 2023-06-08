import { defineConfig } from 'vite'

export default defineConfig(() => ({
	build: {
		outDir: 'dist/cjs',
		lib: {
			entry: './src/ts/core/Nanosplash/Service.ts',
			name: 'Nanosplash',
			formats: ['cjs'],
			fileName: 'ns',
		},
		cssCodeSplit: false,
	},
}))
