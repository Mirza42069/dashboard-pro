"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  ActivityIcon,
  Alert01Icon,
  Alert02Icon,
  ArrowUpDownIcon,
  BedSingle01Icon,
  BloodTypeIcon,
  Building03Icon,
  CalendarCheckIn01Icon,
  Cancel01Icon,
  Delete02Icon,
  HashtagIcon,
  HeartPulseIcon,
  InsertColumnRightIcon,
  Logout03Icon,
  MoreVerticalIcon,
  Note01Icon,
  PlusSignIcon,
  PulseRectangle01Icon,
  StethoscopeIcon,
  Task01Icon,
} from "@hugeicons/core-free-icons"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { type Patient, type VitalsFlag } from "@/lib/hospital-data"
import { ConditionChip, StatusPill, WardChip } from "./chips"
import { useHospital } from "./hospital-provider"
import { type ColumnKey } from "./view-toolbar"

function HeadLabel({
  icon,
  children,
}: {
  icon?: IconSvgElement
  children: React.ReactNode
}) {
  return (
    <span className="flex items-center gap-1.5">
      {icon && (
        <HugeiconsIcon
          icon={icon}
          className="size-3.5 text-[#808080]"
          strokeWidth={1.8}
        />
      )}
      <span className="text-xs leading-none font-semibold text-black">
        {children}
      </span>
    </span>
  )
}

const headCell =
  "h-9 border-r-[0.5px] border-[#e8e8e8] bg-[#f7f7f9] px-3 last:border-r-0"
const bodyCellBase =
  "border-r-[0.5px] border-[#e8e8e8] px-3 py-0 last:border-r-0"

const columnHeaders: {
  key: ColumnKey
  label: string
  icon: IconSvgElement
  width: string
}[] = [
  { key: "ward", label: "Ward", icon: Building03Icon, width: "w-[125px]" },
  {
    key: "attending",
    label: "Attending",
    icon: StethoscopeIcon,
    width: "w-[130px]",
  },
  {
    key: "diagnosis",
    label: "Diagnosis",
    icon: Note01Icon,
    width: "min-w-[190px]",
  },
  { key: "status", label: "Status", icon: HeartPulseIcon, width: "w-[115px]" },
  {
    key: "condition",
    label: "Condition",
    icon: PulseRectangle01Icon,
    width: "w-[100px]",
  },
  { key: "vitals", label: "Vitals", icon: ActivityIcon, width: "w-[95px]" },
  {
    key: "allergies",
    label: "Allergies",
    icon: Alert01Icon,
    width: "w-[110px]",
  },
  { key: "tasks", label: "Tasks", icon: Task01Icon, width: "w-[75px]" },
  { key: "age", label: "Age", icon: HashtagIcon, width: "w-[70px]" },
  { key: "blood", label: "Blood", icon: BloodTypeIcon, width: "w-[80px]" },
  {
    key: "location",
    label: "Location",
    icon: BedSingle01Icon,
    width: "w-[105px]",
  },
  {
    key: "admitted",
    label: "Admitted",
    icon: CalendarCheckIn01Icon,
    width: "w-[110px]",
  },
]

const vitalsFlagStyles: Record<VitalsFlag, { pill: string; dot: string }> = {
  Normal: { pill: "bg-[#05a400]/15 text-[#009638]", dot: "#05a400" },
  Watch: { pill: "bg-[#b38625]/15 text-[#b38625]", dot: "#d19d2c" },
  Abnormal: { pill: "bg-[#a40000]/15 text-[#960000]", dot: "#e01e1e" },
}

export function PatientsTable({
  rows,
  totalCount,
  hiddenColumns,
  sortByIdToggle,
  onAdd,
}: {
  rows: Patient[]
  totalCount: number
  hiddenColumns: ColumnKey[]
  sortByIdToggle: () => void
  onAdd: () => void
}) {
  const { dischargePatients, readmitPatient, deletePatients, tasks } =
    useHospital()
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [pendingDelete, setPendingDelete] = React.useState<string[]>([])
  const [pendingDischarge, setPendingDischarge] = React.useState<string[]>([])

  const visible = (key: ColumnKey) => !hiddenColumns.includes(key)
  const visibleColumnCount =
    2 + columnHeaders.filter((c) => visible(c.key)).length

  const rowIds = rows.map((r) => r.id)
  const selectedInView = rowIds.filter((id) => selected.has(id))
  const allSelected = rows.length > 0 && selectedInView.length === rows.length

  function toggleRow(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function clearSelection() {
    setSelected(new Set())
  }

  function confirmDelete() {
    deletePatients(pendingDelete)
    setSelected((prev) => {
      const next = new Set(prev)
      pendingDelete.forEach((id) => next.delete(id))
      return next
    })
    setPendingDelete([])
  }

  function confirmDischarge() {
    dischargePatients(pendingDischarge)
    setSelected((prev) => {
      const next = new Set(prev)
      pendingDischarge.forEach((id) => next.delete(id))
      return next
    })
    setPendingDischarge([])
  }

  return (
    <>
      <div className="overflow-x-auto rounded-t-[8px] border border-b-0 border-[#e5e5e9] bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
        <Table className="min-w-[1240px] caption-bottom">
          <TableHeader>
            <TableRow className="border-b-[0.5px] border-[#e8e8e8] hover:bg-transparent">
              <TableHead className={cn(headCell, "w-[210px]")}>
                <span className="flex items-center gap-3">
                  <Checkbox
                    aria-label="Select all patients"
                    checked={allSelected}
                    onCheckedChange={(checked) =>
                      setSelected(checked ? new Set(rowIds) : new Set())
                    }
                    className="border-[#e8e8e8] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]"
                  />
                  <span className="text-xs leading-none font-semibold text-black">
                    Patients
                  </span>
                  <button
                    type="button"
                    aria-label="Toggle sort by patient ID"
                    onClick={sortByIdToggle}
                    className="text-[#808080] transition-colors hover:text-black"
                  >
                    <HugeiconsIcon
                      icon={ArrowUpDownIcon}
                      className="size-3"
                      strokeWidth={2}
                    />
                  </button>
                </span>
              </TableHead>
              {columnHeaders
                .filter((c) => visible(c.key))
                .map((col) => (
                  <TableHead key={col.key} className={cn(headCell, col.width)}>
                    <HeadLabel icon={col.icon}>{col.label}</HeadLabel>
                  </TableHead>
                ))}
              <TableHead className={cn(headCell, "w-[60px]")}>
                <span className="flex items-center justify-end gap-1.5 text-[#808080]">
                  <button
                    type="button"
                    aria-label="Add column"
                    onClick={() => toast.info("Custom columns coming soon")}
                    className="transition-colors hover:text-black"
                  >
                    <HugeiconsIcon
                      icon={InsertColumnRightIcon}
                      className="size-4"
                      strokeWidth={1.8}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="Table options"
                    onClick={() =>
                      toast.info(
                        "Use the toolbar to sort, filter, and hide columns"
                      )
                    }
                    className="transition-colors hover:text-black"
                  >
                    <HugeiconsIcon
                      icon={MoreVerticalIcon}
                      className="size-4"
                      strokeWidth={1.8}
                    />
                  </button>
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((patient) => (
              <PatientRow
                key={patient.id}
                patient={patient}
                visible={visible}
                openTasks={
                  tasks.filter((t) => t.patientId === patient.id && !t.done)
                    .length
                }
                selected={selected.has(patient.id)}
                onSelect={(checked) => toggleRow(patient.id, checked)}
                onDischarge={() => setPendingDischarge([patient.id])}
                onReadmit={() => readmitPatient(patient.id)}
                onDelete={() => setPendingDelete([patient.id])}
              />
            ))}
            {rows.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={visibleColumnCount}
                  className="h-24 text-center text-xs font-medium text-[#808080]"
                >
                  No patients match the current view or filters.
                </TableCell>
              </TableRow>
            )}
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={visibleColumnCount}
                className={cn(bodyCellBase, "h-9 border-r-0")}
              >
                <button
                  type="button"
                  onClick={onAdd}
                  className="flex items-center gap-2 text-xs leading-none font-medium text-[#808080] transition-colors hover:text-black"
                >
                  <HugeiconsIcon
                    icon={PlusSignIcon}
                    className="size-3.5"
                    strokeWidth={2}
                  />
                  New patient
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="mt-2 text-xs leading-none font-medium text-[#808080]">
        {rows.length} of {totalCount} records
      </p>

      <AlertDialog
        open={pendingDelete.length > 0}
        onOpenChange={(open) => {
          if (!open) setPendingDelete([])
        }}
      >
        <AlertDialogContent size="sm" className="rounded-[8px] border-[#e8e8e8]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingDelete.length === 1
                ? `Delete record ${pendingDelete[0]}?`
                : `Delete ${pendingDelete.length} patient records?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes{" "}
              {pendingDelete.length === 1
                ? "this patient record"
                : "these patient records"}{" "}
              from the database. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={pendingDischarge.length > 0}
        onOpenChange={(open) => {
          if (!open) setPendingDischarge([])
        }}
      >
        <AlertDialogContent size="sm" className="rounded-[8px] border-[#e8e8e8]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingDischarge.length === 1
                ? `Discharge ${pendingDischarge[0]}?`
                : `Discharge ${pendingDischarge.length} patients?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Confirm the discharge workflow is ready before changing patient status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDischarge}>
              Confirm discharge
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {selectedInView.length > 0 && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-[8px] bg-[#222]/95 py-1.5 pr-1.5 pl-3.5 shadow-[0px_16px_40px_0px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <span className="mr-1 text-[11px] leading-none font-semibold text-white">
              {selectedInView.length} selected
            </span>
            <button
              type="button"
              onClick={() => {
                setPendingDischarge(selectedInView)
              }}
              className="flex items-center gap-1.5 rounded-[5px] px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#c9c9c9] transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
            >
              <HugeiconsIcon
                icon={Logout03Icon}
                className="size-3.5"
                strokeWidth={2}
              />
              Discharge
            </button>
            <button
              type="button"
              onClick={() => setPendingDelete(selectedInView)}
              className="flex items-center gap-1.5 rounded-[5px] px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#ff9d9d] transition-colors hover:bg-white/10 hover:text-[#ffbcbc] focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
            >
              <HugeiconsIcon
                icon={Delete02Icon}
                className="size-3.5"
                strokeWidth={2}
              />
              Delete
            </button>
            <button
              type="button"
              aria-label="Clear selection"
              onClick={clearSelection}
              className="flex items-center rounded-full p-1.5 text-[#c9c9c9] transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
            >
              <HugeiconsIcon
                icon={Cancel01Icon}
                className="size-3.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function PatientRow({
  patient,
  visible,
  openTasks,
  selected,
  onSelect,
  onDischarge,
  onReadmit,
  onDelete,
}: {
  patient: Patient
  visible: (key: ColumnKey) => boolean
  openTasks: number
  selected: boolean
  onSelect: (checked: boolean) => void
  onDischarge: () => void
  onReadmit: () => void
  onDelete: () => void
}) {
  const discharged = patient.status === "Discharged"
  const bodyCell = cn(bodyCellBase, "h-10")

  return (
    <TableRow
      data-state={selected ? "selected" : undefined}
      className={cn(
        "group/row border-b-[0.5px] border-[#e8e8e8] hover:bg-[#f7f7f9] data-[state=selected]:bg-[#f7faff]",
        discharged && "bg-[#f7f7f9]"
      )}
    >
      <TableCell className={bodyCell}>
        <span
          className={cn("flex items-center gap-3", discharged && "opacity-50")}
        >
          <Checkbox
            aria-label={`Select ${patient.name} (${patient.id})`}
            checked={selected}
            onCheckedChange={(checked) => onSelect(checked === true)}
            className="border-[#e8e8e8] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]"
          />
          <Link
            href={`/patients/${patient.id}`}
            className="flex min-w-0 flex-col gap-1 rounded-[4px] focus-visible:ring-2 focus-visible:ring-[#797bff]/50 focus-visible:outline-none"
          >
            <span className="truncate text-xs leading-none font-semibold text-[#222] underline-offset-2 hover:underline">
              {patient.name}
            </span>
            <span className="text-[10px] leading-none text-[#808080]">
              {patient.mrn}
            </span>
          </Link>
        </span>
      </TableCell>
      {visible("ward") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <WardChip ward={patient.ward} />
        </TableCell>
      )}
      {visible("attending") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span className="flex items-center gap-2">
            <Avatar className="size-[22px] after:border-black/5">
              <AvatarImage
                src={patient.doctor.photo}
                alt={patient.doctor.name}
              />
              <AvatarFallback
                className="text-[9px] font-semibold"
                style={{
                  backgroundColor: patient.doctor.bg,
                  color: patient.doctor.fg,
                }}
              >
                {patient.doctor.initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs leading-none font-medium text-[#222]">
              {patient.doctor.name}
            </span>
          </span>
        </TableCell>
      )}
      {visible("diagnosis") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span
            title={patient.diagnosis}
            className="block max-w-[230px] truncate text-xs leading-none font-medium text-[#222]"
          >
            {patient.diagnosis}
          </span>
        </TableCell>
      )}
      {visible("status") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <StatusPill status={patient.status} />
        </TableCell>
      )}
      {visible("condition") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <ConditionChip condition={patient.condition} />
        </TableCell>
      )}
      {visible("vitals") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-[5px] px-2 py-[5px] text-[10px] leading-none font-semibold",
              vitalsFlagStyles[patient.vitalsFlag].pill
            )}
          >
            <span
              className="size-1.5 rounded-full"
              style={{
                backgroundColor: vitalsFlagStyles[patient.vitalsFlag].dot,
              }}
            />
            {patient.vitalsFlag}
          </span>
        </TableCell>
      )}
      {visible("allergies") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          {patient.allergies.length === 0 ? (
            <span className="text-xs leading-none font-medium text-[#808080]">
              None
            </span>
          ) : (
            <span
              title={patient.allergies.join(", ")}
              className="inline-flex max-w-[100px] items-center gap-1 text-xs leading-none font-semibold text-[#960000]"
            >
              <HugeiconsIcon
                icon={Alert02Icon}
                className="size-3 shrink-0"
                strokeWidth={2.5}
              />
              <span className="truncate">
                {patient.allergies[0]}
                {patient.allergies.length > 1 &&
                  ` +${patient.allergies.length - 1}`}
              </span>
            </span>
          )}
        </TableCell>
      )}
      {visible("tasks") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          {openTasks > 0 ? (
            <span className="inline-flex items-center rounded-[5px] bg-[#b38625]/15 px-2 py-[5px] text-[10px] leading-none font-semibold text-[#b38625]">
              {openTasks} due
            </span>
          ) : (
            <span className="text-xs leading-none font-medium text-[#808080]">
              —
            </span>
          )}
        </TableCell>
      )}
      {visible("age") && (
        <TableCell
          className={cn(bodyCell, "text-right", discharged && "opacity-50")}
        >
          <span className="text-sm font-medium leading-none text-[#222]">
            {patient.age}
          </span>
        </TableCell>
      )}
      {visible("blood") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span className="text-xs font-medium leading-none text-[#222]">
            {patient.blood}
          </span>
        </TableCell>
      )}
      {visible("location") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span className="text-xs leading-none font-medium whitespace-nowrap text-[#222]">
            {patient.room} · {patient.bed}
          </span>
        </TableCell>
      )}
      {visible("admitted") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span className="text-xs leading-none font-medium text-[#222]">
            {patient.admitted}
          </span>
        </TableCell>
      )}
      <TableCell className={bodyCell}>
        <span className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`Actions for ${patient.id}`}
                className="rounded-[4px] text-[#808080] opacity-0 transition-opacity group-hover/row:opacity-100 hover:text-black focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[#797bff]/50 focus-visible:outline-none data-[state=open]:opacity-100"
              >
                <HugeiconsIcon
                  icon={MoreVerticalIcon}
                  className="size-4"
                  strokeWidth={1.8}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={4}
              className="w-40 rounded-[7px] border-[#e8e8e8]"
            >
              {discharged ? (
                <DropdownMenuItem className="text-xs" onClick={onReadmit}>
                  <HugeiconsIcon
                    icon={HeartPulseIcon}
                    className="size-3.5"
                    strokeWidth={2}
                  />
                  Readmit
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="text-xs" onClick={onDischarge}>
                  <HugeiconsIcon
                    icon={Logout03Icon}
                    className="size-3.5"
                    strokeWidth={2}
                  />
                  Discharge
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="text-xs"
                onClick={onDelete}
              >
                <HugeiconsIcon
                  icon={Delete02Icon}
                  className="size-3.5"
                  strokeWidth={2}
                />
                Delete record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </TableCell>
    </TableRow>
  )
}
