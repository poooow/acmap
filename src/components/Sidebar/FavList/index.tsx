import { useDataContext } from '../../../context/Data'
import Image from "next/image"
import markers from "../../../content/markers"
import "./styles.scss"
import useCurrentMarker from '@/hooks/useCurrentMarker'
import { generateGpx } from '@/helpers/generateGpx'

export default function FavList() {
  const { starIds } = useDataContext()
  const currentMarker = useCurrentMarker()

  const handleGpxClick = () => {
    const gpxData = generateGpx(starIds, markers)
    const blob = new Blob([gpxData], { type: 'text/gpx' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'my-list.gpx'
    link.click()
  }

  const FavPlace = (props: { starId: string }) => {
    const { starId } = props

    const currentMarkerContent = markers.find(marker => marker.id === starId)

    if (currentMarkerContent == undefined) return <></>

    return (
      <li key={`fav-${starId}`}>
        <h2 onClick={() => currentMarker.setSlug(starId)}>
          <Image src={`/images/markers/${currentMarkerContent.image.url}`} alt={currentMarkerContent.name} width={50} height={50} />
          {currentMarkerContent.name}
        </h2>
        <p>{currentMarkerContent.description.short}</p>
      </li>
    )
  }

  return (
    <>
      <div className="header">
        <h1>My List</h1>
        <button className='gpx' onClick={handleGpxClick}>export GPX</button>
      </div >
      <ul>
        {!starIds.length &&
          <li className="empty-list">Use{" "}
            <Image src="/images/icons/star-starred.svg"
              title="Star"
              alt="Star"
              width={15}
              height={15} />
            {" "}to add place
          </li>
        }
        {starIds.map((id) => <FavPlace starId={id} key={id} />)}
      </ul>
    </>
  )
}