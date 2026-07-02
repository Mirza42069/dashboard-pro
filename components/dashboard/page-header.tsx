import { HugeiconsIcon } from "@hugeicons/react"
import { SquareLock02Icon } from "@hugeicons/core-free-icons"

export function PageHeader({
  eyebrow = "Private Database",
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string
  title: string
  subtitle: string
  actions?: React.ReactNode
}) {
  return (
    <div className="flex items-end justify-between">
      <div className="flex max-w-[680px] flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={SquareLock02Icon} className="size-3.5 text-[#808080]" strokeWidth={2} />
          <span className="text-[10px] leading-none font-semibold text-[#808080]">{eyebrow}</span>
        </div>
        <h1 className="text-[22px] leading-none font-semibold tracking-[-0.22px] text-black">
          {title}
        </h1>
        <p className="text-sm leading-tight font-medium text-[#808080]">{subtitle}</p>
      </div>
      {actions}
    </div>
  )
}
