import { CheckCircle2, Trophy, Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useI18n } from '../i18n';

interface LessonCompleteCardProps {
  completedAt: string;
}

export function LessonCompleteCard({ completedAt }: LessonCompleteCardProps) {
  const { language } = useI18n();

  const localeMap = {
    th: 'th-TH',
    en: 'en-US'
  } as const;

  const dateStr = new Date(completedAt).toLocaleDateString(localeMap[language], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const timeStr = new Date(completedAt).toLocaleTimeString(localeMap[language], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="overflow-hidden border-2 border-emerald-100 bg-gradient-to-b from-emerald-50/50 to-white shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="h-2 bg-emerald-500 w-full" />
      <CardContent className="p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {language === 'th' ? 'เรียนรู้บทเรียนนี้เสร็จสิ้นแล้ว' : 'Lesson Completed Successfully'}
        </h2>
        
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          <Trophy className="inline-block w-5 h-5 text-amber-500 mr-2 -mt-1" />
          {language === 'th' 
            ? 'ยินดีด้วย! คุณเรียนบทเรียนนี้ครบถ้วนแล้ว' 
            : 'Congratulations! You have thoroughly completed this lesson.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-700">
              {language === 'th' ? 'วันที่' : 'Date'}: <span className="ml-1 text-slate-900">{dateStr}</span>
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-700">
              {language === 'th' ? 'เวลา' : 'Time'}: <span className="ml-1 text-slate-900">{timeStr}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
