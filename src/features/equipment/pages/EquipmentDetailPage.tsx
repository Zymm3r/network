import { useParams, Link } from 'react-router';
import { ChevronLeft, PackageSearch, AlertTriangle } from 'lucide-react';
import { useProductDetail } from '../hooks/useProductDetail';
import { EquipmentDetailTabs } from '../components/EquipmentDetailTabs';
import { useI18n } from '../../../app/i18n';

export function EquipmentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, error } = useProductDetail(slug);
  const { t } = useI18n();

  if (isLoading) {
    return (
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 h-5 w-48 bg-slate-200 rounded"></div>

        {/* Header Skeleton */}
        <div className="mb-6 flex flex-col md:flex-row gap-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-full md:w-64 aspect-square bg-slate-100 rounded-2xl flex-shrink-0"></div>
          <div className="flex-1 space-y-4 py-4 w-full">
            <div className="h-8 bg-slate-200 rounded-lg w-3/4 mb-6"></div>
            <div className="h-4 bg-slate-100 rounded w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-96">
          <div className="flex border-b border-slate-100 px-4 pt-4 pb-0 space-x-4">
            <div className="h-12 w-28 bg-slate-100 rounded-t-lg"></div>
            <div className="h-12 w-28 bg-slate-100 rounded-t-lg"></div>
            <div className="h-12 w-28 bg-slate-100 rounded-t-lg"></div>
          </div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
            <div className="h-4 bg-slate-100 rounded w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            <div className="h-4 bg-slate-100 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data.product) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500 border-8 border-red-50/50">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          {error ? t.equipmentCatalog.errorLoading : t.equipmentCatalog.deviceNotFound}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          {error?.message || t.equipmentCatalog.deviceNotFoundDesc}
        </p>
        <Link 
          to="/equipment"
          className="px-6 py-3 bg-[#6366F1] text-white font-medium rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          {t.equipmentCatalog.backBtn}
        </Link>
      </div>
    );
  }

  const { product } = data;

  return (
    <div className="flex flex-col min-h-full max-w-5xl mx-auto w-full pb-10">
      {/* Breadcrumb / Back Navigation */}
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link 
          to="/equipment" 
          className="inline-flex items-center font-medium hover:text-indigo-600 transition-colors"
        >
          <ChevronLeft size={16} className="mr-0.5" />
          {t.equipmentCatalog.breadcrumbLink}
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-800 font-medium truncate">{product.name}</span>
      </div>

      {/* Header Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-6 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-64 aspect-[4/3] md:aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-6 border border-slate-100 flex-shrink-0 relative overflow-hidden">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-105 duration-500"
            />
          ) : (
            <div className="text-slate-300 font-medium flex flex-col items-center gap-3">
              <PackageSearch size={48} className="text-slate-200" />
              <span>{t.equipmentCatalog.noImageFallback}</span>
            </div>
          )}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-600 shadow-sm border border-indigo-50/50">
            {product.category}
          </div>
        </div>
        
        <div className="flex-1 py-2">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight mb-4 leading-snug">
            {product.name}
          </h1>
          <p className="text-slate-600 leading-relaxed text-base max-w-3xl">
            {product.description}
          </p>
        </div>
      </div>

      {/* Detail Tabs */}
      <EquipmentDetailTabs data={data} />
    </div>
  );
}
