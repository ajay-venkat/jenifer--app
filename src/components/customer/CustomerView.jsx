import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { MENU_CATEGORIES } from '../../data/menuData';
import CustomerHeader from './CustomerHeader';
import CategoryBar from './CategoryBar';
import MenuItemCard from './MenuItemCard';
import FloatingCartBar from './FloatingCartBar';
import CartCheckoutDrawer from './CartCheckoutDrawer';
import PaymentModal from './PaymentModal';
import LiveOrderTracker from './LiveOrderTracker';
import { Sparkles, HeartHandshake, PhoneCall, MapPin } from 'lucide-react';

export default function CustomerView() {
  const {
    menuItems,
    cart,
    addToCart,
    updateCartQuantity,
    cartTotalItems,
    cartGrandTotal,
    activeOrder
  } = useOrders();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState({});
  const [showLiveTracker, setShowLiveTracker] = useState(false);

  // Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVeg = !vegOnly || item.isVeg;

    return matchesCategory && matchesSearch && matchesVeg;
  });

  const handleProceedToPayment = (data) => {
    setCheckoutData(data);
    setIsDrawerOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (newOrder) => {
    setIsPaymentModalOpen(false);
    setShowLiveTracker(true);
  };

  // If customer is viewing the live tracker
  if (showLiveTracker && activeOrder) {
    return (
      <LiveOrderTracker
        order={activeOrder}
        onBackToMenu={() => setShowLiveTracker(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col pb-24">
      {/* Sticky Header */}
      <CustomerHeader onViewActiveOrder={() => setShowLiveTracker(true)} />

      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-pink/15 via-brand-teal/10 to-brand-cream border-b border-brand-sand/60 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-pink block">
              Direct Table Ordering
            </span>
            <h2 className="text-sm font-extrabold text-brand-brown">
              Freshly Baked & Handcrafted Today
            </h2>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-brand-sand text-[10px] font-bold text-brand-brown flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3 text-brand-pink" />
            <span>Pure Cow Ghee</span>
          </div>
        </div>
      </div>

      {/* Category & Search Filter Bar */}
      <CategoryBar
        categories={MENU_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        vegOnly={vegOnly}
        onToggleVegOnly={() => setVegOnly(!vegOnly)}
      />

      {/* Menu Cards Grid */}
      <main className="max-w-md mx-auto w-full px-4 pt-4 flex-1">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <p className="text-sm font-bold text-brand-brown">No bakery items found</p>
            <p className="text-xs text-brand-brown/60">
              Try searching with another keyword or resetting filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredItems.map((item) => {
              // Find matching cart item for first variant or default
              const cartItem = cart.find((c) => c.id === item.id);
              return (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  cartItem={cartItem}
                  onAddToCart={addToCart}
                  onUpdateQuantity={updateCartQuantity}
                />
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar */}
      <FloatingCartBar
        totalItems={cartTotalItems}
        grandTotal={cartGrandTotal}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Slide-Up Checkout Drawer */}
      <CartCheckoutDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* Razorpay / UPI Instant Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        checkoutData={checkoutData}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
