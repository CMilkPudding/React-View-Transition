import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import ViewTransitionStart from '@/Start'
import ViewTransitionStartGroup from '@/Start/Group'
import type { ViewTransitionStartGroupRef } from '@/Start/Group'
import ViewTransitionEnd from '@/End'
import ViewTransitionEndGroup from '@/End/Group'
import type { ViewTransitionEndGroupRef } from '@/End/Group'
import Modal, { ModalRef } from '../../components/Modal'

/**
 * # ViewTransitionEndGroup
 * 
 * 视图过渡动画结束位置的分组容器，用于批量管理多个 `ViewTransitionEnd` 组件。
 * 
 * ## 功能特点
 * - 统一管理组内所有 `ViewTransitionEnd` 的动画配置
 * - 提供 `showAll` 和 `closeAll` 方法批量控制动画
 * - 支持 `observe` 模式自动播放显示动画
 * - 统一的关闭回调处理
 * 
 * ## 基本用法
 * ```tsx
 * <ViewTransitionEndGroup 
 *   ref={groupRef} 
 *   duration={800} 
 *   endDuration={600}
 *   onClosed={() => console.log('所有动画结束')}
 * >
 *   <ViewTransitionEnd id="item-1">
 *     <img src="..." />
 *   </ViewTransitionEnd>
 *   <ViewTransitionEnd id="item-2">
 *     <div>...</div>
 *   </ViewTransitionEnd>
 * </ViewTransitionEndGroup>
 * ```
 */

const items = [
  { id: 'eg-1', src: 'https://picsum.photos/seed/eg1/300/200', title: '风景 1' },
  { id: 'eg-2', src: 'https://picsum.photos/seed/eg2/300/200', title: '风景 2' },
  { id: 'eg-3', src: 'https://picsum.photos/seed/eg3/300/200', title: '风景 3' },
  { id: 'eg-4', src: 'https://picsum.photos/seed/eg4/300/200', title: '风景 4' },
]

function BasicDemo({ duration = 800, endDuration = 600 }) {
  const [activeItem, setActiveItem] = useState<typeof items[0] | null>(null)
  const [contentVisible, setContentVisible] = useState(false)
  const modalRef = useRef<ModalRef>(null)
  const startGroupRefs = useRef<Record<string, ViewTransitionStartGroupRef | null>>({})
  const endGroupRef = useRef<ViewTransitionEndGroupRef>(null)

  const handleSelect = (item: typeof items[0]) => {
    setActiveItem(item)
    setContentVisible(false)

    startGroupRefs.current[item.id]?.captureAll()
    modalRef.current?.show()
    
    // 延迟显示内容，配合动画
    requestAnimationFrame(() => {
      setContentVisible(true)
    })
  }

  const handleClose = () => {
    setContentVisible(false)
    modalRef.current?.close()
    endGroupRef.current?.closeAll()
  }

  const handleClosed = () => {
    setActiveItem(null)
  }

  return (
    <div className="p-8">
      <div className="mb-4 text-sm text-gray-500">
        使用 ViewTransitionEndGroup 批量管理多个过渡动画元素
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {items.map((item) => (
          <ViewTransitionStartGroup
            key={item.id}
            ref={(r: ViewTransitionStartGroupRef | null) => { startGroupRefs.current[item.id] = r }}
            mode="click"
          >
            <div
              className="rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSelect(item)}
            >
              <ViewTransitionStart id={item.id}>
                <img
                  className="w-full h-28 object-cover"
                  src={item.src}
                  alt={item.title}
                />
              </ViewTransitionStart>
              <ViewTransitionStart id={`title-${item.id}`}>
                <div className="p-2 bg-white text-sm text-gray-700 font-medium">
                  {item.title}
                </div>
              </ViewTransitionStart>
            </div>
          </ViewTransitionStartGroup>
        ))}
      </div>

      <Modal ref={modalRef} clickClose={false} onClose={handleClose} durationOut={endDuration}>
        <div
          className="absolute inset-0 flex items-center justify-center p-8"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white overflow-hidden transition-opacity p-8"
            style={{
              opacity: contentVisible ? 1 : 0,
              transitionDuration: `${duration}ms`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 图片占位容器 - 固定高度防止布局跳动 */}
            <div className="relative w-full h-64 bg-gray-50">
              <ViewTransitionEndGroup
                ref={endGroupRef}
                duration={duration}
                endDuration={endDuration}
                onClosed={handleClosed}
              >
                <ViewTransitionEnd id={activeItem?.id}>
                  <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={activeItem?.src}
                    alt={activeItem?.title}
                  />
                </ViewTransitionEnd>
              </ViewTransitionEndGroup>
            </div>
            {/* 内容区域 - 固定结构 */}
            <div className="">
              <ViewTransitionEndGroup
                duration={duration}
                endDuration={endDuration}
              >
                <ViewTransitionEnd id={`title-${activeItem?.id}`}>
                  <div className="text-xl font-bold text-gray-800 min-h-[1.75rem]">
                    {activeItem?.title}
                  </div>
                </ViewTransitionEnd>
              </ViewTransitionEndGroup>
              <div className="mt-2 text-gray-600">
                这是详情内容区域，展示了 ViewTransitionEndGroup 如何批量管理多个过渡动画元素。
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        >
          ×
        </button>
      </Modal>
    </div>
  )
}

function ShowModeDemo() {
  const [activeItem, setActiveItem] = useState<typeof items[0] | null>(null)
  const [showMode, setShowMode] = useState<'observe' | 'call'>('observe')
  const modalRef = useRef<ModalRef>(null)
  const startGroupRefs = useRef<Record<string, ViewTransitionStartGroupRef | null>>({})
  const endGroupRef = useRef<ViewTransitionEndGroupRef>(null)

  const handleSelect = (item: typeof items[0]) => {
    setActiveItem(item)
    modalRef.current?.show()
    startGroupRefs.current[item.id]?.captureAll()

    // call 模式需要手动调用 showAll
    if (showMode === 'call') {
      setTimeout(() => {
        endGroupRef.current?.showAll()
      }, 50)
    }
  }

  const handleClose = () => {
    modalRef.current?.close()
    endGroupRef.current?.closeAll()
  }

  return (
    <div className="p-8">
      <div className="mb-4 text-sm text-gray-500">
        showMode 控制组内动画的触发方式
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setShowMode('observe')}
          className={`px-3 py-1 rounded ${showMode === 'observe' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          observe (自动)
        </button>
        <button
          onClick={() => setShowMode('call')}
          className={`px-3 py-1 rounded ${showMode === 'call' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          call (手动)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {items.slice(0, 2).map((item) => (
          <ViewTransitionStartGroup
            key={item.id}
            ref={(r: ViewTransitionStartGroupRef | null) => { startGroupRefs.current[item.id] = r }}
            mode="click"
          >
            <div
              className="rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSelect(item)}
            >
              <ViewTransitionStart id={`mode-${item.id}`}>
                <img
                  className="w-full h-28 object-cover"
                  src={item.src}
                  alt={item.title}
                />
              </ViewTransitionStart>
            </div>
          </ViewTransitionStartGroup>
        ))}
      </div>

      <Modal ref={modalRef} clickClose={false} durationOut={600}>
        <div
          className="absolute inset-0 flex items-center justify-center p-8"
          onClick={handleClose}
        >
          <ViewTransitionEndGroup
            ref={endGroupRef}
            showMode={showMode}
            duration={800}
            endDuration={600}
            onClosed={() => setActiveItem(null)}
          >
            <div
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <ViewTransitionEnd id={`mode-${activeItem?.id}`}>
                <img
                  className="w-full h-80 object-cover rounded-2xl"
                  src={activeItem?.src}
                  alt={activeItem?.title}
                />
              </ViewTransitionEnd>
            </div>
          </ViewTransitionEndGroup>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        >
          ×
        </button>
      </Modal>
    </div>
  )
}

function DurationDemo() {
  const [duration, setDuration] = useState(800)
  const [endDuration, setEndDuration] = useState(600)
  const [activeItem, setActiveItem] = useState<typeof items[0] | null>(null)
  const modalRef = useRef<ModalRef>(null)
  const startGroupRefs = useRef<Record<string, ViewTransitionStartGroupRef | null>>({})
  const endGroupRef = useRef<ViewTransitionEndGroupRef>(null)

  const handleSelect = (item: typeof items[0]) => {
    setActiveItem(item)
    modalRef.current?.show()
    startGroupRefs.current[item.id]?.captureAll()
  }

  const handleClose = () => {
    modalRef.current?.close()
    endGroupRef.current?.closeAll()
  }

  return (
    <div className="p-8">
      <div className="mb-4 text-sm text-gray-500">
        自定义动画持续时间
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2">
          <label className="text-sm w-32">开始动画时长:</label>
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm w-16">{duration}ms</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm w-32">结束动画时长:</label>
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={endDuration}
            onChange={(e) => setEndDuration(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm w-16">{endDuration}ms</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {items.slice(0, 2).map((item) => (
          <ViewTransitionStartGroup
            key={item.id}
            ref={(r: ViewTransitionStartGroupRef | null) => { startGroupRefs.current[item.id] = r }}
            mode="click"
          >
            <div
              className="rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSelect(item)}
            >
              <ViewTransitionStart id={`dur-${item.id}`}>
                <img
                  className="w-full h-28 object-cover"
                  src={item.src}
                  alt={item.title}
                />
              </ViewTransitionStart>
            </div>
          </ViewTransitionStartGroup>
        ))}
      </div>

      <Modal ref={modalRef} clickClose={false} durationOut={endDuration}>
        <div
          className="absolute inset-0 flex items-center justify-center p-8"
          onClick={handleClose}
        >
          <ViewTransitionEndGroup
            ref={endGroupRef}
            duration={duration}
            endDuration={endDuration}
            onClosed={() => setActiveItem(null)}
          >
            <div
              className="w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <ViewTransitionEnd id={`dur-${activeItem?.id}`}>
                <img
                  className="w-full h-80 object-cover rounded-2xl"
                  src={activeItem?.src}
                  alt={activeItem?.title}
                />
              </ViewTransitionEnd>
            </div>
          </ViewTransitionEndGroup>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
        >
          ×
        </button>
      </Modal>
    </div>
  )
}

const meta: Meta<typeof ViewTransitionEndGroup> = {
  title: 'Components/ViewTransitionEndGroup',
  component: ViewTransitionEndGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
视图过渡动画结束位置的分组容器，用于批量管理多个 ViewTransitionEnd 组件。

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactNode | - | 子元素，通常是多个 ViewTransitionEnd |
| showMode | 'observe' \\| 'call' | 'observe' | 显示动画触发模式 |
| duration | number | 800 | 开始动画持续时间(ms) |
| endDuration | number | 800 | 结束动画持续时间(ms) |
| onClosed | () => void | - | 所有关闭动画完成后的回调 |

### Ref Methods

| 方法 | 说明 |
|------|------|
| showAll() | 批量触发组内所有元素的显示动画 |
| closeAll() | 批量触发组内所有元素的关闭动画 |

### showMode 说明

- **observe**: 组件挂载后自动播放所有显示动画（默认）
- **call**: 需要手动调用 ref.showAll() 触发显示动画

### 使用场景

- **详情页展示**: 图片和标题同时执行过渡动画
- **卡片展开**: 多个元素协同动画
- **画廊预览**: 批量管理图片和描述的过渡效果
        `,
      },
    },
  },
  argTypes: {
    showMode: {
      control: 'radio',
      options: ['observe', 'call'],
      description: '显示动画触发模式',
      table: {
        type: { summary: "'observe' | 'call'" },
        defaultValue: { summary: 'observe' },
      },
    },
    duration: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: '开始动画持续时间(ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '800' },
      },
    },
    endDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: '结束动画持续时间(ms)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '800' },
      },
    },
    onClosed: {
      action: 'onClosed',
      description: '所有关闭动画完成后的回调',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: false,
      description: '子元素，通常是多个 ViewTransitionEnd',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  name: '基础用法',
  tags: ['!dev'],
  render: () => <BasicDemo />,
  args: {
    duration: 800,
    endDuration: 600,
  },
}

export const ShowMode: Story = {
  name: '显示模式',
  tags: ['!dev'],
  render: () => <ShowModeDemo />,
}

export const Duration: Story = {
  name: '自定义动画时长',
  tags: ['!dev'],
  render: () => <DurationDemo />,
}
