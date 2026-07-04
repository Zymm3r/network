import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../i18n';
import { analyticsApi, StudentMetrics, AdminMetrics, HardestExercise } from '../lib/api/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { BookOpen, CheckCircle, GraduationCap, Clock, Award, Activity, Users, AlertCircle, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

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
        <h1 className="text-3xl font-bold mb-6">{t.dashboardAnalytics.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  // Handle case where migration might not be applied
  const isPendingMigration = isAdmin ? !adminMetrics : !studentMetrics;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t.dashboardAnalytics.title}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isAdmin ? t.dashboardAnalytics.adminDesc : t.dashboardAnalytics.studentDesc}
        </p>
      </div>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {t.dashboardAnalytics.enrolledCourses}
              </CardTitle>
              <BookOpen className="w-5 h-5 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentMetrics.enrolled_courses}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t.dashboardAnalytics.coursesUnit}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {t.dashboardAnalytics.completedLessons}
              </CardTitle>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentMetrics.completed_lessons}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t.dashboardAnalytics.lessonsUnit}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {t.dashboardAnalytics.exerciseSuccess}
              </CardTitle>
              <Award className="w-5 h-5 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentMetrics.completed_exercises}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t.dashboardAnalytics.avgScore} {studentMetrics.avg_score}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {t.dashboardAnalytics.studyTime}
              </CardTitle>
              <Clock className="w-5 h-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{Math.ceil(studentMetrics.study_time / 60)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t.dashboardAnalytics.hoursUnit}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {t.dashboardAnalytics.completionRate}
              </CardTitle>
              <Activity className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{studentMetrics.completion_rate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {t.dashboardAnalytics.completedRateDesc}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {isAdmin && adminMetrics && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.activeUsers}
                </CardTitle>
                <Users className="w-5 h-5 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{adminMetrics.active_users}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.courseCompletions}
                </CardTitle>
                <GraduationCap className="w-5 h-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{adminMetrics.course_completions}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.exerciseSuccessRate}
                </CardTitle>
                <CheckCircle className="w-5 h-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{adminMetrics.exercise_success_rate}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.avgAttempts}
                </CardTitle>
                <Activity className="w-5 h-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{adminMetrics.avg_attempts.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.dashboardAnalytics.attemptsUnit}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-500">
                  {t.dashboardAnalytics.firstPassRate}
                </CardTitle>
                <Award className="w-5 h-5 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{adminMetrics.first_pass_success_rate}%</div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">
            {t.dashboardAnalytics.hardestExercises}
          </h2>
          <div className="grid gap-4">
            {hardestExercises.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t.dashboardAnalytics.noData}</p>
            ) : (
              hardestExercises.map((ex, idx) => (
                <Card key={ex.exercise_id} className="border-slate-100">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-500">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">{ex.exercise_name || t.dashboardAnalytics.unknownExercise}</p>
                        <p className="text-xs text-muted-foreground">{t.dashboardAnalytics.attemptsCount.replace('{count}', String(ex.total_attempts))}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-500">{ex.success_rate}%</div>
                      <p className="text-xs text-muted-foreground">{t.dashboardAnalytics.successRate}</p>
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
