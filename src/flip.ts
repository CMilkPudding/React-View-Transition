import type { AnimationType } from "./types"
import { flipCacheStore } from './flipCacheStore'

/** 默认动画持续时间(ms) */
export const DEFAULT_ANIMATE_DURATION = 500

/** 清除指定 key 的缓存 */
export function clearCache(key?: string | number): void {
  if (key === undefined) {
    flipCacheStore.getState().clearAll()
    return
  }
  flipCacheStore.getState().clearKey(key)
}

/**
 * 捕获元素位置信息
 * @param key - 唯一标识
 * @param el - 目标元素
 */
export function capture(key: string | number, el: HTMLElement | null): void {
  if (!el) return

  const rect = el.getBoundingClientRect()
  const computedStyle = window.getComputedStyle(el)
  const fontSize = parseFloat(computedStyle.fontSize) || undefined

  // !注：因为getBoundingClientRect()获取到的属性不可枚举，故直接展开{...rect}无法获取到值
  flipCacheStore.getState().updateKey(key, {
    left: rect.x,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
    fontSize,
  })
}

export type AnimationCallback = () => void

/**
 * 播放 FLIP 动画
 * @param key - 唯一标识
 * @param el - 目标元素
 * @param cbAni - 动画结束回调
 * @param isReverse - 是否反向动画
 * @param duration - 动画持续时间(ms)
 */
export function play(
  key: string | number,
  el: HTMLElement | null,
  cbAni?: AnimationCallback,
  isReverse = false,
  duration = DEFAULT_ANIMATE_DURATION,
  animationType: AnimationType = 'all'
): void {
  const first = flipCacheStore.getState().cache[String(key)]

  // 初始和结束位置元素均不存在时，不处理任何操作
  if (!first && !el) return

  // 开始位置元素不存在时，可能通过URL直接访问或其他别的方式，此时不显示动画，直接显示当前元素
  if (!first && el) {
    el.style.setProperty('opacity', '1')
    return
  }

  if (!el) return

  // 将目标元素透明度设置为0，避免初始闪烁
  el.style.setProperty('opacity', '0')

  const last = el.getBoundingClientRect()
  const dXY = {
    dx: first.left - last.x,
    dy: first.top - last.y
  }

  // console.log('key---', key, 'first', first, 'last', last, 'dxy', dXY, 'el', el)
  if (animationType == 'all' || animationType == 'position') {
    el.style.setProperty("--origin-width", first.width + 'px');
    el.style.setProperty("--origin-height", first.height + 'px');
    el.style.setProperty("--target-width", last.width + 'px');
    el.style.setProperty("--target-height", last.height + 'px');

    // TODO ?? 关闭动画时，点击获取的目标位置有偏差，导致元素无法正确回到原位（这里暂时绕过）
    if (!isReverse) {
      el.style.setProperty("--tX", dXY.dx + 'px');
      el.style.setProperty("--tY", dXY.dy + 'px');
    }
  }

  if (animationType === 'all' || animationType == 'font') {
    // 文字模式：仅变化字体大小和位置
    const computedStyle = window.getComputedStyle(el)
    const targetFontSize = parseFloat(computedStyle.fontSize)

    first.fontSize && el.style.setProperty("--origin-font-size", first.fontSize + 'px');
    targetFontSize && el.style.setProperty("--target-font-size", targetFontSize + 'px');
  }

  const aniName = animationType === 'font'
    ? (isReverse ? 'text_hide' : 'text-show')
    : (isReverse ? 'fade_hide' : 'fade_show')
  el.style.animation = `${aniName} ${duration}ms forwards`

  // 动画结束回调
  const timer = setTimeout(() => {
    clearTimeout(timer)
    cbAni?.()
  }, duration)
}