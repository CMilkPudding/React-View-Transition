
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useMemo, useRef, useState } from 'react'
import ViewTransitionStart from '@/Start'
import ViewTransitionStartGroup from '@/Start/Group'
import type { ViewTransitionStartGroupRef } from '@/Start/Group'
import ViewTransitionEnd from '@/End'
import ViewTransitionEndGroup from '@/End/Group'
import type { ViewTransitionEndGroupRef } from '@/End/Group'
import Modal, { ModalRef } from '../components/Modal';
import clsx from 'clsx'
import { v4 as uuid } from 'uuid'

type Film = {
  id: number | string
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
        image: 'https://picsum.photos/seed/18/800/500',
      },
      {
        id: 2,
        title: 'CAPTAIN FANTASTIC',
        subtitle: 'Drama · Showing',
        likes: 98,
        image: 'https://picsum.photos/seed/20/800/500',
      },
      {
        id: 3,
        title: 'THE GREAT WAVE',
        subtitle: 'Action · Coming soon',
        likes: 62,
        image: 'https://picsum.photos/seed/11/800/500',
      },
    ],
    []
  )

  const [selected, setSelected] = useState<Film | null>(null)
  const [detailTextVisible, setDetailTextVisible] = useState(false)

  const modalRef = useRef<ModalRef>(null)
  const startGroupRefs = useRef<Record<string, ViewTransitionStartGroupRef | null>>({})
  const endGroupRef = useRef<ViewTransitionEndGroupRef>(null)

  const onShowDetail = (film: Film) => {
    setSelected(film)

    startGroupRefs.current?.[film.id].captureAll()

    modalRef.current?.show()
    endGroupRef.current?.showAll()

    // 延迟显示文字，让过渡动画生效
    setTimeout(() => {
      setDetailTextVisible(true)
    }, 50)
  }
  const onClose = () => {
    setDetailTextVisible(false)

    modalRef.current?.close()
    endGroupRef.current?.closeAll()
  }

  const onClosed = () => {
    setSelected(null)
  }

  return (
    <div className="h-[100dvh] bg-gray-100">
      <div className="h-[100dvh] bg-white flex flex-col w-full max-w-[480px] mx-auto">
        {/* main s */}
        <div className="h-full flex-1 overflow-auto bg-gray-50 pt-4 box-border">
          <div className="px-3 pb-4 space-y-3">
            {films.map((film) => (
              <div key={film.id} className="bg-white overflow-hidden border border-gray-100 shadow-sm" onClick={() => onShowDetail(film)}>
                <ViewTransitionStartGroup ref={(r: any) => { startGroupRefs.current[film.id] = r }} mode="click">
                  <div className="cursor-pointer relative h-[28vh]">
                    <ViewTransitionStart id={`card-img-${film.id}`}>
                      <img className="w-full h-full object-cover" src={film.image} alt={film.title} />
                    </ViewTransitionStart>

                    <div className="px-3 pt-2 pb-3 space-y-1.5 absolute left-0 top-0 bottom-0 right-0 text-white bg-dark-900 bg-opacity-50 flex flex-col justify-end">
                      <ViewTransitionStart id={`card-sub-title-${film.id}`}>
                        <div className="text-xs text-gray-300">{film.subtitle}</div>
                      </ViewTransitionStart>

                      <ViewTransitionStart id={`card-title-${film.id}`}>
                        <div className="text-sm font-extrabold leading-tight">
                          {film.title}
                        </div>
                      </ViewTransitionStart>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-100">
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
                </ViewTransitionStartGroup>
              </div>
            ))}
          </div>
        </div>
        {/* main e */}

        {/* footer s */}
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
        {/* footer e */}
      </div>

      <Modal ref={modalRef} clickClose={false} bgColor='0, 0, 0' alpha={0} durationIn={duration} durationOut={endDuration}>
        <div className="fixed inset-0 flex justify-center z-20">
          <div className="w-full max-w-[480px] h-[100dvh]  flex flex-col relative">
            <ViewTransitionEndGroup
              ref={endGroupRef}
              duration={duration}
              endDuration={endDuration}
              onClosed={onClosed}
            >
              <ViewTransitionEnd id={`card-img-${selected?.id}`}>
                <img className="w-full h-full object-cover" src={selected?.image} alt={selected?.title} />
              </ViewTransitionEnd>

              <div className={clsx('absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end box-border transition-opacity duration-400 ease-out', {
                'opacity-100': detailTextVisible,
                'opacity-0': !detailTextVisible
              })}>
                {/* 关闭按钮 s */}
                <div
                  className="w-11 h-14 flex items-center justify-center text-white cursor-pointer select-none absolute top-0 left-0 z-20"
                  onClick={onClose}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* 关闭按钮 e */}
                <ViewTransitionEnd id={`card-title-${selected?.id}`}>
                  <div className="text-lg font-extrabold leading-snug text-white">{selected?.title}</div>
                </ViewTransitionEnd>
                <ViewTransitionEnd id={`card-sub-title-${selected?.id}`}>
                  <div className="mt-1 text-xs text-gray-300">{selected?.subtitle}</div>
                </ViewTransitionEnd>


                <div className={clsx('mb-4 transition-all duration-800 ease-out', {
                  'opacity-100': detailTextVisible,
                  'opacity-0': !detailTextVisible
                })}>
                  <p className="mt-3 text-xs leading-relaxed text-gray-300">
                    This story simulates the “list to detail” transition in a mobile page. The image and title are animated
                    via FLIP.
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-gray-300">
                    Scroll the detail page to verify the layout stability. Click the back button to close.
                  </p>
                </div>
              </div>
            </ViewTransitionEndGroup>
          </div>
        </div>
      </Modal>

    </div>
  )
}

const meta = {
  title: 'Examples/ViewTransition CardView',
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
    endDuration: 500,
  },
}

