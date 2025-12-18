export const DEFAULT_ANIMATE_DURATION = 500

// 添加持久化，使得页面刷新能关闭动画
const cache = sessionStorage.getItem("flipCache") ?  JSON.parse(sessionStorage.getItem("flipCache")) : {}
// const cache = {}

export function capture(key, el) {
  if (!el) return

  // 记录位置信息
  cache[key] = el.getBoundingClientRect();
  sessionStorage.setItem('flipCache', JSON.stringify(cache))
}

export function play(key, el, cbAni, isReverse = false, duration = DEFAULT_ANIMATE_DURATION) {

  const first = cache[key]
  // 初始和结束位置元素均不存在时，不处理任何操作
  if(!first && !el) return

  // 开始位置元素不存在时，可能通过URL直接访问或其他别的方式，此时不显示动画，直接显示当前元素 或 无法通过点击蒙版进行关闭
  if(!first && el) {
    el.style.setProperty('opacity', 1)
    return
  }

  // 将目标元素透明度设置为0， 避免初始
  el.style.setProperty('opacity', 0)

  const last = el.getBoundingClientRect()
  const dXY = {
    dx:  first.left - last.x,
    dy: first.top - last.y
  }

  el.style.setProperty("--origin-width", first.width + 'px');
  el.style.setProperty("--origin-height", first.height + 'px');
  el.style.setProperty("--target-width", last.width + 'px');
  el.style.setProperty("--target-height", last.height + 'px');

  el.style.setProperty("--tX", dXY.dx + 'px');
  el.style.setProperty("--tY", dXY.dy + 'px');


  // 反向动画
  if(isReverse) {
    el.style.animation = `fade_hide ${ duration }ms forwards`;
  } else {
    el.style.animation = `fade_show ${ duration }ms forwards`
  }

  // 动画结束回调
  const timer = setTimeout(() => {
    clearTimeout(timer)
    cbAni?.()
  }, duration)
}