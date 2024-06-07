"use client"

import { useDataContext } from "@/context/Data"

export default function useCurrentMarker() {
  const { currentContentSlug, setCurrentContentSlug, setShowSidebar } = useDataContext()

  const getSlug = () => {
    return currentContentSlug
  }

  const setSlug = (slug: string) => {
    setCurrentContentSlug(slug)
    setShowSidebar(true)
    window.history.replaceState(null, "", `/${slug}/`)
  }

  return { getSlug, setSlug }
}