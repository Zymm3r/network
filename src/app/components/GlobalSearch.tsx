import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useI18n } from '../i18n';
import { useGlobalSearch } from '../hooks/useGlobalSearch';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'course' | 'lesson' | 'path' | 'resource';
  icon: string;
}

interface GlobalSearchProps {
  onResultClick?: () => void;
}

const categoryConfig = {
  course: { label: 'หลักสูตร', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  lesson: { label: 'บทเรียน', color: 'text-green-600', bg: 'bg-green-50' },
  path: { label: 'เส้นทาง', color: 'text-purple-600', bg: 'bg-purple-50' },
  resource: { label: 'แหล่งเรียนรู้', color: 'text-amber-600', bg: 'bg-amber-50' },
};

export function GlobalSearch({ onResultClick }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { language, t } = useI18n();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
        setFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const { results: searchResults, loading: searchLoading, error: searchError } = useGlobalSearch(query);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setResults(searchResults || []);

    if (searchError) {
      // Log or surface the error, but don't crash the UI
      console.error('Global search error:', searchError.message);
    }
  }, [query, searchResults, searchError]);

  const handleResultClick = (result: SearchResult) => {
    onResultClick?.();
    setQuery('');
    setFocused(false);

    switch (result.category) {
      case 'course':
        navigate(`/courses/${result.id}`);
        break;
      case 'lesson':
        navigate(`/lessons/${result.id}`);
        break;
      case 'path':
        navigate('/paths');
        break;
      case 'resource':
        navigate('/resources');
        break;
    }
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder={t.search.placeholder}
          className="w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all placeholder:text-slate-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Search Shortcut Hint */}
      {!focused && !query && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-slate-400 bg-white border border-slate-200 rounded">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      )}

      {/* Results Dropdown */}
      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden z-50">
          {results.map((result) => {
            const config = categoryConfig[result.category];
            return (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center text-lg`}>
                  {result.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{result.title}</div>
                  <div className="text-xs text-muted-foreground">{result.subtitle}</div>
                </div>
                <span className={`text-xs font-medium ${config.color}`}>
                  {t.search.categories[result.category] || config.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}