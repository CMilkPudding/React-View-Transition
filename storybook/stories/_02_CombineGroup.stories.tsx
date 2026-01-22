



import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useMemo, useRef, useState } from 'react'
import ViewTransitionStart from '@/Start'
import ViewTransitionStartGroup from '@/Start/Group'
import type { ViewTransitionStartGroupRef } from '@/Start/Group'
import ViewTransitionEnd from '@/End'
import ViewTransitionEndGroup from '@/End/Group'
import type { ViewTransitionEndGroupRef } from '@/End/Group'
import Modal, { ModalRef } from '../components/Modal';

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

    const [activeItem, setActiveItem] = useState<Item | null>(null)
    const [detailTextVisible, setDetailTextVisible] = useState(false)

    const modalRef = useRef<ModalRef>(null)
    const startGroupRef = useRef<ViewTransitionStartGroupRef>(null)
    const endGroupRef = useRef<ViewTransitionEndGroupRef>(null)

    const onSelect = (item: Item) => {
        setActiveItem(item)
        setDetailTextVisible(true)
        modalRef.current?.show()
        startGroupRef.current?.captureAll()


        // 手动调用方式（现已经增加‘observe’模式， 跟随modal显示自动播放显示动画）
        // setTimeout(() => {
        //     console.log('showAll', endGroupRef.current?.showAll)
        //     endGroupRef.current?.showAll()
        // }, 0);
    }


    const onClose = () => {
        setDetailTextVisible(false)
        modalRef.current?.close()
        endGroupRef.current?.closeAll()
    }

    const onClosed = () => {
        setActiveItem(null)
    }

    const noScrollbar = '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

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
                                <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden" onClick={() => onSelect(item)}>
                                    <ViewTransitionStartGroup ref={startGroupRef} mode="click" >
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

                {
                    <Modal ref={modalRef} clickClose={false} bgColor='255, 255, 255' alpha={1} durationIn={duration} durationOut={endDuration}>
                        <div onClick={onClose} className='absolute left-4 top-4 cursor-pointer text-34px text-gray-600'>×</div>

                        {/* 注：外层容器不应溢出截断，否则内容动画元素会被截断 */}
                        <div className='left-[15%] w-[70%] top-[15%] h-[70vh]  mx-auto flex w-full h-full flex absolute'>
                            <ViewTransitionEndGroup
                                ref={endGroupRef}
                                duration={duration}
                                endDuration={endDuration}
                                onClosed={onClosed}
                            >
                                <div className="w-3/5 flex-grow-1 h-full">
                                    <ViewTransitionEnd id={activeItem?.id}>
                                        <img className="rounded-xl w-full h-full object-cover opacity-0" src={activeItem?.src} alt={activeItem?.title} />
                                    </ViewTransitionEnd>
                                </div>

                                {/* 注：外层容器不应溢出截断，否则内容动画元素会被截断 */}
                                <div className='w-2/5 relative p-4 flex flex-col items-center'>
                                    <ViewTransitionEnd id={`title-${activeItem?.id}`} >
                                        <div className="min-h-48px w-full text-base font-semibold text-green-500 text-48px z-30 truncate">{activeItem?.title}</div>
                                    </ViewTransitionEnd>

                                    <div className='w-full mt-4 overflow-hidden border border-solid border-red-500'>
                                        {/* TODO 省略号显示优化... */}
                                        <div
                                            className={
                                                'w-full h-full leading-relaxed text-gray-800 transition-opacity duration-400 ease-out delay-100 ' +
                                                (detailTextVisible ? 'opacity-100' : 'opacity-0')
                                            }
                                        >
                                            This panel shows the selected item detail. Close to play the reverse FLIP animation.
                                            This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.
                                            This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.
                                            This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.This panel shows the selected item detail. Close to play the reverse FLIP animation.
                                        </div>
                                    </div>
                                </div>
                            </ViewTransitionEndGroup>
                        </div>
                    </Modal>
                }
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
        endDuration: 800
    }
}



