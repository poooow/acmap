"use client"

import { useEffect, useState, useMemo } from 'react'
import { useDataContext } from '../../context/Data'
import FavList from "./FavList"
import "./styles.scss"
import useCurrentMarker from "@/hooks/useCurrentMarker"
import isMarkerTextId from "@/helpers/isMarkerTextId"
import Marker from "./Marker"
import About from "./About"
import useSwipe from '@/hooks/useSwipe'

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(true)
  const { sidebarSize, setSidebarSize } = useDataContext()
  const currentMarker = useCurrentMarker()
  const swipeHandlers = useSwipe({
    onSwipedUp: () => sidebarSize === 'none' ? setSidebarSize('small') : setSidebarSize('large'),
    onSwipedDown: () => setSidebarSize('none'),
    onSwipedLeft: () => sidebarSize === 'none' ? setSidebarSize('small') : setSidebarSize('large'),
    onSwipedRight: () => setSidebarSize('none'),
    directionFilter: isMobile ? 'vertical' : 'horizontal'
  })

  useEffect(() => {    
    setIsMobile(window.screen.width < 960)
    window.addEventListener("resize", () => setIsMobile(window.screen.width < 960))
  }, [])

  const Content = useMemo(() => {
    if (currentMarker.getSlug() === "my-list") return <FavList />
    else if (isMarkerTextId(currentMarker.getSlug())) return <Marker />
    else if (currentMarker.getSlug() === "about") return <About />
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMarker.getSlug()])

  return (
    <div
      className={`sidebar swipable ${sidebarSize}`}
      {...swipeHandlers}
    >
      <div className="sidebar-container">
        {Content}
        <div
          className="close-button swipable"
          onClick={() => sidebarSize === 'none' ? setSidebarSize('small') : setSidebarSize('none')}>
          {sidebarSize !== 'none' ? '||' : '◁'}
        </div>
      </div>
    </div>
  )
}