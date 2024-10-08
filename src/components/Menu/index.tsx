'use client'

import useCurrentMarker from "@/hooks/useCurrentMarker"
import HamburgerIcon from "../../assets/hamburgerIcon.jsx"
import "./styles.scss"

export default function Menu() {
  const currentMarker = useCurrentMarker()

  return (
    <div className="menu">
      <div className="menu-list">
        <ul>
          <li onClick={() => currentMarker.setSlug("about")}>About</li>
        </ul>
      </div>
      <div className="menu-button">
        <HamburgerIcon />
      </div>
    </div>
  )
}