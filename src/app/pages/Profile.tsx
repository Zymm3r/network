import { useI18n } from '../i18n';
import { useAuth } from '../hooks/useAuth';
import { useEnrollments } from '../hooks/useProgress';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { User, BookOpen, Award, LogOut, Clock, Trophy, Target, Zap } from 'lucide-react';

export function Profile() {
  const { language, t } = useI18n();
  const { user, signOut } = useAuth();

  const { enrollments, loading } = useEnrollments({
    userId: user?.id || '',
  });

  const getInitials = (email: string | undefined) => {
    if (!email) return 'G';
    return email.slice(0, 2).toUpperCase();
  };

  const stats = {
    coursesEnrolled: 3,
    coursesCompleted: 1,
    hoursLearned: 12,
    streak: 5,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">โปรไฟล์ของฉัน</h1>
        <p className="text-muted-foreground">ติดตามความก้าวหน้าการเรียนรู้ของคุณ</p>
      </div>

      {/* Profile Card */}
      <Card className="border-slate-100 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />
        <CardContent className="relative pt-0">
          <div className="flex items-end gap-4 -mt-10 pb-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarFallback className="text-2xl bg-indigo-600 text-white">
                {getInitials(user?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-2">
              <h2 className="text-xl font-semibold">{user?.email || 'Guest'}</h2>
              <p className="text-sm text-muted-foreground">นักเรียน</p>
            </div>
            <Button variant="outline" size="sm" onClick={signOut} className="mb-2">
              <LogOut className="w-4 h-4 mr-1" />
              ออกจากระบบ
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
          <CardContent className="pt-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold">{stats.coursesEnrolled}</div>
            <div className="text-xs text-muted-foreground">หลักสูตร</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardContent className="pt-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
            <div className="text-xs text-muted-foreground">เสร็จสิ้น</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
          <CardContent className="pt-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold">{stats.hoursLearned}</div>
            <div className="text-xs text-muted-foreground">ชั่วโมง</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100">
          <CardContent className="pt-4 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-rose-600" />
            </div>
            <div className="text-2xl font-bold">{stats.streak}</div>
            <div className="text-xs text-muted-foreground">วันติดต่อ</div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            ความก้าวหน้า
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">ภาพรวม</span>
              <span className="text-sm text-muted-foreground">33%</span>
            </div>
            <Progress value={33} className="h-3" />
          </div>

          {/* Course Progress */}
          <div className="space-y-4">
            {[
              { name: 'พื้นฐานการสร้างเครือข่าย', progress: 60, status: 'กำลังเรียน' },
              { name: 'การเชื่อมต่อและโปรโตคอล', progress: 20, status: 'เริ่มต้น' },
              { name: 'Network Security', progress: 0, status: 'ยังไม่เริ่ม' },
            ].map((course, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{course.name}</span>
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
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            ความสำเร็จ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: '🎯', label: 'เริ่มต้น', earned: true },
              { icon: '📚', label: 'หลักสูตรแรก', earned: true },
              { icon: '🔥', label: '5 วันติด', earned: true },
              { icon: '⭐', label: '10 คะแนน', earned: false },
              { icon: '🏆', label: 'เสร็จหลักสูตร', earned: false },
              { icon: '💎', label: 'Pro User', earned: false },
            ].map((achievement, i) => (
              <div
                key={i}
                className={`flex flex-col items-center p-3 rounded-xl ${
                  achievement.earned
                    ? 'bg-white'
                    : 'bg-white/50 opacity-50'
                }`}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <span className="text-xs mt-1 font-medium">{achievement.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* My Courses */}
      <Card>
        <CardHeader>
          <CardTitle>หลักสูตรของฉัน</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              กำลังโหลด...
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>ยังไม่มีหลักสูตร</p>
              <Button variant="link" className="mt-2">
                ไปหน้าหลักสูตร
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{enrollment.course_id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(enrollment.enrolled_at).toLocaleDateString('th-TH')}
                    </p>
                  </div>
                  <Badge
                    variant={
                      enrollment.status === 'completed'
                        ? 'default'
                        : enrollment.status === 'active'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {enrollment.status === 'completed' ? 'เสร็จ' : enrollment.status === 'active' ? 'กำลังเรียน' : 'ออก'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}