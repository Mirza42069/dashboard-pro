"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { AppointmentsView } from "./appointments-view"
import { StaffView } from "./staff-view"

const tabs = ["Staff", "Schedule"] as const
type CareTab = (typeof tabs)[number]

export function CareTeamView() {
  const [tab, setTab] = React.useState<CareTab>("Staff")

  return (
    <div className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label="Care team views"
        className="flex h-[27px] w-fit items-center gap-[2px] rounded-[6px] bg-[#ececef] py-[2px] pr-[3px] pl-[2px]"
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "flex items-center justify-center rounded-[4px] px-2.5 py-1 text-xs leading-none font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#797bff]/50 focus-visible:outline-none",
              tab === t
                ? "bg-white text-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]"
                : "text-[#808080] hover:text-black"
            )}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Staff" ? <StaffView /> : <AppointmentsView />}
    </div>
  )
}
