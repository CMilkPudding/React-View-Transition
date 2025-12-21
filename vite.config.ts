import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-view-transition-flip': path.resolve(__dirname, 'src'),
      'react-view-transition-flip_dist': path.resolve(__dirname, 'dist')
    }
  }
})
