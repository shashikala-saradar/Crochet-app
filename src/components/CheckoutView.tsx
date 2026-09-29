import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Landmark, 
  Banknote, 
  Wallet, 
  Check, 
  Lock,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CustomerDetails, Order } from '../types';

interface CheckoutViewProps {
  onBackToCart: () => void;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ 
  onBackToCart, 
  onOrderCompleted 
}) => {
  const { 
    user, 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartTax, 
    appliedCoupon, 
    placeOrder 
  } = useShop();

  // Customer form state prefilled with user details
  const [formData, setFormData] = useState<CustomerDetails>({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    address: user.address || '',
    city: user.city || '',
    state: user.state || '',
    pinCode: user.pinCode || ''
  });

  // Delivery option
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod' | 'wallet'>('upi');

  // Payment specific fields
  const [upiId, setUpiId] = useState('user@okaxis');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'qr'>('gpay');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8920');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [selectedWallet, setSelectedWallet] = useState('Paytm Wallet');

  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery charge calculation
  const standardFee = cartSubtotal >= 999 || appliedCoupon?.code === 'FREESHIP' ? 0 : 60;
  const deliveryCharge = deliveryType === 'express' ? 120 : standardFee;
  const finalPayable = Math.max(0, cartSubtotal - cartDiscount + deliveryCharge + cartTax);

  // Estimated dates
  const estStandard = new Date();
  estStandard.setDate(estStandard.getDate() + 4);
  const estStandardStr = estStandard.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  const estExpress = new Date();
  estExpress.setDate(estExpress.getDate() + 2);
  const estExpressStr = estExpress.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pinCode) {
      alert('Please fill in your delivery contact and address details.');
      return;
    }

    setIsProcessing(true);

    // Simulate seamless and secure payment authorization
    setTimeout(() => {
      const order = placeOrder(formData, deliveryType, paymentMethod);
      setIsProcessing(false);
      onOrderCompleted(order);
    }, 1400);
  };

  return (
    <div className="pb-24 pt-3 max-w-3xl mx-auto px-4 space-y-6">
      {/* Top back button and title */}
      <div className="flex items-center gap-3 border-b border-[#EAE2D5] pb-3">
        <button
          type="button"
          onClick={onBackToCart}
          className="w-8 h-8 rounded-full bg-white border border-[#DDD3C6] flex items-center justify-center text-[#554538] hover:bg-[#FAF7F2]"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="font-serif-brand text-2xl font-bold text-[#2E231B]">
            Artisan Checkout
          </h1>
          <p className="text-[11px] text-[#8A796B]">
            Step 2 of 2: Shipping & Payment
          </p>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Section 1: Customer Contact & Shipping Address */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EDE5DA] space-y-3.5 shadow-2xs">
          <h2 className="text-xs font-bold text-[#48392E] uppercase tracking-wider flex items-center justify-between">
            <span>1. Delivery Address</span>
            <span className="text-[11px] text-[#5B7B59] font-normal flex items-center gap-1">
              <ShieldCheck size={13} /> Verified Delivery
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#48392E] block mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#48392E] block mb-1">Mobile Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-[#48392E] block mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-[#48392E] block mb-1">Street Address, Flat / House No. *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#48392E] block mb-1">City *</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-[#48392E] block mb-1">State *</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#48392E] block mb-1">PIN Code *</label>
                <input
                  type="text"
                  name="pinCode"
                  required
                  maxLength={6}
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full h-9 px-3 rounded-xl bg-[#FAF7F2] border border-[#DDD3C6] text-xs text-[#30241A] focus:outline-none focus:ring-1 focus:ring-[#C47062]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Delivery Speed Options */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EDE5DA] space-y-3 shadow-2xs">
          <h2 className="text-xs font-bold text-[#48392E] uppercase tracking-wider">
            2. Choose Delivery Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Standard Delivery Option */}
            <label
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                deliveryType === 'standard'
                  ? 'border-[#48392E] bg-[#FAF5EE] ring-1 ring-[#48392E]'
                  : 'border-[#EDE5DA] bg-white hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryType"
                  checked={deliveryType === 'standard'}
                  onChange={() => setDeliveryType('standard')}
                  className="accent-[#C47062]"
                />
                <div>
                  <span className="text-xs font-bold text-[#2E231B] block">Standard Surface</span>
                  <span className="text-[11px] text-[#7A6B5F]">Delivered by {estStandardStr} (3–5 days)</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2E231B] tabular-nums">
                {standardFee === 0 ? <strong className="text-[#3E6C41]">FREE</strong> : `₹${standardFee}`}
              </span>
            </label>

            {/* Express Delivery Option */}
            <label
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                deliveryType === 'express'
                  ? 'border-[#48392E] bg-[#FAF5EE] ring-1 ring-[#48392E]'
                  : 'border-[#EDE5DA] bg-white hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="deliveryType"
                  checked={deliveryType === 'express'}
                  onChange={() => setDeliveryType('express')}
                  className="accent-[#C47062]"
                />
                <div>
                  <span className="text-xs font-bold text-[#2E231B] flex items-center gap-1">
                    <span>Express Air Priority</span>
                    <Sparkles size={11} className="text-[#C47062]" />
                  </span>
                  <span className="text-[11px] text-[#7A6B5F]">Delivered by {estExpressStr} (1–2 days)</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2E231B] tabular-nums">₹120</span>
            </label>
          </div>
        </div>

        {/* Section 3: Payment Modes */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EDE5DA] space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#48392E] uppercase tracking-wider">
              3. Payment Options
            </h2>
            <span className="text-[11px] text-[#7A6B5F] flex items-center gap-1">
              <Lock size={12} className="text-[#5B7B59]" /> 100% Encrypted
            </span>
          </div>

          {/* Payment Method Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'upi', label: 'UPI / QR', icon: QrCode },
              { id: 'card', label: 'Card', icon: CreditCard },
              { id: 'netbanking', label: 'Net Banking', icon: Landmark },
              { id: 'wallet', label: 'Wallets', icon: Wallet },
              { id: 'cod', label: 'Cash on Del.', icon: Banknote },
            ].map((m) => {
              const IconComp = m.icon;
              const isSel = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${
                    isSel
                      ? 'border-[#48392E] bg-[#48392E] text-white shadow-2xs'
                      : 'border-[#EDE5DA] bg-[#FAF7F2] text-[#6E5D50] hover:bg-white'
                  }`}
                >
                  <IconComp size={18} />
                  <span className="text-[11px] font-semibold">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-panels for selected payment method */}
          <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD3] text-xs">
            {paymentMethod === 'upi' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  {['gpay', 'phonepe', 'paytm', 'qr'].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setUpiApp(app as any)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold uppercase text-[10px] ${
                        upiApp === app ? 'bg-white border-[#48392E] text-[#2E231B] shadow-2xs' : 'border-[#DDD4C7] text-[#7A6B5F]'
                      }`}
                    >
                      {app === 'qr' ? 'Scan QR' : app}
                    </button>
                  ))}
                </div>
                {upiApp === 'qr' ? (
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-[#DDD3C6] text-center">
                    <div className="w-28 h-28 bg-[#2A2017] rounded-lg p-2 flex items-center justify-center text-white mb-2">
                      <QrCode size={90} />
                    </div>
                    <span className="text-[11px] text-[#7A6B5F]">Scan using any UPI App (GPay, PhonePe, Paytm, CRED)</span>
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-semibold text-[#48392E] block mb-1">Enter UPI VPA ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6] text-xs focus:outline-none"
                    />
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-[#48392E] block mb-0.5">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 0000 0000 0000"
                    className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6] text-xs focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-[#48392E] block mb-0.5">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6] text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#48392E] block mb-0.5">CVV Code</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6] text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div>
                <label className="text-[11px] font-semibold text-[#48392E] block mb-1">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6] text-xs focus:outline-none"
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="State Bank of India">State Bank of India</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Axis Bank">Axis Bank</option>
                  <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                </select>
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div>
                <label className="text-[11px] font-semibold text-[#48392E] block mb-1">Select Digital Wallet</label>
                <select
                  value={selectedWallet}
                  onChange={(e) => setSelectedWallet(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-white border border-[#DDD3C6] text-xs focus:outline-none"
                >
                  <option value="Paytm Wallet">Paytm Wallet</option>
                  <option value="Amazon Pay">Amazon Pay</option>
                  <option value="PhonePe Wallet">PhonePe Wallet</option>
                  <option value="MobiKwik">MobiKwik</option>
                </select>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="space-y-1 text-[#5D4E41]">
                <p className="font-semibold text-[#2E231B]">Pay with cash or UPI on delivery.</p>
                <p className="text-[11px]">Our delivery partner will accept cash or instant QR scan upon doorstep receipt.</p>
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Final Summary & Pay Button */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-[#EDE5DA] space-y-3">
          <div className="space-y-1.5 text-xs text-[#5D4E41]">
            <div className="flex justify-between">
              <span>Items Total ({cart.length})</span>
              <span className="font-semibold text-[#2E231B] tabular-nums">₹{cartSubtotal}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#3E6C41]">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span className="font-semibold tabular-nums">-₹{cartDiscount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charge ({deliveryType === 'express' ? 'Express' : 'Standard'})</span>
              <span className="font-semibold text-[#2E231B] tabular-nums">
                {deliveryCharge === 0 ? <strong className="text-[#3E6C41]">FREE</strong> : `₹${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>GST & Taxes (5%)</span>
              <span className="font-semibold text-[#2E231B] tabular-nums">₹{cartTax}</span>
            </div>
            <div className="pt-2 border-t border-[#EAE2D5] flex items-baseline justify-between text-base font-extrabold text-[#2E231B]">
              <span>Final Payable Amount</span>
              <span className="text-xl font-extrabold text-[#C47062] tabular-nums">
                ₹{finalPayable}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full h-12 bg-[#C47062] hover:bg-[#B35F52] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 disabled:opacity-60"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Authorizing & Placing Order...</span>
              </div>
            ) : (
              <>
                <Lock size={15} />
                <span>Pay ₹{finalPayable} & Confirm Order</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
