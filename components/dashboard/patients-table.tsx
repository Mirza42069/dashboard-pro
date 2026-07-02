"use client"

import * as React from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
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
  PlusSignIcon,
  PulseRectangle01Icon,
  StethoscopeIcon,
} from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { type Patient } from "@/lib/hospital-data"
import { ConditionChip, StatusPill, WardChip } from "./chips"
import { useHospital } from "./hospital-provider"
import { type ColumnKey, type RowHeight } from "./view-toolbar"

const rowHeightClass: Record<RowHeight, string> = {
  compact: "h-8",
  default: "h-9",
  relaxed: "h-11",
}

function HeadLabel({ icon, children }: { icon?: IconSvgElement; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5">
      {icon && (
        <HugeiconsIcon icon={icon} className="size-3.5 text-[#808080]" strokeWidth={1.8} />
      )}
      <span className="text-xs leading-none font-semibold text-black">{children}</span>
    </span>
  )
}

const headCell = "h-9 border-r-[0.5px] border-[#e8e8e8] bg-[#fbfbfb] px-3 last:border-r-0"
const bodyCellBase = "border-r-[0.5px] border-[#e8e8e8] px-3 py-0 last:border-r-0"

const columnHeaders: { key: ColumnKey; label: string; icon: IconSvgElement; width: string }[] = [
  { key: "ward", label: "Ward", icon: Building03Icon, width: "w-[150px]" },
  { key: "attending", label: "Attending", icon: StethoscopeIcon, width: "w-[140px]" },
  { key: "status", label: "Status", icon: HeartPulseIcon, width: "w-[130px]" },
  { key: "condition", label: "Condition", icon: PulseRectangle01Icon, width: "w-[90px]" },
  { key: "age", label: "Age", icon: HashtagIcon, width: "w-[80px]" },
  { key: "blood", label: "Blood", icon: BloodTypeIcon, width: "w-[90px]" },
  { key: "room", label: "Room", icon: BedSingle01Icon, width: "w-[90px]" },
  { key: "admitted", label: "Admitted", icon: CalendarCheckIn01Icon, width: "w-[120px]" },
]

export function PatientsTable({
  rows,
  totalCount,
  hiddenColumns,
  rowHeight,
  sortByIdToggle,
  onAdd,
}: {
  rows: Patient[]
  totalCount: number
  hiddenColumns: ColumnKey[]
  rowHeight: RowHeight
  sortByIdToggle: () => void
  onAdd: () => void
}) {
  const { dischargePatients, readmitPatient, deletePatients } = useHospital()
  const [selected, setSelected] = React.useState<Set<string>>(new Set())

  const visible = (key: ColumnKey) => !hiddenColumns.includes(key)
  const visibleColumnCount = 2 + columnHeaders.filter((c) => visible(c.key)).length

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

  return (
    <>
      <div className="overflow-hidden rounded-t-[12px] border border-b-0 border-[#e8e8e8]">
        <Table className="caption-bottom">
          <TableHeader>
            <TableRow className="border-b-[0.5px] border-[#e8e8e8] hover:bg-transparent">
              <TableHead className={cn(headCell, "w-[160px]")}>
                <span className="flex items-center gap-3">
                  <Checkbox
                    aria-label="Select all patients"
                    checked={allSelected}
                    onCheckedChange={(checked) =>
                      setSelected(checked ? new Set(rowIds) : new Set())
                    }
                    className="border-[#e8e8e8] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]"
                  />
                  <span className="text-xs leading-none font-semibold text-black">Patients</span>
                  <button
                    type="button"
                    aria-label="Toggle sort by patient ID"
                    onClick={sortByIdToggle}
                    className="text-[#808080] transition-colors hover:text-black"
                  >
                    <HugeiconsIcon icon={ArrowUpDownIcon} className="size-3" strokeWidth={2} />
                  </button>
                </span>
              </TableHead>
              {columnHeaders.filter((c) => visible(c.key)).map((col) => (
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
                    <HugeiconsIcon icon={InsertColumnRightIcon} className="size-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    aria-label="Table options"
                    onClick={() => toast.info("Use the toolbar to sort, filter, and hide columns")}
                    className="transition-colors hover:text-black"
                  >
                    <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" strokeWidth={1.8} />
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
                heightClass={rowHeightClass[rowHeight]}
                selected={selected.has(patient.id)}
                onSelect={(checked) => toggleRow(patient.id, checked)}
                onDischarge={() => dischargePatients([patient.id])}
                onReadmit={() => readmitPatient(patient.id)}
                onDelete={() => {
                  deletePatients([patient.id])
                  toggleRow(patient.id, false)
                }}
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
              <TableCell colSpan={visibleColumnCount} className={cn(bodyCellBase, "h-9 border-r-0")}>
                <button
                  type="button"
                  onClick={onAdd}
                  className="flex items-center gap-2 text-xs leading-none font-medium text-[#808080] transition-colors hover:text-black"
                >
                  <HugeiconsIcon icon={PlusSignIcon} className="size-3.5" strokeWidth={2} />
                  New patient
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="mt-2 text-[10px] leading-none font-medium text-[#808080]">
        {rows.length} of {totalCount} records
      </p>

      {selectedInView.length > 0 && (
        <div className="fixed bottom-[76px] left-1/2 z-50 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full bg-[#222]/95 py-1.5 pr-1.5 pl-3.5 shadow-[0px_16px_40px_0px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <span className="mr-1 text-[11px] leading-none font-semibold text-white">
              {selectedInView.length} selected
            </span>
            <button
              type="button"
              onClick={() => {
                dischargePatients(selectedInView)
                clearSelection()
              }}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#c9c9c9] transition-colors hover:bg-white/10 hover:text-white"
            >
              <HugeiconsIcon icon={Logout03Icon} className="size-3.5" strokeWidth={2} />
              Discharge
            </button>
            <button
              type="button"
              onClick={() => {
                deletePatients(selectedInView)
                clearSelection()
              }}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] leading-none font-medium text-[#ff9d9d] transition-colors hover:bg-white/10 hover:text-[#ffbcbc]"
            >
              <HugeiconsIcon icon={Delete02Icon} className="size-3.5" strokeWidth={2} />
              Delete
            </button>
            <button
              type="button"
              aria-label="Clear selection"
              onClick={clearSelection}
              className="flex items-center rounded-full p-1.5 text-[#c9c9c9] transition-colors hover:bg-white/10 hover:text-white"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-3.5" strokeWidth={2} />
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
  heightClass,
  selected,
  onSelect,
  onDischarge,
  onReadmit,
  onDelete,
}: {
  patient: Patient
  visible: (key: ColumnKey) => boolean
  heightClass: string
  selected: boolean
  onSelect: (checked: boolean) => void
  onDischarge: () => void
  onReadmit: () => void
  onDelete: () => void
}) {
  const discharged = patient.status === "Discharged"
  const bodyCell = cn(bodyCellBase, heightClass)

  return (
    <TableRow
      data-state={selected ? "selected" : undefined}
      className={cn(
        "group/row border-b-[0.5px] border-[#e8e8e8] hover:bg-[#fbfbfb] data-[state=selected]:bg-[#f7faff]",
        discharged && "bg-[#fbfbfb]"
      )}
    >
      <TableCell className={bodyCell}>
        <span className={cn("flex items-center gap-3", discharged && "opacity-50")}>
          <Checkbox
            aria-label={`Select ${patient.id}`}
            checked={selected}
            onCheckedChange={(checked) => onSelect(checked === true)}
            className="border-[#e8e8e8] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]"
          />
          <span className="text-xs leading-none font-medium text-[#222]">{patient.id}</span>
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
            <Avatar className="size-[22px] after:hidden">
              <AvatarFallback
                className="text-[9px] font-semibold"
                style={{ backgroundColor: patient.doctor.bg, color: patient.doctor.fg }}
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
      {visible("age") && (
        <TableCell className={cn(bodyCell, "text-right", discharged && "opacity-50")}>
          <span className="font-mono text-base leading-none text-[#222]">{patient.age}</span>
        </TableCell>
      )}
      {visible("blood") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span className="font-mono text-sm leading-none text-[#222]">{patient.blood}</span>
        </TableCell>
      )}
      {visible("room") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span className="font-mono text-sm leading-none text-[#222]">{patient.room}</span>
        </TableCell>
      )}
      {visible("admitted") && (
        <TableCell className={cn(bodyCell, discharged && "opacity-50")}>
          <span className="text-xs leading-none font-medium text-[#222]">{patient.admitted}</span>
        </TableCell>
      )}
      <TableCell className={bodyCell}>
        <span className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`Actions for ${patient.id}`}
                className="text-[#808080] opacity-0 transition-opacity group-hover/row:opacity-100 hover:text-black data-[state=open]:opacity-100"
              >
                <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" strokeWidth={1.8} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={4} className="w-40 rounded-[10px] border-[#e8e8e8]">
              {discharged ? (
                <DropdownMenuItem className="text-xs" onClick={onReadmit}>
                  <HugeiconsIcon icon={HeartPulseIcon} className="size-3.5" strokeWidth={2} />
                  Readmit
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem className="text-xs" onClick={onDischarge}>
                  <HugeiconsIcon icon={Logout03Icon} className="size-3.5" strokeWidth={2} />
                  Discharge
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="text-xs" onClick={onDelete}>
                <HugeiconsIcon icon={Delete02Icon} className="size-3.5" strokeWidth={2} />
                Delete record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
      </TableCell>
    </TableRow>
  )
}
