import { CustomerType, customerTypeOptions } from '../data/mockData';

interface CustomerTypeBadgeProps {
  type: CustomerType;
  compact?: boolean;
}

export function CustomerTypeBadge({ type, compact = false }: CustomerTypeBadgeProps) {
  const option = customerTypeOptions.find(o => o.value === type);
  if (!option) return null;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs border border-slate-200">
      <span>{option.emoji}</span>
      {!compact && <span>{option.label}</span>}
    </span>
  );
}

interface CustomerTypeListProps {
  types: CustomerType[];
  max?: number;
}

export function CustomerTypeList({ types, max = 3 }: CustomerTypeListProps) {
  const shown = types.slice(0, max);
  const remaining = types.length - shown.length;
  return (
    <div className="flex flex-wrap gap-1">
      {shown.map(type => (
        <CustomerTypeBadge key={type} type={type} />
      ))}
      {remaining > 0 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs border border-slate-200">
          +{remaining} more
        </span>
      )}
    </div>
  );
}
