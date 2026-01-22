
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMemo, useRef, useState } from 'react'
import ViewTransitionStart from '@/Start'
import ViewTransitionStartGroup from '@/Start/Group'
import type { ViewTransitionStartGroupRef } from '@/Start/Group'
import ViewTransitionEnd from '@/End'
import ViewTransitionEndGroup from '@/End/Group'
import type { ViewTransitionEndGroupRef } from '@/End/Group'
import Modal, { ModalRef } from '../components/Modal';
import clsx from 'clsx'

type Film = {
  id: number
  title: string
  subtitle: string
  likes: number
  image: string
}

type CompProps = {
  duration?: number
  endDuration?: number
}

function DemoComponent({ duration = 650, endDuration = 600 }: CompProps) {
  const films = useMemo<Film[]>(
    () => [
      {
        id: 1,
        title: 'MAPPLETHORPE: LOOK AT THE PICTURES',
        subtitle: 'Documentary · Showing',
        likes: 124,
        image: 'https://picsum.photos/seed/m1/800/500',
      },
      {
        id: 2,
        title: 'CAPTAIN FANTASTIC',
        subtitle: 'Drama · Showing',
        likes: 98,
        image: 'https://picsum.photos/seed/m2/800/500',
      },
      {
        id: 3,
        title: 'THE GREAT WAVE',
        subtitle: 'Action · Coming soon',
        likes: 62,
        image: 'https://picsum.photos/seed/m3/800/500',
      },
    ],
    []
  )

  const [selected, setSelected] = useState<Film | null>(null)
  // 用于控制弹窗中文本过渡动画
  const [isShow, setIsShow] = useState(false)

  const modalRef = useRef<ModalRef>(null)
  const startGroupRef = useRef<ViewTransitionStartGroupRef>(null)
  const endGroupRef = useRef<ViewTransitionEndGroupRef>(null)


  const openDetail = (film: Film) => {
    setIsShow(true)
    setSelected(film)
    modalRef.current?.show()
    startGroupRef.current?.captureAll()
  }
  const closeDetail = () => {
    setIsShow(false)
    modalRef.current?.close()
    endGroupRef.current?.closeAll()
  }

  return (
    <div className="h-[100dvh] bg-gray-100">
      <div className="h-[100dvh] bg-white flex flex-col w-full max-w-[480px] mx-auto">
        <div className="h-14 flex items-center justify-center border-b border-gray-100 bg-gradient-to-b from-white to-gray-50 relative">
          <div className="absolute right-0 top-0 bottom-0 w-11 flex items-center justify-center text-gray-400" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center leading-none">
            S
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="px-4 pt-3 pb-2 text-xs font-semibold text-gray-600 tracking-wide">Trending Films</div>
          <div className="px-3 pb-4 space-y-3">
            {films.map((film, idx) => (
              <div key={film.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm" onClick={() => openDetail(film)}>
                <div className="px-3 pt-2 mb-2 text-[10px] text-gray-400">
                  {idx === 0 ? 'Brad H. and 14 others like' : 'Michael Y. and Joe A. like'}
                </div>

                <ViewTransitionStartGroup ref={startGroupRef} mode="click">
                  <ViewTransitionStart id={`card-${film.id}`}>
                    <div className="cursor-pointer">
                      <ViewTransitionStart id={`poster-${film.id}`}>
                        <img className="w-full h-40 object-cover" src={film.image} alt={film.title} />
                      </ViewTransitionStart>

                      <div className="px-3 pt-2 pb-3 space-y-1.5">
                        <ViewTransitionStart id={`title-${film.id}`}>
                          <div className="text-sm font-extrabold leading-tight text-gray-900">
                            {film.title}
                          </div>
                        </ViewTransitionStart>

                        <div className="text-xs text-gray-500">{film.subtitle}</div>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span>{film.likes}</span>
                            <span className="w-4 h-4 flex items-center justify-center text-gray-300" aria-hidden>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M12 21s-7-4.6-9.3-8.4C.4 9.2 2.2 5.5 6 5.2c2-.2 3.4.8 4.2 1.8.8-1 2.2-2 4.2-1.8 3.8.3 5.6 4 3.3 7.4C19 16.4 12 21 12 21Z"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>

                          <div className="w-4 h-4 flex items-center justify-center text-gray-300" aria-hidden>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                              <path d="M6 6h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                              <path d="M6 18h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ViewTransitionStart>
                </ViewTransitionStartGroup>
              </div>
            ))}
          </div>
        </div>

        <div className="h-14 flex-shrink-0 border-t border-gray-100 bg-white flex items-center justify-around text-gray-300">
          <div className="w-11 h-7 flex items-center justify-center text-orange-500" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-11 h-7 flex items-center justify-center" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21s-7-4.6-9.3-8.4C.4 9.2 2.2 5.5 6 5.2c2-.2 3.4.8 4.2 1.8.8-1 2.2-2 4.2-1.8 3.8.3 5.6 4 3.3 7.4C19 16.4 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-11 h-7 flex items-center justify-center" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 7h10v10H7V7Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M4 10h3M17 10h3M4 14h3M17 14h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-11 h-7 flex items-center justify-center" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-11 h-7 flex items-center justify-center" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {<Modal ref={modalRef} clickClose={false} bgColor='249, 250, 251' alpha={1} durationIn={duration} durationOut={endDuration}>
        <div className="fixed inset-0 flex justify-center z-20">
          <div className="w-full max-w-[480px] min-h-[100dvh] flex flex-col">
            {/* 导航栏 s */}
            <div className="h-14 flex items-center border-b border-gray-100 bg-red bg-white">
              <div
                className="w-11 h-14 flex items-center justify-center text-gray-600 cursor-pointer select-none"
                onClick={closeDetail}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1 pr-3 text-xs font-semibold text-gray-900 truncate">Trending Films</div>
            </div>
            {/* 导航栏 e */}

            <div className="flex-1 overflow-auto">
              <ViewTransitionEndGroup
                ref={endGroupRef}
                duration={duration}
                endDuration={endDuration}
                onClosed={() => setSelected(null)}
              >
                <div className="p-3">
                  <ViewTransitionEnd id={`poster-${selected?.id}`}>
                    <div className="w-full h-56 rounded-xl overflow-hidden bg-gray-200">
                      <img className="w-full h-full object-cover" src={selected?.image} alt={selected?.title} />
                    </div>
                  </ViewTransitionEnd>
                </div>

                <div className="px-3 pb-4">
                  <ViewTransitionEnd id={`title-${selected?.id}`}>
                    <div className="text-lg font-extrabold leading-snug text-gray-900">{selected?.title}</div>
                  </ViewTransitionEnd>

                  <div className={clsx('transition-opacity duration-400 ease-out delay-100', {
                    'opacity-100': isShow,
                    'opacity-0': !isShow
                  })}>
                    <div className="mt-1 text-xs text-gray-500">{selected?.subtitle}</div>
                    <p className="mt-3 text-xs leading-relaxed text-gray-600">
                      This story simulates the “list to detail” transition in a mobile page. The image and title are animated
                      via FLIP.
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-gray-600">
                      Scroll the detail page to verify the layout stability. Click the back button to close.
                    </p>
                  </div>
                </div>
              </ViewTransitionEndGroup>
            </div>
          </div>
        </div>
      </Modal>}
    </div>
  )
}

const meta = {
  title: 'Examples/ViewTransition DetailView',
  component: DemoComponent,
  parameters: {
    layout: 'fullscreen',
  },
  // tags: ['autodocs'],
  argTypes: {
    duration: {
      control: { type: 'number', min: 100, max: 2000, step: 50 },
    },
    endDuration: {
      control: { type: 'number', min: 100, max: 2000, step: 50 },
    },
  },
} satisfies Meta<typeof DemoComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'List2Detail',
  args: {
    duration: 800,
    endDuration: 800,
  },
}

