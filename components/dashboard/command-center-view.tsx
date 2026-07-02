"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  Alert01Icon,
  Alert02Icon,
  ArrowDataTransferVerticalIcon,
  ArrowRight01Icon,
  Calendar03Icon,
  Login03Icon,
  Logout03Icon,
  PillIcon,
  TestTube01Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import {
  activityLog,
  patientCharts,
  todayDayIndex,
  wardDot,
  wards,
  type ActivityType,
  type Appointment,
} from "@/lib/hospital-data"
import { useHospital } from "./hospital-provider"

const card =
  "rounded-[8px] border border-[#e5e5e9] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#797bff]/50"

function CardHeader({
  title,
  hint,
  href,
  linkLabel,
}: {
  title: string
  hint: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xs leading-none font-semibold text-black">
          {title}
        </h2>
        <p className="text-[10px] leading-none font-medium text-[#808080]">
          {hint}
        </p>
      </div>
      {href && (
        <Link
          href={href}
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-[4px] text-[11px] leading-none font-semibold text-[#808080] transition-colors hover:text-black",
            focusRing
          )}
        >
          {linkLabel}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            className="size-3"
            strokeWidth={2}
          />
        </Link>
      )}
    </div>
  )
}

/* ------------------------------ KPI tiles ------------------------------ */

function KpiTile({
  label,
  value,
  hint,
  href,
  tone,
}: {
  label: string
  value: string
  hint: string
  href: string
  tone?: "critical" | "warning"
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col gap-2 bg-white px-4 py-3.5 transition-colors hover:bg-[#f7f7f9]",
        focusRing
      )}
    >
      <span className="text-[10px] leading-none font-semibold tracking-[0.04em] text-[#808080] uppercase">
        {label}
      </span>
      <span
        className={cn(
          "text-[24px] leading-none font-semibold tracking-[-0.24px]",
          tone === "critical"
            ? "text-[#e01e1e]"
            : tone === "warning"
              ? "text-[#b38625]"
              : "text-black"
        )}
      >
        {value}
      </span>
      <span className="text-[10px] leading-none font-medium text-[#808080]">
        {hint}
      </span>
    </Link>
  )
}

/* ----------------------------- activity log ----------------------------- */

const activityIcon: Record<ActivityType, IconSvgElement> = {
  admission: Login03Icon,
  discharge: Logout03Icon,
  transfer: ArrowDataTransferVerticalIcon,
  lab: TestTube01Icon,
  medication: PillIcon,
  appointment: Calendar03Icon,
  alert: Alert01Icon,
}

/* ------------------------------ schedule ------------------------------ */

const aptStatusStyles: Record<Appointment["status"], string> = {
  Confirmed: "bg-[#0052a4]/15 text-[#0360be]",
  Pending: "bg-[#b38625]/15 text-[#b38625]",
  Completed: "bg-[#05a400]/15 text-[#009638]",
  Cancelled: "bg-[#878787]/15 text-[#808080]",
}

export function CommandCenterView() {
  const { patients, staff, appointments } = useHospital()

  const admitted = patients.filter((p) => p.status === "Admitted")
  const critical = admitted.filter((p) => p.condition === "Critical")

  const totalBeds = wards.reduce((s, w) => s + w.beds, 0)
  const totalOccupied = wards.reduce((s, w) => s + w.occupied, 0)
  const availableBeds = totalBeds - totalOccupied

  const pendingDischarges = admitted.filter((p) => {
    const checklist = patientCharts[p.id]?.discharge
    if (!checklist) return false
    const done = checklist.filter((item) => item.done).length
    return done >= 3 && done < checklist.length
  }).length

  const todayAppointments = appointments
    .filter((a) => a.day === todayDayIndex && a.status !== "Cancelled")
    .sort((a, b) => a.time.localeCompare(b.time))
  const pendingConfirmations = todayAppointments.filter(
    (a) => a.status === "Pending"
  ).length

  const onDuty = staff.filter((s) => s.status === "On duty").length
  const onCall = staff.filter((s) => s.status === "On call").length

  // two bookings in the same room at the same time = scheduling conflict
  const conflictKeys = new Set<string>()
  {
    const seen = new Map<string, string>()
    for (const apt of todayAppointments) {
      const key = `${apt.time}|${apt.room}`
      if (seen.has(key)) {
        conflictKeys.add(seen.get(key)!)
        conflictKeys.add(apt.id)
      } else {
        seen.set(key, apt.id)
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Shift KPIs */}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-[#e5e5e9] bg-[#e8e8e8] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] md:grid-cols-3 xl:grid-cols-6">
        <KpiTile
          label="Active patients"
          value={String(admitted.length)}
          hint="admitted across 5 wards"
          href="/patients"
        />
        <KpiTile
          label="Critical"
          value={String(critical.length)}
          hint={
            critical.length > 0
              ? "require close monitoring"
              : "no critical cases"
          }
          href="/patients?view=Critical"
          tone={critical.length > 0 ? "critical" : undefined}
        />
        <KpiTile
          label="Available beds"
          value={String(availableBeds)}
          hint={`of ${totalBeds} total capacity`}
          href="/wards"
        />
        <KpiTile
          label="Pending discharges"
          value={String(pendingDischarges)}
          hint="checklists in progress"
          href="/patients"
        />
        <KpiTile
          label="Appointments today"
          value={String(todayAppointments.length)}
          hint={
            pendingConfirmations > 0
              ? `${pendingConfirmations} pending confirmation`
              : "all confirmed"
          }
          href="/staff"
          tone={pendingConfirmations > 2 ? "warning" : undefined}
        />
        <KpiTile
          label="Staff on duty"
          value={String(onDuty)}
          hint={`${onCall} on call`}
          href="/staff"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        {/* Ward occupancy */}
        <section className={cn(card, "px-4 pt-3.5 pb-4 xl:col-span-3")}>
          <CardHeader
            title="Ward occupancy"
            hint="Occupied beds against capacity"
            href="/wards"
            linkLabel="Bed board"
          />
          <div className="mt-4 flex flex-col gap-[15px]">
            {wards.map((ward) => {
              const pct = Math.round((ward.occupied / ward.beds) * 100)
              const nearCapacity = pct >= 85
              return (
                <div key={ward.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="size-[7px] rounded-[2px]"
                        style={{ backgroundColor: wardDot[ward.name] }}
                      />
                      <span className="text-xs leading-none font-semibold text-[#222]">
                        {ward.name}
                      </span>
                      {nearCapacity && (
                        <span className="flex items-center gap-0.5 text-[10px] leading-none font-semibold text-[#960000]">
                          <HugeiconsIcon
                            icon={Alert02Icon}
                            className="size-3"
                            strokeWidth={2.5}
                          />
                          Near capacity
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-medium leading-none text-[#222]">
                      {ward.occupied}
                      <span className="text-[#808080]">/{ward.beds}</span>
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#ececef]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: nearCapacity ? "#e01e1e" : "#797bff",
                      }}
                    />
                  </div>
                  <span className="text-[10px] leading-none font-medium text-[#808080]">
                    {ward.beds - ward.occupied} available · {ward.floor}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        {/* Today's schedule */}
        <section className={cn(card, "px-4 pt-3.5 pb-2 xl:col-span-2")}>
          <CardHeader
            title="Today's schedule"
            hint="Appointments and procedures for Thursday, Jul 2"
            href="/staff"
            linkLabel="Full schedule"
          />
          {todayAppointments.length === 0 ? (
            <div className="my-3 flex h-[120px] flex-col items-center justify-center gap-1.5 rounded-[6px] border border-dashed border-[#e8e8e8]">
              <p className="text-xs font-semibold text-[#222]">
                Nothing scheduled today
              </p>
              <p className="text-[10px] font-medium text-[#808080]">
                Book appointments from the Care Team page.
              </p>
            </div>
          ) : (
            <ul className="mt-1.5">
              {todayAppointments.map((apt, index) => {
                const conflict = conflictKeys.has(apt.id)
                return (
                  <li
                    key={apt.id}
                    className={cn(
                      "flex items-center gap-3 py-2.5",
                      index > 0 && "border-t-[0.5px] border-[#e8e8e8]"
                    )}
                  >
                    <span className="w-[42px] shrink-0 text-xs font-medium leading-none text-[#222]">
                      {apt.time}
                    </span>
                    <span className="min-w-0 flex-1">
                      {apt.patientId ? (
                        <Link
                          href={`/patients/${apt.patientId}`}
                          className={cn(
                            "truncate rounded-[4px] text-xs leading-none font-semibold text-[#222] underline-offset-2 hover:underline",
                            focusRing
                          )}
                        >
                          {apt.patient}
                        </Link>
                      ) : (
                        <span className="truncate text-xs leading-none font-semibold text-[#222]">
                          {apt.patient}
                        </span>
                      )}
                      <span className="mt-1 block text-[10px] leading-none font-medium text-[#808080]">
                        {apt.type} · {apt.room} · {apt.doctor.name}
                      </span>
                    </span>
                    {conflict && (
                      <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#a40000]/15 px-2 py-[5px] text-[10px] leading-none font-semibold text-[#960000]">
                        <HugeiconsIcon
                          icon={Alert02Icon}
                          className="size-3"
                          strokeWidth={2.5}
                        />
                        Room conflict
                      </span>
                    )}
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center rounded-[5px] px-2 py-[5px] text-[10px] leading-none font-semibold",
                        aptStatusStyles[apt.status]
                      )}
                    >
                      {apt.status}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        {/* Recent activity */}
        <section className={cn(card, "px-4 pt-3.5 pb-4")}>
          <CardHeader
            title="Recent activity"
            hint="Latest events across the hospital"
          />
          <ul className="mt-3 flex flex-col">
            {activityLog.map((event, index) => (
              <li key={event.id} className="flex gap-2.5">
                <div className="flex flex-col items-center">
                  <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full border-[0.5px] border-[#e8e8e8] bg-[#f7f7f9] text-[#808080]">
                    <HugeiconsIcon
                      icon={activityIcon[event.type]}
                      className="size-3"
                      strokeWidth={2}
                    />
                  </span>
                  {index < activityLog.length - 1 && (
                    <span className="w-px flex-1 bg-[#e8e8e8]" />
                  )}
                </div>
                <div className="flex min-w-0 flex-col gap-1 pb-3.5">
                  <span className="text-[11px] leading-tight font-medium text-[#222]">
                    {event.text}
                  </span>
                  <span className="text-[10px] leading-none font-medium text-[#808080]">
                    <span>{event.time}</span> ·{" "}
                    {event.actor}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
