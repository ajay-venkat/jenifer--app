import React, { useMemo } from 'react';

export const RECEIPT_COLORS = {
  ink: "#211712",
  inkSoft: "#3A2B22",
  paper: "#FBF3E4",
  gold: "#C08A2E",
  maroon: "#54210E", // Jenifer Dark Chocolate Brown
  pink: "#F26389",   // Jenifer Strawberry Pink
  teal: "#6FC3C0",   // Jenifer Mint Teal
  green: "#3F7D52",
  cream: "#F6EFE1",
};

/** Deterministic, stylized QR-style code generated from string */
function generateModules(seedStr, size) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  const grid = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      row.push(((seed >>> 16) & 1) === 0);
    }
    grid.push(row);
  }
  return grid;
}

function isFinderZone(x, y, size) {
  const corners = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ];
  return corners.some(([cx, cy]) => x >= cx && x < cx + 7 && y >= cy && y < cy + 7);
}

function finderModule(x, y, cx, cy) {
  const lx = x - cx;
  const ly = y - cy;
  if (lx === 0 || lx === 6 || ly === 0 || ly === 6) return true;
  if (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4) return true;
  return false;
}

export function ReceiptQRCode({ value = "JSB-1042", size = 96 }) {
  const modulesPerSide = 21;
  const cell = size / modulesPerSide;
  const grid = useMemo(() => generateModules(value, modulesPerSide), [value]);
  const corners = [
    [0, 0],
    [modulesPerSide - 7, 0],
    [0, modulesPerSide - 7],
  ];

  const rects = [];
  for (let y = 0; y < modulesPerSide; y++) {
    for (let x = 0; x < modulesPerSide; x++) {
      let on = grid[y][x];
      if (isFinderZone(x, y, modulesPerSide)) {
        const [cx, cy] = corners.find(
          ([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7,
        );
        on = finderModule(x, y, cx, cy);
      }
      if (on) {
        rects.push(
          <rect
            key={`${x}-${y}`}
            x={x * cell}
            y={y * cell}
            width={cell}
            height={cell}
          />,
        );
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ backgroundColor: "#fff" }}
      className="p-1 border border-brand-sand/80 rounded-lg shadow-2xs"
    >
      <g fill={RECEIPT_COLORS.ink}>{rects}</g>
    </svg>
  );
}

export default function ThermalReceipt({ order, isKOT = true }) {
  if (!order) return null;

  const now = order.createdAt ? new Date(order.createdAt) : new Date();

  return (
    <div
      className="mx-auto px-5 pt-6 pb-9 font-mono text-xs leading-relaxed select-text shadow-xl"
      style={{
        backgroundColor: RECEIPT_COLORS.paper,
        color: RECEIPT_COLORS.ink,
        clipPath:
          "polygon(0 0, 100% 0, 100% 100%, 92% 96%, 84% 100%, 76% 96%, 68% 100%, 60% 96%, 52% 100%, 44% 96%, 36% 100%, 28% 96%, 20% 100%, 12% 96%, 4% 100%, 0 96%)",
      }}
    >
      {/* Official Header */}
      <div className="text-center space-y-1 mb-2">
        <p
          className="text-[10px] tracking-[0.2em] uppercase font-bold"
          style={{ color: RECEIPT_COLORS.gold }}
        >
          {isKOT ? "KITCHEN ORDER TICKET (KOT)" : "CUSTOMER TAX INVOICE"}
        </p>
        <p
          className="font-serif font-black tracking-wide text-sm"
          style={{ color: RECEIPT_COLORS.maroon }}
        >
          JENIFER SWEETS &amp; BAKERY
        </p>
        <p className="text-[11px]" style={{ color: RECEIPT_COLORS.inkSoft }}>
          Kannara Street, Mayiladuthurai · 6384001465
        </p>
      </div>

      <div
        className="border-t border-dashed my-2"
        style={{ borderColor: `${RECEIPT_COLORS.ink}44` }}
      />

      {/* Large Table & Order ID Highlight */}
      <div className="flex items-center justify-between font-bold text-xs py-1">
        <span
          className="px-2 py-0.5 rounded text-white font-black text-xs"
          style={{ backgroundColor: RECEIPT_COLORS.maroon }}
        >
          TABLE #{order.tableNumber}
        </span>
        <span className="font-extrabold text-sm" style={{ color: RECEIPT_COLORS.maroon }}>
          {order.id}
        </span>
      </div>

      <div className="text-[11px] space-y-0.5 mt-1" style={{ color: RECEIPT_COLORS.inkSoft }}>
        <p>
          Date: {now.toLocaleDateString()} ·{" "}
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p>Guest: {order.customerName}</p>
        {order.customerPhone && order.customerPhone !== "N/A" && (
          <p>Phone: {order.customerPhone}</p>
        )}
        <p>
          Status:{" "}
          <span className="font-bold text-green-800">
            {order.paymentStatus} ({order.paymentMethod})
          </span>
        </p>
        {order.utrNumber && <p className="text-[10px]">Ref: {order.utrNumber}</p>}
      </div>

      <div
        className="border-t border-dashed my-2.5"
        style={{ borderColor: `${RECEIPT_COLORS.ink}44` }}
      />

      {/* Itemized Table */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-bold pb-1 border-b border-dashed border-black/20">
          <span>ITEM / PORTION</span>
          <span>AMOUNT</span>
        </div>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-xs py-0.5">
            <span className="max-w-[72%] leading-tight font-medium">
              <span className="font-bold">{item.quantity}x</span> {item.name}{" "}
              <span className="text-[10px] opacity-80">({item.variant})</span>
            </span>
            <span className="font-bold">₹{item.total || item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div
        className="border-t border-dashed my-2.5"
        style={{ borderColor: `${RECEIPT_COLORS.ink}44` }}
      />

      {/* Special Kitchen Notes (Crucial for KOT!) */}
      {order.specialNotes && (
        <div
          className="p-2 my-2 rounded text-[11px] font-medium border"
          style={{
            backgroundColor: "#F3E8D0",
            borderColor: `${RECEIPT_COLORS.gold}66`,
            color: RECEIPT_COLORS.ink,
          }}
        >
          <span className="font-bold block uppercase text-[10px] tracking-wider text-amber-900">
            ★ KITCHEN NOTE:
          </span>
          <span>"{order.specialNotes}"</span>
        </div>
      )}

      {/* Totals */}
      <div className="space-y-1 text-xs">
        <div className="flex justify-between text-[11px]" style={{ color: RECEIPT_COLORS.inkSoft }}>
          <span>Subtotal</span>
          <span>₹{order.subtotal}</span>
        </div>
        <div className="flex justify-between text-[11px]" style={{ color: RECEIPT_COLORS.inkSoft }}>
          <span>GST (5%)</span>
          <span>₹{order.gst}</span>
        </div>
        <div
          className="flex justify-between font-black text-sm pt-1.5 border-t border-dashed"
          style={{ borderColor: `${RECEIPT_COLORS.ink}44`, color: RECEIPT_COLORS.maroon }}
        >
          <span>TOTAL AMOUNT</span>
          <span>₹{order.grandTotal}</span>
        </div>
      </div>

      <div
        className="border-t border-dashed my-3"
        style={{ borderColor: `${RECEIPT_COLORS.ink}44` }}
      />

      {/* QR Code Section */}
      <div className="flex flex-col items-center mt-3 mb-1">
        <ReceiptQRCode value={order.id} size={84} />
        <p className="mt-2 text-[10px] text-center" style={{ color: RECEIPT_COLORS.inkSoft }}>
          Scan to verify order · Table #{order.tableNumber}
        </p>
      </div>

      <div className="text-center mt-3 space-y-0.5" style={{ color: RECEIPT_COLORS.inkSoft }}>
        <p className="font-serif italic text-xs font-semibold" style={{ color: RECEIPT_COLORS.gold }}>
          "Happiness starts here"
        </p>
        <p className="text-[10px]">37 Years of Sweet Excellence · Mayiladuthurai</p>
      </div>
    </div>
  );
}
