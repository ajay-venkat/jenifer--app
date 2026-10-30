export const MENU_CATEGORIES = [
  'All',
  'Traditional Sweets',
  'Fresh Cakes & Pastries',
  'Hot Puffs & Savories',
  'Cookies & Biscuits',
  'Beverages'
];

export const INITIAL_MENU_ITEMS = [
  // --- TRADITIONAL SWEETS ---
  {
    id: 'sweet-1',
    name: 'Kaju Katli (Pure Cashew)',
    category: 'Traditional Sweets',
    description: 'Melt-in-mouth diamond fudge crafted with 100% premium Goan cashews and edible silver leaf.',
    isVeg: true,
    isBestseller: true,
    badge: 'Heritage Classic',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Sweets-1.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 270, isDefault: true },
      { label: '500g', price: 520 },
      { label: '1 Kg', price: 990 }
    ]
  },
  {
    id: 'sweet-2',
    name: 'Pure Ghee Mysore Pak',
    category: 'Traditional Sweets',
    description: 'Rich, crumbly, and dripping with pure country cow ghee. Made according to our 37-year-old family recipe.',
    isVeg: true,
    isBestseller: true,
    badge: '37-Year Signature',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Sweets-2a.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 210, isDefault: true },
      { label: '500g', price: 400 },
      { label: '1 Kg', price: 780 }
    ]
  },
  {
    id: 'sweet-3',
    name: 'Tirunelveli Wheat Halwa',
    category: 'Traditional Sweets',
    description: 'Dark, glossy fermented wheat halwa simmered slowly in iron kadai with roasted cashews and pure ghee.',
    isVeg: true,
    isBestseller: false,
    badge: 'Authentic South',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Sweets-3.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 190, isDefault: true },
      { label: '500g', price: 360 },
      { label: '1 Kg', price: 700 }
    ]
  },
  {
    id: 'sweet-4',
    name: 'Shahi Motichoor Laddu',
    category: 'Traditional Sweets',
    description: 'Tiny saffron-infused gram flour pearls bound with pure ghee, crushed green cardamom, and melon seeds.',
    isVeg: true,
    isBestseller: true,
    badge: 'Festive Delight',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Sweets-4.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 160, isDefault: true },
      { label: '500g', price: 310 },
      { label: '1 Kg', price: 600 }
    ]
  },
  {
    id: 'sweet-5',
    name: 'Special Malai Peda',
    category: 'Traditional Sweets',
    description: 'Velvety condensed milk peda delicately spiced with green cardamom and garnished with Iranian pistachios.',
    isVeg: true,
    isBestseller: false,
    badge: 'Creamy Rich',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Sweets-5a.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 180, isDefault: true },
      { label: '500g', price: 350 },
      { label: '1 Kg', price: 680 }
    ]
  },

  // --- FRESH CAKES & PASTRIES ---
  {
    id: 'cake-1',
    name: 'Black Forest Pastry',
    category: 'Fresh Cakes & Pastries',
    description: 'Layers of moist chocolate sponge, whipped vanilla cream, tart red cherry compote, and rich chocolate shavings.',
    isVeg: true,
    isBestseller: true,
    badge: 'Top Seller',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Bakes-1.jpg',
    inStock: true,
    variants: [
      { label: '1 Pc', price: 75, isDefault: true },
      { label: '2 Pcs', price: 140 }
    ]
  },
  {
    id: 'cake-2',
    name: 'Red Velvet Cupcake',
    category: 'Fresh Cakes & Pastries',
    description: 'Fluffy ruby cocoa sponge crowned with velvety Philadelphia cream cheese frosting and red velvet crumbs.',
    isVeg: true,
    isBestseller: true,
    badge: 'Freshly Frosted',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Bakes-2.jpg',
    inStock: true,
    variants: [
      { label: '1 Pc', price: 65, isDefault: true },
      { label: '2 Pcs', price: 120 }
    ]
  },
  {
    id: 'cake-3',
    name: 'Belgian Dutch Truffle Slice',
    category: 'Fresh Cakes & Pastries',
    description: 'Intense 54% dark Belgian chocolate mousse ganache folded between tender cocoa sponge layers.',
    isVeg: true,
    isBestseller: false,
    badge: 'Chocoholic Choice',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Bakes-3.jpg',
    inStock: true,
    variants: [
      { label: '1 Pc', price: 85, isDefault: true },
      { label: '2 Pcs', price: 160 }
    ]
  },
  {
    id: 'cake-4',
    name: 'Pineapple Gateau Pastry',
    category: 'Fresh Cakes & Pastries',
    description: 'Light vanilla chiffon layered with crushed tropical pineapples and silky whipped cream.',
    isVeg: true,
    isBestseller: false,
    badge: 'Light & Fruity',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Bakes-4.jpg',
    inStock: true,
    variants: [
      { label: '1 Pc', price: 65, isDefault: true },
      { label: '2 Pcs', price: 120 }
    ]
  },

  // --- HOT PUFFS & SAVORIES ---
  {
    id: 'puff-1',
    name: 'Crispy Egg Puff (Hot)',
    category: 'Hot Puffs & Savories',
    description: 'Golden laminated puff pastry filled with roasted hard-boiled egg halves and caramelized onion pepper masala.',
    isVeg: false,
    isBestseller: true,
    badge: 'Hot from Oven',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Snacks-1.jpg',
    inStock: true,
    variants: [
      { label: '1 Pc', price: 35, isDefault: true },
      { label: '2 Pcs', price: 65 }
    ]
  },
  {
    id: 'puff-2',
    name: 'Chettinad Chicken Puff',
    category: 'Hot Puffs & Savories',
    description: 'Flaky crust stuffed with spicy shredded country chicken infused with fennel, black pepper, and curry leaves.',
    isVeg: false,
    isBestseller: true,
    badge: 'Spicy Signature',
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Snacks-2.jpg',
    inStock: true,
    variants: [
      { label: '1 Pc', price: 45, isDefault: true },
      { label: '2 Pcs', price: 85 }
    ]
  },
  {
    id: 'puff-3',
    name: 'Masala Vegetable Puff',
    category: 'Hot Puffs & Savories',
    description: 'Buttery crisp puff layered with mildly spiced diced potatoes, green peas, carrots, and aromatic cumin.',
    isVeg: true,
    isBestseller: false,
    badge: '100% Pure Veg',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Snacks-3.jpg',
    inStock: true,
    variants: [
      { label: '1 Pc', price: 28, isDefault: true },
      { label: '2 Pcs', price: 52 }
    ]
  },
  {
    id: 'puff-4',
    name: 'Madras Kai Murukku',
    category: 'Hot Puffs & Savories',
    description: 'Handcrafted twisted rice snack prepared with roasted urad dal, cumin, asafoetida, and crunchy sesame seeds.',
    isVeg: true,
    isBestseller: true,
    badge: 'Extra Crunchy',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Snacks-4.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 110, isDefault: true },
      { label: '500g', price: 210 }
    ]
  },
  {
    id: 'puff-5',
    name: 'Jenifer Special Royal Mixture',
    category: 'Hot Puffs & Savories',
    description: 'Crunchy blend of fried cashews, roasted peanuts, sev, boondi, ribbon pakoda, and crisped curry leaves.',
    isVeg: true,
    isBestseller: true,
    badge: 'Tea-Time Staple',
    image: 'https://images.unsplash.com/photo-1606471191009-63994c53433b?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Snacks-5.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 120, isDefault: true },
      { label: '500g', price: 230 }
    ]
  },

  // --- COOKIES & BISCUITS ---
  {
    id: 'bisc-1',
    name: 'Jenifer Heritage Butter Biscuits',
    category: 'Cookies & Biscuits',
    description: 'The golden biscuits Mayiladuthurai grew up with! Crumbly, sweet-and-savory tea biscuits baked fresh every sunrise.',
    isVeg: true,
    isBestseller: true,
    badge: 'Since 1987',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Bakes-5a.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 130, isDefault: true },
      { label: '500g', price: 250 }
    ]
  },
  {
    id: 'bisc-2',
    name: 'South Indian Coconut Macaroons',
    category: 'Cookies & Biscuits',
    description: 'Classic cone-shaped airy, chewy, golden macaroons loaded with freshly grated coconut and cashews.',
    isVeg: true,
    isBestseller: false,
    badge: 'Chewy & Crispy',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Bakes-6.jpg',
    inStock: true,
    variants: [
      { label: '200g', price: 140, isDefault: true }
    ]
  },
  {
    id: 'bisc-3',
    name: 'Cashew Butter Choco-Chip Cookies',
    category: 'Cookies & Biscuits',
    description: 'Crisp buttery cookies studded with dark chocolate chips and toasted cashew nut chunks.',
    isVeg: true,
    isBestseller: false,
    badge: 'Kids Favourite',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/11/Bakes-2.jpg',
    inStock: true,
    variants: [
      { label: '250g', price: 150, isDefault: true }
    ]
  },

  // --- BEVERAGES ---
  {
    id: 'bev-1',
    name: 'Kumbakonam Degree Filter Coffee',
    category: 'Beverages',
    description: 'Authentic South Indian chicory-rich decoction brewed with fresh foaming cow milk in traditional brass davarah.',
    isVeg: true,
    isBestseller: true,
    badge: 'Brewed Fresh',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/07/Untitled-1.jpg',
    inStock: true,
    variants: [
      { label: '1 Cup', price: 35, isDefault: true }
    ]
  },
  {
    id: 'bev-2',
    name: 'Chilled Special Rose Milk',
    category: 'Beverages',
    description: 'Jenifer Bakery legendary nostalgic cooler made with natural Damascus rose petal syrup and chilled creamy milk.',
    isVeg: true,
    isBestseller: true,
    badge: 'Cooler Classic',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/07/Untitled-1.jpg',
    inStock: true,
    variants: [
      { label: '1 Glass', price: 50, isDefault: true }
    ]
  },
  {
    id: 'bev-3',
    name: 'Royal Saffron Badam Milk',
    category: 'Beverages',
    description: 'Simmered rich whole milk with crushed California almonds, Kashmiri saffron strands, and green cardamom.',
    isVeg: true,
    isBestseller: false,
    badge: 'Served Hot/Cold',
    image: 'https://images.unsplash.com/photo-1584278860047-22db9ff82bed?auto=format&fit=crop&w=600&q=80',
    fallbackImage: 'https://jenifersweetsandbakery.com/wp-content/uploads/2024/07/Untitled-1.jpg',
    inStock: true,
    variants: [
      { label: 'Hot Cup', price: 60, isDefault: true },
      { label: 'Chilled Glass', price: 65 }
    ]
  }
];
