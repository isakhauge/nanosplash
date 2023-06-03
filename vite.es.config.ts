import { defineConfig } from 'vite'

export default defineConfig(() => ({
	build: {
		outDir: 'dist/es',
		lib: {
			entry: './src/ts/core/Nanosplash/NanosplashService.ts',
			name: 'Nanosplash',
			formats: ['es'],
			fileName: 'ns',
		},
		cssCodeSplit: false,
	},
}))
