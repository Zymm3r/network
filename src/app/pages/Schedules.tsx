import { useState, useMemo } from 'react';
import { Waves, Clock, Filter, AlertCircle } from 'lucide-react';
import { transportSchedules, TransportSchedule } from '../data/mockData';
import { ScheduleCard } from '../components/cards/ScheduleCard';
import { DetailPanel } from '../components/DetailPanel';
import { StatusBadge } from '../components/StatusBadge';

type DetailItem = Parameters<typeof DetailPanel>[0]['item'];

const typeOptions = [
  { value: 'all', label: 'All Types', icon: '🚢' },
  { value: 'speedboat', label: 'Speedboat', icon: '🚤' },
  { value: 'ferry', label: 'Ferry', icon: '⛴️' },
  { value: 'private_boat', label: 'Private', icon: '🛥️' },
  { value: 'shuttle', label: 'Shuttle', icon: '🚐' },
];

export function Schedules() {
  const [selectedItem, setSelectedItem] = useState<DetailItem>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [availFilter, setAvailFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return transportSchedules.filter(s => {
      if (typeFilter !== 'all' && s.type !== typeFilter) return false;
      if (availFilter !== 'all' && s.availability !== availFilter) return false;
      return true;
    });
  }, [typeFilter, availFilter]);

  return (
    <div className="flex flex-col h-full">
      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-100 px-4 lg:px-6 py-3">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 text-slate-400 flex-shrink-0">
            <Filter size={14} />
            <span className="text-xs font-medium text-slate-500">Type:</span>
          </div>
          {typeOptions.map(opt => (
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
          <div className="w-px h-4 bg-slate-200 flex-shrink-0" />
          {['all', 'available', 'limited', 'advance'].map(s => (
            <button
              key={s}
              onClick={() => setAvailFilter(s)}
              className={`text-xs px-2.5 py-1.5 rounded-full border font-medium transition-all flex-shrink-0 capitalize ${
                availFilter === s
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <div className="ml-auto text-xs text-slate-400 flex-shrink-0">
            <span className="font-medium text-slate-700">{filtered.length}</span> routes
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
            <Waves size={17} className="text-teal-600" />
          </div>
          <div>
            <h1 className="text-slate-900">Transport Schedules</h1>
            <p className="text-slate-500 text-xs">Boat, ferry & shuttle routes — real-time availability</p>
          </div>
        </div>

        {/* Quick Schedule Table for Gili Routes */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-50 flex items-center gap-2">
            <Clock size={14} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Gili Routes — Quick Reference</span>
            <span className="ml-auto text-xs text-slate-400">All times WITA (UTC+8)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="text-left px-4 py-2.5">Route</th>
                  <th className="text-left px-4 py-2.5">Type</th>
                  <th className="text-left px-4 py-2.5">Departs</th>
                  <th className="text-left px-4 py-2.5">Duration</th>
                  <th className="text-left px-4 py-2.5">Price</th>
                  <th className="text-left px-4 py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transportSchedules.filter(s => s.type === 'speedboat').map(s => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedItem(s)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800 text-xs">{s.route}</div>
                      <div className="text-slate-400 text-xs">{s.operator}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">🚤</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-[#1E5FA8] text-xs">{s.departureTime}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{s.duration}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-slate-700">
                        IDR {s.price.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={s.availability} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-amber-800 mb-1">Booking Notes</div>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• Gili Islands do not allow motorized vehicles — horse carts and bicycles only</li>
                <li>• Last boats to Gili T typically depart Bangsal at 17:00 — advise early booking</li>
                <li>• Private charters require minimum 24h advance booking (contact SeaWing)</li>
                <li>• Ferry to Bali from Lembar runs 24/7 — good for budget travelers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3">All Routes ({filtered.length})</h2>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-4xl mb-3">🚢</div>
              <div className="text-slate-600 text-sm font-medium">No routes match your filter</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(schedule => (
                <ScheduleCard key={schedule.id} schedule={schedule} onClick={setSelectedItem} />
              ))}
            </div>
          )}
        </div>
      </div>

      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
