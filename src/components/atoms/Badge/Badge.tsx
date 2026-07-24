import { cn } from '@/utils/cn'
import { EventCategory } from '@/types/event'

type BadgeProps = {
  label: EventCategory | string
  className?: string
}

const categoryColors: Record<string, string> = {
  Koncert: 'bg-violet-100 text-violet-700',
  Sport: 'bg-emerald-100 text-emerald-700',
  Teatr: 'bg-amber-100 text-amber-700',
  Konferencja: 'bg-sky-100 text-sky-700',
}

const Badge = ({ label, className }: BadgeProps) => (
  <span
    className={cn(
      'inline-block rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide',
      categoryColors[label] ?? 'bg-gray-100 text-gray-600',
      className
    )}
  >
    {label}
  </span>
)

export default Badge
