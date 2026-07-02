import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  Cancel01Icon,
  ChartBarBigIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import {
  wardDot,
  type Condition,
  type PatientStatus,
  type Ward,
} from "@/lib/hospital-data"

/** Bordered chip with a 7px color dot — Figma department chip */
export function WardChip({ ward }: { ward: Ward }) {
  return (
    <span className="inline-flex items-center justify-center gap-1 rounded-[14px] border-[0.5px] border-[#e8e8e8] px-2.5 py-[5px]">
      <span
        className="size-[7px] rounded-[2px]"
        style={{ backgroundColor: wardDot[ward] }}
      />
      <span className="text-xs leading-none font-semibold text-[#222]">
        {ward}
      </span>
    </span>
  )
}

/** Tinted pill with check / cross — Figma employment status badge */
export function StatusPill({ status }: { status: PatientStatus }) {
  const admitted = status === "Admitted"
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full px-2 py-[5px]",
        admitted
          ? "bg-[#05a400]/10 text-[#009638]"
          : "bg-[#a40000]/10 text-[#960000]"
      )}
    >
      <HugeiconsIcon
        icon={admitted ? Tick02Icon : Cancel01Icon}
        className="size-3"
        strokeWidth={2.5}
      />
      <span className="text-xs leading-none font-semibold">{status}</span>
    </span>
  )
}

const conditionIcon: Record<Condition, { color: string; critical?: boolean }> =
  {
    Stable: { color: "#05a400" },
    Fair: { color: "#d19d2c" },
    Serious: { color: "#f86300" },
    Critical: { color: "#e01e1e", critical: true },
  }

/** Bordered chip with tinted severity icon — Figma severity chip */
export function ConditionChip({ condition }: { condition: Condition }) {
  const { color, critical } = conditionIcon[condition]
  return (
    <span className="inline-flex items-center justify-center gap-1 rounded-[14px] border-[0.5px] border-[#e8e8e8] px-2.5 py-1">
      <HugeiconsIcon
        icon={critical ? Alert02Icon : ChartBarBigIcon}
        className="size-3.5"
        strokeWidth={2}
        style={{ color }}
      />
      <span className="text-xs leading-none font-semibold text-[#222]">
        {condition}
      </span>
    </span>
  )
}
