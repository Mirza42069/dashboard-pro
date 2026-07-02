import type { Metadata } from "next"

import { AppointmentsView } from "@/components/dashboard/appointments-view"
import { PageHeader } from "@/components/dashboard/page-header"

export const metadata: Metadata = {
  title: "Appointment Schedule",
  description: "Weekly appointment schedule — consultations, surgeries, imaging, and therapy",
}

export default function AppointmentsPage() {
  return (
    <>
      <PageHeader
        title="Appointment Schedule"
        subtitle="This week's consultations, surgeries, imaging, and therapy sessions"
      />
      <div className="mt-[46px]">
        <AppointmentsView />
      </div>
    </>
  )
}
