import React, { useState } from 'react';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  Search, 
  Sparkles, 
  MapPin, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types';

const ORDER_STEPS: Array<{ status: OrderStatus; label: string; desc: string }> = [
  { status: 'Order Placed', label: 'Order Placed', desc: 'Order received and logged in studio' },
  { status: 'Payment Confirmed', label: 'Payment Confirmed', desc: 'Payment verified and confirmed' },
  { status: 'Order Processing', label: 'Order Processing', desc: 'Milk cotton yarn allocated' },
  { status: 'Crochet Product Being Prepared', label: 'Handmade by Artisan', desc: 'Crocheter is hand-knitting stitches' },
  { status: 'Shipped', label: 'Shipped', desc: 'Dispatched with courier partner' },
  { status: 'Out for Delivery', label: 'Out for Delivery', desc: 'Courier agent is arriving' },
  { status: 'Delivered', label: 'Delivered', desc: 'Delivered safely to your hands' },
];

export const OrderTrackingView: React.FC = () => {
  const { orders, trackingOrderId, setTrackingOrderId } = useShop();
  const [searchInput, setSearchInput] = useState(trackingOrderId || '');

  // Look up order or take the first one
  const currentOrder = orders.find(o => o.id.toUpperCase() === (trackingOrderId || searchInput).trim().toUpperCase()) 
    || orders[0];

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setTrackingOrderId(searchInput.trim().toUpperCase());
    }
  };

  // Find index of current status
  const currentStatusIndex = currentOrder 
    ? ORDER_STEPS.findIndex(s => s.status === currentOrder.orderStatus)
    : 0;

  return (
    <div className="pb-24 pt-3 max-w-2xl mx-auto px-4 space-y-6">
      {/* Search Order bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="font-serif-brand text-2xl sm:text-3xl font-bold text-[#2E231B] flex items-center gap-2">
            <Truck size={24} className="text-[#C47062]" />
            <span>Track Handcrafted Order</span>
          </h1>
        </div>

        <form onSubmit={handleSearchOrder} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Order ID (e.g. SB-9412)"
              className="w-full h-11 pl-10 pr-3 rounded-xl bg-white border border-[#E8E1D5] text-xs font-semibold uppercase text-[#30241A] placeholder-[#A09083] focus:outline-none focus:ring-2 focus:ring-[#C47062]"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E8F82]" size={16} />
          </div>
          <button
            type="submit"
            className="px-4 bg-[#48392E] text-white text-xs font-semibold rounded-xl hover:bg-[#34271D] transition-colors"
          >
            Track
          </button>
        </form>
      </div>

      {currentOrder ? (
        <div className="space-y-4">
          {/* Tracking Summary Card */}
          <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EDE5DA] space-y-3 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4EFEA] pb-3">
              <div>
                <span className="text-[10px] text-[#8A796B] uppercase font-semibold">Order Number</span>
                <p className="text-sm font-extrabold text-[#2E231B]">{currentOrder.id}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#8A796B] uppercase font-semibold">Estimated Arrival</span>
                <p className="text-sm font-bold text-[#5B7B59] flex items-center gap-1 justify-end">
                  <Calendar size={13} /> {currentOrder.estimatedDeliveryDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-[#6C5B4E]">
              <div>
                <span className="text-[10px] text-[#8A796B] uppercase font-semibold block">Courier Service</span>
                <span className="font-semibold text-[#2E231B]">{currentOrder.courierPartner}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8A796B] uppercase font-semibold block">Tracking AWB</span>
                <span className="font-mono text-[#2E231B]">{currentOrder.trackingNumber}</span>
              </div>
            </div>

            {/* Artisan preparing notice */}
            {currentOrder.orderStatus === 'Crochet Product Being Prepared' && (
              <div className="p-3 rounded-xl bg-[#FAF5EE] border border-[#EFEAE2] flex items-center gap-2.5 text-xs text-[#784A3B]">
                <div className="text-xl shrink-0">🧶</div>
                <div>
                  <p className="font-semibold">Crocheter Anita is stitching your order</p>
                  <p className="text-[11px] text-[#8A796B]">Each item requires 3-5 hours of dedicated handwork. Quality inspected before boxing.</p>
                </div>
              </div>
            )}
          </div>

          {/* 7-Step Timeline */}
          <div className="p-4 sm:p-6 bg-white rounded-2xl border border-[#EDE5DA] shadow-2xs">
            <h3 className="text-xs font-bold text-[#48392E] uppercase tracking-wider mb-5">
              Live Order Progress
            </h3>

            <div className="relative pl-6 space-y-6">
              {/* Connecting vertical background line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#EAE2D5]" />

              {ORDER_STEPS.map((step, idx) => {
                const isPassed = idx < currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                const isPending = idx > currentStatusIndex;

                return (
                  <div key={step.status} className="relative flex items-start gap-3.5">
                    {/* Step Icon Indicator */}
                    <div 
                      className={`relative z-10 w-6 h-6 -ml-6 rounded-full flex items-center justify-center text-xs transition-all ${
                        isCurrent
                          ? 'bg-[#C47062] text-white ring-4 ring-[#F8ECE8]'
                          : isPassed
                          ? 'bg-[#5B7B59] text-white'
                          : 'bg-white border-2 border-[#D5C9BC] text-[#A09083]'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 size={13} />
                      ) : isCurrent ? (
                        <Sparkles size={11} className="animate-spin" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D5C9BC]" />
                      )}
                    </div>

                    {/* Step text */}
                    <div>
                      <h4 className={`text-xs font-bold ${isCurrent ? 'text-[#C47062]' : isPassed ? 'text-[#2E231B]' : 'text-[#8A796B]'}`}>
                        {step.label}
                      </h4>
                      <p className="text-[11px] text-[#7A6B5F] mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items Summary in this order */}
          <div className="p-4 bg-white rounded-2xl border border-[#EDE5DA] text-xs space-y-2.5">
            <h4 className="font-bold text-[#48392E] uppercase tracking-wider text-[11px]">
              Package Contents ({currentOrder.items.length})
            </h4>
            <div className="space-y-2">
              {currentOrder.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[#48392E]">
                  <div className="flex items-center gap-2">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-lg object-cover" 
                    />
                    <div>
                      <p className="font-semibold line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-[#8A796B]">
                        {item.selectedColor} • {item.selectedSize} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold tabular-nums">₹{item.totalPrice}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-2xl border border-[#EDE5DA]">
          <AlertCircle size={32} className="mx-auto text-[#C47062] mb-2" />
          <h3 className="font-bold text-sm text-[#2E231B]">Order not found</h3>
          <p className="text-xs text-[#8A796B] mt-1">Please double check the order ID entered above.</p>
        </div>
      )}
    </div>
  );
};
