import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md';
}

export function RatingStars({ rating, reviews, size = 'sm' }: RatingStarsProps) {
  const starSize = size === 'sm' ? 12 : 14;
  return (
    <div className="flex items-center gap-1">
      <Star
        size={starSize}
        className="fill-amber-400 text-amber-400"
      />
      <span className={`font-medium text-slate-800 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {rating.toFixed(1)}
      </span>
      {reviews !== undefined && (
        <span className={`text-slate-400 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
