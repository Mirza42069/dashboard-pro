import type { Metadata } from "next"

import { PageHeader } from "@/components/dashboard/page-header"
import { WardsView } from "@/components/dashboard/wards-view"

export const metadata: Metadata = {
  title: "Ward Occupancy",
  description: "Live bed capacity, occupancy, and head-nurse assignments per ward",
}

export default function WardsPage() {
  return (
    <>
      <PageHeader
        title="Ward Occupancy"
        subtitle="Live bed capacity across every ward — occupancy, availability, and nursing assignments"
      />
      <div className="mt-[46px]">
        <WardsView />
      </div>
    </>
  )
}
