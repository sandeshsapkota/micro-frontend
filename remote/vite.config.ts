import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths(), federation({
    name: 'my-vite-mfe',
    filename: 'remoteEntry.js',
    exposes: {
      './TodoApp': './src/components/todo/index.tsx'
    },

    shared: ['react', 'react-dom']
  })],
  build: {
    modulePreload: false,
    target: 'esnext', // This enables top-level await
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5001
  },
  preview: {
    port: 5001
  }
});
