import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import ViewTransitionStart from '@/Start'
import ViewTransitionEnd from '@/End'
import type { ViewTransitionEnRef } from '@/End'
import Modal, { ModalRef } from '../../components/Modal'

/**
 * # ViewTransitionEnd
 * 
 * 视图过渡动画的结束位置组件，与 `ViewTransitionStart` 配合使用，实现元素的 FLIP 动画效果。
 * 
 * ## 功能特点
 * - 通过 `id` 与 `ViewTransitionStart` 关联，自动计算位置差异
 * - 支持 `observe` 和 `call` 两种显示模式
 * - 支持自定义开始和结束动画时长
 * - 支持多种动画类型：all、position、font
 * 
 * ## 基本用法
 * ```tsx
 * <ViewTransitionEnd 
 *   id="item-1" 
 *   duration={800} 
 *   endDuration={600}
 *   onClosed={() => console.log('动画结束')}
 * >
 *   <img src="..." alt="..." />
 * </ViewTransitionEnd>
 * ```
 */

const demoItem = {
  id: 'end-demo-1',
  src: 'https://picsum.photos/seed/enddemo/400/300',
  title: 'Demo Image',
}

function BasicDemo({ duration = 800, endDuration = 600 }) {
  const [showDetail, setShowDetail] = useState(false)
  const modalRef = useRef<ModalRef>(null)
  const endRef = useRef<ViewTransitionEnRef>(null)

  const handleOpen = () => {
    setShowDetail(true)
    modalRef.current?.show()
  }

  const handleClose = () => {
    modalRef.current?.close()
    endRef.current?.close()
  }

  const handleClosed = () => {
    setShowDetail(false)
  }

  return (
    <div className="p-8">
      <div className="mb-4 text-sm text-gray-500">
        点击图片查看过渡动画效果
      </div>

      <ViewTransitionStart id={demoItem.id} mode="click" onClick={handleOpen}>
        <div className="w-48 h-36 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
          <img
            className="w-full h-full object-cover"
            src={demoItem.src}
            alt={demoItem.title}
          />
        </div>
      </ViewTransitionStart>

      <Modal ref={modalRef} clickClose={false} durationOut={endDuration}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="w-[80%] h-[70%]" onClick={(e) => e.stopPropagation()}>
            <ViewTransitionEnd
              ref={endRef}
              id={demoItem.id}
              duration={duration}
              endDuration={endDuration}
              onClosed={handleClosed}
            >
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={demoItem.src}
                alt={demoItem.title}
              />
            </ViewTransitionEnd>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
        >
          ×
        </button>
      </Modal>
    </div>
  )
}

function AnimationTypeDemo() {
  const items = [
    { id: 'anim-all', type: 'all' as const, label: 'All', desc: '位置和字体大小变化' },
    { id: 'anim-pos', type: 'position' as const, label: 'Position', desc: '仅位置变化' },
    // { id: 'anim-font', type: 'font' as const, label: 'Font (字体)' },
  ]

  const [activeItem, setActiveItem] = useState<typeof items[0] | null>(null)
  const modalRef = useRef<ModalRef>(null)
  const endRef = useRef<ViewTransitionEnRef>(null)

  const handleOpen = (item: typeof items[0]) => {
    setActiveItem(item)
    modalRef.current?.show()
  }

  const handleClose = () => {
    modalRef.current?.close()
    endRef.current?.close()
  }

  return (
    <div className="p-8">
      <div className="mb-4 text-sm text-gray-500">
        不同的 animationType 效果展示
      </div>

      <div className="flex gap-4">
        {items.map((item) => (
          <div key={item.id}>
            <ViewTransitionStart
              key={item.id}
              id={item.id}
              mode="click"
              onClick={() => handleOpen(item)}
            >
              <div className="w-32 h-24 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-sm font-medium">{item.label}</span>
              </div>
            </ViewTransitionStart>
            <div className='text-center mt-1 text-gray-500 text-xs'>{item.desc}</div>
          </div>
        ))}
      </div>

      <Modal ref={modalRef} clickClose={false} durationOut={600}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="w-[60%] h-[50%]" onClick={(e) => e.stopPropagation()}>
            {activeItem && (
              <ViewTransitionEnd
                ref={endRef}
                id={activeItem.id}
                duration={800}
                endDuration={600}
                animationType={activeItem.type}
                onClosed={() => setActiveItem(null)}
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-50px font-bold">
                  {activeItem.label}
                </div>
              </ViewTransitionEnd>
            )}
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
        >
          ×
        </button>
      </Modal>
    </div>
  )
}

function ShowModeDemo() {
  const [activeMode, setActiveMode] = useState<'observe' | 'call'>('observe')
  const [showDetail, setShowDetail] = useState(false)
  const modalRef = useRef<ModalRef>(null)
  const endRef = useRef<ViewTransitionEnRef>(null)

  const handleOpen = () => {
    setShowDetail(true)
    modalRef.current?.show()

    // call 模式需要手动调用 show
    if (activeMode === 'call') {
      setTimeout(() => {
        endRef.current?.show()
      }, 50)
    }
  }

  const handleClose = () => {
    modalRef.current?.close()
    endRef.current?.close()
  }

  return (
    <div className="p-8">
      <div className="mb-4 text-sm text-gray-500">
        showMode 控制动画触发方式
      </div>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setActiveMode('observe')}
          className={`px-3 py-1 rounded ${activeMode === 'observe' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          observe (自动)
        </button>
        <button
          onClick={() => setActiveMode('call')}
          className={`px-3 py-1 rounded ${activeMode === 'call' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          call (手动)
        </button>
      </div>

      <ViewTransitionStart id="showmode-demo" mode="click" onClick={handleOpen}>
        <div className="w-48 h-36 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
          <img
            className="w-full h-full object-cover"
            src="https://picsum.photos/seed/showmode/400/300"
            alt="Demo"
          />
        </div>
      </ViewTransitionStart>

      <Modal ref={modalRef} clickClose={false} durationOut={600}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={handleClose}
        >
          <div className="w-[80%] h-[70%]" onClick={(e) => e.stopPropagation()}>
            <ViewTransitionEnd
              ref={endRef}
              id="showmode-demo"
              duration={800}
              endDuration={600}
              showMode={activeMode}
              onClosed={() => setShowDetail(false)}
            >
              <img
                className="w-full h-full object-cover rounded-2xl"
                src="https://picsum.photos/seed/showmode/400/300"
                alt="Demo"
              />
            </ViewTransitionEnd>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
        >
          ×
        </button>
      </Modal>
    </div>
  )
}

const meta: Meta<typeof ViewTransitionEnd> = {
  title: 'Components/ViewTransitionEnd',
  component: ViewTransitionEnd,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
视图过渡动画的结束位置组件，与 ViewTransitionStart 配合使用，实现元素的 FLIP 动画效果。

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactElement | - | 子元素，仅支持单个根元素 |
| id | string \\| number | - | 唯一标识，与 ViewTransitionStart 的 id 对应 |
| duration | number | 800 | 开始动画持续时间(ms) |
| endDuration | number | 800 | 结束动画持续时间(ms) |
| showMode | 'observe' \\| 'call' | 'observe' | 显示动画触发模式 |
| animationType | 'all' \\| 'position' | 'all' | 动画类型 |
| onShow | () => void | - | 显示动画完成回调 |
| onClosed | () => void | - | 关闭动画完成回调 |

### Ref Methods

| 方法 | 说明 |
|------|------|
| show() | 手动触发显示动画 |
| close() | 手动触发关闭动画 |

### showMode 说明

- **observe**: 组件挂载后自动播放显示动画（默认）
- **call**: 需要手动调用 ref.show() 触发显示动画

### animationType 说明

- **all**: 同时动画位置和字体大小（默认）
- **position**: 仅动画位置变化
        `,
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: '唯一标识，与 ViewTransitionStart 的 id 对应',
      table: {
        type: { summary: 'string | number' },
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
    showMode: {
      control: 'radio',
      options: ['observe', 'call'],
      description: '显示动画触发模式',
      table: {
        type: { summary: "'observe' | 'call'" },
        defaultValue: { summary: 'observe' },
      },
    },
    animationType: {
      control: 'radio',
      options: ['all', 'position'],
      description: '动画类型',
      table: {
        type: { summary: "'all' | 'position'" },
        defaultValue: { summary: 'all' },
      },
    },
    onShow: {
      action: 'onShow',
      description: '显示动画完成回调',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClosed: {
      action: 'onClosed',
      description: '关闭动画完成回调',
      table: {
        type: { summary: '() => void' },
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
  name: '基础用法',
  tags: ['!dev'],
  render: () => <BasicDemo />,
  args: {
    duration: 800,
    endDuration: 600,
  },
}

export const AnimationType: Story = {
  name: '动画类型',
  tags: ['!dev'],
  render: () => <AnimationTypeDemo />,
}

export const ShowMode: Story = {
  name: '显示模式',
  tags: ['!dev'],
  render: () => <ShowModeDemo />,
}
