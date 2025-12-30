



import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useMemo, useRef, useState } from 'react'
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

type CompProps = {
    duration?: number;
    endDuration?: number;
}

function DemoComponent({
    duration = 800,
    endDuration = 800
}: CompProps) {
    const items = useMemo<Item[]>(
        () =>
            Array.from({ length: 12 }, (_, i) => {
                const id = `item-${i + 1}`
                return {
                    id,
                    title: `This Is The Title ${i + 1}`,
                    src: `https://picsum.photos/seed/${id}/320/240`,
                }
            }),
        []
    )

    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [detailTextVisible, setDetailTextVisible] = useState(false)

    const onSelect = (item: Item) => {
        setSelectedItem(item)
    }

    const transitionEndGroupRef = useRef<ViewTransitionEndGroupRef | null>(null)
    const onClose = () => {
        setDetailTextVisible(false)
        transitionEndGroupRef.current?.closeAll()
    }

    const onClosed = () => {
        setSelectedItem(null)
        setDetailTextVisible(false)
    }

    const noScrollbar = '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    const activeItem = selectedItem

    useEffect(() => {
        if (!activeItem) {
            setDetailTextVisible(false)
            return
        }

        setDetailTextVisible(false)
        const raf = requestAnimationFrame(() => setDetailTextVisible(true))
        return () => cancelAnimationFrame(raf)
    }, [activeItem?.id])

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
                                        {/* <ViewTransitionStart id={`card-${item.id}`}> */}
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
                                        {/* </ViewTransitionStart> */}
                                    </ViewTransitionStartGroup>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {activeItem && (
                    <div className="fixed left-0 top-0 right-0 bottom-0 inset-0 bg-white bg-opacity-800 p-4 z-9">
                         <div onClick={onClose} className='absolute left-4 top-4 cursor-pointer text-34px text-gray-600'>×</div>
                         
                        <div className='w-[70%] mt-[15%] h-[70vh] overflow-auto mx-auto flex flex-wrap items-stretch relative' onClick={(e) => e.stopPropagation()}>
                           
                           <div className='w-full h-full flex flex-wrap relative'>
                            <ViewTransitionEndGroup
                                ref={transitionEndGroupRef}
                                duration={duration}
                                endDuration={endDuration}
                                onClosed={onClosed}
                            >
                                <div className="w-3/5 flex-grow-1 h-full">
                                    <ViewTransitionEnd id={activeItem.id}>
                                        <img className="rounded-xl w-full h-full object-cover" src={activeItem.src} alt={activeItem.title} />
                                    </ViewTransitionEnd>
                                </div>

                                
                                <div className='w-2/5 relative p-4 flex flex-col items-center'>
                                 <ViewTransitionEnd id={`title-${activeItem.id}`} animationType='all'>
                                        <div className="min-h-48px w-[5/2] text-base font-semibold text-green-500 text-48px relative -left-1/3 z-30 truncate">{activeItem.title}</div>
                                    </ViewTransitionEnd>
                                    <div
                                        className={
                                            'mt-6 w-full h-full overflow-auto  leading-relaxed text-dark-500 transition-all duration-200 ease-out delay-100 ' +
                                            (detailTextVisible ? 'opacity-100' : 'opacity-0')
                                        }
                                    >
                                        <p className='mt-4'>This panel shows the selected item detail. Close to play the reverse FLIP animation.</p>
                                        <p>This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.</p>
                                    </div>
                                </div>
                            </ViewTransitionEndGroup>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const meta = {
    title: 'Examples/ViewTransition Group',
    component: DemoComponent,
    parameters: {
        layout: 'fullscreen',
    },
    // tags: ['autodocs'],
} satisfies Meta<typeof DemoComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        duration: 800,
        endDuration: 500
    }
}



