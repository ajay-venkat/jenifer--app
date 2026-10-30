import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { soundFX } from '../../utils/audio';
import ReceiptPrinterModal from './ReceiptPrinterModal';
import ThermalReceipt from '../common/ThermalReceipt';
import {
  Bell,
  Volume2,
  CheckCircle2,
  Clock,
  ChefHat,
  UtensilsCrossed,
  Printer,
  ShieldCheck,
  Phone,
  User,
  MessageSquare,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard({ onOpenQRGenerator, onOpenStockManager }) {
  const { orders, updateOrderStatus, alertNotification, setAlertNotification } = useOrders();
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'NEW_PAID' | 'PREPARING' | 'SERVED'
  const [selectedOrderForKOT, setSelectedOrderForKOT] = useState(null);
  const [showPrinterModal, setShowPrinterModal] = useState(false);
  const [tableSearch, setTableSearch] = useState('');

  // Calculate stats
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'PAID')
    .reduce((sum, o) => sum + o.grandTotal, 0);

  const pendingVerificationCount = orders.filter((o) => o.status === 'NEW_PAID').length;
  const preparingCount = orders.filter((o) => o.status === 'PREPARING').length;
  const servedCount = orders.filter((o) => o.status === 'SERVED').length;

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    const matchesTable =
      !tableSearch ||
      order.tableNumber.toString().includes(tableSearch) ||
      order.id.toLowerCase().includes(tableSearch.toLowerCase()) ||
      order.customerName.toLowerCase().includes(tableSearch.toLowerCase());
    return matchesStatus && matchesTable;
  });

  const handleTestChime = () => {
    soundFX.playOrderChime();
  };

  const handlePrintKOT = (order) => {
    setSelectedOrderForKOT(order);
    setShowPrinterModal(true);
  };

  // Helper for human-readable time ago
  const formatTimeAgo = (isoString) => {
    if (!isoString) return 'Just now';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1m ago';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
  };

  return (
    <div className="space-y-6">
      {/* Visual Live Alert Banner (when new order arrives) */}
      {alertNotification && (
        <div className="no-print bg-brand-pink text-white p-4 rounded-3xl shadow-pink flex items-center justify-between animate-scale-in border border-white/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center animate-bounce">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm tracking-tight">
                {alertNotification.title}
              </h4>
              <p className="text-xs text-white/90">
                {alertNotification.message}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAlertNotification(null)}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header & Actions Bar */}
      <div className="no-print bg-white rounded-3xl p-5 border border-brand-sand shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src="/jenifer-logo.png"
            alt="Jenifer Sweets & Bakery"
            className="w-14 h-14 rounded-full object-contain border-2 border-brand-pink/30 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-brand-brown tracking-tight font-logo">
                JENIFER SWEETS & BAKERY
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-brand-teal text-brand-brownDark font-extrabold text-[10px]">
                LIVE KITCHEN POS
              </span>
            </div>
            <p className="text-xs text-brand-brown/70">
              Real-time Counter Verification & Table Fulfillment Terminal
            </p>
          </div>
        </div>

        {/* Audio Alert Test & Quick Nav */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleTestChime}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-cream hover:bg-brand-sand text-brand-brown rounded-xl text-xs font-bold border border-brand-sand transition-all active:scale-95"
            title="Test Kitchen Audio Bell"
          >
            <Volume2 className="w-3.5 h-3.5 text-brand-pink" />
            <span>Test Chime</span>
          </button>

          <button
            onClick={onOpenStockManager}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-brand-cream text-brand-brown rounded-xl text-xs font-bold border border-brand-sand transition-all active:scale-95"
          >
            <ChefHat className="w-3.5 h-3.5 text-brand-teal" />
            <span>Stock Availability</span>
          </button>

          <button
            onClick={() => {
              setSelectedOrderForKOT(orders[0] || null);
              setShowPrinterModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-pink/10 hover:bg-brand-pink/20 text-brand-pink rounded-xl text-xs font-extrabold border border-brand-pink/30 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 text-brand-pink" />
            <span>Thermal KOT Printer</span>
          </button>

          <button
            onClick={onOpenQRGenerator}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-brown hover:bg-brand-brownLight text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 text-brand-teal" />
            <span>Table QR Tent Cards</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="no-print grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Total Revenue */}
        <div className="bg-white p-4 rounded-3xl border border-brand-sand shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-brand-brown/60 uppercase tracking-wider block">
            Today's Table Sales
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-brand-brown font-display">
              ₹{totalRevenue}
            </span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              UPI Paid
            </span>
          </div>
        </div>

        {/* Pending Verification */}
        <div className="bg-white p-4 rounded-3xl border border-brand-sand shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-brand-brown/60 uppercase tracking-wider block">
            Needs Verification
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-600 font-display">
              {pendingVerificationCount}
            </span>
            <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full animate-pulse">
              New Paid
            </span>
          </div>
        </div>

        {/* Preparing in Kitchen */}
        <div className="bg-white p-4 rounded-3xl border border-brand-sand shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-brand-brown/60 uppercase tracking-wider block">
            Preparing at Bakery
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-brand-pink font-display">
              {preparingCount}
            </span>
            <span className="text-[10px] font-extrabold text-brand-pink bg-brand-pink/10 px-2 py-0.5 rounded-full">
              In Oven / Counter
            </span>
          </div>
        </div>

        {/* Completed / Served */}
        <div className="bg-white p-4 rounded-3xl border border-brand-sand shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-brand-brown/60 uppercase tracking-wider block">
            Served at Tables
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-brand-tealDark font-display">
              {servedCount}
            </span>
            <span className="text-[10px] font-extrabold text-brand-tealDark bg-brand-tealLight px-2 py-0.5 rounded-full">
              Fulfilled
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="no-print bg-white p-4 rounded-3xl border border-brand-sand shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {[
            { id: 'ALL', label: 'All Orders', count: orders.length },
            { id: 'NEW_PAID', label: 'New Paid (Verify)', count: pendingVerificationCount, badge: true },
            { id: 'PREPARING', label: 'Preparing', count: preparingCount },
            { id: 'SERVED', label: 'Served', count: servedCount }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-brand-pink text-white shadow-pink'
                  : 'bg-brand-cream hover:bg-brand-sand text-brand-brown'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  statusFilter === tab.id
                    ? 'bg-white text-brand-pink'
                    : 'bg-brand-sand text-brand-brown'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search by Table or Order ID */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-brand-brown/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            placeholder="Search table, #ID or guest..."
            className="w-full pl-8 pr-3 py-1.5 bg-brand-cream border border-brand-sand rounded-xl text-xs text-brand-brown placeholder-brand-brown/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/30"
          />
        </div>
      </div>

      {/* Orders Grid */}
      <div className="no-print space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand-sand space-y-2">
            <UtensilsCrossed className="w-10 h-10 text-brand-brown/30 mx-auto" />
            <h3 className="font-bold text-sm text-brand-brown">No orders in this status</h3>
            <p className="text-xs text-brand-brown/60">
              When customers order from table QR codes, they will appear here instantly with sound alerts.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => {
              const isNew = order.status === 'NEW_PAID';
              const isPrep = order.status === 'PREPARING';
              const isServed = order.status === 'SERVED';

              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-3xl p-5 border transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-brand relative overflow-hidden ${
                    isNew
                      ? 'border-brand-pink ring-2 ring-brand-pink/30 bg-gradient-to-b from-brand-pink/5 to-white'
                      : isPrep
                      ? 'border-brand-teal ring-2 ring-brand-teal/20'
                      : 'border-brand-sand'
                  }`}
                >
                  {/* Top Bar: Table Number Badge + Order ID + Timestamp */}
                  <div className="flex items-start justify-between gap-2">
                    {/* Large Table Number Badge */}
                    <div className="flex items-center gap-2">
                      <div className="px-3.5 py-1.5 rounded-xl bg-brand-brown text-white font-black text-sm shadow-sm flex items-center gap-1.5 border border-brand-teal">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-brand-teal" />
                        <span>TABLE #{order.tableNumber}</span>
                      </div>
                      <span className="text-xs font-bold text-brand-pink">
                        {order.id}
                      </span>
                    </div>

                    {/* Time Elapsed */}
                    <div className="text-right">
                      <span className="text-[10px] text-brand-brown/60 font-semibold block">
                        {formatTimeAgo(order.createdAt)}
                      </span>
                      {isNew && (
                        <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full inline-block mt-0.5 animate-pulse">
                          Needs Verification
                        </span>
                      )}
                      {isPrep && (
                        <span className="text-[10px] font-extrabold bg-brand-pink/15 text-brand-pink px-2 py-0.5 rounded-full inline-block mt-0.5">
                          Preparing
                        </span>
                      )}
                      {isServed && (
                        <span className="text-[10px] font-extrabold bg-green-100 text-green-700 px-2 py-0.5 rounded-full inline-block mt-0.5">
                          Served ✓
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Customer Info & UPI Verification Badge */}
                  <div className="bg-brand-cream/70 rounded-2xl p-3 border border-brand-sand/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-brown flex items-center gap-1">
                        <User className="w-3 h-3 text-brand-brown/60" />
                        {order.customerName}
                      </span>
                      {order.customerPhone !== 'N/A' && (
                        <span className="text-[11px] text-brand-brown/70 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-brand-brown/60" />
                          {order.customerPhone}
                        </span>
                      )}
                    </div>

                    {/* UPI Verification Info */}
                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-brand-sand/60">
                      <span className="text-green-700 font-extrabold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                        {order.paymentMethod}
                      </span>
                      <span className="text-gray-500 font-mono text-[10px]">
                        {order.utrNumber}
                      </span>
                    </div>
                  </div>

                  {/* Itemized List */}
                  <div className="space-y-1.5 py-1">
                    {order.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs text-brand-brown py-0.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-brand-pink/10 text-brand-pink font-extrabold text-[11px] flex items-center justify-center">
                            {it.quantity}x
                          </span>
                          <span className="font-semibold text-brand-brown">
                            {it.name}{' '}
                            <span className="text-[10px] text-brand-pink font-bold">
                              ({it.variant})
                            </span>
                          </span>
                        </div>
                        <span className="font-bold">₹{it.total}</span>
                      </div>
                    ))}
                  </div>

                  {/* Customer Kitchen Instructions */}
                  {order.specialNotes && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 text-xs text-amber-900 flex items-start gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-[10px] uppercase tracking-wider">
                          Guest Note:
                        </span>
                        <span>"{order.specialNotes}"</span>
                      </div>
                    </div>
                  )}

                  {/* Order Total & Action Buttons */}
                  <div className="pt-3 border-t border-brand-sand space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-brand-brown/60 font-semibold">
                        Grand Total (Paid)
                      </span>
                      <span className="text-lg font-black text-brand-brown font-display">
                        ₹{order.grandTotal}
                      </span>
                    </div>

                    {/* Action Buttons Workflow */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handlePrintKOT(order)}
                        className="py-2 px-3 bg-brand-cream hover:bg-brand-sand text-brand-brown rounded-xl text-xs font-bold border border-brand-sand flex items-center justify-center gap-1.5 transition-all"
                        title="Print Kitchen Order Ticket"
                      >
                        <Printer className="w-3.5 h-3.5 text-brand-brown/70" />
                        <span>Print KOT</span>
                      </button>

                      {isNew && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                          className="py-2 px-3 bg-brand-pink hover:bg-brand-pinkHover active:scale-95 text-white rounded-xl text-xs font-black shadow-pink flex items-center justify-center gap-1.5 transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verify & Prepare</span>
                        </button>
                      )}

                      {isPrep && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'SERVED')}
                          className="py-2 px-3 bg-brand-teal hover:bg-brand-tealDark hover:text-white active:scale-95 text-brand-brown font-black rounded-xl text-xs shadow-teal flex items-center justify-center gap-1.5 transition-all"
                        >
                          <UtensilsCrossed className="w-3.5 h-3.5" />
                          <span>Serve to #{order.tableNumber}</span>
                        </button>
                      )}

                      {isServed && (
                        <div className="py-2 px-3 bg-green-50 text-green-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border border-green-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Mechanical Thermal KOT Printer Modal */}
      <ReceiptPrinterModal
        order={selectedOrderForKOT}
        isOpen={showPrinterModal}
        onClose={() => setShowPrinterModal(false)}
      />

      {/* Hidden Print-Ready Thermal KOT Slip */}
      {selectedOrderForKOT && (
        <div className="hidden print:block max-w-xs mx-auto">
          <ThermalReceipt order={selectedOrderForKOT} isKOT={true} />
        </div>
      )}
    </div>
  );
}
