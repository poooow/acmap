"use client"

import { useDataContext } from "@/context/Data"
import { useSearchParams } from 'next/navigation'

export default function useCurrentMarker() {
  const { currentContentSlug, setCurrentContentSlug, currentParams, setCurrentParams } = useDataContext()
  const searchParams = new URLSearchParams(useSearchParams())

  const getSlug = () => {
    return currentContentSlug
  }

  const setSlug = (slug: string) => {
    const path = slug + (currentParams ? '?' + currentParams.toString() : '')
    window.history.replaceState(null, "", path)
    setCurrentContentSlug(slug)
  }

  const setPath = (slug: string, params: { [key: string]: string }) => {
    Object.keys(params).forEach(key => {
      searchParams.set(key, params[key])
    })

    window.history.replaceState(null, "", `${slug}?${searchParams.toString()}`)
    setCurrentContentSlug(slug)
    setCurrentParams(searchParams)
  }

  return { getSlug, setSlug, setPath }
}