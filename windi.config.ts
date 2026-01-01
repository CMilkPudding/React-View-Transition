import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: [
      'src/**/*.{html,jsx,tsx}',
      'storybook/**/*.{html,jsx,tsx}',
      'examples/**/*.{html,jsx,tsx}',
      'index.html',
    ],
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
      'dist/**/*',
    ],
  },
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
})
