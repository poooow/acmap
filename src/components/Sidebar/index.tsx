import Image from "next/image"
import markers from "../../content/markers.json"
import { useDataContext } from '../../context/Data'
import FavList from "../FavList"
import "./styles.scss"
import useCurrentMarker from "@/hooks/useCurrentMarker"
import { Link } from "react-router-dom"

interface Props {
  show: boolean
  toggleSidebar: () => void
}

export default function Sidebar(props: Props) {
  const { show, toggleSidebar } = props
  const { toggleStarred, isStarred } = useDataContext()
  const currentMarker = useCurrentMarker()

  const starDefault = "/images/icons/star.svg"
  const starChecked = "/images/icons/star-starred.svg"

  const showList = () => currentMarker.setId(-1)

  return (
    <div className={`sidebar ${show && 'show'}`}>
      {currentMarker.getId() == -1 && <FavList />}
      {currentMarker.getId() >= 0 &&
        <>
          <div className={`star${isStarred(currentMarker.getId()) ? ' starred' : ''}`}>
            <Image src={isStarred(currentMarker.getId()) ? starChecked : starDefault}
              title="Add to my list"
              alt="Add to my list"
              width={40}
              height={40}
              onClick={() => toggleStarred(currentMarker.getId())} />
            <div className="link"><a href="#" onClick={() => showList()}>My list</a></div>
          </div>
          <Image src={`/images/markers/${currentMarker.getId()}.jpg`}
            className="sidebar-image"
            alt={markers[currentMarker.getId()].name}
            width={150}
            height={150} />
          <h1>{markers[currentMarker.getId()].name}</h1>
          <p>{markers[currentMarker.getId()].description}</p>
        </>
      }
      <div className="close-button" onClick={() => toggleSidebar()}>
        {show ? '▷' : '◁'}
      </div>
    </div>
  )
}