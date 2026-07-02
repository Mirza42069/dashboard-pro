"use client"

import * as React from "react"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  ArrowDataTransferHorizontalIcon,
  Cancel01Icon,
  FilterHorizontalIcon,
  PlusSignIcon,
  Search01Icon,
  SlidersHorizontalIcon,
} from "@hugeicons/core-free-icons"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { wards, type Condition, type Ward } from "@/lib/hospital-data"

export const patientViews = [
  "All patients",
  "Admitted",
  "Discharged",
  "Critical",
] as const
export type PatientView = (typeof patientViews)[number]

export type SortField = "id" | "age" | "admitted" | "ward"

export const columnDefs = [
  { key: "ward", label: "Ward" },
  { key: "attending", label: "Attending" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "status", label: "Status" },
  { key: "condition", label: "Condition" },
  { key: "vitals", label: "Vitals" },
  { key: "allergies", label: "Allergies" },
  { key: "tasks", label: "Tasks" },
  { key: "age", label: "Age" },
  { key: "blood", label: "Blood" },
  { key: "location", label: "Location" },
  { key: "admitted", label: "Admitted" },
] as const
export type ColumnKey = (typeof columnDefs)[number]["key"]

export interface TableControls {
  view: PatientView
  search: string
  wardFilter: Ward[]
  conditionFilter: Condition[]
  sortField: SortField
  sortAsc: boolean
  hiddenColumns: ColumnKey[]
}

export const defaultControls: TableControls = {
  view: "All patients",
  search: "",
  wardFilter: [],
  conditionFilter: [],
  sortField: "id",
  sortAsc: true,
  // status is conveyed by views + row dimming; identity columns stay lean
  hiddenColumns: ["status", "age", "blood"],
}

const conditions: Condition[] = ["Stable", "Fair", "Serious", "Critical"]

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#797bff]/50"

const iconButton = cn(
  "relative rounded-[4px] transition-colors hover:text-black data-[state=open]:text-black",
  focusRing
)

function ToolbarIcon({
  icon,
  label,
  active,
  ...props
}: React.ComponentProps<"button"> & {
  icon: IconSvgElement
  label: string
  active?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(iconButton, active ? "text-black" : "text-[#808080]")}
          {...props}
        >
          <HugeiconsIcon icon={icon} className="size-5" strokeWidth={1.8} />
          {active && (
            <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-[#797bff]" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export function ViewToolbar({
  controls,
  onChange,
  onAdd,
}: {
  controls: TableControls
  onChange: (controls: TableControls) => void
  onAdd: () => void
}) {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const searchRef = React.useRef<HTMLInputElement>(null)

  const filtersActive =
    controls.wardFilter.length > 0 || controls.conditionFilter.length > 0

  function set<K extends keyof TableControls>(key: K, value: TableControls[K]) {
    onChange({ ...controls, [key]: value })
  }

  function toggleInList<T>(list: T[], item: T): T[] {
    return list.includes(item)
      ? list.filter((x) => x !== item)
      : [...list, item]
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto">
        <div
          role="group"
          aria-label="Patient views"
          className="flex h-[27px] items-center gap-[2px] rounded-[6px] bg-[#ececef] py-[2px] pr-[3px] pl-[2px]"
        >
          {patientViews.map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={controls.view === v}
              onClick={() => set("view", v)}
              className={cn(
                "flex items-center justify-center rounded-[4px] px-2.5 py-1 text-xs leading-none font-semibold transition-colors",
                focusRing,
                controls.view === v
                  ? "bg-white text-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]"
                  : "text-[#808080] hover:text-black"
              )}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="Add view"
          onClick={() => toast.info("Custom views coming soon")}
          className={cn(
            "flex size-[23px] items-center justify-center rounded-[6px] bg-[#ececef] text-[#808080] transition-colors hover:text-black",
            focusRing
          )}
        >
          <HugeiconsIcon
            icon={PlusSignIcon}
            className="size-3.5"
            strokeWidth={2}
          />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end sm:gap-4">
        <TooltipProvider>
          <div className="flex items-center gap-3.5">
            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ToolbarIcon
                  icon={ArrowDataTransferHorizontalIcon}
                  label="Sort"
                  active={controls.sortField !== "id" || !controls.sortAsc}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-44 rounded-[7px] border-[#e8e8e8]"
              >
                <DropdownMenuLabel className="text-[10px] font-semibold text-[#808080]">
                  Sort by
                </DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={controls.sortField}
                  onValueChange={(v) => set("sortField", v as SortField)}
                >
                  <DropdownMenuRadioItem value="id" className="text-xs">
                    Patient ID
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="age" className="text-xs">
                    Age
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="admitted" className="text-xs">
                    Admission date
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="ward" className="text-xs">
                    Ward
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={controls.sortAsc ? "asc" : "desc"}
                  onValueChange={(v) => set("sortAsc", v === "asc")}
                >
                  <DropdownMenuRadioItem value="asc" className="text-xs">
                    Ascending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="desc" className="text-xs">
                    Descending
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <ToolbarIcon
                  icon={FilterHorizontalIcon}
                  label="Filter"
                  active={filtersActive}
                />
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={8}
                className="w-[280px] rounded-[8px] border-[#e8e8e8] p-0"
              >
                <div className="flex items-center justify-between border-b border-[#e8e8e8] px-3 py-2.5">
                  <span className="text-xs font-semibold text-black">
                    Filters
                  </span>
                  {filtersActive && (
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...controls,
                          wardFilter: [],
                          conditionFilter: [],
                        })
                      }
                      className="text-[10px] font-semibold text-[#808080] transition-colors hover:text-black"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2.5 p-3">
                  <p className="text-[10px] leading-none font-semibold text-[#808080]">
                    Ward
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {wards.map((w) => (
                      <label
                        key={w.name}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Checkbox
                          checked={controls.wardFilter.includes(w.name)}
                          onCheckedChange={() =>
                            set(
                              "wardFilter",
                              toggleInList(controls.wardFilter, w.name)
                            )
                          }
                          className="border-[#e8e8e8] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]"
                        />
                        <span className="text-xs leading-none font-medium text-[#222]">
                          {w.name}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] leading-none font-semibold text-[#808080]">
                    Condition
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {conditions.map((c) => (
                      <label
                        key={c}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <Checkbox
                          checked={controls.conditionFilter.includes(c)}
                          onCheckedChange={() =>
                            set(
                              "conditionFilter",
                              toggleInList(controls.conditionFilter, c)
                            )
                          }
                          className="border-[#e8e8e8] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.08)]"
                        />
                        <span className="text-xs leading-none font-medium text-[#222]">
                          {c}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Search */}
            <div className="flex items-center">
              <ToolbarIcon
                icon={searchOpen ? Cancel01Icon : Search01Icon}
                label={searchOpen ? "Close search" : "Search"}
                active={controls.search.length > 0}
                onClick={() => {
                  if (searchOpen) {
                    set("search", "")
                    setSearchOpen(false)
                  } else {
                    setSearchOpen(true)
                    requestAnimationFrame(() => searchRef.current?.focus())
                  }
                }}
              />
              <div
                className={cn(
                  "overflow-hidden transition-[width,margin,opacity] duration-200 motion-reduce:transition-none",
                  searchOpen ? "ml-2 w-[180px] opacity-100" : "w-0 opacity-0"
                )}
              >
                <Input
                  ref={searchRef}
                  value={controls.search}
                  onChange={(e) => set("search", e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      set("search", "")
                      setSearchOpen(false)
                    }
                  }}
                  aria-label="Search patients"
                  placeholder="Name, MRN, diagnosis…"
                  className="h-7 rounded-[4px] border-[#e8e8e8] text-xs placeholder:text-[#808080]"
                />
              </div>
            </div>

            {/* Column visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ToolbarIcon
                  icon={SlidersHorizontalIcon}
                  label="Columns"
                  active={controls.hiddenColumns.length > 0}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-44 rounded-[7px] border-[#e8e8e8]"
              >
                <DropdownMenuLabel className="text-[10px] font-semibold text-[#808080]">
                  Show columns
                </DropdownMenuLabel>
                {columnDefs.map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.key}
                    checked={!controls.hiddenColumns.includes(col.key)}
                    onCheckedChange={(checked) =>
                      set(
                        "hiddenColumns",
                        checked
                          ? controls.hiddenColumns.filter((k) => k !== col.key)
                          : [...controls.hiddenColumns, col.key]
                      )
                    }
                    className="text-xs"
                  >
                    {col.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </TooltipProvider>

        <button
          type="button"
          onClick={onAdd}
          className={cn(
            "flex items-center gap-1 rounded-[4px] bg-[#222] px-2 py-1 transition-colors hover:bg-black",
            focusRing
          )}
        >
          <span className="text-[11px] leading-none font-medium text-[#e8e8e8]">
            Add
          </span>
          <HugeiconsIcon
            icon={PlusSignIcon}
            className="size-3.5 text-[#e8e8e8]"
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  )
}
