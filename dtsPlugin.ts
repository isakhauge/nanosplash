import type { Plugin } from 'vite'
import fs, { Dirent } from 'fs'
import path from 'path'
import { exec } from 'child_process'

// Run command
const runCommand = (command: string) =>
	new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error || stderr) {
				reject(error || stderr)
			}
			resolve(stdout)
		})
	})

// Create dts files
const createDts = async (inDir: string, outDir: string) => {
	const command = [
		'tsc',
		'--emitDeclarationOnly',
		'--declaration',
		'--allowJs',
		'--emitDecoratorMetadata',
		'--experimentalDecorators',
		'--moduleResolution node',
		`--outDir ${outDir}`,
		`${inDir}/**/*.ts`,
	].join(' ')
	await runCommand(command)
}

// Read directory
const findDtsInside = (pathString: string): Promise<string[]> =>
	new Promise((resolve, reject) => {
		fs.readdir(
			pathString,
			{
				encoding: 'utf-8',
				recursive: true,
			},
			async (error, files) => {
				if (error) {
					reject(error)
				}
				const actualFiles = []
				for (const file of files) {
					const absPath = path.resolve(__dirname, `${pathString}/${file}`)
					if (absPath.endsWith('.d.ts')) {
						actualFiles.push(absPath)
					}
				}
				resolve(actualFiles)
			}
		)
	})

const directoriesInside = (pathString: string): Promise<string[]> =>
	new Promise((resolve, reject) => {
		fs.readdir(
			pathString,
			{
				encoding: 'utf-8',
				withFileTypes: true,
			},
			(error, files: Dirent[]) => {
				if (error) {
					reject(error)
				}
				const filesAndFolders = files.map(file =>
					path.resolve(__dirname, `${pathString}/${file.name}`)
				)
				resolve(filesAndFolders)
			}
		)
	})

// Read file
const readFile = (path: string): Promise<string> =>
	new Promise((resolve, reject) => {
		fs.readFile(path, { encoding: 'utf-8', flag: 'r' }, (error, data) => {
			if (error) {
				reject(error)
			}
			resolve(data)
		})
	})

// Remove imports
const removeImports = (data: string) => {
	const regex = /^(import.+)$/gm
	return data.replace(regex, '')
}

// Write file
const writeFile = (path: string, data: string): Promise<void> =>
	new Promise((resolve, reject) => {
		fs.writeFile(path, data, { encoding: 'utf-8', flag: 'w' }, error => {
			if (error) {
				reject(error)
			}
			resolve()
		})
	})

// Delete file
const deleteFile = (path: string): Promise<void> =>
	new Promise((resolve, reject) => {
		runCommand(`rm -rf ${path}`)
			.then(() => resolve())
			.catch(reject)
	})

export type DtsPluginOptions = {
	inDir: string
	outDir: string
}

export default function DtsPlugin(options: DtsPluginOptions): Plugin {
	return {
		name: 'dts-plugin',
		async closeBundle() {
			const filesAndFoldersBefore = await directoriesInside(options.outDir)
			await createDts(options.inDir, options.outDir)
			const dtsFiles = await findDtsInside(options.outDir)
			const fileContents: string[] = await Promise.all(dtsFiles.map(readFile))
			const fileContentsWithoutImports = fileContents.map(removeImports)
			const combinedFileContents = fileContentsWithoutImports.join('\n')
			const dtsPath = path.resolve(__dirname, options.outDir, 'ns.d.ts')
			await writeFile(dtsPath, combinedFileContents)
			const filesAndFoldersAfter = await directoriesInside(options.outDir)
			const filesOrFoldersToKeep = filesAndFoldersBefore.concat(dtsPath)
			const filesOrFoldersToDelete = filesAndFoldersAfter.filter(
				fileOrFolder => !filesOrFoldersToKeep.includes(fileOrFolder)
			)
			await Promise.all(filesOrFoldersToDelete.map(deleteFile))
			console.log('dts-plugin: File created', dtsPath)
		},
	}
}
