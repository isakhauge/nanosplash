import { defineConfig } from 'vite'

export default defineConfig({
	mode: 'production',
	build: {
		lib: {
			entry: 'src/Core/Nanosplash.ts',
			name: 'Nanosplash',
			fileName: 'nanosplash',
			formats: ['es', 'cjs'],
		},
		outDir: 'dist/module',
		cssCodeSplit: false,
		minify: 'terser',
		terserOptions: {
			parse: {
				bare_returns: false,
			},
			compress: {
				keep_fargs: false,
				keep_fnames: false,
				keep_classnames: true,
				module: true,
				passes: 3,
				toplevel: true,
				unsafe_arrows: true,
			},
			mangle: {
				toplevel: true,
				// Reserved class names
				reserved: [],
				properties: {
					reserved: [
						'ns',
						'getId',
						'getText',
						'setText',
						'getImgSrc',
						'setImgSrc',
						'showSpinner',
						'setFontSize',
						'getFontSize',
						'spinnerIsVisible',
						'moveTo',
						'delete',
						'show',
						'inside',
						'remove',
						'progress',
						'while',
						'delete',
						'hideAll',
						'hide',
						'getFromDestinationNode',
						'getDestination'
					],
				}
			},
			ecma: 2015, // specify one of: 5, 2015, 2016, etc.
			keep_classnames: true,
			keep_fnames: false,
			ie8: false,
			module: true,
			nameCache: null, // or specify a name cache object
			safari10: false,
			toplevel: true,
		},
		// keep_classnames: false,
		manifest: true,
	},
})
