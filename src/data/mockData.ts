import { Product, Review, Coupon, NotificationItem, Order } from '../types';

import imgTulipBouquet from '../assets/images/crochet_tulip_bouquet_1790661298339.jpg';
import imgTeddyBear from '../assets/images/crochet_teddy_bear_1790661313223.jpg';
import imgDaisyTotebag from '../assets/images/crochet_daisy_totebag_1790661328374.jpg';
import imgStrawberryKeychain from '../assets/images/crochet_strawberry_keychain_1790661344415.jpg';
import imgCoasterDecor from '../assets/images/crochet_coaster_decor_1790661359884.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Crochet Teddy Bear Amigurumi',
    category: 'Toys',
    price: 799,
    discountPrice: 699,
    rating: 4.8,
    reviewsCount: 34,
    images: [imgTeddyBear, imgTeddyBear],
    description: 'Lovingly handcrafted teddy bear crafted with ultra-soft combed milk cotton yarn and hypoallergenic polyfill. Features a hand-knitted cream mini-scarf and safely secured embroidered features, making it a timeless nursery keepsake or heartfelt hug for any age.',
    sku: 'SB-TY-001',
    material: '100% Combed Milk Cotton Yarn, Hypoallergenic Polyfill',
    careInstructions: [
      'Spot clean with mild soapy water or gentle hand wash at 30°C',
      'Do not wring or tumble dry',
      'Reshape and dry flat in shaded natural air'
    ],
    colors: [
      { name: 'Warm Brown', hex: '#8B5A2B' },
      { name: 'Blush Pink', hex: '#E8B4B8' },
      { name: 'Milk White', hex: '#FAF9F6' },
      { name: 'Baby Blue', hex: '#A2C2E0' }
    ],
    sizes: ['Small (6 inches)', 'Medium (9 inches)', 'Large (12 inches)'],
    sizePriceModifiers: {
      'Small (6 inches)': 0,
      'Medium (9 inches)': 150,
      'Large (12 inches)': 300
    },
    stock: 12,
    soldCount: 88,
    estimatedDeliveryDays: '3–5 days',
    deliveryCharge: 0,
    isBestSeller: true,
    isFeatured: true,
    customisable: true,
    customizationOptions: {
      allowNameTag: true,
      nameTagPrice: 99,
      allowAccentColor: true,
      giftWrapAvailable: true,
      giftWrapPrice: 49
    }
  },
  {
    id: 'prod-2',
    name: 'Eternal Pastel Tulip & Daisy Bouquet',
    category: 'Flowers',
    price: 1299,
    discountPrice: 1099,
    rating: 4.9,
    reviewsCount: 52,
    images: [imgTulipBouquet, imgTulipBouquet],
    description: 'An everlasting hand-crocheted bouquet with 5 blooming pastel tulips, 3 cheerful daisies, and verdant eucalyptus leaves. Wrapped in textured artisanal kraft paper with a satin champagne ribbon. Never wilts, allergy-free, and brings perpetual spring to any home.',
    sku: 'SB-FL-002',
    material: '80% Soft Cotton, 20% Acrylic for shape retention, Floral Wire Stem',
    careInstructions: [
      'Gently dust with a soft makeup brush or blowdryer on cool setting',
      'Keep away from prolonged direct harsh sunlight to preserve dye vibrance',
      'Stems can be gently bent to adjust arrangement height'
    ],
    colors: [
      { name: 'Pastel Sunset', hex: '#F7CAC9' },
      { name: 'Lavender & Cream', hex: '#C5B4E3' },
      { name: 'Sunny Peach', hex: '#FFD1A4' },
      { name: 'Spring Garden', hex: '#A8D5BA' }
    ],
    sizes: ['Standard (7 Stems)', 'Deluxe (11 Stems)', 'Grand (15 Stems)'],
    sizePriceModifiers: {
      'Standard (7 Stems)': 0,
      'Deluxe (11 Stems)': 350,
      'Grand (15 Stems)': 700
    },
    stock: 7,
    soldCount: 142,
    estimatedDeliveryDays: '3–4 days',
    deliveryCharge: 0,
    isFeatured: true,
    isBestSeller: true,
    customisable: true,
    customizationOptions: {
      allowNameTag: true,
      nameTagPrice: 79,
      allowAccentColor: true,
      giftWrapAvailable: true,
      giftWrapPrice: 49
    }
  },
  {
    id: 'prod-3',
    name: 'Granny Square Daisy Meadow Tote Bag',
    category: 'Bags',
    price: 1499,
    discountPrice: 1299,
    rating: 4.7,
    reviewsCount: 29,
    images: [imgDaisyTotebag, imgDaisyTotebag],
    description: 'Bohemian aesthetic tote bag lovingly assembled from 18 individual floral granny squares in sage green, oat milk, and marigold. Reinforced thick crochet handles distribute shoulder weight comfortably, and the interior is lined with natural unbleached cotton canvas.',
    sku: 'SB-BG-003',
    material: '100% Recycled Cotton Yarn, Natural Cotton Canvas Inner Lining',
    careInstructions: [
      'Hand wash gently in cool water with mild wool detergent',
      'Lay flat inside a towel to absorb excess moisture',
      'Do not hang while wet to avoid stretching handles'
    ],
    colors: [
      { name: 'Sage & Daisy', hex: '#8FA88D' },
      { name: 'Oatmeal & Lilac', hex: '#D8CFBC' },
      { name: 'Earthy Terracotta', hex: '#C27664' }
    ],
    sizes: ['Medium (13" x 14")', 'Large (15" x 16")'],
    sizePriceModifiers: {
      'Medium (13" x 14")': 0,
      'Large (15" x 16")': 200
    },
    stock: 5,
    soldCount: 46,
    estimatedDeliveryDays: '4–6 days',
    deliveryCharge: 0,
    isNewArrival: true,
    isFeatured: true,
    customisable: true,
    customizationOptions: {
      allowNameTag: true,
      nameTagPrice: 99,
      allowPatterns: ['Classic Daisy', 'Sunflower Burst', 'Checkered Bloom'],
      patternPrice: 50,
      giftWrapAvailable: true,
      giftWrapPrice: 49
    }
  },
  {
    id: 'prod-4',
    name: 'Sweet Strawberry & Avocado Keychain Set',
    category: 'Keychains',
    price: 399,
    discountPrice: 349,
    rating: 4.8,
    reviewsCount: 67,
    images: [imgStrawberryKeychain, imgStrawberryKeychain],
    description: 'Charming pair of pocket-sized crochet companions. Featuring a juicy red strawberry with tiny embroidered seeds and a smiling avocado with a 3D seed belly. Fitted with heavy-duty golden lobster clasps suitable for car keys, backpacks, or tote bags.',
    sku: 'SB-KC-004',
    material: 'Combed Mercerized Cotton, Alloy Gold Plated Hardware',
    careInstructions: [
      'Wipe with a damp cloth',
      'Keep metal hardware dry to prevent tarnishing'
    ],
    colors: [
      { name: 'Berry & Avo Duo', hex: '#E63946' },
      { name: 'Pastel Strawberry', hex: '#FFB5A7' },
      { name: 'Matcha & Citrus', hex: '#A3B18A' }
    ],
    sizes: ['One Size (Approx 2.5 inches each)'],
    stock: 22,
    soldCount: 215,
    estimatedDeliveryDays: '2–4 days',
    deliveryCharge: 50,
    isBestSeller: true,
    customisable: true,
    customizationOptions: {
      allowNameTag: true,
      nameTagPrice: 49,
      giftWrapAvailable: true,
      giftWrapPrice: 39
    }
  },
  {
    id: 'prod-5',
    name: 'Botanical Bloom Mug Rug Coasters (Set of 4)',
    category: 'Home Décor',
    price: 599,
    discountPrice: 499,
    rating: 4.9,
    reviewsCount: 41,
    images: [imgCoasterDecor, imgCoasterDecor],
    description: 'Set of 4 handcrafted floral coasters that protect your tables while adding a touch of cottagecore aesthetic. Featuring petal scalloped borders in calming sage, soft lavender, butter cream, and dusty rose. Highly absorbent and heat insulating.',
    sku: 'SB-HD-005',
    material: '100% Organic Bamboo & Cotton Blend',
    careInstructions: [
      'Machine wash gentle cycle in a laundry mesh bag',
      'Iron on low heat if desired with a pressing cloth'
    ],
    colors: [
      { name: 'Pastel Garden', hex: '#B5A5C8' },
      { name: 'Sage & Cream', hex: '#8FA88D' },
      { name: 'Warm Terracotta', hex: '#D48372' }
    ],
    sizes: ['Standard 4.5" Diameter', 'Mug Mat 6" Diameter'],
    sizePriceModifiers: {
      'Standard 4.5" Diameter': 0,
      'Mug Mat 6" Diameter': 120
    },
    stock: 3, // Low stock example!
    soldCount: 94,
    estimatedDeliveryDays: '3–5 days',
    deliveryCharge: 50,
    isSpecialOffer: true,
    customisable: true,
    customizationOptions: {
      giftWrapAvailable: true,
      giftWrapPrice: 49
    }
  },
  {
    id: 'prod-6',
    name: 'Luna The Woodland Bunny with Pinafore',
    category: 'Dolls',
    price: 999,
    discountPrice: 899,
    rating: 5.0,
    reviewsCount: 18,
    images: [imgTeddyBear, imgTeddyBear],
    description: 'An heirloom keepsake doll with floppy ears, delicate blush cheeks, and a removable sage floral pinafore dress. Made stitch by stitch with supreme attention to detail, making it an enchanting companion for children and collectors alike.',
    sku: 'SB-DL-006',
    material: 'Organic Milk Cotton, Safety Locking Eyes, Hypoallergenic Fiberfill',
    careInstructions: [
      'Hand wash dress separately',
      'Spot clean bunny body with mild baby shampoo'
    ],
    colors: [
      { name: 'Oatmeal Bunny / Sage Dress', hex: '#E3DAC9' },
      { name: 'Cream Bunny / Lavender Dress', hex: '#FAF9F6' },
      { name: 'Caramel Bunny / Pink Dress', hex: '#C68B59' }
    ],
    sizes: ['Regular (11 inches)'],
    stock: 4,
    soldCount: 37,
    estimatedDeliveryDays: '4–6 days',
    deliveryCharge: 0,
    isNewArrival: true,
    customisable: true,
    customizationOptions: {
      allowNameTag: true,
      nameTagPrice: 99,
      allowAccentColor: true,
      giftWrapAvailable: true,
      giftWrapPrice: 49
    }
  },
  {
    id: 'prod-7',
    name: 'Daisy Checkered Crochet Bucket Hat',
    category: 'Accessories',
    price: 649,
    discountPrice: 549,
    rating: 4.6,
    reviewsCount: 23,
    images: [imgDaisyTotebag, imgDaisyTotebag],
    description: 'Trendy yet vintage sun bucket hat crocheted with breathable cotton yarn. Lightweight, foldable to pack into bags without losing shape, and decorated with delicate daisy appliqués along the brim.',
    sku: 'SB-AC-007',
    material: '100% Breathable Cotton Yarn',
    careInstructions: [
      'Gentle hand wash cold',
      'Dry flat over a rounded bowl to preserve crown shape'
    ],
    colors: [
      { name: 'Cream & Buttercup', hex: '#FDF6E2' },
      { name: 'Sage & Forest', hex: '#8FA88D' },
      { name: 'Lavender Haze', hex: '#B5A5C8' }
    ],
    sizes: ['Standard Adult (56-58 cm)', 'Youth / Petite (52-54 cm)'],
    stock: 8,
    soldCount: 61,
    estimatedDeliveryDays: '3–5 days',
    deliveryCharge: 50,
    isSpecialOffer: true,
    customisable: false
  },
  {
    id: 'prod-8',
    name: 'Personalized Custom Newborn Keepsake Gift Set',
    category: 'Gifts',
    price: 1599,
    discountPrice: 1399,
    rating: 4.9,
    reviewsCount: 39,
    images: [imgTeddyBear, imgTulipBouquet],
    description: 'A curated gift box containing a custom embroidered baby rattle, a pair of crochet booties, and a soft mini comfort bunny. Comes in a luxury magnetic kraft keepsake box with dried lavender and custom calligraphy blessing card.',
    sku: 'SB-GF-008',
    material: 'GOTS Certified Organic Baby Cotton',
    careInstructions: [
      'Baby-safe gentle machine wash in mesh bag on delicate',
      'Air dry flat'
    ],
    colors: [
      { name: 'Soft Honey & Cream', hex: '#EED9C4' },
      { name: 'Eucalyptus Mint', hex: '#D2E0D0' },
      { name: 'Dusty Rose & Peach', hex: '#F3C5C5' }
    ],
    sizes: ['0–6 Months', '6–12 Months'],
    stock: 0, // Out of stock example to demonstrate "Notify Me" flow!
    soldCount: 110,
    estimatedDeliveryDays: '5–7 days',
    deliveryCharge: 0,
    isFeatured: true,
    customisable: true,
    customizationOptions: {
      allowNameTag: true,
      nameTagPrice: 0, // Included in gift set
      allowAccentColor: true,
      giftWrapAvailable: true,
      giftWrapPrice: 0
    }
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Meera Sharma',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '24 Sep 2026',
    title: 'The softest and sweetest bear ever!',
    comment: 'I ordered the medium size in warm brown for my niece’s birthday. The stitching is impeccable and feels so sturdy yet cuddly. The mini scarf is such an adorable detail! Came beautifully wrapped.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Priya Verma',
    rating: 5,
    date: '18 Sep 2026',
    title: 'Looks even better than photos',
    comment: 'Got the blush pink with a personalized tag "Anya". The lettering was hand-embroidered with so much love. 10/10 recommend!',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-1',
    userName: 'Aakash Patel',
    rating: 4,
    date: '10 Sep 2026',
    title: 'High quality yarn, prompt delivery',
    comment: 'Great craftsmanship. Took 4 days to reach Mumbai. Very pleased with the packaging.',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'prod-2',
    userName: 'Sneha Roy',
    rating: 5,
    date: '21 Sep 2026',
    title: 'Forever flowers that never fade',
    comment: 'Bought this for our dining table centerpiece. Guests always touch them thinking they are real or paper crafts, and are amazed to discover they are crochet! Truly worth every rupee.',
    verifiedPurchase: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    description: '10% off on your first handcrafted order',
    discountPercent: 10,
    minOrder: 499,
    expiry: '31 Dec 2026'
  },
  {
    code: 'BLOOM150',
    description: 'Flat ₹150 discount on orders above ₹999',
    flatDiscount: 150,
    minOrder: 999,
    expiry: '15 Nov 2026'
  },
  {
    code: 'FREESHIP',
    description: 'Free standard delivery on any order',
    minOrder: 0,
    expiry: '30 Oct 2026'
  },
  {
    code: 'CROCHETLOVE',
    description: '15% off on bouquets and plushies over ₹1,200',
    discountPercent: 15,
    minOrder: 1200,
    expiry: '31 Dec 2026'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Order Handcrafted with Love',
    message: 'Your order #SB-9412 is being prepared by artisan Anita! 🧶',
    time: '2 hours ago',
    read: false,
    type: 'order',
    relatedId: 'SB-9412'
  },
  {
    id: 'notif-2',
    title: 'Spring Bloom Offer Live',
    message: 'Enjoy 15% off all floral bouquets with code BLOOM150 this weekend.',
    time: 'Yesterday',
    read: false,
    type: 'offer'
  },
  {
    id: 'notif-3',
    title: 'Low Stock Alert',
    message: 'Only 3 left for Botanical Bloom Coaster set in your saved list!',
    time: '2 days ago',
    read: true,
    type: 'stock',
    relatedId: 'prod-5'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SB-9412',
    date: '26 Sep 2026',
    items: [
      {
        id: 'cart-init-1',
        product: INITIAL_PRODUCTS[0],
        selectedColor: 'Warm Brown',
        selectedSize: 'Medium (9 inches)',
        quantity: 1,
        customDetails: {
          nameTag: 'Leo',
          giftWrap: true
        },
        unitPrice: 948,
        totalPrice: 948
      }
    ],
    subtotal: 948,
    discount: 100,
    deliveryCharge: 0,
    deliveryType: 'standard',
    tax: 42,
    total: 890,
    appliedCoupon: 'WELCOME10',
    customer: {
      name: 'Rohan Deshmukh',
      phone: '+91 98201 54321',
      email: 'rohan.deshmukh@example.com',
      address: 'B-402, Lotus Greens, Linking Road, Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400050'
    },
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'Crochet Product Being Prepared',
    statusHistory: [
      {
        status: 'Order Placed',
        timestamp: '26 Sep 2026, 11:20 AM',
        description: 'Order placed and logged into Stitch & Bloom boutique studio.'
      },
      {
        status: 'Payment Confirmed',
        timestamp: '26 Sep 2026, 11:22 AM',
        description: 'UPI payment verified successfully.'
      },
      {
        status: 'Order Processing',
        timestamp: '26 Sep 2026, 02:00 PM',
        description: 'Yarn skeins allocated and assigned to artisan Anita.'
      },
      {
        status: 'Crochet Product Being Prepared',
        timestamp: '27 Sep 2026, 10:15 AM',
        description: 'Hand-stitching stitches and personalized name embroidery in progress.'
      }
    ],
    estimatedDeliveryDate: '01 Oct 2026',
    trackingNumber: 'DELHIVERY-98402194',
    courierPartner: 'Delhivery Surface Express'
  }
];
