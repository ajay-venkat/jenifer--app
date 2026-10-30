import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import ReceiptPrinterModal from '../admin/ReceiptPrinterModal';
import {
  CheckCircle2,
  Clock,
  ChefHat,
  UtensilsCrossed,
  Sparkles,
  ArrowLeft,
  Receipt,
  Download,
  BellRing,
  HelpCircle,
  Share2,
  Printer
} from 'lucide-react';

export default function LiveOrderTracker({ order, onBackToMenu }) {
  const [staffCalled, setStaffCalled] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Trigger confetti when order reaches 'SERVED'
  useEffect(() => {
    if (order?.status === 'SERVED') {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti note:', e);
      }
    }
  }, [order?.status]);

  if (!order) return null;

  // Stages definition
  const stages = [
    {
      id: 'STAGE_1',
      title: 'Order Paid & Sent',
      subtitle: 'Order ticket registered via UPI',
      icon: CheckCircle2,
      isCompleted: true, // Always completed once paid
      isActive: order.status === 'NEW_PAID'
    },
    {
      id: 'STAGE_2',
      title: 'Verified by Counter',
      subtitle: 'Staff matched UPI payment UTR',
      icon: Clock,
      isCompleted: order.status === 'PREPARING' || order.status === 'SERVED',
      isActive: order.status === 'NEW_PAID'
    },
    {
      id: 'STAGE_3',
      title: 'Preparing at Bakery',
      subtitle: 'Chef packing sweets & warming puffs',
      icon: ChefHat,
      isCompleted: order.status === 'SERVED',
      isActive: order.status === 'PREPARING'
    },
    {
      id: 'STAGE_4',
      title: `Served at Table #${order.tableNumber}`,
      subtitle: 'Brought fresh to your table by staff',
      icon: UtensilsCrossed,
      isCompleted: order.status === 'SERVED',
      isActive: order.status === 'SERVED'
    }
  ];

  const handleCallStaff = () => {
    setStaffCalled(true);
    setTimeout(() => setStaffCalled(false), 4000);
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-12">
      {/* Top Navigation */}
      <div className="bg-white px-4 py-3 border-b border-brand-sand flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 text-xs font-bold text-brand-brown hover:text-brand-pink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bakery Menu</span>
        </button>

        <span className="px-3 py-1 bg-brand-teal/20 text-brand-brown font-extrabold text-xs rounded-full border border-brand-teal">
          Table #{order.tableNumber}
        </span>
      </div>

      <div className="max-w-md mx-auto px-4 py-5 space-y-5">
        {/* Order Status Hero Card */}
        <div className="bg-white rounded-3xl p-5 border border-brand-sand shadow-brand text-center relative overflow-hidden">
          {order.status === 'SERVED' ? (
            <div className="space-y-2 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-black text-brand-brown">
                Order Served! Bon Appétit ✨
              </h2>
              <p className="text-xs text-brand-brown/70 max-w-xs mx-auto">
                Your fresh bakery items have been served at Table #{order.tableNumber}. Enjoy your meal!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-14 h-14 rounded-full bg-brand-pink/10 text-brand-pink flex items-center justify-center mx-auto animate-pulse-subtle">
                <ChefHat className="w-7 h-7" />
              </div>
              <h2 className="text-lg font-black text-brand-brown">
                {order.status === 'PREPARING'
                  ? 'Kitchen is Preparing Your Order'
                  : 'Order Paid & Waiting for Counter Verification'}
              </h2>
              <p className="text-xs text-brand-brown/70">
                Order ID: <span className="font-extrabold text-brand-pink">{order.id}</span> • UTR: {order.utrNumber}
              </p>
            </div>
          )}

          {/* Quick Staff Ping Button */}
          <div className="pt-4 mt-4 border-t border-brand-sand/60 flex items-center justify-center gap-2">
            <button
              onClick={handleCallStaff}
              disabled={staffCalled}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                staffCalled
                  ? 'bg-green-100 text-green-800'
                  : 'bg-brand-cream hover:bg-brand-sand text-brand-brown border border-brand-sand'
              }`}
            >
              <BellRing className="w-3.5 h-3.5 text-brand-pink" />
              <span>{staffCalled ? 'Staff Alerted (Coming soon)' : 'Call Waiter / Water'}</span>
            </button>
          </div>
        </div>

        {/* 4-Step Progress Tracker */}
        <div className="bg-white rounded-3xl p-5 border border-brand-sand shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-brand-brown uppercase tracking-wider">
            Live Kitchen Fulfillment Status
          </h3>

          <div className="relative pl-6 space-y-7 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-brand-sand">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div key={stage.id} className="relative flex items-start gap-3.5">
                  {/* Step Node Icon */}
                  <div
                    className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      stage.isCompleted
                        ? 'bg-green-500 border-green-500 text-white shadow-xs'
                        : stage.isActive
                        ? 'bg-brand-pink border-brand-pink text-white animate-pulse'
                        : 'bg-white border-brand-sand text-brand-brown/40'
                    }`}
                  >
                    {stage.isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  {/* Stage Text Details */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-xs font-bold ${
                          stage.isCompleted || stage.isActive
                            ? 'text-brand-brown'
                            : 'text-brand-brown/50'
                        }`}
                      >
                        {stage.title}
                      </h4>
                      {stage.isActive && (
                        <span className="text-[10px] font-extrabold bg-brand-pink/15 text-brand-pink px-2 py-0.2 rounded-full animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-brand-brown/60 leading-snug">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Digital Receipt Card */}
        <div className="bg-white rounded-3xl p-5 border border-brand-sand shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-brand-sand">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-brand-pink" />
              <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">
                Digital Food Receipt
              </span>
            </div>
            <span className="text-[10px] font-extrabold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              PAID VIA UPI
            </span>
          </div>

          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs text-brand-brown py-1">
                <span className="font-medium">
                  {item.quantity}x {item.name}{' '}
                  <span className="text-[11px] text-brand-pink font-semibold">
                    ({item.variant})
                  </span>
                </span>
                <span className="font-bold">₹{item.total}</span>
              </div>
            ))}
          </div>

          {order.specialNotes && (
            <div className="p-2.5 rounded-xl bg-brand-cream border border-brand-sand text-[11px] text-brand-brown/80">
              <span className="font-bold block text-brand-pink">Kitchen Note:</span>
              "{order.specialNotes}"
            </div>
          )}

          <div className="pt-3 border-t border-brand-sand space-y-1 text-xs text-brand-brown/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>GST & Bakery Taxes (5%)</span>
              <span>₹{order.gst}</span>
            </div>
            <div className="flex justify-between font-black text-sm text-brand-brown pt-1.5 border-t border-brand-sand/60">
              <span>Total Paid</span>
              <span className="text-base text-brand-pink font-display">₹{order.grandTotal}</span>
            </div>
          </div>

          {/* Thermal Receipt Button */}
          <button
            onClick={() => setShowReceiptModal(true)}
            className="w-full mt-2 py-2 px-3 bg-[#211712] hover:bg-[#3A2B22] text-[#FBF3E4] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>View Animated Thermal KOT / Bill</span>
          </button>
        </div>

        {/* Action Button: Order More Items */}
        <button
          onClick={onBackToMenu}
          className="w-full py-3.5 bg-brand-pink text-white rounded-2xl font-black text-xs shadow-pink hover:bg-brand-pinkHover active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Order More Sweets or Beverages</span>
        </button>

        {/* Interactive Thermal Receipt Modal */}
        <ReceiptPrinterModal
          order={order}
          isOpen={showReceiptModal}
          onClose={() => setShowReceiptModal(false)}
        />
      </div>
    </div>
  );
}
