import type { ReactElement } from 'react'
import { useEffect, useRef, Children } from 'react'
import { capture } from '@/components/ViewTransition/flip'
import { validateId } from '@/components/ViewTransition/utils'

interface IStartProps {
  children: ReactElement,
  id: string | number,
  /** 元素开始位置记录模式 click | observe */
  mode: 'click' | 'observe',
  onClick?: (e: any) => void
}

export default function ViewTransionStart({ children, id, mode = 'click', ...restProps }: IStartProps) {
  const elRef = useRef(null)

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
        console.log('observe', id, entry)
        capture(id, el)
      }
    }, {
      threshold: 0.01
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [mode])

  // 滚动监听
  useEffect(() => {
    if (mode !== 'observe') return

    let ticking = false

    const onScroll = () => {
      if (ticking) return

      const el = elRef.current
      if (!el) return

      ticking = true
      requestAnimationFrame(() => {
        console.log('scroll observe', id, el.getBoundingClientRect())
        capture(id, el)
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [mode, id])


  // 点击处理
  const handleClick = (e: any) => {
    if (!restProps.onClick) return

    if (mode !== 'click') {
      restProps?.onClick(e)
      return
    }

    validateId(id)

    capture(id, e.currentTarget)
    restProps?.onClick(e)
  }

  return (<div ref={elRef} style={{ position: 'relative' }} {...restProps} onClick={handleClick}>
    {children}
  </div>)
}