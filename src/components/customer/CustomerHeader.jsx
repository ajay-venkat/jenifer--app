import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { MapPin, Bell, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function CustomerHeader({ onViewActiveOrder }) {
  const { currentTable, setCurrentTable, activeOrder } = useOrders();
  const [showTableSelect, setShowTableSelect] = useState(false);

  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-brand-sand shadow-sm">
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Logo & Brand Identity */}
        <div className="flex items-center gap-3">
          <img
            src="/jenifer-logo.png"
            alt="Jenifer Sweets & Bakery"
            className="w-11 h-11 rounded-full object-contain border-2 border-brand-pink/30 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-brand-brown tracking-tight leading-none font-logo">
                JENIFER
              </h1>
              <span className="text-[10px] font-bold text-brand-pink tracking-widest uppercase">
                SWEETS
              </span>
            </div>
            <p className="text-[11px] text-brand-brown/70 font-medium leading-tight">
              37 Years of Sweet Excellence
            </p>
          </div>
        </div>

        {/* Table Number Badge & Switcher */}
        <div className="flex items-center gap-2">
          {/* Active order badge if customer has an ongoing order */}
          {activeOrder && activeOrder.status !== 'SERVED' && (
            <button
              onClick={onViewActiveOrder}
              className="relative p-2 rounded-full bg-brand-pink/10 text-brand-pink hover:bg-brand-pink/20 transition-all flex items-center justify-center animate-pulse"
              title="View live order status"
            >
              <Clock className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-pink rounded-full border-2 border-white"></span>
            </button>
          )}

          {/* Mint Teal Table Badge */}
          <div className="relative">
            <button
              onClick={() => setShowTableSelect(!showTableSelect)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-teal text-brand-brownDark rounded-full text-xs font-bold shadow-teal hover:bg-brand-tealDark hover:text-white transition-all active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>Table #{currentTable}</span>
              <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </button>

            {/* Table Dropdown Menu for testing/switch table */}
            {showTableSelect && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-brand-sand py-2 z-50 animate-scale-in">
                <div className="px-3 py-1.5 border-b border-brand-sand/60">
                  <p className="text-[11px] font-bold text-brand-brown uppercase tracking-wider">
                    Select Your Table
                  </p>
                  <p className="text-[10px] text-gray-500">QR Code Simulation</p>
                </div>
                <div className="grid grid-cols-5 gap-1.5 p-2 max-h-48 overflow-y-auto">
                  {tables.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setCurrentTable(t);
                        setShowTableSelect(false);
                      }}
                      className={`h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                        t === currentTable
                          ? 'bg-brand-teal text-brand-brown font-extrabold shadow-sm'
                          : 'bg-brand-cream hover:bg-brand-pink/10 text-brand-brown'
                      }`}
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
