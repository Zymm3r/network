import { X, Phone, Clock, Star, MapPin, Users, CheckCircle2, Share2, Bookmark, ExternalLink, AlertCircle, Zap } from 'lucide-react';
import { HotelPackage, Activity, NearbyPlace, TransportSchedule } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { CustomerTypeList } from './CustomerTypeBadge';
import { QuickCopyButton } from './QuickCopyButton';
import { RatingStars } from './RatingStars';

type DetailItem = HotelPackage | Activity | NearbyPlace | TransportSchedule;

interface DetailPanelProps {
  item: DetailItem | null;
  onClose: () => void;
}

function isPackage(item: DetailItem): item is HotelPackage {
  return 'pricePerNight' in item;
}
function isActivity(item: DetailItem): item is Activity {
  return 'duration' in item && 'difficulty' in item;
}
function isNearby(item: DetailItem): item is NearbyPlace {
  return 'walkTime' in item;
}
function isTransport(item: DetailItem): item is TransportSchedule {
  return 'departureTime' in item && !('difficulty' in item);
}

export function DetailPanel({ item, onClose }: DetailPanelProps) {
  if (!item) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2">
            {'availability' in item && <StatusBadge status={item.availability} size="md" />}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {isPackage(item) && <PackageDetail pkg={item} />}
          {isActivity(item) && <ActivityDetail activity={item} />}
          {isNearby(item) && <NearbyDetail place={item} />}
          {isTransport(item) && <TransportDetail schedule={item} />}
        </div>
      </div>
    </>
  );
}

function PackageDetail({ pkg }: { pkg: HotelPackage }) {
  return (
    <div>
      <div className="relative h-56">
        <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {pkg.roomsLeft !== undefined && (
          <div className="absolute top-4 right-4">
            <span className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium">
              ⚠ {pkg.roomsLeft} room{pkg.roomsLeft !== 1 ? 's' : ''} left
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white text-lg mb-1">{pkg.name}</h2>
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-white/80" />
            <span className="text-white/80 text-sm">{pkg.island} · {pkg.location}</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <RatingStars rating={pkg.rating} reviews={pkg.reviews} size="md" />
          <div className="text-right">
            <div className="text-[#1E5FA8] text-xl font-semibold">
              IDR {pkg.pricePerNight.toLocaleString('id-ID')}
            </div>
            <div className="text-slate-400 text-xs">/night · min {pkg.minNights} nights</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Suitable For</div>
          <CustomerTypeList types={pkg.customerTypes} max={10} />
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Package Includes</div>
          <div className="grid grid-cols-2 gap-2">
            {pkg.includes.map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Highlights</div>
          <div className="flex flex-wrap gap-2">
            {pkg.highlights.map(h => (
              <span key={h} className="text-xs px-2.5 py-1 rounded-full bg-[#1E5FA8]/8 text-[#1E5FA8] border border-[#1E5FA8]/15">
                {h}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Tags</div>
          <div className="flex flex-wrap gap-1.5">
            {pkg.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
          <div>
            <div className="text-xs text-slate-400">Check-in</div>
            <div className="text-sm font-medium text-slate-800">{pkg.checkInTime}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Check-out</div>
            <div className="text-sm font-medium text-slate-800">{pkg.checkOutTime}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-slate-400">Hotel Phone</div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <Phone size={13} className="text-slate-400" />
              {pkg.phone}
            </div>
          </div>
        </div>

        {/* Quick Reply */}
        <div className="bg-[#F0F6FF] border border-[#1E5FA8]/15 rounded-xl p-4">
          <div className="text-xs font-medium text-[#1E5FA8] mb-2 uppercase tracking-wider">📋 Quick Customer Reply</div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{pkg.quickReply}</p>
          <QuickCopyButton text={pkg.quickReply} label="Copy Reply to Clipboard" variant="default" />
        </div>
      </div>
    </div>
  );
}

function ActivityDetail({ activity }: { activity: Activity }) {
  const difficultyColors = {
    easy: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    moderate: 'text-amber-600 bg-amber-50 border-amber-200',
    challenging: 'text-red-600 bg-red-50 border-red-200',
  };

  return (
    <div>
      <div className="relative h-52">
        <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white text-lg mb-1">{activity.name}</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-white/80" />
              <span className="text-white/80 text-sm">{activity.island}</span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColors[activity.difficulty]}`}>
              <Zap size={10} className="inline mb-0.5 mr-0.5" />
              {activity.difficulty.charAt(0).toUpperCase() + activity.difficulty.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <RatingStars rating={activity.rating} size="md" />
          <div className="text-right">
            <div className="text-[#1E5FA8] text-xl font-semibold">
              IDR {activity.price.toLocaleString('id-ID')}
            </div>
            <div className="text-slate-400 text-xs">/person</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl">
          <div>
            <div className="text-xs text-slate-400">Duration</div>
            <div className="text-sm font-medium text-slate-800">{activity.duration}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Group Size</div>
            <div className="text-sm font-medium text-slate-800">{activity.groupSize}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Best Time</div>
            <div className="text-sm font-medium text-slate-800 text-xs">{activity.bestTime}</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Suitable For</div>
          <CustomerTypeList types={activity.customerTypes} max={10} />
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">What's Included</div>
          <div className="grid grid-cols-2 gap-2">
            {activity.includes.map(inc => (
              <div key={inc} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                <span>{inc}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Highlights</div>
          <div className="flex flex-wrap gap-2">
            {activity.highlights.map(h => (
              <span key={h} className="text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                {h}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[#F0F6FF] border border-[#1E5FA8]/15 rounded-xl p-4">
          <div className="text-xs font-medium text-[#1E5FA8] mb-2 uppercase tracking-wider">📋 Quick Customer Reply</div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">{activity.quickReply}</p>
          <QuickCopyButton text={activity.quickReply} label="Copy Reply to Clipboard" variant="default" />
        </div>
      </div>
    </div>
  );
}

function NearbyDetail({ place }: { place: NearbyPlace }) {
  const typeConfig: Record<NearbyPlace['type'], { icon: string; label: string }> = {
    cafe: { icon: '☕', label: 'Café' },
    restaurant: { icon: '🍽️', label: 'Restaurant' },
    checkin_spot: { icon: '📸', label: 'Check-in Spot' },
    market: { icon: '🛒', label: 'Market' },
    pharmacy: { icon: '💊', label: 'Pharmacy' },
    atm: { icon: '🏧', label: 'ATM' },
    photo_spot: { icon: '🌅', label: 'Photo Spot' },
  };
  const config = typeConfig[place.type];
  const quickReply = `📍 ${place.name} — ${place.rating}/5 ⭐, ${place.distance} away (${place.walkTime} walk). Hours: ${place.hours}. ${place.notes}`;

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-3xl">
          {config.icon}
        </div>
        <div className="flex-1">
          <h2 className="text-slate-900 text-lg mb-1">{place.name}</h2>
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin size={12} />
            <span className="text-sm">{place.island} · {place.location}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{place.rating}</span>
            </div>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-500">{place.priceRange}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
        <div>
          <div className="text-xs text-slate-400">Distance</div>
          <div className="text-sm font-medium text-emerald-600">{place.distance}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400">Walk Time</div>
          <div className="text-sm font-medium text-slate-800">{place.walkTime}</div>
        </div>
        <div className="col-span-2">
          <div className="text-xs text-slate-400">Opening Hours</div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
            <Clock size={13} className="text-slate-400" />
            {place.hours}
          </div>
        </div>
        {place.phone && (
          <div className="col-span-2">
            <div className="text-xs text-slate-400">Phone</div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <Phone size={13} className="text-slate-400" />
              {place.phone}
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Tags</div>
        <div className="flex flex-wrap gap-1.5">
          {place.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
        <div className="flex items-start gap-2">
          <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800 leading-relaxed">{place.notes}</p>
        </div>
      </div>

      <div className="bg-[#F0F6FF] border border-[#1E5FA8]/15 rounded-xl p-4">
        <div className="text-xs font-medium text-[#1E5FA8] mb-2 uppercase tracking-wider">📋 Quick Customer Reply</div>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">{quickReply}</p>
        <QuickCopyButton text={quickReply} label="Copy Reply to Clipboard" variant="default" />
      </div>
    </div>
  );
}

function TransportDetail({ schedule }: { schedule: TransportSchedule }) {
  const typeConfig: Record<TransportSchedule['type'], { icon: string; label: string }> = {
    speedboat: { icon: '🚤', label: 'Speedboat' },
    ferry: { icon: '⛴️', label: 'Ferry' },
    private_boat: { icon: '🛥️', label: 'Private Charter' },
    shuttle: { icon: '🚐', label: 'Shuttle' },
  };
  const config = typeConfig[schedule.type];
  const quickReply = `🚤 ${schedule.route} — Departs ${schedule.departureTime}, arrives ${schedule.arrivalTime} (${schedule.duration}). Price: IDR ${schedule.price.toLocaleString('id-ID')}/person. ${schedule.availability === 'limited' ? `⚠️ Only ${schedule.seatsLeft} seats remaining.` : 'Good availability.'} Frequency: ${schedule.frequency}.`;

  return (
    <div className="p-5 space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{config.icon}</span>
          <div>
            <h2 className="text-slate-900 text-lg">{schedule.route}</h2>
            <div className="text-sm text-slate-500">{config.label} · {schedule.operator}</div>
          </div>
        </div>
        <StatusBadge status={schedule.availability} size="md" />
      </div>

      <div className="bg-gradient-to-br from-[#1E5FA8]/5 to-teal-50 border border-[#1E5FA8]/10 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 mb-1">From</div>
            <div className="font-medium text-slate-800">{schedule.from}</div>
            <div className="text-2xl font-semibold text-[#1E5FA8] mt-1">{schedule.departureTime}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl">→</div>
            <div className="text-xs text-slate-500 mt-1">{schedule.duration}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 mb-1">To</div>
            <div className="font-medium text-slate-800">{schedule.to}</div>
            <div className="text-2xl font-semibold text-emerald-600 mt-1">{schedule.arrivalTime}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
        <div>
          <div className="text-xs text-slate-400">Price</div>
          <div className="text-sm font-semibold text-[#1E5FA8]">IDR {schedule.price.toLocaleString('id-ID')}</div>
          <div className="text-xs text-slate-400">/person</div>
        </div>
        {schedule.seatsLeft !== undefined && (
          <div>
            <div className="text-xs text-slate-400">Seats Left</div>
            <div className={`text-sm font-semibold ${schedule.seatsLeft <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {schedule.seatsLeft} seats
            </div>
          </div>
        )}
        <div className="col-span-2">
          <div className="text-xs text-slate-400">Frequency</div>
          <div className="text-sm text-slate-800">{schedule.frequency}</div>
        </div>
      </div>

      {schedule.notes && (
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
          <div className="flex items-start gap-2">
            <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800 leading-relaxed">{schedule.notes}</p>
          </div>
        </div>
      )}

      <div className="bg-[#F0F6FF] border border-[#1E5FA8]/15 rounded-xl p-4">
        <div className="text-xs font-medium text-[#1E5FA8] mb-2 uppercase tracking-wider">📋 Quick Customer Reply</div>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">{quickReply}</p>
        <QuickCopyButton text={quickReply} label="Copy Reply to Clipboard" variant="default" />
      </div>
    </div>
  );
}
