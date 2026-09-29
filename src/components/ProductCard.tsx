import React from 'react';
import { Heart, Star, Sparkles, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { isWishlisted, toggleWishlist, addToCart } = useShop();
  const wishlisted = isWishlisted(product.id);

  const isLowStock = product.stock > 0 && product.stock <= 4;
  const isOutOfStock = product.stock === 0;

  // Calculate discount percentage
  const discountPercent = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) {
      onOpenDetails(product);
      return;
    }
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, defaultColor, defaultSize, 1);
  };

  return (
    <div 
      onClick={() => onOpenDetails(product)}
      className="group flex flex-col bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#EFEAE2] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer text-left"
    >
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-[#F5F2EB] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Elegant fallback container
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Fallback pattern in case image fails */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] to-[#EAE0D5] text-[#8C7A6B] text-xs font-medium">
          <span className="font-serif-brand text-base italic">{product.name}</span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
            wishlisted 
              ? 'bg-[#C47062] text-white shadow-sm' 
              : 'bg-white/85 text-[#5C4D3F] hover:bg-white hover:text-[#C47062]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
        </button>

        {/* Stock / Promotion Badges (Zero-Pill clean typography overlay or quiet banner) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-[#C47062] text-white rounded-md shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide bg-[#4A3B32] text-[#F9F6F0] rounded-md shadow-xs">
              Best Seller
            </span>
          )}
        </div>

        {/* Stock Warning overlay if low or out of stock */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-[#2D241E]/40 backdrop-blur-[1px] flex items-center justify-center p-2">
            <span className="px-3 py-1 bg-white/95 text-[#3D332A] text-xs font-semibold rounded-md shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#8A7A6E] mb-1">
            <span className="tracking-wide uppercase text-[11px] font-medium text-[#7D6B5D]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-medium text-[#3D332A]">
              <Star size={13} className="fill-[#E5A93C] text-[#E5A93C]" />
              <span className="tabular-nums">{product.rating}</span>
              <span className="text-[#A39486]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-[#2D241E] text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#B85D4E] transition-colors">
            {product.name}
          </h3>

          {/* Color swatches preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 mb-2.5">
              {product.colors.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-[10px] text-[#8A7A6E] ml-0.5">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        <div>
          {/* Low stock reminder */}
          {isLowStock && (
            <div className="flex items-center gap-1 text-[11px] text-[#C27664] font-medium mb-1.5">
              <AlertCircle size={12} />
              <span>Only {product.stock} left in stock</span>
            </div>
          )}

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE4]">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#2D241E] tabular-nums">
                ₹{product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-[#9E8E80] line-through tabular-nums">
                  ₹{product.price}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                isOutOfStock
                  ? 'bg-[#EAE5DE] text-[#9E8E80] cursor-not-allowed'
                  : 'bg-[#F2ECE4] text-[#423326] hover:bg-[#C47062] hover:text-white'
              }`}
            >
              {product.customisable ? (
                <>
                  <Sparkles size={12} />
                  <span>Customize</span>
                </>
              ) : (
                <span>Add</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
