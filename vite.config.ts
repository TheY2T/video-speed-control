import { defineConfig } from 'vite';

// Builds popup.html and its TypeScript entry (popup.ts)
export default defineConfig({
  build: {
    rollupOptions: {
      input: { popup: 'popup.html' },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
