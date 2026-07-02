import type { Metadata } from "next"
import { Suspense } from "react"

import { PageHeader } from "@/components/dashboard/page-header"
import { PatientsView } from "@/components/dashboard/patients-view"

export const metadata: Metadata = {
  title: "Patients — Mercy General",
  description:
    "Clinical worklist across all wards — admissions, diagnoses, attending staff, and discharge",
}

export default function Page() {
  return (
    <>
      <PageHeader
        title="Patients"
        subtitle="Clinical worklist across all wards — admissions, diagnoses, attending staff, and discharge"
      />
      <div className="mt-6">
        <Suspense>
          <PatientsView />
        </Suspense>
      </div>
    </>
  )
}
