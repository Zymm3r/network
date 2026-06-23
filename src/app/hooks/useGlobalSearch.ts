import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useI18n } from '../i18n';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'course' | 'lesson' | 'path' | 'resource';
  icon: string;
}

export function useGlobalSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { language, t } = useI18n();

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!query || query.length < 2) {
        setResults([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      const normalized = query.toLowerCase();
      const hits: SearchResult[] = [];

      // Search lessons (title_th/title_en)
      try {
        const searchField = `title_${language}` as 'title_th' | 'title_en';
        const { data: lessons, error: lessonsError } = await supabase
          .from('lessons')
          .select('id, title_th, title_en')
          .ilike(searchField, `%${normalized}%`)
          .limit(10);

        if (lessonsError) throw lessonsError;

        if (!cancelled && lessons?.length) {
          lessons.forEach((l: any) => {
            const title = l[`title_${language}` as 'title_th' | 'title_en'] || l.title_th || l.title_en || 'Untitled';
            hits.push({
              id: l.id,
              title: title,
              subtitle: t.search.categories.lesson,
              category: 'lesson',
              icon: '📖',
            });
          });
        }
      } catch (err: any) {
        setError(prev => prev || new Error(err?.message || 'Failed to search lessons'));
      }

      // Search resources (name_th/name_en)
      try {
        const searchField = `name_${language}` as 'name_th' | 'name_en';
        const { data: resources, error: resourcesError } = await supabase
          .from('resources')
          .select('id, name_th, name_en')
          .ilike(searchField, `%${normalized}%`)
          .limit(10);

        if (resourcesError) throw resourcesError;

        if (!cancelled && resources?.length) {
          resources.forEach((r: any) => {
            const title = r[`name_${language}` as 'name_th' | 'name_en'] || r.name_th || r.name_en || 'Untitled';
            hits.push({
              id: r.id,
              title: title,
              subtitle: t.search.categories.resource,
              category: 'resource',
              icon: '🔧'
            });
          });
        }
      } catch (err: any) {
        setError(prev => prev || new Error(err?.message || 'Failed to search resources'));
      }

      // Search courses (name_th/name_en)
      try {
        const searchField = `name_${language}` as 'name_th' | 'name_en';
        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('id, name_th, name_en')
          .ilike(searchField, `%${normalized}%`)
          .limit(10);

        if (coursesError) throw coursesError;

        if (!cancelled && courses?.length) {
          courses.forEach((c: any) => {
            const title = c[`name_${language}` as 'name_th' | 'name_en'] || c.name_th || c.name_en || 'Untitled';
            hits.push({
              id: c.id,
              title: title,
              subtitle: t.search.categories.course,
              category: 'course',
              icon: '📚'
            });
          });
        }
      } catch (err: any) {
        setError(prev => prev || new Error(err?.message || 'Failed to search courses'));
      }

      // Search learning paths (name_th/name_en)
      try {
        const searchField = `name_${language}` as 'name_th' | 'name_en';
        const { data: paths, error: pathsError } = await supabase
          .from('learning_paths')
          .select('id, name_th, name_en')
          .ilike(searchField, `%${normalized}%`)
          .limit(10);

        if (pathsError) throw pathsError;

        if (!cancelled && paths?.length) {
          paths.forEach((p: any) => {
            const title = p[`name_${language}` as 'name_th' | 'name_en'] || p.name_th || p.name_en || 'Untitled';
            hits.push({
              id: p.id,
              title: title,
              subtitle: t.search.categories.path,
              category: 'path',
              icon: '🛣️'
            });
          });
        }
      } catch (err: any) {
        setError(prev => prev || new Error(err?.message || 'Failed to search paths'));
      }

      if (!cancelled) {
        setResults(hits.slice(0, 12));
        setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [query, language, t]);

  return { results, loading, error };
}
