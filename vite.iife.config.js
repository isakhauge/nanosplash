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
		assetsInlineLimit: Number.MAX_SAFE_INTEGER,
		rollupOptions: {
			output: {
				inlineDynamicImports: false,
			},
		},
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
						'Window',
						'window',
						'splash',
						'install',
					],
				},
			},
		},
		keep_classnames: true,
		manifest: true,
	},
})
