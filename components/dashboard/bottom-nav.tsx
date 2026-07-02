"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  Analytics01Icon,
  Calendar03Icon,
  HospitalBed01Icon,
  StethoscopeIcon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

const items: { href: string; label: string; icon: IconSvgElement }[] = [
  { href: "/", label: "Patients", icon: UserMultiple02Icon },
  { href: "/wards", label: "Wards", icon: HospitalBed01Icon },
  { href: "/staff", label: "Staff", icon: StethoscopeIcon },
  { href: "/appointments", label: "Schedule", icon: Calendar03Icon },
  { href: "/analytics", label: "Analytics", icon: Analytics01Icon },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-1 rounded-full bg-[#222]/95 p-1.5 shadow-[0px_16px_40px_0px_rgba(0,0,0,0.28),0px_2px_8px_0px_rgba(0,0,0,0.16)] backdrop-blur-sm">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] leading-none font-semibold transition-all duration-200",
                active
                  ? "bg-white text-black shadow-[0px_1px_3px_0px_rgba(0,0,0,0.2)]"
                  : "text-[#9a9a9a] hover:bg-white/10 hover:text-white"
              )}
            >
              <HugeiconsIcon icon={item.icon} className="size-4" strokeWidth={2} />
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
