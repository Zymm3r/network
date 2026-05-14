import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Building2,
  Waves,
  Activity,
  MapPin,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { currentUser } from '../../data/mockData';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/packages', label: 'Hotel Packages', icon: Building2, end: false },
  { to: '/schedules', label: 'Transport', icon: Waves, end: false },
  { to: '/activities', label: 'Activities', icon: Activity, end: false },
  { to: '/nearby', label: 'Nearby Places', icon: MapPin, end: false },
];

const roleColors: Record<string, string> = {
  admin: 'bg-red-500',
  manager: 'bg-amber-500',
  staff: 'bg-emerald-500',
};

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#0B1E3D' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#1E5FA8' }}>
            <span className="text-white text-base">🌴</span>
          </div>
          <div>
            <div className="text-white font-semibold text-sm">IslandDesk</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Staff Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                isActive
                  ? 'bg-[#1E5FA8] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'} />
                <span className="flex-1 font-medium">{label}</span>
                {isActive && <ChevronRight size={14} className="text-white/50" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="px-3 py-4 border-t space-y-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {/* Role Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <Shield size={14} className="text-white/40" />
          <span className="text-xs text-white/40">Role:</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${roleColors[currentUser.role]}`} />
            <span className="text-xs text-white/70 capitalize font-medium">{currentUser.role}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#1E5FA8] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">{currentUser.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white font-medium truncate">{currentUser.name}</div>
            <div className="text-xs text-white/40 truncate">{currentUser.department}</div>
          </div>
          <button className="text-white/30 hover:text-white/60 transition-colors">
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
