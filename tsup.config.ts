import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'
import { compile } from 'sass'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // 暂时禁用，使用 tsc 单独生成
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  injectStyle: true, // 将样式内联到 JS 中
  esbuildPlugins: [
    sassPlugin({
      type: 'css-text', // 关键配置：将 SCSS 编译为 CSS 文本，让 tsup 的 injectStyle 能够处理
    })
  ],
  esbuildOptions(options: any) {
    options.jsx = 'automatic'
  },
  // 额外生成独立的 CSS 文件（可选，供不想内联样式的用户使用）
  onSuccess: async () => {
    const scssPath = join(__dirname, 'src/End/index.scss')
    const result = compile(scssPath, { style: 'compressed' })
    
    mkdirSync(join(__dirname, 'dist'), { recursive: true })
    writeFileSync(join(__dirname, 'dist/style.css'), result.css)
    console.log('✓ Generated dist/style.css (optional for manual import)')
  }
})
