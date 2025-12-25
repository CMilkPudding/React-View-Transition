/** 默认动画持续时间(ms) */
export const DEFAULT_ANIMATE_DURATION = 500

/** 缓存键名 */
const CACHE_KEY = 'flipCache'

export interface RectCache {
  left: number
  top: number
  width: number
  height: number
  x: number
  y: number
}

type CacheMap = Record<string | number, RectCache>

/** 获取缓存 */
function getCache(): CacheMap {
  if (typeof window === 'undefined') return {}
  try {
    const stored = sessionStorage.getItem(CACHE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/** 设置缓存 */
function setCache(cache: CacheMap): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache))
  } catch {
    // ignore storage errors
  }
}

/** 清除指定 key 的缓存 */
export function clearCache(key?: string | number): void {
  if (key === undefined) {
    sessionStorage.removeItem(CACHE_KEY)
    return
  }
  const cache = getCache()
  delete cache[key]
  setCache(cache)
}



/**
 * 捕获元素位置信息
 * @param key - 唯一标识
 * @param el - 目标元素
 */
export function capture(key: string | number, el: HTMLElement | null): void {
  if (!el) return

  const cache = getCache()
  cache[key] = el.getBoundingClientRect()
  setCache(cache)

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
  duration = DEFAULT_ANIMATE_DURATION
): void {
  const cache = getCache()
  const first = cache[key]

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

  console.log('key---', key, 'first', first, 'last', last, 'dxy', dXY, 'el', el)

  el.style.setProperty("--origin-width", first.width + 'px');
  el.style.setProperty("--origin-height", first.height + 'px');
  el.style.setProperty("--target-width", last.width + 'px');
  el.style.setProperty("--target-height", last.height + 'px');

  // TODO ?? 关闭动画时，点击获取的目标位置有偏差，导致元素无法正确回到原位（这里暂时绕过）
  if (!isReverse) {
    el.style.setProperty("--tX", dXY.dx + 'px');
    el.style.setProperty("--tY", dXY.dy + 'px');
  }


  // 反向动画
  if (isReverse) {
    el.style.animation = `fade_hide ${duration}ms forwards`;
  } else {
    el.style.animation = `fade_show ${duration}ms forwards`
  }

  // 动画结束回调
  const timer = setTimeout(() => {
    clearTimeout(timer)
    cbAni?.()
  }, duration)
}