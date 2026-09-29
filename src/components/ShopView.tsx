import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  X, 
  Search, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Category, Product } from '../types';

interface ShopViewProps {
  onOpenProduct: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({ onOpenProduct }) => {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'bestselling'>('recommended');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceMax, setPriceMax] = useState<number>(2000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  // Extract all unique colors from products
  const availableColors = useMemo(() => {
    const colorMap = new Map<string, string>();
    products.forEach(p => {
      p.colors?.forEach(c => {
        if (!colorMap.has(c.name)) {
          colorMap.set(c.name, c.hex);
        }
      });
    });
    return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchSku = product.sku.toLowerCase().includes(q);
        const matchColor = product.colors?.some(c => c.name.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCat && !matchSku && !matchColor) {
          return false;
        }
      }

      // Price filter
      const effectivePrice = product.discountPrice || product.price;
      if (effectivePrice > priceMax) {
        return false;
      }

      // Color filter
      if (selectedColor) {
        const hasColor = product.colors?.some(c => c.name.toLowerCase() === selectedColor.toLowerCase());
        if (!hasColor) return false;
      }

      // In stock only
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      if (sortBy === 'bestselling') return (b.soldCount || 0) - (a.soldCount || 0);
      return 0; // recommended default
    });
  }, [products, selectedCategory, searchQuery, priceMax, selectedColor, inStockOnly, minRating, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (priceMax < 2000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedColor(null);
    setPriceMax(2000);
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('recommended');
  };

  return (
    <div className="pb-24 pt-3 max-w-5xl mx-auto px-4 space-y-4">
      {/* Title & Search bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2E231B]">
              Handcrafted Collection
            </h1>
            <p className="text-xs text-[#8A796B]">
              Saradar artisan crochet catalog
            </p>
          </div>
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-xs font-semibold text-[#C47062] hover:text-[#9B4F43] flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Search input field */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by flower, bag, teddy bear, color..."
            className="w-full h-11 pl-10 pr-9 rounded-xl bg-white border border-[#E8E1D5] text-sm text-[#3A2E24] placeholder-[#9E8F82] focus:outline-none focus:ring-2 focus:ring-[#C47062] shadow-xs"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E8F82]" size={17} />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E8F82] hover:text-[#423326]"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Scroller */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          type="button"
          onClick={() => setSelectedCategory('All')}
          className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'All'
              ? 'bg-[#423326] text-white shadow-xs'
              : 'bg-white border border-[#E8E1D5] text-[#6C5B4E] hover:bg-[#F7F3EC]'
          }`}
        >
          All Items ({products.length})
        </button>

        {categories.filter(c => c !== 'Custom Orders').map((cat) => {
          const count = products.filter(p => p.category === cat).length;
          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#423326] text-white shadow-xs'
                  : 'bg-white border border-[#E8E1D5] text-[#6C5B4E] hover:bg-[#F7F3EC]'
              }`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] tabular-nums ${isSelected ? 'text-[#D9C4B0]' : 'text-[#A09083]'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Control Bar: Filter Trigger, Sort Selector, Results Count */}
      <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-[#EDE6DC]">
        {/* Filter Toggle Button */}
        <button
          type="button"
          onClick={() => setShowFilterDrawer(!showFilterDrawer)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeFiltersCount > 0 
              ? 'bg-[#F4ECE3] text-[#8F4436]' 
              : 'bg-[#F8F5EE] text-[#554437] hover:bg-[#EFE9DD]'
          }`}
        >
          <Filter size={14} />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#C47062] text-white text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Active Results Count */}
        <span className="text-xs text-[#8A7A6E]">
          <span className="font-semibold text-[#2E231B] tabular-nums">{filteredProducts.length}</span> items
        </span>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown size={13} className="text-[#8A7A6E] hidden sm:inline" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium text-[#483A2E] bg-[#F8F5EE] border-0 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C47062] cursor-pointer"
          >
            <option value="recommended">Recommended</option>
            <option value="bestselling">Best Selling</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">New Arrivals</option>
          </select>
        </div>
      </div>

      {/* Filter Drawer / Accordion */}
      {showFilterDrawer && (
        <div className="p-4 bg-white rounded-2xl border border-[#E8E1D5] space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#F2EDE5] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#483A2E]">
              Refine Your Search
            </h3>
            <button
              type="button"
              onClick={() => setShowFilterDrawer(false)}
              className="text-[#9E8F82] hover:text-[#423326]"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#483A2E] mb-1.5">
                <span>Max Price</span>
                <span className="text-[#C47062] tabular-nums">Up to ₹{priceMax}</span>
              </div>
              <input
                type="range"
                min="300"
                max="2000"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#C47062] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A09083]">
                <span>₹300</span>
                <span>₹2000+</span>
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <span className="text-xs font-semibold text-[#483A2E] block mb-1.5">
                Color Palette {selectedColor && `(${selectedColor})`}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableColors.map((color) => {
                  const isSel = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(isSel ? null : color.name)}
                      className={`relative w-6 h-6 rounded-full border transition-transform ${
                        isSel ? 'scale-110 ring-2 ring-[#C47062] border-white' : 'border-black/15 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {isSel && (
                        <Check 
                          size={12} 
                          className="absolute inset-0 m-auto text-white drop-shadow-md stroke-[3]" 
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In-Stock & Availability */}
            <div>
              <span className="text-xs font-semibold text-[#483A2E] block mb-1.5">
                Availability
              </span>
              <label className="flex items-center gap-2 text-xs text-[#554538] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#D0C5B7] text-[#C47062] focus:ring-[#C47062] w-4 h-4"
                />
                <span>In Stock only (hide sold out)</span>
              </label>
            </div>

            {/* Customer Rating Filter */}
            <div>
              <span className="text-xs font-semibold text-[#483A2E] block mb-1.5">
                Minimum Rating
              </span>
              <div className="flex items-center gap-1.5">
                {[0, 4.5, 4.8].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    type="button"
                    onClick={() => setMinRating(ratingVal)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                      minRating === ratingVal
                        ? 'bg-[#48392E] text-white'
                        : 'bg-[#F4ECE3] text-[#5A493B] hover:bg-[#EAE0D3]'
                    }`}
                  >
                    {ratingVal === 0 ? 'All' : `${ratingVal}★+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenProduct}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-3xl border border-[#EDE6DC] p-6 space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#FAF5EE] text-[#8C7A6B] flex items-center justify-center mx-auto text-2xl">
            🧶
          </div>
          <h3 className="font-serif-brand text-lg sm:text-xl font-bold text-[#3D3126]">
            No handcrafted creations found
          </h3>
          <p className="text-xs text-[#8A796B] max-w-sm mx-auto">
            Try adjusting your search keywords, raising your price range, or clearing active filters.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="px-4 py-2 bg-[#48392E] hover:bg-[#34271D] text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
