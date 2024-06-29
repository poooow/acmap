import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from './providers'
import "../styles/index.scss"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "World Travel Map",
  description: "Interactive travel map & wishlist builder. Explore places, create your travel list & plan your dream trip",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
