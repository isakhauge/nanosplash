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
        manifest: true,
    }
})