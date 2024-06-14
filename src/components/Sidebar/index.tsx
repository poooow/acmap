"use client"
import Image from "next/image"
import markers from "../../content/markers.json"
import { useDataContext } from '../../context/Data'
import FavList from "./FavList"
import "./styles.scss"
import useCurrentMarker from "@/hooks/useCurrentMarker"
import isNumeric from "@/helpers/isNumeric"
import { MouseEvent } from "react"
import About from "./About"

export default function Sidebar() {
  const { toggleStarred, isStarred, showSidebar, setShowSidebar } = useDataContext()
  const currentMarker = useCurrentMarker()

  const starDefault = "/images/icons/star.svg"
  const starChecked = "/images/icons/star-starred.svg"

  const showList = (e: MouseEvent) => {
    e.preventDefault()
    currentMarker.setSlug("my-list")
  }

  const slugNum = isNumeric(currentMarker.getSlug()) ? Number(currentMarker.getSlug()) : -1

  return (
    <div className={`sidebar${showSidebar ? ' show' : ''}`}>
      <div className="sidebar-container">
        {currentMarker.getSlug() === "my-list" && <FavList />}
        {slugNum >= 0 &&
          <>
            <div className={`star${isStarred(slugNum) ? ' starred' : ''}`}>
              <Image src={isStarred(slugNum) ? starChecked : starDefault}
                title="Add to my list"
                alt="Add to my list"
                width={40}
                height={40}
                onClick={() => toggleStarred(slugNum)} />
              <div className="link"><a href="" onClick={(e) => showList(e)}>My list</a></div>
            </div>
            <Image src={`/images/markers/${slugNum}.jpg`}
              className="sidebar-image"
              alt={markers[slugNum].name}
              width={150}
              height={150} />
            <h1>{markers[slugNum].name}</h1>
            <p>{markers[slugNum].description}</p>
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