



import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useRef, useState } from 'react';
import ViewTransitionStart from '../Start';
import ViewTransitionEnd from '../End';

const data = {
    id: 106,
    src: `https://picsum.photos/seed/${Math.random()}/200/200`,
}

type CompProps = {
    duration?: number;
    endDuration?: number;
}

function DemoComponent({
    duration,
    endDuration
}: CompProps) {
      const items = useMemo<any[]>(
        () =>
          Array.from({ length: 34 }, (_, i) => {
            const id = 'sing-item' + i
            return {
              id,
              title: `这是标题 ${i + 1}`,
              src: `https://picsum.photos/seed/${id}/320/240`,
            }
          }),
        []
      )

    const [show, setShow] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const onClickItem = item => {
        if(!item) return

        setShow(true)
        setSelectedItem(item)
    }

    const endRef = useRef(null)
    const onClickMask = () => {
        endRef.current?.close?.()
    }
    return <div className='min-h-[100dvh] p-4'>
        <div className='mb-4 text-gray-400'>点击图片，查看大图</div>
        <div className="wrapper grid gap-4 grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
           {
            items.map(item => <div className='item'>
                <ViewTransitionStart id={item.id} onClick={() => onClickItem(item)}>
                    <img className="rounded-xl w-full" src={item.src} />
                </ViewTransitionStart>
            </div>)
           } 
            
        </div>

        {show && (
            <div className='fixed inset-0 z-20 bg-dark-800 bg-opacity-80' onClick={onClickMask}>
                <div className='fixed left-[10%] top-[10%] w-[80%] bottom-[10%]'>
                    <ViewTransitionEnd
                        ref={endRef}
                        id={selectedItem?.id}
                        onClosed={() => setShow(false)}
                        duration={duration}
                        endDuration={endDuration} >
                        <img className='rounded-xl w-full h-full' src={selectedItem?.src} />
                    </ViewTransitionEnd>
                </div>
            </div>
        )}
    </div>
}

const meta = {
    title: 'Examples/ViewTransition Base',
    component: DemoComponent,
   parameters: {
        layout: 'fullscreen',
    },
    // tags: ['autodocs'],
} satisfies Meta<typeof DemoComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ImgPreivew: Story = {
    name: '图片预览',
    args: {
        duration: 800,
        endDuration: 800
    },
};



