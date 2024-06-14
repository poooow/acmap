import { useDataContext } from '../../../context/Data'
import Image from "next/image"
import markers from "../../../content/markers.json"
import "./styles.scss"
import useCurrentMarker from '@/hooks/useCurrentMarker'
export default function FavList() {
  const { starIds } = useDataContext()
  const currentMarker = useCurrentMarker()

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
        {starIds.map((id) => (
          <li key={`fav-${id}`}>
            <h2 onClick={() => currentMarker.setSlug(id.toString())}>
              <Image src={`/images/markers/${id}.jpg`} alt={markers[id].name} width={50} height={50} />
              {markers[id].name}
            </h2>
            <p>{markers[id].description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}