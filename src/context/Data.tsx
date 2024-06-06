import { useEffect, useState, createContext, useContext } from 'react'

const STAR_IDS_KEY = 'starIds'

interface DataContext {
  starIds: number[]
  setStarIds(ids: number[]): void
  isStarred(id: number): boolean
  setStarred(id: number): void
  removeStarred(id: number): void
  toggleStarred(id: number): void
  currentMarkerId: number
  setCurrentMarkerId(id: number): void
  showSidebar: boolean
  setShowSidebar(arg0: boolean): void
}

const DataContext = createContext({} as DataContext)
const DataProvider = (props: { children: React.ReactNode }) => {
  const [starIds, setStarIds] = useState<number[]>([])
  const [currentMarkerId, setCurrentMarkerId] = useState<number>(-1)
  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (starIds.length) {
      saveStarIds(starIds)
    }
  }, [starIds])

  useEffect(() => {
    const fetchLocalData = async () => {
      setStarIds(loadStarIds())
    }
    fetchLocalData()
  }, [])


  const loadStarIds = () => {
    const data = window.localStorage.getItem(STAR_IDS_KEY)
    return data !== null ? JSON.parse(data) : starIds
  }

  const saveStarIds = (starIds: number[]) => {
    window.localStorage.setItem(STAR_IDS_KEY, JSON.stringify(starIds))
    setStarIds(starIds)
  }

  const isStarred = (id: number) => {
    return starIds.includes(id)
  }

  const setStarred = (id: number) => {
    const index = starIds.indexOf(id)

    if (index === -1) {
      setStarIds([...starIds, id])
    }
  }

  const removeStarred = (id: number) => {
    setStarIds(starIds.filter(e => e !== id))
  }

  const toggleStarred = (id: number) => {
    if (!isStarred(id)) {
      setStarred(id)
    } else {
      removeStarred(id)
    }
  }

  return (
    <DataContext.Provider
      value={{
        starIds,
        setStarIds,
        isStarred,
        setStarred,
        removeStarred,
        toggleStarred,
        currentMarkerId,
        setCurrentMarkerId,
        showSidebar,
        setShowSidebar
      }}>
      {props.children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => useContext(DataContext)
export default DataProvider