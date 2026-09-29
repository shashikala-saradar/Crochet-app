import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Bell, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Sparkles,
  User
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface HeaderProps {
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const { 
    cartCount, 
    wishlist, 
    unreadNotificationsCount, 
    activeTab, 
    setActiveTab,
    isAdminMode,
    setIsAdminMode,
    isMobileFrame,
    setIsMobileFrame,
    setSearchQuery
  } = useShop();

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EDE6DC]">
      {/* Top micro-announcement */}
      <div className="bg-[#48392E] text-[#F4EFEA] text-[11px] font-medium py-1 px-3 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={11} className="text-[#E7A97E]" />
        <span>Handmade with love • Free standard delivery on orders over ₹999</span>
        <span className="hidden sm:inline text-[#E7A97E]">• Code: WELCOME10</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 text-left group"
        >
          <div className="w-8 h-8 rounded-full bg-[#EFE8DF] border border-[#DDD4C7] flex items-center justify-center text-[#7A4B3A] font-serif-brand font-bold text-lg shadow-2xs group-hover:scale-105 transition-transform">
            🧶
          </div>
          <div>
            <span className="font-serif-brand text-xl sm:text-2xl font-bold tracking-tight text-[#30251C] leading-none block">
              Saradar
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#8A796C] font-semibold block sm:inline">
              Crochet Boutique
            </span>
          </div>
        </button>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#655344]">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`transition-colors hover:text-[#2E231B] ${activeTab === 'home' ? 'text-[#C47062] font-semibold' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('shop')} 
            className={`transition-colors hover:text-[#2E231B] ${activeTab === 'shop' ? 'text-[#C47062] font-semibold' : ''}`}
          >
            Shop All
          </button>
          <button 
            onClick={() => setActiveTab('custom-order')} 
            className={`transition-colors hover:text-[#2E231B] flex items-center gap-1 ${activeTab === 'custom-order' ? 'text-[#C47062] font-semibold' : ''}`}
          >
            <Sparkles size={13} className="text-[#C47062]" />
            <span>Custom Orders</span>
          </button>
          <button 
            onClick={() => setActiveTab('tracking')} 
            className={`transition-colors hover:text-[#2E231B] ${activeTab === 'tracking' ? 'text-[#C47062] font-semibold' : ''}`}
          >
            Track Order
          </button>
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Search Shortcut */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('shop');
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#554436] hover:bg-[#EFE9DF] transition-colors"
            title="Search Products"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#554436] hover:bg-[#EFE9DF] transition-colors"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C47062] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Wishlist Shortcut */}
          <button
            type="button"
            onClick={() => setActiveTab('wishlist')}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              activeTab === 'wishlist' 
                ? 'bg-[#EFE9DF] text-[#C47062]' 
                : 'text-[#554436] hover:bg-[#EFE9DF]'
            }`}
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart size={18} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C47062] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Shortcut */}
          <button
            type="button"
            onClick={() => setActiveTab('cart')}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              activeTab === 'cart' 
                ? 'bg-[#48392E] text-white' 
                : 'text-[#554436] hover:bg-[#EFE9DF]'
            }`}
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-[#C47062] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Shortcut */}
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#554436] hover:bg-[#EFE9DF] transition-colors"
            title="User Profile"
            aria-label="User Profile"
          >
            <User size={18} />
          </button>

          {/* Role Switcher: Admin Mode Toggle Button */}
          <button
            type="button"
            onClick={() => {
              if (isAdminMode) {
                setIsAdminMode(false);
                setActiveTab('home');
              } else {
                setIsAdminMode(true);
                setActiveTab('admin');
              }
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              isAdminMode 
                ? 'bg-[#8F3E34] text-white shadow-xs' 
                : 'bg-[#EAE3D6] text-[#554436] hover:bg-[#E0D7C7]'
            }`}
            title="Toggle Admin Dashboard"
          >
            <ShieldCheck size={14} />
            <span>{isAdminMode ? 'Admin Active' : 'Admin Panel'}</span>
          </button>

          {/* Device Frame View Toggle (Mobile view simulator vs Responsive) */}
          <button
            type="button"
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-xs border transition-colors ${
              isMobileFrame 
                ? 'bg-[#48392E] text-white border-[#48392E]' 
                : 'bg-white text-[#655344] border-[#DDD4C7] hover:bg-[#F2ECE4]'
            }`}
            title={isMobileFrame ? "Switch to Fullscreen Desktop View" : "Simulate Mobile Device Frame"}
          >
            {isMobileFrame ? <Monitor size={15} /> : <Smartphone size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
};
