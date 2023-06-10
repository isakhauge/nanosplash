import { LibraryFormats, defineConfig } from 'vite'
import { version } from './package.json'
import DtsPlugin from './dtsPlugin'

//const { versioned, format, entry } = process.env as Record<string, string>
const versioned = process.env?.versioned ?? false
const format = process.env.format as LibraryFormats
const entry = process.env.entry as string

const subFolder = versioned ? `/versioned/${version}` : '/latest'
const outDir = `dist/${subFolder}/${format}`

export default defineConfig(() => ({
	build: {
		outDir,
		lib: {
			entry,
			name: 'Nanosplash',
			formats: [format] as LibraryFormats[],
			fileName: 'ns',
		},
		cssCodeSplit: format === 'iife',
	},
	plugins: [DtsPlugin({ inDir: 'src/ts', outDir })],
}))
