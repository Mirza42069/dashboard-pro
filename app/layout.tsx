import { IBM_Plex_Sans } from "next/font/google"

import "./globals.css"
import { HospitalProvider } from "@/components/dashboard/hospital-provider"
import { TopBar } from "@/components/dashboard/top-bar"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable)}
    >
      <body>
        <HospitalProvider>
          <div className="min-h-svh bg-[#f4f4f6]">
            <TopBar />
            <main className="mx-auto max-w-[1440px] px-4 pt-6 pb-10 sm:px-8 lg:px-[60px]">
              {children}
            </main>
          </div>
          <Toaster position="top-center" />
        </HospitalProvider>
      </body>
    </html>
  )
}
