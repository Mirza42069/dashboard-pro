"use client"

import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { admissionsByDay, totalAdmissions } from "@/lib/hospital-data"

const chartConfig = {
  count: {
    label: "Admissions",
    color: "#797bff",
  },
} satisfies ChartConfig

export function AdmissionsCard({ showViewAll = true }: { showViewAll?: boolean }) {
  return (
    <section className="rounded-[12px] border border-[#e8e8e8] bg-white px-4 pt-3 pb-2">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xs leading-none font-semibold text-black">
            Admissions
          </h2>
          <p className="flex items-baseline gap-1.5">
            <span className="text-[22px] leading-none font-semibold tracking-[-0.22px] text-black">
              {totalAdmissions}
            </span>
            <span className="text-xs font-medium text-[#808080]">Total</span>
          </p>
        </div>
        {showViewAll && (
          <Link
            href="/analytics"
            className="flex items-center gap-[3px] text-xs leading-none font-semibold text-[#808080] transition-colors hover:text-black"
          >
            View all
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              className="size-3"
              strokeWidth={2}
            />
          </Link>
        )}
      </div>

      <ChartContainer
        config={chartConfig}
        className="mt-2 aspect-auto h-[190px] w-full"
      >
        <BarChart
          data={admissionsByDay}
          margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#ececec" strokeWidth={0.75} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            interval={1}
            tickMargin={8}
            tick={{ fontSize: 9, fill: "#808080", fontWeight: 500 }}
          />
          <YAxis
            width={28}
            ticks={[0, 20, 40]}
            domain={[0, 40]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 9, fill: "#808080", fontWeight: 500 }}
          />
          <ChartTooltip
            cursor={{ fill: "#f4f3f3" }}
            content={<ChartTooltipContent hideLabel={false} />}
          />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[2, 2, 0, 0]}
            maxBarSize={25}
          />
        </BarChart>
      </ChartContainer>
    </section>
  )
}
