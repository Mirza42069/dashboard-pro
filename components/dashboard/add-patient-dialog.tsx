"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  doctors,
  wards,
  type Condition,
  type Patient,
  type Ward,
} from "@/lib/hospital-data"
import { useHospital } from "./hospital-provider"

const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
const conditions: Condition[] = ["Stable", "Fair", "Serious", "Critical"]
const doctorList = Object.values(doctors)

const fieldLabel = "text-[11px] leading-none font-semibold text-[#222]"
const fieldInput =
  "h-8 w-full rounded-[6px] border-[#e8e8e8] text-xs font-medium text-[#222] placeholder:text-[#808080]"

export function AddPatientDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { patients, addPatient } = useHospital()
  const [ward, setWard] = React.useState<Ward>("Cardiology")
  const [doctor, setDoctor] = React.useState(doctorList[0].name)
  const [condition, setCondition] = React.useState<Condition>("Stable")
  const [blood, setBlood] = React.useState("O+")
  const [age, setAge] = React.useState("")
  const [room, setRoom] = React.useState("")

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const nextNumber = patients.reduce((max, p) => {
      const n = Number(p.id.replace("PAT", ""))
      return Number.isNaN(n) ? max : Math.max(max, n)
    }, 0)
    const wardInfo = wards.find((w) => w.name === ward)
    const patient: Patient = {
      id: `PAT${String(nextNumber + 1).padStart(3, "0")}`,
      ward,
      doctor: doctorList.find((d) => d.name === doctor) ?? doctorList[0],
      status: "Admitted",
      age: Math.max(0, Number(age) || 0),
      condition,
      room: room.trim() || `${wardInfo?.code ?? "C"}-${100 + Math.floor(Math.random() * 300)}`,
      admitted: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      blood,
    }
    addPatient(patient)
    onOpenChange(false)
    setAge("")
    setRoom("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] rounded-[12px] border-[#e8e8e8] p-0">
        <form onSubmit={submit}>
          <DialogHeader className="border-b border-[#e8e8e8] px-4 py-3.5">
            <DialogTitle className="text-sm font-semibold text-black">
              Admit new patient
            </DialogTitle>
            <DialogDescription className="text-xs font-medium text-[#808080]">
              A record ID and admission date are assigned automatically.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3.5 px-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label className={fieldLabel}>Ward</Label>
              <Select value={ward} onValueChange={(v) => setWard(v as Ward)}>
                <SelectTrigger size="sm" className={fieldInput}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[10px] border-[#e8e8e8]">
                  {wards.map((w) => (
                    <SelectItem key={w.name} value={w.name} className="text-xs">
                      {w.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className={fieldLabel}>Attending</Label>
              <Select value={doctor} onValueChange={setDoctor}>
                <SelectTrigger size="sm" className={fieldInput}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[10px] border-[#e8e8e8]">
                  {doctorList.map((d) => (
                    <SelectItem key={d.name} value={d.name} className="text-xs">
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="patient-age" className={fieldLabel}>
                Age
              </Label>
              <Input
                id="patient-age"
                type="number"
                min={0}
                max={120}
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="42"
                className={fieldInput}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className={fieldLabel}>Blood type</Label>
              <Select value={blood} onValueChange={setBlood}>
                <SelectTrigger size="sm" className={fieldInput}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[10px] border-[#e8e8e8]">
                  {bloodTypes.map((b) => (
                    <SelectItem key={b} value={b} className="font-mono text-xs">
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className={fieldLabel}>Condition</Label>
              <Select value={condition} onValueChange={(v) => setCondition(v as Condition)}>
                <SelectTrigger size="sm" className={fieldInput}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-[10px] border-[#e8e8e8]">
                  {conditions.map((c) => (
                    <SelectItem key={c} value={c} className="text-xs">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="patient-room" className={fieldLabel}>
                Room <span className="font-medium text-[#808080]">(optional)</span>
              </Label>
              <Input
                id="patient-room"
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
              Admit patient
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
