/**
 * ViewTransitionStart 记录模式
 */
export type CaptureMode = 'click' | 'observe'

/**
 * ViewTransitionEnd 显示模式
 */
export type ShowMode = 'observe' | 'call'

// TODO ？ 无法使用枚举？
// export enum AnimationTypeEnum {
//     ALL = 'all',
//     POSITION = 'position',
//     FONT = 'font'
// }

/**
 * ViewTransitionEnd 动画类别
 */
export type AnimationType = 'all' | 'position' // | 'font'