import React from 'react';
import { CheckCircle2, Sparkles, Truck, Package, ArrowRight, Home } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmedViewProps {
  order: Order;
  onTrackOrder: (orderId: string) => void;
  onContinueShopping: () => void;
}

export const OrderConfirmedView: React.FC<OrderConfirmedViewProps> = ({
  order,
  onTrackOrder,
  onContinueShopping
}) => {
  return (
    <div className="py-10 max-w-xl mx-auto px-4 space-y-6 text-center animate-in zoom-in-95 duration-200">
      {/* Celebration Icon */}
      <div className="relative inline-block">
        <div className="w-20 h-20 rounded-full bg-[#EBF5EC] text-[#4A804D] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 size={44} className="stroke-[2.2]" />
        </div>
        <div className="absolute -top-1 -right-1 text-2xl animate-bounce">
          🧶
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="px-3 py-1 bg-[#FAF5EE] text-[#8F4436] rounded-md text-xs font-bold uppercase tracking-wider">
          Payment Successful
        </span>
        <h1 className="font-serif-brand text-3xl font-bold text-[#2A2017]">
          Thank you for your order!
        </h1>
        <p className="text-xs sm:text-sm text-[#736356] max-w-md mx-auto">
          Your handcrafted treasures have been logged into our atelier. Artisan Anita has received your order and will begin stitching with love.
        </p>
      </div>

      {/* Order Badge Card */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EDE5DA] text-left space-y-3 shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#F4EFEA] pb-2.5">
          <div>
            <span className="text-[10px] text-[#8A796B] uppercase font-semibold">Order ID</span>
            <p className="text-sm font-extrabold text-[#2A2017]">{order.id}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#8A796B] uppercase font-semibold">Estimated Delivery</span>
            <p className="text-sm font-bold text-[#5B7B59]">{order.estimatedDeliveryDate}</p>
          </div>
        </div>

        {/* Item thumbnails */}
        <div className="space-y-2">
          <span className="text-[10px] text-[#8A796B] uppercase font-semibold block">Ordered Items:</span>
          <div className="space-y-1.5">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-[#48392E]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F4ECE3] text-[10px] font-bold flex items-center justify-center text-[#784A3B]">
                    {item.quantity}×
                  </span>
                  <span className="font-medium line-clamp-1">{item.product.name}</span>
                </div>
                <span className="font-semibold tabular-nums">₹{item.totalPrice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping address recap */}
        <div className="pt-2 border-t border-[#F4EFEA] text-xs text-[#736356]">
          <span className="text-[10px] text-[#8A796B] uppercase font-semibold block">Shipping To:</span>
          <p className="font-semibold text-[#2E231B]">{order.customer.name}</p>
          <p>{order.customer.address}, {order.customer.city} - {order.customer.pinCode}</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={() => onTrackOrder(order.id)}
          className="flex-1 h-11 bg-[#48392E] hover:bg-[#34271D] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Truck size={16} />
          <span>Track Order Progress</span>
        </button>

        <button
          type="button"
          onClick={onContinueShopping}
          className="flex-1 h-11 bg-white hover:bg-[#FAF7F2] border border-[#DDD3C6] text-[#48392E] text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Home size={16} />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};
