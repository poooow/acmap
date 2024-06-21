"use client"

import { useEffect, useState, createContext, useContext } from 'react'

const STAR_IDS_KEY = 'starIds'

interface DataContext {
  starIds: string[]
  setStarIds(ids: string[]): void
  isStarred(id: string): boolean
  setStarred(id: string): void
  removeStarred(id: string): void
  toggleStarred(id: string): void
  currentContentSlug: string
  setCurrentContentSlug(slug: string): void
  showSidebar: boolean
  setShowSidebar(arg0: boolean): void
}

const DataContext = createContext({} as DataContext)
const DataProvider = (props: { children: React.ReactNode }) => {
  const [starIds, setStarIds] = useState<string[]>([])
  const [currentContentSlug, setCurrentContentSlug] = useState<string>("")
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

  const saveStarIds = (starIds: string[]) => {
    window.localStorage.setItem(STAR_IDS_KEY, JSON.stringify(starIds))
    setStarIds(starIds)
  }

  const isStarred = (id: string) => {
    return starIds.includes(id)
  }

  const setStarred = (id: string) => {
    const index = starIds.indexOf(id)

    if (index === -1) {
      setStarIds([...starIds, id])
    }
  }

  const removeStarred = (id: string) => {
    setStarIds(starIds.filter(e => e !== id))
  }

  const toggleStarred = (id: string) => {
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
        currentContentSlug,
        setCurrentContentSlug,
        showSidebar,
        setShowSidebar
      }}>
      {props.children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => useContext(DataContext)
export default DataProvider