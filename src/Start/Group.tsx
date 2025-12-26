import type { ReactNode, MouseEvent } from 'react'
import { useRef, useCallback } from 'react'
import { ViewTransitionStartGroupContext } from './context'
import type { CaptureMode } from '../types'

export interface ViewTransitionStartGroupProps {
  /** 子元素，通常是多个 ViewTransitionStart */
  children: ReactNode
  /** 元素开始位置记录模式 click | observe */
  mode?: CaptureMode
  /** 点击回调，点击任意 Item 时触发 */
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export default function ViewTransitionStartGroup({
  children,
  mode = 'click',
  onClick,
}: ViewTransitionStartGroupProps) {
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
    
    onClick?.(e)
  }, [mode, captureAll, onClick])

  return (
    <ViewTransitionStartGroupContext.Provider
      value={{
        mode,
        onClick: handleClick,
        register,
        captureAll,
      }}
    >
      {children}
    </ViewTransitionStartGroupContext.Provider>
  )
}
