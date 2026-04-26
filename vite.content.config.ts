import { defineConfig } from 'vite';

// Builds content.ts as a self-contained IIFE (required for content scripts)
export default defineConfig({
  build: {
    rollupOptions: {
      input: { content: 'src/content.ts' },
      output: {
        entryFileNames: '[name].js',
        format: 'iife',
        name: 'VideoSpeedContent',
      },
    },
    outDir: 'dist',
    emptyOutDir: false,
    copyPublicDir: false,
  },
});
