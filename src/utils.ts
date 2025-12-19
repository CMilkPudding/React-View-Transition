/**
 * 校验 id 是否有效
 * @param id - 需要校验的 id
 * @throws {Error} 当 id 为空时抛出错误
 */
export function validateId(id: string | number | undefined | null): asserts id is string | number {
  if (id === undefined || id === null || id === '') {
    throw new Error('[ViewTransition] id is required!')
  }
}

/**
 * 判断是否为浏览器环境
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}