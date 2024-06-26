import { Markers } from "../content/markers"

export   const generateGpx = (starIds: string[], markers: Markers) => {
  const starredMarkers = markers.filter(marker => starIds.includes(marker.id))
  const gpxDoc = document.createElement('gpx')
  gpxDoc.setAttribute('version', '1.1')
  gpxDoc.setAttribute('creator', 'AC Map')

  starredMarkers.forEach((starredMarker) => {
    const wpt = document.createElement('wpt')
    wpt.setAttribute('lat', starredMarker.geocode[0].toString())
    wpt.setAttribute('lon', starredMarker.geocode[1].toString())
    const name = document.createElement('name')
    name.innerText = starredMarker.name
    wpt.appendChild(name)
    gpxDoc.appendChild(wpt)
  })

  const serializer = new XMLSerializer()
  // Replace correct gpx namespace
  return serializer.serializeToString(gpxDoc).replace(/xmlns=\"(.*?)\"/g, 'http://www.topografix.com/GPX/1/1');
}