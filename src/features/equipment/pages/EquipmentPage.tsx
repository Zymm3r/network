import { useProducts } from '../hooks/useProducts';
import { EquipmentGrid } from '../components/EquipmentGrid';
import { PackageSearch, AlertTriangle } from 'lucide-react';
import { useI18n } from '../../../app/i18n';

export function EquipmentPage() {
  const { products, isLoading, error } = useProducts();
  const { t } = useI18n();

  if (isLoading) {
    return (
      <div className="flex flex-col h-full max-w-7xl mx-auto w-full">
        <div className="mb-6 flex items-center gap-4 animate-pulse">
          <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
          <div>
            <div className="h-7 w-48 bg-slate-200 rounded-lg mb-2"></div>
            <div className="h-4 w-64 bg-slate-100 rounded-lg"></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex gap-4 animate-pulse">
          <div className="h-10 w-full max-w-md bg-slate-100 rounded-xl"></div>
          <div className="flex gap-2">
            <div className="h-10 w-24 bg-slate-100 rounded-xl"></div>
            <div className="h-10 w-24 bg-slate-100 rounded-xl"></div>
            <div className="h-10 w-24 bg-slate-100 rounded-xl"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 h-80 animate-pulse flex flex-col">
              <div className="aspect-[4/3] bg-slate-100 rounded-t-2xl"></div>
              <div className="p-4 flex flex-col flex-1">
                <div className="h-5 bg-slate-200 rounded-lg w-3/4 mb-3"></div>
                <div className="h-4 bg-slate-100 rounded w-full mb-1"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6 mb-4"></div>
                <div className="mt-auto h-10 bg-slate-50 rounded-xl w-full border border-slate-100"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5 text-red-500 border-8 border-red-50/50">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">{t.equipmentCatalog.errorLoading}</h2>
        <p className="text-slate-500">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2.5 bg-[#6366F1] text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50"
        >
          {t.equipmentCatalog.retryBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-[1400px] mx-auto w-full">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#6366F1] shadow-sm border border-indigo-100/50">
            <PackageSearch size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{t.equipmentCatalog.catalogTitle}</h1>
            <p className="text-slate-500 text-sm mt-0.5">{t.equipmentCatalog.catalogDesc}</p>
          </div>
        </div>
      </div>
      
      <EquipmentGrid products={products} />
    </div>
  );
}
