import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { X, Plus, Minus, Trash2, MessageSquare, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CartCheckoutDrawer({ isOpen, onClose, onProceedToPayment }) {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotalItems,
    cartSubtotal,
    cartGst,
    cartGrandTotal,
    currentTable
  } = useOrders();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  if (!isOpen) return null;

  const handleCheckoutClick = () => {
    onProceedToPayment({
      customerName,
      customerPhone,
      specialNotes
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="absolute inset-x-0 bottom-0 max-w-md mx-auto bg-white rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col animate-slide-up border-t border-brand-sand">
        {/* Header */}
        <div className="px-5 py-4 border-b border-brand-sand/60 flex items-center justify-between bg-brand-cream/50">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-brand-brown">
              Table #{currentTable} Order
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-brand-pink/10 text-brand-pink font-bold text-xs">
              {cartTotalItems} {cartTotalItems === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-brand-cream text-brand-brown/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-5 py-4 space-y-4 flex-1">
          {/* Cart Items List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">
                Selected Bakery Items
              </span>
              <button
                onClick={clearCart}
                className="text-[11px] font-semibold text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>

            {cart.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-brand-cream/60 border border-brand-sand/60 gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover border border-brand-sand/70 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-brand-brown truncate">
                      {item.name}
                    </h4>
                    <span className="text-[10px] text-brand-pink font-semibold bg-brand-pink/10 px-1.5 py-0.5 rounded-md inline-block mt-0.5">
                      {item.variant}
                    </span>
                    <p className="text-xs font-extrabold text-brand-brown mt-0.5">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center bg-white rounded-xl border border-brand-sand p-1 shadow-xs shrink-0">
                  <button
                    onClick={() => updateCartQuantity(item.key, -1)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg text-brand-pink hover:bg-brand-pink/10 active:scale-90 transition-all"
                  >
                    {item.quantity === 1 ? (
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    ) : (
                      <Minus className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <span className="w-6 text-center font-extrabold text-xs text-brand-brown">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.key, 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-lg bg-brand-pink text-white hover:bg-brand-pinkHover active:scale-90 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Special Cooking & Serving Instructions */}
          <div className="bg-brand-cream/40 p-3 rounded-2xl border border-brand-sand/70">
            <label className="flex items-center gap-1.5 text-xs font-bold text-brand-brown mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-brand-pink" />
              <span>Special Kitchen Instructions</span>
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Warm the puff, Extra tissue, Less sugar in coffee"
              className="w-full px-3 py-2 bg-white border border-brand-sand rounded-xl text-xs text-brand-brown placeholder-brand-brown/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/30 focus:border-brand-pink"
            />
          </div>

          {/* Optional Customer Name & Phone */}
          <div className="bg-brand-cream/40 p-3 rounded-2xl border border-brand-sand/70 space-y-2">
            <span className="text-xs font-bold text-brand-brown block">
              Customer Details (Optional for Digital Receipt)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <User className="w-3.5 h-3.5 text-brand-brown/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-8 pr-2 py-1.5 bg-white border border-brand-sand rounded-xl text-xs text-brand-brown placeholder-brand-brown/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/30"
                />
              </div>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-brand-brown/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone (WhatsApp)"
                  className="w-full pl-8 pr-2 py-1.5 bg-white border border-brand-sand rounded-xl text-xs text-brand-brown placeholder-brand-brown/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/30"
                />
              </div>
            </div>
          </div>

          {/* Bill Summary Breakdown */}
          <div className="bg-white p-3.5 rounded-2xl border border-brand-sand space-y-2">
            <span className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
              Bill Breakdown
            </span>
            <div className="flex justify-between text-xs text-brand-brown/70">
              <span>Item Subtotal</span>
              <span className="font-semibold text-brand-brown">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between text-xs text-brand-brown/70">
              <span>GST & Bakery Taxes (5%)</span>
              <span className="font-semibold text-brand-brown">₹{cartGst}</span>
            </div>
            <div className="pt-2 border-t border-brand-sand flex justify-between items-baseline">
              <div>
                <span className="text-sm font-black text-brand-brown block">To Pay</span>
                <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Inclusive of Table Service
                </span>
              </div>
              <span className="text-xl font-black text-brand-brown font-display">
                ₹{cartGrandTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="p-4 border-t border-brand-sand bg-white">
          <button
            onClick={handleCheckoutClick}
            disabled={cart.length === 0}
            className="w-full py-3 bg-brand-pink hover:bg-brand-pinkHover active:scale-98 text-white rounded-2xl font-black text-sm shadow-pink flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>Proceed to Pay ₹{cartGrandTotal}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
