import { MapPin, Clock, Phone, Star } from 'lucide-react';
import { NearbyPlace } from '../../data/mockData';
import { QuickCopyButton } from '../QuickCopyButton';

interface NearbyCardProps {
  place: NearbyPlace;
  onClick: (p: NearbyPlace) => void;
}

const typeConfig: Record<NearbyPlace['type'], { icon: string; label: string; color: string }> = {
  cafe: { icon: '☕', label: 'Café', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  restaurant: { icon: '🍽️', label: 'Restaurant', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  checkin_spot: { icon: '📸', label: 'Check-in Spot', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  market: { icon: '🛒', label: 'Market', color: 'bg-green-50 text-green-700 border-green-200' },
  pharmacy: { icon: '💊', label: 'Pharmacy', color: 'bg-red-50 text-red-700 border-red-200' },
  atm: { icon: '🏧', label: 'ATM', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  photo_spot: { icon: '🌅', label: 'Photo Spot', color: 'bg-violet-50 text-violet-700 border-violet-200' },
};

export function NearbyCard({ place, onClick }: NearbyCardProps) {
  const config = typeConfig[place.type];
  const quickReply = `📍 ${place.name} — ${place.type === 'atm' || place.type === 'pharmacy' ? '' : 'Rating '}${place.rating}/5, ${place.distance} away (${place.walkTime} walk). Hours: ${place.hours}. ${place.notes}`;

  return (
    <div
      onClick={() => onClick(place)}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 cursor-pointer hover:shadow-md hover:border-slate-200 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg flex-shrink-0">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-slate-900 text-sm group-hover:text-[#1E5FA8] transition-colors line-clamp-1">{place.name}</h3>
            <span className={`text-xs px-1.5 py-0.5 rounded-full border font-medium flex-shrink-0 ${config.color}`}>
              {config.label}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin size={11} />
              <span>{place.island}</span>
            </div>
            <span>·</span>
            <span className="text-emerald-600 font-medium">{place.distance}</span>
            <span>·</span>
            <span>{place.walkTime} walk</span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-slate-700">{place.rating}</span>
            </div>
            <span className="text-xs text-slate-400">{place.priceRange}</span>
            <div className="flex items-center gap-1 text-slate-500">
              <Clock size={11} />
              <span className="text-xs">{place.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {place.notes && (
        <p className="mt-3 text-xs text-slate-500 leading-relaxed border-t border-slate-50 pt-3 line-clamp-2">
          {place.notes}
        </p>
      )}

      <div className="flex items-center gap-2 mt-3">
        {place.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
            {tag}
          </span>
        ))}
        <div className="flex-1" />
        <QuickCopyButton text={quickReply} label="Copy" variant="ghost" />
      </div>
    </div>
  );
}
