import { AvailabilityStatus } from '../data/mockData';

interface StatusBadgeProps {
  status: AvailabilityStatus;
  showDot?: boolean;
  size?: 'sm' | 'md';
}

const statusConfig: Record<AvailabilityStatus, { label: string; classes: string; dot: string }> = {
  available: {
    label: 'Available',
    classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
  },
  limited: {
    label: 'Limited',
    classes: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot: 'bg-amber-500',
  },
  full: {
    label: 'Full',
    classes: 'bg-red-50 text-red-700 border border-red-200',
    dot: 'bg-red-500',
  },
  advance: {
    label: 'Advance Booking',
    classes: 'bg-violet-50 text-violet-700 border border-violet-200',
    dot: 'bg-violet-500',
  },
};

export function StatusBadge({ status, showDot = true, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.classes} ${sizeClasses}`}>
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'available' ? 'animate-pulse' : ''}`} />
      )}
      {config.label}
    </span>
  );
}
