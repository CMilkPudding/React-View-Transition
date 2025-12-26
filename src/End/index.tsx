import type { ReactElement, Ref } from 'react'
import { useEffect, useRef, useCallback, Children, isValidElement, cloneElement } from 'react'
import { play, DEFAULT_ANIMATE_DURATION } from '../flip'
import { useViewTransitionEndGroup } from './context'
import './index.scss'

interface ChildProps {
  ref?: Ref<HTMLElement>
}

export interface ViewTransitionEndProps {
  /** 子元素，仅支持单个根元素 */
  children: ReactElement<ChildProps>
  /** 唯一标识，与 ViewTransitionStart 的 id 对应 */
  id: string | number
  /** 开始动画持续时间(ms)，组合模式下由 Group 控制 */
  duration?: number
  /** 结束动画持续时间(ms)，组合模式下由 Group 控制 */
  endDuration?: number
  /** 显示完成回调 */
  onShow?: () => void
}

export default function ViewTransitionEnd({
  id,
  children,
  onShow,
  duration: propDuration,
  endDuration: propEndDuration,
}: ViewTransitionEndProps) {
  const group = useViewTransitionEndGroup()
  const elRef = useRef<HTMLElement>(null)

  // 判断元素是否仅一个根元素
  Children.only(children)

  // 使用组合的配置或自身的配置
  const duration = group?.duration ?? propDuration ?? DEFAULT_ANIMATE_DURATION
  const endDuration = group?.endDuration ?? propEndDuration ?? DEFAULT_ANIMATE_DURATION

  // 页面加载后播放 FLIP 动画
  useEffect(() => {
    const timer = setTimeout(() => {
      play(id, elRef.current, onShow, false, duration)
    }, 0)
    return () => clearTimeout(timer)
  }, [id, duration, onShow])

  // 获取当前元素位置
  const getRect = useCallback(() => {
    return elRef.current?.getBoundingClientRect() ?? null
  }, [])

  // 关闭动画回调
  const close = useCallback(() => {
    if (!elRef.current) return
    play(id, elRef.current, undefined, true, endDuration)
  }, [id, endDuration])

  // 注册到 Group
  useEffect(() => {
    if (!group) return
    const unregister = group.register({
      getRect,
      close
    })
    return unregister
  }, [group, getRect, close])

  // 克隆 child 并注入 ref
  const childWithRef = isValidElement(children)
    ? cloneElement(children, { ref: elRef })
    : children

  return childWithRef
}
