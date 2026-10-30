import React, { useState } from 'react';
import { OrderProvider, useOrders } from './context/OrderContext';
import CustomerView from './components/customer/CustomerView';
import AdminDashboard from './components/admin/AdminDashboard';
import TableQRGenerator from './components/admin/TableQRGenerator';
import MenuStockManager from './components/admin/MenuStockManager';
import {
  Smartphone,
  LayoutDashboard,
  QrCode,
  PackageCheck,
  RotateCcw,
  Wifi,
  Battery,
  Maximize2,
  Minimize2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

function AppContent() {
  const { currentTable, setCurrentTable } = useOrders();
  const [activeTab, setActiveTab] = useState('CUSTOMER'); // 'CUSTOMER' | 'ADMIN' | 'QR_GEN' | 'STOCK'
  const [useDeviceFrame, setUseDeviceFrame] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F4F0] text-brand-brown flex flex-col font-sans">
      {/* Top Testing Switcher & Control Bar (Hidden on print) */}
      <header className="no-print bg-brand-brown text-white px-3 py-2 border-b border-brand-sand/20 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Brand & Mode Identifier */}
          <div className="flex items-center gap-2">
            <img
              src="/jenifer-logo.png"
              alt="Jenifer Sweets"
              className="w-8 h-8 rounded-full bg-white p-0.5 object-contain"
            />
            <div>
              <span className="font-extrabold text-xs tracking-tight text-white flex items-center gap-1.5 font-logo">
                JENIFER SWEETS & BAKERY
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-brand-pink text-white rounded-full">
                  PWA
                </span>
              </span>
              <span className="text-[10px] text-brand-teal font-medium block leading-none">
                QR Table System & Kitchen POS
              </span>
            </div>
          </div>

          {/* Navigation View Mode Switcher */}
          <div className="flex items-center bg-black/30 p-1 rounded-2xl border border-white/10 gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('CUSTOMER')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'CUSTOMER'
                  ? 'bg-brand-pink text-white shadow-pink'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Customer View (Table #{currentTable})</span>
            </button>

            <button
              onClick={() => setActiveTab('ADMIN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'ADMIN'
                  ? 'bg-brand-teal text-brand-brown shadow-teal font-extrabold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Kitchen / Admin Counter</span>
            </button>

            <button
              onClick={() => setActiveTab('QR_GEN')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'QR_GEN'
                  ? 'bg-white text-brand-brown shadow-sm font-extrabold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>QR Tent Cards</span>
            </button>

            <button
              onClick={() => setActiveTab('STOCK')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeTab === 'STOCK'
                  ? 'bg-white text-brand-brown shadow-sm font-extrabold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Stock Toggles</span>
            </button>
          </div>

          {/* Quick Table Switcher & Frame Controls */}
          <div className="flex items-center gap-2">
            {activeTab === 'CUSTOMER' && (
              <>
                <button
                  onClick={() => setUseDeviceFrame(!useDeviceFrame)}
                  className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                  title="Toggle Mobile Bezel Frame"
                >
                  {useDeviceFrame ? (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Full Width</span>
                    </>
                  ) : (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Phone Frame</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-xl text-xs">
                  <span className="text-[11px] text-white/70">Table:</span>
                  <select
                    value={currentTable}
                    onChange={(e) => setCurrentTable(Number(e.target.value))}
                    className="bg-transparent text-white font-extrabold focus:outline-none cursor-pointer"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((t) => (
                      <option key={t} value={t} className="bg-brand-brown text-white">
                        #{t}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <div className="flex-1">
        {activeTab === 'CUSTOMER' && (
          <div className="w-full flex justify-center py-0 md:py-6 bg-brand-cream/60">
            {useDeviceFrame ? (
              /* Simulated iPhone / Android Mobile Mockup Container for Desktop */
              <div className="w-full max-w-md bg-white md:rounded-[42px] md:shadow-2xl md:border-[8px] md:border-[#2A1208] overflow-hidden relative flex flex-col min-h-screen md:min-h-[840px] md:max-h-[920px]">
                {/* Mobile Speaker & Camera Notch (Desktop Frame Only) */}
                <div className="hidden md:flex justify-between items-center px-6 pt-3 pb-1 bg-white text-xs text-brand-brown select-none border-b border-brand-sand/30 shrink-0">
                  <span className="font-extrabold text-[11px]">9:41</span>
                  <div className="w-20 h-4 bg-[#2A1208] rounded-full mx-auto"></div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <Wifi className="w-3 h-3 text-brand-brown" />
                    <Battery className="w-3.5 h-3.5 text-brand-brown" />
                  </div>
                </div>

                {/* Mobile Viewport Screen */}
                <div className="flex-1 overflow-y-auto relative no-scrollbar">
                  <CustomerView />
                </div>
              </div>
            ) : (
              /* Full-Width Responsive View */
              <div className="w-full max-w-4xl mx-auto px-4">
                <CustomerView />
              </div>
            )}
          </div>
        )}

        {activeTab === 'ADMIN' && (
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <AdminDashboard
              onOpenQRGenerator={() => setActiveTab('QR_GEN')}
              onOpenStockManager={() => setActiveTab('STOCK')}
            />
          </div>
        )}

        {activeTab === 'QR_GEN' && (
          <div className="max-w-5xl mx-auto p-4 sm:p-6">
            <TableQRGenerator />
          </div>
        )}

        {activeTab === 'STOCK' && (
          <div className="max-w-6xl mx-auto p-4 sm:p-6">
            <MenuStockManager />
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  );
}
