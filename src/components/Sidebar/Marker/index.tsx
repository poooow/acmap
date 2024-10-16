import Image from "next/image"
import Markdown from 'react-markdown'
import markers from "../../../content/markers"
import { useDataContext } from '../../../context/Data'
import { MouseEvent } from "react"
import useCurrentMarker from "@/hooks/useCurrentMarker"
import "./styles.scss"

export default function About() {
  const { toggleStarred, isStarred, setView } = useDataContext()
  const currentMarker = useCurrentMarker()
  const markerTextId = currentMarker.getSlug()
  const starDefault = "/images/icons/star.svg"
  const starChecked = "/images/icons/star-starred.svg"
  const currentMarkerContent = markers.find(marker => marker.id === markerTextId)

  const showList = (e: MouseEvent) => {
    e.preventDefault()
    currentMarker.setSlug("my-list")
  }

  if (!currentMarkerContent) return <></>

  return (
    <>
      <div className="header">
        <Image src={`/images/markers/${currentMarkerContent.image.url}`}
          className="sidebar-image"
          alt={currentMarkerContent.image.alt}
          width={150}
          height={150}
        />
        <div className="focus" onClick={() => setView(currentMarkerContent.geocode.lat, currentMarkerContent.geocode.lon, 12)}>
          <Image title="Focus" alt="Focus" src="/images/icons/focus.svg" width={40} height={40} />
        </div>
        <div className={`star${isStarred(markerTextId) ? ' starred' : ''}`}>
          <Image src={isStarred(markerTextId) ? starChecked : starDefault}
            title="Add to my list"
            alt="Add to my list"
            width={40}
            height={40}
            onClick={() => toggleStarred(markerTextId)} />
          <button className="link"><a href="" onClick={(e) => showList(e)}>My list</a></button>
        </div>
      </div>
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
          <a href={`https://www.google.com/maps/search/?api=1&query=${currentMarkerContent.geocode.lat}%2C${currentMarkerContent.geocode.lon}`} target="_blank">
            Google maps ↗
          </a>
        </li>
        <li>
          <a href={`http://www.openstreetmap.org/?mlat=${currentMarkerContent.geocode.lat}&mlon=${currentMarkerContent.geocode.lon}&zoom=12`} target="_blank">
            Open street map ↗
          </a>
        </li>
      </ul>
      <div className="copyright">Image licence: {currentMarkerContent.image.license}</div>
    </>
  )
}