import {defineConfig} from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'TinyLoader',
            fileName: 'tiny-loader',
            formats: ['iife']
        }
    }
})
