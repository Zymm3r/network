import { useI18n } from '../i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Route, ChevronRight, CheckCircle2, Clock, BookOpen } from 'lucide-react';

const mockPaths = [
  {
    id: '1',
    name_th: 'พื้นฐานการสร้างเครือข่าย',
    name_en: 'Network Fundamentals',
    description_th: 'เรียนรู้พื้นฐานการสร้างเครือข่ายตั้งแต่เริ่มต้น',
    description_en: 'Learn networking basics from scratch',
    level: 'beginner',
    courses_count: 5,
    duration_hours: 20,
    progress: 0,
    path_type: 'sequential',
  },
  {
    id: '2',
    name_th: 'การเชื่อมต่อและโปรโตคอล',
    name_en: 'Connections & Protocols',
    description_th: 'เข้าใจการเชื่อมต่อและโปรโตคอลต่างๆ',
    description_en: 'Understand connections and protocols',
    level: 'intermediate',
    courses_count: 4,
    duration_hours: 16,
    progress: 25,
    path_type: 'milestone',
  },
  {
    id: '3',
    name_th: 'การแก้ปัญหาเครือข่าย',
    name_en: 'Network Troubleshooting',
    description_th: 'ฝึกทักษะการแก้ปัญหาเครือข่าย',
    description_en: 'Practice network troubleshooting skills',
    level: 'advanced',
    courses_count: 6,
    duration_hours: 24,
    progress: 60,
    path_type: 'optional',
  },
];

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">เส้นทางการเรียนรู้</h1>
        <p className="text-muted-foreground">เลือกเส้นทางที่เหมาะกับคุณ</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPaths.map((path) => {
          const name = language === 'th' ? path.name_th : path.name_en;
          const description = language === 'th' ? path.description_th : path.description_en;

          return (
            <Card key={path.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Route className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className={levelColors[path.level]}>
                    {t.levels[path.level as keyof typeof t.levels]}
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
                    <span>{path.courses_count} หลักสูตร</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{path.duration_hours} ชั่วโมง</span>
                  </div>
                </div>

                {path.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ความก้าวหน้า</span>
                      <span className="font-medium">{path.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${path.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary" className="text-xs">
                    {pathTypeLabels[path.path_type]}
                  </Badge>
                  <Button size="sm" className="gap-1">
                    {path.progress > 0 ? 'เรียนต่อ' : 'เริ่มเรียน'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
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