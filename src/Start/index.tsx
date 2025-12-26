import type { ReactElement, MouseEvent, Ref } from 'react'
import { useEffect, useRef, Children, useLayoutEffect, isValidElement, cloneElement, useCallback } from 'react'
import { capture } from '../flip'
import { validateId } from '../utils'
import { useViewTransitionStartGroup } from './context'
import type { CaptureMode } from '../types'

interface ChildProps {
  ref?: Ref<HTMLElement>
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export interface ViewTransitionStartProps {
  /** 子元素，仅支持单个根元素 */
  children: ReactElement<ChildProps>
  /** 唯一标识，用于关联起始和结束位置 */
  id: string | number
  /** 元素开始位置记录模式，组合模式下由 Group 控制 */
  mode?: CaptureMode
  /** 点击回调 */
  onClick?: (e: MouseEvent<HTMLElement>) => void
}



export default function ViewTransitionStart({
  children,
  id,
  mode: propMode,
  onClick: propOnClick,
}: ViewTransitionStartProps) {
  const elRef = useRef<HTMLElement>(null)
  const group = useViewTransitionStartGroup()

  // 使用组的配置或自身的配置
  const mode = group?.mode ?? propMode ?? 'click'

  // 判断元素是否仅一个根元素
  Children.only(children)

  // 捕获当前元素位置 - 使用稳定的函数引用
  const capturePosition = useCallback(() => {
    if (elRef.current) {
      validateId(id)
      capture(id, elRef.current)
    }
  }, [id])

  // 注册到 Group
  useEffect(() => {
    if (!group) return
    const unregister = group.register(capturePosition)
    return unregister
  }, [group, capturePosition])

  // observe 模式：IntersectionObserver
  useLayoutEffect(() => {
    const el = elRef.current
    if (!el || mode !== 'observe') return

    validateId(id)

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        capture(id, el)
      }
    }, {
      threshold: 0.01
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [mode, id])

  // observe 模式：监听滚动和窗口大小变化
  useEffect(() => {
    if (mode !== 'observe') return

    let ticking = false

    const onChange = () => {
      if (ticking) return

      const el = elRef.current
      if (!el) return

      ticking = true
      requestAnimationFrame(() => {
        capture(id, el)
        ticking = false
      })
    }

    window.addEventListener('scroll', onChange, { passive: true })
    window.addEventListener('resize', onChange)

    return () => {
      window.removeEventListener('scroll', onChange)
      window.removeEventListener('resize', onChange)
    }
  }, [mode, id])

  // 克隆 child 并注入 ref 和 onClick
  const childWithRef = isValidElement(children)
    ? cloneElement(children, {
        ref: elRef,
        onClick: (e: MouseEvent<HTMLElement>) => {
          // 1. click 模式下捕获位置
          if (mode === 'click' && !group) {
            // 非 Group 模式，自己捕获
            validateId(id)
            capture(id, e.currentTarget)
          }

          // 2. 调用 children 原本的 onClick
          children.props.onClick?.(e)

          // 3. 调用外部传入的 onClick
          propOnClick?.(e)

          // 4. 调用 Group 的 onClick（会触发 captureAll）
          group?.onClick?.(e)
        }
      })
    : children

  return childWithRef
}
