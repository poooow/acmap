"use client"
import dynamic from "next/dynamic"
import { useState } from "react";
const Map = dynamic(() => import("../components/Map"), { ssr: false })
import "./page.scss"
import Sidebar from "@/components/Sidebar";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import DataProvider from '../context/Data';
import { BrowserRouter } from "react-router-dom";

export default function Home() {
  const [currentMarkerId, setCurrentMarkerId] = useState(-1);
  const [showSidebar, setShowSidebar] = useState(false);

  useDidMountEffect(() => {
    setShowSidebar(true);
  }, [currentMarkerId])

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  return (
    <BrowserRouter>
      <DataProvider>
        <Map />
        <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
      </DataProvider>
    </BrowserRouter>
  );
}
