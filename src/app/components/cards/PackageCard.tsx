import { MapPin, Clock, Phone, ChevronRight, Users } from 'lucide-react';
import { HotelPackage } from '../../data/mockData';
import { StatusBadge } from '../StatusBadge';
import { CustomerTypeList } from '../CustomerTypeBadge';
import { RatingStars } from '../RatingStars';
import { QuickCopyButton } from '../QuickCopyButton';

interface PackageCardProps {
  pkg: HotelPackage;
  onClick: (pkg: HotelPackage) => void;
  compact?: boolean;
}

const typeColors: Record<HotelPackage['type'], string> = {
  luxury: 'bg-amber-50 text-amber-700 border-amber-200',
  boutique: 'bg-violet-50 text-violet-700 border-violet-200',
  standard: 'bg-blue-50 text-blue-700 border-blue-200',
  budget: 'bg-slate-50 text-slate-600 border-slate-200',
};

const typeLabel: Record<HotelPackage['type'], string> = {
  luxury: '✦ Luxury',
  boutique: '◈ Boutique',
  standard: '◻ Standard',
  budget: '○ Budget',
};

export function PackageCard({ pkg, onClick, compact = false }: PackageCardProps) {
  return (
    <div
      onClick={() => onClick(pkg)}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer hover:shadow-md hover:border-slate-200 transition-all duration-200 group"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <StatusBadge status={pkg.availability} />
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[pkg.type]}`}>
            {typeLabel[pkg.type]}
          </span>
        </div>
        {pkg.roomsLeft !== undefined && pkg.roomsLeft <= 3 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
              ⚠ {pkg.roomsLeft} room{pkg.roomsLeft !== 1 ? 's' : ''} left
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-slate-900 group-hover:text-[#1E5FA8] transition-colors line-clamp-1 flex-1">{pkg.name}</h3>
          <ChevronRight size={16} className="text-slate-300 group-hover:text-[#1E5FA8] mt-0.5 flex-shrink-0 transition-colors" />
        </div>

        <div className="flex items-center gap-1 text-slate-500 mb-2">
          <MapPin size={12} />
          <span className="text-xs">{pkg.island} · {pkg.location}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <RatingStars rating={pkg.rating} reviews={pkg.reviews} />
          <div className="text-right">
            <div className="text-[#1E5FA8] font-semibold text-sm">
              IDR {pkg.pricePerNight.toLocaleString('id-ID')}
            </div>
            <div className="text-slate-400 text-xs">/night · min {pkg.minNights}N</div>
          </div>
        </div>

        {!compact && (
          <>
            <CustomerTypeList types={pkg.customerTypes} max={4} />

            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-50">
              <div className="flex items-center gap-1 text-slate-400 text-xs">
                <Clock size={11} />
                <span>Check-in {pkg.checkInTime}</span>
              </div>
              <div className="flex-1" />
              <QuickCopyButton text={pkg.quickReply} label="Copy Reply" variant="outline" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
