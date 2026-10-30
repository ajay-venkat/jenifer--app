import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { INITIAL_MENU_ITEMS } from '../data/menuData';
import { soundFX } from '../utils/audio';

const OrderContext = createContext(null);

const STORAGE_KEY_ORDERS = 'jsb_orders_v1';
const STORAGE_KEY_MENU = 'jsb_menu_v1';
const STORAGE_KEY_ACTIVE_ORDER = 'jsb_active_order_table_';

// Seed demo orders so the Admin dashboard is immediately rich and testable
const DEFAULT_DEMO_ORDERS = [
  {
    id: '#JSB-1041',
    tableNumber: 2,
    customerName: 'Karthik Raja',
    customerPhone: '+91 98421 54321',
    items: [
      { id: 'sweet-1', name: 'Kaju Katli (Pure Cashew)', variant: '500g', price: 520, quantity: 1, total: 520 },
      { id: 'puff-1', name: 'Crispy Egg Puff (Hot)', variant: '2 Pcs', price: 65, quantity: 1, total: 65 },
      { id: 'bev-1', name: 'Kumbakonam Degree Filter Coffee', variant: '1 Cup', price: 35, quantity: 2, total: 70 }
    ],
    specialNotes: 'Extra hot coffee please. Pack the Kaju Katli in a gift box.',
    subtotal: 655,
    gst: 32.75,
    grandTotal: 688,
    paymentStatus: 'PAID',
    paymentMethod: 'UPI - Google Pay',
    utrNumber: 'UPI/948210389211',
    status: 'PREPARING',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString()
  },
  {
    id: '#JSB-1040',
    tableNumber: 6,
    customerName: 'Meenakshi Sundaram',
    customerPhone: '+91 94432 11980',
    items: [
      { id: 'sweet-2', name: 'Pure Ghee Mysore Pak', variant: '250g', price: 210, quantity: 2, total: 420 },
      { id: 'cake-1', name: 'Black Forest Pastry', variant: '1 Pc', price: 75, quantity: 2, total: 150 },
      { id: 'bev-2', name: 'Chilled Special Rose Milk', variant: '1 Glass', price: 50, quantity: 2, total: 100 }
    ],
    specialNotes: 'Serve pastries chilled.',
    subtotal: 670,
    gst: 33.50,
    grandTotal: 704,
    paymentStatus: 'PAID',
    paymentMethod: 'UPI - PhonePe',
    utrNumber: 'UPI/839104820194',
    status: 'SERVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
  }
];

export function OrderProvider({ children }) {
  // Current Table selection (derived from URL query param ?table=X, default 4)
  const [currentTable, setCurrentTable] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const t = params.get('table');
      return t ? parseInt(t, 10) || 4 : 4;
    }
    return 4;
  });

  // Menu items with stock availability
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MENU);
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Orders array
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
      return saved ? JSON.parse(saved) : DEFAULT_DEMO_ORDERS;
    } catch {
      return DEFAULT_DEMO_ORDERS;
    }
  });

  // Customer Shopping Cart: [{ id, name, variant, price, quantity, image, category }]
  const [cart, setCart] = useState([]);

  // Active customer order for live tracking
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_ACTIVE_ORDER}${currentTable}`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Toast / Live Notification Banner
  const [alertNotification, setAlertNotification] = useState(null);

  // Broadcast channel reference for tab-to-tab sync
  const channelRef = useRef(null);

  // Sync state across browser tabs & windows
  useEffect(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('jenifer_bakery_channel');
      channelRef.current = channel;

      channel.onmessage = (event) => {
        const { type, payload } = event.data;

        if (type === 'NEW_ORDER') {
          setOrders((prev) => [payload, ...prev]);
          soundFX.playOrderChime();
          setAlertNotification({
            title: `🔔 New Order from Table #${payload.tableNumber}!`,
            message: `${payload.items.length} items (₹${payload.grandTotal}) via ${payload.paymentMethod}`,
            orderId: payload.id
          });
          setTimeout(() => setAlertNotification(null), 6000);
        } else if (type === 'STATUS_UPDATE') {
          const { orderId, status } = payload;
          setOrders((prev) =>
            prev.map((o) =>
              o.id === orderId
                ? { ...o, status, updatedAt: new Date().toISOString() }
                : o
            )
          );

          setActiveOrder((prev) => {
            if (prev && prev.id === orderId) {
              const updated = { ...prev, status, updatedAt: new Date().toISOString() };
              localStorage.setItem(`${STORAGE_KEY_ACTIVE_ORDER}${prev.tableNumber}`, JSON.stringify(updated));
              if (status === 'SERVED') {
                soundFX.playSuccessDing();
              }
              return updated;
            }
            return prev;
          });
        } else if (type === 'STOCK_UPDATE') {
          const { itemId, inStock } = payload;
          setMenuItems((prev) =>
            prev.map((it) => (it.id === itemId ? { ...it, inStock } : it))
          );
        }
      };

      return () => {
        channel.close();
      };
    }
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage save note:', e);
    }
  }, [orders]);

  // Save menu state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(menuItems));
    } catch (e) {
      console.warn('Storage save note:', e);
    }
  }, [menuItems]);

  // Save active order for current table
  useEffect(() => {
    try {
      if (activeOrder) {
        localStorage.setItem(`${STORAGE_KEY_ACTIVE_ORDER}${currentTable}`, JSON.stringify(activeOrder));
      } else {
        localStorage.removeItem(`${STORAGE_KEY_ACTIVE_ORDER}${currentTable}`);
      }
    } catch (e) {
      console.warn('Storage save note:', e);
    }
  }, [activeOrder, currentTable]);

  // When currentTable changes, check if there's an existing active order for it
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY_ACTIVE_ORDER}${currentTable}`);
      setActiveOrder(saved ? JSON.parse(saved) : null);
    } catch {
      setActiveOrder(null);
    }
  }, [currentTable]);

  // --- Cart Helpers ---
  const addToCart = (item, selectedVariant) => {
    setCart((prev) => {
      const key = `${item.id}_${selectedVariant.label}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          key,
          id: item.id,
          name: item.name,
          variant: selectedVariant.label,
          price: selectedVariant.price,
          quantity: 1,
          image: item.image,
          fallbackImage: item.fallbackImage,
          category: item.category,
          isVeg: item.isVeg
        }
      ];
    });
  };

  const updateCartQuantity = (key, delta) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.key === key) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((i) => i.key !== key));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const cartGst = Math.round(cartSubtotal * 0.05);
  const cartGrandTotal = cartSubtotal + cartGst;

  // --- Place / Pay Order Flow ---
  const placeOrder = ({ paymentMethod, customerName, customerPhone, specialNotes }) => {
    if (cart.length === 0) return null;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `#JSB-${randomSuffix}`;
    const utr = `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`;

    const newOrder = {
      id: orderId,
      tableNumber: currentTable,
      customerName: customerName.trim() || `Guest at Table #${currentTable}`,
      customerPhone: customerPhone.trim() || 'N/A',
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        variant: i.variant,
        price: i.price,
        quantity: i.quantity,
        total: i.price * i.quantity
      })),
      specialNotes: specialNotes.trim(),
      subtotal: cartSubtotal,
      gst: cartGst,
      grandTotal: cartGrandTotal,
      paymentStatus: 'PAID',
      paymentMethod: paymentMethod || 'UPI - Google Pay',
      utrNumber: utr,
      status: 'NEW_PAID', // Step 1: Paid & Sent (Verification Pending by Counter)
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update state
    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    // Play ding sound
    soundFX.playSuccessDing();

    // Broadcast to Admin
    if (channelRef.current) {
      channelRef.current.postMessage({
        type: 'NEW_ORDER',
        payload: newOrder
      });
    }

    return newOrder;
  };

  // --- Admin Workflow Handlers ---
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
          : o
      )
    );

    setActiveOrder((prev) => {
      if (prev && prev.id === orderId) {
        const updated = { ...prev, status: newStatus, updatedAt: new Date().toISOString() };
        localStorage.setItem(`${STORAGE_KEY_ACTIVE_ORDER}${prev.tableNumber}`, JSON.stringify(updated));
        if (newStatus === 'SERVED') {
          soundFX.playSuccessDing();
        }
        return updated;
      }
      return prev;
    });

    if (channelRef.current) {
      channelRef.current.postMessage({
        type: 'STATUS_UPDATE',
        payload: { orderId, status: newStatus }
      });
    }
  };

  const toggleItemStock = (itemId) => {
    setMenuItems((prev) => {
      const next = prev.map((item) =>
        item.id === itemId ? { ...item, inStock: !item.inStock } : item
      );
      const target = next.find((i) => i.id === itemId);

      if (channelRef.current && target) {
        channelRef.current.postMessage({
          type: 'STOCK_UPDATE',
          payload: { itemId, inStock: target.inStock }
        });
      }
      return next;
    });
  };

  const clearActiveOrder = () => {
    setActiveOrder(null);
    localStorage.removeItem(`${STORAGE_KEY_ACTIVE_ORDER}${currentTable}`);
  };

  return (
    <OrderContext.Provider
      value={{
        currentTable,
        setCurrentTable,
        menuItems,
        toggleItemStock,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotalItems,
        cartSubtotal,
        cartGst,
        cartGrandTotal,
        placeOrder,
        orders,
        activeOrder,
        setActiveOrder,
        clearActiveOrder,
        updateOrderStatus,
        alertNotification,
        setAlertNotification
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
