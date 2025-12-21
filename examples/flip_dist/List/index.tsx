import { useNavigate, Outlet } from "react-router"
import { useState } from "react"
import { ViewTransitionStart, type CaptureMode } from "react-view-transition-flip_dist"
import { type IItem, items } from '../data'
import './index.scss'

export default function Page() {
    const navigate = useNavigate()
    const [mode, setMode] = useState<CaptureMode>('observe')
    const [ value, setValue ] = useState("");

    const handleItemClick = (item: IItem) => {
        navigate(`${item.id}`) // 相对跳转
    }
    const onClickBtn = () => {
        setMode(mode === 'click' ? 'observe' : 'click')
    }
    return (
        <>
            <div >
                <button onClick={onClickBtn}>模式切换——{mode}</button>
                {mode === 'observe' && (
                    <>
                    {/* 注：首次输入未出现在页面中的元素，可测试元素未被记录边界这种兜底情况（小红书直接通过url跳转） */}
                        <input value={value} onChange={(e) => setValue(e.target.value)}  type="text" style={{ width: '100px', marginLeft: '20px' }} placeholder="请输入id" />
                        <button onClick={() => navigate(value)}>随机显示列表中的某一项</button>
                    </>
                )}
            </div>
            <div className="wrapper" >
                {
                    items.map((item, i) => (
                        <ViewTransitionStart className="item" key={i} id={item.id} onClick={() => handleItemClick(item)} mode={mode}>
                            {/* <img src={item.src} /> */}

                            {/* 注：这里仅用于测试使用 */}
                            <div style={{ position: 'relative', height: '100%', width: '100%' }}>
                                <img src={item.src} />
                                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>{i}</div>
                            </div>
                        </ViewTransitionStart>
                    ))
                }
            </div>

            {/* 子路由在这里渲染，而不是替换整个页面 */}
            <Outlet />
        </>
    )
}