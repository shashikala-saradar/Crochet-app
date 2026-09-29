import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  CartItem, 
  Review, 
  Coupon, 
  Order, 
  OrderStatus, 
  CustomOrderRequest, 
  CustomerDetails, 
  NotificationItem,
  CustomizationDetails
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  INITIAL_COUPONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ORDERS 
} from '../data/mockData';

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  savedForLater: CartItem[];
  wishlist: Product[];
  orders: Order[];
  customOrders: CustomOrderRequest[];
  reviews: Review[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  notifications: NotificationItem[];
  user: CustomerDetails;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, name?: string) => void;
  signup: (name: string, email: string, phone: string) => void;
  logout: () => void;
  activeTab: 'home' | 'shop' | 'wishlist' | 'cart' | 'profile' | 'custom-order' | 'admin' | 'tracking';
  selectedCategory: Category | 'All';
  searchQuery: string;
  selectedProductId: string | null;
  trackingOrderId: string | null;
  isAdminMode: boolean;
  isMobileFrame: boolean;
  unreadNotificationsCount: number;
  
  // Navigation & Setters
  setActiveTab: (tab: 'home' | 'shop' | 'wishlist' | 'cart' | 'profile' | 'custom-order' | 'admin' | 'tracking') => void;
  setSelectedCategory: (cat: Category | 'All') => void;
  setSearchQuery: (query: string) => void;
  setSelectedProductId: (id: string | null) => void;
  setTrackingOrderId: (id: string | null) => void;
  setIsAdminMode: (admin: boolean) => void;
  setIsMobileFrame: (frame: boolean) => void;
  setUser: (user: CustomerDetails) => void;

  // Cart operations
  addToCart: (
    product: Product, 
    color: string, 
    size: string, 
    quantity: number, 
    customDetails?: CustomizationDetails,
    overrideUnitPrice?: number
  ) => boolean;
  updateCartQuantity: (itemId: string, newQty: number) => void;
  removeFromCart: (itemId: string) => void;
  saveForLaterItem: (itemId: string) => void;
  moveToCartFromSaved: (itemId: string) => void;
  clearCart: () => void;

  // Cart Calculations
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTax: number;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  moveWishlistToCart: (product: Product) => void;

  // Coupons
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Orders
  placeOrder: (
    customer: CustomerDetails, 
    deliveryType: 'standard' | 'express', 
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'wallet'
  ) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;

  // Custom Orders
  submitCustomOrder: (request: Omit<CustomOrderRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateCustomOrderPrice: (id: string, price: number) => void;
  updateCustomOrderStatus: (id: string, status: CustomOrderRequest['status']) => void;

  // Inventory & Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, newStock: number) => void;

  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  deleteReview: (reviewId: string) => void;
  getProductReviews: (productId: string) => Review[];

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (title: string, message: string, type: NotificationItem['type'], relatedId?: string) => void;
}

const ALL_CATEGORIES: Category[] = [
  'Flowers',
  'Bags',
  'Toys',
  'Keychains',
  'Dolls',
  'Accessories',
  'Home Décor',
  'Gifts',
  'Custom Orders'
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('stitch_bloom_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('stitch_bloom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('stitch_bloom_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('stitch_bloom_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Custom Orders state
  const [customOrders, setCustomOrders] = useState<CustomOrderRequest[]>([
    {
      id: 'CUST-101',
      customerName: 'Aarav Gupta',
      customerEmail: 'aarav@example.com',
      customerPhone: '+91 99887 76655',
      productType: 'Crochet Bouquet',
      primaryColor: 'Champagne Ivory',
      accentColor: 'Soft Sage Green',
      size: 'Grand (15 Stems)',
      details: 'Wanted 8 white calla lilies and 7 lavender roses wrapped in vintage brown parchment paper with a bronze satin ribbon for our 5th wedding anniversary.',
      specialInstructions: 'Please include an engraved wooden tag saying "Forever in Bloom - Aarav & Rhea".',
      status: 'Price Quoted',
      quotedPrice: 1850,
      createdAt: '25 Sep 2026'
    }
  ]);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('stitch_bloom_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Coupons state
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // User details
  const [user, setUser] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem('saradar_user');
      return saved ? JSON.parse(saved) : {
        name: 'Shashikala Sardar',
        phone: '+91 98765 43210',
        email: 'shashikala@saradar.com',
        address: 'Flat 402, Bloom Residency, Indiranagar 12th Main',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560038'
      };
    } catch {
      return {
        name: 'Shashikala Sardar',
        phone: '+91 98765 43210',
        email: 'shashikala@saradar.com',
        address: 'Flat 402, Bloom Residency, Indiranagar 12th Main',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560038'
      };
    }
  });

  // Auth state: starts false so first page is Login / Sign Up as requested
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('saradar_auth') === 'true';
    } catch {
      return false;
    }
  });

  const login = (emailOrPhone: string, displayName?: string) => {
    setUser(prev => {
      const updated = {
        ...prev,
        email: emailOrPhone.includes('@') ? emailOrPhone : prev.email,
        phone: !emailOrPhone.includes('@') ? emailOrPhone : prev.phone,
        name: displayName || prev.name
      };
      try {
        localStorage.setItem('saradar_user', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('saradar_auth', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const signup = (name: string, email: string, phone: string) => {
    const newUser: CustomerDetails = {
      name,
      email,
      phone,
      address: 'Flat 101, Sunshine Heights',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001'
    };
    setUser(newUser);
    try {
      localStorage.setItem('saradar_user', JSON.stringify(newUser));
    } catch (e) {
      console.error(e);
    }
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('saradar_auth', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('saradar_auth');
    } catch (e) {
      console.error(e);
    }
    setActiveTab('home');
  };

  // Navigation states
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'wishlist' | 'cart' | 'profile' | 'custom-order' | 'admin' | 'tracking'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>('SB-9412');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Persist important data
  useEffect(() => {
    try {
      localStorage.setItem('stitch_bloom_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('stitch_bloom_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('stitch_bloom_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('stitch_bloom_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('stitch_bloom_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  // Cart operations
  const addToCart = (
    product: Product, 
    color: string, 
    size: string, 
    quantity: number, 
    customDetails?: CustomizationDetails,
    overrideUnitPrice?: number
  ): boolean => {
    if (product.stock < quantity) {
      return false;
    }

    // Calculate item unit price with modifiers
    let unitPrice = overrideUnitPrice || product.discountPrice || product.price;
    if (product.sizePriceModifiers && product.sizePriceModifiers[size]) {
      unitPrice += product.sizePriceModifiers[size];
    }
    if (customDetails?.nameTag && product.customizationOptions?.nameTagPrice) {
      unitPrice += product.customizationOptions.nameTagPrice;
    }
    if (customDetails?.pattern && product.customizationOptions?.patternPrice) {
      unitPrice += product.customizationOptions.patternPrice;
    }
    if (customDetails?.giftWrap && product.customizationOptions?.giftWrapPrice) {
      unitPrice += product.customizationOptions.giftWrapPrice;
    }

    setCart(prev => {
      // Check if identical item already exists in cart
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size &&
        item.customDetails?.nameTag === customDetails?.nameTag &&
        item.customDetails?.giftWrap === customDetails?.giftWrap
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * updated[existingIndex].unitPrice
        };
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        product,
        selectedColor: color,
        selectedSize: size,
        quantity,
        customDetails,
        unitPrice,
        totalPrice: unitPrice * quantity
      };

      return [...prev, newItem];
    });

    addNotification(
      'Added to Cart',
      `"${product.name}" was added to your crochet basket.`,
      'order',
      product.id
    );

    return true;
  };

  const updateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        // Check stock boundary
        const safeQty = Math.min(newQty, item.product.stock);
        return {
          ...item,
          quantity: safeQty,
          totalPrice: safeQty * item.unitPrice
        };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const saveForLaterItem = (itemId: string) => {
    const itemToSave = cart.find(item => item.id === itemId);
    if (itemToSave) {
      setSavedForLater(prev => [...prev, itemToSave]);
      setCart(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const moveToCartFromSaved = (itemId: string) => {
    const item = savedForLater.find(i => i.id === itemId);
    if (item) {
      setCart(prev => [...prev, item]);
      setSavedForLater(prev => prev.filter(i => i.id !== itemId));
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Delivery: Free if subtotal > 999 or if coupon FREESHIP is active, else ₹60
  const isFreeDeliveryEligible = cartSubtotal >= 999 || appliedCoupon?.code === 'FREESHIP';
  const cartDeliveryFee = cart.length === 0 ? 0 : (isFreeDeliveryEligible ? 0 : 60);

  // Coupon discount computation
  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountPercent) {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.flatDiscount) {
      cartDiscount = appliedCoupon.flatDiscount;
    }
  }

  // Modest tax computation (e.g. 5% GST on handicrafts)
  const cartTax = cart.length === 0 ? 0 : Math.round((cartSubtotal - cartDiscount) * 0.05);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee + cartTax);

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        addNotification(
          'Saved to Wishlist',
          `"${product.name}" is now in your saved favorites.`,
          'stock',
          product.id
        );
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const moveWishlistToCart = (product: Product) => {
    const defaultColor = product.colors[0]?.name || 'Natural';
    const defaultSize = product.sizes[0] || 'Standard';
    addToCart(product, defaultColor, defaultSize, 1);
    removeFromWishlist(product.id);
  };

  // Coupons
  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try WELCOME10 or BLOOM150.' };
    }
    if (cartSubtotal < found.minOrder) {
      return { 
        success: false, 
        message: `This coupon requires a minimum cart value of ₹${found.minOrder}. Add items worth ₹${found.minOrder - cartSubtotal} more.` 
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Orders
  const placeOrder = (
    customer: CustomerDetails, 
    deliveryType: 'standard' | 'express', 
    paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'wallet'
  ): Order => {
    const orderId = `SB-${Math.floor(1000 + Math.random() * 9000)}`;
    const estDays = deliveryType === 'express' ? 2 : 4;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + estDays);
    const estDateFormatted = estDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryCharge: deliveryType === 'express' ? 120 : cartDeliveryFee,
      deliveryType,
      tax: cartTax,
      total: cartTotal + (deliveryType === 'express' ? (120 - cartDeliveryFee) : 0),
      appliedCoupon: appliedCoupon?.code,
      customer,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'Order Placed',
      statusHistory: [
        {
          status: 'Order Placed',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
          description: 'Order placed and logged into Stitch & Bloom boutique studio.'
        },
        ...(paymentMethod !== 'cod' ? [{
          status: 'Payment Confirmed' as OrderStatus,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
          description: `${paymentMethod.toUpperCase()} payment verified successfully.`
        }] : [])
      ],
      estimatedDeliveryDate: estDateFormatted,
      trackingNumber: `DELHIVERY-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courierPartner: 'Delhivery Surface Express'
    };

    // Deduct stock for ordered items
    setProducts(prev => prev.map(p => {
      const purchased = cart.filter(ci => ci.product.id === p.id);
      const totalPurchasedQty = purchased.reduce((s, ci) => s + ci.quantity, 0);
      if (totalPurchasedQty > 0) {
        const updatedStock = Math.max(0, p.stock - totalPurchasedQty);
        return {
          ...p,
          stock: updatedStock,
          soldCount: p.soldCount + totalPurchasedQty
        };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setTrackingOrderId(orderId);

    addNotification(
      'Order Confirmed! 🎉',
      `Order #${orderId} was confirmed. Artisan Anita is preparing your items.`,
      'order',
      orderId
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const history = [...order.statusHistory];
        const nowTime = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' ' + 
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let desc = `Order moved to ${newStatus}.`;
        if (newStatus === 'Payment Confirmed') desc = 'Payment successfully confirmed.';
        if (newStatus === 'Order Processing') desc = 'Artisan has picked cotton skeins & patterns.';
        if (newStatus === 'Crochet Product Being Prepared') desc = 'Handmade crocheting & assembly in progress.';
        if (newStatus === 'Shipped') desc = `Dispatched with ${order.courierPartner}.`;
        if (newStatus === 'Out for Delivery') desc = 'Courier agent is out with your parcel.';
        if (newStatus === 'Delivered') desc = 'Handed over to customer with signature.';

        history.push({
          status: newStatus,
          timestamp: nowTime,
          description: desc
        });

        return {
          ...order,
          orderStatus: newStatus,
          paymentStatus: newStatus === 'Delivered' ? 'paid' : order.paymentStatus,
          statusHistory: history
        };
      }
      return order;
    }));

    addNotification(
      `Order Update: ${orderId}`,
      `Your order is now: ${newStatus}`,
      'order',
      orderId
    );
  };

  // Custom orders
  const submitCustomOrder = (req: Omit<CustomOrderRequest, 'id' | 'createdAt' | 'status'>) => {
    const id = `CUST-${Math.floor(100 + Math.random() * 900)}`;
    const newReq: CustomOrderRequest = {
      ...req,
      id,
      status: 'Submitted',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setCustomOrders(prev => [newReq, ...prev]);

    addNotification(
      'Custom Order Received',
      `Your custom request #${id} has been submitted for artisan review.`,
      'custom',
      id
    );
  };

  const updateCustomOrderPrice = (id: string, price: number) => {
    setCustomOrders(prev => prev.map(o => o.id === id ? { ...o, quotedPrice: price, status: 'Price Quoted' } : o));
    addNotification(
      'Custom Quote Ready',
      `Artisan quoted ₹${price} for custom order #${id}.`,
      'custom',
      id
    );
  };

  const updateCustomOrderStatus = (id: string, status: CustomOrderRequest['status']) => {
    setCustomOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  // Inventory & Product Management
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...prodData,
      id: newId
    };
    setProducts(prev => [newProduct, ...prev]);
    addNotification('New Product Added', `Product "${prodData.name}" has been published to catalog.`, 'offer');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setReviews(prev => [newReview, ...prev]);

    // Recalculate product rating
    setProducts(prev => prev.map(p => {
      if (p.id === reviewData.productId) {
        const prodReviews = [...reviews.filter(r => r.productId === p.id), newReview];
        const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
        return {
          ...p,
          rating: Number(avg.toFixed(1)),
          reviewsCount: prodReviews.length
        };
      }
      return p;
    }));

    addNotification(
      'Review Published',
      `Thank you for reviewing! Your feedback helps our artisans thrive.`,
      'offer'
    );
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'], relatedId?: string) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      read: false,
      type,
      relatedId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <ShopContext.Provider
      value={{
        products,
        categories: ALL_CATEGORIES,
        cart,
        savedForLater,
        wishlist,
        orders,
        customOrders,
        reviews,
        coupons,
        appliedCoupon,
        notifications,
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        activeTab,
        selectedCategory,
        searchQuery,
        selectedProductId,
        trackingOrderId,
        isAdminMode,
        isMobileFrame,
        unreadNotificationsCount,

        setActiveTab,
        setSelectedCategory,
        setSearchQuery,
        setSelectedProductId,
        setTrackingOrderId,
        setIsAdminMode,
        setIsMobileFrame,
        setUser,

        addToCart,
        updateCartQuantity,
        removeFromCart,
        saveForLaterItem,
        moveToCartFromSaved,
        clearCart,

        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTax,
        cartTotal,
        cartCount,

        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        moveWishlistToCart,

        applyCoupon,
        removeCoupon,

        placeOrder,
        updateOrderStatus,

        submitCustomOrder,
        updateCustomOrderPrice,
        updateCustomOrderStatus,

        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,

        addReview,
        deleteReview,
        getProductReviews,

        markNotificationRead,
        markAllNotificationsRead,
        addNotification
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
