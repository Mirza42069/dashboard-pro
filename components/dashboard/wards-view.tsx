"use client"

import Link from "next/link"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  ArrowRight01Icon,
  BedSingle01Icon,
  Building03Icon,
  HashtagIcon,
  HeartPulseIcon,
  InsertColumnRightIcon,
  Layers01Icon,
  MoreVerticalIcon,
  Tick02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { wardDot, wards } from "@/lib/hospital-data"
import { useHospital } from "./hospital-provider"

const headCell =
  "h-9 border-r-[0.5px] border-[#e8e8e8] bg-[#f7f7f9] px-3 last:border-r-0"
const bodyCell =
  "h-9 border-r-[0.5px] border-[#e8e8e8] px-3 py-0 last:border-r-0"

function HeadLabel({
  icon,
  children,
}: {
  icon?: IconSvgElement
  children: React.ReactNode
}) {
  return (
    <span className="flex items-center gap-1.5">
      {icon && (
        <HugeiconsIcon
          icon={icon}
          className="size-3.5 text-[#808080]"
          strokeWidth={1.8}
        />
      )}
      <span className="text-xs leading-none font-semibold text-black">
        {children}
      </span>
    </span>
  )
}

export function WardsView() {
  const { patients } = useHospital()

  return (
    <div className="overflow-x-auto rounded-t-[8px] border border-b-0 border-[#e5e5e9] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
      <Table className="min-w-[980px]">
        <TableHeader>
          <TableRow className="border-b-[0.5px] border-[#e8e8e8] hover:bg-transparent">
            <TableHead className={cn(headCell, "w-[170px]")}>
              <HeadLabel icon={Building03Icon}>Ward</HeadLabel>
            </TableHead>
            <TableHead className={cn(headCell, "w-[100px]")}>
              <HeadLabel icon={Layers01Icon}>Floor</HeadLabel>
            </TableHead>
            <TableHead className={cn(headCell, "w-[150px]")}>
              <HeadLabel icon={UserIcon}>Head nurse</HeadLabel>
            </TableHead>
            <TableHead className={cn(headCell, "w-[80px]")}>
              <HeadLabel icon={BedSingle01Icon}>Beds</HeadLabel>
            </TableHead>
            <TableHead className={cn(headCell, "w-[100px]")}>
              <HeadLabel icon={HashtagIcon}>Occupied</HeadLabel>
            </TableHead>
            <TableHead className={cn(headCell, "w-[220px]")}>
              <HeadLabel icon={HeartPulseIcon}>Occupancy</HeadLabel>
            </TableHead>
            <TableHead className={cn(headCell, "w-[140px]")}>
              <HeadLabel>Status</HeadLabel>
            </TableHead>
            <TableHead className={cn(headCell, "w-[120px]")}>
              <span className="flex items-center justify-end gap-1.5 text-[#808080]">
                <button
                  type="button"
                  aria-label="Add column"
                  onClick={() => toast.info("Custom columns coming soon")}
                  className="transition-colors hover:text-black"
                >
                  <HugeiconsIcon
                    icon={InsertColumnRightIcon}
                    className="size-4"
                    strokeWidth={1.8}
                  />
                </button>
                <button
                  type="button"
                  aria-label="Table options"
                  onClick={() => toast.info("Table options coming soon")}
                  className="transition-colors hover:text-black"
                >
                  <HugeiconsIcon
                    icon={MoreVerticalIcon}
                    className="size-4"
                    strokeWidth={1.8}
                  />
                </button>
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wards.map((ward) => {
            const pct = Math.round((ward.occupied / ward.beds) * 100)
            const nearCapacity = pct >= 85
            const tracked = patients.filter(
              (p) => p.ward === ward.name && p.status === "Admitted"
            ).length

            return (
              <TableRow
                key={ward.name}
                className="border-b-[0.5px] border-[#e8e8e8] hover:bg-[#f7f7f9]"
              >
                <TableCell className={bodyCell}>
                  <span className="inline-flex items-center gap-1 rounded-[5px] border-[0.5px] border-[#e8e8e8] px-2.5 py-[5px]">
                    <span
                      className="size-[7px] rounded-[2px]"
                      style={{ backgroundColor: wardDot[ward.name] }}
                    />
                    <span className="text-xs leading-none font-semibold text-[#222]">
                      {ward.name}
                    </span>
                  </span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span className="text-xs leading-none font-medium text-[#222]">
                    {ward.floor}
                  </span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span className="text-xs leading-none font-medium text-[#222]">
                    {ward.headNurse}
                  </span>
                </TableCell>
                <TableCell className={cn(bodyCell, "text-right")}>
                  <span className="text-sm font-medium leading-none text-[#222]">
                    {ward.beds}
                  </span>
                </TableCell>
                <TableCell className={cn(bodyCell, "text-right")}>
                  <span className="text-sm font-medium leading-none text-[#222]">
                    {ward.occupied}
                  </span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span className="flex items-center gap-2.5">
                    <span className="h-1.5 w-[120px] overflow-hidden rounded-full bg-[#ececef]">
                      <span
                        className="block h-full rounded-full bg-[#797bff]"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="text-xs font-medium leading-none text-[#222]">
                      {pct}%
                    </span>
                  </span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-[5px] px-2 py-[5px] text-xs leading-none font-semibold",
                      nearCapacity
                        ? "bg-[#a40000]/15 text-[#960000]"
                        : "bg-[#05a400]/15 text-[#009638]"
                    )}
                  >
                    <HugeiconsIcon
                      icon={nearCapacity ? Alert02Icon : Tick02Icon}
                      className="size-3"
                      strokeWidth={2.5}
                    />
                    {nearCapacity ? "Near capacity" : "Available"}
                  </span>
                </TableCell>
                <TableCell className={bodyCell}>
                  <Link
                    href={`/patients?ward=${encodeURIComponent(ward.name)}`}
                    className="flex items-center gap-1 text-xs leading-none font-semibold text-[#808080] transition-colors hover:text-black"
                  >
                    {tracked} patient{tracked === 1 ? "" : "s"}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="size-3"
                      strokeWidth={2}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
