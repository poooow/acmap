"use client"
import { useDataContext } from '../../context/Data'
import FavList from "./FavList"
import "./styles.scss"
import useCurrentMarker from "@/hooks/useCurrentMarker"
import isMarkerTextId from "@/helpers/isMarkerTextId"
import Marker from "./Marker"
import About from "./About"

export default function Sidebar() {
  const { showSidebar, setShowSidebar } = useDataContext()
  const currentMarker = useCurrentMarker()

  const Content = () => {
    if (currentMarker.getSlug() === "my-list") return <FavList />
    else if (isMarkerTextId(currentMarker.getSlug())) return <Marker />
    else if (currentMarker.getSlug() === "about") return <About />
  }

  return (
    <div className={`sidebar${showSidebar ? ' show' : ''}`}>
      <div className="sidebar-container">
        <Content />
        <div className="close-button" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? '▷' : '◁'}
        </div>
      </div>
    </div>
  )
}