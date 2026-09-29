import React, { useState } from 'react';
import { 
  Trash2, 
  Bookmark, 
  ArrowRight, 
  Plus, 
  Minus, 
  Tag, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Gift, 
  AlertCircle,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface CartViewProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartView: React.FC<CartViewProps> = ({ 
  onProceedToCheckout, 
  onExploreProducts 
}) => {
  const { 
    cart, 
    savedForLater, 
    updateCartQuantity, 
    removeFromCart, 
    saveForLaterItem, 
    moveToCartFromSaved, 
    cartSubtotal, 
    cartDiscount, 
    cartDeliveryFee, 
    cartTax, 
    cartTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    coupons
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Delivery progress towards ₹999 free shipping
  const freeShippingThreshold = 999;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleApplyQuickCoupon = (code: string) => {
    const res = applyCoupon(code);
    setCouponMsg({ text: res.message, isError: !res.success });
  };

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="py-20 max-w-lg mx-auto px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F4ECE3] text-[#784A3B] flex items-center justify-center mx-auto text-3xl">
          🧶
        </div>
        <h2 className="font-serif-brand text-2xl font-bold text-[#2E231B]">
          Your crochet basket is empty
        </h2>
        <p className="text-xs text-[#8A796B] leading-relaxed max-w-sm mx-auto">
          Explore our handcrafted everlasting bouquets, adorable amigurumi toys, and bespoke accessories waiting to find a home.
        </p>
        <button
          type="button"
          onClick={onExploreProducts}
          className="px-6 py-2.5 bg-[#48392E] hover:bg-[#34271D] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-3 max-w-4xl mx-auto px-4 space-y-6">
      <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-3">
        <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2E231B] flex items-center gap-2">
          <ShoppingBag size={22} className="text-[#C47062]" />
          <span>Shopping Basket</span>
        </h1>
        <span className="text-xs text-[#8A796B]">
          {cart.length} unique item{cart.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Free Delivery threshold progress bar */}
      <div className="p-3.5 bg-white rounded-2xl border border-[#EDE5DA] space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#48392E]">
          <span className="flex items-center gap-1.5">
            <Truck size={15} className="text-[#C47062]" />
            {amountToFreeShipping > 0 ? (
              <span>Add <strong className="text-[#C47062]">₹{amountToFreeShipping}</strong> more for <strong>FREE Delivery</strong></span>
            ) : (
              <span className="text-[#5B7B59] flex items-center gap-1">
                <Check size={14} /> You unlocked Free Standard Delivery!
              </span>
            )}
          </span>
          <span className="text-[11px] text-[#8A796B] tabular-nums">
            ₹{cartSubtotal} / ₹{freeShippingThreshold}
          </span>
        </div>
        <div className="w-full h-2 bg-[#F2EDE5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#C47062] rounded-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-3">
          {cart.map((item) => (
            <div 
              key={item.id}
              className="p-3.5 bg-white rounded-2xl border border-[#EDE5DA] flex gap-3 sm:gap-4 shadow-2xs"
            >
              {/* Product Thumbnail */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#F5EFE6] shrink-0 border border-[#EAE2D5]">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-[#2E231B] line-clamp-1">
                      {item.product.name}
                    </h3>
                    <span className="text-xs sm:text-sm font-extrabold text-[#2E231B] tabular-nums">
                      ₹{item.totalPrice}
                    </span>
                  </div>

                  {/* Attributes */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#7A6B5F] mt-1">
                    <span>Color: <strong>{item.selectedColor}</strong></span>
                    <span>•</span>
                    <span>Size: <strong>{item.selectedSize}</strong></span>
                  </div>

                  {/* Customization Details Summary */}
                  {item.customDetails && (
                    <div className="mt-1.5 space-y-0.5 text-[11px] text-[#8F4436] bg-[#FAF5EE] p-1.5 rounded-lg border border-[#EFEAE2]">
                      {item.customDetails.nameTag && (
                        <p className="flex items-center gap-1 font-medium">
                          <Tag size={11} /> Tag: "{item.customDetails.nameTag}"
                        </p>
                      )}
                      {item.customDetails.pattern && (
                        <p className="font-medium">Pattern: {item.customDetails.pattern}</p>
                      )}
                      {item.customDetails.giftWrap && (
                        <p className="flex items-center gap-1 font-medium text-[#5B7B59]">
                          <Gift size={11} /> Gift wrap included
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Controls: Quantity Stepper & Actions */}
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#F4EFEA]">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#DDD3C6] bg-[#FAF7F2] rounded-lg">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-[#554538] hover:bg-[#EFE9DF]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#30241A] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="w-7 h-7 flex items-center justify-center text-[#554538] hover:bg-[#EFE9DF] disabled:opacity-40"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Save for later & Remove */}
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => saveForLaterItem(item.id)}
                      className="text-[#7A6B5F] hover:text-[#2E231B] flex items-center gap-1"
                    >
                      <Bookmark size={13} />
                      <span className="hidden sm:inline">Save for Later</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#B35F52] hover:text-[#8F3E34] flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Saved For Later Accordion */}
          {savedForLater.length > 0 && (
            <div className="pt-4">
              <h3 className="font-serif-brand text-lg font-bold text-[#30241A] mb-2 flex items-center gap-1.5">
                <Bookmark size={16} className="text-[#784A3B]" />
                <span>Saved for Later ({savedForLater.length})</span>
              </h3>
              <div className="space-y-2">
                {savedForLater.map((saved) => (
                  <div 
                    key={saved.id}
                    className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EDE5DA] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={saved.product.images[0]} 
                        alt={saved.product.name} 
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover" 
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#2E231B]">{saved.product.name}</h4>
                        <span className="text-xs font-semibold text-[#C47062] tabular-nums">₹{saved.unitPrice}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => moveToCartFromSaved(saved.id)}
                      className="px-3 py-1.5 bg-[#48392E] text-white text-xs font-semibold rounded-lg hover:bg-[#34271D]"
                    >
                      Move to Basket
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Coupons & Price Summary Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Coupon Code Box */}
          <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] space-y-3">
            <h3 className="text-xs font-bold text-[#48392E] uppercase tracking-wider flex items-center gap-1.5">
              <Tag size={13} className="text-[#C47062]" />
              <span>Apply Studio Coupon</span>
            </h3>

            {appliedCoupon ? (
              <div className="p-2.5 bg-[#F2F8F2] border border-[#CDE5CE] rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#3E6C41]">{appliedCoupon.code}</span>
                  <p className="text-[11px] text-[#5A7A5C]">{appliedCoupon.description}</p>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs font-bold text-[#B35F52] hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="e.g. WELCOME10"
                  className="flex-1 h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs uppercase font-semibold text-[#30241A] placeholder-[#A8988B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 h-9 bg-[#48392E] text-white text-xs font-semibold rounded-xl hover:bg-[#34271D]"
                >
                  Apply
                </button>
              </form>
            )}

            {couponMsg && (
              <p className={`text-[11px] font-medium ${couponMsg.isError ? 'text-[#C24D3D]' : 'text-[#3E6C41]'}`}>
                {couponMsg.text}
              </p>
            )}

            {/* Quick Available Coupons */}
            {!appliedCoupon && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-[#8A796B] font-semibold uppercase block">Available for you:</span>
                <div className="flex flex-wrap gap-1.5">
                  {coupons.slice(0, 3).map((cp) => (
                    <button
                      key={cp.code}
                      type="button"
                      onClick={() => handleApplyQuickCoupon(cp.code)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-[#FAF5EE] border border-[#E8DDCE] text-[#6D473A] rounded-lg hover:bg-[#F2ECE4] transition-colors"
                    >
                      {cp.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bill Order Summary */}
          <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] space-y-3">
            <h3 className="text-xs font-bold text-[#48392E] uppercase tracking-wider">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-[#5D4E41]">
              <div className="flex items-center justify-between">
                <span>Basket Subtotal</span>
                <span className="font-semibold text-[#2E231B] tabular-nums">₹{cartSubtotal}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex items-center justify-between text-[#3E6C41]">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold tabular-nums">-₹{cartDiscount}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>Standard Delivery</span>
                {cartDeliveryFee === 0 ? (
                  <span className="font-bold text-[#3E6C41]">FREE</span>
                ) : (
                  <span className="font-semibold text-[#2E231B] tabular-nums">₹{cartDeliveryFee}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span>Taxes & GST (5%)</span>
                <span className="font-semibold text-[#2E231B] tabular-nums">₹{cartTax}</span>
              </div>

              <div className="pt-2 border-t border-[#EAE2D5] flex items-baseline justify-between text-sm sm:text-base font-extrabold text-[#2A2017]">
                <span>Total Payable</span>
                <span className="text-lg font-extrabold text-[#C47062] tabular-nums">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              disabled={cart.length === 0}
              className="w-full h-11 bg-[#C47062] hover:bg-[#B35F52] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-98 disabled:opacity-50"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <p className="text-[11px] text-center text-[#8A796B]">
              🔒 256-Bit SSL Encrypted & Safe Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
