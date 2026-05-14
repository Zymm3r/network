import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Network, Mail, Lock, ArrowRight } from 'lucide-react';

export function Auth() {
  const { t, language, setLanguage } = useI18n();
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      navigate('/courses');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signUp(email, password);
      navigate('/courses');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'สมัครสมาชิกไม่สำเร็จ');
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
          <p className="text-indigo-300 mt-2">{language === 'th' ? 'การสร้างเครือข่ายพื้นฐาน' : 'Network Fundamentals'}</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">
              {language === 'th' ? 'ยินดีต้อนรับ' : 'Welcome'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {language === 'th' ? 'เข้าสู่ระบบเพื่อเริ่มต้นการเรียนรู้' : 'Sign in to start learning'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                <TabsTrigger value="signin" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-700">
                  {t.auth.login}
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-slate-300 data-[state=active]:text-white data-[state=active]:bg-slate-700">
                  {t.auth.signup}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-slate-300">{t.auth.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-slate-800 border-slate-700 text-white pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-slate-300">{t.auth.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-slate-800 border-slate-700 text-white pl-10"
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded">{error}</p>
                  )}
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                    {loading ? t.common.loading : t.auth.login}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-300">{t.auth.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-slate-800 border-slate-700 text-white pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-300">{t.auth.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-slate-800 border-slate-700 text-white pl-10"
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="text-sm text-red-400 bg-red-900/30 p-2 rounded">{error}</p>
                  )}
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                    {loading ? t.common.loading : t.auth.signup}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
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