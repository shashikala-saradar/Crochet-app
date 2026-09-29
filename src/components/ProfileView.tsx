import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Truck, 
  Heart, 
  MapPin, 
  CreditCard, 
  Bell, 
  Tag, 
  HelpCircle, 
  RefreshCcw, 
  LogOut, 
  ShieldCheck, 
  ChevronRight, 
  Check, 
  Edit3,
  Phone,
  Mail
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ProfileViewProps {
  onOpenNotifications: () => void;
  onOpenTracking: (orderId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ 
  onOpenNotifications, 
  onOpenTracking 
}) => {
  const { 
    user, 
    setUser, 
    orders, 
    wishlist, 
    coupons, 
    setActiveTab, 
    setIsAdminMode,
    logout 
  } = useShop();

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [profileForm, setProfileForm] = useState(user);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(profileForm);
    setEditProfileMode(false);
    setSavedSuccessMsg(true);
    setTimeout(() => setSavedSuccessMsg(false), 3000);
  };

  return (
    <div className="pb-24 pt-3 max-w-2xl mx-auto px-4 space-y-5">
      {/* Profile Header Card */}
      <div className="p-4 sm:p-5 bg-white rounded-3xl border border-[#EDE5DA] shadow-2xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-[#FAF5EE] border-2 border-[#EAE1D5] flex items-center justify-center text-2xl text-[#784A3B]">
            🧶
          </div>
          <div>
            <h1 className="font-serif-brand text-xl font-bold text-[#2E231B] leading-tight">
              {user.name}
            </h1>
            <p className="text-xs text-[#8A796B] flex items-center gap-1 mt-0.5">
              <Mail size={11} /> {user.email}
            </p>
            <p className="text-xs text-[#8A796B] flex items-center gap-1">
              <Phone size={11} /> {user.phone}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setEditProfileMode(!editProfileMode)}
          className="p-2 text-[#7A6B5F] hover:text-[#2E231B] hover:bg-[#FAF7F2] rounded-xl border border-[#EDE5DA] transition-colors"
          title="Edit Profile"
        >
          <Edit3 size={16} />
        </button>
      </div>

      {savedSuccessMsg && (
        <div className="p-3 bg-[#EBF5EC] text-[#3E6C41] text-xs font-semibold rounded-xl flex items-center gap-1.5">
          <Check size={14} /> Profile details updated successfully!
        </div>
      )}

      {/* Edit Profile Form */}
      {editProfileMode && (
        <form onSubmit={handleProfileSave} className="p-4 bg-white rounded-2xl border border-[#EDE5DA] space-y-3">
          <h3 className="text-xs font-bold text-[#48392E] uppercase tracking-wider">
            Edit Account Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[11px] font-semibold text-[#48392E] block mb-0.5">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full h-8 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C6] text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#48392E] block mb-0.5">Phone Number</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full h-8 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C6] text-xs focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-[#48392E] block mb-0.5">Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full h-8 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C6] text-xs focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-[#48392E] block mb-0.5">Address</label>
              <input
                type="text"
                value={profileForm.address}
                onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full h-8 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C6] text-xs focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setEditProfileMode(false)}
              className="px-3 py-1.5 text-xs text-[#7A6B5F] hover:bg-[#FAF7F2] rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#48392E] text-white text-xs font-semibold rounded-lg hover:bg-[#34271D]"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Role Switch: Admin Dashboard Trigger Banner */}
      <div className="p-4 bg-gradient-to-r from-[#5A382E] to-[#422921] rounded-2xl text-white flex items-center justify-between shadow-xs">
        <div>
          <span className="text-[10px] text-[#D8B4A6] uppercase tracking-wider font-bold">Studio Management</span>
          <h3 className="font-bold text-sm">Crochet Admin Panel</h3>
          <p className="text-[11px] text-[#E8D0C7]">Manage products, update 7-stage orders, view stock & sales</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsAdminMode(true);
            setActiveTab('admin');
          }}
          className="px-3.5 py-2 bg-white text-[#422921] hover:bg-[#FAF5EE] text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
        >
          Open Admin
        </button>
      </div>

      {/* Account Navigation List */}
      <div className="bg-white rounded-2xl border border-[#EDE5DA] overflow-hidden divide-y divide-[#F4EFEA] text-xs font-medium text-[#48392E]">
        {/* My Orders */}
        <button
          type="button"
          onClick={() => setActiveModal('orders')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Package size={17} className="text-[#C47062]" />
            <span>My Orders ({orders.length})</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Track Order */}
        <button
          type="button"
          onClick={() => setActiveTab('tracking')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Truck size={17} className="text-[#C47062]" />
            <span>Track Active Order</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setActiveTab('wishlist')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Heart size={17} className="text-[#C47062]" />
            <span>Saved Wishlist ({wishlist.length})</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Saved Addresses */}
        <button
          type="button"
          onClick={() => setActiveModal('address')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <MapPin size={17} className="text-[#C47062]" />
            <span>Saved Delivery Addresses</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Payment Methods */}
        <button
          type="button"
          onClick={() => setActiveModal('payment')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <CreditCard size={17} className="text-[#C47062]" />
            <span>Saved Payment Cards & UPI</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={onOpenNotifications}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Bell size={17} className="text-[#C47062]" />
            <span>Studio Notifications</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Coupons */}
        <button
          type="button"
          onClick={() => setActiveModal('coupons')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Tag size={17} className="text-[#C47062]" />
            <span>Studio Coupons & Offers ({coupons.length})</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Help & Support */}
        <button
          type="button"
          onClick={() => setActiveModal('help')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <HelpCircle size={17} className="text-[#C47062]" />
            <span>Help & Artisan Support</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Returns & Refunds */}
        <button
          type="button"
          onClick={() => setActiveModal('returns')}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FAF7F2] transition-colors"
        >
          <div className="flex items-center gap-3">
            <RefreshCcw size={17} className="text-[#C47062]" />
            <span>Returns & Replacements Policy</span>
          </div>
          <ChevronRight size={15} className="text-[#9E8E80]" />
        </button>

        {/* Log Out */}
        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you want to log out of Saradar?')) {
              logout();
            }
          }}
          className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-[#FDF2F0] text-[#B83E31] transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut size={17} className="text-[#B83E31]" />
            <span className="font-semibold">Log Out of Saradar</span>
          </div>
          <ChevronRight size={15} className="text-[#B83E31]/60" />
        </button>
      </div>

      {/* Sub-modals for Profile Actions */}
      {activeModal === 'orders' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-lg w-full rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
              <h3 className="font-serif-brand text-xl font-bold text-[#2E231B]">My Orders</h3>
              <button onClick={() => setActiveModal(null)} className="text-xs font-semibold text-[#8A796B]">Close</button>
            </div>
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="p-3.5 bg-white rounded-xl border border-[#EDE5DA] text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#2E231B]">Order #{o.id}</span>
                    <span className="px-2 py-0.5 bg-[#FAF5EE] text-[#8F4436] rounded-md font-semibold text-[10px]">
                      {o.orderStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A6B5F]">Placed on {o.date} • Total: ₹{o.total}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal(null);
                      onOpenTracking(o.id);
                    }}
                    className="w-full py-1.5 bg-[#48392E] text-white text-xs font-semibold rounded-lg"
                  >
                    Track Shipment
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'coupons' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-md w-full rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
              <h3 className="font-serif-brand text-xl font-bold text-[#2E231B]">Studio Coupons</h3>
              <button onClick={() => setActiveModal(null)} className="text-xs font-semibold text-[#8A796B]">Close</button>
            </div>
            <div className="space-y-2.5">
              {coupons.map((c) => (
                <div key={c.code} className="p-3 bg-white rounded-xl border border-[#EDE5DA] text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#C47062] font-mono">{c.code}</span>
                    <span className="text-[10px] text-[#8A796B]">Exp: {c.expiry}</span>
                  </div>
                  <p className="text-[#5D4E41]">{c.description}</p>
                  <p className="text-[10px] text-[#8A796B]">Min order: ₹{c.minOrder}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModal === 'help' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-md w-full rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
              <h3 className="font-serif-brand text-xl font-bold text-[#2E231B]">Help & Support</h3>
              <button onClick={() => setActiveModal(null)} className="text-xs font-semibold text-[#8A796B]">Close</button>
            </div>
            <div className="space-y-3 text-xs text-[#5D4E41]">
              <div className="p-3 bg-white rounded-xl border border-[#EDE5DA]">
                <h4 className="font-bold text-[#2E231B] mb-0.5">How long does custom crochet take?</h4>
                <p>Standard items take 3-5 days. Custom personalized orders typically take 7-10 days to handcraft and dispatch.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE5DA]">
                <h4 className="font-bold text-[#2E231B] mb-0.5">Are products washable?</h4>
                <p>Yes! We use 100% combed milk cotton yarn. Gentle hand wash in cool water and dry flat.</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE5DA]">
                <h4 className="font-bold text-[#2E231B] mb-0.5">Contact Our Studio</h4>
                <p>Email: care@stitchandbloom.com<br />WhatsApp Support: +91 98765 43210 (10 AM - 7 PM)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'returns' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-md w-full rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
              <h3 className="font-serif-brand text-xl font-bold text-[#2E231B]">Returns & Replacements</h3>
              <button onClick={() => setActiveModal(null)} className="text-xs font-semibold text-[#8A796B]">Close</button>
            </div>
            <div className="text-xs text-[#5D4E41] space-y-2 leading-relaxed">
              <p>Because each piece is lovingly handmade by local artisans, we guarantee defect-free delivery.</p>
              <p>If any item arrives damaged during transit, notify us within 48 hours with unboxing photos for an immediate 100% free artisan replacement.</p>
              <p>Personalized items with custom embroidered names cannot be returned unless damaged.</p>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'address' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-md w-full rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
              <h3 className="font-serif-brand text-xl font-bold text-[#2E231B]">Saved Address</h3>
              <button onClick={() => setActiveModal(null)} className="text-xs font-semibold text-[#8A796B]">Close</button>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#EDE5DA] text-xs space-y-1">
              <span className="font-bold text-[#2E231B]">Default Home Address</span>
              <p className="text-[#5D4E41]">{user.name}</p>
              <p className="text-[#5D4E41]">{user.address}</p>
              <p className="text-[#5D4E41]">{user.city}, {user.state} - {user.pinCode}</p>
              <p className="text-[#5D4E41]">Phone: {user.phone}</p>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'payment' && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] max-w-md w-full rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] pb-2">
              <h3 className="font-serif-brand text-xl font-bold text-[#2E231B]">Payment Methods</h3>
              <button onClick={() => setActiveModal(null)} className="text-xs font-semibold text-[#8A796B]">Close</button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#EDE5DA] flex justify-between items-center">
                <span>Google Pay UPI (ananya@okaxis)</span>
                <span className="text-[#3E6C41] font-bold text-[10px]">Verified</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#EDE5DA] flex justify-between items-center">
                <span>HDFC Visa Platinum (•••• 8920)</span>
                <span className="text-[#3E6C41] font-bold text-[10px]">Saved</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
