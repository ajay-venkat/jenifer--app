import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Printer, Download, QrCode, Sparkles, Utensils, CheckCircle } from 'lucide-react';

export default function TableQRGenerator() {
  const [selectedTable, setSelectedTable] = useState(4);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [customBaseUrl, setCustomBaseUrl] = useState(() => {
    return typeof window !== 'undefined' ? window.location.origin : 'https://jenifersweetsandbakery.com';
  });

  const targetUrl = `${customBaseUrl}/?table=${selectedTable}`;

  useEffect(() => {
    QRCode.toDataURL(targetUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#54210E', // Dark Chocolate Brown
        light: '#FFFFFF'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [selectedTable, customBaseUrl]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar (hidden during print) */}
      <div className="no-print bg-white rounded-3xl p-5 border border-brand-sand shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-brand-brown">
              Table QR Code & Tent Card Generator
            </h2>
            <p className="text-xs text-brand-brown/70">
              Generate branded tent cards for dining tables. Customers scan with their phone camera to order & pay instantly.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-brand-pink hover:bg-brand-pinkHover active:scale-95 text-white font-black text-xs rounded-2xl shadow-pink flex items-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Table Tent Card</span>
          </button>
        </div>

        {/* Table Selector Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-brand-brown uppercase tracking-wider block">
            Select Dining Table Number
          </label>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {Array.from({ length: 15 }, (_, i) => i + 1).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTable(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                  selectedTable === t
                    ? 'bg-brand-brown text-white shadow-sm ring-2 ring-brand-teal'
                    : 'bg-brand-cream border border-brand-sand text-brand-brown hover:bg-brand-sand'
                }`}
              >
                Table #{t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Printable Branded Tent Card */}
      <div className="flex justify-center p-4">
        <div className="w-[360px] bg-white rounded-3xl border-4 border-brand-pink p-6 text-center shadow-xl relative overflow-hidden space-y-4 print:border-2 print:shadow-none print:w-full print:max-w-md">
          {/* Top Decorative Arc */}
          <div className="absolute -top-12 -left-12 -right-12 h-24 bg-brand-pink/10 rounded-b-[100%] pointer-events-none"></div>

          {/* Bakery Logo & Header */}
          <div className="relative pt-2 space-y-1">
            <img
              src="/jenifer-logo.png"
              alt="Jenifer Sweets & Bakery"
              className="w-20 h-20 mx-auto rounded-full object-contain border-2 border-brand-pink/40 shadow-sm"
            />
            <h1 className="text-xl font-black text-brand-brown tracking-tight font-logo pt-1">
              JENIFER SWEETS & BAKERY
            </h1>
            <p className="text-[11px] font-bold text-brand-pink tracking-widest uppercase">
              Taste the Tradition • Enjoy the Freshness
            </p>
          </div>

          {/* Table Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-teal text-brand-brown rounded-full font-black text-sm shadow-teal">
            <Utensils className="w-4 h-4 text-brand-brown" />
            <span>TABLE #{selectedTable}</span>
          </div>

          {/* QR Code Container with Frame */}
          <div className="p-4 bg-brand-cream rounded-2xl border-2 border-dashed border-brand-pink/40 inline-block shadow-inner">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`QR code for Table ${selectedTable}`}
                className="w-56 h-56 mx-auto rounded-xl"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-xs text-brand-brown/40">
                Generating QR Code...
              </div>
            )}
          </div>

          {/* Scanning Instructions */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-brand-brown">
              <QrCode className="w-4 h-4 text-brand-pink" />
              <span>SCAN WITH PHONE CAMERA</span>
            </div>
            <p className="text-[11px] text-brand-brown/70 max-w-xs mx-auto leading-relaxed">
              Order hot puffs, sweets & pastries right from your seat. Instant UPI payment via GPay, PhonePe, or Paytm!
            </p>
          </div>

          {/* Footer Heritage Banner */}
          <div className="pt-3 border-t border-brand-sand/70 flex items-center justify-between text-[10px] text-brand-brown/60 font-semibold px-2">
            <span>Mayiladuthurai</span>
            <span className="text-brand-pink font-bold">37 Years of Sweet Excellence</span>
            <span>Table #{selectedTable}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
