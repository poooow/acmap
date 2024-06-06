import { useDataContext } from "@/context/Data"
import { useEffect } from "react"
import { useSearchParams } from 'react-router-dom'

export default function useCurrentMarker() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { currentMarkerId, setCurrentMarkerId, setShowSidebar } = useDataContext()

  const setParamId = (id: number) => {
    setSearchParams({ 'id': id.toString() })
  }

  useEffect(() => {
    const markerId = searchParams.get('id')
    if (markerId !== null) setId(Number(markerId))
  }, [])

  const getId = () => {
    return currentMarkerId
  }

  const setId = (id: number) => {
    setCurrentMarkerId(id)
    setParamId(id)
    setShowSidebar(true)
  }

  return { setId, getId }
}