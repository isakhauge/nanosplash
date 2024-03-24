import { LibraryFormats, defineConfig } from 'vite'
import { codecovVitePlugin } from '@codecov/vite-plugin'
import { config } from 'dotenv'
config()

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
	plugins: [
		codecovVitePlugin({
			enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
			bundleName: 'nanosplash',
			uploadToken: process.env.CODECOV_TOKEN,
		}),
	],
})
