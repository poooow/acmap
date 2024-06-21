import { useDataContext } from '../../../context/Data'
import Image from "next/image"
import markers from "../../../content/markers"
import "./styles.scss"
import useCurrentMarker from '@/hooks/useCurrentMarker'

export default function FavList() {
  const { starIds } = useDataContext()
  const currentMarker = useCurrentMarker()

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
      <h1>My List</h1>
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