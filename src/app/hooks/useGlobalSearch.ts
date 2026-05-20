import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
        const { data: lessons, error: lessonsError } = await supabase
          .from('lessons')
          .select('id, title_th, title_en')
          .ilike('title_th', `%${normalized}%`)
          .limit(10);

        if (lessonsError) throw lessonsError;

        if (!cancelled && lessons?.length) {
          lessons.forEach((l: any) => {
            hits.push({
              id: l.id,
              title: l.title_th || l.title_en || 'Untitled',
              subtitle: 'บทเรียน',
              category: 'lesson',
              icon: '📖',
            });
          });
        }
      } catch (err: any) {
        // permission errors are expected in some environments; surface but continue
        setError(prev => prev || new Error(err?.message || 'Failed to search lessons'));
      }

      // Search resources (if exists)
      try {
        const { data: resources, error: resourcesError } = await supabase
          .from('resources')
          .select('id, title')
          .ilike('title', `%${normalized}%`)
          .limit(10);

        if (resourcesError) throw resourcesError;

        if (!cancelled && resources?.length) {
          resources.forEach((r: any) => {
            hits.push({ id: r.id, title: r.title, subtitle: 'แหล่งเรียนรู้', category: 'resource', icon: '🔧' });
          });
        }
      } catch (err: any) {
        setError(prev => prev || new Error(err?.message || 'Failed to search resources'));
      }

      // Search courses (if exists)
      try {
        const { data: courses, error: coursesError } = await supabase
          .from('courses')
          .select('id, title_th, title_en')
          .ilike('title_th', `%${normalized}%`)
          .limit(10);

        if (coursesError) throw coursesError;

        if (!cancelled && courses?.length) {
          courses.forEach((c: any) => {
            hits.push({ id: c.id, title: c.title_th || c.title_en || 'Untitled', subtitle: 'หลักสูตร', category: 'course', icon: '📚' });
          });
        }
      } catch (err: any) {
        setError(prev => prev || new Error(err?.message || 'Failed to search courses'));
      }

      // Search learning paths
      try {
        const { data: paths, error: pathsError } = await supabase
          .from('learning_paths')
          .select('id, name')
          .ilike('name', `%${normalized}%`)
          .limit(10);

        if (pathsError) throw pathsError;

        if (!cancelled && paths?.length) {
          paths.forEach((p: any) => {
            hits.push({ id: p.id, title: p.name, subtitle: 'เส้นทางการเรียน', category: 'path', icon: '🛣️' });
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
  }, [query]);

  return { results, loading, error };
}
