import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../i18n';
import { analyticsApi, StudentMetrics, AdminMetrics, HardestExercise } from '../lib/api/analytics';
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { BookOpen, CheckCircle, GraduationCap, Clock, Award, Activity, Users, AlertCircle, Play, Flame, Star, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Link } from 'react-router';
=======
import { Card, CardContent, CardHeader, CardTitle } from '../lib/components/ui/card';
import { Skeleton } from '../lib/components/ui/skeleton';
import { BookOpen, CheckCircle, GraduationCap, Clock, Award, Activity, Users, AlertCircle, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../lib/components/ui/alert';
>>>>>>> origin/main

export function Dashboard() {
  const { user } = useAuth();
  const { language, t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [studentMetrics, setStudentMetrics] = useState<StudentMetrics | null>(null);
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics | null>(null);
  const [hardestExercises, setHardestExercises] = useState<HardestExercise[]>([]);

  const isAdmin = user?.role === 'admin' || user?.role === 'instructor';

  useEffect(() => {
    async function loadMetrics() {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        
        if (isAdmin) {
          const [adminRes, hardestRes] = await Promise.all([
            analyticsApi.getAdminMetrics(),
            analyticsApi.getHardestExercises(5)
          ]);
          setAdminMetrics(adminRes);
          setHardestExercises(hardestRes);
        } else {
          const res = await analyticsApi.getStudentMetrics(user.id);
          setStudentMetrics(res);
        }
      } catch (err: any) {
        console.error('Error loading dashboard metrics:', err);
        setError(err.message || 'Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    }
    
    loadMetrics();
  }, [user, isAdmin]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Handle case where migration might not be applied
  const isPendingMigration = isAdmin ? !adminMetrics : !studentMetrics;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8 pb-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t.common.error}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isPendingMigration && !error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{t.dashboardAnalytics.syncPending}</AlertTitle>
          <AlertDescription>
            {t.dashboardAnalytics.syncPendingDesc}
          </AlertDescription>
        </Alert>
      )}

      {!isAdmin && studentMetrics && (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Top Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-8 sm:p-10 text-white shadow-xl">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left space-y-2 flex-1">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {getGreeting()}, {user.email?.split('@')[0]}!
                </h2>
                <p className="text-indigo-100 text-lg opacity-90 max-w-md">
                  Keep up the great work. You're on a <strong className="text-white">{studentMetrics.streak_days}-day learning streak! 🔥</strong>
                </p>
                <div className="pt-4 flex gap-3 justify-center md:justify-start">
                  <Link to="/courses" className="inline-flex items-center justify-center rounded-full bg-white text-indigo-600 px-6 py-2.5 text-sm font-semibold shadow-sm hover:bg-indigo-50 transition-colors">
                    <Play className="w-4 h-4 mr-2" />
                    Resume Learning
                  </Link>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full sm:w-72 text-center shadow-inner">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <div className="text-sm font-semibold text-indigo-50 uppercase tracking-widest">Level {studentMetrics.level}</div>
                </div>
                <div className="text-5xl font-black mb-4 tracking-tighter">
                  {studentMetrics.xp} <span className="text-2xl text-indigo-200 font-medium tracking-normal">XP</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(studentMetrics.xp % 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-indigo-100 font-medium flex justify-between px-1">
                  <span>Current Progress</span>
                  <span>{100 - (studentMetrics.xp % 100)} XP to Next Level</span>
                </div>
              </div>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-purple-900 opacity-20 blur-3xl pointer-events-none"></div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Card className="rounded-2xl border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Enrolled</p>
                    <p className="text-2xl font-bold text-slate-900">{studentMetrics.enrolled_courses}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Completed</p>
                    <p className="text-2xl font-bold text-slate-900">{studentMetrics.completed_lessons}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Study Time</p>
                    <p className="text-2xl font-bold text-slate-900">{Math.ceil(studentMetrics.study_time / 60)}<span className="text-sm font-normal text-slate-500 ml-1">hrs</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-sm bg-white/50 backdrop-blur-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Streak</p>
                    <p className="text-2xl font-bold text-slate-900">{studentMetrics.streak_days}<span className="text-sm font-normal text-slate-500 ml-1">days</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl shadow-sm border-slate-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-500" />
                  Learning Activity
                </CardTitle>
                <CardDescription>Your performance across all exercises.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700">Exercise Success Rate</span>
                      <span className="font-bold text-indigo-600">{studentMetrics.avg_score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${studentMetrics.avg_score}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-slate-700">Overall Completion Rate</span>
                      <span className="font-bold text-indigo-600">{studentMetrics.completion_rate}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${studentMetrics.completion_rate}%` }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-100">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Achievements
                </CardTitle>
                <CardDescription>Milestones you have reached.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3 border border-slate-100">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">First Steps</p>
                      <p className="text-xs text-slate-500 mt-1">Enrolled in 1+ courses</p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl flex items-start gap-3 border ${studentMetrics.completed_lessons >= 10 ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Zap className={`w-5 h-5 ${studentMetrics.completed_lessons >= 10 ? 'text-indigo-500' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Fast Learner</p>
                      <p className="text-xs text-slate-500 mt-1">Completed 10+ lessons</p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl flex items-start gap-3 border ${studentMetrics.study_time >= 600 ? 'bg-purple-50 border-purple-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Clock className={`w-5 h-5 ${studentMetrics.study_time >= 600 ? 'text-purple-500' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Dedicated</p>
                      <p className="text-xs text-slate-500 mt-1">10+ hours studied</p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl flex items-start gap-3 border ${studentMetrics.streak_days >= 7 ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100 opacity-60'}`}>
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Flame className={`w-5 h-5 ${studentMetrics.streak_days >= 7 ? 'text-orange-500 fill-orange-500' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Unstoppable</p>
                      <p className="text-xs text-slate-500 mt-1">7-day learning streak</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Admin Dashboard remains unchanged mostly, just modernized card borders */}
      {isAdmin && adminMetrics && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="rounded-2xl shadow-sm border-slate-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.activeUsers}
                </CardTitle>
                <Users className="w-5 h-5 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{adminMetrics.active_users}</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.courseCompletions}
                </CardTitle>
                <GraduationCap className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{adminMetrics.course_completions}</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.exerciseSuccessRate}
                </CardTitle>
                <CheckCircle className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{adminMetrics.exercise_success_rate}%</div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.avgAttempts}
                </CardTitle>
                <Activity className="w-5 h-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{adminMetrics.avg_attempts.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.dashboardAnalytics.attemptsUnit}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-sm border-slate-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.firstPassRate}
                </CardTitle>
                <Award className="w-5 h-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">{adminMetrics.first_pass_success_rate}%</div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4 tracking-tight text-slate-900">
            {t.dashboardAnalytics.hardestExercises}
          </h2>
          <div className="grid gap-4">
            {hardestExercises.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t.dashboardAnalytics.noData}</p>
            ) : (
              hardestExercises.map((ex, idx) => (
                <Card key={ex.exercise_id} className="border-slate-100 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center font-bold text-indigo-600">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{ex.exercise_name || t.dashboardAnalytics.unknownExercise}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{t.dashboardAnalytics.attemptsCount.replace('{count}', String(ex.total_attempts))}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-rose-500 text-lg">{ex.success_rate}%</div>
                      <p className="text-xs text-slate-500">{t.dashboardAnalytics.successRate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
