"use client"

import * as React from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  Link04Icon,
  SquareLock02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const people = [
  { name: "Michelle Myers", email: "mmyers@stanford-med.org", initials: "MM", bg: "#d9ecff", fg: "#2277ce", role: "can edit" },
  { name: "Alexandra Joy", email: "ajoy@stanford-med.org", initials: "AJ", bg: "#e3f6e2", fg: "#0d8a08", role: "can edit" },
  { name: "Tiffany White", email: "twhite@stanford-med.org", initials: "TW", bg: "#f3e6fb", fg: "#8f3bbf", role: "owner" },
]

export function SharePopover() {
  const [invite, setInvite] = React.useState("")

  function sendInvite() {
    if (!invite.trim()) return
    toast.success(`Invite sent to ${invite.trim()}`)
    setInvite("")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-[3px] rounded-[6px] bg-[#222] px-2 py-1 transition-colors hover:bg-black"
        >
          <HugeiconsIcon icon={Link04Icon} className="size-3.5 text-[#e8e8e8]" strokeWidth={2} />
          <span className="text-[11px] leading-none font-medium text-[#e8e8e8]">Share</span>
          <HugeiconsIcon icon={ArrowDown01Icon} className="size-2.5 text-[#e8e8e8]" strokeWidth={2} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-[340px] rounded-[12px] border-[#e8e8e8] p-0 shadow-[0px_12px_32px_0px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 border-b border-[#e8e8e8] p-3">
          <Input
            value={invite}
            onChange={(e) => setInvite(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendInvite()}
            placeholder="Email, name..."
            className="h-7 rounded-[6px] border-[#e8e8e8] text-xs placeholder:text-[#808080]"
          />
          <button
            type="button"
            onClick={sendInvite}
            className="shrink-0 rounded-[6px] bg-[#222] px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#e8e8e8] transition-colors hover:bg-black"
          >
            Invite
          </button>
        </div>

        <div className="flex flex-col gap-3 border-b border-[#e8e8e8] p-3">
          <p className="text-[10px] leading-none font-semibold text-[#808080]">General access</p>
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-[8px] bg-[#f4f3f3]">
              <HugeiconsIcon icon={UserGroupIcon} className="size-3.5 text-[#222]" strokeWidth={2} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-xs leading-none font-semibold text-[#222]">Only those invited</span>
              <span className="text-[10px] leading-none font-medium text-[#808080]">4 people</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-[8px] bg-[#f4f3f3]">
              <HugeiconsIcon icon={SquareLock02Icon} className="size-3.5 text-[#222]" strokeWidth={2} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-xs leading-none font-semibold text-[#222]">Link access</span>
              <span className="text-[10px] leading-none font-medium text-[#808080]">
                Only users with access can open the link
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 p-3">
          <p className="text-[10px] leading-none font-semibold text-[#808080]">People with access</p>
          {people.map((person) => (
            <div key={person.email} className="flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <Avatar className="size-[26px] after:hidden">
                  <AvatarFallback
                    className="text-[10px] font-semibold"
                    style={{ backgroundColor: person.bg, color: person.fg }}
                  >
                    {person.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="flex flex-col gap-0.5">
                  <span className="text-xs leading-none font-semibold text-[#222]">{person.name}</span>
                  <span className="text-[10px] leading-none font-medium text-[#808080]">{person.email}</span>
                </span>
              </span>
              <span className="text-[11px] leading-none font-medium text-[#808080]">{person.role}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-b-[12px] border-t border-[#e8e8e8] bg-[#fbfbfb] p-3">
          <span className="max-w-[180px] truncate text-[10px] leading-none font-medium text-[#808080]">
            https://mercy-general.app/pms
          </span>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText("https://mercy-general.app/pms")
              toast.success("Link copied to clipboard")
            }}
            className="flex items-center gap-1 rounded-[6px] bg-[#222] px-2 py-1 text-[11px] leading-none font-medium text-[#e8e8e8] transition-colors hover:bg-black"
          >
            <HugeiconsIcon icon={Link04Icon} className="size-3" strokeWidth={2} />
            Copy Link
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
