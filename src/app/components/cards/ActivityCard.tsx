import { Clock, MapPin, Users, ChevronRight, Zap } from 'lucide-react';
import { Activity } from '../../data/mockData';
import { StatusBadge } from '../StatusBadge';
import { CustomerTypeList } from '../CustomerTypeBadge';
import { RatingStars } from '../RatingStars';
import { QuickCopyButton } from '../QuickCopyButton';

interface ActivityCardProps {
  activity: Activity;
  onClick: (a: Activity) => void;
}

const typeConfig: Record<Activity['type'], { icon: string; label: string; color: string }> = {
  diving: { icon: '🤿', label: 'Diving', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  snorkeling: { icon: '🐠', label: 'Snorkeling', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  island_hopping: { icon: '🏝️', label: 'Island Hopping', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  cultural: { icon: '🎎', label: 'Cultural', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  adventure: { icon: '⛰️', label: 'Adventure', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  relaxation: { icon: '🧘', label: 'Relaxation', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  water_sports: { icon: '🏄', label: 'Water Sports', color: 'bg-sky-50 text-sky-700 border-sky-200' },
};

const difficultyConfig = {
  easy: { label: 'Easy', classes: 'text-emerald-600 bg-emerald-50' },
  moderate: { label: 'Moderate', classes: 'text-amber-600 bg-amber-50' },
  challenging: { label: 'Challenging', classes: 'text-red-600 bg-red-50' },
};

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const config = typeConfig[activity.type];
  const diff = difficultyConfig[activity.difficulty];

  return (
    <div
      onClick={() => onClick(activity)}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-md hover:border-slate-200 transition-all duration-200 group"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${config.color}`}>
            {config.icon} {config.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <StatusBadge status={activity.availability} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diff.classes}`}>
            <Zap size={10} className="inline mb-0.5 mr-0.5" />
            {diff.label}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-slate-900 group-hover:text-[#1E5FA8] transition-colors line-clamp-1 flex-1 text-sm">{activity.name}</h3>
          <ChevronRight size={16} className="text-slate-300 group-hover:text-[#1E5FA8] mt-0.5 flex-shrink-0 transition-colors" />
        </div>

        <div className="flex items-center gap-1 text-slate-500 mb-2">
          <MapPin size={11} />
          <span className="text-xs">{activity.island}</span>
        </div>

        <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Clock size={11} />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={11} />
            <span>{activity.groupSize}</span>
          </div>
          <RatingStars rating={activity.rating} />
        </div>

        <CustomerTypeList types={activity.customerTypes} max={4} />

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
          <div>
            <div className="text-[#1E5FA8] font-semibold text-sm">
              IDR {activity.price.toLocaleString('id-ID')}
            </div>
            <div className="text-slate-400 text-xs">/person</div>
          </div>
          <div className="flex-1" />
          <QuickCopyButton text={activity.quickReply} label="Copy Reply" variant="outline" />
        </div>
      </div>
    </div>
  );
}
