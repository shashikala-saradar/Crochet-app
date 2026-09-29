import React from 'react';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cartCount, wishlist } = useShop();

  const navItems = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Home,
      badge: 0
    },
    {
      id: 'shop' as const,
      label: 'Categories',
      icon: Grid,
      badge: 0
    },
    {
      id: 'wishlist' as const,
      label: 'Wishlist',
      icon: Heart,
      badge: wishlist.length
    },
    {
      id: 'cart' as const,
      label: 'Cart',
      icon: ShoppingBag,
      badge: cartCount
    },
    {
      id: 'profile' as const,
      label: 'Profile',
      icon: User,
      badge: 0
    }
  ];

  return (
    <nav 
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EAE3D6] shadow-lg md:hidden"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center relative py-1 transition-colors ${
                isActive ? 'text-[#C47062]' : 'text-[#7D6B5D] hover:text-[#3D332A]'
              }`}
            >
              <div className="relative">
                <IconComponent 
                  size={21} 
                  className={`transition-transform duration-150 ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'}`} 
                />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-[#C47062] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-tight ${isActive ? 'font-bold text-[#C47062]' : 'text-[#7D6B5D]'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 bg-[#C47062] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
