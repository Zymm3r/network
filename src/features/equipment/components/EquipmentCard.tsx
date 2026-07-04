import { ChevronRight } from 'lucide-react';
import { Product } from '../types/product';
import { memo } from 'react';
import { Link } from 'react-router';
import { useI18n } from '../../../app/i18n';

interface EquipmentCardProps {
  product: Product;
}

export const EquipmentCard = memo(({ product }: EquipmentCardProps) => {
  const { t } = useI18n();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
      <div className="aspect-[4/3] bg-slate-50 relative p-4 flex items-center justify-center">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply"
            loading="lazy"
          />
        ) : (
          <div className="text-slate-300 font-medium">{t.equipmentCatalog.noImageFallback}</div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-600 shadow-sm border border-indigo-50/50">
          {(t.equipmentCatalog as any).categoryMap?.[product.category] || product.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-1.5" title={product.name}>
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        <Link 
          to={`/equipment/${product.slug}`}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl text-sm font-medium transition-colors border border-slate-100"
        >
          <span>{t.equipmentCatalog.viewDetailsBtn}</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
});

EquipmentCard.displayName = 'EquipmentCard';
