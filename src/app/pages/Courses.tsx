import { useState, useEffect, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { useI18n } from '../i18n';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { CourseCard } from '../components/course/CourseCard';
import { CourseFilters } from '../components/course/CourseFilters';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, Users, Clock, ArrowRight } from 'lucide-react';
import { useActivity } from '../contexts/ActivityContext';
import type { CourseLevel } from '../types';

function formatStudyTime(seconds: number, lang: 'th' | 'en') {
  if (seconds < 60) return lang === 'th' ? `${seconds} วินาที` : `${seconds} secs`;
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (days > 0) {
    return lang === 'th' 
      ? `${days} วัน ${hours} ชั่วโมง` 
      : `${days} days ${hours} hrs`;
  } else if (hours > 0) {
    return lang === 'th' 
      ? `${hours} ชม. ${minutes} นาที` 
      : `${hours} hrs ${minutes} mins`;
  } else {
    // Show minutes and seconds so it ticks live
    return lang === 'th' 
      ? `${minutes} นาที ${remainingSeconds} วินาที` 
      : `${minutes} mins ${remainingSeconds} secs`;
  }
}

export function CoursesContent() {
  const { t, language } = useI18n();
  const { user, initialized } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | undefined>(undefined);
  const { totalSeconds } = useActivity();

  // Route-level logging
  useEffect(() => {
    console.log('[Courses Auth Guard] Mount check:', { initialized, hasUser: !!user });
  }, [initialized, user]);

  const { courses, loading, error } = useCourses({
    level: selectedLevel,
    limit: 50,
  });

  const [courseCount, setCourseCount] = useState<number | null>(null);
  const [studentCount, setStudentCount] = useState<number | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);

        // 1. Fetch Course Count
        const { count: cCount, error: cErr } = await supabase
          .from('courses')
          .select('id', { count: 'exact', head: true });
        
        if (!cErr && cCount !== null) {
          setCourseCount(cCount);
        }

        // 2. Fetch Student Count via RPC
        const { data: sCount, error: sErr } = await supabase
          .rpc('get_active_students_count');
        
        if (!sErr && sCount !== null) {
          setStudentCount(sCount);
        }

        // Removed the total study time fetch because it's now handled by ActivityContext

      } catch (err) {
        console.error('[Dashboard Stats Log] Failed to restore dashboard stats:', err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user?.id]);

  const stats = [
    { icon: BookOpen, label: language === 'th' ? 'หลักสูตร' : 'Courses', value: statsLoading ? '...' : courseCount !== null ? `${courseCount} ${language === 'th' ? 'หลักสูตร' : 'Courses'}` : '0', color: 'bg-indigo-100 text-indigo-600' },
    { icon: Users, label: language === 'th' ? 'ผู้เรียน' : 'Students', value: statsLoading ? '...' : studentCount !== null ? `${studentCount} ${language === 'th' ? 'คน' : 'Students'}` : '0', color: 'bg-green-100 text-green-600' },
    { icon: Clock, label: language === 'th' ? 'เวลาเรียนทั้งหมด' : 'Total Study Time', value: statsLoading ? '...' : formatStudyTime(totalSeconds, language), color: 'bg-amber-100 text-amber-600' },
  ];

  // Auth Render Protection
  if (!initialized || (initialized && !user)) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 md:p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Network Fundamentals 101</h1>
          <p className="text-indigo-100 mb-4">เรียนรู้การสร้างเครือข่ายตั้งแต่พื้นฐานสู่การปฏิบัติ</p>
          <div className="flex flex-wrap gap-3">
            <div className="px-3 py-1.5 bg-white/20 rounded-lg text-sm font-medium">
              🔌 พื้นฐานเครือข่าย
            </div>
            <div className="px-3 py-1.5 bg-white/20 rounded-lg text-sm font-medium">
              🌐 Internet Protocols
            </div>
            <div className="px-3 py-1.5 bg-white/20 rounded-lg text-sm font-medium">
              🔒 Network Security
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-slate-100">
            <CardContent className="pt-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">หลักสูตรทั้งหมด</h2>
        <CourseFilters
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-600 border border-red-100">
          {t.common.error}: {error.message}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">ยังไม่มีหลักสูตร</p>
            <p className="text-sm text-muted-foreground mt-1">กรองหรือล้างตัวกรองเพื่อดูหลักสูตรอื่น</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...courses].sort((a, b) => {
            const levelOrder: Record<string, number> = { beginner: 1, intermediate: 2, advanced: 3 };
            return (levelOrder[a.level] || 99) - (levelOrder[b.level] || 99);
          }).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

// Route-level Error Boundary for Courses
class CoursesErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Courses ErrorBoundary] Caught render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-[50vh] flex-col space-y-4">
          <div className="p-4 bg-red-50 text-red-600 rounded-lg max-w-md text-center border border-red-100">
            <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
            <p className="text-sm">{this.state.error?.message || 'An unexpected error occurred while loading the courses.'}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function Courses() {
  return (
    <CoursesErrorBoundary>
      <CoursesContent />
    </CoursesErrorBoundary>
  );
}