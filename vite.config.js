import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src', // Set the project root to the 'src' directory
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['3000-idufz7tpftavad8emzea8-74c0cd62.manus.computer']
  },
  build: {
    outDir: '../dist', // Output build files to 'dist' directory in the project root
    emptyOutDir: true
  }
});