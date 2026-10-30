import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { Search, CheckCircle2, XCircle, ToggleLeft, ToggleRight, Sparkles } from 'lucide-react';

export default function MenuStockManager() {
  const { menuItems, toggleItemStock } = useOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Traditional Sweets', 'Fresh Cakes & Pastries', 'Hot Puffs & Savories', 'Cookies & Biscuits', 'Beverages'];

  const filteredItems = menuItems.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const inStockCount = menuItems.filter((i) => i.inStock).length;
  const outOfStockCount = menuItems.length - inStockCount;

  return (
    <div className="space-y-6">
      {/* Header and Quick Stats */}
      <div className="bg-white rounded-3xl p-5 border border-brand-sand shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-extrabold text-brand-brown">
            Menu Item Availability & Stock Controller
          </h2>
          <p className="text-xs text-brand-brown/70">
            Toggle items between In Stock and Sold Out in real time. Customers will immediately see updated availability on their phones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-xs font-bold text-green-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>{inStockCount} In Stock</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-1.5">
            <XCircle className="w-4 h-4 text-red-600" />
            <span>{outOfStockCount} Sold Out</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-4 border border-brand-sand shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-brand-brown/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bakery item to toggle stock..."
            className="w-full pl-9 pr-4 py-2 bg-brand-cream border border-brand-sand rounded-xl text-xs text-brand-brown placeholder-brand-brown/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/30"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-brand-pink text-white font-bold shadow-pink'
                  : 'bg-brand-cream hover:bg-brand-sand text-brand-brown'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items List Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
              item.inStock
                ? 'bg-white border-brand-sand shadow-card'
                : 'bg-red-50/40 border-red-200 shadow-none'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={item.image}
                alt={item.name}
                className={`w-12 h-12 rounded-xl object-cover shrink-0 ${
                  !item.inStock ? 'grayscale opacity-60' : ''
                }`}
              />
              <div className="min-w-0">
                <span className="text-[10px] text-brand-brown/60 uppercase font-semibold block truncate">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-brand-brown truncate">
                  {item.name}
                </h4>
                <span className="text-[11px] font-extrabold text-brand-pink">
                  ₹{item.variants?.[0]?.price}
                </span>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => toggleItemStock(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95 shrink-0 ${
                item.inStock
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-red-600 text-white shadow-sm hover:bg-red-700'
              }`}
            >
              {item.inStock ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>In Stock</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-white" />
                  <span>Sold Out</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
