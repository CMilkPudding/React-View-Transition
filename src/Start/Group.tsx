import type { ReactNode, MouseEvent } from 'react'
import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import { ViewTransitionStartGroupContext } from './context'
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
  const captureFns = useRef<Set<() => void>>(new Set())

  // 注册 Item 的 capture 函数
  const register = useCallback((captureFn: () => void) => {
    captureFns.current.add(captureFn)
    return () => captureFns.current.delete(captureFn)
  }, [])

  // 触发所有 Item 捕获位置
  const captureAll = useCallback(() => {
    captureFns.current.forEach(fn => fn())
  }, [])

  // 处理点击事件：先捕获所有位置，再触发外部 onClick
  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
    if (mode === 'click') {
      captureAll()
    }

  }, [mode, captureAll])

  // 暴露 方法给父组件
  useImperativeHandle(ref, () => ({
    captureAll
  }), [captureAll])

  return (
    <ViewTransitionStartGroupContext.Provider
      value={{
        mode,
        onClick: handleClick,
        register,
      }}
    >
      {children}
    </ViewTransitionStartGroupContext.Provider>
  )
})

export default ViewTransitionStartGroup;
