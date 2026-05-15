import { Link } from 'react-router';
import { useI18n } from '../i18n';
import { usePaths } from '../hooks/usePaths';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Route, ChevronRight, CheckCircle2, Clock, BookOpen } from 'lucide-react';

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800 border-green-200',
  intermediate: 'bg-amber-100 text-amber-800 border-amber-200',
  advanced: 'bg-red-100 text-red-800 border-red-200',
};

const pathTypeLabels: Record<string, string> = {
  sequential: 'ลำดับ',
  milestone: 'เส้นทาง',
  optional: 'เลือกเอง',
};

export function Paths() {
  const { language, t } = useI18n();
  const { paths, loading } = usePaths();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">เส้นทางการเรียนรู้</h1>
          <p className="text-muted-foreground">เลือกเส้นทางที่เหมาะกับคุณ</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">เส้นทางการเรียนรู้</h1>
        <p className="text-muted-foreground">เลือกเส้นทางที่เหมาะกับคุณ</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paths.map((path) => {
          const name = language === 'th' ? path.name_th : path.name_en;
          const description = language === 'th' ? path.description_th : path.description_en;
          const courseCount = path.modules?.length || 0;

          return (
            <Link key={path.id} to={`/paths/${path.id}`} className="block">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Route className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className={levelColors[path.path_type] || ''}>
                    {pathTypeLabels[path.path_type] || path.path_type}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription className="mt-1">{description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{courseCount} หลักสูตร</span>
                  </div>
                  {path.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{path.duration}</span>
                    </div>
                  )}
                </div>

                {path.price != null && (
                  <div className="text-lg font-bold text-indigo-600">
                    {path.price === 0 ? 'ฟรี' : `${path.price} ฿`}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  {path.availability && (
                    <Badge variant="secondary" className="text-xs capitalize">
                      {path.availability}
                    </Badge>
                  )}
                  <Button size="sm" className="gap-1">
                    เริ่มเรียน
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            </Link>
          );
        })}
      </div>

      {/* Progress Summary */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">เส้นทางการเรียนรู้ของคุณ</h3>
              <p className="text-sm text-muted-foreground mt-1">ติดตามความก้าวหน้าในเส้นทางที่คุณเลือก</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>1/3 เส้นทางที่เริ่มต้น</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}