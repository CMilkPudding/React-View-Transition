import type { ReactNode, MouseEvent } from 'react'
import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import { ViewTransitionStartGroupContext, type ViewTransitionStartItem } from './context'
import type { CaptureMode } from '../types'

export type ViewTransitionStartGroupRef = {
  captureAll: () => void
}

export interface ViewTransitionStartGroupProps {
  /** 子元素，通常是多个 ViewTransitionStart */
  children: ReactNode
  /** 元素开始位置记录模式 click | observe */
  mode?: CaptureMode
}

const ViewTransitionStartGroup = forwardRef<ViewTransitionStartGroupRef, ViewTransitionStartGroupProps>(function ViewTransitionStartGroup({
  children,
  mode = 'click',
}: ViewTransitionStartGroupProps, ref) {
  // 收集子组件
  const transitions = useRef<Set<ViewTransitionStartItem>>(new Set())

  // 注册 Item 的 capture 函数
  const register = useCallback((item:ViewTransitionStartItem) => {
    if(!item) return

    transitions.current.add(item)
    
    return () => transitions.current.delete(item)
  }, [])

  // 触发所有 Item 捕获位置
  const captureAll = useCallback(() => {
    transitions.current.forEach(item => {
      item?.capture()
    })
  }, [])

  // 暴露 方法给父组件
  useImperativeHandle(ref, () => ({
    captureAll
  }), [captureAll])

  return (
    <ViewTransitionStartGroupContext.Provider
      value={{
        mode,
        register,
      }}
    >
      {children}
    </ViewTransitionStartGroupContext.Provider>
  )
})

export default ViewTransitionStartGroup;
