import { defineConfig } from 'vite'

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
					formats: ['iife', 'es', 'cjs'],
					fileName: module => {
						return `ns.${module}.js`
					},
				},
				cssCodeSplit: true,
			},
		}
	}
})
