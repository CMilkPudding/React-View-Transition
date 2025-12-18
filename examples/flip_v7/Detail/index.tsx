import { useParams, useNavigate } from "react-router"
import { items } from "../data"
import "./index.scss"
// import { ViewTransionDetail } from '@/components/ViewTransion/index.tsx'
import { ViewTransionEnd } from "@/components/ViewTransition";

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = items.find(i => i.id == id)

  const close = () => {
    navigate(-1)
  }

  return (
    <ViewTransionEnd id={id} onClose={close} duration={500}>
      <div className="main-box">
        <img src={item.src} />
        {
          // <div className="content-box">
          //   <div><h2>这是图片标题</h2></div>
          //   <div>{item.desc}——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容——这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容这是图片内容图片内容</div>
          // </div>
        }
      </div>
    </ViewTransionEnd>
  )
}
