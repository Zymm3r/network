import { Link } from 'react-router';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useI18n } from '../../i18n';
import { BookOpen, Clock, Users, ChevronRight } from 'lucide-react';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { language, t } = useI18n();

  const name = language === 'th' ? course.name_th : course.name_en;
  const description = language === 'th' ? course.description_th : course.description_en;

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
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-slate-100">
      <div className="aspect-video relative bg-gradient-to-br from-indigo-50 to-purple-50">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
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
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>4 ชม.</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>120+</span>
          </div>
        </div>
        {course.price_per_module > 0 && (
          <div className="text-lg font-bold text-indigo-600">
            {course.price_per_module} ฿
            <span className="text-sm font-normal text-muted-foreground ml-1">/โมดูล</span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full group bg-indigo-600 hover:bg-indigo-700">
          <Link to={`/courses/${course.id}`}>
            {t.courses.details}
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}