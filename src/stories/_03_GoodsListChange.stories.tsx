import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMemo, useState, useRef } from 'react'
import ViewTransitionStart from '../Start'
import ViewTransitionEnd from '../End'
import ViewTransitionEndGroup from '../End/Group'
import type { ViewTransitionEndGroupRef } from '../End/Group'
import { v4 as uuid } from 'uuid'
import ViewTransitionStartGroup from '../Start/Group'

type Product = {
    id: string | string
    name: string
    price: number
    image: string
}

type ViewMode = 'grid' | 'list'

type CompProps = {
    duration?: number,
    endDuration?: number
}

function DemoComponent({ duration = 650, endDuration = 600 }: CompProps) {
    const products = useMemo<Product[]>(
        () =>
            Array.from({ length: 12 }, (_, i) => {
                const id = uuid()
                return {
                    id,
                    name: 'SUEDE MINI SKIRT-' + id,
                    price: Math.random() * 100,
                    image: `https://picsum.photos/seed/p${i}/400/500`,
                }
            }),
        []
    )

    const [detailTextVisible, setDetailTextVisible] = useState(false)

    const [viewMode, setViewMode] = useState<ViewMode>('grid')
    const endGroupRef = useRef<ViewTransitionEndGroupRef | null>(null)

    const toggleView = () => {
        if (viewMode === 'grid') {
            setDetailTextVisible(true)
            setViewMode('list')
        } else {
            setDetailTextVisible(false)
            endGroupRef.current?.closeAll()
        }
    }

    return (
        <div className="min-h-[100dvh] bg-gray-100">
            <div className="min-h-[100dvh] bg-white flex flex-col w-full max-w-[480px] mx-auto">
                <div className="h-14 flex items-center px-4 border-b border-gray-100 bg-gradient-to-r from-teal-400 to-teal-500 relative">
                    <button className="w-8 h-8 flex items-center justify-center text-white" aria-label="Back">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div className="flex-1 text-center text-white font-semibold text-base tracking-wide">TOP SELLERS</div>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-white"
                        aria-label="Toggle View"
                        onClick={toggleView}
                    >
                        {viewMode === 'grid' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="px-4 py-3 border-b border-gray-200">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="SEARCH"
                            className="w-full h-9 pl-3 pr-10 border border-gray-300 rounded text-sm text-gray-600 placeholder-teal-400 focus:outline-none focus:border-teal-400"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-2 text-[10px] text-gray-400 tracking-wide">
                    <span className="text-gray-500">🏠</span> &gt; CATEGORY &gt; SUMMER TRENDS &gt; <span className="font-semibold">TOP SELLERS</span>
                </div>

                {viewMode === 'grid' && (
                    <div className="flex-1 overflow-auto bg-white px-4 pb-4">
                        <div className="grid grid-cols-3 gap-3">
                            <ViewTransitionStartGroup mode="observe">
                                {products.map((product) => (
                                    <div>
                                        <div className="w-full aspect-[4/5] bg-gray-100 rounded mb-2">
                                            <ViewTransitionStart key={product.id} id={`product-${product.id}`} >
                                                <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                                            </ViewTransitionStart>
                                        </div>

                                        <ViewTransitionStart key={product.id} id={`title-${product.id}`} >
                                            <div className="text-[10px] font-semibold text-gray-800 leading-tight mb-1 uppercase"> {product.name}</div>
                                        </ViewTransitionStart>
                                        <ViewTransitionStart key={product.id} id={`price-${product.id}`} >
                                            <div className="text-xs font-bold text-gray-900">
                                                ${product.price.toFixed(2)}
                                            </div>
                                        </ViewTransitionStart>
                                    </div>

                                ))}
                            </ViewTransitionStartGroup>
                        </div>
                    </div>
                )}

            </div>

            {viewMode === 'list' && (
                <div className="fixed inset-0 bg-gray-100 bg-opcity-30 flex justify-center z-20">
                    <div className="w-full max-w-[480px] min-h-[100dvh] bg-white flex flex-col">
                        <div className="h-14 flex items-center px-4 border-b border-gray-100 bg-gradient-to-r from-teal-400 to-teal-500 relative">
                            <button
                                className="w-8 h-8 flex items-center justify-center text-white"
                                aria-label="Back"
                                onClick={toggleView}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 18 9 12l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <div className="flex-1 text-center text-white font-semibold text-base tracking-wide">LIST VIEW</div>
                            <button
                                className="w-8 h-8 flex items-center justify-center text-white"
                                aria-label="Toggle View"
                                onClick={toggleView}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="px-4 py-3 border-b border-gray-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="SEARCH"
                                    className="w-full h-9 pl-3 pr-10 border border-gray-300 rounded text-sm text-gray-600 placeholder-teal-400 focus:outline-none focus:border-teal-400"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 py-2 text-[10px] text-gray-400 tracking-wide">
                            <span className="text-gray-500">🏠</span> &gt; CATEGORY &gt; SUMMER TRENDS &gt; <span className="font-semibold">TOP SELLERS</span>
                        </div>

                        <div className="flex-1 overflow-auto bg-white px-4 pb-4">
                            <ViewTransitionEndGroup
                                ref={endGroupRef}
                                duration={duration}
                                endDuration={endDuration}
                                onClosed={() => setViewMode('grid')}
                            >
                                <div className="space-y-3">
                                    {products.map((product) => (
                                        <div key={product.id} className="flex gap-3 rounded-lg p-3">
                                            <div className="w-24 h-32 rounded flex-shrink-0">
                                                <ViewTransitionEnd id={`product-${product.id}`}>
                                                    <img className="w-full h-full object-cover" src={product.image} alt={product.name} />
                                                </ViewTransitionEnd>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <ViewTransitionEnd id={`title-${product.id}`}>
                                                        <div className="text-sm font-semibold text-gray-800 leading-tight mb-2 uppercase">
                                                            {product.name}
                                                        </div>
                                                    </ViewTransitionEnd>

                                                    <p className={ 'text-xs text-gray-500 mb-2 transition-all duration-200 ease-out delay-100 ' +
                                            (detailTextVisible ? 'opacity-100' : 'opacity-0') }>
                                                        Premium quality product from our collection
                                                    </p>
                                                </div>
                                                <ViewTransitionEnd id={`price-${product.id}`}>
                                                    <div className="text-lg font-bold text-teal-500">
                                                        ${product.price.toFixed(2)}
                                                    </div>
                                                </ViewTransitionEnd>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </ViewTransitionEndGroup>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const meta = {
    title: 'Examples/ViewTransition ListChange',
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
            control: { type: 'number', min: 100, max: 10000, step: 50 },
        },
    },
} satisfies Meta<typeof DemoComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    name: 'Grid ↔ List',
    args: {
        duration: 600,
        endDuration: 3000,
    },
}
