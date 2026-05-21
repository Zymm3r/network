import { useState } from 'react';
import { Outlet, Navigate } from 'react-router';
import { Menu, Bell, RefreshCw, Trophy } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { GlobalSearch } from '../GlobalSearch';
import { Toaster } from 'sonner';
import { useAuth } from '../../hooks/useAuth';

/** Extract first two consonant initials from email local part. */
function getConsonantInitials(email: string | undefined): string {
  if (!email) return 'G';
  const local = email.split('@')[0] || '';
  const vowels = 'aeiouAEIOU';
  const consonants = local.split('').filter((c) => /[a-zA-Z]/.test(c) && !vowels.includes(c));
  if (consonants.length >= 2) return (consonants[0] + consonants[1]).toUpperCase();
  if (consonants.length === 1) return consonants[0].toUpperCase();
  const alpha = local.split('').filter((c) => /[a-zA-Z]/.test(c));
  return alpha.length >= 2
    ? (alpha[0] + alpha[1]).toUpperCase()
    : alpha.length === 1
    ? alpha[0].toUpperCase()
    : 'G';
}

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { user, initialized } = useAuth();

  // ─── Loading Gate ──────────────────────────────────────────────
  // Show a branded loading screen while auth bootstraps.
  // The AuthProvider guarantees initialized=true within 8 seconds max.
  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-200 border-t-indigo-600" />
          <p className="text-sm text-slate-400 font-medium">กำลังเตรียมระบบ...</p>
        </div>
      </div>
    );
  }

  // ─── Auth Gate ─────────────────────────────────────────────────
  // Once initialized, redirect unauthenticated users to /auth.
  // This is safe because initialized=true guarantees the session
  // check has completed (either found a user or confirmed none).
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-56 flex-shrink-0 flex-col h-full">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileNavOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="lg:hidden fixed left-0 top-0 h-full w-56 z-50">
            <Sidebar onClose={() => setMobileNavOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center gap-3 px-4 lg:px-5 py-3 bg-white border-b border-slate-100 shadow-sm flex-shrink-0">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <Menu size={18} />
          </button>

          {/* Search */}
          <GlobalSearch />

          {/* Right Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => window.location.reload()}
              className="hidden md:flex p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Refresh data"
            >
              <RefreshCw size={16} />
            </button>
            <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 border border-white" />
            </button>
            <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <Trophy size={16} className="text-amber-500" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center ml-1">
              <span className="text-white text-xs font-semibold">{getConsonantInitials(user?.email)}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
