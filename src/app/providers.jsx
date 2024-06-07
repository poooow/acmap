"use client"

import DataProvider from "../context/Data"
import { BrowserRouter } from "react-router-dom"

export function Providers({ children }) {
  return (
    <BrowserRouter>
      <DataProvider>{children}</DataProvider>
    </BrowserRouter>
  );
}
