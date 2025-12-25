import type { ReactElement, MouseEvent } from 'react'
import { useEffect, useRef, Children, useLayoutEffect, isValidElement, cloneElement } from 'react'
// import { capture } from '../flip'
import FlipInstance from '../flip'
import { validateId } from '../utils'
import type { CaptureMode } from 'src/types'

export interface ViewTransitionStartProps {
  /** 子元素，仅支持单个根元素 */
  children: ReactElement
  /** 唯一标识，用于关联起始和结束位置 */
  id: string | number
  /** 元素开始位置记录模式 click | observe */
  mode?: CaptureMode
  /** 点击回调 */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export default function ViewTransitionStart({
  children,
  id,
  mode = 'click',
  ...restProps
}: ViewTransitionStartProps) {
  const elRef = useRef<HTMLDivElement>(null)

  const { capture } = new FlipInstance()

  // 判断元素是否仅一个根元素，否则抛出异常
  Children.only(children)

  useLayoutEffect(() => {
    const el = elRef.current
    if (!el) return;

    if (mode !== 'observe') return

    validateId(id)

    const observer = new IntersectionObserver(([entry]) => {
      // 出现在视口中，根据阈值范围
      if (entry.isIntersecting) {
        capture(id, el)
      }
    }, {
      threshold: 0.01
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [mode])

  // 监听滚动和窗口大小变化
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

  // 克隆 child 并注入 ref
  const childWithRef = isValidElement(children)
    ? cloneElement(children, { 
      ref: elRef,
      onClick: (e: MouseEvent<HTMLElement>) => {
        console.log('inner click')
        // 1. 先执行自己的处理逻辑
        // click 模式下始终捕获位置
        if (mode === 'click') {
          validateId(id)
          capture(id, e.currentTarget)
        }
        
        // 2. 再调用 children 原本的 onClick（如果有）
        if (children?.props?.onClick) {
          children.props.onClick?.(e)
        }
        
        // 3. 也可以调用外部传入的 onClick
        restProps.onClick?.(e)
      }
    })
    : children

  return childWithRef  // 直接返回，不需要包裹 div
}