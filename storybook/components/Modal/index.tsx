import React, { useState, useImperativeHandle, RefObject } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import './index.scss'

export type ModalRef = {
  show: () => any,
  close: () => any
}

export interface ModalProps {
  onClose?: () => any,
  ref: RefObject<ModalRef | null>,
  children: any,
  /** 是否点击蒙版关闭 */
  clickClose?: boolean,
  /** 蒙版背景色（注：rgb格式） */
  bgColor?: string,
  alpha?: number,
  /** 动画时长（ms） */
  duration?: number
}

export default function Modal(props: ModalProps) {
  const { onClose, children, ref, clickClose, bgColor, alpha, duration } = props
  const [show, setShow] = useState(false)
  const [display, setDisplay] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setShow(true)
      document.body.style.overflow = 'hidden'
      setDisplay(true)
    },
    close: () => {
      document.body.style.overflow = 'visible'
      setShow(false)
    }
  }), [])

  const cls = clsx('modal', {
    'animation-in': show,
    'animation-out': !show
  })

  function __animationendHandler() {
    if (!show) setDisplay(false)
  }

  function __closeHandler() {
    if(!clickClose) {
      onClose && onClose()
      return
    }

    setShow(false)
    document.body.style.overflow = 'visible'
    onClose && onClose()
  }

  if (!display) { return null }

  return createPortal(
    <div
      onAnimationEnd={__animationendHandler}
      className={cls}
      onClick={__closeHandler}
      style={{
        '--bg-color': bgColor,
        '--bg-alpha': alpha,
        '--duration': duration ? duration + 'ms' : ''
      }}
    >{children}</div>, document.body
  )
}

