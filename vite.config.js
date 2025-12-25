import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ADD THIS TEST SECTION:
  test: {
    globals: true,                // Allows "describe", "it", "expect" to be used globally
    environment: 'jsdom',         // Simulates a browser for React tests
    setupFiles: './src/setupTests.js', // Runs your setup file before tests
    css: true,
  },
})