import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  logLevel: 'error',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bigmachini.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});
