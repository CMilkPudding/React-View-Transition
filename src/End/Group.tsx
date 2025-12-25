import type { ReactNode } from 'react'
import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import { ViewTransitionEndGroupContext, type CloseAnimationItem } from './context'
import { DEFAULT_ANIMATE_DURATION } from '../flip'

export type ViewTransitionEndGroupRef = {
  closeAll: () => void
}

export interface ViewTransitionEndGroupProps {
  /** 子元素，通常是多个 ViewTransitionEndItem */
  children: ReactNode
  /** 开始动画持续时间(ms) */
  duration?: number
  /** 结束动画持续时间(ms) */
  endDuration?: number
  /** 关闭完成回调 */
  onClosed?: () => void
}

const ViewTransitionEndGroup = forwardRef<
  ViewTransitionEndGroupRef,
  ViewTransitionEndGroupProps
>(function ViewTransitionEndGroup({
  children,
  duration = DEFAULT_ANIMATE_DURATION,
  endDuration = DEFAULT_ANIMATE_DURATION,
  onClosed,
}, ref) {
  const transitions = useRef<Set<CloseAnimationItem>>(new Set())

  // 注册 Item 的关闭动画
  const register = useCallback((item: CloseAnimationItem) => {
    transitions.current.add(item)
    return () => transitions.current.delete(item)
  }, [])

  // 触发所有 Item 关闭动画
  const closeAll = useCallback(() => {
    // 1. 先收集所有元素的当前位置（在任何动画开始前）
    const rectsMap = new Map<CloseAnimationItem, DOMRect | null>()
    transitions.current.forEach(item => {
      rectsMap.set(item, item.getRect())
    })

    // 2. 然后使用预先收集的位置启动所有动画
    transitions.current.forEach(item => {
      const lastRect = rectsMap.get(item)
      if (lastRect) {
        item.close(lastRect)
      }
    })

    // 等待动画结束后触发 onClosed
    const timer = setTimeout(() => {
      onClosed?.()
    }, endDuration)

    return () => clearTimeout(timer)
  }, [endDuration, onClosed])

  // 暴露 closeAll 方法给父组件
  useImperativeHandle(ref, () => ({
    closeAll
  }), [closeAll])

  return (
    <ViewTransitionEndGroupContext.Provider
      value={{
        duration,
        endDuration,
        register,
        closeAll,
      }}
    >
      {children}
    </ViewTransitionEndGroupContext.Provider>
  )
})

export default ViewTransitionEndGroup
