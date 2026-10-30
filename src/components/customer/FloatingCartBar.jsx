import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function FloatingCartBar({ totalItems, grandTotal, onOpenDrawer }) {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 max-w-md mx-auto pointer-events-none">
      <div className="pointer-events-auto bg-brand-pink text-white rounded-2xl p-3.5 shadow-pink flex items-center justify-between animate-slide-up border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center relative backdrop-blur-sm">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-brown text-white text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-brand-pink shadow-xs">
              {totalItems}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-white/80 uppercase font-semibold tracking-wider block">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
            </span>
            <span className="text-lg font-black tracking-tight font-display">
              ₹{grandTotal}
            </span>
          </div>
        </div>

        <button
          onClick={onOpenDrawer}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-brand-pink rounded-xl text-xs font-black shadow-md hover:bg-brand-cream active:scale-95 transition-all"
        >
          <span>View Cart & Pay</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
