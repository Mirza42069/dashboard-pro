"use client"

import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Alert02Icon,
  ArrowLeft01Icon,
  DocumentAttachmentIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  patientCharts,
  weekDays,
  type Appointment,
  type LabFlag,
  type MedicationStatus,
} from "@/lib/hospital-data"
import { ConditionChip, StatusPill, WardChip } from "./chips"
import { useHospital } from "./hospital-provider"

const card =
  "rounded-[8px] border border-[#e5e5e9] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#797bff]/50"

const headCell =
  "h-9 border-r-[0.5px] border-[#e8e8e8] bg-[#f7f7f9] px-3 last:border-r-0 text-xs font-semibold text-black"
const bodyCell =
  "h-9 border-r-[0.5px] border-[#e8e8e8] px-3 py-0 last:border-r-0"

const tabs = [
  "Summary",
  "Vitals",
  "Medications",
  "Labs",
  "Notes",
  "Appointments",
  "Documents",
] as const
type ChartTab = (typeof tabs)[number]

function SectionTitle({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <h2 className="text-xs leading-none font-semibold text-black">{title}</h2>
      {hint && (
        <p className="text-[10px] leading-none font-medium text-[#808080]">
          {hint}
        </p>
      )}
    </div>
  )
}

function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="flex h-[140px] flex-col items-center justify-center gap-1.5 rounded-[6px] border border-dashed border-[#e8e8e8]">
      <p className="text-xs font-semibold text-[#222]">{title}</p>
      <p className="text-[10px] font-medium text-[#808080]">{hint}</p>
    </div>
  )
}

/* ------------------------------ pills ------------------------------ */

const labFlagStyles: Record<LabFlag, string> = {
  Normal: "bg-[#05a400]/15 text-[#009638]",
  High: "bg-[#b38625]/15 text-[#b38625]",
  Low: "bg-[#b38625]/15 text-[#b38625]",
  Critical: "bg-[#a40000]/15 text-[#960000]",
  Pending: "bg-[#878787]/15 text-[#808080]",
}

const medStatusStyles: Record<MedicationStatus, string> = {
  Active: "bg-[#05a400]/15 text-[#009638]",
  Held: "bg-[#b38625]/15 text-[#b38625]",
  Completed: "bg-[#878787]/15 text-[#808080]",
}

const aptStatusStyles: Record<Appointment["status"], string> = {
  Confirmed: "bg-[#0052a4]/15 text-[#0360be]",
  Pending: "bg-[#b38625]/15 text-[#b38625]",
  Completed: "bg-[#05a400]/15 text-[#009638]",
  Cancelled: "bg-[#878787]/15 text-[#808080]",
}

/* ------------------------------- header ------------------------------- */

function IdentityFact({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex flex-col gap-1.5">
      <span className="text-[10px] leading-none font-semibold tracking-[0.04em] text-[#808080] uppercase">
        {label}
      </span>
      <span className="text-xs font-medium leading-none text-[#222]">
        {value}
      </span>
    </span>
  )
}

function AllergyBadges({ allergies }: { allergies: string[] }) {
  if (allergies.length === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#05a400]/15 px-2 py-[5px] text-[10px] leading-none font-semibold text-[#009638]">
        <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2.5} />
        No known allergies
      </span>
    )
  }
  return (
    <>
      {allergies.map((a) => (
        <span
          key={a}
          className="inline-flex items-center gap-1 rounded-[5px] bg-[#a40000]/15 px-2 py-[5px] text-[10px] leading-none font-semibold text-[#960000]"
        >
          <HugeiconsIcon
            icon={Alert02Icon}
            className="size-3"
            strokeWidth={2.5}
          />
          {a}
        </span>
      ))}
    </>
  )
}

export function PatientDetailView({ id }: { id: string }) {
  const { patients, staff, appointments } = useHospital()
  const searchParams = useSearchParams()

  const patient = patients.find((p) => p.id === id)
  const chart = patientCharts[id]

  const tabParam = searchParams.get("tab")
  const [tab, setTab] = React.useState<ChartTab>(() => {
    const match = tabs.find((t) => t.toLowerCase() === tabParam?.toLowerCase())
    return match ?? "Summary"
  })

  // deep-linkable tab without triggering navigation
  React.useEffect(() => {
    const qs = tab === "Summary" ? "" : `?tab=${tab.toLowerCase()}`
    window.history.replaceState(null, "", `${window.location.pathname}${qs}`)
  }, [tab])

  if (!patient) {
    return (
      <div className={cn(card, "flex h-[260px] flex-col items-center justify-center gap-2")}>
        <p className="text-sm font-semibold text-black">Patient not found</p>
        <p className="text-xs font-medium text-[#808080]">
          No record matches “{id}”. It may have been removed from the database.
        </p>
        <Link
          href="/patients"
          className={cn(
            "mt-2 flex items-center gap-1 rounded-[4px] bg-[#222] px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#e8e8e8] transition-colors hover:bg-black",
            focusRing
          )}
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            className="size-3"
            strokeWidth={2}
          />
          Back to patients
        </Link>
      </div>
    )
  }

  const nurse = staff.find(
    (s) => s.ward === patient.ward && s.role === "Nurse"
  )
  const attending = staff.find((s) => s.name.includes(patient.doctor.name.replace("Dr. ", "")))

  const patientAppointments = appointments
    .filter((a) => a.patientId === patient.id)
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))

  const documents = [
    { name: "Admission record", meta: `Signed · ${patient.admitted}` },
    ...(patient.ward === "Orthopedics" || patient.diagnosis.includes("post-op")
      ? [{ name: "Operative report", meta: "Signed · surgical team" }]
      : []),
    ...(patient.status === "Discharged"
      ? [{ name: "Discharge summary", meta: "Signed · attending" }]
      : []),
  ]

  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/patients"
        className={cn(
          "flex w-fit items-center gap-1 rounded-[4px] text-[11px] leading-none font-semibold text-[#808080] transition-colors hover:text-black",
          focusRing
        )}
      >
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          className="size-3"
          strokeWidth={2}
        />
        Patients
      </Link>

      {/* Identity header — patient identity stays visible on every clinical screen */}
      <header className={cn(card, "flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between")}>
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[20px] leading-none font-semibold tracking-[-0.2px] text-black">
              {patient.name}
            </h1>
            <StatusPill status={patient.status} />
            <ConditionChip condition={patient.condition} />
          </div>
          <p className="text-xs leading-tight font-medium text-[#808080]">
            {patient.diagnosis}
          </p>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <IdentityFact label="MRN" value={patient.mrn} />
            <IdentityFact label="Age / Sex" value={`${patient.age} ${patient.sex}`} />
            <IdentityFact label="DOB" value={patient.dob} />
            <IdentityFact label="Blood" value={patient.blood} />
            <IdentityFact
              label="Location"
              value={`${patient.room} · Bed ${patient.bed}`}
            />
            <IdentityFact label="Admitted" value={patient.admitted} />
            <WardChip ward={patient.ward} />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <AllergyBadges allergies={patient.allergies} />
          </div>
        </div>

        {/* Care team */}
        <div className="flex shrink-0 flex-col gap-2.5 rounded-[6px] border-[0.5px] border-[#e8e8e8] bg-[#f7f7f9] px-3.5 py-3 lg:w-[240px]">
          <span className="text-[10px] leading-none font-semibold tracking-[0.04em] text-[#808080] uppercase">
            Care team
          </span>
          {[
            {
              person: patient.doctor,
              role: "Attending",
              pager: attending?.pager,
            },
            ...(nurse
              ? [
                  {
                    person: {
                      name: nurse.name,
                      photo: nurse.photo,
                      initials: nurse.initials,
                      bg: nurse.bg,
                      fg: nurse.fg,
                    },
                    role: "Named nurse",
                    pager: nurse.pager,
                  },
                ]
              : []),
          ].map((member) => (
            <span key={member.role} className="flex items-center gap-2">
              <Avatar className="size-[26px] after:border-black/5">
                <AvatarImage src={member.person.photo} alt={member.person.name} />
                <AvatarFallback
                  className="text-[10px] font-semibold"
                  style={{
                    backgroundColor: member.person.bg,
                    color: member.person.fg,
                  }}
                >
                  {member.person.initials}
                </AvatarFallback>
              </Avatar>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-xs leading-none font-semibold text-[#222]">
                  {member.person.name}
                </span>
                <span className="text-[10px] leading-none font-medium text-[#808080]">
                  {member.role}
                  {member.pager ? (
                    <>
                      {" · pager "}
                      <span>{member.pager}</span>
                    </>
                  ) : null}
                </span>
              </span>
            </span>
          ))}
        </div>
      </header>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Patient chart sections"
        className="flex h-[27px] w-fit max-w-full items-center gap-[2px] overflow-x-auto rounded-[6px] bg-[#ececef] py-[2px] pr-[3px] pl-[2px]"
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "flex items-center justify-center rounded-[4px] px-2.5 py-1 text-xs leading-none font-semibold whitespace-nowrap transition-colors",
              focusRing,
              tab === t
                ? "bg-white text-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]"
                : "text-[#808080] hover:text-black"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ------------------------------ Summary ------------------------------ */}
      {tab === "Summary" && chart && (
        <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-3">
          <section className={cn(card, "flex flex-col gap-3 px-4 pt-3.5 pb-4 xl:col-span-2")}>
            <SectionTitle
              title="Latest note"
              hint="Most recent entry from the care team"
            />
            {chart.notes[0] ? (
              <NoteEntry note={chart.notes[0]} />
            ) : (
              <EmptyState
                title="No notes yet"
                hint="Clinical notes will appear here as they are written."
              />
            )}
            <button
              type="button"
              onClick={() => setTab("Notes")}
              className={cn(
                "w-fit rounded-[4px] text-[11px] leading-none font-semibold text-[#808080] transition-colors hover:text-black",
                focusRing
              )}
            >
              All notes →
            </button>
          </section>

          <section className={cn(card, "flex flex-col gap-3 px-4 pt-3.5 pb-4")}>
            <SectionTitle
              title="Treatment plan"
              hint="Active goals from the care team"
            />
            <ul className="flex flex-col gap-2.5">
              {chart.treatmentPlan.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#797bff]" />
                  <span className="text-xs leading-relaxed font-medium text-[#222]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className={cn(card, "flex flex-col gap-3 px-4 pt-3.5 pb-4 xl:col-span-2")}>
            <SectionTitle
              title="Active medications"
              hint={`${chart.medications.filter((m) => m.status === "Active").length} currently prescribed`}
            />
            <ul className="flex flex-col gap-2.5">
              {chart.medications.map((med) => (
                <li
                  key={med.name}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-xs leading-none font-semibold text-[#222]">
                      {med.name}
                    </span>
                    <span className="text-[10px] leading-none font-medium text-[#808080]">
                      {med.dose} · {med.route} · {med.freq}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-[5px] px-2 py-[5px] text-[10px] leading-none font-semibold",
                      medStatusStyles[med.status]
                    )}
                  >
                    {med.status}
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setTab("Medications")}
              className={cn(
                "w-fit rounded-[4px] text-[11px] leading-none font-semibold text-[#808080] transition-colors hover:text-black",
                focusRing
              )}
            >
              Full medication record →
            </button>
          </section>

          <section className={cn(card, "flex flex-col gap-3 px-4 pt-3.5 pb-4")}>
            <SectionTitle
              title="Discharge readiness"
              hint={`${chart.discharge.filter((item) => item.done).length} of ${chart.discharge.length} items complete`}
            />
            <ul className="flex flex-col gap-2">
              {chart.discharge.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-full border",
                      item.done
                        ? "border-[#05a400] bg-[#05a400]/15 text-[#009638]"
                        : "border-[#d6d6da] bg-white text-transparent"
                    )}
                  >
                    <HugeiconsIcon icon={Tick02Icon} className="size-2.5" strokeWidth={3} />
                  </span>
                  <span className="text-xs leading-none font-medium text-[#222]">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* -------------------------------- Vitals -------------------------------- */}
      {tab === "Vitals" && chart && (
        <section className={cn(card, "overflow-x-auto")}> 
          <div className="px-4 pt-3.5 pb-3">
            <SectionTitle
              title="Vitals trend"
              hint="Last 24 hours, oldest reading first"
            />
          </div>
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow className="border-y-[0.5px] border-[#e8e8e8] hover:bg-transparent">
                <TableHead className={headCell}>Time</TableHead>
                <TableHead className={headCell}>Heart rate</TableHead>
                <TableHead className={headCell}>Blood pressure</TableHead>
                <TableHead className={headCell}>SpO2</TableHead>
                <TableHead className={headCell}>Temp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chart.vitals.map((vital) => {
                const abnormal = vital.spo2 < 92 || vital.hr > 110 || vital.sys < 95 || vital.temp >= 38
                return (
                  <TableRow
                    key={vital.time}
                    className="border-b-[0.5px] border-[#e8e8e8] hover:bg-[#f7f7f9]"
                  >
                    <TableCell className={cn(bodyCell, "text-xs font-semibold text-[#222]")}>{vital.time}</TableCell>
                    <TableCell className={cn(bodyCell, "text-xs font-medium", abnormal && vital.hr > 110 ? "text-[#960000]" : "text-[#222]")}>{vital.hr} bpm</TableCell>
                    <TableCell className={cn(bodyCell, "text-xs font-medium", abnormal && vital.sys < 95 ? "text-[#960000]" : "text-[#222]")}>{vital.sys}/{vital.dia}</TableCell>
                    <TableCell className={cn(bodyCell, "text-xs font-medium", abnormal && vital.spo2 < 92 ? "text-[#960000]" : "text-[#222]")}>{vital.spo2}%</TableCell>
                    <TableCell className={cn(bodyCell, "text-xs font-medium", abnormal && vital.temp >= 38 ? "text-[#960000]" : "text-[#222]")}>{vital.temp} C</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </section>
      )}

      {/* ---------------------------- Medications ---------------------------- */}
      {tab === "Medications" && chart && (
        <div className="overflow-x-auto rounded-[8px] border border-[#e5e5e9] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
          <Table>
            <TableHeader>
              <TableRow className="border-b-[0.5px] border-[#e8e8e8] hover:bg-transparent">
                <TableHead className={headCell}>Medication</TableHead>
                <TableHead className={headCell}>Dose</TableHead>
                <TableHead className={headCell}>Route</TableHead>
                <TableHead className={headCell}>Frequency</TableHead>
                <TableHead className={headCell}>Started</TableHead>
                <TableHead className={headCell}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chart.medications.map((med) => (
                <TableRow
                  key={med.name}
                  className="border-b-[0.5px] border-[#e8e8e8] hover:bg-[#f7f7f9]"
                >
                  <TableCell className={cn(bodyCell, "text-xs font-semibold text-[#222]")}>
                    {med.name}
                  </TableCell>
                  <TableCell className={cn(bodyCell, "text-xs font-medium text-[#222]")}>
                    {med.dose}
                  </TableCell>
                  <TableCell className={cn(bodyCell, "text-xs font-medium text-[#222]")}>
                    {med.route}
                  </TableCell>
                  <TableCell className={cn(bodyCell, "text-xs font-medium text-[#222]")}>
                    {med.freq}
                  </TableCell>
                  <TableCell className={cn(bodyCell, "text-xs font-medium text-[#222]")}>
                    {med.started}
                  </TableCell>
                  <TableCell className={bodyCell}>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-[5px] px-2 py-[5px] text-[10px] leading-none font-semibold",
                        medStatusStyles[med.status]
                      )}
                    >
                      {med.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* -------------------------------- Labs -------------------------------- */}
      {tab === "Labs" && chart && (
        <div className="overflow-x-auto rounded-[8px] border border-[#e5e5e9] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
          <Table>
            <TableHeader>
              <TableRow className="border-b-[0.5px] border-[#e8e8e8] hover:bg-transparent">
                <TableHead className={headCell}>Test</TableHead>
                <TableHead className={headCell}>Result</TableHead>
                <TableHead className={headCell}>Reference</TableHead>
                <TableHead className={headCell}>Flag</TableHead>
                <TableHead className={headCell}>Collected</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chart.labs.map((lab) => (
                <TableRow
                  key={lab.test}
                  className="border-b-[0.5px] border-[#e8e8e8] hover:bg-[#f7f7f9]"
                >
                  <TableCell className={cn(bodyCell, "text-xs font-semibold text-[#222]")}>
                    {lab.test}
                  </TableCell>
                  <TableCell className={cn(bodyCell, "text-xs font-medium text-[#222]")}>
                    {lab.value}
                  </TableCell>
                  <TableCell className={cn(bodyCell, "text-xs font-medium text-[#808080]")}>
                    {lab.ref}
                  </TableCell>
                  <TableCell className={bodyCell}>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-[5px] px-2 py-[5px] text-[10px] leading-none font-semibold",
                        labFlagStyles[lab.flag]
                      )}
                    >
                      {lab.flag === "Critical" && (
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          className="size-3"
                          strokeWidth={2.5}
                        />
                      )}
                      {lab.flag}
                    </span>
                  </TableCell>
                  <TableCell className={cn(bodyCell, "text-xs font-medium text-[#222]")}>
                    {lab.collected}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ------------------------------- Notes ------------------------------- */}
      {tab === "Notes" && chart && (
        <section className={cn(card, "flex flex-col gap-4 px-4 pt-3.5 pb-4")}>
          <SectionTitle
            title="Clinical notes"
            hint="Doctor and nursing entries, most recent first"
          />
          {chart.notes.length === 0 ? (
            <EmptyState
              title="No notes yet"
              hint="Clinical notes will appear here as they are written."
            />
          ) : (
            <ul className="flex flex-col gap-4">
              {chart.notes.map((note) => (
                <li key={`${note.author}-${note.time}`}>
                  <NoteEntry note={note} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ---------------------------- Appointments ---------------------------- */}
      {tab === "Appointments" && (
        <section className={cn(card, "px-4 pt-3.5 pb-2")}>
          <SectionTitle
            title="Appointments"
            hint="Scheduled procedures and reviews this week"
          />
          {patientAppointments.length === 0 ? (
            <div className="my-3">
              <EmptyState
                title="No appointments scheduled"
                hint="Book one from the Care Team schedule."
              />
            </div>
          ) : (
            <ul className="mt-1.5">
              {patientAppointments.map((apt, index) => (
                <li
                  key={apt.id}
                  className={cn(
                    "flex items-center gap-3 py-2.5",
                    index > 0 && "border-t-[0.5px] border-[#e8e8e8]"
                  )}
                >
                  <span className="w-[72px] shrink-0 text-xs font-medium leading-none text-[#222]">
                    {weekDays[apt.day]} {apt.time}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs leading-none font-semibold text-[#222]">
                      {apt.type}
                    </span>
                    <span className="mt-1 block text-[10px] leading-none font-medium text-[#808080]">
                      {apt.room} · {apt.doctor.name}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-[5px] px-2 py-[5px] text-[10px] leading-none font-semibold",
                      aptStatusStyles[apt.status]
                    )}
                  >
                    {apt.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ------------------------------ Documents ------------------------------ */}
      {tab === "Documents" && (
        <section className={cn(card, "px-4 pt-3.5 pb-4")}>
          <SectionTitle
            title="Documents"
            hint="Signed records attached to this admission"
          />
          {documents.length === 0 ? (
            <div className="mt-3">
              <EmptyState
                title="No documents uploaded"
                hint="Scans, consents, and referral letters will appear here."
              />
            </div>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {documents.map((doc) => (
                <li
                  key={doc.name}
                  className="flex items-center gap-2.5 rounded-[6px] border-[0.5px] border-[#e8e8e8] px-3 py-2.5"
                >
                  <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[4px] bg-[#ececef] text-[#808080]">
                    <HugeiconsIcon
                      icon={DocumentAttachmentIcon}
                      className="size-3.5"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="truncate text-xs leading-none font-semibold text-[#222]">
                      {doc.name}
                    </span>
                    <span className="text-[10px] leading-none font-medium text-[#808080]">
                      {doc.meta}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* chart data missing for patients admitted through the demo dialog */}
      {tab !== "Appointments" && tab !== "Documents" && !chart && (
        <EmptyState
          title="No chart data recorded yet"
          hint="Vitals, medications, and notes will appear once charting begins."
        />
      )}
    </div>
  )
}

function NoteEntry({
  note,
}: {
  note: { author: string; role: string; time: string; text: string }
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[6px] border-[0.5px] border-[#e8e8e8] bg-[#f7f7f9] px-3.5 py-3">
      <span className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs leading-none font-semibold text-black">
          {note.author}
        </span>
        <span className="inline-flex items-center rounded-[5px] bg-[#0052a4]/15 px-2 py-[3px] text-[10px] leading-none font-semibold text-[#0360be]">
          {note.role}
        </span>
        <span className="text-[10px] leading-none font-medium text-[#808080]">
          {note.time}
        </span>
      </span>
      <p className="text-xs leading-relaxed font-medium text-[#222]">
        {note.text}
      </p>
    </div>
  )
}
