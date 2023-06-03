import { defineConfig, UserConfigExport } from 'vite'

type Config = { mode: string; command: string; ssrBuild: boolean }

const regularBuild = {
	build: {
		lib: {
			entry: './src/main.ts',
			name: 'Nanosplash',
			formats: ['iife', 'es', 'cjs'],
			fileName: 'ns',
		},
		cssCodeSplit: true,
	},
}

const demoBuild = {
	//base: 'docs',
	build: {
		outDir: 'docs',
		rollupOptions: {
			input: 'index.html',
			output: {
				entryFileNames: '[name].[hash].js',
				chunkFileNames: '[name].[hash].js',
				assetFileNames: '[name].[hash].[ext]',
			},
		},
	},
}

export default defineConfig((arg: UserConfigExport) => {
	console.log(arg)
	const config = arg as Config
	if (config.command === 'serve') {
		return {
			// dev specific config
		}
	} else {
		return config.mode === 'demo' ? demoBuild : regularBuild
	}
})
