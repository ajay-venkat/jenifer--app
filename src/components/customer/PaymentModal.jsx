import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { ShieldCheck, CheckCircle2, Lock, Smartphone, CreditCard, QrCode, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function PaymentModal({ isOpen, onClose, checkoutData, onPaymentSuccess }) {
  const { cartGrandTotal, currentTable, placeOrder } = useOrders();

  const [paymentMethod, setPaymentMethod] = useState('UPI - Google Pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('IDLE'); // 'IDLE' | 'PROCESSING' | 'SUCCESS'

  if (!isOpen) return null;

  const upiApps = [
    { id: 'UPI - Google Pay', name: 'Google Pay', icon: '⚡', color: 'border-blue-200 bg-blue-50/50' },
    { id: 'UPI - PhonePe', name: 'PhonePe', icon: '🟣', color: 'border-purple-200 bg-purple-50/50' },
    { id: 'UPI - Paytm', name: 'Paytm UPI', icon: '🔵', color: 'border-sky-200 bg-sky-50/50' },
    { id: 'UPI - QR Scan', name: 'Scan Any UPI QR', icon: '📲', color: 'border-brand-teal/40 bg-brand-tealLight/50' }
  ];

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setPaymentStep('PROCESSING');

    // Simulate realistic 1.5s UPI bank gateway handshake
    setTimeout(() => {
      setPaymentStep('SUCCESS');

      setTimeout(() => {
        const order = placeOrder({
          paymentMethod,
          customerName: checkoutData.customerName,
          customerPhone: checkoutData.customerPhone,
          specialNotes: checkoutData.specialNotes
        });

        setIsProcessing(false);
        setPaymentStep('IDLE');
        onPaymentSuccess(order);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={isProcessing ? undefined : onClose}
      />

      {/* Razorpay-style Modal Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-sand z-10 animate-scale-in">
        {/* Top Header */}
        <div className="bg-brand-brown p-5 text-white relative">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/jenifer-logo.png"
                alt="Jenifer Sweets"
                className="w-10 h-10 rounded-full bg-white p-0.5 object-contain"
              />
              <div>
                <h3 className="font-extrabold text-sm tracking-tight text-white font-logo">
                  JENIFER SWEETS & BAKERY
                </h3>
                <p className="text-[10px] text-brand-teal font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified UPI Merchant • Table #{currentTable}
                </p>
              </div>
            </div>
            {!isProcessing && (
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
            <span className="text-xs text-white/70">Total Amount Due</span>
            <span className="text-2xl font-black tracking-tight text-white font-display">
              ₹{cartGrandTotal}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {paymentStep === 'PROCESSING' ? (
            <div className="py-8 text-center space-y-3">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-brand-pink/20 border-t-brand-pink animate-spin"></div>
                <Smartphone className="w-6 h-6 text-brand-pink absolute inset-0 m-auto" />
              </div>
              <h4 className="font-extrabold text-sm text-brand-brown">
                Connecting to {paymentMethod}...
              </h4>
              <p className="text-xs text-brand-brown/60">
                Simulating UPI authorization on your device
              </p>
            </div>
          ) : paymentStep === 'SUCCESS' ? (
            <div className="py-8 text-center space-y-3 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-extrabold text-base text-brand-brown">
                Payment Verified! ₹{cartGrandTotal}
              </h4>
              <p className="text-xs text-green-700 font-semibold">
                Sending ticket directly to Bakery Kitchen...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Payment Methods Selection */}
              <div>
                <label className="text-xs font-bold text-brand-brown uppercase tracking-wider block mb-2">
                  Select Instant Payment Option
                </label>
                <div className="space-y-2">
                  {upiApps.map((app) => (
                    <label
                      key={app.id}
                      onClick={() => setPaymentMethod(app.id)}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === app.id
                          ? 'border-brand-pink bg-brand-pink/10 shadow-xs ring-1 ring-brand-pink'
                          : 'border-brand-sand hover:bg-brand-cream/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{app.icon}</span>
                        <div>
                          <span className="text-xs font-bold text-brand-brown block">
                            {app.name}
                          </span>
                          <span className="text-[10px] text-brand-brown/60">
                            Fast UPI 1-Click Verification
                          </span>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === app.id}
                        onChange={() => setPaymentMethod(app.id)}
                        className="text-brand-pink focus:ring-brand-pink"
                      />
                    </label>
                  ))}

                  {/* Card / Netbanking option */}
                  <label
                    onClick={() => setPaymentMethod('Card / NetBanking')}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Card / NetBanking'
                        ? 'border-brand-pink bg-brand-pink/10 shadow-xs ring-1 ring-brand-pink'
                        : 'border-brand-sand hover:bg-brand-cream/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-brand-brown" />
                      <div>
                        <span className="text-xs font-bold text-brand-brown block">
                          Debit / Credit Card / NetBanking
                        </span>
                        <span className="text-[10px] text-brand-brown/60">
                          Visa, MasterCard, RuPay
                        </span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payMethod"
                      checked={paymentMethod === 'Card / NetBanking'}
                      onChange={() => setPaymentMethod('Card / NetBanking')}
                      className="text-brand-pink focus:ring-brand-pink"
                    />
                  </label>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-brown/60 font-medium py-1">
                <Lock className="w-3.5 h-3.5 text-brand-teal" />
                <span>256-Bit Encrypted Simulated Razorpay Gateway</span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleSimulatePayment}
                className="w-full py-3.5 bg-brand-pink hover:bg-brand-pinkHover active:scale-98 text-white rounded-2xl font-black text-sm shadow-pink flex items-center justify-center gap-2 transition-all"
              >
                <span>Pay & Place Table Order • ₹{cartGrandTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
