import dynamic from "next/dynamic"
const Map = dynamic(() => import("../components/Map"), { ssr: false })
import "./page.scss"
import Sidebar from "@/components/Sidebar"

export default function Home() {
  return (
    <>
      <Map />
      <Sidebar />
    </>
  )
}
