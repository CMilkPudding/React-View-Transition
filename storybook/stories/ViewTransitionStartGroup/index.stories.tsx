import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState, useEffect } from 'react'
import ViewTransitionStart from '@/Start'
import ViewTransitionStartGroup from '@/Start/Group'
import type { ViewTransitionStartGroupRef } from '@/Start/Group'
import { getCachedRect, type RectCache } from '@/flipCacheStore'

/**
 * # ViewTransitionStartGroup
 * 
 * 视图过渡动画起始位置的分组容器，用于批量管理多个 `ViewTransitionStart` 组件。
 * 
 * ## 设计初衷
 * Group 组件设计用于管理 **一个卡片内的多个过渡元素**（如同时包含图片和标题）。
 * 
 * ## 推荐用法（列表场景）
 * ```tsx
 * {items.map(item => (
 *   <ViewTransitionStartGroup key={item.id} ref={r => refs[item.id] = r}>
 *     <ViewTransitionStart id={item.id}><img /></ViewTransitionStart>
 *     <ViewTransitionStart id={`title-${item.id}`}><h3 /></ViewTransitionStart>
 *   </ViewTransitionStartGroup>
 * ))}
 * ```
 * 
 * ## 非推荐用法（性能损耗）
 * ```tsx
 * // ❌ 单个 Group 包裹整个列表会导致 captureAll 捕获所有元素
 * <ViewTransitionStartGroup>
 *   {items.map(item => <ViewTransitionStart />)}
 * </ViewTransitionStartGroup>
 * ```
 */

const items = [
  { id: 'group-1', src: 'https://picsum.photos/seed/g1/200/200', title: '图片 1' },
  { id: 'group-2', src: 'https://picsum.photos/seed/g2/200/200', title: '图片 2' },
  { id: 'group-3', src: 'https://picsum.photos/seed/g3/200/200', title: '图片 3' },
  { id: 'group-4', src: 'https://picsum.photos/seed/g4/200/200', title: '图片 4' },
]

// 位置信息展示组件
function PositionInfo({ rect, label }: { rect: RectCache | null, label: string }) {
  if (!rect) return null
  return (
    <div className="p-2 bg-gray-50 rounded text-xs font-mono">
      <div className="text-gray-500 mb-1 font-sans text-xs">{label}</div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-gray-600">
        <span>x: <span className="text-blue-600">{rect.x.toFixed(0)}</span></span>
        <span>y: <span className="text-blue-600">{rect.y.toFixed(0)}</span></span>
        <span>w: <span className="text-green-600">{rect.width.toFixed(0)}</span></span>
        <span>h: <span className="text-green-600">{rect.height.toFixed(0)}</span></span>
      </div>
    </div>
  )
}

// 单个 Group 基础用法
function BasicDemo() {
  const groupRef = useRef<ViewTransitionStartGroupRef>(null)
  const [capturedRects, setCapturedRects] = useState<Record<string, RectCache | null>>({})

  const handleCaptureAll = () => {
    groupRef.current?.captureAll()
    setTimeout(() => {
      const rects: Record<string, RectCache | null> = {}
      rects['single-img'] = getCachedRect('single-img') || null
      rects['single-title'] = getCachedRect('single-title') || null
      setCapturedRects(rects)
    }, 10)
  }

  const hasCaptured = Object.keys(capturedRects).length > 0

  return (
    <div className="p-8">
      <div className="mb-3 text-sm text-gray-500">
        单个 Group 管理多个过渡元素
        <div className="text-xs text-gray-400 mt-1">
          点击按钮批量捕获组内所有元素位置
        </div>
      </div>
      
      <ViewTransitionStartGroup ref={groupRef} mode="click">
        <div className="rounded-xl overflow-hidden border-2 border-gray-200 w-48">
          <ViewTransitionStart id="single-img">
            <img 
              className="w-full h-32 object-cover" 
              src="https://picsum.photos/seed/single/200/200" 
              alt="示例图片"
            />
          </ViewTransitionStart>
          <div className="p-3 bg-white">
            <ViewTransitionStart id="single-title">
              <div className="text-sm text-gray-700 font-medium">示例卡片</div>
            </ViewTransitionStart>
          </div>
        </div>
      </ViewTransitionStartGroup>

      <button 
        onClick={handleCaptureAll}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        批量捕获位置
      </button>
      
      {hasCaptured && (
        <div className="mt-3 space-y-1">
          <div className="text-green-500 text-sm">✓ 已捕获 2 个元素的位置</div>
          <PositionInfo rect={capturedRects['single-img'] || null} label="图片" />
          <PositionInfo rect={capturedRects['single-title'] || null} label="标题" />
        </div>
      )}
    </div>
  )
}

// 列表中使用 - 推荐：每个卡片一个 Group
function ListUsageDemo() {
  const groupRefs = useRef<Record<string, ViewTransitionStartGroupRef | null>>({})
  const [capturedRects, setCapturedRects] = useState<Record<string, RectCache | null>>({})
  const [lastClicked, setLastClicked] = useState<string | null>(null)

  const handleItemClick = (item: typeof items[0]) => {
    // 只捕获当前卡片的 Group
    groupRefs.current[item.id]?.captureAll()
    setLastClicked(item.id)
    
    setTimeout(() => {
      const rects: Record<string, RectCache | null> = {}
      rects[item.id] = getCachedRect(item.id) || null
      rects[`title-${item.id}`] = getCachedRect(`title-${item.id}`) || null
      setCapturedRects(rects)
    }, 10)
  }

  return (
    <div className="p-8">
      <div className="mb-3 text-sm text-gray-500">
        <span className="text-green-600 font-medium">✅ 推荐</span>：列表中每个卡片一个 Group
        <div className="text-xs text-gray-400 mt-1">
          点击卡片只捕获该卡片内的元素，性能更优
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <ViewTransitionStartGroup 
              ref={(r: ViewTransitionStartGroupRef | null) => { groupRefs.current[item.id] = r }}
              mode="click"
            >
              <div 
                className={`rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-2 ${lastClicked === item.id ? 'border-blue-500' : 'border-gray-200'}`}
                onClick={() => handleItemClick(item)}
              >
                <ViewTransitionStart id={item.id}>
                  <img 
                    className="w-full h-24 object-cover" 
                    src={item.src} 
                    alt={item.title}
                  />
                </ViewTransitionStart>
                <div className="p-2 bg-white">
                  <ViewTransitionStart id={`title-${item.id}`}>
                    <div className="text-sm text-gray-700 font-medium">{item.title}</div>
                  </ViewTransitionStart>
                </div>
              </div>
            </ViewTransitionStartGroup>
            
            {lastClicked === item.id && (
              <div className="space-y-1">
                <PositionInfo rect={capturedRects[item.id] || null} label="图片" />
                <PositionInfo rect={capturedRects[`title-${item.id}`] || null} label="标题" />
              </div>
            )}
          </div>
        ))}
      </div>

      {lastClicked && (
        <div className="mt-3 text-green-500 text-sm">
          ✓ 点击了 {lastClicked}，仅捕获该卡片的 2 个元素
        </div>
      )}
    </div>
  )
}

// 列表中使用 - 单个 Group 包裹整个列表（适用于视图切换场景）
function SingleGroupListDemo() {
  const groupRef = useRef<ViewTransitionStartGroupRef>(null)
  const [capturedRects, setCapturedRects] = useState<Record<string, RectCache | null>>({})
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleViewChange = () => {
    // 切换视图前捕获所有元素位置
    groupRef.current?.captureAll()
    
    setTimeout(() => {
      const rects: Record<string, RectCache | null> = {}
      items.forEach(item => {
        rects[item.id] = getCachedRect(item.id) || null
      })
      setCapturedRects(rects)
    }, 10)
    
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid')
  }

  const capturedCount = Object.keys(capturedRects).length

  return (
    <div className="p-8">
      <div className="mb-3 text-sm text-gray-500">
        <span className="text-orange-500 font-medium">⚠️ 特定场景</span>：单个 Group 包裹整个列表
        <div className="text-xs text-gray-400 mt-1">
          适用于 Grid/List 视图切换等需要一次性捕获所有元素的场景
        </div>
      </div>
      
      <div className="mb-3 flex items-center gap-2">
        <button 
          onClick={handleViewChange}
          className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 flex items-center gap-1"
        >
          {viewMode === 'grid' ? '切换列表视图' : '切换网格视图'}
        </button>
        <span className="text-xs text-gray-400">
          (切换时捕获全部 {items.length} 个元素)
        </span>
      </div>
      
      <ViewTransitionStartGroup ref={groupRef} mode="click">
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-2'}>
          {items.map((item) => (
            <div 
              key={item.id} 
              className={`rounded-lg overflow-hidden border border-gray-200 ${viewMode === 'list' ? 'flex items-center' : ''}`}
            >
              <ViewTransitionStart id={item.id}>
                <img 
                  className={viewMode === 'grid' ? 'w-full h-20 object-cover' : 'w-16 h-16 object-cover'} 
                  src={item.src} 
                  alt={item.title}
                />
              </ViewTransitionStart>
              <div className={viewMode === 'grid' ? 'p-2 bg-white text-sm' : 'px-3 text-sm'}>
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </ViewTransitionStartGroup>

      {capturedCount > 0 && (
        <div className="mt-3 space-y-2">
          <div className="text-orange-500 text-sm">
            ⚠️ 已捕获全部 {capturedCount} 个元素位置
          </div>
          <div className="grid grid-cols-2 gap-2">
            {items.map(item => (
              capturedRects[item.id] && (
                <PositionInfo key={item.id} rect={capturedRects[item.id]} label={item.title} />
              )
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
        <div className="text-orange-700 text-xs font-medium mb-1">⚠️ 性能注意</div>
        <div className="text-orange-600 text-xs">
          此用法会一次性捕获列表中所有元素位置。长列表（如 100+ 项）可能导致性能问题，建议仅用于：
          <ul className="mt-1 ml-3 list-disc">
            <li>Grid/List 视图切换</li>
            <li>排序动画</li>
            <li>少量固定元素的批量操作</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-blue-700 text-xs font-medium mb-1">💡 完整案例</div>
        <div className="text-blue-600 text-xs">
          此处仅展示 <code className="bg-blue-100 px-1 rounded">ViewTransitionStartGroup</code> 的位置捕获，
          未结合 <code className="bg-blue-100 px-1 rounded">ViewTransitionEndGroup</code> 实现完整过渡动画。
          <div className="mt-2">
            👉 查看完整 Grid/List 切换案例：
            <a 
              href="?path=/story/examples-viewtransition-listchange--default" 
              className="text-blue-700 underline ml-1 font-medium"
              target="_blank"
            >
              GoodsListChange 示例
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClickModeDemo() {
  const groupRefs = useRef<Record<string, ViewTransitionStartGroupRef | null>>({})
  const [capturedRects, setCapturedRects] = useState<Record<string, RectCache | null>>({})
  const [lastClicked, setLastClicked] = useState<string | null>(null)

  const handleItemClick = (item: typeof items[0]) => {
    groupRefs.current[item.id]?.captureAll()
    setLastClicked(item.id)
    setTimeout(() => {
      const rects: Record<string, RectCache | null> = {}
      rects[item.id] = getCachedRect(item.id) || null
      rects[`title-${item.id}`] = getCachedRect(`title-${item.id}`) || null
      setCapturedRects(rects)
    }, 10)
  }

  return (
    <div className="p-8">
      <div className="mb-3 text-sm text-gray-500">
        Click 模式：点击卡片时捕获该卡片内所有元素位置
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <ViewTransitionStartGroup 
            key={item.id}
            ref={(r: ViewTransitionStartGroupRef | null) => { groupRefs.current[item.id] = r }}
            mode="click"
          >
            <div className="space-y-2">
              <div 
                className={`rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border-2 ${lastClicked === item.id ? 'border-blue-500' : 'border-gray-200 hover:border-blue-400'}`}
                onClick={() => handleItemClick(item)}
              >
                <ViewTransitionStart id={item.id}>
                  <img 
                    className="w-full h-24 object-cover" 
                    src={item.src} 
                    alt={item.title}
                  />
                </ViewTransitionStart>
                <div className="p-2 bg-white">
                  <ViewTransitionStart id={`title-${item.id}`}>
                    <div className="text-sm text-gray-700">{item.title}</div>
                  </ViewTransitionStart>
                </div>
              </div>
              {lastClicked === item.id && (
                <div className="space-y-1">
                  <PositionInfo rect={capturedRects[item.id] || null} label="图片" />
                  <PositionInfo rect={capturedRects[`title-${item.id}`] || null} label="标题" />
                </div>
              )}
            </div>
          </ViewTransitionStartGroup>
        ))}
      </div>

      {lastClicked && (
        <div className="mt-3 text-green-500 text-sm">
          ✓ 点击了 {lastClicked}，已捕获该卡片的 2 个元素
        </div>
      )}
    </div>
  )
}

function ObserveModeDemo() {
  const [capturedRects, setCapturedRects] = useState<Record<string, RectCache | null>>({})
  const [captureCount, setCaptureCount] = useState(0)

  // 轮询检查位置是否被捕获
  useEffect(() => {
    const interval = setInterval(() => {
      const rects: Record<string, RectCache | null> = {}
      let hasNew = false
      items.forEach(item => {
        const id = `observe-${item.id}`
        const rect = getCachedRect(id)
        if (rect) {
          rects[id] = rect
          hasNew = true
        }
      })
      if (hasNew) {
        setCapturedRects((prev: Record<string, RectCache | null>) => {
          // 检查是否有位置变化
          const changed = Object.keys(rects).some(id => {
            const newRect = rects[id]
            const oldRect = prev[id]
            return !oldRect || (newRect && (oldRect.y !== newRect.y))
          })
          if (changed) {
            setCaptureCount(c => c + 1)
          }
          return rects
        })
      }
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const capturedCount = Object.keys(capturedRects).length

  return (
    <div className="p-8">
      <div className="mb-3 text-sm text-gray-500">
        Observe 模式：元素可见时自动捕获位置，滚动时持续更新
      </div>
      
      <ViewTransitionStartGroup mode="observe">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => {
            const id = `observe-${item.id}`
            return (
              <div key={item.id} className="space-y-2">
                <ViewTransitionStart id={id}>
                  <div className="rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <img 
                      className="w-full h-24 object-cover" 
                      src={item.src} 
                      alt={item.title}
                    />
                    <div className="p-2 text-sm text-gray-700">{item.title}</div>
                  </div>
                </ViewTransitionStart>
                {capturedRects[id] && (
                  <PositionInfo rect={capturedRects[id]} label={item.title} />
                )}
              </div>
            )
          })}
        </div>
      </ViewTransitionStartGroup>

      {capturedCount > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-green-500 text-sm">✓ 已捕获 {capturedCount} 个元素</span>
          <span className="text-gray-400 text-xs">（更新次数: {captureCount}）</span>
        </div>
      )}
    </div>
  )
}

const meta: Meta<typeof ViewTransitionStartGroup> = {
  title: 'Components/ViewTransitionStartGroup',
  component: ViewTransitionStartGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
视图过渡动画起始位置的分组容器，用于批量管理多个 ViewTransitionStart 组件。

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactNode | - | 子元素，通常是多个 ViewTransitionStart |
| mode | 'click' \\| 'observe' | 'click' | 组内元素的位置捕获模式 |

### Ref Methods

| 方法 | 说明 |
|------|------|
| captureAll() | 批量捕获组内所有元素的位置 |

### 使用场景

- **列表场景**: 管理多个可点击的列表项
- **卡片网格**: 管理多个卡片的过渡动画起始位置
- **画廊视图**: 批量管理图片缩略图位置
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: ['click', 'observe'],
      description: '组内元素的位置捕获模式',
      table: {
        type: { summary: "'click' | 'observe'" },
        defaultValue: { summary: 'click' },
      },
    },
    children: {
      control: false,
      description: '子元素，通常是多个 ViewTransitionStart',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '单个 Group 用法',
  tags: ['!dev'],
  render: () => <BasicDemo />,
}

export const ListUsage: Story = {
  name: '列表中使用（推荐）',
  tags: ['!dev'],
  render: () => <ListUsageDemo />,
}

export const SingleGroupList: Story = {
  name: '视图切换场景',
  tags: ['!dev'],
  render: () => <SingleGroupListDemo />,
}

export const ClickMode: Story = {
  name: 'Click 模式',
  tags: ['!dev'],
  render: () => <ClickModeDemo />,
}

export const ObserveMode: Story = {
  name: 'Observe 模式',
  tags: ['!dev'],
  render: () => <ObserveModeDemo />,
}
