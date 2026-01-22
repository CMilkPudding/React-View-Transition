import { createContext, useContext } from 'react'
import type { ShowMode } from 'src/types'

export interface CloseAnimationItem {
  /** 获取元素当前位置 */
  getRect: () => DOMRect | null
  /** 执行关闭动画，接收预先计算的位置 */
  close: (lastRect?: DOMRect) => void,
  show: () => void
}

export interface ViewTransitionEndGroupContextValue {
  showMode: ShowMode
  /** 开始动画持续时间(ms) */
  duration: number
  /** 结束动画持续时间(ms) */
  endDuration: number
  /** 注册关闭动画项 */
  register: (item: CloseAnimationItem) => () => void
  /** 触发所有 Item 关闭动画 */
  closeAll: () => void,
  showAll: () => void
}

export const ViewTransitionEndGroupContext = createContext<ViewTransitionEndGroupContextValue | null>(null)

export function useViewTransitionEndGroup() {
  return useContext(ViewTransitionEndGroupContext)
}
