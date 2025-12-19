import type { ReactElement, MouseEvent, CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import { play, DEFAULT_ANIMATE_DURATION } from '../flip'
import './index.scss'

export interface ViewTransitionEndProps {
  /** 子元素 */
  children: ReactElement
  /** 唯一标识，与 ViewTransitionStart 的 id 对应 */
  id: string | number
  /** 动画持续时间(ms) */
  duration?: number
  /** 关闭回调 */
  onClose?: () => void
  /** 显示完成回调 */
  onShow?: () => void
  /** 遮罩层自定义 className */
  maskClassName?: string
  /** 遮罩层自定义样式 */
  maskStyle?: CSSProperties
  /** 内容区自定义 className */
  contentClassName?: string
  /** 内容区自定义样式 */
  contentStyle?: CSSProperties
  /** 是否可点击遮罩关闭 */
  maskClosable?: boolean
}

export default function ViewTransitionEnd({
  id,
  onClose,
  children,
  onShow,
  duration = DEFAULT_ANIMATE_DURATION,
  maskClassName = '',
  maskStyle,
  contentClassName = '',
  contentStyle,
  maskClosable = true,
}: ViewTransitionEndProps) {

  const contentRef = useRef<HTMLDivElement>(null)

  // 页面加载后播放 FLIP （从列表捕获的 rect → 详情 rect）
  useEffect(() => {
    const timer = setTimeout(() => {
      play(id, contentRef.current, onShow, false, duration)   // 开启动画
    }, 0);
    return () => clearTimeout(timer)
  }, [id])

  const close = () => {
    if (!maskClosable) return
    // 捕获详情位置 → 准备做反向动画
    play(id, contentRef.current, () => {
      onClose?.()
    }, true, duration)
  }

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div
      className={`view-transition-mask ${maskClassName}`}
      style={maskStyle}
      onClick={close}
    >
      <div className="view-transition-bg" />
      <div>sdfjisdjfosdjfo</div>
      <div
        ref={contentRef}
        className={`view-transition-content ${contentClassName}`}
        style={contentStyle}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  )
}