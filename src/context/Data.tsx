"use client"

import { useEffect, useState, createContext, useContext } from 'react'

const STAR_IDS_KEY = 'starIds'
const USER_KEY = 'userData'

type SidebarSize = 'none' | 'small' | 'large'

export type MapPosition = {
  lat: number,
  lng: number,
  zoom: number
}

type UserData = {
  lastPosition: MapPosition
}

interface DataContext {
  starIds: string[]
  setStarIds(ids: string[]): void
  isStarred(id: string): boolean
  setStarred(id: string): void
  removeStarred(id: string): void
  toggleStarred(id: string): void
  currentContentSlug: string
  setCurrentContentSlug(slug: string): void
  sidebarSize: SidebarSize
  setSidebarSize(arg0: SidebarSize): void
  userData: UserData | null
  setUserData(arg0: UserData): void
  currentParams: URLSearchParams | null
  setCurrentParams(arg0: URLSearchParams): void
  mapRef: L.Map | null
  setMapRef(arg0: L.Map): void
  setView(lat: number, lng: number, zoom: number): void
}

const DataContext = createContext({} as DataContext)
const DataProvider = (props: { children: React.ReactNode }) => {
  const [starIds, setStarIds] = useState<string[]>([])
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentContentSlug, setCurrentContentSlug] = useState<string>("about")
  const [currentParams, setCurrentParams] = useState<URLSearchParams | null>(null)
  const [sidebarSize, setSidebarSize] = useState<SidebarSize>('none')
  const [mapRef, setMapRef] = useState<L.Map | null>(null)

  useEffect(() => {
    if (starIds.length) {
      saveStarIds(starIds)
    }

    if (userData) {
      saveUserData(userData)
    }
  }, [starIds, userData])

  useEffect(() => {
    const fetchLocalData = async () => {
      setStarIds(loadStarIds())
      setUserData(loadUserData())
    }
    fetchLocalData()
  }, [])


  const loadStarIds = () => {
    const data = window.localStorage.getItem(STAR_IDS_KEY)
    return data !== null ? JSON.parse(data) : starIds
  }

  const loadUserData = () => {
    const data = window.localStorage.getItem(USER_KEY)
    return data !== null ? JSON.parse(data) : []
  }

  const saveUserData = (userData: UserData) => {
    window.localStorage.setItem(USER_KEY, JSON.stringify(userData))
  }

  const saveStarIds = (starIds: string[]) => {
    window.localStorage.setItem(STAR_IDS_KEY, JSON.stringify(starIds))
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

  const setView = (lat: number, lng: number, zoom: number) => {
    if (mapRef) mapRef.setView([lat, lng], zoom)
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
        sidebarSize,
        setSidebarSize,
        userData,
        setUserData,
        currentParams,
        setCurrentParams,
        mapRef,
        setMapRef,
        setView
      }}>
      {props.children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => useContext(DataContext)
export default DataProvider