import type { Metadata } from "next"

import { PageHeader } from "@/components/dashboard/page-header"
import { StaffView } from "@/components/dashboard/staff-view"

export const metadata: Metadata = {
  title: "Staff Directory",
  description: "Clinical staff roster with shifts, pagers, and live duty status",
}

export default function StaffPage() {
  return (
    <>
      <PageHeader
        title="Staff Directory"
        subtitle="Clinical roster across all wards — shifts, pagers, and live duty status"
      />
      <div className="mt-[46px]">
        <StaffView />
      </div>
    </>
  )
}
