import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, Video, FileQuestion, PenTool, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../../i18n';
import type { Lesson } from '../../types';
import { supabase } from '../../lib/supabase';

interface LessonCardProps {
  lesson: Lesson;
}

const lessonTypeIcons: Record<string, typeof Video> = {
  video: Video,
  quiz: FileQuestion,
  exercise: PenTool,
  reading: BookOpen,
};

const lessonTypeColors: Record<string, string> = {
  video: 'bg-blue-100 text-blue-700 border-blue-200',
  quiz: 'bg-purple-100 text-purple-700 border-purple-200',
  exercise: 'bg-green-100 text-green-700 border-green-200',
  reading: 'bg-orange-100 text-orange-700 border-orange-200',
};

const lessonTypeLabels: Record<string, string> = {
  video: 'วิดีโอ',
  quiz: 'แบบทดสอบ',
  exercise: 'แบบฝึกหัด',
  reading: 'เอกสาร',
};

export function LessonCard({ lesson }: LessonCardProps) {
  const { language, t } = useI18n();
  const [imgError, setImgError] = useState(false);

  const name = language === 'th' ? lesson.title_th : lesson.title_en;
  const description = language === 'th' ? lesson.content_th : lesson.content_en;
  const Icon = lessonTypeIcons[lesson.lesson_type] || Video;

  const isCompleted = false; // This would come from user progress

  const thumbnailUrl = lesson.thumbnail_url?.startsWith('lesson-thumbnails/')
    ? supabase.storage.from('lesson-thumbnails').getPublicUrl(lesson.thumbnail_url.replace('lesson-thumbnails/', '')).data.publicUrl
    : lesson.thumbnail_url;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-slate-100">
      <div className="aspect-video relative bg-gradient-to-br from-slate-50 to-slate-100">
        {thumbnailUrl && !imgError ? (
          <img
            src={thumbnailUrl}
            alt={name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
              <Icon className="w-7 h-7 text-slate-500" />
            </div>
          </div>
        )}
        <Badge
          className={`absolute top-3 right-3 ${lessonTypeColors[lesson.lesson_type]} border`}
        >
          {lessonTypeLabels[lesson.lesson_type]}
        </Badge>
        {isCompleted && (
          <div className="absolute top-3 left-3">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        )}
      </div>

      <CardHeader className="space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {lesson.duration_minutes && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{lesson.duration_minutes} นาที</span>
            </div>
          )}
          {lesson.difficulty && (
            <Badge variant="outline" className="text-xs">
              {t.difficulty[lesson.difficulty]}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          variant={isCompleted ? 'outline' : 'default'}
          className="w-full group"
        >
          <Link to={`/lessons/${lesson.id}`}>
            {isCompleted ? 'ทบทวน' : 'เริ่มทำ'}
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}