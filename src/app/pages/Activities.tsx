import { useState, useMemo } from 'react';
import { Activity as ActivityIcon, Filter, Zap } from 'lucide-react';
import { activities, Activity, CustomerType, customerTypeOptions } from '../data/mockData';
import { ActivityCard } from '../components/cards/ActivityCard';
import { DetailPanel } from '../components/DetailPanel';

type DetailItem = Parameters<typeof DetailPanel>[0]['item'];

const activityTypeOptions = [
  { value: 'all', label: 'All', icon: '🌊' },
  { value: 'diving', label: 'Diving', icon: '🤿' },
  { value: 'snorkeling', label: 'Snorkeling', icon: '🐠' },
  { value: 'island_hopping', label: 'Island Hopping', icon: '🏝️' },
  { value: 'cultural', label: 'Cultural', icon: '🎎' },
  { value: 'adventure', label: 'Adventure', icon: '⛰️' },
  { value: 'water_sports', label: 'Water Sports', icon: '🏄' },
];

const difficultyOptions = [
  { value: 'all', label: 'Any Difficulty' },
  { value: 'easy', label: '🟢 Easy' },
  { value: 'moderate', label: '🟡 Moderate' },
  { value: 'challenging', label: '🔴 Challenging' },
];

export function Activities() {
  const [selectedItem, setSelectedItem] = useState<DetailItem>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [diffFilter, setDiffFilter] = useState('all');
  const [customerFilter, setCustomerFilter] = useState('all');

  const filtered = useMemo(() => {
    return activities.filter(a => {
      if (typeFilter !== 'all' && a.type !== typeFilter) return false;
      if (diffFilter !== 'all' && a.difficulty !== diffFilter) return false;
      if (customerFilter !== 'all' && !a.customerTypes.includes(customerFilter as CustomerType)) return false;
      return true;
    });
  }, [typeFilter, diffFilter, customerFilter]);

  return (
    <div className="flex flex-col h-full">
      {/* Filter Bar */}
      <div className="bg-white border-b border-slate-100 px-4 lg:px-6 py-3 space-y-3">
        {/* Type Filter */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {activityTypeOptions.map(opt => (
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
          {/* Difficulty */}
          <select
            value={diffFilter}
            onChange={e => setDiffFilter(e.target.value)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 cursor-pointer hover:border-[#1E5FA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E5FA8]/20 focus:border-[#1E5FA8]"
          >
            {difficultyOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {/* Customer Type */}
          <select
            value={customerFilter}
            onChange={e => setCustomerFilter(e.target.value)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 cursor-pointer hover:border-[#1E5FA8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1E5FA8]/20 focus:border-[#1E5FA8]"
          >
            <option value="all">All Customer Types</option>
            {customerTypeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.emoji} {opt.label}</option>
            ))}
          </select>
          <div className="ml-auto text-xs text-slate-400 flex-shrink-0">
            <span className="font-medium text-slate-700">{filtered.length}</span> activities
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
            <ActivityIcon size={17} className="text-teal-600" />
          </div>
          <div>
            <h1 className="text-slate-900">Activities & Experiences</h1>
            <p className="text-slate-500 text-xs">Diving, island hopping, cultural & adventure experiences</p>
          </div>
        </div>

        {/* Suitability Matrix */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-50 flex items-center gap-2">
            <Zap size={14} className="text-amber-500" />
            <span className="text-sm font-semibold text-slate-700">Quick Suitability Guide</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {customerTypeOptions.map(opt => {
                const matching = activities.filter(a =>
                  a.customerTypes.includes(opt.value) && a.availability !== 'full'
                );
                return (
                  <div
                    key={opt.value}
                    onClick={() => setCustomerFilter(opt.value === customerFilter ? 'all' : opt.value)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      customerFilter === opt.value
                        ? 'bg-[#1E5FA8]/5 border-[#1E5FA8]/20'
                        : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <div>
                      <div className="text-xs font-medium text-slate-700">{opt.label}</div>
                      <div className="text-xs text-slate-400">{matching.length} activities suitable</div>
                    </div>
                    <div className="ml-auto">
                      {matching.map(a => (
                        <span key={a.id} className="text-xs">{a.type === 'diving' ? '🤿' : a.type === 'snorkeling' ? '🐠' : a.type === 'island_hopping' ? '🏝️' : a.type === 'cultural' ? '🎎' : a.type === 'adventure' ? '⛰️' : '🏄'}</span>
                      )).slice(0, 3)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Not suitable warning */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
          <div className="text-sm font-semibold text-rose-700 mb-2">⚠️ Safety Reminders</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-600">
            <div>• Diving/Snorkeling: <strong>Not for pregnant guests</strong></div>
            <div>• Rinjani Trekking: <strong>Not for elderly/pregnant/kids</strong></div>
            <div>• Surfing: <strong>Not for elderly or pregnant guests</strong></div>
            <div>• All activities: Check medical conditions first</div>
          </div>
        </div>

        {/* Activity Cards */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-3">🏝️</div>
            <div className="text-slate-600 text-sm font-medium">No activities match your filters</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(activity => (
              <ActivityCard key={activity.id} activity={activity} onClick={setSelectedItem} />
            ))}
          </div>
        )}
      </div>

      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
