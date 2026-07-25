import { useI18n } from '../../../i18n';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Filter, X } from 'lucide-react';
import type { CourseLevel } from '../../../types';

interface CourseFiltersProps {
  selectedLevel?: CourseLevel;
  onLevelChange: (level: CourseLevel | undefined) => void;
}

export function CourseFilters({ selectedLevel, onLevelChange }: CourseFiltersProps) {
  const { t } = useI18n();

  const levels: CourseLevel[] = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">กรอง:</span>
      </div>
      <Select
        value={selectedLevel || 'all'}
        onValueChange={(value) => onLevelChange(value === 'all' ? undefined : value as CourseLevel)}
      >
        <SelectTrigger className="w-40 bg-white">
          <SelectValue placeholder="ระดับ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">ทุกระดับ</SelectItem>
          {levels.map((level) => (
            <SelectItem key={level} value={level}>
              {t.levels[level]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedLevel && (
        <Badge variant="secondary" className="gap-1 px-2">
          {t.levels[selectedLevel]}
          <button
            onClick={() => onLevelChange(undefined)}
            className="ml-1 hover:text-destructive"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      )}
    </div>
  );
}