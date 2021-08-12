import {defineConfig} from "vite";

export default defineConfig({
    mode: 'production',
    build: {
        lib: {
            entry: 'src/NanoSplash.ts',
            name: 'NanoSplash',
            fileName: 'nanosplash',
            formats: ['es', 'cjs'],
        },
        outDir: 'dist/module',
        //cssCodeSplit: true,
        //assetsInlineLimit: Number.MAX_SAFE_INTEGER,
        //rollupOptions: {
        //    output: {
        //        inlineDynamicImports: false,
        //    },
        //},
        minify: 'terser'
    }
})
