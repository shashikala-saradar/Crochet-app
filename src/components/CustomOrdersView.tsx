import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Send, 
  CheckCircle2, 
  Clock, 
  Palette, 
  HelpCircle,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CustomOrdersView: React.FC = () => {
  const { user, customOrders, submitCustomOrder, addToCart, setActiveTab } = useShop();

  const [customerName, setCustomerName] = useState(user.name || '');
  const [customerEmail, setCustomerEmail] = useState(user.email || '');
  const [customerPhone, setCustomerPhone] = useState(user.phone || '');
  const [productType, setProductType] = useState('Crochet Bouquet');
  const [primaryColor, setPrimaryColor] = useState('Cream / Milk White');
  const [accentColor, setAccentColor] = useState('Sage Green');
  const [size, setSize] = useState('Standard Medium');
  const [details, setDetails] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      alert('Please describe your desired custom crochet piece.');
      return;
    }

    submitCustomOrder({
      customerName,
      customerEmail,
      customerPhone,
      productType,
      primaryColor,
      accentColor,
      size,
      details,
      specialInstructions
    });

    setSubmittedSuccess(true);
    setDetails('');
    setSpecialInstructions('');
    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 4000);
  };

  const handleAcceptQuote = (quote: any) => {
    // Add custom quoted item to cart as a bespoke product
    const customBespokeProd = {
      id: `custom-prod-${Date.now()}`,
      name: `Custom Order (${quote.productType}) #${quote.id}`,
      category: 'Custom Orders' as const,
      price: quote.quotedPrice || 1500,
      rating: 5.0,
      reviewsCount: 1,
      images: [
        'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80'
      ],
      description: quote.details,
      sku: `CUST-${quote.id}`,
      material: '100% Combed Milk Cotton / Custom requested yarn',
      careInstructions: ['Dry flat', 'Gentle hand wash'],
      colors: [{ name: quote.primaryColor, hex: '#C2A385' }],
      sizes: [quote.size],
      stock: 1,
      soldCount: 0,
      estimatedDeliveryDays: '7–10 days',
      deliveryCharge: 0,
      customisable: true
    };

    addToCart(
      customBespokeProd, 
      quote.primaryColor, 
      quote.size, 
      1, 
      { specialNotes: quote.specialInstructions }, 
      quote.quotedPrice
    );

    setActiveTab('cart');
  };

  return (
    <div className="pb-24 pt-3 max-w-3xl mx-auto px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-[#8F4436] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} className="text-[#C47062]" />
          <span>Bespoke Atelier</span>
        </div>
        <h1 className="font-serif-brand text-2xl sm:text-3xl md:text-4xl font-bold text-[#2E231B]">
          Custom Crochet Commission
        </h1>
        <p className="text-xs sm:text-sm text-[#736356] max-w-lg mx-auto">
          Dreaming of a personalized bridal bouquet, a pet portrait amigurumi, or an heirloom blanket? Tell us your vision and our artisans will knit it for you.
        </p>
      </div>

      {submittedSuccess && (
        <div className="p-4 rounded-2xl bg-[#EBF5EC] border border-[#CDE5CE] text-xs text-[#3E6C41] flex items-center gap-3">
          <CheckCircle2 size={20} className="shrink-0" />
          <div>
            <p className="font-bold">Custom request submitted successfully!</p>
            <p className="text-[11px]">Our lead crocheter will review your specifications and provide a custom price quotation within 24 hours.</p>
          </div>
        </div>
      )}

      {/* Custom Commission Form */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 bg-white rounded-3xl border border-[#EDE5DA] shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-[#48392E] uppercase tracking-wider">
          Custom Order Details
        </h2>

        {/* Contact info row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-[#48392E] block mb-1">Your Name *</label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full h-9 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#48392E] block mb-1">Email *</label>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full h-9 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#48392E] block mb-1">Mobile / WhatsApp *</label>
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full h-9 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none"
            />
          </div>
        </div>

        {/* Product Type & Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-[#48392E] block mb-1">Product Category</label>
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full h-9 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none"
            >
              <option value="Crochet Bouquet">Crochet Bouquet (Flowers & Foliage)</option>
              <option value="Amigurumi Toy / Animal">Amigurumi Toy / Animal</option>
              <option value="Handmade Bag / Tote">Handmade Bag / Tote / Purse</option>
              <option value="Keepsake Doll">Keepsake Doll with Outfit</option>
              <option value="Home Décor / Mug Rugs">Home Décor / Table Runner / Coasters</option>
              <option value="Baby Keepsake Set">Baby Keepsake & Booties Set</option>
              <option value="Wearable / Cardigan / Hat">Wearable / Cardigan / Bucket Hat</option>
              <option value="Custom Keychains (Bulk)">Custom Keychains (Event / Wedding Favors)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#48392E] block mb-1">Estimated Size / Scale</label>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 10 inches height, 12 stems, or Large 14x16 inch"
              className="w-full h-9 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none"
            />
          </div>
        </div>

        {/* Color Palette Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-[#48392E] block mb-1">Primary Yarn Color</label>
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="e.g. Cream, Oatmeal, Dusty Rose, Mustard"
              className="w-full h-9 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#48392E] block mb-1">Secondary / Accent Color</label>
            <input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              placeholder="e.g. Sage Green, Lavender, Gold Yellow"
              className="w-full h-9 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none"
            />
          </div>
        </div>

        {/* Detailed specification */}
        <div>
          <label className="text-xs font-semibold text-[#48392E] block mb-1">
            Describe Your Desired Crochet Creation *
          </label>
          <textarea
            required
            rows={3}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell us about the flower types, character details, strap length, embroidery tags, or reference links..."
            className="w-full p-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
          />
        </div>

        {/* Special Instructions & Occasion */}
        <div>
          <label className="text-xs font-semibold text-[#48392E] block mb-1">
            Occasion & Delivery Deadline (Optional)
          </label>
          <input
            type="text"
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="e.g. Anniversary gift needed by 15th Oct, please gift wrap with note."
            className="w-full h-9 px-2.5 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full h-11 bg-[#48392E] hover:bg-[#34271D] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Send size={15} />
          <span>Submit Custom Commission Request</span>
        </button>
      </form>

      {/* Submitted Requests Tracker */}
      <div className="space-y-3 pt-2">
        <h2 className="font-serif-brand text-xl font-bold text-[#2E231B] flex items-center gap-2">
          <Clock size={18} className="text-[#C47062]" />
          <span>My Custom Requests ({customOrders.length})</span>
        </h2>

        {customOrders.map((order) => (
          <div key={order.id} className="p-4 bg-white rounded-2xl border border-[#EDE5DA] space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8A796B] font-semibold uppercase">Request #{order.id}</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#2E231B]">{order.productType}</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                order.status === 'Price Quoted'
                  ? 'bg-[#EBF5EC] text-[#3E6C41]'
                  : 'bg-[#FAF5EE] text-[#8F4436]'
              }`}>
                {order.status}
              </span>
            </div>

            <p className="text-xs text-[#5D4E41]">{order.details}</p>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#7A6B5F] pt-1 border-t border-[#F4EFEA]">
              <span>Colors: <strong>{order.primaryColor} / {order.accentColor}</strong></span>
              <span>•</span>
              <span>Size: <strong>{order.size}</strong></span>
              <span>•</span>
              <span>Submitted: {order.createdAt}</span>
            </div>

            {/* If Price is quoted by Admin, show Accept & Checkout button! */}
            {order.quotedPrice && (
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFD3] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8A796B] uppercase font-semibold">Artisan Quoted Price</span>
                  <p className="text-base font-extrabold text-[#C47062] tabular-nums">₹{order.quotedPrice}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAcceptQuote(order)}
                  className="px-4 py-2 bg-[#C47062] hover:bg-[#B35F52] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <ShoppingBag size={14} />
                  <span>Accept & Add to Basket</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
