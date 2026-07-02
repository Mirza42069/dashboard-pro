"use client"

import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Copy01Icon,
  HeartPulseIcon,
  Logout03Icon,
  MoreVerticalIcon,
  Settings01Icon,
  StarIcon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useHospital } from "./hospital-provider"
import { SharePopover } from "./share-popover"

const routeSlugs: Record<string, string> = {
  "/": "patient-management-system",
  "/wards": "ward-occupancy",
  "/staff": "staff-directory",
  "/appointments": "appointment-schedule",
  "/analytics": "hospital-analytics",
}

function Crumb({ children, current }: { children: React.ReactNode; current?: boolean }) {
  return (
    <span
      className={cn(
        "text-[10px] leading-none font-semibold",
        current ? "text-black" : "text-[#808080]"
      )}
    >
      {children}
    </span>
  )
}

export function TopBar() {
  const pathname = usePathname()
  const { starred, toggleStarred } = useHospital()
  const slug = routeSlugs[pathname] ?? "patient-management-system"

  return (
    <header className="sticky top-0 z-40 flex h-[46px] items-center justify-between border-b border-[#e8e8e8] bg-white pr-4 pl-4">
      <div className="flex items-center gap-[21px]">
        <HugeiconsIcon icon={HeartPulseIcon} className="size-[18px] text-black" strokeWidth={2} />
        <nav aria-label="Breadcrumb" className="flex items-center gap-1">
          <Crumb>Home</Crumb>
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-2.5 text-[#808080]" strokeWidth={2} />
          <Crumb>mercy-general</Crumb>
          <HugeiconsIcon icon={ArrowRight01Icon} className="size-2.5 text-[#808080]" strokeWidth={2} />
          <Crumb current>{slug}</Crumb>
          <button
            type="button"
            aria-label="Copy page link"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href)
              toast.success("Page link copied")
            }}
            className="ml-1 text-[#808080] transition-colors hover:text-black"
          >
            <HugeiconsIcon icon={Copy01Icon} className="size-3" strokeWidth={2} />
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-[10px] leading-none font-medium text-[#808080]">
          Edited just now
        </span>
        <div className="flex items-center gap-3">
          <SharePopover />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label="Account">
                <Avatar className="size-[22px] after:hidden">
                  <AvatarFallback className="bg-[#d9ecff] text-[10px] font-semibold text-[#2277ce]">
                    KR
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-48 rounded-[10px] border-[#e8e8e8]">
              <DropdownMenuLabel className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-[#222]">Kai Romero</span>
                <span className="text-[10px] font-medium text-[#808080]">Charge Administrator</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-xs"
                onClick={() => toast.info("Profile settings coming soon")}
              >
                <HugeiconsIcon icon={UserCircleIcon} className="size-3.5" strokeWidth={2} />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs"
                onClick={() => toast.info("Workspace settings coming soon")}
              >
                <HugeiconsIcon icon={Settings01Icon} className="size-3.5" strokeWidth={2} />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-xs"
                onClick={() => toast.info("You are signed in as demo")}
              >
                <HugeiconsIcon icon={Logout03Icon} className="size-3.5" strokeWidth={2} />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            type="button"
            aria-label={starred ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={starred}
            onClick={toggleStarred}
            className={cn(
              "transition-colors",
              starred ? "text-[#d19d2c]" : "text-[#808080] hover:text-black"
            )}
          >
            <HugeiconsIcon
              icon={StarIcon}
              className="size-4"
              strokeWidth={2}
              fill={starred ? "#d19d2c" : "none"}
            />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="More options"
                className="text-[#808080] transition-colors hover:text-black data-[state=open]:text-black"
              >
                <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" strokeWidth={2} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-44 rounded-[10px] border-[#e8e8e8]">
              <DropdownMenuItem className="text-xs" onClick={() => window.print()}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs"
                onClick={() => toast.success("Snapshot saved to version history")}
              >
                Save snapshot
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs"
                onClick={() => toast.info("Version history coming soon")}
              >
                Version history
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
