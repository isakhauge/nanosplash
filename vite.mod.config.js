import { defineConfig } from 'vite'

export default defineConfig({
	mode: 'production',
	build: {
		lib: {
			entry: 'src/Nanosplash.ts',
			name: 'Nanosplash',
			fileName: 'nanosplash',
			formats: ['es', 'cjs'],
		},
		outDir: 'dist/module',
		minify: 'terser',
		terserOptions: {
			toplevel: true,
			ecma: '2015',
			mangle: {
				properties: {
					reserved: [
						'NanoSplash',
						'configure',
						'show',
						'hide',
						'during',
						'inside',
						'window',
						'install',
						'loading',
					],
				},
			},
		},
		keep_classnames: true,
		manifest: true,
	},
})
