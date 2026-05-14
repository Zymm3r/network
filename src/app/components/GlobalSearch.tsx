import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Package, Activity, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { hotelPackages, activities, transportSchedules, nearbyPlaces } from '../data/mockData';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'package' | 'activity' | 'transport' | 'nearby';
  icon: string;
}

interface GlobalSearchProps {
  onResultClick?: () => void;
}

const categoryConfig = {
  package: { label: 'Hotel Package', color: 'text-blue-600', bg: 'bg-blue-50' },
  activity: { label: 'Activity', color: 'text-teal-600', bg: 'bg-teal-50' },
  transport: { label: 'Transport', color: 'text-amber-600', bg: 'bg-amber-50' },
  nearby: { label: 'Nearby', color: 'text-violet-600', bg: 'bg-violet-50' },
};

export function GlobalSearch({ onResultClick }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    hotelPackages.forEach(p => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.island.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.customerTypes.some(ct => ct.toLowerCase().includes(q))
      ) {
        found.push({
          id: p.id,
          title: p.name,
          subtitle: `${p.island} · IDR ${p.pricePerNight.toLocaleString('id-ID')}/night`,
          category: 'package',
          icon: '🏨',
        });
      }
    });

    activities.forEach(a => {
      if (
        a.name.toLowerCase().includes(q) ||
        a.island.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.customerTypes.some(ct => ct.toLowerCase().includes(q))
      ) {
        found.push({
          id: a.id,
          title: a.name,
          subtitle: `${a.island} · IDR ${a.price.toLocaleString('id-ID')}/person`,
          category: 'activity',
          icon: '🏄',
        });
      }
    });

    transportSchedules.forEach(t => {
      if (
        t.route.toLowerCase().includes(q) ||
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q)
      ) {
        found.push({
          id: t.id,
          title: t.route,
          subtitle: `Departs ${t.departureTime} · IDR ${t.price.toLocaleString('id-ID')}`,
          category: 'transport',
          icon: '🚤',
        });
      }
    });

    nearbyPlaces.forEach(n => {
      if (
        n.name.toLowerCase().includes(q) ||
        n.island.toLowerCase().includes(q) ||
        n.type.toLowerCase().includes(q) ||
        n.tags.some(t => t.toLowerCase().includes(q))
      ) {
        found.push({
          id: n.id,
          title: n.name,
          subtitle: `${n.island} · ${n.distance} away`,
          category: 'nearby',
          icon: '📍',
        });
      }
    });

    setResults(found.slice(0, 8));
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    const routes: Record<SearchResult['category'], string> = {
      package: '/packages',
      activity: '/activities',
      transport: '/schedules',
      nearby: '/nearby',
    };
    navigate(routes[result.category]);
    setQuery('');
    setFocused(false);
    onResultClick?.();
  };

  const showDropdown = focused && (results.length > 0 || query.length >= 2);

  return (
    <div className="relative flex-1 max-w-2xl">
      <div className={`flex items-center gap-2 bg-slate-50 border rounded-xl px-3 py-2 transition-all duration-200 ${
        focused ? 'border-[#1E5FA8] ring-2 ring-[#1E5FA8]/15 bg-white' : 'border-slate-200 hover:border-slate-300'
      }`}>
        <Search size={16} className={`flex-shrink-0 transition-colors ${focused ? 'text-[#1E5FA8]' : 'text-slate-400'}`} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search packages, activities, transport, places... (⌘K)"
          className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={14} />
          </button>
        )}
        {!focused && !query && (
          <kbd className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-slate-400 text-sm">
              No results found for "{query}"
            </div>
          ) : (
            <div>
              <div className="px-3 pt-2 pb-1">
                <span className="text-xs text-slate-400">{results.length} results</span>
              </div>
              {results.map(result => {
                const config = categoryConfig[result.category];
                return (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="text-lg flex-shrink-0">{result.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-slate-800 font-medium truncate">{result.title}</div>
                      <div className="text-xs text-slate-400 truncate">{result.subtitle}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} flex-shrink-0`}>
                      {config.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
