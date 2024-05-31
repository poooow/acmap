"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "./styles.scss";

type Markers = {
  geocode: [number, number]
  popup: string
}[]

export default function Home() {

  const markers: Markers = [
    {
      "geocode": [50.0755, 14.4378],
      "popup": "Prague - The capital city, known for its Old Town Square, the Astronomical Clock, and the Charles Bridge."
    },
    {
      "geocode": [48.9730, 14.4754],
      "popup": "Český Krumlov - A picturesque town with a historic castle, charming streets, and the Vltava River."
    },
    {
      "geocode": [49.7435, 13.3736],
      "popup": "Plzeň - Famous for Pilsner beer, the Pilsner Urquell Brewery, and the Gothic St. Bartholomew's Cathedral."
    },
    {
      "geocode": [50.2320, 12.8713],
      "popup": "Karlovy Vary - Renowned spa town with hot springs, colonnades, and the International Film Festival."
    },
    {
      "geocode": [49.1951, 16.6068],
      "popup": "Brno - The second-largest city, home to the Špilberk Castle, Villa Tugendhat, and a vibrant cultural scene."
    },
    {
      "geocode": [49.9428, 15.3815],
      "popup": "Kutná Hora - Historic town with the Gothic St. Barbara's Church and the Sedlec Ossuary, known as the Bone Church."
    },
    {
      "geocode": [50.7725, 15.0684],
      "popup": "Bohemian Switzerland - A national park with stunning sandstone formations, the Pravčická Archway, and beautiful hiking trails."
    },
    {
      "geocode": [50.3649, 14.4843],
      "popup": "Terezín - Historical site of the Terezín concentration camp, now a memorial and museum."
    },
    {
      "geocode": [50.6793, 14.0346],
      "popup": "Hřensko - Gateway to the Bohemian Switzerland National Park, known for the Elbe Sandstone Mountains and scenic boat rides."
    },
    {
      "geocode": [49.4895, 16.7713],
      "popup": "Moravian Karst - A karst landscape with caves, gorges, and the famous Macocha Abyss."
    }
  ];

  const markerIcon = new Icon({
    iconUrl: '/images/marker.svg',
    iconSize: [60, 60]
  })

  const createCustomClusterIcon = (cluster: { getChildCount: () => any; }) => {
    return new DivIcon({
      html: `<div>${cluster.getChildCount()}</div>`,
      className: "cluster-icon",
      iconSize: [40, 40]
    })
  }

  return (
    <MapContainer center={[50, 16]} zoom={5}>
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
        {markers.map((marker, index) => (
          <Marker position={marker.geocode} icon={markerIcon} key={index}>
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
