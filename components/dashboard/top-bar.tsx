"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  DashboardSquare01Icon,
  HospitalBed01Icon,
  Logout03Icon,
  Settings01Icon,
  StethoscopeIcon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Overview", icon: DashboardSquare01Icon },
  { href: "/patients", label: "Patients", icon: UserMultiple02Icon },
  { href: "/wards", label: "Wards", icon: HospitalBed01Icon },
  { href: "/staff", label: "Staff", icon: StethoscopeIcon },
]

const fieldLabel = "text-[11px] leading-none font-semibold text-[#222]"
const fieldInput =
  "h-8 w-full rounded-[4px] border-[#e8e8e8] text-xs font-medium text-[#222] placeholder:text-[#808080]"

function initialsOf(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?"
  )
}

function AccountMenu() {
  const [name, setName] = React.useState("Kara Reyes")
  const [position, setPosition] = React.useState("Charge Nurse")
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [draftName, setDraftName] = React.useState(name)
  const [draftPosition, setDraftPosition] = React.useState(position)

  function openSettings() {
    setDraftName(name)
    setDraftPosition(position)
    setSettingsOpen(true)
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!draftName.trim()) return
    setName(draftName.trim())
    setPosition(draftPosition.trim())
    setSettingsOpen(false)
    toast.success("Account updated")
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Account"
            className="rounded-full transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#797bff]/50 focus-visible:outline-none"
          >
            <Avatar className="size-[22px] after:hidden">
              <AvatarFallback className="bg-[#d9ecff] text-[10px] font-semibold text-[#2277ce]">
                {initialsOf(name)}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-52 rounded-[7px] border-[#e8e8e8]"
        >
          <DropdownMenuLabel className="flex flex-col gap-1 py-2">
            <span className="text-xs leading-none font-semibold text-black">
              {name}
            </span>
            {position && (
              <span className="text-[10px] leading-none font-medium text-[#808080]">
                {position}
              </span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs" onClick={openSettings}>
            <HugeiconsIcon
              icon={Settings01Icon}
              className="size-3.5"
              strokeWidth={2}
            />
            Account settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="text-xs"
            onClick={() => toast.info(`Signed out of ${name}'s session`)}
          >
            <HugeiconsIcon
              icon={Logout03Icon}
              className="size-3.5"
              strokeWidth={2}
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-[400px] rounded-[8px] border-[#e8e8e8] p-0">
          <form onSubmit={submit}>
            <DialogHeader className="border-b border-[#e8e8e8] px-4 py-3.5">
              <DialogTitle className="text-sm font-semibold text-black">
                Account settings
              </DialogTitle>
              <DialogDescription className="text-xs font-medium text-[#808080]">
                Update how your name and position appear across the dashboard.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3.5 px-4 py-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="account-name" className={fieldLabel}>
                  Name
                </Label>
                <Input
                  id="account-name"
                  required
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  placeholder="Kara Reyes"
                  className={fieldInput}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="account-position" className={fieldLabel}>
                  Position label
                </Label>
                <Input
                  id="account-position"
                  value={draftPosition}
                  onChange={(e) => setDraftPosition(e.target.value)}
                  placeholder="Charge Nurse"
                  className={fieldInput}
                />
              </div>
            </div>
            <DialogFooter className="border-t border-[#e8e8e8] bg-[#f7f7f9] px-4 py-3">
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="rounded-[4px] border border-[#e8e8e8] bg-white px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#222] transition-colors hover:bg-[#ececef]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-[4px] bg-[#222] px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#e8e8e8] transition-colors hover:bg-black"
              >
                Save changes
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function TopBar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 flex h-[46px] items-center justify-end border-b border-[#e8e8e8] bg-white pr-4 pl-4">
      <nav
        aria-label="Sections"
        className="absolute left-1/2 flex max-w-[calc(100%-72px)] -translate-x-1/2 items-center gap-1 overflow-x-auto"
      >
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              title={item.label}
              className={cn(
                "flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-[11px] leading-none font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#797bff]/50 focus-visible:outline-none",
                active
                  ? "bg-[#797bff]/15 text-[#4649d8]"
                  : "text-[#808080] hover:bg-[#ececef] hover:text-black"
              )}
            >
              <HugeiconsIcon
                icon={item.icon}
                className="size-3.5"
                strokeWidth={2}
              />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <AccountMenu />
    </header>
  )
}
