import type { Metadata } from "next"

import { CareTeamView } from "@/components/dashboard/care-team-view"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "Care Team",
  description:
    "Clinical staff roster and the weekly appointment schedule in one place",
}

export default function StaffPage() {
  return (
    <>
      <PageHeader
        title="Care Team"
        subtitle="Staff roster with live duty status, plus this week's appointment schedule"
      />
      <div className="mt-6">
        <CareTeamView />
      </div>
    </>
  )
}
