"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Building03Icon,
  Clock01Icon,
  HashtagIcon,
  HeartPulseIcon,
  MoreVerticalIcon,
  Search01Icon,
  StethoscopeIcon,
  UserIcon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { wardDot, type DutyStatus } from "@/lib/hospital-data"
import { useHospital } from "./hospital-provider"

const dutyStyles: Record<DutyStatus, string> = {
  "On duty": "bg-[#05a400]/10 text-[#009638]",
  "On call": "bg-[#b38625]/10 text-[#b38625]",
  "Off duty": "bg-[#878787]/10 text-[#808080]",
}

const dutyDot: Record<DutyStatus, string> = {
  "On duty": "#05a400",
  "On call": "#d19d2c",
  "Off duty": "#9a9a9a",
}

const headCell = "h-9 border-r-[0.5px] border-[#e8e8e8] bg-[#fbfbfb] px-3 last:border-r-0"
const bodyCell = "h-10 border-r-[0.5px] border-[#e8e8e8] px-3 py-0 last:border-r-0"

export function StaffView() {
  const { staff, setDutyStatus } = useHospital()
  const [query, setQuery] = React.useState("")

  const rows = staff.filter((member) =>
    [member.name, member.role, member.ward, member.pager]
      .join(" ")
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  )

  const onDuty = staff.filter((s) => s.status === "On duty").length
  const onCall = staff.filter((s) => s.status === "On call").length

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-[#e8e8e8] px-2.5 py-[5px] text-xs leading-none font-semibold text-[#222]">
            <span className="size-[7px] rounded-[2px] bg-[#05a400]" />
            {onDuty} on duty
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border-[0.5px] border-[#e8e8e8] px-2.5 py-[5px] text-xs leading-none font-semibold text-[#222]">
            <span className="size-[7px] rounded-[2px] bg-[#d19d2c]" />
            {onCall} on call
          </span>
        </div>
        <div className="relative">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-[#808080]"
            strokeWidth={2}
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search staff, ward, pager..."
            aria-label="Search staff"
            className="h-[27px] w-[220px] rounded-[8px] border-[#e8e8e8] pl-8 text-xs placeholder:text-[#808080]"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-t-[12px] border border-b-0 border-[#e8e8e8]">
        <Table>
          <TableHeader>
            <TableRow className="border-b-[0.5px] border-[#e8e8e8] hover:bg-transparent">
              <TableHead className={cn(headCell, "w-[220px]")}>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={UserIcon} className="size-3.5 text-[#808080]" strokeWidth={1.8} />
                  <span className="text-xs leading-none font-semibold text-black">Staff member</span>
                </span>
              </TableHead>
              <TableHead className={cn(headCell, "w-[130px]")}>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={StethoscopeIcon} className="size-3.5 text-[#808080]" strokeWidth={1.8} />
                  <span className="text-xs leading-none font-semibold text-black">Role</span>
                </span>
              </TableHead>
              <TableHead className={cn(headCell, "w-[150px]")}>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Building03Icon} className="size-3.5 text-[#808080]" strokeWidth={1.8} />
                  <span className="text-xs leading-none font-semibold text-black">Ward</span>
                </span>
              </TableHead>
              <TableHead className={cn(headCell, "w-[150px]")}>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} className="size-3.5 text-[#808080]" strokeWidth={1.8} />
                  <span className="text-xs leading-none font-semibold text-black">Shift</span>
                </span>
              </TableHead>
              <TableHead className={cn(headCell, "w-[90px]")}>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={HashtagIcon} className="size-3.5 text-[#808080]" strokeWidth={1.8} />
                  <span className="text-xs leading-none font-semibold text-black">Pager</span>
                </span>
              </TableHead>
              <TableHead className={cn(headCell, "w-[140px]")}>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={HeartPulseIcon} className="size-3.5 text-[#808080]" strokeWidth={1.8} />
                  <span className="text-xs leading-none font-semibold text-black">Duty status</span>
                </span>
              </TableHead>
              <TableHead className={cn(headCell, "w-[50px]")} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((member) => (
              <TableRow
                key={member.id}
                className="group/row border-b-[0.5px] border-[#e8e8e8] hover:bg-[#fbfbfb]"
              >
                <TableCell className={bodyCell}>
                  <span className="flex items-center gap-2.5">
                    <Avatar className="size-[26px] after:hidden">
                      <AvatarFallback
                        className="text-[10px] font-semibold"
                        style={{ backgroundColor: member.bg, color: member.fg }}
                      >
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex flex-col gap-1">
                      <span className="text-xs leading-none font-semibold text-[#222]">
                        {member.name}
                      </span>
                      <span className="text-[10px] leading-none font-medium text-[#808080]">
                        {member.id}
                      </span>
                    </span>
                  </span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span className="text-xs leading-none font-medium text-[#222]">{member.role}</span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span className="inline-flex items-center gap-1 rounded-[14px] border-[0.5px] border-[#e8e8e8] px-2.5 py-[5px]">
                    <span
                      className="size-[7px] rounded-[2px]"
                      style={{ backgroundColor: wardDot[member.ward] }}
                    />
                    <span className="text-xs leading-none font-semibold text-[#222]">{member.ward}</span>
                  </span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span className="font-mono text-sm leading-none text-[#222]">{member.shift}</span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span className="font-mono text-sm leading-none text-[#222]">{member.pager}</span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-[5px] text-xs leading-none font-semibold",
                      dutyStyles[member.status]
                    )}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: dutyDot[member.status] }}
                    />
                    {member.status}
                  </span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label={`Set duty status for ${member.name}`}
                          className="text-[#808080] opacity-0 transition-opacity group-hover/row:opacity-100 hover:text-black data-[state=open]:opacity-100"
                        >
                          <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" strokeWidth={1.8} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" sideOffset={4} className="w-36 rounded-[10px] border-[#e8e8e8]">
                        <DropdownMenuLabel className="text-[10px] font-semibold text-[#808080]">
                          Duty status
                        </DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                          value={member.status}
                          onValueChange={(v) => setDutyStatus(member.id, v as DutyStatus)}
                        >
                          <DropdownMenuRadioItem value="On duty" className="text-xs">On duty</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="On call" className="text-xs">On call</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Off duty" className="text-xs">Off duty</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="h-24 text-center text-xs font-medium text-[#808080]">
                  No staff match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
