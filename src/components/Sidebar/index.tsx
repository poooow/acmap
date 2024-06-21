"use client"
import Image from "next/image"
import markers from "../../content/markers"
import { useDataContext } from '../../context/Data'
import FavList from "./FavList"
import "./styles.scss"
import useCurrentMarker from "@/hooks/useCurrentMarker"
import isMarkerTextId from "@/helpers/isMarkerTextId"
import { MouseEvent } from "react"
import About from "./About"
import Markdown from 'react-markdown'

export default function Sidebar() {
  const { toggleStarred, isStarred, showSidebar, setShowSidebar } = useDataContext()
  const currentMarker = useCurrentMarker()

  const starDefault = "/images/icons/star.svg"
  const starChecked = "/images/icons/star-starred.svg"

  const showList = (e: MouseEvent) => {
    e.preventDefault()
    currentMarker.setSlug("my-list")
  }

  const markerTextId = currentMarker.getSlug()
  const currentMarkerContent = markers.find(marker => marker.id === markerTextId)
  let showMarker = isMarkerTextId(markerTextId)

  return (
    <div className={`sidebar${showSidebar ? ' show' : ''}`}>
      <div className="sidebar-container">
        {currentMarker.getSlug() === "my-list" && <FavList />}
        {showMarker && currentMarkerContent &&
          <>
            <div className={`star${isStarred(markerTextId) ? ' starred' : ''}`}>
              <Image src={isStarred(markerTextId) ? starChecked : starDefault}
                title="Add to my list"
                alt="Add to my list"
                width={40}
                height={40}
                onClick={() => toggleStarred(markerTextId)} />
              <div className="link"><a href="" onClick={(e) => showList(e)}>My list</a></div>
            </div>
            <Image src={`/images/markers/${currentMarkerContent.image.url}`}
              className="sidebar-image"
              alt={currentMarkerContent.image.alt}
              width={150}
              height={150} />
            <h1>{currentMarkerContent.name}</h1>
            <Markdown>{currentMarkerContent.description.short}</Markdown>
            <Markdown>{currentMarkerContent.description.long}</Markdown>
            <h3>Resources</h3>
            <ul>
              {currentMarkerContent.resourceLinks.map((link, index) => (
                <li key={index}><a href={link.url} target="_blank">{link.domain}</a></li>
              ))}
            </ul>
            <h3>Map</h3>
            <ul>
              <li>
                <a href={`https://www.google.com/maps/search/?api=1&query=${currentMarkerContent.geocode[0]}%2C${currentMarkerContent.geocode[1]}`} target="_blank">
                  Google maps ↗
                </a>
              </li>
              <li>
                <a href={`http://www.openstreetmap.org/?mlat=${currentMarkerContent.geocode[0]}&mlon=${currentMarkerContent.geocode[1]}&zoom=12`} target="_blank">
                  Open street map ↗
                </a>
              </li>
            </ul>
          </>
        }
        {currentMarker.getSlug() === "about" && <About />}
        <div className="close-button" onClick={() => setShowSidebar(!showSidebar)}>
          {showSidebar ? '▷' : '◁'}
        </div>
      </div>
    </div>
  )
}