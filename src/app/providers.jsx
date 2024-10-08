'use client'

import DataProvider from "../context/Data";
import { BrowserRouter } from "react-router-dom";

export function Providers({ children }) {
  // Prevent router ssr
  if (typeof window === "undefined")
    return <DataProvider>{children}</DataProvider>;

  return (
    <BrowserRouter>
      <DataProvider>{children}</DataProvider>
    </BrowserRouter>
  );
}
