import { Clock, Users, ArrowRight, AlertCircle } from 'lucide-react';
import { TransportSchedule } from '../../data/mockData';
import { StatusBadge } from '../StatusBadge';
import { QuickCopyButton } from '../QuickCopyButton';

interface ScheduleCardProps {
  schedule: TransportSchedule;
  onClick: (s: TransportSchedule) => void;
}

const typeConfig: Record<TransportSchedule['type'], { icon: string; label: string; color: string }> = {
  speedboat: { icon: '🚤', label: 'Speedboat', color: 'bg-blue-50 text-blue-700' },
  ferry: { icon: '⛴️', label: 'Ferry', color: 'bg-slate-50 text-slate-600' },
  private_boat: { icon: '🛥️', label: 'Private Charter', color: 'bg-amber-50 text-amber-700' },
  shuttle: { icon: '🚐', label: 'Shuttle', color: 'bg-green-50 text-green-700' },
};

export function ScheduleCard({ schedule, onClick }: ScheduleCardProps) {
  const config = typeConfig[schedule.type];
  const quickReply = `🚤 ${schedule.route} — Departs ${schedule.departureTime}, arrives ${schedule.arrivalTime} (${schedule.duration}). IDR ${schedule.price.toLocaleString('id-ID')}/person. ${schedule.availability === 'limited' ? `⚠️ Only ${schedule.seatsLeft} seats left!` : 'Seats available.'} Operator: ${schedule.operator}.`;

  return (
    <div
      onClick={() => onClick(schedule)}
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 cursor-pointer hover:shadow-md hover:border-slate-200 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{config.icon}</span>
          <div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${config.color}`}>
              {config.label}
            </span>
            <div className="text-xs text-slate-400 mt-0.5">{schedule.operator}</div>
          </div>
        </div>
        <StatusBadge status={schedule.availability} />
      </div>

      {/* Route display */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-slate-400 mb-0.5">From</div>
          <div className="text-slate-800 text-sm font-medium truncate">{schedule.from}</div>
          <div className="flex items-center gap-1 text-slate-500 mt-1">
            <Clock size={11} />
            <span className="text-xs font-semibold text-[#1E5FA8]">{schedule.departureTime}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 flex-shrink-0 px-2">
          <ArrowRight size={14} className="text-slate-300" />
          <span className="text-xs text-slate-400 whitespace-nowrap">{schedule.duration}</span>
        </div>

        <div className="flex-1 min-w-0 text-right">
          <div className="text-xs text-slate-400 mb-0.5">To</div>
          <div className="text-slate-800 text-sm font-medium truncate">{schedule.to}</div>
          <div className="flex items-center justify-end gap-1 text-slate-500 mt-1">
            <Clock size={11} />
            <span className="text-xs font-semibold text-emerald-600">{schedule.arrivalTime}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
        <div className="text-[#1E5FA8] font-semibold text-sm">
          IDR {schedule.price.toLocaleString('id-ID')}
        </div>
        <span className="text-slate-300">·</span>
        <span className="text-xs text-slate-500">/person</span>
        {schedule.seatsLeft !== undefined && (
          <>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1 text-amber-600 text-xs">
              <Users size={11} />
              <span>{schedule.seatsLeft} seats left</span>
            </div>
          </>
        )}
        <div className="flex-1" />
        <QuickCopyButton text={quickReply} label="Copy" variant="outline" />
      </div>

      {schedule.notes && (
        <div className="flex items-start gap-1.5 mt-2 p-2 bg-amber-50 rounded-lg border border-amber-100">
          <AlertCircle size={12} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <span className="text-xs text-amber-700 leading-relaxed">{schedule.notes}</span>
        </div>
      )}
    </div>
  );
}
