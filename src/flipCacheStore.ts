import { createStore } from 'zustand/vanilla'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { StateStorage } from 'zustand/middleware'
import { isBrowser } from './utils'

export interface RectCache {
  left: number
  top: number
  width: number
  height: number
  x: number
  y: number,
  fontSize?: number
}

export type FlipCacheKey = string | number

type CacheMap = Record<string, RectCache>

export interface FlipCacheStoreState {
  cache: CacheMap
  updateKey: (key: FlipCacheKey, rect: RectCache) => void
  clearKey: (key: FlipCacheKey) => void
  clearAll: () => void
}

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

function normalizeKey(key: FlipCacheKey): string {
  return String(key)
}

export const flipCacheStore = createStore<FlipCacheStoreState>()(
  persist(
    immer((set) => ({
      cache: {},
      updateKey: (key, rect) => {
        const k = normalizeKey(key)
        set((state) => {
          state.cache[k] = rect
        })
      },
      clearKey: (key) => {
        const k = normalizeKey(key)
        set((state) => {
          delete state.cache[k]
        })
      },
      clearAll: () => {
        set({ cache: {} })
      },
    })),
    {
      name: 'flipCache',
      version: 1,
      storage: createJSONStorage(() => (isBrowser() ? sessionStorage : noopStorage)),
      partialize: (state) => ({ cache: state.cache }),
    }
  )
)

export function getCachedRect(key: FlipCacheKey): RectCache | undefined {
  return flipCacheStore.getState().cache[normalizeKey(key)]
}
