"use client"
import dynamic from "next/dynamic"
const Map = dynamic(() => import("../components/Map"), { ssr: false })
import "./page.scss"
import Sidebar from "@/components/Sidebar";
import DataProvider from '../context/Data';
import { BrowserRouter } from "react-router-dom";

export default function Home() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Map />
        <Sidebar />
      </DataProvider>
    </BrowserRouter>
  );
}
