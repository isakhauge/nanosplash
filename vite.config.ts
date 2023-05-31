import { defineConfig } from 'vite'
import type { BuildOptions } from 'esbuild'

export default defineConfig(({ command, mode, ssrBuild }) => {
	if (command === 'serve') {
		return {
			// dev specific config
		}
	} else {
		// command === 'build'
		return {
			build: {
				lib: {
					entry: './src/main.ts',
					name: 'Nanosplash',
					formats: ['iife'],
					fileName: 'ns',
				},
				cssCodeSplit: true,
			},
		}
	}
})
