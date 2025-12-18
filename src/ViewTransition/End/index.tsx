import type { ReactElement } from 'react'
import { useEffect, useRef } from 'react'
import { play } from '@/components/ViewTransition/flip'
import './index.scss'

interface IEndProps {
  children: ReactElement,
  id: string | number,
  duration?: number,
  onClose?: () => void,
  onShow?: () => void
}
export default function ViewTransionEnd({ id, onClose, children, onShow, duration } : IEndProps) {

  const contentRef = useRef(null)

  // 页面加载后播放 FLIP （从列表捕获的 rect → 详情 rect）
  useEffect(() => {
    const timer = setTimeout(() => {
      play(id, contentRef.current, onShow, false, duration)   // 开启动画
    }, 0);
    return () => clearTimeout(timer)
  }, [id])

  const close = () => {
    // 捕获详情位置 → 准备做反向动画
    play(id, contentRef.current, () => {
      onClose?.()
    }, true, duration)
  }

  return (
    <div className="mask" onClick={close}>
      <div className="bg"></div>
      <div ref={contentRef} className="content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}