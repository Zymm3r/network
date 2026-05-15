import { useState } from 'react';
import { useI18n } from '../i18n';
import { useCourses } from '../hooks/useCourses';
import { CourseCard } from '../components/course/CourseCard';
import { CourseFilters } from '../components/course/CourseFilters';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, Users, Award, ArrowRight } from 'lucide-react';
import type { CourseLevel } from '../types';

export function Courses() {
  const { t } = useI18n();
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | undefined>(undefined);

  const { courses, loading, error } = useCourses({
    level: selectedLevel,
    limit: 50,
  });

  const stats = [
    { icon: BookOpen, label: 'หลักสูตร', value: '12+', color: 'bg-indigo-100 text-indigo-600' },
    { icon: Users, label: 'ผู้เรียน', value: '500+', color: 'bg-green-100 text-green-600' },
    { icon: Award, label: 'ใบรับรอง', value: '8', color: 'bg-amber-100 text-amber-600' },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}