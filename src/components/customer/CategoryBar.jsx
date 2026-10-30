import React from 'react';
import { Search, X, Sparkles, Filter } from 'lucide-react';

export default function CategoryBar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  vegOnly,
  onToggleVegOnly
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm pt-3 pb-2 px-4 border-b border-brand-sand/50 sticky top-[61px] z-20">
      {/* Search Input & Veg Filter */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-brand-brown/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search sweets, puffs, pastries, coffee..."
            className="w-full pl-9 pr-8 py-2 bg-brand-cream/80 border border-brand-sand/80 rounded-xl text-xs text-brand-brown placeholder-brand-brown/40 focus:outline-none focus:ring-2 focus:ring-brand-pink/30 focus:border-brand-pink transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-brown"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Veg Only Toggle Switch */}
        <button
          onClick={onToggleVegOnly}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
            vegOnly
              ? 'bg-green-50 border-green-500 text-green-700 shadow-sm'
              : 'bg-white border-brand-sand text-brand-brown/70 hover:bg-brand-cream'
          }`}
          title="Filter Vegetarian Only"
        >
          <span className="w-2.5 h-2.5 rounded-full border border-green-600 flex items-center justify-center p-[1px]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
          </span>
          <span className="hidden sm:inline">Veg</span>
        </button>
      </div>

      {/* Horizontal Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-brand-pink text-white shadow-pink font-bold'
                  : 'bg-brand-cream hover:bg-brand-creamDark text-brand-brown/80 border border-brand-sand/70'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
