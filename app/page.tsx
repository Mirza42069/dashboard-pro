import type { Metadata } from "next"

import { CommandCenterView } from "@/components/dashboard/command-center-view"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "Command Center — Mercy General",
  description:
    "Live shift overview — census, beds, schedule, and hospital activity",
}

export default function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Mercy General — Day shift 07:00–19:00"
        title="Command Center"
        subtitle="Shift overview for Thursday, Jul 2 — census, beds, schedule, and activity across the hospital"
      />
      <div className="mt-6">
        <CommandCenterView />
      </div>
    </>
  )
}
