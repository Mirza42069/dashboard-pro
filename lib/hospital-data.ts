export type Ward =
  | "Cardiology"
  | "Neurology"
  | "Pediatrics"
  | "Orthopedics"
  | "Oncology"

export type PatientStatus = "Admitted" | "Discharged"

export type Condition = "Stable" | "Fair" | "Serious" | "Critical"

export type Sex = "M" | "F"

/** Roll-up of the latest vitals reading against expected ranges */
export type VitalsFlag = "Normal" | "Watch" | "Abnormal"

export interface Doctor {
  name: string
  initials: string
  /** avatar tint, used as fallback while the photo loads */
  bg: string
  fg: string
  photo: string
}

export interface Patient {
  id: string
  /** medical record number — fictional, mock data only */
  mrn: string
  name: string
  sex: Sex
  ward: Ward
  doctor: Doctor
  status: PatientStatus
  age: number
  dob: string
  condition: Condition
  room: string
  bed: string
  admitted: string
  blood: string
  diagnosis: string
  /** empty array = no known allergies */
  allergies: string[]
  vitalsFlag: VitalsFlag
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
  hart: {
    name: "Dr. Hart",
    initials: "CH",
    bg: "#d9ecff",
    fg: "#2277ce",
    photo: "/avatars/hart.jpg",
  },
  okafor: {
    name: "Dr. Okafor",
    initials: "NO",
    bg: "#e3f6e2",
    fg: "#0d8a08",
    photo: "/avatars/okafor.jpg",
  },
  reyes: {
    name: "Dr. Reyes",
    initials: "MR",
    bg: "#f3e6fb",
    fg: "#8f3bbf",
    photo: "/avatars/reyes.jpg",
  },
  bauer: {
    name: "Dr. Bauer",
    initials: "LB",
    bg: "#ffeadd",
    fg: "#d85200",
    photo: "/avatars/bauer.jpg",
  },
  singh: {
    name: "Dr. Singh",
    initials: "AS",
    bg: "#fdf1d7",
    fg: "#b38625",
    photo: "/avatars/singh.jpg",
  },
}

export const patients: Patient[] = [
  {
    id: "PAT001",
    mrn: "MRN-402181",
    name: "Harold Jensen",
    sex: "M",
    ward: "Cardiology",
    doctor: doctors.hart,
    status: "Admitted",
    age: 64,
    dob: "Mar 14, 1962",
    condition: "Stable",
    room: "C-102",
    bed: "1",
    admitted: "Jun 2, 2026",
    blood: "O+",
    diagnosis: "NSTEMI — post-PCI monitoring",
    allergies: [],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT002",
    mrn: "MRN-417756",
    name: "Priya Raman",
    sex: "F",
    ward: "Neurology",
    doctor: doctors.reyes,
    status: "Admitted",
    age: 47,
    dob: "Aug 2, 1978",
    condition: "Fair",
    room: "N-215",
    bed: "2",
    admitted: "Jun 4, 2026",
    blood: "A-",
    diagnosis: "Ischemic stroke — thrombolysis follow-up",
    allergies: ["Penicillin"],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT003",
    mrn: "MRN-421904",
    name: "Walter Osei",
    sex: "M",
    ward: "Cardiology",
    doctor: doctors.hart,
    status: "Admitted",
    age: 71,
    dob: "Jan 30, 1955",
    condition: "Serious",
    room: "C-114",
    bed: "1",
    admitted: "Jun 7, 2026",
    blood: "B+",
    diagnosis: "Atrial fibrillation with rapid ventricular response",
    allergies: ["Sulfa drugs"],
    vitalsFlag: "Watch",
  },
  {
    id: "PAT004",
    mrn: "MRN-430267",
    name: "Sofia Marquez",
    sex: "F",
    ward: "Pediatrics",
    doctor: doctors.okafor,
    status: "Admitted",
    age: 9,
    dob: "May 21, 2017",
    condition: "Stable",
    room: "P-031",
    bed: "1",
    admitted: "Jun 9, 2026",
    blood: "O-",
    diagnosis: "Community-acquired pneumonia",
    allergies: [],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT005",
    mrn: "MRN-433518",
    name: "Daniel Kim",
    sex: "M",
    ward: "Orthopedics",
    doctor: doctors.bauer,
    status: "Admitted",
    age: 38,
    dob: "Nov 8, 1987",
    condition: "Stable",
    room: "T-408",
    bed: "2",
    admitted: "Jun 11, 2026",
    blood: "AB+",
    diagnosis: "Femur fracture — ORIF post-op day 3",
    allergies: ["Latex"],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT006",
    mrn: "MRN-436842",
    name: "Margaret Boone",
    sex: "F",
    ward: "Oncology",
    doctor: doctors.singh,
    status: "Admitted",
    age: 58,
    dob: "Feb 17, 1968",
    condition: "Critical",
    room: "O-021",
    bed: "1",
    admitted: "Jun 12, 2026",
    blood: "A+",
    diagnosis: "AML — induction chemotherapy, neutropenic sepsis",
    allergies: ["Penicillin", "Contrast dye"],
    vitalsFlag: "Abnormal",
  },
  {
    id: "PAT007",
    mrn: "MRN-440129",
    name: "Elias Warner",
    sex: "M",
    ward: "Pediatrics",
    doctor: doctors.okafor,
    status: "Admitted",
    age: 13,
    dob: "Sep 3, 2012",
    condition: "Fair",
    room: "P-014",
    bed: "1",
    admitted: "Jun 14, 2026",
    blood: "B-",
    diagnosis: "Acute appendicitis — post-appendectomy",
    allergies: [],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT008",
    mrn: "MRN-444371",
    name: "Nina Petrova",
    sex: "F",
    ward: "Orthopedics",
    doctor: doctors.bauer,
    status: "Discharged",
    age: 26,
    dob: "Apr 26, 2000",
    condition: "Stable",
    room: "T-410",
    bed: "1",
    admitted: "Jun 15, 2026",
    blood: "O+",
    diagnosis: "ACL reconstruction — recovery",
    allergies: [],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT009",
    mrn: "MRN-448653",
    name: "Gordon Blake",
    sex: "M",
    ward: "Neurology",
    doctor: doctors.reyes,
    status: "Admitted",
    age: 52,
    dob: "Jun 11, 1974",
    condition: "Serious",
    room: "N-207",
    bed: "1",
    admitted: "Jun 18, 2026",
    blood: "A+",
    diagnosis: "Status epilepticus — stabilized, monitoring",
    allergies: ["Phenytoin"],
    vitalsFlag: "Watch",
  },
  {
    id: "PAT010",
    mrn: "MRN-452980",
    name: "Alma Rivera",
    sex: "F",
    ward: "Cardiology",
    doctor: doctors.hart,
    status: "Admitted",
    age: 66,
    dob: "Oct 5, 1959",
    condition: "Stable",
    room: "C-118",
    bed: "2",
    admitted: "Jun 21, 2026",
    blood: "AB-",
    diagnosis: "Congestive heart failure — exacerbation",
    allergies: ["ACE inhibitors"],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT011",
    mrn: "MRN-457224",
    name: "Frank Delaney",
    sex: "M",
    ward: "Oncology",
    doctor: doctors.singh,
    status: "Discharged",
    age: 61,
    dob: "Dec 19, 1964",
    condition: "Fair",
    room: "O-018",
    bed: "2",
    admitted: "Jun 22, 2026",
    blood: "O+",
    diagnosis: "Colorectal carcinoma — chemo cycle 4",
    allergies: [],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT012",
    mrn: "MRN-461508",
    name: "Lucy Tran",
    sex: "F",
    ward: "Pediatrics",
    doctor: doctors.okafor,
    status: "Admitted",
    age: 6,
    dob: "Jul 30, 2019",
    condition: "Stable",
    room: "P-027",
    bed: "2",
    admitted: "Jun 25, 2026",
    blood: "B+",
    diagnosis: "Severe asthma exacerbation — weaning oxygen",
    allergies: ["Peanuts"],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT013",
    mrn: "MRN-465837",
    name: "Dana Whitmore",
    sex: "F",
    ward: "Neurology",
    doctor: doctors.reyes,
    status: "Discharged",
    age: 44,
    dob: "Mar 9, 1982",
    condition: "Stable",
    room: "N-203",
    bed: "1",
    admitted: "Jun 27, 2026",
    blood: "A-",
    diagnosis: "Migraine with aura — observation",
    allergies: [],
    vitalsFlag: "Normal",
  },
  {
    id: "PAT014",
    mrn: "MRN-470112",
    name: "Ernest Gallagher",
    sex: "M",
    ward: "Cardiology",
    doctor: doctors.hart,
    status: "Admitted",
    age: 78,
    dob: "Jan 12, 1948",
    condition: "Critical",
    room: "C-101",
    bed: "1",
    admitted: "Jun 29, 2026",
    blood: "O-",
    diagnosis: "Cardiogenic shock — inotrope support",
    allergies: ["Aspirin"],
    vitalsFlag: "Abnormal",
  },
  {
    id: "PAT015",
    mrn: "MRN-474489",
    name: "Yara Haddad",
    sex: "F",
    ward: "Orthopedics",
    doctor: doctors.bauer,
    status: "Admitted",
    age: 33,
    dob: "Aug 27, 1992",
    condition: "Fair",
    room: "T-402",
    bed: "1",
    admitted: "Jul 1, 2026",
    blood: "AB+",
    diagnosis: "Lumbar discectomy — post-op day 1",
    allergies: ["Codeine"],
    vitalsFlag: "Normal",
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
  {
    name: "Cardiology",
    code: "C",
    beds: 32,
    occupied: 27,
    headNurse: "R. Alvarez",
    floor: "Floor 1",
  },
  {
    name: "Neurology",
    code: "N",
    beds: 24,
    occupied: 17,
    headNurse: "T. Nguyen",
    floor: "Floor 2",
  },
  {
    name: "Pediatrics",
    code: "P",
    beds: 28,
    occupied: 12,
    headNurse: "S. Whitfield",
    floor: "Floor 3",
  },
  {
    name: "Orthopedics",
    code: "T",
    beds: 20,
    occupied: 15,
    headNurse: "J. Barnes",
    floor: "Floor 4",
  },
  {
    name: "Oncology",
    code: "O",
    beds: 18,
    occupied: 16,
    headNurse: "M. Castillo",
    floor: "Floor 2",
  },
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
  photo: string
}

export const staff: StaffMember[] = [
  {
    id: "STF001",
    name: "Dr. Claire Hart",
    initials: "CH",
    bg: "#d9ecff",
    fg: "#2277ce",
    role: "Physician",
    ward: "Cardiology",
    shift: "07:00 – 19:00",
    pager: "4021",
    status: "On duty",
    photo: "/avatars/hart.jpg",
  },
  {
    id: "STF002",
    name: "Dr. Miguel Reyes",
    initials: "MR",
    bg: "#f3e6fb",
    fg: "#8f3bbf",
    role: "Physician",
    ward: "Neurology",
    shift: "07:00 – 19:00",
    pager: "4102",
    status: "On duty",
    photo: "/avatars/reyes.jpg",
  },
  {
    id: "STF003",
    name: "Dr. Nadia Okafor",
    initials: "NO",
    bg: "#e3f6e2",
    fg: "#0d8a08",
    role: "Physician",
    ward: "Pediatrics",
    shift: "09:00 – 17:00",
    pager: "4230",
    status: "On call",
    photo: "/avatars/okafor.jpg",
  },
  {
    id: "STF004",
    name: "Dr. Lena Bauer",
    initials: "LB",
    bg: "#ffeadd",
    fg: "#d85200",
    role: "Surgeon",
    ward: "Orthopedics",
    shift: "06:00 – 14:00",
    pager: "4311",
    status: "On duty",
    photo: "/avatars/bauer.jpg",
  },
  {
    id: "STF005",
    name: "Dr. Arjun Singh",
    initials: "AS",
    bg: "#fdf1d7",
    fg: "#b38625",
    role: "Physician",
    ward: "Oncology",
    shift: "11:00 – 23:00",
    pager: "4415",
    status: "Off duty",
    photo: "/avatars/singh.jpg",
  },
  {
    id: "STF006",
    name: "Rosa Alvarez",
    initials: "RA",
    bg: "#ffe3e3",
    fg: "#c43a3a",
    role: "Nurse",
    ward: "Cardiology",
    shift: "07:00 – 19:00",
    pager: "5120",
    status: "On duty",
    photo: "/avatars/alvarez.jpg",
  },
  {
    id: "STF007",
    name: "Tam Nguyen",
    initials: "TN",
    bg: "#e0f3f6",
    fg: "#137f93",
    role: "Nurse",
    ward: "Neurology",
    shift: "19:00 – 07:00",
    pager: "5217",
    status: "On call",
    photo: "/avatars/nguyen.jpg",
  },
  {
    id: "STF008",
    name: "Sam Whitfield",
    initials: "SW",
    bg: "#eae7fd",
    fg: "#5a4ecc",
    role: "Nurse",
    ward: "Pediatrics",
    shift: "07:00 – 19:00",
    pager: "5304",
    status: "On duty",
    photo: "/avatars/whitfield.jpg",
  },
  {
    id: "STF009",
    name: "Jo Barnes",
    initials: "JB",
    bg: "#e3f6e2",
    fg: "#0d8a08",
    role: "Technician",
    ward: "Orthopedics",
    shift: "08:00 – 16:00",
    pager: "6112",
    status: "Off duty",
    photo: "/avatars/barnes.jpg",
  },
  {
    id: "STF010",
    name: "Mia Castillo",
    initials: "MC",
    bg: "#d9ecff",
    fg: "#2277ce",
    role: "Nurse",
    ward: "Oncology",
    shift: "19:00 – 07:00",
    pager: "5433",
    status: "On duty",
    photo: "/avatars/castillo.jpg",
  },
]

/* ---------------------------- appointments ---------------------------- */

export type AppointmentType =
  | "Consultation"
  | "Surgery"
  | "Check-up"
  | "Imaging"
  | "Therapy"
export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled"

export interface Appointment {
  id: string
  time: string
  /** 0 = Monday … 6 = Sunday */
  day: number
  patient: string
  /** set when the appointment belongs to a tracked inpatient */
  patientId?: string
  doctor: Doctor
  type: AppointmentType
  room: string
  status: AppointmentStatus
}

/** Thursday — the mock "today" used by the Command Center and schedule */
export const todayDayIndex = 3
export const todayLabel = "Thursday, Jul 2"

export const initialAppointments: Appointment[] = [
  {
    id: "APT001",
    time: "08:00",
    day: 0,
    patient: "Alfred White",
    doctor: doctors.hart,
    type: "Check-up",
    room: "C-102",
    status: "Completed",
  },
  {
    id: "APT002",
    time: "09:30",
    day: 0,
    patient: "Priya Raman",
    patientId: "PAT002",
    doctor: doctors.reyes,
    type: "Imaging",
    room: "N-Lab 2",
    status: "Completed",
  },
  {
    id: "APT003",
    time: "11:00",
    day: 0,
    patient: "Emma Lane",
    doctor: doctors.okafor,
    type: "Consultation",
    room: "P-014",
    status: "Completed",
  },
  {
    id: "APT004",
    time: "13:30",
    day: 0,
    patient: "Daniel Kim",
    patientId: "PAT005",
    doctor: doctors.bauer,
    type: "Surgery",
    room: "OR-3",
    status: "Completed",
  },
  {
    id: "APT005",
    time: "16:00",
    day: 0,
    patient: "Margaret Boone",
    patientId: "PAT006",
    doctor: doctors.singh,
    type: "Therapy",
    room: "O-021",
    status: "Cancelled",
  },
  {
    id: "APT006",
    time: "08:30",
    day: 1,
    patient: "Walter Osei",
    patientId: "PAT003",
    doctor: doctors.hart,
    type: "Consultation",
    room: "C-114",
    status: "Completed",
  },
  {
    id: "APT007",
    time: "10:00",
    day: 1,
    patient: "Grace Kent",
    doctor: doctors.reyes,
    type: "Imaging",
    room: "N-Lab 1",
    status: "Completed",
  },
  {
    id: "APT008",
    time: "14:00",
    day: 1,
    patient: "Dave Ross",
    doctor: doctors.bauer,
    type: "Surgery",
    room: "OR-1",
    status: "Completed",
  },
  {
    id: "APT009",
    time: "09:00",
    day: 2,
    patient: "Sofia Marquez",
    patientId: "PAT004",
    doctor: doctors.okafor,
    type: "Check-up",
    room: "P-031",
    status: "Completed",
  },
  {
    id: "APT010",
    time: "11:30",
    day: 2,
    patient: "Frank Delaney",
    patientId: "PAT011",
    doctor: doctors.singh,
    type: "Consultation",
    room: "O-018",
    status: "Completed",
  },
  {
    id: "APT011",
    time: "08:00",
    day: 3,
    patient: "Ernest Gallagher",
    patientId: "PAT014",
    doctor: doctors.hart,
    type: "Imaging",
    room: "C-Lab 1",
    status: "Confirmed",
  },
  {
    id: "APT012",
    time: "09:30",
    day: 3,
    patient: "Margaret Boone",
    patientId: "PAT006",
    doctor: doctors.singh,
    type: "Therapy",
    room: "O-021",
    status: "Confirmed",
  },
  {
    id: "APT013",
    time: "11:00",
    day: 3,
    patient: "Gordon Blake",
    patientId: "PAT009",
    doctor: doctors.reyes,
    type: "Imaging",
    room: "N-Lab 2",
    status: "Pending",
  },
  {
    id: "APT014",
    time: "13:30",
    day: 3,
    patient: "Yara Haddad",
    patientId: "PAT015",
    doctor: doctors.bauer,
    type: "Check-up",
    room: "T-402",
    status: "Confirmed",
  },
  {
    id: "APT015",
    time: "13:30",
    day: 3,
    patient: "Elias Warner",
    patientId: "PAT007",
    doctor: doctors.bauer,
    type: "Surgery",
    room: "OR-3",
    status: "Pending",
  },
  {
    id: "APT016",
    time: "13:30",
    day: 3,
    patient: "Brian Cole",
    doctor: doctors.bauer,
    type: "Surgery",
    room: "OR-3",
    status: "Confirmed",
  },
  {
    id: "APT017",
    time: "16:00",
    day: 3,
    patient: "Alma Rivera",
    patientId: "PAT010",
    doctor: doctors.hart,
    type: "Consultation",
    room: "C-118",
    status: "Pending",
  },
  {
    id: "APT018",
    time: "10:30",
    day: 4,
    patient: "Priya Raman",
    patientId: "PAT002",
    doctor: doctors.reyes,
    type: "Imaging",
    room: "N-Lab 2",
    status: "Pending",
  },
  {
    id: "APT019",
    time: "13:00",
    day: 4,
    patient: "Daniel Kim",
    patientId: "PAT005",
    doctor: doctors.bauer,
    type: "Check-up",
    room: "T-408",
    status: "Confirmed",
  },
  {
    id: "APT020",
    time: "09:30",
    day: 5,
    patient: "Lucy Tran",
    patientId: "PAT012",
    doctor: doctors.okafor,
    type: "Consultation",
    room: "P-027",
    status: "Pending",
  },
  {
    id: "APT021",
    time: "12:00",
    day: 6,
    patient: "Kent Gray",
    doctor: doctors.singh,
    type: "Therapy",
    room: "O-021",
    status: "Pending",
  },
]

export const weekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const

/* ----------------------------- analytics ----------------------------- */

/** average length of stay (days) per week, last 12 weeks */
export const stayTrend: { week: string; days: number }[] = [
  { week: "W14", days: 5.8 },
  { week: "W15", days: 5.2 },
  { week: "W16", days: 5.5 },
  { week: "W17", days: 4.9 },
  { week: "W18", days: 4.6 },
  { week: "W19", days: 5.1 },
  { week: "W20", days: 4.4 },
  { week: "W21", days: 4.2 },
  { week: "W22", days: 4.5 },
  { week: "W23", days: 4.1 },
  { week: "W24", days: 3.9 },
  { week: "W25", days: 4.0 },
]

/* --------------------------- patient charts --------------------------- */

export interface VitalPoint {
  /** reading time over the last 24h, oldest first */
  time: string
  hr: number
  sys: number
  dia: number
  spo2: number
  temp: number
}

export type MedicationStatus = "Active" | "Held" | "Completed"

export interface Medication {
  name: string
  dose: string
  route: string
  freq: string
  started: string
  status: MedicationStatus
}

export type LabFlag = "Normal" | "High" | "Low" | "Critical" | "Pending"

export interface LabResult {
  test: string
  value: string
  ref: string
  flag: LabFlag
  collected: string
}

export interface ClinicalNote {
  author: string
  role: string
  time: string
  text: string
}

export interface ChecklistItem {
  label: string
  done: boolean
}

export interface PatientChart {
  treatmentPlan: string[]
  vitals: VitalPoint[]
  medications: Medication[]
  labs: LabResult[]
  notes: ClinicalNote[]
  discharge: ChecklistItem[]
}

/** deterministic PRNG so mock vitals are stable across server and client */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

const vitalTimes = [
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
  "00:00",
  "03:00",
  "06:00",
]

const vitalBaselines: Record<
  Condition,
  { hr: number; sys: number; dia: number; spo2: number; temp: number }
> = {
  Stable: { hr: 72, sys: 118, dia: 76, spo2: 98, temp: 36.6 },
  Fair: { hr: 84, sys: 126, dia: 80, spo2: 96, temp: 37.1 },
  Serious: { hr: 98, sys: 138, dia: 88, spo2: 94, temp: 37.8 },
  Critical: { hr: 114, sys: 92, dia: 58, spo2: 90, temp: 38.4 },
}

function makeVitals(seed: number, condition: Condition): VitalPoint[] {
  const rand = seeded(seed)
  const base = vitalBaselines[condition]
  const jitter = (range: number) => (rand() - 0.5) * 2 * range
  return vitalTimes.map((time) => ({
    time,
    hr: Math.round(base.hr + jitter(8)),
    sys: Math.round(base.sys + jitter(10)),
    dia: Math.round(base.dia + jitter(6)),
    spo2: Math.min(100, Math.round(base.spo2 + jitter(2))),
    temp: Math.round((base.temp + jitter(0.4)) * 10) / 10,
  }))
}

const wardMedications: Record<Ward, Medication[]> = {
  Cardiology: [
    { name: "Metoprolol", dose: "25 mg", route: "PO", freq: "BID", started: "Jun 2", status: "Active" },
    { name: "Atorvastatin", dose: "80 mg", route: "PO", freq: "Nightly", started: "Jun 2", status: "Active" },
    { name: "Heparin", dose: "5,000 U", route: "SC", freq: "q8h", started: "Jun 3", status: "Active" },
  ],
  Neurology: [
    { name: "Levetiracetam", dose: "500 mg", route: "IV", freq: "BID", started: "Jun 4", status: "Active" },
    { name: "Aspirin", dose: "81 mg", route: "PO", freq: "Daily", started: "Jun 4", status: "Active" },
    { name: "Atorvastatin", dose: "40 mg", route: "PO", freq: "Nightly", started: "Jun 5", status: "Active" },
  ],
  Pediatrics: [
    { name: "Amoxicillin", dose: "250 mg", route: "PO", freq: "TID", started: "Jun 9", status: "Active" },
    { name: "Albuterol", dose: "2.5 mg", route: "Neb", freq: "q4h PRN", started: "Jun 9", status: "Active" },
    { name: "Acetaminophen", dose: "160 mg", route: "PO", freq: "q6h PRN", started: "Jun 9", status: "Active" },
  ],
  Orthopedics: [
    { name: "Enoxaparin", dose: "40 mg", route: "SC", freq: "Daily", started: "Jun 11", status: "Active" },
    { name: "Oxycodone", dose: "5 mg", route: "PO", freq: "q6h PRN", started: "Jun 11", status: "Active" },
    { name: "Docusate", dose: "100 mg", route: "PO", freq: "BID", started: "Jun 12", status: "Active" },
  ],
  Oncology: [
    { name: "Cytarabine", dose: "170 mg", route: "IV", freq: "q12h", started: "Jun 13", status: "Active" },
    { name: "Ondansetron", dose: "8 mg", route: "IV", freq: "q8h", started: "Jun 13", status: "Active" },
    { name: "Allopurinol", dose: "300 mg", route: "PO", freq: "Daily", started: "Jun 12", status: "Active" },
  ],
}

const wardLabs: Record<Ward, LabResult[]> = {
  Cardiology: [
    { test: "Troponin I", value: "0.03 ng/mL", ref: "< 0.04", flag: "Normal", collected: "Jul 2 06:10" },
    { test: "BNP", value: "410 pg/mL", ref: "< 100", flag: "High", collected: "Jul 2 06:10" },
    { test: "Potassium", value: "4.1 mmol/L", ref: "3.5 – 5.0", flag: "Normal", collected: "Jul 2 06:10" },
    { test: "Creatinine", value: "1.1 mg/dL", ref: "0.6 – 1.2", flag: "Normal", collected: "Jul 1 18:20" },
  ],
  Neurology: [
    { test: "Levetiracetam level", value: "22 µg/mL", ref: "12 – 46", flag: "Normal", collected: "Jul 2 05:45" },
    { test: "Sodium", value: "137 mmol/L", ref: "135 – 145", flag: "Normal", collected: "Jul 2 05:45" },
    { test: "Glucose", value: "108 mg/dL", ref: "70 – 110", flag: "Normal", collected: "Jul 1 17:30" },
    { test: "CT head (repeat)", value: "—", ref: "read pending", flag: "Pending", collected: "Jul 2 08:00" },
  ],
  Pediatrics: [
    { test: "WBC", value: "9.8 ×10⁹/L", ref: "4.5 – 13.5", flag: "Normal", collected: "Jul 2 06:30" },
    { test: "CRP", value: "18 mg/L", ref: "< 10", flag: "High", collected: "Jul 2 06:30" },
    { test: "Blood culture", value: "—", ref: "48h read", flag: "Pending", collected: "Jul 1 12:00" },
  ],
  Orthopedics: [
    { test: "Hemoglobin", value: "11.2 g/dL", ref: "13.5 – 17.5", flag: "Low", collected: "Jul 2 06:00" },
    { test: "INR", value: "1.1", ref: "0.8 – 1.2", flag: "Normal", collected: "Jul 2 06:00" },
    { test: "X-ray (post-op)", value: "—", ref: "read pending", flag: "Pending", collected: "Jul 2 07:40" },
  ],
  Oncology: [
    { test: "ANC", value: "0.4 ×10⁹/L", ref: "> 1.5", flag: "Critical", collected: "Jul 2 05:30" },
    { test: "Platelets", value: "38 ×10⁹/L", ref: "150 – 400", flag: "Low", collected: "Jul 2 05:30" },
    { test: "Hemoglobin", value: "8.9 g/dL", ref: "12 – 16", flag: "Low", collected: "Jul 2 05:30" },
    { test: "Blood culture", value: "—", ref: "48h read", flag: "Pending", collected: "Jul 2 04:15" },
  ],
}

const dischargeChecklist = [
  "Medications reconciled",
  "Follow-up appointment booked",
  "Patient education completed",
  "Discharge summary signed",
  "Pharmacy scripts sent",
  "Transport arranged",
]

const dischargeDoneByCondition: Record<Condition, number> = {
  Stable: 4,
  Fair: 2,
  Serious: 1,
  Critical: 0,
}

function makeChart(patient: Patient, index: number): PatientChart {
  const nurse = staff.find(
    (s) => s.ward === patient.ward && s.role === "Nurse"
  )
  const doneCount =
    patient.status === "Discharged"
      ? dischargeChecklist.length
      : dischargeDoneByCondition[patient.condition]
  return {
    treatmentPlan: [
      `Continue management of ${patient.diagnosis.split("—")[0].trim()}`,
      "Vitals per protocol; escalate on early-warning score ≥ 5",
      "Daily attending review and multidisciplinary rounds",
    ],
    vitals: makeVitals(index + 7, patient.condition),
    medications: wardMedications[patient.ward],
    labs: wardLabs[patient.ward],
    notes: [
      {
        author: patient.doctor.name,
        role: "Attending",
        time: "Jul 2, 08:10",
        text: `${patient.name} reviewed on morning rounds. ${patient.condition === "Stable" ? "Progressing well; continue current plan and reassess for discharge planning." : patient.condition === "Fair" ? "Improving slowly; continue current therapy and re-evaluate this evening." : "Condition requires close monitoring; thresholds for escalation discussed with nursing."}`,
      },
      {
        author: nurse?.name ?? "Ward nurse",
        role: "Nurse",
        time: "Jul 2, 06:30",
        text: `Overnight: ${patient.condition === "Critical" ? "frequent observations maintained, medical team updated twice." : "slept adequately, observations within expected range."} Pain managed. ${patient.allergies.length > 0 ? `Allergy band on (${patient.allergies.join(", ")}).` : "No allergies recorded."}`,
      },
    ],
    discharge: dischargeChecklist.map((label, i) => ({
      label,
      done: i < doneCount,
    })),
  }
}

const chartOverrides: Record<string, Partial<PatientChart>> = {
  PAT006: {
    treatmentPlan: [
      "Broad-spectrum antibiotics for neutropenic sepsis (day 2 of 7)",
      "Continue AML induction — cytarabine q12h, monitor counts daily",
      "Strict isolation precautions; transfuse platelets below 20",
    ],
    notes: [
      {
        author: "Dr. Singh",
        role: "Attending",
        time: "Jul 2, 07:50",
        text: "Margaret Boone febrile overnight (38.6 °C) with ANC 0.4. Blood cultures re-drawn, meropenem started. Hemodynamically borderline — reassess at midday, low threshold for ICU consult.",
      },
      {
        author: "Mia Castillo",
        role: "Nurse",
        time: "Jul 2, 04:20",
        text: "Temp spike to 38.6 °C at 04:00, rigors observed. Cultures drawn from PICC and periphery per sepsis protocol. Dr. Singh notified.",
      },
    ],
  },
  PAT014: {
    treatmentPlan: [
      "Cardiogenic shock — titrate dobutamine to MAP ≥ 65",
      "Daily weights, strict fluid balance, repeat echo today",
      "Cardiology/ICU joint review — candidate for advanced support if no improvement",
    ],
    notes: [
      {
        author: "Dr. Hart",
        role: "Attending",
        time: "Jul 2, 07:30",
        text: "Ernest Gallagher remains on inotrope support. SpO₂ dipping to 88% on 6L overnight — echo booked for this morning, ICU aware. Family updated at bedside.",
      },
      {
        author: "Rosa Alvarez",
        role: "Nurse",
        time: "Jul 2, 05:15",
        text: "Increasing oxygen requirement through the night (2L → 6L). Urine output borderline. Continuous monitoring; escalation criteria reviewed with night registrar.",
      },
    ],
  },
}

export const patientCharts: Record<string, PatientChart> = Object.fromEntries(
  patients.map((patient, index) => [
    patient.id,
    { ...makeChart(patient, index), ...chartOverrides[patient.id] },
  ])
)

/* ------------------------------- alerts ------------------------------- */

export type AlertSeverity = "Critical" | "Warning" | "Info"

export interface HospitalAlert {
  id: string
  severity: AlertSeverity
  title: string
  detail: string
  patientId?: string
  owner: string
  due: string
  action: string
}

export const initialAlerts: HospitalAlert[] = [
  {
    id: "ALR001",
    severity: "Critical",
    title: "Critical vitals — Ernest Gallagher",
    detail: "SpO₂ 88% on 6L, MAP trending down. Echo booked, ICU aware.",
    patientId: "PAT014",
    owner: "Dr. Hart",
    due: "Now",
    action: "Review vitals",
  },
  {
    id: "ALR002",
    severity: "Critical",
    title: "Neutropenic fever — Margaret Boone",
    detail: "38.6 °C with ANC 0.4. Cultures re-drawn, meropenem started 04:30.",
    patientId: "PAT006",
    owner: "Dr. Singh",
    due: "Now",
    action: "Acknowledge",
  },
  {
    id: "ALR003",
    severity: "Warning",
    title: "Medication due — cytarabine (PAT006)",
    detail: "Next q12h dose of induction chemo due. Verify counts before giving.",
    patientId: "PAT006",
    owner: "M. Castillo",
    due: "13:00",
    action: "Give dose",
  },
  {
    id: "ALR004",
    severity: "Warning",
    title: "OR-3 double-booked at 13:30",
    detail: "Elias Warner (pending) and Brian Cole (confirmed) both scheduled.",
    owner: "OR scheduling",
    due: "12:00",
    action: "Resolve conflict",
  },
  {
    id: "ALR005",
    severity: "Warning",
    title: "Lab overdue — repeat CT head (PAT009)",
    detail: "Ordered 08:00, radiology read still pending past target turnaround.",
    patientId: "PAT009",
    owner: "Dr. Reyes",
    due: "14:00",
    action: "Chase result",
  },
  {
    id: "ALR006",
    severity: "Warning",
    title: "Oncology near capacity",
    detail: "16 of 18 beds occupied. One clean pending, no isolation beds free.",
    owner: "Bed management",
    due: "17:00",
    action: "Review transfers",
  },
  {
    id: "ALR007",
    severity: "Info",
    title: "Bed cleaning pending — C-104",
    detail: "Terminal clean requested after discharge; ETA 45 min.",
    owner: "Housekeeping",
    due: "15:00",
    action: "Mark ready",
  },
  {
    id: "ALR008",
    severity: "Info",
    title: "Discharge paperwork — Nina Petrova",
    detail: "Summary signed; pharmacy scripts and transport still outstanding.",
    patientId: "PAT008",
    owner: "S. Whitfield",
    due: "16:00",
    action: "Complete forms",
  },
]

/* ------------------------------- tasks ------------------------------- */

export type TaskCategory =
  | "Vitals check"
  | "Medication"
  | "Lab follow-up"
  | "Discharge"
  | "Housekeeping"
  | "Scheduling"

export type TaskPriority = "High" | "Medium" | "Low"

export interface CareTask {
  id: string
  title: string
  patientId?: string
  category: TaskCategory
  owner: string
  due: string
  priority: TaskPriority
  done: boolean
}

export const initialTasks: CareTask[] = [
  {
    id: "TSK001",
    title: "Hourly vitals + fluid balance — Ernest Gallagher",
    patientId: "PAT014",
    category: "Vitals check",
    owner: "R. Alvarez",
    due: "Hourly",
    priority: "High",
    done: false,
  },
  {
    id: "TSK002",
    title: "Give cytarabine q12h dose (verify counts first)",
    patientId: "PAT006",
    category: "Medication",
    owner: "M. Castillo",
    due: "13:00",
    priority: "High",
    done: false,
  },
  {
    id: "TSK003",
    title: "Chase radiology read — repeat CT head",
    patientId: "PAT009",
    category: "Lab follow-up",
    owner: "Dr. Reyes",
    due: "14:00",
    priority: "High",
    done: false,
  },
  {
    id: "TSK004",
    title: "Resolve OR-3 double-booking at 13:30",
    category: "Scheduling",
    owner: "OR scheduling",
    due: "12:00",
    priority: "High",
    done: false,
  },
  {
    id: "TSK005",
    title: "Pharmacy scripts + transport — Nina Petrova discharge",
    patientId: "PAT008",
    category: "Discharge",
    owner: "S. Whitfield",
    due: "16:00",
    priority: "Medium",
    done: false,
  },
  {
    id: "TSK006",
    title: "Daily weight + strict fluid chart — Alma Rivera",
    patientId: "PAT010",
    category: "Vitals check",
    owner: "R. Alvarez",
    due: "11:00",
    priority: "Medium",
    done: false,
  },
  {
    id: "TSK007",
    title: "Review blood culture at 48h — Sofia Marquez",
    patientId: "PAT004",
    category: "Lab follow-up",
    owner: "Dr. Okafor",
    due: "15:00",
    priority: "Medium",
    done: false,
  },
  {
    id: "TSK008",
    title: "Terminal clean room C-104",
    category: "Housekeeping",
    owner: "Housekeeping",
    due: "15:00",
    priority: "Low",
    done: false,
  },
  {
    id: "TSK009",
    title: "Confirm Friday imaging slot — Priya Raman",
    patientId: "PAT002",
    category: "Scheduling",
    owner: "Radiology desk",
    due: "17:00",
    priority: "Low",
    done: false,
  },
  {
    id: "TSK010",
    title: "Crutch training before discharge — Daniel Kim",
    patientId: "PAT005",
    category: "Discharge",
    owner: "J. Barnes",
    due: "14:30",
    priority: "Medium",
    done: false,
  },
  {
    id: "TSK011",
    title: "Morning medication round — Pediatrics",
    category: "Medication",
    owner: "S. Whitfield",
    due: "08:00",
    priority: "Medium",
    done: true,
  },
  {
    id: "TSK012",
    title: "Post-op obs set — Yara Haddad",
    patientId: "PAT015",
    category: "Vitals check",
    owner: "J. Barnes",
    due: "09:00",
    priority: "Medium",
    done: true,
  },
]

/* ---------------------------- activity log ---------------------------- */

export type ActivityType =
  | "admission"
  | "discharge"
  | "transfer"
  | "lab"
  | "medication"
  | "appointment"
  | "alert"

export interface ActivityEvent {
  id: string
  time: string
  type: ActivityType
  text: string
  actor: string
}

/** most recent first */
export const activityLog: ActivityEvent[] = [
  {
    id: "ACT001",
    time: "09:42",
    type: "lab",
    text: "ANC 0.4 resulted for Margaret Boone (PAT006) — flagged critical",
    actor: "Core lab",
  },
  {
    id: "ACT002",
    time: "09:15",
    type: "appointment",
    text: "Imaging confirmed for Ernest Gallagher (PAT014) — bedside echo",
    actor: "Radiology",
  },
  {
    id: "ACT003",
    time: "08:50",
    type: "medication",
    text: "Meropenem first dose administered to Margaret Boone (PAT006)",
    actor: "M. Castillo",
  },
  {
    id: "ACT004",
    time: "08:30",
    type: "transfer",
    text: "Walter Osei (PAT003) moved C-110 → C-114 for telemetry",
    actor: "R. Alvarez",
  },
  {
    id: "ACT005",
    time: "08:05",
    type: "admission",
    text: "Yara Haddad (PAT015) admitted to Orthopedics, T-402 bed 1",
    actor: "Dr. Bauer",
  },
  {
    id: "ACT006",
    time: "07:45",
    type: "alert",
    text: "Early-warning score 6 for Ernest Gallagher (PAT014) — team paged",
    actor: "Monitoring",
  },
  {
    id: "ACT007",
    time: "07:20",
    type: "discharge",
    text: "Nina Petrova (PAT008) discharge started — paperwork in progress",
    actor: "S. Whitfield",
  },
  {
    id: "ACT008",
    time: "07:00",
    type: "medication",
    text: "Morning medication round completed on Pediatrics",
    actor: "S. Whitfield",
  },
  {
    id: "ACT009",
    time: "06:40",
    type: "lab",
    text: "Morning bloods collected across Cardiology and Oncology",
    actor: "Phlebotomy",
  },
  {
    id: "ACT010",
    time: "06:15",
    type: "appointment",
    text: "OR-3 conflict detected at 13:30 — two procedures booked",
    actor: "Scheduling",
  },
]
