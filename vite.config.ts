import { LibraryFormats, defineConfig } from 'vite'
import { version } from './package.json'
import { resolve } from 'path'

const dist = 'dist'
const versioned = process.env?.versioned ?? false
const format = (process.env?.format ?? '') as LibraryFormats
const entry = (process.env?.entry ?? '') as string

const outDirFolders = [dist]
if (versioned) {
	outDirFolders.push('versioned', version, format)
} else {
	outDirFolders.push('latest', format)
}

const outDir = resolve(__dirname, ...outDirFolders)

export default defineConfig({
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
})
