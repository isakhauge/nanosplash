import { defineConfig } from 'vite'

export default defineConfig({
	mode: 'production',
	build: {
		lib: {
			entry: 'src/main.ts',
			name: 'Nanosplash',
			fileName: 'nanosplash',
			formats: ['iife'],
		},
		outDir: 'dist/iife',
		cssCodeSplit: true,
		minify: 'terser',
		terserOptions: {
			parse: {
				bare_returns: true,
			},
			compress: {
				keep_fargs: false,
				keep_fnames: false,
				keep_classnames: false,
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
						'moveTo',
						'delete',
						'img',
						'show',
						'inside',
						'remove',
						'progress',
						'while',
						'delete',
						'hideAll',
						'hide',
					],
				}
			},
			format: {
				// wrap_iife: true
			},
			sourceMap: {
				// source map options
			},
			ecma: 2015, // specify one of: 5, 2015, 2016, etc.
			keep_classnames: false,
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
