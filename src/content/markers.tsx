import cz from "./cz.json"
import sk from "./sk.json"
import ug from "./ug.json"
import vn from "./vn.json"
import ma from "./ma.json"
import kh from "./kh.json"
import nz from "./nz.json"
import la from "./la.json"
import cu from "./cu.json"
import ir from "./ir.json"

export type Markers = {
  id: string
  geocode: {
    lat: number
    lon: number
  }
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

const countriesMarkers:{[country:string]: Markers} = { cz: cz, sk: sk, ug: ug, vn: vn, ma: ma, kh: kh, nz: nz, la: la, cu: cu, ir: ir }

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