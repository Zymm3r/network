import { useState } from 'react';
import { Navigate } from 'react-router';
import { useI18n } from '../i18n';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Network, Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export function Auth() {
  const { language, setLanguage } = useI18n();
  const { sendMagicLink, signInWithGoogle, user, initialized, cooldownRemaining } = useAuth();

  // Local form state — ALL hooks must be declared before any early returns
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkSent, setLinkSent] = useState(false);

  // If already authenticated, redirect to courses page
  if (initialized && user) {
    return <Navigate to="/courses" replace />;
  }

  const handleSendLink = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (loading || cooldownRemaining > 0) return; // prevent double-submit

    setLoading(true);
    setError(null);

    try {
      await sendMagicLink(email);
      setLinkSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : language === 'th'
          ? 'ส่งลิงก์ไม่สำเร็จ กรุณาลองใหม่'
          : 'Failed to send link. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIjxzdmc+')] opacity-10" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg shadow-indigo-500/30">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Network 101</h1>
          <p className="text-indigo-300 mt-2">
            {language === 'th' ? 'การสร้างเครือข่ายพื้นฐาน' : 'Network Fundamentals'}
          </p>
        </div>

        <Card className="border-slate-800 bg-slate-900/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">
              {language === 'th' ? 'ยินดีต้อนรับ' : 'Welcome'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {language === 'th'
                ? 'กรอกอีเมลเพื่อรับลิงก์เข้าสู่ระบบ ไม่ต้องใช้รหัสผ่าน'
                : 'Enter your email to receive a sign-in link. No password needed.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {linkSent ? (
              /* Success State */
              <div className="flex flex-col items-center text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {language === 'th' ? 'ส่งลิงก์แล้ว!' : 'Link Sent!'}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                    {language === 'th'
                      ? `เราส่งลิงก์เข้าสู่ระบบไปที่`
                      : `We sent a sign-in link to`}
                  </p>
                  <p className="text-indigo-300 font-medium text-sm break-all">{email}</p>
                  <p className="text-slate-500 text-xs mt-2">
                    {language === 'th'
                      ? 'กรุณาตรวจสอบอีเมลและคลิกลิงก์เพื่อเข้าสู่ระบบ'
                      : 'Please check your email and click the link to sign in.'}
                  </p>
                </div>

                <div className="flex flex-col gap-2 w-full pt-2">
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    onClick={() => {
                      setLinkSent(false);
                      setEmail('');
                    }}
                  >
                    {language === 'th' ? 'ใช้อีเมลอื่น' : 'Use a different email'}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-slate-400 hover:text-white"
                    onClick={handleSendLink}
                    disabled={loading || cooldownRemaining > 0}
                  >
                    {cooldownRemaining > 0 ? (
                      language === 'th'
                        ? `ส่งลิงก์อีกครั้งใน ${cooldownRemaining} วินาที`
                        : `Resend link in ${cooldownRemaining}s`
                    ) : (
                      language === 'th' ? 'ส่งลิงก์อีกครั้ง' : 'Resend link'
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              /* Email Form */
              <form onSubmit={handleSendLink} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="magic-email" className="text-slate-300">
                    {language === 'th' ? 'ที่อยู่อีเมล' : 'Email address'}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input
                      id="magic-email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-800 border-slate-700 text-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded">{error}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                  disabled={loading || cooldownRemaining > 0}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2" />
                      {language === 'th' ? 'กำลังส่ง...' : 'Sending...'}
                    </>
                  ) : cooldownRemaining > 0 ? (
                    <>
                      {language === 'th'
                        ? `กรุณารออีก ${cooldownRemaining} วินาที`
                        : `Please wait ${cooldownRemaining}s`}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      {language === 'th' ? 'ส่งลิงก์เข้าสู่ระบบ' : 'Send Magic Link'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center leading-relaxed">
                  {language === 'th'
                    ? 'ไม่ต้องสร้างรหัสผ่าน — เราจะส่งลิงก์ไปยังอีเมลของคุณเพื่อเข้าสู่ระบบทุกครั้ง เซสชันจะคงอยู่ 3 วัน'
                    : 'No password required — we\'ll email you a secure link to sign in. Sessions last 3 days.'}
                </p>
              </form>
            )}

            {!linkSent && (
              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-900/80 px-2 text-slate-500">
                      {language === 'th' ? 'หรือดำเนินการต่อด้วย' : 'Or continue with'}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  onClick={async () => {
                    setLoading(true);
                    try {
                      await signInWithGoogle();
                    } catch (err) {
                      setError(language === 'th' ? 'เกิดข้อผิดพลาดในการเชื่อมต่อ Google' : 'Failed to connect to Google');
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 border-none flex items-center justify-center font-medium shadow-md"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    <path fill="none" d="M1 1h22v22H1z" />
                  </svg>
                  {language === 'th' ? 'เข้าสู่ระบบด้วย Google' : 'Sign in with Google'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Language Toggle */}
        <div className="mt-6 text-center">
          <Button
            variant="link"
            onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
            className="text-slate-400 hover:text-white"
          >
            {language === 'th' ? 'English' : 'ภาษาไทย'}
          </Button>
        </div>
      </div>
    </div>
  );
}