import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  TrendingUp, 
  ShoppingBag, 
  AlertTriangle, 
  Users, 
  Package, 
  Check, 
  X, 
  ArrowLeft,
  Truck,
  Sparkles,
  Tag,
  DollarSign
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, OrderStatus, Category } from '../types';

export const AdminDashboardView: React.FC = () => {
  const { 
    products, 
    orders, 
    customOrders, 
    categories, 
    coupons, 
    reviews,
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateStock,
    updateOrderStatus,
    updateCustomOrderPrice,
    updateCustomOrderStatus,
    setIsAdminMode, 
    setActiveTab 
  } = useShop();

  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'custom' | 'inventory' | 'coupons'>('overview');

  // Add/Edit Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('Flowers');
  const [formPrice, setFormPrice] = useState(799);
  const [formDiscountPrice, setFormDiscountPrice] = useState<number | undefined>(699);
  const [formDescription, setFormDescription] = useState('');
  const [formSku, setFormSku] = useState('SB-FL-099');
  const [formStock, setFormStock] = useState(10);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formMaterial, setFormMaterial] = useState('100% Combed Milk Cotton');
  const [formColors, setFormColors] = useState('Warm Brown:#8B5A2B, Blush Pink:#E8B4B8');
  const [formSizes, setFormSizes] = useState('Standard (8 inches), Deluxe (12 inches)');

  // Custom Quote Price State
  const [quoteInput, setQuoteInput] = useState<Record<string, number>>({});

  // Compute metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalItemsSold = products.reduce((sum, p) => sum + (p.soldCount || 0), 0);
  const lowStockCount = products.filter(p => p.stock <= 4).length;

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setFormName('');
    setFormCategory('Flowers');
    setFormPrice(799);
    setFormDiscountPrice(699);
    setFormDescription('Artisan hand-crocheted item using 100% combed milk cotton.');
    setFormSku(`SB-NEW-${Math.floor(100 + Math.random() * 900)}`);
    setFormStock(10);
    setFormImageUrl(products[0]?.images[0] || '');
    setFormMaterial('100% Combed Milk Cotton Yarn');
    setFormColors('Lilac:#B5A5C8, Cream:#FAF9F6, Sage:#8FA88D');
    setFormSizes('Standard, Large');
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormPrice(prod.price);
    setFormDiscountPrice(prod.discountPrice);
    setFormDescription(prod.description);
    setFormSku(prod.sku);
    setFormStock(prod.stock);
    setFormImageUrl(prod.images[0]);
    setFormMaterial(prod.material);
    setFormColors(prod.colors.map(c => `${c.name}:${c.hex}`).join(', '));
    setFormSizes(prod.sizes.join(', '));
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse colors
    const parsedColors = formColors.split(',').map(pair => {
      const [name, hex] = pair.trim().split(':');
      return { name: name?.trim() || 'Natural', hex: hex?.trim() || '#D2C2B2' };
    });

    // Parse sizes
    const parsedSizes = formSizes.split(',').map(s => s.trim()).filter(Boolean);

    const productPayload = {
      name: formName,
      category: formCategory,
      price: Number(formPrice),
      discountPrice: formDiscountPrice ? Number(formDiscountPrice) : undefined,
      description: formDescription,
      sku: formSku,
      stock: Number(formStock),
      images: [formImageUrl || products[0]?.images[0]],
      material: formMaterial,
      careInstructions: ['Hand wash cold at 30°C', 'Dry flat in shade'],
      colors: parsedColors,
      sizes: parsedSizes.length > 0 ? parsedSizes : ['Standard'],
      rating: 4.8,
      reviewsCount: 1,
      soldCount: 0,
      estimatedDeliveryDays: '3–5 days',
      deliveryCharge: 0,
      customisable: true,
      customizationOptions: {
        allowNameTag: true,
        nameTagPrice: 99,
        giftWrapAvailable: true,
        giftWrapPrice: 49
      }
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setShowProductModal(false);
  };

  return (
    <div className="pb-24 pt-3 max-w-5xl mx-auto px-4 space-y-6">
      {/* Admin Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE2D5] pb-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsAdminMode(false);
              setActiveTab('home');
            }}
            className="w-8 h-8 rounded-full bg-white border border-[#DDD3C6] flex items-center justify-center text-[#554538] hover:bg-[#FAF7F2]"
            title="Back to Shopper App"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="font-serif-brand text-2xl font-bold text-[#2E231B] flex items-center gap-2">
              <span>Crochet Studio Admin Console</span>
              <span className="px-2 py-0.5 bg-[#8F3E34] text-white text-[10px] font-bold rounded uppercase">
                Staff Only
              </span>
            </h1>
            <p className="text-xs text-[#8A796B]">Inventory control, orders lifecycle & custom commissions</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenAddProduct}
          className="px-3.5 py-2 bg-[#48392E] hover:bg-[#34271D] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
        >
          <Plus size={15} />
          <span>New Product</span>
        </button>
      </div>

      {/* Admin Sub Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview Metrics' },
          { id: 'products', label: `Products (${products.length})` },
          { id: 'orders', label: `Customer Orders (${orders.length})` },
          { id: 'custom', label: `Custom Requests (${customOrders.length})` },
          { id: 'inventory', label: `Stock Warnings (${lowStockCount})` },
          { id: 'coupons', label: `Promotions & Coupons (${coupons.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
              adminTab === tab.id
                ? 'bg-[#48392E] text-white shadow-2xs'
                : 'bg-white border border-[#EDE5DA] text-[#6D5D50] hover:bg-[#FAF7F2]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#8A796B] uppercase flex items-center gap-1">
                <DollarSign size={13} className="text-[#3E6C41]" /> Total Revenue
              </span>
              <p className="text-2xl font-extrabold text-[#2E231B] mt-1 tabular-nums">
                ₹{totalRevenue}
              </p>
              <span className="text-[10px] text-[#3E6C41] font-semibold">Real-time studio sales</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#8A796B] uppercase flex items-center gap-1">
                <ShoppingBag size={13} className="text-[#C47062]" /> Total Orders
              </span>
              <p className="text-2xl font-extrabold text-[#2E231B] mt-1 tabular-nums">
                {orders.length}
              </p>
              <span className="text-[10px] text-[#7A6B5F]">Orders logged</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#8A796B] uppercase flex items-center gap-1">
                <TrendingUp size={13} className="text-[#8F4436]" /> Total Pieces Sold
              </span>
              <p className="text-2xl font-extrabold text-[#2E231B] mt-1 tabular-nums">
                {totalItemsSold}
              </p>
              <span className="text-[10px] text-[#7A6B5F]">Handcrafted units</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#8A796B] uppercase flex items-center gap-1">
                <AlertTriangle size={13} className="text-[#C26229]" /> Low Stock Alerts
              </span>
              <p className="text-2xl font-extrabold text-[#C26229] mt-1 tabular-nums">
                {lowStockCount}
              </p>
              <span className="text-[10px] text-[#C26229] font-semibold">Needs artisan restock</span>
            </div>
          </div>

          {/* Quick Active Orders Preview */}
          <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] space-y-3">
            <h3 className="font-serif-brand text-lg font-bold text-[#2E231B]">
              Recent Studio Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#48392E]">
                <thead className="border-b border-[#F4EFEA] text-[10px] uppercase text-[#8A796B] font-bold">
                  <tr>
                    <th className="pb-2">Order ID</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Items</th>
                    <th className="pb-2">Total</th>
                    <th className="pb-2">Current Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4EFEA]">
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="py-2.5 font-bold">{o.id}</td>
                      <td className="py-2.5">{o.customer.name}</td>
                      <td className="py-2.5">{o.items.length} item(s)</td>
                      <td className="py-2.5 font-bold tabular-nums">₹{o.total}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 bg-[#FAF5EE] text-[#8F4436] rounded font-semibold text-[10px]">
                          {o.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG MANAGEMENT */}
      {adminTab === 'products' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {products.map((p) => (
              <div key={p.id} className="p-3 bg-white rounded-2xl border border-[#EDE5DA] flex gap-3 shadow-2xs">
                <img 
                  src={p.images[0]} 
                  alt={p.name} 
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0" 
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#2E231B] line-clamp-1">{p.name}</h4>
                      <span className="text-xs font-extrabold text-[#C47062] tabular-nums">₹{p.price}</span>
                    </div>
                    <p className="text-[10px] text-[#8A796B] uppercase">{p.category} • SKU: {p.sku}</p>
                    <p className="text-[11px] text-[#5D4E41] mt-0.5">
                      Stock: <strong className={p.stock <= 4 ? 'text-[#C26229]' : 'text-[#3E6C41]'}>{p.stock} units</strong>
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#F4EFEA]">
                    <button
                      type="button"
                      onClick={() => handleOpenEditProduct(p)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#48392E] bg-[#FAF5EE] hover:bg-[#F2EDE5] rounded-lg flex items-center gap-1"
                    >
                      <Edit2 size={12} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-[#B35F52] hover:bg-[#FAF5EE] rounded-lg flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS LIFECYCLE MANAGEMENT */}
      {adminTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="font-serif-brand text-lg font-bold text-[#2E231B]">
            Orders & 7-Stage Status Pipeline
          </h3>

          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="p-4 bg-white rounded-2xl border border-[#EDE5DA] space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4EFEA] pb-2">
                  <div>
                    <span className="font-bold text-xs text-[#2E231B]">Order #{o.id}</span>
                    <span className="text-[11px] text-[#8A796B] ml-2">Placed: {o.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#7A6B5F]">Change Status:</span>
                    <select
                      value={o.orderStatus}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                      className="text-xs font-bold text-[#8F4436] bg-[#FAF5EE] border border-[#DDD3C6] rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Payment Confirmed">Payment Confirmed</option>
                      <option value="Order Processing">Order Processing</option>
                      <option value="Crochet Product Being Prepared">Crochet Product Being Prepared</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#5D4E41]">
                  <div>
                    <span className="font-semibold text-[#2E231B]">Customer Info:</span>
                    <p>{o.customer.name} ({o.customer.phone})</p>
                    <p className="text-[11px] text-[#8A796B]">{o.customer.address}, {o.customer.city} - {o.customer.pinCode}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#2E231B]">Payment & Logistics:</span>
                    <p>Method: <strong className="uppercase">{o.paymentMethod}</strong> ({o.paymentStatus})</p>
                    <p className="text-[11px] text-[#8A796B]">Courier: {o.courierPartner} • Tracking: {o.trackingNumber}</p>
                  </div>
                </div>

                {/* Items in order */}
                <div className="pt-2 border-t border-[#F4EFEA] text-xs space-y-1">
                  {o.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.quantity}× {item.product.name} ({item.selectedColor}, {item.selectedSize})</span>
                      <span className="font-semibold tabular-nums">₹{item.totalPrice}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-[#2E231B] pt-1">
                    <span>Final Amount:</span>
                    <span className="tabular-nums">₹{o.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CUSTOM COMMISSIONS QUOTATION */}
      {adminTab === 'custom' && (
        <div className="space-y-4">
          <h3 className="font-serif-brand text-lg font-bold text-[#2E231B]">
            Bespoke Custom Requests Review
          </h3>

          <div className="space-y-3">
            {customOrders.map((req) => (
              <div key={req.id} className="p-4 bg-white rounded-2xl border border-[#EDE5DA] space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#2E231B]">Custom #{req.id} — {req.productType}</span>
                    <span className="text-[11px] text-[#8A796B] ml-2">From: {req.customerName} ({req.customerPhone})</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#FAF5EE] text-[#8F4436]">
                    {req.status}
                  </span>
                </div>

                <div className="p-3 bg-[#FAF7F2] rounded-xl text-xs space-y-1 text-[#5D4E41]">
                  <p><strong>Colors:</strong> {req.primaryColor} / {req.accentColor}</p>
                  <p><strong>Size / Scale:</strong> {req.size}</p>
                  <p><strong>Customer Notes:</strong> {req.details}</p>
                  {req.specialInstructions && <p><strong>Occasion:</strong> {req.specialInstructions}</p>}
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-semibold text-[#48392E]">Set Quote Price (₹):</label>
                    <input
                      type="number"
                      placeholder="1500"
                      value={quoteInput[req.id] || req.quotedPrice || ''}
                      onChange={(e) => setQuoteInput({ ...quoteInput, [req.id]: Number(e.target.value) })}
                      className="w-24 h-8 px-2 rounded-lg border border-[#DDD3C6] text-xs font-bold text-[#2E231B]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const price = quoteInput[req.id] || req.quotedPrice || 1200;
                        updateCustomOrderPrice(req.id, price);
                      }}
                      className="px-3 h-8 bg-[#48392E] text-white text-xs font-semibold rounded-lg hover:bg-[#34271D]"
                    >
                      Send Quote
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="text-xs text-[#7A6B5F]">Status:</span>
                    <select
                      value={req.status}
                      onChange={(e) => updateCustomOrderStatus(req.id, e.target.value as any)}
                      className="text-xs font-semibold text-[#48392E] bg-[#FAF5EE] border border-[#DDD3C6] rounded-lg px-2 py-1"
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Price Quoted">Price Quoted</option>
                      <option value="Approved">Approved</option>
                      <option value="Crafting">Crafting</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INVENTORY & LOW-STOCK */}
      {adminTab === 'inventory' && (
        <div className="space-y-4">
          <h3 className="font-serif-brand text-lg font-bold text-[#2E231B]">
            Inventory Stock & Restock Hub
          </h3>

          <div className="bg-white rounded-2xl border border-[#EDE5DA] overflow-hidden">
            <table className="w-full text-left text-xs text-[#48392E]">
              <thead className="bg-[#FAF7F2] border-b border-[#EAE2D5] text-[10px] uppercase font-bold text-[#8A796B]">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Available Stock</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4EFEA]">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="p-3 font-semibold">{p.name}</td>
                    <td className="p-3 font-mono text-[#8A796B]">{p.sku}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">
                      <span className={`font-bold tabular-nums ${p.stock <= 4 ? 'text-[#C26229]' : 'text-[#3E6C41]'}`}>
                        {p.stock} units
                      </span>
                      {p.stock === 0 && <span className="ml-2 text-[10px] text-red-600 font-bold">(SOLD OUT)</span>}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateStock(p.id, p.stock + 5)}
                          className="px-2 py-1 text-[11px] font-semibold bg-[#FAF5EE] text-[#48392E] rounded border border-[#DDD3C6] hover:bg-[#F2EDE5]"
                        >
                          +5 Restock
                        </button>
                        <button
                          type="button"
                          onClick={() => updateStock(p.id, p.stock + 10)}
                          className="px-2 py-1 text-[11px] font-semibold bg-[#48392E] text-white rounded hover:bg-[#34271D]"
                        >
                          +10 Restock
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: PROMOTIONS & COUPONS */}
      {adminTab === 'coupons' && (
        <div className="space-y-4">
          <h3 className="font-serif-brand text-lg font-bold text-[#2E231B]">
            Studio Coupons & Discount Campaigns
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coupons.map((c) => (
              <div key={c.code} className="p-3.5 bg-white rounded-2xl border border-[#EDE5DA] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-sm text-[#C47062]">{c.code}</span>
                  <span className="text-[10px] text-[#8A796B]">Expires: {c.expiry}</span>
                </div>
                <p className="text-xs text-[#48392E]">{c.description}</p>
                <div className="text-[11px] text-[#7A6B5F] pt-1">
                  <span>Min Order: ₹{c.minOrder}</span>
                  {c.discountPercent && <span className="ml-2">• {c.discountPercent}% OFF</span>}
                  {c.flatDiscount && <span className="ml-2">• Flat ₹{c.flatDiscount} OFF</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-lg w-full rounded-3xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
              <h3 className="font-serif-brand text-xl font-bold text-[#2E231B]">
                {editingProductId ? 'Edit Product' : 'Add New Handcrafted Product'}
              </h3>
              <button 
                type="button" 
                onClick={() => setShowProductModal(false)}
                className="text-xs font-semibold text-[#8A796B]"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#48392E] block mb-0.5">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-[#48392E] block mb-0.5">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Category)}
                    className="w-full h-8 px-2 rounded-lg bg-white border border-[#DDD3C6]"
                  >
                    {categories.filter(c => c !== 'Custom Orders').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#48392E] block mb-0.5">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-[#48392E] block mb-0.5">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#48392E] block mb-0.5">Discount Price</label>
                  <input
                    type="number"
                    value={formDiscountPrice || ''}
                    onChange={(e) => setFormDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#48392E] block mb-0.5">Stock Count *</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#48392E] block mb-0.5">Image URL / Path</label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#48392E] block mb-0.5">Material Used</label>
                <input
                  type="text"
                  value={formMaterial}
                  onChange={(e) => setFormMaterial(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#48392E] block mb-0.5">
                  Colors (Format: Name:#HEX, Name:#HEX)
                </label>
                <input
                  type="text"
                  value={formColors}
                  onChange={(e) => setFormColors(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#48392E] block mb-0.5">
                  Sizes (Comma separated)
                </label>
                <input
                  type="text"
                  value={formSizes}
                  onChange={(e) => setFormSizes(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#48392E] block mb-0.5">Description</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white border border-[#DDD3C6]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#EAE2D5]">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-3 py-1.5 text-xs text-[#7A6B5F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#48392E] text-white text-xs font-semibold rounded-lg hover:bg-[#34271D]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
