import {defineConfig} from "vite";

export default defineConfig({
    mode: 'production',
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'NanoSplash',
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
                        'inside',
                        'injectInstanceIntoGlobalScope',
                        'Window',
                        'window',
                        'splash'
                    ]
                }
            }
        },
        keep_classnames: true,
        manifest: true,
    }
})