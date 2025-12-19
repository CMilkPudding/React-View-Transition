# 目录结构调整说明

## 调整内容

已将项目从嵌套包结构调整为单包发布结构。

### 调整前

```
view-transition/
├── src/
│   ├── ViewTransition/        # 独立的包
│   │   ├── Start/
│   │   ├── End/
│   │   ├── package.json       # 独立的包配置
│   │   └── tsup.config.ts
│   └── main.tsx
└── examples/
    └── flip_v7/
```

### 调整后

```
view-transition/
├── src/                        # 包源码
│   ├── Start/
│   ├── End/
│   ├── flip.ts
│   ├── utils.ts
│   └── index.ts
├── examples/                   # 示例（不发布）
│   ├── main.tsx
│   ├── routes/
│   └── flip_v7/
├── dist/                       # 构建产物
├── package.json               # 根目录包配置
├── tsup.config.ts             # 根目录构建配置
└── README.md
```

## 主要变更

### 1. 文件移动

- ✅ `src/ViewTransition/*` → `src/*`
- ✅ `src/main.tsx` → `examples/main.tsx`
- ✅ `src/ViewTransition/package.json` → `package.json`（合并）
- ✅ `src/ViewTransition/tsup.config.ts` → `tsup.config.ts`

### 2. 配置更新

#### package.json
- 更新为 npm 包配置
- 添加 `main`、`module`、`types`、`exports` 字段
- 添加 `peerDependencies`
- 更新 `scripts`：
  - `build`: 构建 npm 包
  - `dev`: 运行示例
  - `build:examples`: 构建示例

#### tsup.config.ts
- 入口改为 `src/index.ts`
- SCSS 路径改为 `src/End/index.scss`

#### vite.config.ts
- 别名从 `@` 改为 `react-view-transition-flip`

#### tsconfig.app.json
- 路径别名更新为 `react-view-transition-flip`

#### index.html
- 入口改为 `/examples/main.tsx`

### 3. 导入路径更新

所有示例文件的导入路径已更新：

```tsx
// 之前
import { ViewTransitionStart } from '@/ViewTransition'

// 现在
import { ViewTransitionStart } from 'react-view-transition-flip'
import 'react-view-transition-flip/style.css'
```

### 4. .npmignore 更新

排除不需要发布的文件：
- `examples/` - 示例代码
- `node_modules/` - 依赖
- `*.tgz` - 打包文件
- 开发配置文件

## 下一步操作

### 1. 安装依赖

```bash
npm install
```

### 2. 测试示例

```bash
npm run dev
```

### 3. 构建包

```bash
npm run build
```

### 4. 发布

参考 `PUBLISH.md` 文档进行发布。

## 优势

1. **更清晰的结构**：源码在 `src/`，示例在 `examples/`
2. **更简单的配置**：只有一个 `package.json` 和 `tsup.config.ts`
3. **更好的开发体验**：可以直接在项目中测试包功能
4. **标准的 npm 包结构**：符合社区最佳实践
