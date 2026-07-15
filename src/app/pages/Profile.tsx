import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useAuth } from '../hooks/useAuth';
import { useEnrollments, useUserProgressSummary } from '../hooks/useProgress';
<<<<<<< HEAD
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';

import { getInitials } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { BookOpen, Award, LogOut, Clock, Trophy, Target, Zap, Play, ChevronRight, AlertTriangle } from 'lucide-react';
=======
import { Card, CardContent, CardHeader, CardTitle } from '../lib/components/ui/card';
import { Avatar, AvatarFallback } from '../lib/components/ui/avatar';

import { getInitials } from '../lib/utils';
import { Button } from '../lib/components/ui/button';
import { Progress } from '../lib/components/ui/progress';
import { Badge } from '../lib/components/ui/badge';
import { BookOpen, Award, LogOut, Clock, Trophy, Target, Zap, Play, ChevronRight } from 'lucide-react';
>>>>>>> origin/main
import { supabase } from '../lib/supabase';

export function Profile() {
  const { language, t } = useI18n();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { enrollments, loading: enrollmentsLoading } = useEnrollments({
    userId: user?.id || '',
  });

  const [courses, setCourses] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<any[]>([]);

  const [statsLoading, setStatsLoading] = useState(true);



  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) {
        setStatsLoading(false);
        return;
      }
      try {
        setStatsLoading(true);
        // Fetch courses, lessons, and user progress in parallel
        const [
          { data: coursesData },
          { data: lessonsData },
          { data: progressData },
          { data: certData }
        ] = await Promise.all([
          supabase.from('courses').select('*'),
          supabase.from('lessons').select('*'),
          supabase.from('user_progress').select('*').eq('user_id', user.id)
        ]);

        setCourses(coursesData || []);
        setLessons(lessonsData || []);
        setUserProgress(progressData || []);
      } catch (err) {
        console.error('Error fetching profile data:', err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.id]);

  // Determine if loading
  const isPageLoading = user ? (enrollmentsLoading || statsLoading) : false;

  // 1. Calculate Courses Enrolled
  const coursesEnrolled = user ? enrollments.length : 0;

  // 2. Calculate Completed Lessons
  const completedLessons = user
    ? userProgress.filter((up) => up.status === 'completed' && up.lesson_id)
    : [];
  const completedLessonsCount = completedLessons.length;

  // 3. Calculate Hours Learned (sum of completed lesson duration_minutes / 60)
  const totalMinutes = completedLessons.reduce((sum, up) => {
    const lesson = lessons.find((l) => l.id === up.lesson_id);
    return sum + (lesson?.duration_minutes || 0);
  }, 0);
  const hoursLearned = Math.ceil(totalMinutes / 60);

  // 4. Calculate Streak
  // Collect all unique activity dates in YYYY-MM-DD local format
  const activityDates: string[] = [];
  if (user) {
    userProgress.forEach((up) => {
      if (up.last_accessed_at) {
        activityDates.push(new Date(up.last_accessed_at).toLocaleDateString('en-CA'));
      }
      if (up.completed_at) {
        activityDates.push(new Date(up.completed_at).toLocaleDateString('en-CA'));
      }
    });
    enrollments.forEach((e) => {
      if (e.enrolled_at) {
    activityDates.push(new Date(e.enrolled_at).toLocaleDateString('en-CA'));
      }
    });
  }

  const calculateStreak = (dates: string[]): number => {
    if (dates.length === 0) return 0;
    const uniqueSorted = Array.from(new Set(dates)).sort().reverse();
    const todayStr = new Date().toLocaleDateString('en-CA');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString('en-CA');

    // If the most recent activity is neither today nor yesterday, the streak is broken (0)
    if (uniqueSorted[0] !== todayStr && uniqueSorted[0] !== yesterdayStr) {
      return 0;
    }

    let streakVal = 1;
    let currentDate = new Date(uniqueSorted[0]);

    for (let i = 1; i < uniqueSorted.length; i++) {
      const nextDate = new Date(uniqueSorted[i]);
      const diffTime = Math.abs(currentDate.getTime() - nextDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streakVal++;
        currentDate = nextDate;
      } else if (diffDays > 1) {
        break;
      }
    }
    return streakVal;
  };

  const streak = calculateStreak(activityDates);

  // 4.5. Resume Learning (Latest accessed lesson)
  const latestAccessed = userProgress.length > 0
    ? [...userProgress]
        .filter(p => p.status === 'in_progress')
        .sort((a, b) => new Date(b.last_accessed_at).getTime() - new Date(a.last_accessed_at).getTime())[0]
      || [...userProgress].sort((a, b) => new Date(b.last_accessed_at).getTime() - new Date(a.last_accessed_at).getTime())[0]
    : null;

  const latestLessonObj = latestAccessed ? lessons.find(l => l.id === latestAccessed.lesson_id) : null;
  const latestCourseObj = latestLessonObj ? courses.find(c => c.id === latestLessonObj.course_id) : null;

  // 5. Course Completion List & Overall Progress Calculation
  const enrolledCourseProgressList = user
    ? enrollments.map((enrollment) => {
        const courseLessons = lessons.filter((l) => l.course_id === enrollment.course_id);
        const completedCourseLessons = completedLessons.filter((cl) =>
          courseLessons.some((l) => l.id === cl.lesson_id)
        );
        const progressPercent =
          courseLessons.length > 0
            ? Math.round((completedCourseLessons.length / courseLessons.length) * 100)
            : 0;

        // Resolve course name
        const courseObj = courses.find((c) => c.id === enrollment.course_id);
        const courseName = courseObj
          ? (courseObj[`name_${language}` as 'name_th' | 'name_en'] || courseObj.name_th || courseObj.name_en)
          : enrollment.course_id;

        // Status description
        let statusText = t.profileStats.statusEnrolled;
        if (progressPercent === 100) {
          statusText = t.profileStats.statusCompleted;
        } else if (progressPercent > 0) {
          statusText = t.profileStats.statusInProgress;
        }

        return {
          id: enrollment.course_id,
          name: courseName,
          progress: progressPercent,
          status: statusText,
          enrolledAt: enrollment.enrolled_at,
          enrollmentStatus: enrollment.status,
        };
      })
    : [];

  const overallProgress =
    enrolledCourseProgressList.length > 0
      ? Math.round(
          enrolledCourseProgressList.reduce((sum, item) => sum + item.progress, 0) /
            enrolledCourseProgressList.length
        )
      : 0;

  const coursesCompletedCount = enrolledCourseProgressList.filter(
    (item) => item.progress === 100 || item.enrollmentStatus === 'completed'
  ).length;

  // Default courses shown when user is not enrolled in any courses (guest or new user)
  const defaultCourses = [
    {
      id: 'ccna-001',
      name: t.profileStats.defaultCcna,
      progress: 0,
      status: t.profileStats.statusNotStarted,
    },
    {
      id: 'devnet-001',
      name: t.profileStats.defaultDevNet,
      progress: 0,
      status: t.profileStats.statusNotStarted,
    },
    {
      id: 'sec-001',
      name: t.profileStats.defaultSec,
      progress: 0,
      status: t.profileStats.statusNotStarted,
    },
  ];

  const courseProgressDisplay =
    enrolledCourseProgressList.length > 0
      ? enrolledCourseProgressList.slice(0, 3)
      : defaultCourses;

  // 6. Dynamic Achievements calculations
  const achievements = [
    { icon: '🎯', label: t.profileStats.starter, earned: !!user },
    {
      icon: '📚',
      label: t.profileStats.achFirstCourse,
      earned: coursesEnrolled >= 1,
    },
    { icon: '🔥', label: t.profileStats.achStreak5, earned: streak >= 5 },
    {
      icon: '⭐',
      label: t.profileStats.achPoints10,
      earned: completedLessonsCount >= 2,
    },
    {
      icon: '🏆',
      label: t.profileStats.achCourseComp,
      earned: coursesCompletedCount >= 1,
    },
    {
      icon: '💎',
      label: t.profileStats.achPro,
      earned: completedLessonsCount >= 5 || coursesEnrolled >= 3,
    },
  ];

  if (isPageLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="text-muted-foreground text-sm">
          {t.profileStats.loading}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">
          {t.profileStats.myProfile}
        </h1>
        <p className="text-muted-foreground">
          {t.profileStats.desc}
        </p>
      </div>

      {/* Profile Card */}
      <Card className="border-slate-100 overflow-hidden bg-white/60 backdrop-blur-md shadow-sm">
        <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />
        <CardContent className="relative pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 pb-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarFallback className="text-2xl bg-indigo-600 text-white font-bold">
                {getInitials(user?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <h2 className="text-xl font-semibold">{user?.email || t.profileStats.guestUser}</h2>
              <p className="text-sm text-muted-foreground">
                {t.profileStats.roleStudent}
              </p>
            </div>
            {!user ? (
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate('/auth')}
                className="mb-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-500/10"
              >
                {t.profileStats.signIn}
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={signOut} className="mb-2 transition-all hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200">
                <LogOut className="w-4 h-4 mr-1" />
                {t.profileStats.signOut}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border-indigo-100/60 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
          <CardContent className="pt-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-100/80 flex items-center justify-center mb-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{coursesEnrolled}</div>
            <div className="text-xs text-muted-foreground font-medium">
              {t.profileStats.courses}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 border-green-100/60 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
          <CardContent className="pt-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-green-100/80 flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{completedLessonsCount}</div>
            <div className="text-xs text-muted-foreground font-medium">
              {t.profileStats.completed}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 border-amber-100/60 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
          <CardContent className="pt-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{hoursLearned}</div>
            <div className="text-xs text-muted-foreground font-medium">
              {t.profileStats.hours}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50/50 to-pink-50/50 border-rose-100/60 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]">
          <CardContent className="pt-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-rose-100/80 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-rose-600 animate-pulse" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{streak}</div>
            <div className="text-xs text-muted-foreground font-medium">
              {t.profileStats.streakDays}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume Learning */}
      {latestLessonObj && (
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-700 shadow-md text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
          <CardContent className="p-6 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">
                  {t.profileStats.resumeTitle}
                </h3>
                <p className="text-indigo-100 text-sm mb-1">
                  {latestLessonObj[`title_${language}` as 'title_th' | 'title_en']}
                </p>
                <p className="text-indigo-200 text-xs">
                  {latestCourseObj ? (latestCourseObj[`name_${language}` as 'name_th' | 'name_en'] || latestCourseObj.name_th || latestCourseObj.name_en) : ''}
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate(`/lessons/${latestLessonObj.id}`)}
              className="bg-white text-indigo-600 hover:bg-indigo-50 shrink-0 w-full sm:w-auto"
            >
              {t.profileStats.continueBtn}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Learning Progress */}
      <Card className="bg-white/60 backdrop-blur-md shadow-sm border-slate-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Target className="w-5 h-5 text-indigo-600" />
            {t.profileStats.progressTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">
                {t.profileStats.overallProgress}
              </span>
              <span className="text-sm font-semibold text-indigo-600">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3 bg-indigo-50" />
          </div>

          {/* Course Progress Display */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            {courseProgressDisplay.map((course, idx) => (
              <div key={course.id || idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">{course.name}</span>
                  <Badge variant={course.progress > 0 ? 'default' : 'secondary'} className="text-xs">
                    {course.status}
                  </Badge>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-gradient-to-br from-amber-50/40 to-orange-50/40 border-amber-100/70 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <Trophy className="w-5 h-5 text-amber-600" />
            {t.profileStats.achTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 shadow-sm ${
                  achievement.earned
                    ? 'bg-white border border-amber-100 hover:scale-[1.05]'
                    : 'bg-white/50 opacity-40 select-none'
                }`}
              >
                <span className="text-2xl filter drop-shadow-sm">{achievement.icon}</span>
                <span className="text-xs mt-2 font-semibold text-slate-700 text-center leading-tight">
                  {achievement.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>



      {/* My Courses */}
      <Card className="bg-white/60 backdrop-blur-md shadow-sm border-slate-100">
        <CardHeader>
          <CardTitle className="text-slate-800">
            {t.profileStats.myCoursesTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!user ? (
            <div className="text-center py-8 text-muted-foreground space-y-3">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>{t.profileStats.loginPrompt}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/auth')}
                className="mt-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50/50"
              >
                {t.profileStats.goToLoginBtn}
              </Button>
            </div>
          ) : enrolledCourseProgressList.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground space-y-3">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>{t.profileStats.noEnrolledCourses}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/courses')}
                className="mt-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50/50"
              >
                {t.profileStats.exploreCoursesBtn}
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {enrolledCourseProgressList.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white/80 hover:bg-slate-50/50 hover:border-indigo-100 hover:shadow-sm cursor-pointer transition-all duration-200"
                  onClick={() => navigate(`/courses/${enrollment.id}`)}
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-800 text-sm sm:text-base leading-tight">
                      {enrollment.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.profileStats.enrolledAt}
                      {new Date(enrollment.enrolledAt).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <Badge
                    variant={
                      enrollment.progress === 100
                        ? 'default'
                        : enrollment.progress > 0
                        ? 'secondary'
                        : 'outline'
                    }
                    className="ml-2 whitespace-nowrap text-xs font-medium"
                  >
                    {enrollment.status}
                  </Badge>
                </div>
              ))}
              <Button 
                  variant="outline" 
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100 mt-4"
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to completely reset your learning progress? This cannot be undone.')) {
                      try {
                        const { error: progressError } = await supabase
                          .from('user_progress')
                          .delete()
                          .eq('user_id', user.id);
                        if (progressError) throw progressError;

                        const { error: statsError } = await supabase
                          .from('user_stats')
                          .delete()
                          .eq('user_id', user.id);
                        if (statsError) throw statsError;

                        const { error: enrollmentsError } = await supabase
                          .from('enrollments')
                          .delete()
                          .eq('user_id', user.id);
                        if (enrollmentsError) throw enrollmentsError;

                        localStorage.removeItem('pending-progress-saves');
                        alert('Progress has been successfully reset. The page will now reload.');
                        window.location.reload();
                      } catch (e) {
                        alert('Failed to reset progress.');
                        console.error(e);
                      }
                    }
                  }}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Reset My Progress
                </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}