"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"

import {
  wards,
  type Condition,
  type Patient,
  type Ward,
} from "@/lib/hospital-data"
import { AddPatientDialog } from "./add-patient-dialog"
import { useHospital } from "./hospital-provider"
import { PatientsTable } from "./patients-table"
import {
  defaultControls,
  patientViews,
  ViewToolbar,
  type PatientView,
  type TableControls,
} from "./view-toolbar"

const allConditions: Condition[] = ["Stable", "Fair", "Serious", "Critical"]

function applyControls(
  patients: Patient[],
  controls: TableControls
): Patient[] {
  let rows = patients

  if (controls.view === "Admitted")
    rows = rows.filter((p) => p.status === "Admitted")
  if (controls.view === "Discharged")
    rows = rows.filter((p) => p.status === "Discharged")
  if (controls.view === "Critical")
    rows = rows.filter((p) => p.condition === "Critical")

  if (controls.wardFilter.length > 0)
    rows = rows.filter((p) => controls.wardFilter.includes(p.ward))
  if (controls.conditionFilter.length > 0)
    rows = rows.filter((p) => controls.conditionFilter.includes(p.condition))

  if (controls.search.trim()) {
    const q = controls.search.trim().toLowerCase()
    rows = rows.filter((p) =>
      [
        p.id,
        p.mrn,
        p.name,
        p.diagnosis,
        p.ward,
        p.doctor.name,
        p.room,
        p.blood,
        p.status,
        p.condition,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    )
  }

  const dir = controls.sortAsc ? 1 : -1
  return [...rows].sort((a, b) => {
    switch (controls.sortField) {
      case "age":
        return (a.age - b.age) * dir
      case "admitted":
        return (Date.parse(a.admitted) - Date.parse(b.admitted)) * dir
      case "ward":
        return a.ward.localeCompare(b.ward) * dir
      default:
        return a.id.localeCompare(b.id) * dir
    }
  })
}

export function PatientsView() {
  const { patients } = useHospital()
  const searchParams = useSearchParams()

  const [controls, setControls] = React.useState<TableControls>(() => {
    const viewParam = searchParams.get("view")
    return {
      ...defaultControls,
      view: patientViews.includes(viewParam as PatientView)
        ? (viewParam as PatientView)
        : defaultControls.view,
      search: searchParams.get("q") ?? "",
      wardFilter: searchParams
        .getAll("ward")
        .filter((w) => wards.some((x) => x.name === w)) as Ward[],
      conditionFilter: searchParams
        .getAll("condition")
        .filter((c) => allConditions.includes(c as Condition)) as Condition[],
    }
  })
  const [addOpen, setAddOpen] = React.useState(false)

  // Keep filters, view, and search deep-linkable without triggering navigation
  React.useEffect(() => {
    const params = new URLSearchParams()
    if (controls.view !== defaultControls.view) params.set("view", controls.view)
    controls.wardFilter.forEach((w) => params.append("ward", w))
    controls.conditionFilter.forEach((c) => params.append("condition", c))
    if (controls.search.trim()) params.set("q", controls.search.trim())
    const qs = params.toString()
    window.history.replaceState(
      null,
      "",
      qs ? `?${qs}` : window.location.pathname
    )
  }, [controls])

  const rows = React.useMemo(
    () => applyControls(patients, controls),
    [patients, controls]
  )

  return (
    <div className="flex flex-col gap-3">
      <ViewToolbar
        controls={controls}
        onChange={setControls}
        onAdd={() => setAddOpen(true)}
      />
      <PatientsTable
        rows={rows}
        totalCount={patients.length}
        hiddenColumns={controls.hiddenColumns}
        sortByIdToggle={() =>
          setControls((c) => ({
            ...c,
            sortField: "id",
            sortAsc: c.sortField === "id" ? !c.sortAsc : true,
          }))
        }
        onAdd={() => setAddOpen(true)}
      />
      <AddPatientDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
