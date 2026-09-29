import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { WishlistView } from './components/WishlistView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderConfirmedView } from './components/OrderConfirmedView';
import { OrderTrackingView } from './components/OrderTrackingView';
import { CustomOrdersView } from './components/CustomOrdersView';
import { ProfileView } from './components/ProfileView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { NotifyMeModal } from './components/NotifyMeModal';
import { AuthView } from './components/AuthView';
import { Product, Order, CustomizationDetails } from './types';
import { Smartphone, Monitor } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    products, 
    activeTab, 
    setActiveTab, 
    selectedProductId, 
    setSelectedProductId, 
    setTrackingOrderId,
    isMobileFrame,
    setIsMobileFrame,
    addToCart,
    isAdminMode,
    isAuthenticated
  } = useShop();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifyProduct, setNotifyProduct] = useState<Product | null>(null);
  const [latestConfirmedOrder, setLatestConfirmedOrder] = useState<Order | null>(null);

  // Selected product object
  const activeProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId) || null 
    : null;

  const handleOpenProduct = (product: Product) => {
    setSelectedProductId(product.id);
  };

  const handleCloseProduct = () => {
    setSelectedProductId(null);
  };

  const handleBuyNowFromPDP = (
    product: Product, 
    color: string, 
    size: string, 
    qty: number, 
    customDetails?: CustomizationDetails, 
    unitPrice?: number
  ) => {
    addToCart(product, color, size, qty, customDetails, unitPrice);
    setSelectedProductId(null);
    setActiveTab('cart');
  };

  const handleOrderCompleted = (order: Order) => {
    setLatestConfirmedOrder(order);
    setActiveTab('tracking');
  };

  const handleTrackOrderFromConfirmed = (orderId: string) => {
    setTrackingOrderId(orderId);
    setActiveTab('tracking');
    setLatestConfirmedOrder(null);
  };

  // Decide what to render in main view
  const renderMainContent = () => {
    if (isAdminMode || activeTab === 'admin') {
      return <AdminDashboardView />;
    }

    if (latestConfirmedOrder && activeTab === 'tracking') {
      return (
        <OrderConfirmedView
          order={latestConfirmedOrder}
          onTrackOrder={handleTrackOrderFromConfirmed}
          onContinueShopping={() => {
            setLatestConfirmedOrder(null);
            setActiveTab('home');
          }}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomeView onOpenProduct={handleOpenProduct} />;
      case 'shop':
        return <ShopView onOpenProduct={handleOpenProduct} />;
      case 'wishlist':
        return (
          <WishlistView 
            onOpenProduct={handleOpenProduct} 
            onExploreProducts={() => setActiveTab('shop')} 
          />
        );
      case 'cart':
        return (
          <CartView 
            onProceedToCheckout={() => setInCheckout(true)} 
            onExploreProducts={() => setActiveTab('shop')} 
          />
        );
      case 'custom-order':
        return <CustomOrdersView />;
      case 'tracking':
        return <OrderTrackingView />;
      case 'profile':
        return (
          <ProfileView 
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenTracking={(id) => {
              setTrackingOrderId(id);
              setActiveTab('tracking');
            }}
          />
        );
      default:
        return <HomeView onOpenProduct={handleOpenProduct} />;
    }
  };

  // Special check: If user clicks checkout from cart
  const [inCheckout, setInCheckout] = useState(false);

  // If not logged in, the first page is Login / Sign Up branded with Saradar
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center">
        <div 
          className={`w-full transition-all duration-300 ${
            isMobileFrame 
              ? 'max-w-[420px] my-6 rounded-[48px] shadow-2xl border-[10px] border-[#2C241E] bg-[#FAF7F2] overflow-hidden min-h-[850px] relative ring-1 ring-black/10' 
              : 'max-w-md w-full'
          }`}
        >
          {isMobileFrame && (
            <div className="w-full bg-[#2C241E] h-5 flex justify-center items-center">
              <div className="w-20 h-3 bg-[#1E1814] rounded-full" />
            </div>
          )}
          <AuthView />
        </div>

        {/* Floating Device Frame View Switcher */}
        <div className="fixed bottom-4 right-4 z-40 hidden lg:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DDD3C6] shadow-md text-xs font-semibold text-[#48392E]">
          <button
            type="button"
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="flex items-center gap-1.5 hover:text-[#C47062] transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Monitor size={14} />
                <span>Fullscreen View</span>
              </>
            ) : (
              <>
                <Smartphone size={14} />
                <span>Simulate Mobile Frame</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center">
      {/* Container: If isMobileFrame is true, render an authentic mobile device container */}
      <div 
        className={`w-full transition-all duration-300 ${
          isMobileFrame 
            ? 'max-w-[420px] my-6 rounded-[48px] shadow-2xl border-[10px] border-[#2C241E] bg-[#FAF7F2] overflow-hidden min-h-[850px] relative ring-1 ring-black/10' 
            : 'max-w-6xl'
        }`}
      >
        {/* Mobile Device Speaker Notch simulator when frame mode is ON */}
        {isMobileFrame && (
          <div className="w-full bg-[#2C241E] h-5 flex justify-center items-center">
            <div className="w-20 h-3 bg-[#1E1814] rounded-full" />
          </div>
        )}

        {/* Global Navigation Header */}
        <Header 
          onOpenNotifications={() => setIsNotificationsOpen(true)} 
        />

        {/* Main Application Content */}
        <main className="flex-1">
          {inCheckout ? (
            <CheckoutView
              onBackToCart={() => setInCheckout(false)}
              onOrderCompleted={(order) => {
                setInCheckout(false);
                setLatestConfirmedOrder(order);
                setActiveTab('tracking');
              }}
            />
          ) : activeTab === 'cart' ? (
            <CartView
              onProceedToCheckout={() => setInCheckout(true)}
              onExploreProducts={() => setActiveTab('shop')}
            />
          ) : (
            renderMainContent()
          )}
        </main>

        {/* Fixed Mobile Bottom Tab Bar (hidden when inside admin or active checkout) */}
        {!isAdminMode && !inCheckout && activeTab !== 'admin' && (
          <BottomNav />
        )}
      </div>

      {/* Floating Device Frame View Switcher for easy testing on wide screens */}
      <div className="fixed bottom-4 right-4 z-40 hidden lg:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#DDD3C6] shadow-md text-xs font-semibold text-[#48392E]">
        <button
          type="button"
          onClick={() => setIsMobileFrame(!isMobileFrame)}
          className="flex items-center gap-1.5 hover:text-[#C47062] transition-colors"
        >
          {isMobileFrame ? (
            <>
              <Monitor size={14} />
              <span>Fullscreen Desktop View</span>
            </>
          ) : (
            <>
              <Smartphone size={14} />
              <span>Simulate Mobile Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Product Details Modal (PDP) */}
      {activeProduct && (
        <ProductDetailModal
          product={activeProduct}
          onClose={handleCloseProduct}
          onBuyNow={handleBuyNowFromPDP}
          onOpenNotifyModal={(prod) => {
            handleCloseProduct();
            setNotifyProduct(prod);
          }}
        />
      )}

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectOrder={(orderId) => {
          setTrackingOrderId(orderId);
          setActiveTab('tracking');
        }}
      />

      {/* Notify Me Modal for Out-of-Stock */}
      <NotifyMeModal
        product={notifyProduct}
        onClose={() => setNotifyProduct(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
