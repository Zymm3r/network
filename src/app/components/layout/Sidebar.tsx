import { NavLink, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  MapPin,
  Route,
  Settings,
  LogOut,
  ChevronRight,
  Network,
} from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useI18n } from '../../i18n';
import { useAuth } from '../../hooks/useAuth';

const navItems = [
  { to: '/courses', labelKey: 'nav.courses', icon: BookOpen, end: false },
  { to: '/lessons', labelKey: 'nav.lessons', icon: FlaskConical, end: false },
  { to: '/paths', labelKey: 'nav.paths', icon: Route, end: false },
  { to: '/resources', labelKey: 'nav.resources', icon: MapPin, end: false },
  { to: '/profile', labelKey: 'nav.profile', icon: Settings, end: false },
];

const levelColors: Record<string, string> = {
  student: 'bg-green-500',
  instructor: 'bg-blue-500',
  admin: 'bg-purple-500',
};

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('[Sidebar] signOut error:', err);
    } finally {
      // Always navigate to auth, even if signOut throws
      navigate('/auth', { replace: true });
    }
  };

  const getConsonantInitials = (email: string | undefined): string => {
    if (!email) return 'G';
    const localPart = email.split('@')[0] || '';
    const vowels = 'aeiouAEIOU';
    const consonants = localPart.split('').filter((ch) => /[a-zA-Z]/.test(ch) && !vowels.includes(ch));
    if (consonants.length >= 2) return (consonants[0] + consonants[1]).toUpperCase();
    if (consonants.length === 1) return consonants[0].toUpperCase();
    const alpha = localPart.split('').filter((ch) => /[a-zA-Z]/.test(ch));
    return alpha.length >= 2 ? (alpha[0] + alpha[1]).toUpperCase() : alpha.length === 1 ? alpha[0].toUpperCase() : 'G';
  };

  const getLabel = (key: string) => {
    const keys = key.split('.');
    let value: any = t;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#0F172A' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#6366F1' }}>
            <Network className="text-white w-5 h-5" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Network 101</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>การสร้างเครือข่าย</div>
          </div>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="px-3 py-3">
        <LanguageSwitcher />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(({ to, labelKey, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                isActive
                  ? 'bg-[#6366F1] text-white shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/8'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={17} className={isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'} />
                <span className="flex-1 font-medium">{getLabel(labelKey)}</span>
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
          <BookOpen size={14} className="text-white/40" />
          <span className="text-xs text-white/40">สถานะ:</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${levelColors[user?.role || 'student']}`} />
            <span className="text-xs text-white/70 capitalize font-medium">{user?.role || 'student'}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">{getConsonantInitials(user?.email)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white font-medium truncate">{user?.email || 'Guest'}</div>
            <div className="text-xs text-white/40 truncate">เรียนรู้การสร้างเครือข่าย</div>
          </div>
          <button
            onClick={handleSignOut}
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
