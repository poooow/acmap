"use client"

import { useEffect, useState } from "react"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import { DivIcon, LeafletMouseEvent } from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import markers from "../../content/markers"
import { useDataContext } from '../../context/Data'
import "leaflet/dist/leaflet.css"
import "./styles.scss"
import useCurrentMarker from "@/hooks/useCurrentMarker"

export default function Map() {
  const currentMarker = useCurrentMarker()
  const { isStarred, toggleStarred, sidebarSize, setSidebarSize, userData, setUserData } = useDataContext()
  const [isInitPositionSet, setisInitPositionSet] = useState(false)
  const [mapRef, setMapRef] = useState<L.Map | null>(null)

  useEffect(() => {
    // Set position on first load
    if (!isInitPositionSet && userData?.lastPosition && mapRef) {
      setView(userData.lastPosition.lat, userData.lastPosition.lng, userData.lastPosition.zoom)
      setisInitPositionSet(true)
    }
  }, [userData, mapRef])

  function setView(lat: number, lng: number, zoom: number) {
    if (mapRef) mapRef.setView([lat, lng], zoom)
  }

  const markerIcon = (textId: string, title: string, url: string) => new DivIcon({
    className: `marker-icon`,
    html: `<div class="marker-image-container${isStarred(textId) ? ' starred' : ""}${textId === currentMarker.getSlug() ? " current" : ""}">
             <div class="star"></div>
             <img class="marker-image" src="/images/markers/${url}"/>
           </div>
           <div class="marker-title">${title}</div>`,
  })

  const createCustomClusterIcon = (cluster: { getChildCount: () => any }) => {
    return new DivIcon({
      html: `<div>${cluster.getChildCount()}</div>`,
      className: "cluster-icon",
      iconSize: [40, 40]
    })
  }

  // Allow attach events on map container
  function MapController() {
    useMapEvents({
      click: () => {
        currentMarker.setSlug("my-list")
      },
      moveend: (e) => { // Save current position to local storage
        const { lat, lng } = e.target.getCenter()
        const lastPosition = { lat, lng, zoom: e.target.getZoom() }
        if (lastPosition) setUserData({ ...userData, lastPosition: lastPosition })
      }
    })
    return null
  }

  const handleMarkerClick = (e: LeafletMouseEvent, markerId: string) => {
    //@ts-ignore
    if (e.originalEvent.target.classList.contains("star")) {
      toggleStarred(markerId)
    } else {
      currentMarker.setSlug(markerId.toString())
      sidebarSize === 'none' && setSidebarSize('small')
    }
  }

  return (
    <MapContainer center={[50, 16]} zoom={3} closePopupOnClick={true} ref={setMapRef}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      //url="https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}.png"
      //url="https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png"
      //url="https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png"
      //url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      //url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}.png"
      //url="https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {markers.map((marker) => (
          //@ts-ignore
          <Marker position={marker.geocode}
            icon={markerIcon(marker.id, marker.name, marker.image.url)}
            key={marker.id}
            eventHandlers={{
              click: (e) => handleMarkerClick(e, marker.id)
            }}>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <MapController />
    </MapContainer>
  )
}
