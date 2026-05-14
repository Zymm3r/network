import { useState, useMemo } from 'react';
import { MapPin, Filter } from 'lucide-react';
import { nearbyPlaces, NearbyPlace, islands } from '../data/mockData';
import { NearbyCard } from '../components/cards/NearbyCard';
import { DetailPanel } from '../components/DetailPanel';

type DetailItem = Parameters<typeof DetailPanel>[0]['item'];

const placeTypeOptions = [
  { value: 'all', label: 'All', icon: '📍' },
  { value: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { value: 'cafe', label: 'Café', icon: '☕' },
  { value: 'atm', label: 'ATM', icon: '🏧' },
  { value: 'pharmacy', label: 'Pharmacy', icon: '💊' },
  { value: 'market', label: 'Market', icon: '🛒' },
  { value: 'photo_spot', label: 'Photo Spot', icon: '🌅' },
  { value: 'checkin_spot', label: 'Check-in', icon: '📸' },
];

export function NearbyPlaces() {
  const [selectedItem, setSelectedItem] = useState<DetailItem>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [islandFilter, setIslandFilter] = useState('All Islands');

  const filtered = useMemo(() => {
    return nearbyPlaces.filter(p => {
      if (typeFilter !== 'all' && p.type !== typeFilter) return false;
      if (islandFilter !== 'All Islands' && p.island !== islandFilter) return false;
      return true;
    });
  }, [typeFilter, islandFilter]);

  // Group by island
  const byIsland = useMemo(() => {
    const groups: Record<string, NearbyPlace[]> = {};
    filtered.forEach(p => {
      if (!groups[p.island]) groups[p.island] = [];
      groups[p.island].push(p);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="flex flex-col h-full">
      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-100 px-4 lg:px-6 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 text-slate-400 flex-shrink-0">
            <Filter size={14} />
          </div>
          {placeTypeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setTypeFilter(opt.value)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all flex-shrink-0 ${
                typeFilter === opt.value
                  ? 'bg-[#1E5FA8] text-white border-[#1E5FA8]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
          <div className="w-px h-4 bg-slate-200 flex-shrink-0 mx-1" />
          <select
            value={islandFilter}
            onChange={e => setIslandFilter(e.target.value)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 cursor-pointer hover:border-[#1E5FA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E5FA8]/20 focus:border-[#1E5FA8]"
          >
            {islands.map(island => (
              <option key={island} value={island}>{island}</option>
            ))}
          </select>
          <div className="ml-auto text-xs text-slate-400 flex-shrink-0">
            <span className="font-medium text-slate-700">{filtered.length}</span> places
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
            <MapPin size={17} className="text-violet-600" />
          </div>
          <div>
            <h1 className="text-slate-900">Nearby Places</h1>
            <p className="text-slate-500 text-xs">Cafés, restaurants, ATMs, pharmacies & hidden gems</p>
          </div>
        </div>

        {/* Quick Emergency Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: '🏥', label: 'Nearest Clinic', value: 'Mataram General', sub: '15 min by boat' },
            { icon: '🏧', label: 'Nearest ATM', value: 'BRI — Gili T', sub: '200m from harbour' },
            { icon: '💊', label: 'Pharmacy', value: 'Kimia Farma', sub: 'Mataram, open till 22:00' },
            { icon: '🚑', label: 'Emergency', value: '119', sub: 'Indonesia emergency' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="text-xs text-slate-400">{item.label}</div>
              <div className="text-sm font-semibold text-slate-800">{item.value}</div>
              <div className="text-xs text-slate-400">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Places by Island */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">📍</div>
            <div className="text-slate-600 text-sm font-medium">No places match your filter</div>
          </div>
        ) : (
          Object.entries(byIsland).map(([island, places]) => (
            <div key={island}>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-slate-400" />
                <h2 className="text-sm font-semibold text-slate-700">{island}</h2>
                <span className="text-xs text-slate-400">({places.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {places.map(place => (
                  <NearbyCard key={place.id} place={place} onClick={setSelectedItem} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
