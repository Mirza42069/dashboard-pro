"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  Brain01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  HealthIcon,
  MicroscopeIcon,
  MoreVerticalIcon,
  PlusSignIcon,
  StethoscopeIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  doctors,
  weekDays,
  type Appointment,
  type AppointmentStatus,
  type AppointmentType,
} from "@/lib/hospital-data"
import { useHospital } from "./hospital-provider"

const typeIcon: Record<AppointmentType, IconSvgElement> = {
  Consultation: StethoscopeIcon,
  Surgery: HealthIcon,
  "Check-up": Tick02Icon,
  Imaging: MicroscopeIcon,
  Therapy: Brain01Icon,
}

const statusStyles: Record<AppointmentStatus, string> = {
  Confirmed: "bg-[#0052a4]/10 text-[#0360be]",
  Pending: "bg-[#b38625]/10 text-[#b38625]",
  Completed: "bg-[#05a400]/10 text-[#009638]",
  Cancelled: "bg-[#878787]/10 text-[#808080]",
}

const doctorList = Object.values(doctors)
const appointmentTypes: AppointmentType[] = [
  "Consultation",
  "Surgery",
  "Check-up",
  "Imaging",
  "Therapy",
]

const fieldLabel = "text-[11px] leading-none font-semibold text-[#222]"
const fieldInput =
  "h-8 w-full rounded-[6px] border-[#e8e8e8] text-xs font-medium text-[#222] placeholder:text-[#808080]"

function BookDialog({
  open,
  onOpenChange,
  day,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  day: number
}) {
  const { appointments, addAppointment } = useHospital()
  const [patient, setPatient] = React.useState("")
  const [time, setTime] = React.useState("10:00")
  const [type, setType] = React.useState<AppointmentType>("Consultation")
  const [doctor, setDoctor] = React.useState(doctorList[0].name)
  const [room, setRoom] = React.useState("")

  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!patient.trim()) return
    const nextNumber = appointments.reduce((max, a) => {
      const n = Number(a.id.replace("APT", ""))
      return Number.isNaN(n) ? max : Math.max(max, n)
    }, 0)
    const appointment: Appointment = {
      id: `APT${String(nextNumber + 1).padStart(3, "0")}`,
      time,
      day,
      patient: patient.trim(),
      doctor: doctorList.find((d) => d.name === doctor) ?? doctorList[0],
      type,
      room: room.trim() || "TBD",
      status: "Pending",
    }
    addAppointment(appointment)
    onOpenChange(false)
    setPatient("")
    setRoom("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] rounded-[12px] border-[#e8e8e8] p-0">
        <form onSubmit={submit}>
          <DialogHeader className="border-b border-[#e8e8e8] px-4 py-3.5">
            <DialogTitle className="text-sm font-semibold text-black">
              Book appointment · {weekDays[day]}
            </DialogTitle>
            <DialogDescription className="text-xs font-medium text-[#808080]">
              New bookings start as pending until the ward confirms.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3.5 px-4 py-4">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label htmlFor="apt-patient" className={fieldLabel}>Patient name</Label>
              <Input
                id="apt-patient"
                required
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                placeholder="Jordan Avery"
                className={fieldInput}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="apt-time" className={fieldLabel}>Time</Label>
              <Input
                id="apt-time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={fieldInput}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className={fieldLabel}>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as AppointmentType)}>
                <SelectTrigger size="sm" className={fieldInput}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[10px] border-[#e8e8e8]">
                  {appointmentTypes.map((t) => (
                    <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className={fieldLabel}>Doctor</Label>
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger size="sm" className={fieldInput}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[10px] border-[#e8e8e8]">
                  {doctorList.map((d) => (
                    <SelectItem key={d.name} value={d.name} className="text-xs">{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="apt-room" className={fieldLabel}>
                Room <span className="font-medium text-[#808080]">(optional)</span>
              </Label>
              <Input
                id="apt-room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="C-104"
                className={fieldInput}
              />
            </div>
          </div>
          <DialogFooter className="border-t border-[#e8e8e8] bg-[#fbfbfb] px-4 py-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-[6px] border border-[#e8e8e8] bg-white px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#222] transition-colors hover:bg-[#f4f3f3]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-[6px] bg-[#222] px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#e8e8e8] transition-colors hover:bg-black"
            >
              Book appointment
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function AppointmentsView() {
  const { appointments, setAppointmentStatus } = useHospital()
  const [day, setDay] = React.useState(0)
  const [bookOpen, setBookOpen] = React.useState(false)

  const dayAppointments = appointments
    .filter((a) => a.day === day)
    .sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-end justify-between">
        <div
          role="tablist"
          aria-label="Day of week"
          className="flex h-[27px] items-center gap-[2px] rounded-[8px] bg-[#f4f3f3] py-[2px] pr-[3px] pl-[2px]"
        >
          {weekDays.map((label, index) => {
            const count = appointments.filter(
              (a) => a.day === index && a.status !== "Cancelled"
            ).length
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={day === index}
                onClick={() => setDay(index)}
                className={cn(
                  "flex items-center gap-1.5 rounded-[6px] px-2.5 py-1 text-xs leading-none font-semibold transition-colors",
                  day === index
                    ? "bg-white text-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]"
                    : "text-[#808080] hover:text-black"
                )}
              >
                {label}
                {count > 0 && (
                  <span
                    className={cn(
                      "rounded-full px-1 py-0.5 font-mono text-[9px] leading-none",
                      day === index ? "bg-[#f4f3f3] text-[#222]" : "bg-[#e8e8e8] text-[#808080]"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={() => setBookOpen(true)}
          className="flex items-center gap-1 rounded-[6px] bg-[#222] px-2 py-1 transition-colors hover:bg-black"
        >
          <span className="text-[11px] leading-none font-medium text-[#e8e8e8]">Book</span>
          <HugeiconsIcon icon={PlusSignIcon} className="size-3.5 text-[#e8e8e8]" strokeWidth={2} />
        </button>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-[#e8e8e8]">
        {dayAppointments.length === 0 && (
          <div className="flex h-40 flex-col items-center justify-center gap-1.5">
            <p className="text-xs font-semibold text-[#222]">No appointments on {weekDays[day]}</p>
            <p className="text-[10px] font-medium text-[#808080]">
              Book the first slot with the button above.
            </p>
          </div>
        )}
        {dayAppointments.map((apt, index) => {
          const cancelled = apt.status === "Cancelled"
          return (
            <div
              key={apt.id}
              className={cn(
                "group/row flex items-center gap-4 px-4 py-2.5 transition-colors hover:bg-[#fbfbfb]",
                index > 0 && "border-t-[0.5px] border-[#e8e8e8]",
                cancelled && "bg-[#fbfbfb]"
              )}
            >
              <span className={cn("w-[52px] shrink-0 font-mono text-sm leading-none text-[#222]", cancelled && "opacity-50")}>
                {apt.time}
              </span>
              <span className={cn("flex w-[220px] shrink-0 flex-col gap-1", cancelled && "opacity-50")}>
                <span className="text-xs leading-none font-semibold text-[#222]">{apt.patient}</span>
                <span className="text-[10px] leading-none font-medium text-[#808080]">
                  {apt.id} · Room {apt.room}
                </span>
              </span>
              <span
                className={cn(
                  "inline-flex w-[130px] shrink-0 items-center gap-1.5 text-xs leading-none font-medium text-[#222]",
                  cancelled && "opacity-50"
                )}
              >
                <HugeiconsIcon icon={typeIcon[apt.type]} className="size-3.5 text-[#808080]" strokeWidth={2} />
                {apt.type}
              </span>
              <span className={cn("flex flex-1 items-center gap-2", cancelled && "opacity-50")}>
                <Avatar className="size-[22px] after:hidden">
                  <AvatarFallback
                    className="text-[9px] font-semibold"
                    style={{ backgroundColor: apt.doctor.bg, color: apt.doctor.fg }}
                  >
                    {apt.doctor.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs leading-none font-medium text-[#222]">{apt.doctor.name}</span>
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-[5px] text-xs leading-none font-semibold",
                  statusStyles[apt.status]
                )}
              >
                {apt.status === "Completed" && (
                  <HugeiconsIcon icon={Tick02Icon} className="size-3" strokeWidth={2.5} />
                )}
                {apt.status === "Cancelled" && (
                  <HugeiconsIcon icon={Cancel01Icon} className="size-3" strokeWidth={2.5} />
                )}
                {apt.status === "Pending" && (
                  <HugeiconsIcon icon={Clock01Icon} className="size-3" strokeWidth={2.5} />
                )}
                {apt.status === "Confirmed" && (
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3" strokeWidth={2.5} />
                )}
                {apt.status}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Actions for ${apt.id}`}
                    className="text-[#808080] opacity-0 transition-opacity group-hover/row:opacity-100 hover:text-black data-[state=open]:opacity-100"
                  >
                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" strokeWidth={1.8} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={4} className="w-36 rounded-[10px] border-[#e8e8e8]">
                  {apt.status !== "Confirmed" && apt.status !== "Completed" && (
                    <DropdownMenuItem className="text-xs" onClick={() => setAppointmentStatus(apt.id, "Confirmed")}>
                      Confirm
                    </DropdownMenuItem>
                  )}
                  {apt.status !== "Completed" && apt.status !== "Cancelled" && (
                    <DropdownMenuItem className="text-xs" onClick={() => setAppointmentStatus(apt.id, "Completed")}>
                      Mark completed
                    </DropdownMenuItem>
                  )}
                  {apt.status === "Cancelled" ? (
                    <DropdownMenuItem className="text-xs" onClick={() => setAppointmentStatus(apt.id, "Pending")}>
                      Restore
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      variant="destructive"
                      className="text-xs"
                      onClick={() => setAppointmentStatus(apt.id, "Cancelled")}
                    >
                      Cancel
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        })}
      </div>

      <BookDialog open={bookOpen} onOpenChange={setBookOpen} day={day} />
    </div>
  )
}
