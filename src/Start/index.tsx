import type { ReactElement, MouseEvent } from 'react'
import { useEffect, useRef, Children } from 'react'
import { capture } from '../flip'
import { validateId } from '../utils'

export type CaptureMode = 'click' | 'observe'

export interface ViewTransitionStartProps {
  /** 子元素，仅支持单个根元素 */
  children: ReactElement
  /** 唯一标识，用于关联起始和结束位置 */
  id: string | number
  /** 元素开始位置记录模式 click | observe */
  mode?: CaptureMode
  /** 点击回调 */
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  /** 自定义 className */
  className?: string
  /** 自定义 style */
  style?: React.CSSProperties
}

export default function ViewTransitionStart({
  children,
  id,
  mode = 'click',
  className,
  style,
  ...restProps
}: ViewTransitionStartProps) {
  const elRef = useRef<HTMLDivElement>(null)

  // 判断元素是否仅一个根元素，否则抛出异常
  Children.only(children)

  useEffect(() => {
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

  // 点击处理
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!restProps.onClick) return

    if (mode !== 'click') {
      restProps?.onClick(e)
      return
    }

    validateId(id)

    capture(id, e.currentTarget)
    restProps?.onClick(e)
  }

  return (
    <div
      ref={elRef}
      className={className}
      style={{ position: 'relative', ...style }}
      {...restProps}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}