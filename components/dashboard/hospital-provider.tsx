"use client"

import * as React from "react"
import { toast } from "sonner"

import {
  initialAppointments,
  patients as initialPatients,
  staff as initialStaff,
  type Appointment,
  type AppointmentStatus,
  type DutyStatus,
  type Patient,
} from "@/lib/hospital-data"

interface HospitalState {
  patients: Patient[]
  addPatient: (patient: Patient) => void
  dischargePatients: (ids: string[]) => void
  readmitPatient: (id: string) => void
  deletePatients: (ids: string[]) => void
  appointments: Appointment[]
  addAppointment: (appointment: Appointment) => void
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void
  staff: typeof initialStaff
  setDutyStatus: (id: string, status: DutyStatus) => void
  starred: boolean
  toggleStarred: () => void
}

const HospitalContext = React.createContext<HospitalState | null>(null)

export function useHospital() {
  const ctx = React.useContext(HospitalContext)
  if (!ctx) throw new Error("useHospital must be used within HospitalProvider")
  return ctx
}

export function HospitalProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = React.useState(initialPatients)
  const [appointments, setAppointments] = React.useState(initialAppointments)
  const [staff, setStaff] = React.useState(initialStaff)
  const [starred, setStarred] = React.useState(false)

  const value: HospitalState = {
    patients,
    addPatient: (patient) => {
      setPatients((prev) => [...prev, patient])
      toast.success(`${patient.id} admitted to ${patient.ward}`)
    },
    dischargePatients: (ids) => {
      setPatients((prev) =>
        prev.map((p) => (ids.includes(p.id) ? { ...p, status: "Discharged" } : p))
      )
      toast.success(
        ids.length === 1 ? `${ids[0]} discharged` : `${ids.length} patients discharged`
      )
    },
    readmitPatient: (id) => {
      setPatients((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "Admitted" } : p))
      )
      toast.success(`${id} readmitted`)
    },
    deletePatients: (ids) => {
      setPatients((prev) => prev.filter((p) => !ids.includes(p.id)))
      toast.success(
        ids.length === 1 ? `${ids[0]} removed` : `${ids.length} records removed`
      )
    },
    appointments,
    addAppointment: (appointment) => {
      setAppointments((prev) =>
        [...prev, appointment].sort((a, b) => a.time.localeCompare(b.time))
      )
      toast.success(`Appointment booked for ${appointment.patient}`)
    },
    setAppointmentStatus: (id, status) => {
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)))
      toast.success(`Appointment ${status.toLowerCase()}`)
    },
    staff,
    setDutyStatus: (id, status) => {
      setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
      const member = staff.find((s) => s.id === id)
      toast.success(`${member?.name ?? id} is now ${status.toLowerCase()}`)
    },
    starred,
    toggleStarred: () => {
      toast.success(starred ? "Removed from favorites" : "Added to favorites")
      setStarred(!starred)
    },
  }

  return <HospitalContext.Provider value={value}>{children}</HospitalContext.Provider>
}
