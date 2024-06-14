import dynamic from "next/dynamic"
const Map = dynamic(() => import("../../components/Map"), { ssr: false })
import Sidebar from "@/components/Sidebar"
import "./page.scss"
import Menu from "@/components/Menu"

export default function Home() {
  return (
    <>
      <Map />
      <Sidebar />
      <Menu />
    </>
  )
}
