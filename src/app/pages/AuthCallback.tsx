import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../lib/supabase';
import { Network, CheckCircle2, XCircle } from 'lucide-react';

/**
 * Handles the magic link callback.
 * When the user clicks the magic link in their email, Supabase redirects
 * to this route with auth tokens in the URL hash.
 * Supabase client auto-detects and exchanges them for a session.
 */
export function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase client with `detectSessionInUrl: true` automatically
        // picks up the tokens from the URL hash fragment.
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setErrorMsg(error.message);
          setStatus('error');
          return;
        }

        if (data.session) {
          setStatus('success');
          // Short delay so the user sees the success animation
          setTimeout(() => {
            navigate('/courses', { replace: true });
          }, 1500);
        } else {
          // No session yet — tokens might not have been processed.
          // Listen for the auth state change event.
          const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
              setStatus('success');
              setTimeout(() => {
                navigate('/courses', { replace: true });
              }, 1500);
              subscription.unsubscribe();
            }
          });

          // Fallback timeout — if nothing happens in 8 seconds, show error
          setTimeout(() => {
            setStatus((prev) => {
              if (prev === 'loading') {
                setErrorMsg('ลิงก์หมดอายุหรือไม่ถูกต้อง กรุณาขอลิงก์ใหม่');
                return 'error';
              }
              return prev;
            });
          }, 8000);
        }
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
        setStatus('error');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIjxzdmc+')] opacity-10" />

      <div className="relative text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-2 shadow-lg shadow-indigo-500/30">
          <Network className="w-8 h-8 text-white" />
        </div>

        {status === 'loading' && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-400/30 border-t-indigo-400 mx-auto" />
            <p className="text-slate-300 text-sm">กำลังเข้าสู่ระบบ...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="text-white font-semibold text-lg">เข้าสู่ระบบสำเร็จ!</p>
            <p className="text-slate-400 text-sm">กำลังพาคุณไปหน้าหลักสูตร...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
              <XCircle className="w-7 h-7 text-red-400" />
            </div>
            <p className="text-white font-semibold text-lg">เข้าสู่ระบบไม่สำเร็จ</p>
            <p className="text-slate-400 text-sm max-w-xs mx-auto">{errorMsg}</p>
            <button
              onClick={() => navigate('/auth', { replace: true })}
              className="text-indigo-400 hover:text-indigo-300 text-sm underline underline-offset-4 transition-colors"
            >
              กลับไปหน้าเข้าสู่ระบบ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
