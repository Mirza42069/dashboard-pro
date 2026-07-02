"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  ArrowRight01Icon,
  BedSingle01Icon,
  Tick02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { wardDot, wards } from "@/lib/hospital-data"
import { useHospital } from "./hospital-provider"

function StatTile({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-[12px] border border-[#e8e8e8] bg-white px-4 py-3.5">
      <span className="text-[10px] leading-none font-semibold text-[#808080]">{label}</span>
      <span className="text-[22px] leading-none font-semibold tracking-[-0.22px] text-black">
        {value}
      </span>
      <span className="text-[10px] leading-none font-medium text-[#808080]">{hint}</span>
    </div>
  )
}

export function WardsView() {
  const { patients } = useHospital()

  const totalBeds = wards.reduce((s, w) => s + w.beds, 0)
  const totalOccupied = wards.reduce((s, w) => s + w.occupied, 0)
  const occupancyPct = Math.round((totalOccupied / totalBeds) * 100)

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-3">
        <StatTile label="TOTAL BEDS" value={String(totalBeds)} hint="across 5 wards" />
        <StatTile label="OCCUPIED" value={String(totalOccupied)} hint="patients in beds" />
        <StatTile label="AVAILABLE" value={String(totalBeds - totalOccupied)} hint="ready for admission" />
        <StatTile label="OCCUPANCY" value={`${occupancyPct}%`} hint="hospital-wide" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {wards.map((ward) => {
          const pct = Math.round((ward.occupied / ward.beds) * 100)
          const nearCapacity = pct >= 85
          const activePatients = patients.filter(
            (p) => p.ward === ward.name && p.status === "Admitted"
          ).length

          return (
            <div
              key={ward.name}
              className="flex flex-col gap-4 rounded-[12px] border border-[#e8e8e8] bg-white p-4 transition-shadow hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="size-[7px] rounded-[2px]"
                    style={{ backgroundColor: wardDot[ward.name] }}
                  />
                  <span className="text-sm leading-none font-semibold text-black">{ward.name}</span>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-[5px] text-[11px] leading-none font-semibold",
                    nearCapacity
                      ? "bg-[#a40000]/10 text-[#960000]"
                      : "bg-[#05a400]/10 text-[#009638]"
                  )}
                >
                  <HugeiconsIcon
                    icon={nearCapacity ? Alert02Icon : Tick02Icon}
                    className="size-3"
                    strokeWidth={2.5}
                  />
                  {nearCapacity ? "Near capacity" : "Available"}
                </span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-[26px] leading-none text-[#222]">
                  {ward.occupied}
                </span>
                <span className="text-xs font-medium text-[#808080]">/ {ward.beds} beds</span>
              </div>

              <div
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${ward.name} occupancy`}
                className="h-1.5 w-full overflow-hidden rounded-full bg-[#f4f3f3]"
              >
                <div
                  className="h-full rounded-full bg-[#797bff] transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex flex-col gap-2 border-t border-[#e8e8e8] pt-3">
                <span className="flex items-center gap-2 text-[11px] leading-none font-medium text-[#808080]">
                  <HugeiconsIcon icon={UserIcon} className="size-3.5" strokeWidth={2} />
                  Head nurse&nbsp;
                  <span className="font-semibold text-[#222]">{ward.headNurse}</span>
                </span>
                <span className="flex items-center gap-2 text-[11px] leading-none font-medium text-[#808080]">
                  <HugeiconsIcon icon={BedSingle01Icon} className="size-3.5" strokeWidth={2} />
                  {ward.floor} · {activePatients} tracked patient{activePatients === 1 ? "" : "s"}
                </span>
              </div>

              <Link
                href={`/?ward=${encodeURIComponent(ward.name)}`}
                className="flex items-center justify-center gap-1 rounded-[6px] border border-[#e8e8e8] bg-white py-1.5 text-[11px] leading-none font-semibold text-[#222] transition-colors hover:bg-[#f4f3f3]"
              >
                View patients
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3" strokeWidth={2} />
              </Link>
            </div>
          )
        })}

        <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-[#e8e8e8] text-center">
          <span className="text-xs leading-none font-semibold text-[#808080]">
            Commission a new ward
          </span>
          <span className="max-w-[200px] text-[10px] leading-tight font-medium text-[#808080]">
            Capacity planning for the east wing expansion opens in Q3.
          </span>
        </div>
      </div>
    </div>
  )
}
