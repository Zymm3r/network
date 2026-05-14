import { useState } from 'react';
import { Building2, Waves, Activity, MapPin, Clock, AlertTriangle, Users } from 'lucide-react';
import { Link } from 'react-router';
import {
  hotelPackages,
  activities,
  transportSchedules,
  quickStats,
  customerTypeOptions,
} from '../data/mockData';
import { PackageCard } from '../components/cards/PackageCard';
import { ActivityCard } from '../components/cards/ActivityCard';
import { ScheduleCard } from '../components/cards/ScheduleCard';
import { DetailPanel } from '../components/DetailPanel';
import { StatusBadge } from '../components/StatusBadge';

type DetailItem = Parameters<typeof DetailPanel>[0]['item'];

const stats = [
  {
    label: 'Available Packages',
    value: quickStats.availablePackages,
    icon: Building2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    sub: `${quickStats.limitedPackages} limited`,
  },
  {
    label: 'Active Activities',
    value: quickStats.availableActivities,
    icon: Activity,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    sub: 'bookable now',
  },
  {
    label: 'Departures Today',
    value: quickStats.todayDepartures,
    icon: Waves,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    sub: 'active routes',
  },
  {
    label: 'Full / Unavailable',
    value: quickStats.fullPackages,
    icon: AlertTriangle,
    color: 'text-red-500',
    bg: 'bg-red-50',
    sub: 'suggest alternatives',
  },
];

export function Dashboard() {
  const [selectedItem, setSelectedItem] = useState<DetailItem>(null);

  const urgentItems = hotelPackages.filter(p => p.availability === 'limited' || (p.roomsLeft !== undefined && p.roomsLeft <= 3));
  const featuredPackages = hotelPackages.filter(p => p.availability !== 'full').slice(0, 4);
  const featuredActivities = activities.slice(0, 3);
  const upcomingDepartures = transportSchedules.slice(0, 3);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Bar */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-slate-900 text-lg">Good morning, Ayu 👋</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Sunday, April 12, 2026 · Gili Islands & Lombok Operations
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live data
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <Icon size={17} className={stat.color} />
                </div>
              </div>
              <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Urgent / Limited Alerts */}
      {urgentItems.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={15} className="text-amber-500" />
            <h2 className="text-sm font-semibold text-slate-700">Urgent — Act Fast</h2>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
              {urgentItems.length} items
            </span>
          </div>
          <div className="space-y-2">
            {urgentItems.map(pkg => (
              <div
                key={pkg.id}
                onClick={() => setSelectedItem(pkg)}
                className="bg-white rounded-xl border border-amber-200 p-3 flex items-center gap-3 cursor-pointer hover:border-amber-300 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">{pkg.name}</div>
                  <div className="text-xs text-slate-500">{pkg.island}</div>
                </div>
                <StatusBadge status={pkg.availability} />
                {pkg.roomsLeft && (
                  <span className="text-xs text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded-full border border-amber-200">
                    {pkg.roomsLeft} left
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Type Quick Reference */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users size={15} className="text-slate-500" />
          <h2 className="text-sm font-semibold text-slate-700">Quick: Customer Type Guide</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {customerTypeOptions.map(opt => {
            const matching = hotelPackages.filter(p => p.customerTypes.includes(opt.value) && p.availability !== 'full');
            const activitiesMatch = activities.filter(a => a.customerTypes.includes(opt.value) && a.availability !== 'full');
            return (
              <div key={opt.value} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm">
                <div className="text-xl mb-1">{opt.emoji}</div>
                <div className="text-xs font-semibold text-slate-700">{opt.label}</div>
                <div className="mt-1.5 space-y-0.5">
                  <div className="text-xs text-slate-500">
                    <span className="text-emerald-600 font-medium">{matching.length}</span> packages
                  </div>
                  <div className="text-xs text-slate-500">
                    <span className="text-blue-600 font-medium">{activitiesMatch.length}</span> activities
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Packages */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building2 size={15} className="text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-700">Hotel Packages</h2>
          </div>
          <Link to="/packages" className="text-xs text-[#1E5FA8] hover:underline font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {featuredPackages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} onClick={setSelectedItem} />
          ))}
        </div>
      </div>

      {/* Activities + Transport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activities */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity size={15} className="text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-700">Activities</h2>
            </div>
            <Link to="/activities" className="text-xs text-[#1E5FA8] hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {featuredActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} onClick={setSelectedItem} />
            ))}
          </div>
        </div>

        {/* Transport */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Waves size={15} className="text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-700">Today's Departures</h2>
            </div>
            <Link to="/schedules" className="text-xs text-[#1E5FA8] hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingDepartures.map(schedule => (
              <ScheduleCard key={schedule.id} schedule={schedule} onClick={setSelectedItem} />
            ))}
          </div>
        </div>
      </div>

      <DetailPanel item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}