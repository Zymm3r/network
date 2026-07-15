import { Link } from 'react-router';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useI18n } from '../../i18n';
import { BookOpen, Clock, Users, ChevronRight } from 'lucide-react';
import type { Course } from '../../types';
import { stripMarkdown } from '../../utils/string';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { language, t } = useI18n();

  const name = course[`name_${language}` as 'name_th' | 'name_en'];
  const description = course[`description_${language}` as 'description_th' | 'description_en'];

  const levelColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-amber-100 text-amber-700 border-amber-200',
    advanced: 'bg-red-100 text-red-700 border-red-200',
  };

  const availabilityColors: Record<string, string> = {
    available: 'bg-green-500',
    limited: 'bg-amber-500',
    full: 'bg-red-500',
    coming_soon: 'bg-slate-400',
  };

  return (
    <Link to={`/courses/${course.id}`} className="block">
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-slate-100 h-full">
      <div className="aspect-video relative bg-gradient-to-br from-indigo-50 to-purple-50">
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
        <Badge
          className={`absolute top-3 right-3 ${levelColors[course.level]} border`}
        >
          {t.levels[course.level]}
        </Badge>
        <div className={`absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full ${availabilityColors[course.availability]} shadow-sm`} />
      </div>

      <CardHeader className="space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2" title={stripMarkdown(description)}>
            {stripMarkdown(description)}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{t.coursesList.lessonsCountText.replace('{count}', (course.min_modules || 1).toString())}</span>
          </div>
          {course.enrolled_count !== undefined && course.enrolled_count > 0 && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.enrolled_count}+</span>
            </div>
          )}
        </div>
        {course.minutes_per_lesson ? (
          <div className="text-lg font-bold text-indigo-600">
            {t.coursesList.minutesCountText.replace('{count}', course.minutes_per_lesson.toString())}
            <span className="text-sm font-normal text-muted-foreground ml-1">{t.coursesList.perLesson}</span>
          </div>
        ) : (
          <div className="text-lg font-bold text-green-600">{t.coursesList.free}</div>
        )}
      </CardContent>

      <CardFooter>
        <span className="w-full flex items-center justify-center gap-1 text-sm font-medium text-indigo-600">
          {t.courses.details}
          <ChevronRight className="w-4 h-4" />
        </span>
      </CardFooter>
    </Card>
    </Link>
  );
}