import ViewTransitionStart, { type ViewTransitionStartProps } from './Start/index'
import ViewTransitionEnd, { type ViewTransitionEndProps } from './End/index'
import { useState } from 'react'
import './ViewTransitionTrigger.scss'

// type IProps = ViewTransitionStartProps & ViewTransitionEndProps
type IProps = {
    id: ViewTransitionStartProps['id'],
    src: string,
    mode: ViewTransitionStartProps['mode'],
    startProps?: ViewTransitionStartProps[keyof ViewTransitionStartProps],
    endProps?: ViewTransitionEndProps[keyof ViewTransitionEndProps]
}

const data = {
    id: 104,
    src: `https://picsum.photos/seed/${Math.random()}/200/200`,
    mode: 'click',
}

export default function Page({ startProps, endProps }: IProps) {
    const { id, src, mode, } = data
    const [show, setShow] = useState(false)

    return <>
        <div className="wrapper">
            <ViewTransitionStart style={{ width: '200px', height: '200px' }} id={id} mode={mode} onClick={() => setShow(true)} {...startProps}>
                <img src={src} />
            </ViewTransitionStart>
        </div>

        {show && (
            <ViewTransitionEnd id={id} onClose={() => setShow(false)} {...endProps}>
                <img style={{ width: '100%', height: '100%' }} src={src} />
            </ViewTransitionEnd>
        )}
    </>
}