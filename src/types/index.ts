export type Category = 
  | 'Flowers'
  | 'Bags'
  | 'Toys'
  | 'Keychains'
  | 'Dolls'
  | 'Accessories'
  | 'Home Décor'
  | 'Gifts'
  | 'Custom Orders';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CustomizationOptions {
  allowNameTag?: boolean;
  nameTagPrice?: number;
  allowAccentColor?: boolean;
  allowPatterns?: string[];
  patternPrice?: number;
  giftWrapAvailable?: boolean;
  giftWrapPrice?: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  photos?: string[];
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  sku: string;
  material: string;
  careInstructions: string[];
  colors: ProductColor[];
  sizes: string[];
  sizePriceModifiers?: Record<string, number>;
  stock: number;
  soldCount: number;
  estimatedDeliveryDays: string;
  deliveryCharge: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  customisable: boolean;
  customizationOptions?: CustomizationOptions;
}

export interface CustomizationDetails {
  nameTag?: string;
  accentColor?: string;
  pattern?: string;
  specialNotes?: string;
  giftWrap?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  customDetails?: CustomizationDetails;
  unitPrice: number;
  totalPrice: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Payment Confirmed'
  | 'Order Processing'
  | 'Crochet Product Being Prepared'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered';

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  deliveryType: 'standard' | 'express';
  tax: number;
  total: number;
  appliedCoupon?: string;
  customer: CustomerDetails;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'wallet';
  paymentStatus: 'paid' | 'pending';
  orderStatus: OrderStatus;
  statusHistory: Array<{
    status: OrderStatus;
    timestamp: string;
    description: string;
  }>;
  estimatedDeliveryDate: string;
  trackingNumber: string;
  courierPartner: string;
}

export interface CustomOrderRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productType: string;
  primaryColor: string;
  accentColor?: string;
  size: string;
  details: string;
  specialInstructions: string;
  referenceImage?: string;
  status: 'Submitted' | 'Under Review' | 'Price Quoted' | 'Approved' | 'Crafting' | 'Completed';
  quotedPrice?: number;
  createdAt: string;
}

export interface Coupon {
  code: string;
  description: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrder: number;
  expiry: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'offer' | 'stock' | 'custom';
  relatedId?: string;
}
