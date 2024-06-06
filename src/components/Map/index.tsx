"use client"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import { DivIcon, LeafletMouseEvent } from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import markers from "../../content/markers.json"
import { useDataContext } from '../../context/Data'
import "leaflet/dist/leaflet.css"
import "./styles.scss"
import useCurrentMarker from "@/hooks/useCurrentMarker"

export default function Map() {
  const currentMarker = useCurrentMarker()
  const { isStarred, toggleStarred } = useDataContext()

  var markerIcon = (id: number, title: string) => new DivIcon({
    className: `marker-icon`,
    html: `<div class="marker-image-container${isStarred(id) ? ' starred' : ""}${id === currentMarker.getId() ? " current" : ""}">
             <div class="star"></div>
             <img class="marker-image" src="/images/markers/${id}.jpg"/>
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

  // Allow attach click event on map container
  function MapClickComponent() {
    useMapEvents({
      click: () => {
        currentMarker.setId(-1)
      }
    })
    return null
  }

  const handleMarkerClick = (e: LeafletMouseEvent, markerId: number) => {
    //@ts-ignore
    if (e.originalEvent.target.classList.contains("star")) {
      toggleStarred(markerId)
    } else {
      currentMarker.setId(markerId)
    }
  }

  return (
    <MapContainer center={[50, 16]} zoom={7} closePopupOnClick={true}>
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
            icon={markerIcon(marker.id, marker.name)}
            key={marker.id}
            eventHandlers={{
              click: (e) => handleMarkerClick(e, marker.id)
            }}>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <MapClickComponent />
    </MapContainer>
  )
}
