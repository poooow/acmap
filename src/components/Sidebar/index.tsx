"use client"

import { useDataContext } from '../../context/Data'
import FavList from "./FavList"
import "./styles.scss"
import useCurrentMarker from "@/hooks/useCurrentMarker"
import isMarkerTextId from "@/helpers/isMarkerTextId"
import Marker from "./Marker"
import About from "./About"
import useSwipe from '@/hooks/useSwipe'

export default function Sidebar() {
  const { sidebarSize, setSidebarSize } = useDataContext()
  const currentMarker = useCurrentMarker()
  const swipeHandlers = useSwipe({
    onSwipedUp: () => sidebarSize === 'none' ? setSidebarSize('small') : setSidebarSize('large'),
    onSwipedDown: () => setSidebarSize('none'),
    onSwipedLeft: () => sidebarSize === 'none' ? setSidebarSize('small') : setSidebarSize('large'),
    onSwipedRight: () => setSidebarSize('none')
  })

  const Content = () => {
    if (currentMarker.getSlug() === "my-list") return <FavList />
    else if (isMarkerTextId(currentMarker.getSlug())) return <Marker />
    else if (currentMarker.getSlug() === "about") return <About />
  }


  return (
    <div
      className={`sidebar ${sidebarSize}`}
      {...swipeHandlers}
    >
      <div className="sidebar-container">
        <Content />
        <div
          className="close-button"
          onClick={() => sidebarSize === 'none' ? setSidebarSize('small') : setSidebarSize('none')}>
          {sidebarSize !== 'none' ? '||' : '◁'}
        </div>
      </div>
    </div>
  )
}