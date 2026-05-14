import { Filter, X } from 'lucide-react';
import { AvailabilityStatus, CustomerType, customerTypeOptions, islands } from '../data/mockData';

export interface FilterState {
  island: string;
  availability: AvailabilityStatus | 'all';
  customerType: CustomerType | 'all';
  priceMax: number;
  searchQuery: string;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults?: number;
}

const availabilityOptions: { value: AvailabilityStatus | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'All Status', color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'available', label: '● Available', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'limited', label: '● Limited', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'advance', label: '● Advance', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { value: 'full', label: '● Full', color: 'bg-red-50 text-red-700 border-red-200' },
];

export function FilterBar({ filters, onChange, totalResults }: FilterBarProps) {
  const hasActiveFilters =
    filters.island !== 'All Islands' ||
    filters.availability !== 'all' ||
    filters.customerType !== 'all';

  const clearAll = () => {
    onChange({
      ...filters,
      island: 'All Islands',
      availability: 'all',
      customerType: 'all',
    });
  };

  return (
    <div className="bg-white border-b border-slate-100 px-4 lg:px-6 py-3">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 text-slate-400 flex-shrink-0">
          <Filter size={14} />
          <span className="text-xs font-medium text-slate-500">Filter:</span>
        </div>

        {/* Island Filter */}
        <select
          value={filters.island}
          onChange={e => onChange({ ...filters, island: e.target.value })}
          className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 cursor-pointer hover:border-[#1E5FA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E5FA8]/20 focus:border-[#1E5FA8]"
        >
          {islands.map(island => (
            <option key={island} value={island}>{island}</option>
          ))}
        </select>

        {/* Availability Filter */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {availabilityOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, availability: opt.value })}
              className={`text-xs px-2.5 py-1.5 rounded-full border font-medium transition-all whitespace-nowrap ${
                filters.availability === opt.value
                  ? opt.color + ' ring-2 ring-offset-1 ring-current/30'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="w-px h-4 bg-slate-200 flex-shrink-0" />

        {/* Customer Type Filter */}
        <select
          value={filters.customerType}
          onChange={e => onChange({ ...filters, customerType: e.target.value as CustomerType | 'all' })}
          className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 cursor-pointer hover:border-[#1E5FA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E5FA8]/20 focus:border-[#1E5FA8]"
        >
          <option value="all">All Customer Types</option>
          {customerTypeOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.emoji} {opt.label}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <>
            <div className="w-px h-4 bg-slate-200 flex-shrink-0" />
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 px-2 py-1.5 rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
            >
              <X size={12} />
              Clear
            </button>
          </>
        )}

        {totalResults !== undefined && (
          <div className="ml-auto flex-shrink-0 text-xs text-slate-400">
            <span className="font-medium text-slate-700">{totalResults}</span> results
          </div>
        )}
      </div>
    </div>
  );
}
