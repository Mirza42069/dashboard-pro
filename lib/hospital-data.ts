export type Ward =
  | "Cardiology"
  | "Neurology"
  | "Pediatrics"
  | "Orthopedics"
  | "Oncology"

export type PatientStatus = "Admitted" | "Discharged"

export type Condition = "Stable" | "Fair" | "Serious" | "Critical"

export interface Doctor {
  name: string
  initials: string
  /** avatar tint */
  bg: string
  fg: string
}

export interface Patient {
  id: string
  ward: Ward
  doctor: Doctor
  status: PatientStatus
  age: number
  condition: Condition
  room: string
  admitted: string
  blood: string
}

/** 7px square dot colors, straight from the Figma department chips */
export const wardDot: Record<Ward, string> = {
  Orthopedics: "#05a400",
  Cardiology: "#f86300",
  Neurology: "#9b49c4",
  Pediatrics: "#3280fa",
  Oncology: "#222222",
}

export const doctors: Record<string, Doctor> = {
  hart: { name: "Dr. Hart", initials: "CH", bg: "#d9ecff", fg: "#2277ce" },
  okafor: { name: "Dr. Okafor", initials: "NO", bg: "#e3f6e2", fg: "#0d8a08" },
  reyes: { name: "Dr. Reyes", initials: "MR", bg: "#f3e6fb", fg: "#8f3bbf" },
  bauer: { name: "Dr. Bauer", initials: "LB", bg: "#ffeadd", fg: "#d85200" },
  singh: { name: "Dr. Singh", initials: "AS", bg: "#fdf1d7", fg: "#b38625" },
}

export const patients: Patient[] = [
  {
    id: "PAT001",
    ward: "Cardiology",
    doctor: doctors.hart,
    status: "Admitted",
    age: 64,
    condition: "Stable",
    room: "C-102",
    admitted: "Jun 2, 2026",
    blood: "O+",
  },
  {
    id: "PAT002",
    ward: "Neurology",
    doctor: doctors.reyes,
    status: "Admitted",
    age: 47,
    condition: "Fair",
    room: "N-215",
    admitted: "Jun 4, 2026",
    blood: "A-",
  },
  {
    id: "PAT003",
    ward: "Cardiology",
    doctor: doctors.hart,
    status: "Admitted",
    age: 71,
    condition: "Serious",
    room: "C-114",
    admitted: "Jun 7, 2026",
    blood: "B+",
  },
  {
    id: "PAT004",
    ward: "Pediatrics",
    doctor: doctors.okafor,
    status: "Admitted",
    age: 9,
    condition: "Stable",
    room: "P-031",
    admitted: "Jun 9, 2026",
    blood: "O-",
  },
  {
    id: "PAT005",
    ward: "Orthopedics",
    doctor: doctors.bauer,
    status: "Admitted",
    age: 38,
    condition: "Stable",
    room: "T-408",
    admitted: "Jun 11, 2026",
    blood: "AB+",
  },
  {
    id: "PAT006",
    ward: "Oncology",
    doctor: doctors.singh,
    status: "Admitted",
    age: 58,
    condition: "Critical",
    room: "O-021",
    admitted: "Jun 12, 2026",
    blood: "A+",
  },
  {
    id: "PAT007",
    ward: "Pediatrics",
    doctor: doctors.okafor,
    status: "Admitted",
    age: 13,
    condition: "Fair",
    room: "P-014",
    admitted: "Jun 14, 2026",
    blood: "B-",
  },
  {
    id: "PAT008",
    ward: "Orthopedics",
    doctor: doctors.bauer,
    status: "Discharged",
    age: 26,
    condition: "Stable",
    room: "T-410",
    admitted: "Jun 15, 2026",
    blood: "O+",
  },
  {
    id: "PAT009",
    ward: "Neurology",
    doctor: doctors.reyes,
    status: "Admitted",
    age: 52,
    condition: "Serious",
    room: "N-207",
    admitted: "Jun 18, 2026",
    blood: "A+",
  },
  {
    id: "PAT010",
    ward: "Cardiology",
    doctor: doctors.hart,
    status: "Admitted",
    age: 66,
    condition: "Stable",
    room: "C-118",
    admitted: "Jun 21, 2026",
    blood: "AB-",
  },
  {
    id: "PAT011",
    ward: "Oncology",
    doctor: doctors.singh,
    status: "Discharged",
    age: 61,
    condition: "Fair",
    room: "O-018",
    admitted: "Jun 22, 2026",
    blood: "O+",
  },
  {
    id: "PAT012",
    ward: "Pediatrics",
    doctor: doctors.okafor,
    status: "Admitted",
    age: 6,
    condition: "Stable",
    room: "P-027",
    admitted: "Jun 25, 2026",
    blood: "B+",
  },
  {
    id: "PAT013",
    ward: "Neurology",
    doctor: doctors.reyes,
    status: "Discharged",
    age: 44,
    condition: "Stable",
    room: "N-203",
    admitted: "Jun 27, 2026",
    blood: "A-",
  },
  {
    id: "PAT014",
    ward: "Cardiology",
    doctor: doctors.hart,
    status: "Admitted",
    age: 78,
    condition: "Critical",
    room: "C-101",
    admitted: "Jun 29, 2026",
    blood: "O-",
  },
  {
    id: "PAT015",
    ward: "Orthopedics",
    doctor: doctors.bauer,
    status: "Admitted",
    age: 33,
    condition: "Fair",
    room: "T-402",
    admitted: "Jul 1, 2026",
    blood: "AB+",
  },
]

/** Daily admissions for June — mirrors the Incident Tracking bar chart */
export const admissionsByDay: { day: string; count: number }[] = [
  { day: "Jun 1", count: 2 },
  { day: "Jun 2", count: 4 },
  { day: "Jun 3", count: 2 },
  { day: "Jun 4", count: 1 },
  { day: "Jun 5", count: 8 },
  { day: "Jun 6", count: 15 },
  { day: "Jun 7", count: 9 },
  { day: "Jun 8", count: 18 },
  { day: "Jun 9", count: 8 },
  { day: "Jun 10", count: 3 },
  { day: "Jun 11", count: 1 },
  { day: "Jun 12", count: 2 },
  { day: "Jun 13", count: 1 },
  { day: "Jun 14", count: 1 },
  { day: "Jun 15", count: 3 },
  { day: "Jun 16", count: 12 },
  { day: "Jun 17", count: 14 },
  { day: "Jun 18", count: 26 },
  { day: "Jun 19", count: 10 },
  { day: "Jun 20", count: 13 },
  { day: "Jun 21", count: 2 },
  { day: "Jun 22", count: 1 },
  { day: "Jun 23", count: 2 },
  { day: "Jun 24", count: 3 },
  { day: "Jun 25", count: 1 },
  { day: "Jun 26", count: 2 },
  { day: "Jun 27", count: 5 },
  { day: "Jun 28", count: 1 },
  { day: "Jun 29", count: 3 },
  { day: "Jun 30", count: 2 },
]

export const totalAdmissions = admissionsByDay.reduce((s, d) => s + d.count, 0)

/* ------------------------------- wards ------------------------------- */

export interface WardInfo {
  name: Ward
  code: string
  beds: number
  occupied: number
  headNurse: string
  floor: string
}

export const wards: WardInfo[] = [
  { name: "Cardiology", code: "C", beds: 32, occupied: 27, headNurse: "R. Alvarez", floor: "Floor 1" },
  { name: "Neurology", code: "N", beds: 24, occupied: 17, headNurse: "T. Nguyen", floor: "Floor 2" },
  { name: "Pediatrics", code: "P", beds: 28, occupied: 12, headNurse: "S. Whitfield", floor: "Floor 3" },
  { name: "Orthopedics", code: "T", beds: 20, occupied: 15, headNurse: "J. Barnes", floor: "Floor 4" },
  { name: "Oncology", code: "O", beds: 18, occupied: 16, headNurse: "M. Castillo", floor: "Floor 2" },
]

/* ------------------------------- staff ------------------------------- */

export type StaffRole = "Physician" | "Surgeon" | "Nurse" | "Technician"
export type DutyStatus = "On duty" | "On call" | "Off duty"

export interface StaffMember {
  id: string
  name: string
  initials: string
  bg: string
  fg: string
  role: StaffRole
  ward: Ward
  shift: string
  pager: string
  status: DutyStatus
}

export const staff: StaffMember[] = [
  { id: "STF001", name: "Dr. Claire Hart", initials: "CH", bg: "#d9ecff", fg: "#2277ce", role: "Physician", ward: "Cardiology", shift: "07:00 – 19:00", pager: "4021", status: "On duty" },
  { id: "STF002", name: "Dr. Miguel Reyes", initials: "MR", bg: "#f3e6fb", fg: "#8f3bbf", role: "Physician", ward: "Neurology", shift: "07:00 – 19:00", pager: "4102", status: "On duty" },
  { id: "STF003", name: "Dr. Nadia Okafor", initials: "NO", bg: "#e3f6e2", fg: "#0d8a08", role: "Physician", ward: "Pediatrics", shift: "09:00 – 17:00", pager: "4230", status: "On call" },
  { id: "STF004", name: "Dr. Lena Bauer", initials: "LB", bg: "#ffeadd", fg: "#d85200", role: "Surgeon", ward: "Orthopedics", shift: "06:00 – 14:00", pager: "4311", status: "On duty" },
  { id: "STF005", name: "Dr. Arjun Singh", initials: "AS", bg: "#fdf1d7", fg: "#b38625", role: "Physician", ward: "Oncology", shift: "11:00 – 23:00", pager: "4415", status: "Off duty" },
  { id: "STF006", name: "Rosa Alvarez", initials: "RA", bg: "#ffe3e3", fg: "#c43a3a", role: "Nurse", ward: "Cardiology", shift: "07:00 – 19:00", pager: "5120", status: "On duty" },
  { id: "STF007", name: "Tam Nguyen", initials: "TN", bg: "#e0f3f6", fg: "#137f93", role: "Nurse", ward: "Neurology", shift: "19:00 – 07:00", pager: "5217", status: "On call" },
  { id: "STF008", name: "Sam Whitfield", initials: "SW", bg: "#eae7fd", fg: "#5a4ecc", role: "Nurse", ward: "Pediatrics", shift: "07:00 – 19:00", pager: "5304", status: "On duty" },
  { id: "STF009", name: "Jo Barnes", initials: "JB", bg: "#e3f6e2", fg: "#0d8a08", role: "Technician", ward: "Orthopedics", shift: "08:00 – 16:00", pager: "6112", status: "Off duty" },
  { id: "STF010", name: "Mia Castillo", initials: "MC", bg: "#d9ecff", fg: "#2277ce", role: "Nurse", ward: "Oncology", shift: "19:00 – 07:00", pager: "5433", status: "On duty" },
]

/* ---------------------------- appointments ---------------------------- */

export type AppointmentType = "Consultation" | "Surgery" | "Check-up" | "Imaging" | "Therapy"
export type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled"

export interface Appointment {
  id: string
  time: string
  /** 0 = Monday … 6 = Sunday */
  day: number
  patient: string
  doctor: Doctor
  type: AppointmentType
  room: string
  status: AppointmentStatus
}

export const initialAppointments: Appointment[] = [
  { id: "APT001", time: "08:00", day: 0, patient: "Alfred White", doctor: doctors.hart, type: "Check-up", room: "C-102", status: "Completed" },
  { id: "APT002", time: "09:30", day: 0, patient: "Grace Kent", doctor: doctors.reyes, type: "Imaging", room: "N-Lab 2", status: "Confirmed" },
  { id: "APT003", time: "11:00", day: 0, patient: "Emma Lane", doctor: doctors.okafor, type: "Consultation", room: "P-014", status: "Pending" },
  { id: "APT004", time: "13:30", day: 0, patient: "Brian Cranston", doctor: doctors.bauer, type: "Surgery", room: "OR-3", status: "Confirmed" },
  { id: "APT005", time: "16:00", day: 0, patient: "Norah Page", doctor: doctors.singh, type: "Therapy", room: "O-021", status: "Pending" },
  { id: "APT006", time: "08:30", day: 1, patient: "Finn Gray", doctor: doctors.hart, type: "Consultation", room: "C-114", status: "Confirmed" },
  { id: "APT007", time: "10:00", day: 1, patient: "Claire Hart", doctor: doctors.reyes, type: "Imaging", room: "N-Lab 1", status: "Pending" },
  { id: "APT008", time: "14:00", day: 1, patient: "Dave Ross", doctor: doctors.bauer, type: "Surgery", room: "OR-1", status: "Confirmed" },
  { id: "APT009", time: "09:00", day: 2, patient: "Jack Nyberg", doctor: doctors.okafor, type: "Check-up", room: "P-031", status: "Confirmed" },
  { id: "APT010", time: "11:30", day: 2, patient: "Lily Bell", doctor: doctors.singh, type: "Consultation", room: "O-018", status: "Pending" },
  { id: "APT011", time: "15:00", day: 3, patient: "Sam Holt", doctor: doctors.hart, type: "Therapy", room: "C-118", status: "Confirmed" },
  { id: "APT012", time: "10:30", day: 4, patient: "Blake Cole", doctor: doctors.reyes, type: "Imaging", room: "N-Lab 2", status: "Pending" },
  { id: "APT013", time: "13:00", day: 4, patient: "Alex Reed", doctor: doctors.bauer, type: "Check-up", room: "T-408", status: "Confirmed" },
  { id: "APT014", time: "09:30", day: 5, patient: "Gerald James", doctor: doctors.okafor, type: "Consultation", room: "P-027", status: "Pending" },
  { id: "APT015", time: "12:00", day: 6, patient: "Kent Gray", doctor: doctors.singh, type: "Therapy", room: "O-021", status: "Pending" },
]

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const

/* ----------------------------- analytics ----------------------------- */

/** average length of stay (days) per week, last 12 weeks */
export const stayTrend: { week: string; days: number }[] = [
  { week: "W14", days: 5.8 }, { week: "W15", days: 5.2 }, { week: "W16", days: 5.5 },
  { week: "W17", days: 4.9 }, { week: "W18", days: 4.6 }, { week: "W19", days: 5.1 },
  { week: "W20", days: 4.4 }, { week: "W21", days: 4.2 }, { week: "W22", days: 4.5 },
  { week: "W23", days: 4.1 }, { week: "W24", days: 3.9 }, { week: "W25", days: 4.0 },
]
