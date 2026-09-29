import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

interface WishlistViewProps {
  onOpenProduct: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({ 
  onOpenProduct, 
  onExploreProducts 
}) => {
  const { wishlist, removeFromWishlist, moveWishlistToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FAF5EE] text-[#C47062] flex items-center justify-center mx-auto text-3xl">
          <Heart size={32} />
        </div>
        <h2 className="font-serif-brand text-2xl font-bold text-[#2E231B]">
          Your wishlist is waiting to be filled
        </h2>
        <p className="text-xs text-[#8A796B] leading-relaxed max-w-sm mx-auto">
          Tap the heart icon on any bouquet, amigurumi bear, or tote bag to keep track of your favorite handcrafted gifts.
        </p>
        <button
          type="button"
          onClick={onExploreProducts}
          className="px-6 py-2.5 bg-[#48392E] hover:bg-[#34271D] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
        >
          Browse Creations
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-3 max-w-4xl mx-auto px-4 space-y-4">
      <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-3">
        <div>
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2E231B] flex items-center gap-2">
            <Heart size={22} className="text-[#C47062] fill-current" />
            <span>Saved Favorites</span>
          </h1>
          <p className="text-xs text-[#8A796B]">
            {wishlist.length} handcrafted treasure{wishlist.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((product) => {
          const isOutOfStock = product.stock <= 0;
          const isLowStock = product.stock > 0 && product.stock <= 4;

          return (
            <div 
              key={product.id}
              className="bg-white rounded-2xl border border-[#EDE5DA] overflow-hidden flex flex-col justify-between shadow-2xs group"
            >
              <div 
                onClick={() => onOpenProduct(product)}
                className="cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-4/3 w-full bg-[#F5EFE6] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="px-3 py-1 bg-white text-[#2E231B] font-bold text-xs rounded-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {isLowStock && (
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#C26229] text-white text-[10px] font-bold rounded-md">
                      Only {product.stock} left
                    </div>
                  )}
                </div>

                <div className="p-3.5 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#8A796B] font-semibold">
                    {product.category}
                  </span>
                  <h3 className="text-xs font-bold text-[#2E231B] line-clamp-1 group-hover:text-[#C47062] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-sm font-extrabold text-[#2E231B] tabular-nums">
                      ₹{product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && (
                      <span className="text-xs text-[#9E8E80] line-through tabular-nums">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 pt-0 flex items-center gap-2 border-t border-[#F7F2EC]">
                <button
                  type="button"
                  onClick={() => moveWishlistToCart(product)}
                  disabled={isOutOfStock}
                  className={`flex-1 h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    isOutOfStock
                      ? 'bg-[#EAE4DC] text-[#A29486] cursor-not-allowed'
                      : 'bg-[#48392E] hover:bg-[#34271D] text-white'
                  }`}
                >
                  <ShoppingBag size={13} />
                  <span>Move to Basket</span>
                </button>

                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-9 h-9 rounded-xl border border-[#EDE5DA] text-[#9E8E80] hover:text-[#C47062] hover:bg-[#FAF7F2] flex items-center justify-center transition-colors"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
