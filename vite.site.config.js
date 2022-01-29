import { defineConfig } from 'vite'

export default defineConfig({
	mode: 'production',
	build: {
		lib: {
			entry: 'index.html',
			name: 'Nanosplash',
			fileName: 'nanosplash',
			formats: ['iife'],
		},
		outDir: 'docs',
		cssCodeSplit: false,
		assetsInlineLimit: 100000000,
		rollupOptions: {
			outputOptions: {
				inlineDynamicImports: true,
				manualChunks: () => 'main.js',
			},
		},
	},
})
