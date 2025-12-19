import { copyFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '../dist')

// 复制 index.d.ts 为 index.d.cts (用于 CommonJS)
copyFileSync(
  join(distDir, 'index.d.ts'),
  join(distDir, 'index.d.cts')
)

console.log('✓ Generated index.d.cts')
