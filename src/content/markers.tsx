import cz from "./cz.json"
import sk from "./sk.json"
import ug from "./ug.json"

type Markers = {
  id: string
  geocode: number[]
  name: string
  description: {
    short: string
    long: string
  }
  image: {
    url: string
    alt: string
    license: string
  }
  resourceLinks: {
    domain: string
    url: string
  }[]
}[]

const countriesMarkers:{[country:string]: Markers} = { cz: cz, sk: sk, ug: ug }

let markers: Markers = []

const countryCodes = Object.keys(countriesMarkers)

countryCodes.forEach((countryCode) => {
  let countryMarkers = countriesMarkers[countryCode]
  
  countryMarkers.forEach((marker) => {
    marker.id = countryCode + marker.id
    markers.push(marker)
  })
})

export default markers