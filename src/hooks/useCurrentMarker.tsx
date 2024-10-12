"use client"

import { useDataContext } from "@/context/Data"

export default function useCurrentMarker() {
  const { currentContentSlug, setCurrentContentSlug, setSidebarSize } = useDataContext()

  const getSlug = () => {
    return currentContentSlug
  }

  const setSlug = (slug: string) => {
    setCurrentContentSlug(slug)
    setSidebarSize('small')
    window.history.replaceState(null, "", `/${slug}/`)
  }

  return { getSlug, setSlug }
}