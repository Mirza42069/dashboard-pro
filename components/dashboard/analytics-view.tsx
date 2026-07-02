"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts"
import { HugeiconsIcon } from "@hugeicons/react"
import { Alert02Icon, ChartBarBigIcon } from "@hugeicons/core-free-icons"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import {
  stayTrend,
  totalAdmissions,
  wards,
  type Condition,
} from "@/lib/hospital-data"
import { AdmissionsCard } from "./admissions-card"
import { useHospital } from "./hospital-provider"

const conditionMeta: Record<Condition, { color: string; critical?: boolean }> = {
  Stable: { color: "#05a400" },
  Fair: { color: "#d19d2c" },
  Serious: { color: "#f86300" },
  Critical: { color: "#e01e1e", critical: true },
}
const conditionOrder: Condition[] = ["Stable", "Fair", "Serious", "Critical"]

const cardClass = "rounded-[12px] border border-[#e8e8e8] bg-white px-4 pt-3 pb-3"
const cardTitle = "text-xs leading-none font-semibold text-black"

function StatTile({
  label,
  value,
  hint,
  tone,
}: {
  label: string
  value: string
  hint: string
  tone?: "critical"
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[12px] border border-[#e8e8e8] bg-white px-4 py-3.5">
      <span className="text-[10px] leading-none font-semibold text-[#808080]">{label}</span>
      <span
        className={cn(
          "text-[22px] leading-none font-semibold tracking-[-0.22px]",
          tone === "critical" ? "text-[#e01e1e]" : "text-black"
        )}
      >
        {value}
      </span>
      <span className="text-[10px] leading-none font-medium text-[#808080]">{hint}</span>
    </div>
  )
}

const stayConfig = {
  days: { label: "Avg stay (days)", color: "#797bff" },
} satisfies ChartConfig

const occupancyConfig = {
  occupied: { label: "Occupied beds", color: "#797bff" },
} satisfies ChartConfig

export function AnalyticsView() {
  const { patients } = useHospital()

  const admitted = patients.filter((p) => p.status === "Admitted")
  const critical = admitted.filter((p) => p.condition === "Critical").length
  const totalBeds = wards.reduce((s, w) => s + w.beds, 0)
  const totalOccupied = wards.reduce((s, w) => s + w.occupied, 0)
  const latestStay = stayTrend[stayTrend.length - 1].days

  const occupancyData = wards.map((w) => ({
    ward: w.name,
    occupied: w.occupied,
    beds: w.beds,
    ratio: `${w.occupied}/${w.beds}`,
  }))

  const conditionCounts = conditionOrder.map((condition) => ({
    condition,
    count: admitted.filter((p) => p.condition === condition).length,
  }))
  const maxCondition = Math.max(1, ...conditionCounts.map((c) => c.count))

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-4 gap-3">
        <StatTile
          label="ADMISSIONS · JUNE"
          value={String(totalAdmissions)}
          hint="30-day intake"
        />
        <StatTile
          label="BED OCCUPANCY"
          value={`${Math.round((totalOccupied / totalBeds) * 100)}%`}
          hint={`${totalOccupied} of ${totalBeds} beds`}
        />
        <StatTile label="AVG LENGTH OF STAY" value={`${latestStay}d`} hint="latest week" />
        <StatTile
          label="CRITICAL CASES"
          value={String(critical)}
          hint="require close monitoring"
          tone={critical > 0 ? "critical" : undefined}
        />
      </div>

      <AdmissionsCard showViewAll={false} />

      <div className="grid grid-cols-2 gap-3">
        <section className={cardClass}>
          <h2 className={cardTitle}>Average length of stay</h2>
          <p className="mt-1.5 text-[10px] leading-none font-medium text-[#808080]">
            Weekly average, last 12 weeks — shorter is better
          </p>
          <ChartContainer config={stayConfig} className="mt-3 aspect-auto h-[170px] w-full">
            <LineChart data={stayTrend} margin={{ top: 6, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} stroke="#ececec" strokeWidth={0.75} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 9, fill: "#808080", fontWeight: 500 }}
              />
              <YAxis
                width={28}
                domain={[0, 8]}
                ticks={[0, 4, 8]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 9, fill: "#808080", fontWeight: 500 }}
              />
              <ChartTooltip cursor={{ stroke: "#e8e8e8" }} content={<ChartTooltipContent />} />
              <Line
                dataKey="days"
                type="monotone"
                stroke="var(--color-days)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#797bff", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        </section>

        <section className={cardClass}>
          <h2 className={cardTitle}>Bed occupancy by ward</h2>
          <p className="mt-1.5 text-[10px] leading-none font-medium text-[#808080]">
            Occupied beds against capacity per ward
          </p>
          <ChartContainer config={occupancyConfig} className="mt-3 aspect-auto h-[170px] w-full">
            <BarChart
              data={occupancyData}
              layout="vertical"
              margin={{ top: 0, right: 32, bottom: 0, left: 8 }}
            >
              <CartesianGrid horizontal={false} stroke="#ececec" strokeWidth={0.75} />
              <XAxis type="number" hide domain={[0, 36]} />
              <YAxis
                dataKey="ward"
                type="category"
                width={78}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10, fill: "#222", fontWeight: 500 }}
              />
              <ChartTooltip
                cursor={{ fill: "#f4f3f3" }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="occupied"
                fill="var(--color-occupied)"
                radius={[0, 2, 2, 0]}
                barSize={14}
              >
                <LabelList
                  dataKey="ratio"
                  position="right"
                  style={{ fontSize: 10, fill: "#808080", fontWeight: 500 }}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </section>
      </div>

      <section className={cardClass}>
        <h2 className={cardTitle}>Admitted patients by condition</h2>
        <p className="mt-1.5 text-[10px] leading-none font-medium text-[#808080]">
          Live counts from the patient database — updates as you admit and discharge
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {conditionCounts.map(({ condition, count }) => {
            const { color, critical: isCritical } = conditionMeta[condition]
            return (
              <div key={condition} className="flex items-center gap-3">
                <span className="flex w-[92px] shrink-0 items-center gap-1.5">
                  <HugeiconsIcon
                    icon={isCritical ? Alert02Icon : ChartBarBigIcon}
                    className="size-3.5"
                    strokeWidth={2}
                    style={{ color }}
                  />
                  <span className="text-xs leading-none font-semibold text-[#222]">{condition}</span>
                </span>
                <div className="h-3.5 flex-1 overflow-hidden rounded-[3px] bg-[#f4f3f3]">
                  <div
                    className="h-full rounded-[3px] transition-all duration-500"
                    style={{
                      width: `${(count / maxCondition) * 100}%`,
                      backgroundColor: color,
                      opacity: 0.85,
                    }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right font-mono text-sm leading-none text-[#222]">
                  {count}
                </span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
