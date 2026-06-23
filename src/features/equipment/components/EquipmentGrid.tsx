import { useMemo, useState, memo } from 'react';
import { Product } from '../types/product';
import { EquipmentCard } from './EquipmentCard';
import { Search, Filter, PackageOpen } from 'lucide-react';
import { useI18n } from '../../../app/i18n';

interface EquipmentGridProps {
  products: Product[];
}

export const EquipmentGrid = memo(({ products }: EquipmentGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { t } = useI18n();

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['All', ...Array.from(cats)].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm mt-4">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
          <PackageOpen size={32} />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">{t.equipmentCatalog.noEquipmentData}</h3>
        <p className="text-slate-500 mt-1">{t.equipmentCatalog.noEquipmentDataDesc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder={t.equipmentCatalog.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm bg-slate-50/50 focus:bg-white"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar flex-1 lg:justify-end">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#6366F1] text-white shadow-md shadow-indigo-200/50' 
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? t.equipmentCatalog.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredProducts.map(product => (
            <EquipmentCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 text-slate-400 shadow-sm">
            <Search size={24} />
          </div>
          <h3 className="text-slate-800 font-semibold text-lg">{t.equipmentCatalog.noSearchResults}</h3>
          <p className="text-slate-500 text-sm mt-1">{t.equipmentCatalog.noSearchResultsDesc}</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="mt-5 px-5 py-2.5 bg-white border border-slate-200 text-indigo-600 font-medium text-sm rounded-xl hover:bg-slate-50 hover:text-indigo-700 transition-colors shadow-sm"
          >
            {t.equipmentCatalog.clearSearchBtn}
          </button>
        </div>
      )}
    </div>
  );
});

EquipmentGrid.displayName = 'EquipmentGrid';
