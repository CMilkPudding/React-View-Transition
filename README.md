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
          onShow={() => console.log('动画完成')}
          onClosed={() => setShowDetail(false)}
        >
          <img src={items.find(i => i.id === selectedId)?.image} />
        </ViewTransitionEnd>
      )}
    </div>
  )
}
```

### 组合模式（Group）

当一个页面中有多个起始/结束元素需要统一控制捕获和播放时，使用 Group：

```tsx
import { useRef } from 'react'
import {
  ViewTransitionStartGroup,
  ViewTransitionStart,
  ViewTransitionEndGroup,
  ViewTransitionEnd,
} from 'react-view-transition-flip'
import type { ViewTransitionStartGroupRef, ViewTransitionEndGroupRef } from 'react-view-transition-flip'

function App() {
  const startGroupRef = useRef<ViewTransitionStartGroupRef>(null)
  const endGroupRef = useRef<ViewTransitionEndGroupRef>(null)

  return (
    <>
      <ViewTransitionStartGroup ref={startGroupRef} mode="click">
        <ViewTransitionStart id="1">
          <img src="..." />
        </ViewTransitionStart>
        <ViewTransitionStart id="2">
          <img src="..." />
        </ViewTransitionStart>
      </ViewTransitionStartGroup>

      <ViewTransitionEndGroup ref={endGroupRef} showMode="observe" duration={500} endDuration={500}>
        <ViewTransitionEnd id="1">
          <img src="..." />
        </ViewTransitionEnd>
        <ViewTransitionEnd id="2">
          <img src="..." />
        </ViewTransitionEnd>
      </ViewTransitionEndGroup>
    </>
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
| `mode` | `'click' \| 'observe'` | `'click'` | 位置记录模式（Group 模式下由 Group 控制） |
| `onClick` | `(e: MouseEvent) => void` | - | 点击回调 |

### ViewTransitionEnd Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string \| number` | - | **必填**，唯一标识，与 ViewTransitionStart 的 id 对应 |
| `children` | `ReactElement` | - | **必填**，子元素 |
| `duration` | `number` | `500` | 动画持续时间(ms) |
| `endDuration` | `number` | `500` | 关闭动画持续时间(ms) |
| `onShow` | `() => void` | - | 显示动画完成回调 |
| `onClosed` | `() => void` | - | 关闭动画完成回调 |
| `showMode` | `'observe' \| 'call'` | `'observe'` | 触发显示动画方式 |
| `animationType` | `'all' \| 'position' \| 'font'` | `'all'` | 动画类型 |

### ViewTransitionStartGroup Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | **必填**，通常包含多个 ViewTransitionStart |
| `mode` | `'click' \| 'observe'` | `'click'` | 组内 Start 的捕获模式 |

### ViewTransitionEndGroup Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `ReactNode` | - | **必填**，通常包含多个 ViewTransitionEnd |
| `showMode` | `'observe' \| 'call'` | `'observe'` | 组内 End 的显示模式 |
| `duration` | `number` | `500` | 组内显示动画持续时间(ms) |
| `endDuration` | `number` | `500` | 组内关闭动画持续时间(ms) |
| `onClosed` | `() => void` | - | 关闭动画完成回调 |

### 工具函数

```tsx
import { capture, play, clearCache } from 'react-view-transition-flip'

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

### 缓存说明

组件内部会将捕获到的位置信息缓存到一个全局 Store 中，并通过 `sessionStorage` 持久化。
这意味着在同一个浏览器 Tab 的页面跳转/刷新过程中，仍可读取到上一次捕获的数据（除非你显式调用 `clearCache` 清理）。

## 原理

基于 FLIP 动画技术实现：
- **F**irst：记录元素的初始位置
- **L**ast：记录元素的最终位置
- **I**nvert：计算位置差异，通过 transform 反向定位
- **P**lay：移除 transform，让元素动画到目标位置

## License

MIT