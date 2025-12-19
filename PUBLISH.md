# 发布指南

## 目录结构

```
view-transition/
├── src/                    # 📦 npm 包源码（会被发布）
│   ├── Start/             # ViewTransitionStart 组件
│   ├── End/               # ViewTransitionEnd 组件
│   ├── flip.ts            # FLIP 动画核心逻辑
│   ├── utils.ts           # 工具函数
│   └── index.ts           # 入口文件
├── examples/              # 🎨 示例代码（不会被发布）
│   ├── main.tsx
│   ├── routes/
│   └── flip_v7/
├── dist/                  # 📤 构建产物（发布时生成）
├── package.json           # 包配置
├── tsup.config.ts         # 构建配置
├── tsconfig.json          # TypeScript 配置
├── .npmignore             # npm 发布忽略文件
└── README.md              # 文档

```

## 发布前准备

### 1. 安装依赖

```bash
npm install
```

### 2. 构建包

```bash
npm run build
```

这会在 `dist/` 目录生成：
- `index.js` (ESM 格式)
- `index.cjs` (CommonJS 格式)
- `index.d.ts` (TypeScript 类型定义)
- `index.d.cts` (CommonJS 类型定义)
- `style.css` (样式文件)

### 3. 测试示例

```bash
npm run dev
```

访问 http://localhost:5173 测试功能是否正常

## 发布到 npm

### 1. 登录 npm

```bash
npm login
```

### 2. 检查包内容

```bash
npm pack --dry-run
```

确认只包含必要文件：
- ✅ `dist/` 目录
- ✅ `src/` 目录（源码）
- ✅ `README.md`
- ✅ `package.json`
- ❌ `examples/` 目录（已排除）
- ❌ `node_modules/` 目录（已排除）

### 3. 发布

```bash
npm publish
```

## 版本更新

### 更新版本号

```bash
# 补丁版本 (1.0.0 -> 1.0.1) - bug 修复
npm version patch

# 次要版本 (1.0.0 -> 1.1.0) - 新功能
npm version minor

# 主要版本 (1.0.0 -> 2.0.0) - 破坏性更改
npm version major
```

### 重新发布

```bash
npm publish
```

## 使用已发布的包

### 安装

```bash
npm install react-view-transition-flip
```

### 使用

```tsx
import { ViewTransitionStart, ViewTransitionEnd } from 'react-view-transition-flip'
import 'react-view-transition-flip/style.css'

// 列表页
<ViewTransitionStart id={item.id} onClick={() => navigate(item.id)}>
  <img src={item.src} />
</ViewTransitionStart>

// 详情页
<ViewTransitionEnd id={id} onClose={() => navigate(-1)}>
  <div>详情内容</div>
</ViewTransitionEnd>
```

## 本地测试

### 方法一：npm link

```bash
# 在包目录
npm link

# 在测试项目
npm link react-view-transition-flip
```

### 方法二：npm pack

```bash
# 打包
npm pack

# 在测试项目安装
npm install /path/to/react-view-transition-flip-1.0.0.tgz
```

## 注意事项

1. **发布前检查清单**：
   - [ ] 所有测试通过
   - [ ] 文档已更新
   - [ ] 版本号已更新
   - [ ] CHANGELOG 已更新（如果有）
   - [ ] 没有调试代码（console.log 等）

2. **package.json 配置**：
   - `name`: 包名（确保未被占用）
   - `version`: 版本号
   - `repository`: GitHub 仓库地址
   - `homepage`: 项目主页

3. **发布的文件**：
   - `dist/`: 构建产物（必需）
   - `src/`: 源码（可选，便于调试）
   - `README.md`: 文档（必需）

## 常见问题

### Q: 如何撤销已发布的版本？

```bash
npm unpublish react-view-transition-flip@1.0.0
```

⚠️ 注意：只能撤销 72 小时内发布的版本

### Q: 如何发布 beta 版本？

```bash
npm version prerelease --preid=beta
npm publish --tag beta
```

### Q: 如何查看包信息？

```bash
npm view react-view-transition-flip
```
