# react-view-transition-flip

React FLIP 动画组件，用于实现平滑的视图过渡效果。

## 安装

```bash
npm install react-view-transition-flip
# or
yarn add react-view-transition-flip
# or
pnpm add react-view-transition-flip
```

## 使用

### 基础用法

```tsx
import { ViewTransitionStart, ViewTransitionEnd } from 'react-view-transition-flip'

function App() {
  const [showDetail, setShowDetail] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div>
      {/* 列表项 - 起始位置 */}
      {items.map(item => (
        <ViewTransitionStart
          key={item.id}
          id={item.id}
          mode="click"
          onClick={() => {
            setSelectedId(item.id)
            setShowDetail(true)
          }}
        >
          <img src={item.image} alt={item.title} />
        </ViewTransitionStart>
      ))}

      {/* 详情弹窗 - 结束位置 */}
      {showDetail && selectedId && (
        <ViewTransitionEnd
          id={selectedId}
          onClose={() => setShowDetail(false)}
          onShow={() => console.log('动画完成')}
        >
          <img src={items.find(i => i.id === selectedId)?.image} />
        </ViewTransitionEnd>
      )}
    </div>
  )
}
```

### 观察者模式

使用 `mode="observe"` 可以在元素滚动到视口时自动记录位置：

```tsx
<ViewTransitionStart id="item-1" mode="observe">
  <img src="..." />
</ViewTransitionStart>
```

## API

### ViewTransitionStart Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string \| number` | - | **必填**，唯一标识，用于关联起始和结束位置 |
| `children` | `ReactElement` | - | **必填**，子元素，仅支持单个根元素 |
| `mode` | `'click' \| 'observe'` | `'click'` | 位置记录模式 |
| `onClick` | `(e: MouseEvent) => void` | - | 点击回调 |
| `className` | `string` | - | 自定义 className |
| `style` | `CSSProperties` | - | 自定义 style |

### ViewTransitionEnd Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string \| number` | - | **必填**，唯一标识，与 ViewTransitionStart 的 id 对应 |
| `children` | `ReactElement` | - | **必填**，子元素 |
| `duration` | `number` | `500` | 动画持续时间(ms) |
| `onClose` | `() => void` | - | 关闭回调 |
| `onShow` | `() => void` | - | 显示完成回调 |
| `maskClosable` | `boolean` | `true` | 是否可点击遮罩关闭 |
| `maskClassName` | `string` | - | 遮罩层自定义 className |
| `maskStyle` | `CSSProperties` | - | 遮罩层自定义样式 |
| `contentClassName` | `string` | - | 内容区自定义 className |
| `contentStyle` | `CSSProperties` | - | 内容区自定义样式 |

### 工具函数

```tsx
import { capture, play, clearCache, DEFAULT_ANIMATE_DURATION } from 'react-view-transition-flip'

// 手动捕获元素位置
capture('my-id', document.getElementById('my-element'))

// 手动播放动画
play('my-id', document.getElementById('target'), () => {
  console.log('动画完成')
})

// 清除缓存
clearCache() // 清除所有
clearCache('my-id') // 清除指定 id
```

## 原理

基于 FLIP 动画技术实现：
- **F**irst：记录元素的初始位置
- **L**ast：记录元素的最终位置
- **I**nvert：计算位置差异，通过 transform 反向定位
- **P**lay：移除 transform，让元素动画到目标位置

## License

MIT