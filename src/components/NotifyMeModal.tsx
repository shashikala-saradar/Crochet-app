import React, { useState } from 'react';
import { X, Bell, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface NotifyMeModalProps {
  product: Product | null;
  onClose: () => void;
}

export const NotifyMeModal: React.FC<NotifyMeModalProps> = ({ product, onClose }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] max-w-sm w-full rounded-3xl p-5 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#7A6B5F] hover:text-[#2E231B]"
        >
          <X size={16} />
        </button>

        <div className="text-center space-y-1.5 pt-2">
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#C47062] flex items-center justify-center mx-auto">
            <Bell size={24} />
          </div>
          <h3 className="font-serif-brand text-xl font-bold text-[#2E231B]">
            Restock Notification
          </h3>
          <p className="text-xs text-[#7A6B5F]">
            We'll message you the moment our crocheters finish crafting more <strong>"{product.name}"</strong>.
          </p>
        </div>

        {submitted ? (
          <div className="p-3 bg-[#EBF5EC] text-[#3E6C41] rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>You're on the priority waitlist! We'll notify you as soon as it's back in stock.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#48392E] block mb-1">
                Your Email or Mobile Number
              </label>
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="name@example.com or +91..."
                className="w-full h-9 px-3 rounded-xl bg-white border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-[#48392E] hover:bg-[#34271D] text-white text-xs font-bold rounded-xl transition-colors"
            >
              Notify Me When Available
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
