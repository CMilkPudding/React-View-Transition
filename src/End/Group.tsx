import type { ReactNode } from 'react'
import { useRef, useCallback, forwardRef, useImperativeHandle, useState, useLayoutEffect } from 'react'
import { ViewTransitionEndGroupContext, type CloseAnimationItem } from './context'
import { DEFAULT_ANIMATE_DURATION } from '../flip'
import type { ShowMode } from 'src/types'

export type ViewTransitionEndGroupRef = {
  closeAll: () => void
}

export interface ViewTransitionEndGroupProps {
  /** 子元素，通常是多个 ViewTransitionEnd */
  children: ReactNode
  showMode?: ShowMode
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
  showMode = 'observe',
  duration = DEFAULT_ANIMATE_DURATION,
  endDuration = DEFAULT_ANIMATE_DURATION,
  onClosed,
}, ref) {
  const transitions = useRef<Set<CloseAnimationItem>>(new Set())

  // 注：这里应使用useLayoutEffect，使用useEffect时，子组件可能未渲染完成，出现非目标位置渲染
  useLayoutEffect(() => {
    if(showMode !== 'observe') return

    // 观察模式，调用组件集的显示方法
    showAll()
  }, [ showMode ])

  // 注册 Item 子元素组件
  const register = useCallback((item: CloseAnimationItem ) => {
    transitions.current.add(item)
    return () => transitions.current.delete(item)
  }, [])

  // 遍历调用 注册组件的集的show方法
  const showAll = useCallback(() => {
    transitions.current.forEach(item => {
      item.show()
    })
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
    showAll,
    closeAll
  }), [closeAll])

  return (
    <ViewTransitionEndGroupContext.Provider
      value={{
        showMode,
        duration,
        endDuration,
        register,
        closeAll,
        showAll,
      }}
    >
      {children}
    </ViewTransitionEndGroupContext.Provider>
  )
})

export default ViewTransitionEndGroup
