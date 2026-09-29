import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Clock, 
  Gift, 
  ShieldCheck, 
  CheckCircle2,
  Flower2,
  ShoppingBag,
  Heart,
  Palette,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Category, Product } from '../types';

import imgBouquet from '../assets/images/crochet_tulip_bouquet_1790661298339.jpg';
import imgTeddy from '../assets/images/crochet_teddy_bear_1790661313223.jpg';
import imgTote from '../assets/images/crochet_daisy_totebag_1790661328374.jpg';

interface HomeViewProps {
  onOpenProduct: (product: Product) => void;
}

const CATEGORY_ITEMS: Array<{ name: Category; emoji: string; subtitle: string }> = [
  { name: 'Flowers', emoji: '🌷', subtitle: 'Forever Bouquets' },
  { name: 'Toys', emoji: '🧸', subtitle: 'Amigurumi Plush' },
  { name: 'Bags', emoji: '👜', subtitle: 'Granny Square' },
  { name: 'Keychains', emoji: '🍓', subtitle: 'Pocket Charms' },
  { name: 'Dolls', emoji: '🪆', subtitle: 'Heirloom Keepsakes' },
  { name: 'Accessories', emoji: '👒', subtitle: 'Hats & Clips' },
  { name: 'Home Décor', emoji: '☕', subtitle: 'Mug Rugs & Pots' },
  { name: 'Gifts', emoji: '🎁', subtitle: 'Custom Sets' },
  { name: 'Custom Orders', emoji: '✨', subtitle: 'Bespoke Craft' },
];

export const HomeView: React.FC<HomeViewProps> = ({ onOpenProduct }) => {
  const { 
    products, 
    setSelectedCategory, 
    setActiveTab, 
    setSearchQuery,
    applyCoupon
  } = useShop();

  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setActiveTab('shop');
    }
  };

  const handleCategoryClick = (cat: Category) => {
    if (cat === 'Custom Orders') {
      setActiveTab('custom-order');
    } else {
      setSelectedCategory(cat);
      setActiveTab('shop');
    }
  };

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const specialOffers = products.filter(p => p.isSpecialOffer || (p.discountPrice && p.discountPrice < p.price)).slice(0, 4);

  return (
    <div className="pb-24 pt-3 space-y-6 max-w-5xl mx-auto px-4">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search crochet flowers, teddy bears, tote bags..."
          className="w-full h-11 pl-10 pr-24 rounded-xl bg-white border border-[#E8E1D5] text-sm text-[#3A2E24] placeholder-[#9E8F82] focus:outline-none focus:ring-2 focus:ring-[#C47062] focus:border-transparent shadow-xs transition-all"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E8F82]" size={17} />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#48392E] text-white text-xs font-semibold rounded-lg hover:bg-[#34271D] transition-colors"
        >
          Search
        </button>
      </form>

      {/* Quick Search Suggestions */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs text-[#7A6B5F]">
        <span className="shrink-0 font-medium text-[#503E31]">Popular:</span>
        {['Teddy Bear ₹799', 'Tulip Bouquet', 'Daisy Tote', 'Strawberry Keychain', 'Coasters'].map((tag, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setSearchQuery(tag.split(' ')[0]);
              setActiveTab('shop');
            }}
            className="shrink-0 px-2.5 py-1 rounded-md bg-[#F2EDE5] text-[#554537] hover:bg-[#E7DFC5] transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Hero Promotional Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#EFE8DF] border border-[#E3DACB] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Banner Text Content */}
          <div className="p-6 md:p-8 md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FAF7F2] text-[#8F4436] text-xs font-bold tracking-wide uppercase shadow-2xs">
              <Sparkles size={13} className="text-[#C47062]" />
              Spring Bloom Collection
            </div>

            <h1 className="font-serif-brand text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2219] leading-tight">
              Handcrafted crochet that never withers.
            </h1>

            <p className="text-xs sm:text-sm text-[#6C5B4E] leading-relaxed max-w-md">
              Each piece is stitch-by-stitch crocheted using 100% hypoallergenic milk cotton yarn. Forever bouquets, cuddly amigurumi, and custom treasures.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setActiveTab('shop');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#C47062] hover:bg-[#B35F52] text-white text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-2 transition-transform active:scale-95"
              >
                <span>Shop Now</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('custom-order')}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#D8CEBF] text-[#4A3B2F] hover:bg-[#FAF7F2] text-xs sm:text-sm font-semibold transition-colors"
              >
                Custom Order
              </button>
            </div>

            <div className="text-[11px] text-[#8A796B] flex items-center gap-3 pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#6D8A6B]" /> 100% Hand-knitted
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#6D8A6B]" /> Free gift wrap
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-[#6D8A6B]" /> All India delivery
              </span>
            </div>
          </div>

          {/* Banner Media Showcase */}
          <div className="md:col-span-5 relative aspect-4/3 md:aspect-auto md:h-full min-h-[220px]">
            <img
              src={imgBouquet}
              alt="Handcrafted crochet tulip bouquet"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#EFE8DF]/90 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/60 shadow-xs text-right">
              <p className="text-[10px] text-[#7A6A5C] uppercase tracking-wider font-semibold">Featured</p>
              <p className="text-xs font-bold text-[#2E231B]">Pastel Tulip Bouquet</p>
              <p className="text-xs font-bold text-[#C47062]">₹1,099 <span className="text-[10px] line-through text-[#9E8E80]">₹1,299</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Categories Scroll / Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-serif-brand text-xl sm:text-2xl font-bold text-[#30241A]">
              Explore Categories
            </h2>
            <p className="text-xs text-[#8A7A6E]">Find what speaks to your heart</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
            }}
            className="text-xs font-semibold text-[#C47062] hover:text-[#A75446] flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5">
          {CATEGORY_ITEMS.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCategoryClick(cat.name)}
              className="group flex flex-col items-center text-center p-2.5 rounded-2xl bg-white border border-[#EDE6DC] hover:border-[#C47062] hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F3EC] group-hover:bg-[#F3EBE0] flex items-center justify-center text-2xl mb-1.5 transition-transform group-hover:scale-110">
                {cat.emoji}
              </div>
              <span className="text-xs font-semibold text-[#3D3126] line-clamp-1 group-hover:text-[#C47062]">
                {cat.name}
              </span>
              <span className="text-[10px] text-[#9E8F82] line-clamp-1">
                {cat.subtitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products Showcase */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-serif-brand text-xl sm:text-2xl font-bold text-[#30241A] flex items-center gap-1.5">
              <Sparkles size={18} className="text-[#C47062]" />
              Featured Creations
            </h2>
            <p className="text-xs text-[#8A7A6E]">Curated artisan picks loved across our studio</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
            }}
            className="text-xs font-semibold text-[#C47062] hover:text-[#A75446] flex items-center gap-0.5"
          >
            <span>See more</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenProduct}
            />
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#F6F1EA] border border-[#E9E1D4]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-serif-brand text-xl sm:text-2xl font-bold text-[#30241A] flex items-center gap-1.5">
              <Flame size={18} className="text-[#D96B43]" />
              Best Sellers
            </h2>
            <p className="text-xs text-[#8A7A6E]">Our most ordered handmade treasures this month</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
            }}
            className="text-xs font-semibold text-[#8F4436] hover:underline"
          >
            Shop Best Sellers
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenProduct}
            />
          ))}
        </div>
      </div>

      {/* Custom Crochet Orders Banner */}
      <div className="rounded-3xl p-6 bg-gradient-to-br from-[#45362B] to-[#30251C] text-white shadow-md relative overflow-hidden">
        <div className="max-w-md space-y-3 relative z-10">
          <span className="px-2.5 py-0.5 rounded-md bg-[#C47062] text-white text-[11px] font-bold uppercase tracking-wider">
            Bespoke Atelier
          </span>
          <h3 className="font-serif-brand text-2xl sm:text-3xl font-bold leading-tight">
            Have a dream crochet design in mind?
          </h3>
          <p className="text-xs sm:text-sm text-[#D7CCC2] leading-relaxed">
            Upload an inspiration photo, pick your favorite yarn palette, and our artisans will knit your personalized idea into reality.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('custom-order')}
              className="px-4 py-2 bg-white text-[#30251C] hover:bg-[#FAF7F2] font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            >
              <span>Request Custom Order</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Ambient subtle yarn motif decoration */}
        <div className="absolute -right-8 -bottom-10 opacity-15 text-8xl pointer-events-none select-none">
          🧶
        </div>
      </div>

      {/* New Arrivals & Special Offers Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* New Arrivals */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif-brand text-lg sm:text-xl font-bold text-[#30241A] flex items-center gap-1.5">
              <Clock size={16} className="text-[#5F7D61]" />
              New Arrivals
            </h2>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveTab('shop');
              }}
              className="text-xs font-medium text-[#C47062]"
            >
              View all
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {newArrivals.slice(0, 2).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenProduct}
              />
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-serif-brand text-lg sm:text-xl font-bold text-[#30241A] flex items-center gap-1.5">
              <Gift size={16} className="text-[#B35F52]" />
              Special Offers
            </h2>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setActiveTab('shop');
              }}
              className="text-xs font-medium text-[#C47062]"
            >
              View deals
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {specialOffers.slice(0, 2).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenProduct}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Craftsmanship & Quality Trust Badges */}
      <div className="p-5 rounded-2xl bg-white border border-[#EDE6DC] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] text-[#784A3B] flex items-center justify-center shrink-0">
            <Flower2 size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#2D231B]">100% Milk Cotton</h4>
            <p className="text-[11px] text-[#857467]">Ultra soft, baby-safe, and lint-free</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] text-[#784A3B] flex items-center justify-center shrink-0">
            <Heart size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#2D231B]">Empowering Artisans</h4>
            <p className="text-[11px] text-[#857467]">Ethically made by women crocheters</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] text-[#784A3B] flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#2D231B]">Damage-Proof Box</h4>
            <p className="text-[11px] text-[#857467]">Gift wrapped with safety air cushions</p>
          </div>
        </div>
      </div>
    </div>
  );
};
