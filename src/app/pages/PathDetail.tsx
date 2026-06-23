import { useParams, Link, useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useCourses } from '../hooks/useCourses';
import { usePath } from '../hooks/usePaths';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeft, Clock, BookOpen, ChevronRight, Route, CheckCircle2 } from 'lucide-react';

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
};

const pathTypeLabels: Record<string, string> = {
  sequential: 'ลำดับ',
  milestone: 'เส้นทาง',
  optional: 'เลือกเอง',
};

export function PathDetail() {
  const { pathId } = useParams();
  const { language, t } = useI18n();
  const navigate = useNavigate();

  const { courses, loading: coursesLoading } = useCourses({ limit: 100 });
  const { path, loading: pathLoading } = usePath(pathId || '');

  const loading = coursesLoading || pathLoading;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!path) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold mb-2">{t.paths.notFound}</h2>
        <p className="text-muted-foreground mb-4">{t.paths.notFoundDesc}</p>
        <Button onClick={() => navigate('/paths')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.paths.backToPaths}
        </Button>
      </div>
    );
  }

  const name = path[`name_${language}` as 'name_th' | 'name_en'];
  const description = path[`description_${language}` as 'description_th' | 'description_en'];
  const courseIds = path.modules || [];
  const pathCourses = courses.filter(c => courseIds.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        to="/paths"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.common.back}
      </Link>

      {/* Path Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 md:p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Route className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${levelColors[path.level]} border`}>
                {t.levels[path.level]}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {pathTypeLabels[path.path_type]}
              </Badge>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{name}</h1>
          {description && (
            <p className="text-indigo-100 mb-4 max-w-2xl">{description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{courseIds.length} หลักสูตร</span>
            </div>
            {path.estimated_hours && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{path.estimated_hours} ชั่วโมง</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      {path.modules && path.modules.length > 0 && (
        <Card className="border-slate-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">ความก้าวหน้า</span>
              <span className="text-sm font-bold text-indigo-600">0%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                style={{ width: `0%` }}
              />
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>0/{path.modules.length} หลักสูตรที่เสร็จสิ้น</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4">หลักสูตรในเส้นทาง ({courseIds.length})</h2>
        {pathCourses.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t.paths.coursesWhenReady}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {pathCourses.map((course, index) => {
              const courseName = course[`name_${language}` as 'name_th' | 'name_en'];

              return (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-slate-100">
                    <CardContent className="pt-4 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{courseName}</div>
                        <div className="text-sm text-muted-foreground">
                          {course.min_modules || 1} บท
                        </div>
                      </div>
                      <Badge className={`${levelColors[course.level]} border`}>
                        {t.levels[course.level]}
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}