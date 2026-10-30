import React, { useState, useEffect } from 'react';
import ThermalReceipt, { RECEIPT_COLORS } from '../common/ThermalReceipt';
import { Loader2, CheckCircle2, Printer, X, Maximize2, RotateCcw } from 'lucide-react';
import { soundFX } from '../../utils/audio';

export default function ReceiptPrinterModal({ order, isOpen, onClose }) {
  const [stage, setStage] = useState('idle'); // 'idle' | 'printing' | 'complete'
  const [showFullBill, setShowFullBill] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStage('printing');
      soundFX.playOrderChime();
      const t = setTimeout(() => {
        setStage('complete');
      }, 1900);
      return () => clearTimeout(t);
    } else {
      setStage('idle');
      setShowFullBill(false);
    }
  }, [isOpen, order?.id]);

  if (!isOpen || !order) return null;

  const handleRePrint = () => {
    setStage('printing');
    soundFX.playOrderChime();
    setTimeout(() => {
      setStage('complete');
    }, 1900);
  };

  const handlePhysicalPrint = () => {
    window.print();
  };

  const isOut = stage === 'printing' || stage === 'complete';
  const isPrinting = stage === 'printing';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-scale-in">
      {/* Printer Modal Container */}
      <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border border-brand-sand/30 flex flex-col items-center">
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between px-5 py-3 bg-[#1C1410] border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse"></span>
            <span className="text-xs font-black tracking-wide font-logo text-white">
              KITCHEN PRINTER (KOT)
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center text-xs font-bold transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printer Hardware Enclosure */}
        <div className="w-full p-4 pb-6" style={{ backgroundColor: RECEIPT_COLORS.ink }}>
          {/* Status Pill & Header */}
          <div className="flex items-center justify-between px-2 pt-1 pb-3">
            <div className="flex items-center gap-2">
              {stage === 'complete' ? (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              ) : stage === 'idle' ? (
                <span className="w-2 h-2 rounded-full bg-gray-500" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              )}
              <span className="text-xs font-bold text-gray-200">
                {stage === 'printing'
                  ? 'Printing Kitchen Slip...'
                  : stage === 'complete'
                  ? 'KOT Printed & Verified'
                  : 'Ready'}
              </span>
            </div>

            <span className="text-[10px] text-brand-teal font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/10">
              Table #{order.tableNumber}
            </span>
          </div>

          {/* Paper Feed Window with Mechanical Ejection Animation */}
          <div
            className="relative rounded-2xl shadow-inner border border-black/40"
            style={{
              height: 380,
              backgroundColor: '#120C09',
              overflowY: stage === 'complete' ? 'auto' : 'hidden',
              overflowX: 'hidden',
            }}
          >
            <div
              className="absolute left-2.5 right-2.5 top-0"
              style={{
                transform: isOut ? 'translateY(0%)' : 'translateY(-100%)',
                transition: isPrinting
                  ? 'transform 1.8s cubic-bezier(0.65,0,0.35,1)'
                  : 'transform 0.35s ease-out',
              }}
            >
              <ThermalReceipt order={order} isKOT={true} />
            </div>
          </div>

          {stage === 'complete' && (
            <p className="text-center text-[10px] mt-2 font-medium text-gray-400 animate-pulse">
              scroll paper to review full ticket ↕
            </p>
          )}

          {/* Physical Black Printer Slit */}
          <div
            className="mx-6 mt-3 rounded-full shadow-inner"
            style={{ height: 6, backgroundColor: '#000000' }}
          />

          {/* Action Buttons below printer */}
          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={handleRePrint}
              disabled={isPrinting}
              className="py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Feed Again</span>
            </button>

            <button
              onClick={handlePhysicalPrint}
              className="py-2.5 px-3 rounded-xl text-xs font-extrabold bg-brand-pink hover:bg-brand-pinkHover active:scale-95 text-white shadow-pink flex items-center justify-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>
          </div>

          <button
            onClick={() => setShowFullBill(true)}
            className="w-full mt-2 py-1.5 text-center text-xs font-bold text-brand-teal hover:underline flex items-center justify-center gap-1"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Full-Screen Flat View</span>
          </button>
        </div>
      </div>

      {/* Full Screen Receipt Modal View */}
      {showFullBill && (
        <div
          className="fixed inset-0 z-60 flex items-start justify-center overflow-y-auto p-4 bg-black/85 backdrop-blur-md animate-scale-in"
          onClick={() => setShowFullBill(false)}
        >
          <div
            className="relative w-full max-w-sm my-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFullBill(false)}
              className="absolute -top-3 -right-3 z-10 rounded-full p-2 bg-[#211712] text-white shadow-xl hover:scale-105 transition-all border border-white/20"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <ThermalReceipt order={order} isKOT={true} />
            </div>
            <div className="mt-3 text-center">
              <button
                onClick={handlePhysicalPrint}
                className="px-6 py-2.5 bg-brand-pink text-white rounded-xl font-bold text-xs shadow-pink inline-flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print This Ticket</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
