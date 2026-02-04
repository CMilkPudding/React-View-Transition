import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState, useEffect } from 'react'
import ViewTransitionStart from '@/Start'
import type { ViewTransitionStartRef } from '@/Start'
import { getCachedRect, type RectCache } from '@/flipCacheStore'

/**
 * # ViewTransitionStart
 * 
 * 视图过渡动画的起始位置组件，用于标记和捕获元素的初始位置信息。
 * 
 * ## 功能特点
 * - 支持 `click` 和 `observe` 两种位置捕获模式
 * - 通过唯一 `id` 与 `ViewTransitionEnd` 组件关联
 * - 支持手动触发捕获（通过 ref）
 * - 可嵌套在 `ViewTransitionStartGroup` 中进行批量管理
 * 
 * ## 基本用法
 * ```tsx
 * <ViewTransitionStart id="item-1" mode="click">
 *   <img src="..." alt="..." />
 * </ViewTransitionStart>
 * ```
 */

// 位置信息展示组件
function PositionInfo({ rect, label = '捕获的位置信息' }: { rect: RectCache | null, label?: string }) {
  if (!rect) return null
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs font-mono">
      <div className="text-gray-500 mb-2 font-sans text-sm">{label}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
        <span>x: <span className="text-blue-600">{rect.x.toFixed(1)}px</span></span>
        <span>y: <span className="text-blue-600">{rect.y.toFixed(1)}px</span></span>
        <span>width: <span className="text-green-600">{rect.width.toFixed(1)}px</span></span>
        <span>height: <span className="text-green-600">{rect.height.toFixed(1)}px</span></span>
      </div>
    </div>
  )
}

function ObserveModeDemo() {
  const [capturedRect, setCapturedRect] = useState<RectCache | null>(null)
  const [captureCount, setCaptureCount] = useState(0)
  const observeId = 'observe-demo'

  // 轮询检查位置是否被捕获
  useEffect(() => {
    const interval = setInterval(() => {
      const rect = getCachedRect(observeId)
      if (rect) {
        setCapturedRect((prev: RectCache | null) => {
          // 位置变化时更新计数
          if (!prev || prev.x !== rect.x || prev.y !== rect.y) {
            setCaptureCount(c => c + 1)
          }
          return rect
        })
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-8">
      <div className="mb-3 text-sm text-gray-500">
       元素可见时自动捕获位置，滚动/窗口变化时持续更新
      </div>
      <ViewTransitionStart id={observeId} mode="observe">
        <div className="w-48 h-32 rounded-xl overflow-hidden bg-blue-100 flex items-center justify-center border-2 border-blue-300">
          <span className="text-blue-600 font-medium">目标元素</span>
        </div>
      </ViewTransitionStart>
      {capturedRect && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-green-500 text-sm">✓ 位置已捕获</span>
          <span className="text-gray-400 text-xs">（更新次数: {captureCount}）</span>
        </div>
      )}
      <PositionInfo rect={capturedRect} />
    </div>
  )
}

function ManualCaptureDemo() {
  const startRef = useRef<ViewTransitionStartRef>(null)
  const [capturedRect, setCapturedRect] = useState<RectCache | null>(null)
  const manualId = 'manual-demo'

  const handleManualCapture = () => {
    startRef.current?.capture()
    // 稍微延迟获取，确保捕获完成
    setTimeout(() => {
      const rect = getCachedRect(manualId)
      setCapturedRect(rect || null)
    }, 10)
  }

  return (
    <div className="p-8">
      <div className="mb-4 text-sm text-gray-500">
        通过 ref 手动触发位置捕获
        <div className='text-xs text-gray-400 mt-1'>(窗口或滚动屏幕后点击按钮，观察位置变化)</div>
      </div>
      <ViewTransitionStart ref={startRef} id={manualId} mode="click">
        <div className="w-48 h-32 rounded-xl overflow-hidden bg-purple-100 flex items-center justify-center border-2 border-purple-300">
          <span className="text-purple-600 font-medium">目标元素</span>
        </div>
      </ViewTransitionStart>
      <button 
        onClick={handleManualCapture}
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      >
        手动捕获位置
      </button>
      {capturedRect && (
        <div className="mt-3 text-green-500 text-sm">✓ 位置已捕获</div>
      )}
      <PositionInfo rect={capturedRect} />
    </div>
  )
}

const meta: Meta<typeof ViewTransitionStart> = {
  title: 'Components/ViewTransitionStart',
  component: ViewTransitionStart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
视图过渡动画的起始位置组件，用于标记和捕获元素的初始位置信息。

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactElement | - | 子元素，仅支持单个根元素 |
| id | string \\| number | - | 唯一标识，用于关联起始和结束位置 |
| mode | 'click' \\| 'observe' | 'click' | 位置捕获模式 |
| onClick | (e: MouseEvent) => void | - | 点击回调 |

### Ref Methods

| 方法 | 说明 |
|------|------|
| capture() | 手动触发位置捕获 |

### 捕获模式说明

- **click**: 点击时捕获元素位置（默认）
- **observe**: 通过 IntersectionObserver 监听，元素可见时自动捕获；同时监听滚动和窗口大小变化
        `,
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: '唯一标识，用于关联起始和结束位置',
      table: {
        type: { summary: 'string | number' },
      },
    },
    mode: {
      control: 'radio',
      options: ['click', 'observe'],
      description: '位置捕获模式',
      table: {
        type: { summary: "'click' | 'observe'" },
        defaultValue: { summary: 'click' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '点击回调',
      table: {
        type: { summary: '(e: MouseEvent) => void' },
      },
    },
    children: {
      control: false,
      description: '子元素，仅支持单个根元素',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '基础用法 (Click 模式)',
  tags: ['!dev'],
  render: () => {
    const [capturedRect, setCapturedRect] = useState<RectCache | null>(null)
    const basicId = 'basic-demo'

    const handleClick = () => {
      // 稍微延迟获取，确保捕获完成
      setTimeout(() => {
        const rect = getCachedRect(basicId)
        setCapturedRect(rect || null)
      }, 10)
    }

    return (
      <div className="p-8">
        <div className="mb-3 text-sm text-gray-500">
          点击图片触发位置捕获（click 模式）
          <div className='text-xs text-gray-40 mt-1'>(首次点击后，可拖动窗口或滚动屏幕后重新点击，测试位置变化)</div>
        </div>
        <ViewTransitionStart id={basicId} mode="click" onClick={handleClick}>
          <div className="w-48 h-32 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-2 border-gray-200">
            <img 
              className="w-full h-full object-cover" 
              src="https://picsum.photos/seed/demo1/200/200" 
              alt="Demo"
            />
          </div>
        </ViewTransitionStart>
        {capturedRect && (
          <div className="mt-3 text-green-500 text-sm">✓ 位置已捕获</div>
        )}
        <PositionInfo rect={capturedRect} />
      </div>
    )
  },
}

export const ObserveMode: Story = {
  name: 'Observe 模式',
  tags: ['!dev'],
  render: () => <ObserveModeDemo />,
}

export const ManualCapture: Story = {
  name: '手动捕获',
  tags: ['!dev'],
  render: () => <ManualCaptureDemo />,
}
