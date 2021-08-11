import {defineConfig} from "vite";
import {viteSingleFile} from "vite-plugin-singlefile";

export default defineConfig({
    plugins: [viteSingleFile()],
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'TinyLoader',
            fileName: 'tiny-loader',
            formats: ['iife'],
        },
        cssCodeSplit: true,
        assetsInlineLimit: Infinity,
        rollupOptions: {
            output: {
                inlineDynamicImports: true,
            },
        },
        minify: 'terser'
    }
})
