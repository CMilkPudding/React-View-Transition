



import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMemo, useRef, useState } from 'react'
import ViewTransitionStart from '../Start'
import ViewTransitionStartGroup from '../Start/Group'
import ViewTransitionEnd from '../End'
import ViewTransitionEndGroup from '../End/Group'
import type { ViewTransitionEndGroupRef } from '../End/Group'

type Item = {
  id: string
  title: string
  src: string
}

function DemoComponent() {
  const items = useMemo<Item[]>(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const id = `item-${i + 1}`
        return {
          id,
          title: `这是标题 ${i + 1}`,
          src: `https://picsum.photos/seed/${id}/320/240`,
        }
      }),
    []
  )

  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const onSelect = (item: Item) => {
    setSelectedItem(item)
  }

  const transitionEndGroupRef = useRef<ViewTransitionEndGroupRef | null>(null)
  const onClose = () => {
    transitionEndGroupRef.current?.closeAll()
  }

  const onClosed = () => {
    setSelectedItem(null)
  }

  const noScrollbar = '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
  const showRight = !!selectedItem
  const activeItem = selectedItem

  return (
    <div className="h-[100dvh] bg-gray-50 p-4">
      <div className="h-full mx-auto max-w-[1200px] bg-white rounded-xl border border-gray-100 shadow-sm flex overflow-hidden">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="h-12 px-4 flex items-center justify-between border-b border-gray-100">
            <div className="text-sm font-semibold text-gray-900">Gallery</div>
            <div className="text-xs text-gray-400">Click an item</div>
          </div>

          <div className={`flex-1 overflow-auto p-4 ${noScrollbar}`}>
            <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <ViewTransitionStartGroup mode="click" onClick={() => onSelect(item)}>
                    <ViewTransitionStart id={`card-${item.id}`}>
                      <div className="cursor-pointer">
                        <ViewTransitionStart id={item.id}>
                            <img className="w-full h-36 object-cover" src={item.src} alt={item.title} />
                        </ViewTransitionStart>
                        <div className="px-3 py-2">
                          <ViewTransitionStart id={`title-${item.id}`}>
                            <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                          </ViewTransitionStart>
                          <div className="mt-0.5 text-xs text-gray-400">Tap to open</div>
                        </div>
                      </div>
                    </ViewTransitionStart>
                  </ViewTransitionStartGroup>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={
            `h-full flex flex-col bg-white overflow-hidden ` +
            `transition-all duration-300 ease-out ` +
            (showRight
              ? 'w-[420px] opacity-100 border-l border-gray-100 pointer-events-auto'
              : 'w-0 opacity-0 border-l-0 pointer-events-none')
          }
        >
          <div className="h-12 px-3 flex items-center justify-between border-b border-gray-100">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-900 truncate">{activeItem?.title ?? ''}</div>
            </div>

            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-500"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className={`flex-1 overflow-auto p-4 ${noScrollbar}`}>
            {activeItem && (
              <ViewTransitionEndGroup
                ref={transitionEndGroupRef}
                duration={800}
                endDuration={800}
                onClosed={onClosed}
              >
                <div className="space-y-3">
                  <ViewTransitionEnd id={activeItem.id}>
                    <div className="w-full rounded-xl bg-gray-100">
                      <img className="w-full h-60 object-cover" src={activeItem.src} alt={activeItem.title} />
                    </div>
                  </ViewTransitionEnd>

                  <ViewTransitionEnd id={`title-${activeItem.id}`}>
                    <div className="text-base font-semibold text-gray-900">{activeItem.title}</div>
                  </ViewTransitionEnd>

                  <div className="text-sm leading-relaxed text-gray-500">
                    This panel shows the selected item detail. Close to play the reverse FLIP animation.
                  </div>
                </div>
              </ViewTransitionEndGroup>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const meta = {
    title: 'Examples/ViewTransition Group2',
    component: DemoComponent,
    parameters: {
        layout: 'fullscreen',
    },
    // tags: ['autodocs'],
} satisfies Meta<typeof DemoComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
}



