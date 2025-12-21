import { useParams, useNavigate } from "react-router"
import { ViewTransitionEnd } from "react-view-transition-flip_dist"
import { items } from "../data"
import "./index.scss"

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = items.find(i => String(i.id) === id)

  const close = () => {
    navigate(-1)
  }

  if (!item) {
    return <div>Item not found</div>
  }

  return (
    <ViewTransitionEnd id={id!} onClose={close} duration={500}>
      <div className="main-box">
        <img src={item.src} alt={item.desc} />
        {
          // <div className="content-box">
          //   <div><h2>这是图片标题</h2></div>
          //   <div>{item.desc}——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容</div>
          // </div>
        }
      </div>
    </ViewTransitionEnd>
  )
}
