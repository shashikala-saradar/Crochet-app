import React from 'react';
import { X, Bell, CheckCheck, Package, Tag, AlertCircle, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { NotificationItem } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder: (orderId: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectOrder
}) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useShop();

  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <Package size={15} className="text-[#5B7B59]" />;
      case 'offer':
        return <Tag size={15} className="text-[#C47062]" />;
      case 'stock':
        return <AlertCircle size={15} className="text-[#C26229]" />;
      case 'custom':
        return <Sparkles size={15} className="text-[#8F4436]" />;
      default:
        return <Bell size={15} className="text-[#7A6B5F]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-sm bg-[#FAF7F2] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-[#EAE2D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-[#C47062]" />
            <h3 className="font-serif-brand text-lg font-bold text-[#2E231B]">
              Notifications
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={markAllNotificationsRead}
              className="text-[11px] font-semibold text-[#8F4436] hover:underline flex items-center gap-1"
            >
              <CheckCheck size={13} />
              <span>Mark all read</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-[#8A796B] hover:text-[#2E231B]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.relatedId && notif.type === 'order') {
                    onSelectOrder(notif.relatedId);
                    onClose();
                  }
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-white border-[#EDE5DA] opacity-80'
                    : 'bg-white border-[#C47062]/40 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#FAF5EE] flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#2E231B]">{notif.title}</h4>
                      <span className="text-[10px] text-[#A09083]">{notif.time}</span>
                    </div>
                    <p className="text-xs text-[#6C5B4E] mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-xs text-[#8A796B]">
              No notifications yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
