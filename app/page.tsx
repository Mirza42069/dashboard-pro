import type { Metadata } from "next"
import { Suspense } from "react"

import { PageHeader } from "@/components/dashboard/page-header"
import { PatientsView } from "@/components/dashboard/patients-view"

export const metadata: Metadata = {
  title: "Patient Management System",
  description:
    "Patient tracking across all wards — admissions, diagnoses, attending staff, and discharge",
}

export default function Page() {
  return (
    <>
      <PageHeader
        title="Patient Management System"
        subtitle="Patient tracking across all wards — admissions, diagnoses, attending staff, and discharge"
      />
      <div className="mt-[46px]">
        <Suspense>
          <PatientsView />
        </Suspense>
      </div>
    </>
  )
}
