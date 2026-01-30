import { createContext, useContext } from 'react'
import type { CaptureMode } from '../types'
import type { MouseEvent } from 'react'

export interface ViewTransitionStartItem {
  /** 记录当前元素位置函数 */
 capture: () => void
}

export interface ViewTransitionStartGroupContextValue {
  /** 元素开始位置记录模式 click | observe */
  mode: CaptureMode
  /** 点击回调，由 Group 统一处理 */
  onClick?: (e: MouseEvent<HTMLElement>) => void
  /** 注册 Item 组件 */
  register: (item: ViewTransitionStartItem) => void
}

export const ViewTransitionStartGroupContext = createContext<ViewTransitionStartGroupContextValue | null>(null)

export function useViewTransitionStartGroup() {
  return useContext(ViewTransitionStartGroupContext)
}

export const ViewTransitionGroupProvider =
  ViewTransitionStartGroupContext.Provider