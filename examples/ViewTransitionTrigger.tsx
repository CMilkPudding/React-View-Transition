import {
    ViewTransitionStart,
    ViewTransitionEndGroup,
    ViewTransitionEndItem,
    ViewTransitionStartGroup,
    ViewTransitionStartItem,
} from 'react-view-transition-flip'
import { useRef, useState } from 'react'
import './ViewTransitionTrigger.scss'

const data = {
    id: 106,
    src: `https://picsum.photos/seed/${Math.random()}/200/200`,
}

export default function Page() {
    const { id, src } = data
    const [show, setShow] = useState(false)

    const transitionEndGroupRef = useRef(null)
    const onClickMask = () => {
        transitionEndGroupRef.current?.closeAll()
    }
    return <>
        <div className="wrapper">
            <div className='item'>
                <ViewTransitionStartGroup mode="click" onClick={() => setShow(true)}>
                    <ViewTransitionStartItem id={id}>
                        <img src={src} />
                    </ViewTransitionStartItem>
                    <ViewTransitionStartItem id={`title-${id}`}>
                        <div className='title'>这是标题</div>
                    </ViewTransitionStartItem>
                </ViewTransitionStartGroup>
            </div>
        </div>

        {show && (
            <div className='mask' onClick={onClickMask}>
                <div className='content-wrapper'>
                    <ViewTransitionEndGroup
                        ref={transitionEndGroupRef}
                        duration={800}
                        endDuration={800}
                        onClosed={() => setShow(false)}
                    >
                        <ViewTransitionEndItem id={id}>
                            <img src={src} />
                        </ViewTransitionEndItem>
                        <ViewTransitionEndItem id={`title-${id}`}>
                            <h1 className='title'>这是标题</h1>
                        </ViewTransitionEndItem>
                    </ViewTransitionEndGroup>
                </div>
            </div>
        )}
    </>
}