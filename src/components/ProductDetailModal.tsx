import React, { useState, useMemo } from 'react';
import { 
  X, 
  Heart, 
  Star, 
  ShoppingBag, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Info, 
  AlertCircle, 
  Check, 
  Plus, 
  Minus, 
  Gift, 
  Tag, 
  Send,
  Bell
} from 'lucide-react';
import { Product, CustomizationDetails, Review } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onBuyNow: (product: Product, color: string, size: string, qty: number, custom?: CustomizationDetails, unitPrice?: number) => void;
  onOpenNotifyModal: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  onClose, 
  onBuyNow,
  onOpenNotifyModal 
}) => {
  const { 
    isWishlisted, 
    toggleWishlist, 
    addToCart, 
    getProductReviews, 
    addReview 
  } = useShop();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Customization state
  const [customNameTag, setCustomNameTag] = useState('');
  const [selectedPattern, setSelectedPattern] = useState<string>(
    product.customizationOptions?.allowPatterns ? product.customizationOptions.allowPatterns[0] : ''
  );
  const [specialNotes, setSpecialNotes] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);

  // Pincode delivery check state
  const [pinCode, setPinCode] = useState('560038');
  const [deliveryChecked, setDeliveryChecked] = useState(true);

  // New review form state
  const [newRating, setNewRating] = useState(5);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Active tab inside PDP tabs (Details, Care & Material, Reviews)
  const [infoTab, setInfoTab] = useState<'details' | 'care' | 'reviews'>('details');

  const wishlisted = isWishlisted(product.id);
  const reviews = getProductReviews(product.id);

  // Calculate live dynamic price with customization
  const basePrice = product.discountPrice || product.price;
  const sizeExtra = (product.sizePriceModifiers && product.sizePriceModifiers[selectedSize]) || 0;
  const nameTagExtra = (customNameTag.trim() && product.customizationOptions?.nameTagPrice) ? product.customizationOptions.nameTagPrice : 0;
  const patternExtra = (selectedPattern && product.customizationOptions?.patternPrice) ? product.customizationOptions.patternPrice : 0;
  const giftWrapExtra = (giftWrap && product.customizationOptions?.giftWrapPrice) ? product.customizationOptions.giftWrapPrice : 0;

  const currentUnitPrice = basePrice + sizeExtra + nameTagExtra + patternExtra + giftWrapExtra;
  const currentTotalPrice = currentUnitPrice * quantity;

  // Stock status
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  // Rating distribution calculations
  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => {
      const star = Math.floor(r.rating) as 1 | 2 | 3 | 4 | 5;
      if (counts[star] !== undefined) counts[star]++;
    });
    return counts;
  }, [reviews]);

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const customDetails: CustomizationDetails = {
      nameTag: customNameTag.trim() || undefined,
      pattern: selectedPattern || undefined,
      specialNotes: specialNotes.trim() || undefined,
      giftWrap
    };

    addToCart(product, selectedColor, selectedSize, quantity, customDetails, currentUnitPrice);
    onClose();
  };

  const handleBuyNowClick = () => {
    if (isOutOfStock) return;

    const customDetails: CustomizationDetails = {
      nameTag: customNameTag.trim() || undefined,
      pattern: selectedPattern || undefined,
      specialNotes: specialNotes.trim() || undefined,
      giftWrap
    };

    onBuyNow(product, selectedColor, selectedSize, quantity, customDetails, currentUnitPrice);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newReviewComment.trim()) return;

    addReview({
      productId: product.id,
      userName: newReviewerName.trim(),
      rating: newRating,
      title: newReviewTitle.trim() || 'Beautiful handmade work',
      comment: newReviewComment.trim(),
      verifiedPurchase: true
    });

    setNewReviewerName('');
    setNewReviewTitle('');
    setNewReviewComment('');
    setShowReviewForm(false);
    setInfoTab('reviews');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4">
      <div 
        className="bg-[#FAF7F2] w-full max-w-3xl min-h-screen sm:min-h-0 sm:max-h-[92vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200"
      >
        {/* Top Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md text-[#48392E] hover:bg-white flex items-center justify-center shadow-md transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6 pb-28 sm:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Product Images Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#F5EFE6] border border-[#E9DFD3] shadow-xs">
                <img
                  src={product.images[selectedImgIdx] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Wishlist Button on Image */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs ${
                    wishlisted 
                      ? 'bg-[#C47062] text-white' 
                      : 'bg-white/85 text-[#5C4D3F] hover:bg-white'
                  }`}
                >
                  <Heart size={18} className={wishlisted ? 'fill-current' : ''} />
                </button>

                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                    <span className="px-4 py-1.5 bg-white text-[#2E231B] font-bold text-xs rounded-xl shadow-md">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImgIdx(i)}
                      className={`relative w-16 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImgIdx === i 
                          ? 'border-[#C47062] scale-102 shadow-xs' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="Product preview" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* SKU & Category badge */}
              <div className="flex items-center justify-between text-xs text-[#8A796B] pt-1">
                <span>SKU: <strong className="text-[#4E3E31]">{product.sku}</strong></span>
                <span>Category: <strong className="text-[#4E3E31]">{product.category}</strong></span>
              </div>
            </div>

            {/* Right: Product Purchase Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#8A7A6E] mb-1">
                  <span className="uppercase tracking-wider font-semibold text-[#8F4436]">
                    {product.category}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1 font-semibold text-[#3D3126]">
                    <Star size={14} className="fill-[#E5A93C] text-[#E5A93C]" />
                    <span className="tabular-nums">{product.rating}</span>
                    <span className="text-[#8A796B]">({reviews.length} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2A2017] leading-snug">
                  {product.name}
                </h1>

                {/* Price section */}
                <div className="flex items-baseline gap-2.5 mt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#2A2017] tabular-nums">
                    ₹{currentUnitPrice}
                  </span>
                  {product.discountPrice && (
                    <span className="text-sm text-[#9E8E80] line-through tabular-nums">
                      ₹{product.price + sizeExtra}
                    </span>
                  )}
                  {product.discountPrice && (
                    <span className="px-2 py-0.5 text-xs font-bold text-[#C47062] bg-[#F9EDE9] rounded-md">
                      Save ₹{product.price - product.discountPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Stock status announcement */}
              <div>
                {isOutOfStock ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4ECE3] text-[#784A3B]">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <AlertCircle size={16} />
                      <span>Currently Out of Stock</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenNotifyModal(product)}
                      className="px-3 py-1 bg-white text-[#784A3B] text-xs font-bold rounded-lg border border-[#DDD4C7] hover:bg-[#FAF7F2] flex items-center gap-1 shadow-2xs"
                    >
                      <Bell size={13} />
                      <span>Notify Me</span>
                    </button>
                  </div>
                ) : isLowStock ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFF2E8] border border-[#FCD8BE] text-xs text-[#C26229] font-medium">
                    <AlertCircle size={14} />
                    <span>Hurry, only <strong>{product.stock} left</strong> in our studio!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-[#527756] font-medium">
                    <Check size={14} />
                    <span>In Stock ({product.stock} pieces crafted & available)</span>
                  </div>
                )}
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#48392E]">
                    <span>Color: <span className="font-normal text-[#78675A]">{selectedColor}</span></span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.colors.map((c) => {
                      const isSel = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-medium transition-all ${
                            isSel
                              ? 'border-[#48392E] bg-white text-[#2E231B] shadow-2xs'
                              : 'border-[#E5DDD2] bg-[#FAF7F2] text-[#6E5D50] hover:bg-white'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#48392E]">
                    <span>Size: <span className="font-normal text-[#78675A]">{selectedSize}</span></span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => {
                      const isSel = selectedSize === sz;
                      const mod = product.sizePriceModifiers?.[sz] || 0;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                            isSel
                              ? 'border-[#48392E] bg-[#48392E] text-white shadow-2xs'
                              : 'border-[#E5DDD2] bg-white text-[#6E5D50] hover:bg-[#F2EDE5]'
                          }`}
                        >
                          <span>{sz}</span>
                          {mod > 0 && (
                            <span className="ml-1 opacity-80 text-[10px]">(+₹{mod})</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Live Customization Section */}
              {product.customisable && (
                <div className="p-3.5 rounded-2xl bg-[#F4ECE3] border border-[#E8DDCE] space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#733F33]">
                    <Sparkles size={14} className="text-[#C47062]" />
                    <span>Personalize & Customize</span>
                  </div>

                  {/* Name Tag Embroidery */}
                  {product.customizationOptions?.allowNameTag && (
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#48392E] mb-1">
                        <label htmlFor="nameTagInput" className="font-semibold">
                          Name / Monogram Tag
                        </label>
                        <span className="text-[11px] text-[#C47062] font-semibold">
                          {product.customizationOptions.nameTagPrice 
                            ? `+₹${product.customizationOptions.nameTagPrice}` 
                            : 'Free'}
                        </span>
                      </div>
                      <input
                        id="nameTagInput"
                        type="text"
                        maxLength={16}
                        placeholder='e.g. "Emma", "Sweetheart", "2026"'
                        value={customNameTag}
                        onChange={(e) => setCustomNameTag(e.target.value)}
                        className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#D8CCBF] text-xs text-[#3D3126] placeholder-[#A8988B] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
                      />
                    </div>
                  )}

                  {/* Pattern Choice */}
                  {product.customizationOptions?.allowPatterns && (
                    <div>
                      <label className="block text-xs font-semibold text-[#48392E] mb-1">
                        Pattern Theme (+₹{product.customizationOptions.patternPrice || 50})
                      </label>
                      <select
                        value={selectedPattern}
                        onChange={(e) => setSelectedPattern(e.target.value)}
                        className="w-full h-8 px-2 rounded-lg bg-white border border-[#D8CCBF] text-xs text-[#3D3126] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
                      >
                        {product.customizationOptions.allowPatterns.map((pat) => (
                          <option key={pat} value={pat}>{pat}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Special instructions note */}
                  <div>
                    <label className="block text-xs font-semibold text-[#48392E] mb-1">
                      Note for the Artisan (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="Special color tweak, anniversary date, or specific requests..."
                      className="w-full p-2 rounded-lg bg-white border border-[#D8CCBF] text-xs text-[#3D3126] placeholder-[#A8988B] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
                    />
                  </div>

                  {/* Gift wrapping checkbox */}
                  {product.customizationOptions?.giftWrapAvailable && (
                    <label className="flex items-center gap-2 pt-1 text-xs text-[#48392E] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="rounded border-[#D0C5B7] text-[#C47062] focus:ring-[#C47062] w-4 h-4"
                      />
                      <span className="font-semibold flex items-center gap-1">
                        <Gift size={13} className="text-[#C47062]" />
                        <span>Artisan Gift Wrapping & Calligraphy Card (+₹{product.customizationOptions.giftWrapPrice || 49})</span>
                      </span>
                    </label>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-[#48392E]">Quantity:</span>
                <div className="flex items-center border border-[#DDD3C6] bg-white rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-8 h-8 flex items-center justify-center text-[#554538] hover:bg-[#F2EDE5] disabled:opacity-40"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#30241A] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock || isOutOfStock}
                    className="w-8 h-8 flex items-center justify-center text-[#554538] hover:bg-[#F2EDE5] disabled:opacity-40"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Delivery Estimation Checker */}
              <div className="p-3 bg-white rounded-2xl border border-[#EDE5DA] text-xs space-y-2">
                <div className="flex items-center justify-between font-semibold text-[#48392E]">
                  <span className="flex items-center gap-1.5">
                    <Truck size={15} className="text-[#784A3B]" />
                    <span>Estimated Delivery: {product.estimatedDeliveryDays}</span>
                  </span>
                  <span className="text-[#5B7B59]">
                    {product.deliveryCharge === 0 ? 'Free Delivery' : `₹${product.deliveryCharge} Shipping`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="h-7 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] w-36 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setDeliveryChecked(true)}
                    className="px-2.5 py-1 text-xs font-semibold bg-[#48392E] text-white rounded-lg hover:bg-[#34271D]"
                  >
                    Check
                  </button>
                  {deliveryChecked && (
                    <span className="text-[11px] text-[#5B7B59] flex items-center gap-1">
                      <Check size={12} /> Standard delivery available in {product.estimatedDeliveryDays}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed Content: Details, Material & Care, Reviews */}
          <div className="pt-4 border-t border-[#EAE2D5]">
            <div className="flex items-center gap-4 border-b border-[#EAE2D5] text-xs font-semibold mb-4">
              <button
                type="button"
                onClick={() => setInfoTab('details')}
                className={`pb-2.5 border-b-2 transition-colors ${
                  infoTab === 'details' 
                    ? 'border-[#C47062] text-[#8F4436]' 
                    : 'border-transparent text-[#7A6B5F] hover:text-[#3D3126]'
                }`}
              >
                Description & Craft
              </button>
              <button
                type="button"
                onClick={() => setInfoTab('care')}
                className={`pb-2.5 border-b-2 transition-colors ${
                  infoTab === 'care' 
                    ? 'border-[#C47062] text-[#8F4436]' 
                    : 'border-transparent text-[#7A6B5F] hover:text-[#3D3126]'
                }`}
              >
                Material & Care Guide
              </button>
              <button
                type="button"
                onClick={() => setInfoTab('reviews')}
                className={`pb-2.5 border-b-2 transition-colors ${
                  infoTab === 'reviews' 
                    ? 'border-[#C47062] text-[#8F4436]' 
                    : 'border-transparent text-[#7A6B5F] hover:text-[#3D3126]'
                }`}
              >
                Customer Reviews ({reviews.length})
              </button>
            </div>

            {/* Description Tab */}
            {infoTab === 'details' && (
              <div className="space-y-3 text-xs text-[#5D4E41] leading-relaxed">
                <p>{product.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-2.5 bg-white rounded-xl border border-[#EDE5DA]">
                    <span className="text-[10px] text-[#8F7E70] uppercase font-semibold block">Craft Style</span>
                    <span className="font-semibold text-[#30241A]">Crochet Hand-Knit</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-[#EDE5DA]">
                    <span className="text-[10px] text-[#8F7E70] uppercase font-semibold block">Filling</span>
                    <span className="font-semibold text-[#30241A]">Hypoallergenic Fiber</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-[#EDE5DA]">
                    <span className="text-[10px] text-[#8F7E70] uppercase font-semibold block">Origin</span>
                    <span className="font-semibold text-[#30241A]">Artisan Studio, India</span>
                  </div>
                </div>
              </div>
            )}

            {/* Care & Material Tab */}
            {infoTab === 'care' && (
              <div className="space-y-3 text-xs text-[#5D4E41]">
                <div>
                  <h4 className="font-bold text-[#30241A] mb-1">Materials Used</h4>
                  <p className="p-2.5 bg-white rounded-xl border border-[#EDE5DA] text-[#48392E]">
                    {product.material}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#30241A] mb-1">Washing & Care Instructions</h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-[#5D4E41]">
                    {product.careInstructions.map((inst, idx) => (
                      <li key={idx}>{inst}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {infoTab === 'reviews' && (
              <div className="space-y-4">
                {/* Rating Overview Header */}
                <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 text-center sm:text-left sm:border-r border-[#EAE2D5] sm:pr-4">
                    <span className="text-3xl font-extrabold text-[#2E231B] tabular-nums">{product.rating}</span>
                    <div className="flex items-center justify-center sm:justify-start gap-1 my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          size={15} 
                          className={s <= Math.round(product.rating) ? 'fill-[#E5A93C] text-[#E5A93C]' : 'text-[#D0C5B7]'} 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#8A796B]">Based on {reviews.length} genuine reviews</span>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="sm:col-span-5 space-y-1 text-xs">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = (ratingCounts as any)[star] || 0;
                      const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="w-6 text-[11px] text-[#7A6B5F] font-semibold">{star}★</span>
                          <div className="flex-1 h-2 bg-[#F2EDE5] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#E5A93C] rounded-full" 
                              style={{ width: `${pct}%` }} 
                            />
                          </div>
                          <span className="w-5 text-[11px] text-[#A09083] tabular-nums text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Write a review button */}
                  <div className="sm:col-span-3 text-center sm:text-right">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="px-3.5 py-2 bg-[#48392E] text-white text-xs font-semibold rounded-xl hover:bg-[#34271D] transition-colors w-full sm:w-auto"
                    >
                      {showReviewForm ? 'Cancel Form' : 'Write a Review'}
                    </button>
                  </div>
                </div>

                {/* Write Review Form */}
                {showReviewForm && (
                  <form onSubmit={handleReviewSubmit} className="p-4 bg-[#F5EFE6] rounded-2xl border border-[#E5DDD2] space-y-3">
                    <h4 className="text-xs font-bold text-[#48392E] uppercase tracking-wider">
                      Share Your Handcrafted Experience
                    </h4>

                    {/* Star selector */}
                    <div>
                      <span className="text-xs text-[#5D4E41] block mb-1">Your Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setNewRating(s)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star 
                              size={20} 
                              className={s <= newRating ? 'fill-[#E5A93C] text-[#E5A93C]' : 'text-[#D0C5B7]'} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-[#48392E] block mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={newReviewerName}
                          onChange={(e) => setNewReviewerName(e.target.value)}
                          placeholder="e.g. Maya Krishnan"
                          className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#D5C9BD] text-xs text-[#30241A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#48392E] block mb-1">Headline</label>
                        <input
                          type="text"
                          value={newReviewTitle}
                          onChange={(e) => setNewReviewTitle(e.target.value)}
                          placeholder="e.g. Stunning stitches and cozy feel"
                          className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#D5C9BD] text-xs text-[#30241A] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#48392E] block mb-1">Review Comments</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Tell other crochet lovers about the texture, colors, and craftsmanship..."
                        className="w-full p-2 rounded-lg bg-white border border-[#D5C9BD] text-xs text-[#30241A] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#C47062] hover:bg-[#B35F52] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <Send size={13} />
                      <span>Submit Review</span>
                    </button>
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviews.length > 0 ? (
                    reviews.map((rev) => (
                      <div key={rev.id} className="p-3.5 bg-white rounded-xl border border-[#EDE5DA] space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#30241A]">{rev.userName}</span>
                            {rev.verifiedPurchase && (
                              <span className="text-[10px] text-[#5B7B59] font-medium flex items-center gap-0.5">
                                <Check size={11} /> Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#A09083]">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              size={12} 
                              className={s <= rev.rating ? 'fill-[#E5A93C] text-[#E5A93C]' : 'text-[#D8CEBF]'} 
                            />
                          ))}
                        </div>
                        <h5 className="text-xs font-bold text-[#30241A]">{rev.title}</h5>
                        <p className="text-xs text-[#5D4E41] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#8A796B] italic py-2">No reviews yet. Be the first to share your thoughts!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Purchase Action Footer */}
        <div className="sticky bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-[#EAE2D5] shadow-lg flex items-center gap-2 sm:gap-3 z-30">
          <div className="hidden xs:flex flex-col">
            <span className="text-[10px] text-[#8A796B] font-semibold uppercase">Total Price</span>
            <span className="text-lg font-extrabold text-[#2A2017] tabular-nums">
              ₹{currentTotalPrice}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-1 justify-end">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 sm:flex-initial sm:px-6 h-11 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                isOutOfStock
                  ? 'bg-[#EAE4DC] text-[#A29486] cursor-not-allowed'
                  : 'bg-[#F2EDE5] text-[#48392E] hover:bg-[#E7DFC5] active:scale-98'
              }`}
            >
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNowClick}
              disabled={isOutOfStock}
              className={`flex-1 sm:flex-initial sm:px-8 h-11 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 text-white shadow-xs transition-all ${
                isOutOfStock
                  ? 'bg-[#C2B7AC] cursor-not-allowed'
                  : 'bg-[#C47062] hover:bg-[#B35F52] active:scale-98'
              }`}
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
