import type { Metadata } from "next"
import { Suspense } from "react"

import { PatientDetailView } from "@/components/dashboard/patient-detail-view"

export const metadata: Metadata = {
  title: "Patient chart — Mercy General",
  description:
    "Clinical chart — summary, vitals, medications, labs, notes, and discharge planning",
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <Suspense>
      <PatientDetailView id={id.toUpperCase()} />
    </Suspense>
  )
}
