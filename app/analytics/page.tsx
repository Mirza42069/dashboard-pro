import type { Metadata } from "next"

import { AnalyticsView } from "@/components/dashboard/analytics-view"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "Hospital Analytics",
  description: "Admissions, occupancy, length of stay, and condition mix at a glance",
}

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Hospital Analytics"
        subtitle="Admissions, occupancy, length of stay, and condition mix at a glance"
      />
      <div className="mt-[46px]">
        <AnalyticsView />
      </div>
    </>
  )
}
