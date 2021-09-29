import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
	mode: 'production',
	plugins: [vue(), viteSingleFile()],
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
