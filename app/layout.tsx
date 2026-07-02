import { Courier_Prime, Plus_Jakarta_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { HospitalProvider } from "@/components/dashboard/hospital-provider"
import { TopBar } from "@/components/dashboard/top-bar"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
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
      className={cn("antialiased", fontSans.variable, fontMono.variable)}
    >
      <body>
        <ThemeProvider>
          <HospitalProvider>
            <div className="min-h-svh bg-white">
              <TopBar />
              <main className="mx-auto max-w-[1440px] px-[60px] pt-[43px] pb-32">
                {children}
              </main>
              <BottomNav />
            </div>
            <Toaster position="top-center" />
          </HospitalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
