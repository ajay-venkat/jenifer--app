import React, { useState } from 'react';
import { Plus, Minus, Check, Flame, Award } from 'lucide-react';

export default function MenuItemCard({ item, cartItem, onAddToCart, onUpdateQuantity }) {
  // Default variant is either the marked default or first variant
  const [selectedVariant, setSelectedVariant] = useState(
    () => item.variants?.find((v) => v.isDefault) || item.variants?.[0] || { label: 'Standard', price: 100 }
  );

  const [imgError, setImgError] = useState(false);

  // Check if this specific item + variant is in cart
  const cartKey = `${item.id}_${selectedVariant.label}`;
  const currentQty = cartItem?.quantity || 0;

  const handleImageError = () => {
    if (!imgError && item.fallbackImage) {
      setImgError(true);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl p-3.5 border border-brand-sand/60 shadow-card hover:shadow-brand transition-all flex flex-col justify-between relative overflow-hidden ${
        !item.inStock ? 'opacity-65 grayscale-[30%]' : ''
      }`}
    >
      {/* Sold Out Banner */}
      {!item.inStock && (
        <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
          Sold Out Today
        </div>
      )}

      <div>
        {/* Top Badges & Image */}
        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-brand-creamDark mb-3 group">
          <img
            src={imgError ? item.fallbackImage : item.image}
            alt={item.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Veg / Non-Veg Indicator */}
          <div className="absolute top-2 left-2 z-10 bg-white/95 backdrop-blur-sm p-1 rounded-md shadow-sm">
            <span
              className={`w-3.5 h-3.5 border-2 rounded-sm flex items-center justify-center ${
                item.isVeg ? 'border-green-600' : 'border-red-600'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.isVeg ? 'bg-green-600' : 'bg-red-600'
                }`}
              ></span>
            </span>
          </div>

          {/* Special Feature Badge */}
          {item.badge && item.inStock && (
            <div className="absolute bottom-2 left-2 z-10 bg-brand-brown/85 backdrop-blur-sm text-brand-teal text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <Award className="w-2.5 h-2.5" />
              <span>{item.badge}</span>
            </div>
          )}
        </div>

        {/* Item Title & Description */}
        <div className="mb-2">
          <div className="flex items-start justify-between gap-1 mb-1">
            <h3 className="font-bold text-sm text-brand-brown leading-snug line-clamp-1">
              {item.name}
            </h3>
          </div>
          <p className="text-[11px] text-brand-brown/70 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Selectable Variants Pills (Weights / Portions) */}
        {item.variants && item.variants.length > 1 && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {item.variants.map((v) => {
                const isSelected = selectedVariant.label === v.label;
                return (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!item.inStock}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-brand-pink/10 border-brand-pink text-brand-pink font-bold shadow-xs'
                        : 'bg-brand-cream/60 border-brand-sand text-brand-brown/70 hover:bg-brand-cream'
                    }`}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Pricing & Add/Stepper Action */}
      <div className="pt-2 border-t border-brand-sand/40 flex items-center justify-between mt-auto">
        <div>
          <span className="text-[10px] text-brand-brown/60 block font-medium">Price</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-brand-brown font-display">
              ₹{selectedVariant.price}
            </span>
            <span className="text-[10px] text-brand-brown/60">
              /{selectedVariant.label}
            </span>
          </div>
        </div>

        {/* Add Button or Quantity Stepper */}
        {item.inStock ? (
          currentQty === 0 ? (
            <button
              onClick={() => onAddToCart(item, selectedVariant)}
              className="px-4 py-1.5 bg-brand-pink text-white rounded-xl text-xs font-bold shadow-pink hover:bg-brand-pinkHover active:scale-95 transition-all flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center bg-brand-pink/10 rounded-xl border border-brand-pink/30 p-0.5">
              <button
                onClick={() => onUpdateQuantity(cartKey, -1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-brand-pink font-bold shadow-xs hover:bg-brand-pink hover:text-white transition-all active:scale-90"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center font-extrabold text-xs text-brand-pink">
                {currentQty}
              </span>
              <button
                onClick={() => onUpdateQuantity(cartKey, 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-brand-pink text-white font-bold shadow-xs hover:bg-brand-pinkHover transition-all active:scale-90"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        ) : (
          <span className="text-xs font-bold text-gray-400 cursor-not-allowed">
            Unavailable
          </span>
        )}
      </div>
    </div>
  );
}
