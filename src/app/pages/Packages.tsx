import { useState, useMemo } from 'react';
import { Building2, SlidersHorizontal } from 'lucide-react';
import {
  hotelPackages,
  HotelPackage,
  AvailabilityStatus,
  CustomerType,
} from '../data/mockData';
import { PackageCard } from '../components/cards/PackageCard';
import { DetailPanel } from '../components/DetailPanel';
import { FilterBar, FilterState } from '../components/FilterBar';
import { StatusBadge } from '../components/StatusBadge';

type DetailItem = Parameters<typeof DetailPanel>[0]['item'];

const initialFilters: FilterState = {
  island: 'All Islands',
  availability: 'all',
  customerType: 'all',
  priceMax: 5000000,
  searchQuery: '',
};

export function Packages() {
  const [selectedItem, setSelectedItem] = useState<DetailItem>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filtered = useMemo(() => {
    return hotelPackages.filter(pkg => {
      if (filters.island !== 'All Islands' && pkg.island !== filters.island) return false;
      if (filters.availability !== 'all' && pkg.availability !== filters.availability) return false;
      if (filters.customerType !== 'all' && !pkg.customerTypes.includes(filters.customerType as CustomerType)) return false;
      return true;
    });
  }, [filters]);

  const byType = useMemo(() => {
    const groups: Record<string, HotelPackage[]> = {
      luxury: [],
      boutique: [],
      standard: [],
      budget: [],
    };
    filtered.forEach(pkg => groups[pkg.type].push(pkg));
    return groups;
  }, [filtered]);

  const typeConfig: Record<string, { label: string; emoji: string; color: string }> = {
    luxury: { label: 'Luxury', emoji: '✦', color: 'text-amber-700' },
    boutique: { label: 'Boutique', emoji: '◈', color: 'text-violet-700' },
    standard: { label: 'Standard', emoji: '◻', color: 'text-blue-700' },
    budget: { label: 'Budget', emoji: '○', color: 'text-slate-600' },
  };

  return (
    <div className="flex flex-col h-full">
      <FilterBar filters={filters} onChange={setFilters} totalResults={filtered.length} />

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <Building2 size={17} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-slate-900">Hotel Packages</h1>
            <p className="text-slate-500 text-xs">
              {filtered.length} packages across Gili Islands & Lombok
            </p>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-slate-600 text-sm font-medium mb-1">No packages match your filters</div>
            <div className="text-slate-400 text-xs">Try adjusting the island or availability filter</div>
          </div>
        ) : (
          Object.entries(byType).map(([type, pkgs]) => {
            if (pkgs.length === 0) return null;
            const config = typeConfig[type];
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`font-semibold ${config.color}`}>{config.emoji}</span>
                  <h2 className={`text-sm font-semibold ${config.color}`}>{config.label}</h2>
                  <span className="text-xs text-slate-400">({pkgs.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {pkgs.map(pkg => (
                    <PackageCard key={pkg.id} pkg={pkg} onClick={setSelectedItem} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
