export interface Product {
    id: string;
    title: string;
    price: number;
    image: string | null;
    category: string;
    subcategory?: string;
    artist?: string;
    rating: number;
    colors?: string[];
}

export const PRODUCTS: Product[] = [
    // --- FEATURED (Homepage) ---
    {
        id: "kanye-yeezus-shirt",
        title: "KANYE WEST YEEZUS T-SHIRT",
        artist: "KANYE WEST",
        price: 3200,
        image: '/assets/products/kanye-yeezus-shirt.jpg',
        rating: 5,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "kanye-west-hoodie",
        title: "KANYE WEST HOODIE",
        artist: "KANYE WEST",
        price: 5500,
        image: '/assets/products/kanye-west-hoodie.jpg',
        rating: 5,
        category: "hoodies",
        subcategory: "original",
        colors: ["Black", "White", "Navy", "Charcoal"]
    },
    {
        id: "night-met-shirt",
        title: "THE NIGHT WE MET",
        artist: "LORD HURON",
        price: 2800,
        image: '/assets/products/night-met-shirt.jpg',
        rating: 5,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "seedhe-maut-shirt",
        title: "SEEDHE MAUT TSHIRT",
        artist: "SEEDHE MAUT",
        price: 2500,
        image: '/assets/products/seedhe-maut-shirt.jpg',
        rating: 4,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "oversized-tee-tbsm",
        title: "OVERSIZED TEE",
        artist: "TBSM",
        price: 2900,
        image: '/assets/products/oversized-tee-tbsm.jpg',
        rating: 5,
        category: "t-shirts",
        subcategory: "drop-shoulder",
        colors: ["Black", "White", "Olive", "Sand"]
    },
    // --- HOODIES ---
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `hoodie-${i}`,
        title: `Streetwear Hoodie ${i + 1}`,
        price: 4500,
        image: `/assets/products/hoodie-${i}.jpg`,
        category: 'hoodies',
        artist: 'DEEZ ORIGINALS',
        rating: 5,
        colors: ["Black", "White", "Grey", "Navy"]
    })),

    // --- T-SHIRTS ---
    // Regular
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `tshirt-reg-${i}`,
        title: `Regular Fit Graphic Tee ${i + 1}`,
        price: 2500,
        image: `/assets/products/tshirt-reg-${i}.jpg`,
        category: 't-shirts',
        subcategory: 'regular',
        artist: 'TBSM',
        rating: 4,
        colors: ["Black", "White", "Blue", "Red"]
    })),
    // Drop Shoulder
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `tshirt-drop-${i}`,
        title: `Oversized Drop Shoulder Tee ${i + 1}`,
        price: 2900,
        image: `/assets/products/tshirt-drop-${i}.jpg`,
        category: 't-shirts',
        subcategory: 'drop-shoulder',
        artist: 'OVERSIZED',
        rating: 5,
        colors: ["Black", "beige", "White"]
    })),
    // Acid Wash
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `tshirt-acid-${i}`,
        title: `Vintage Acid Wash Tee ${i + 1}`,
        price: 3200,
        image: `/assets/products/tshirt-acid-${i}.jpg`,
        category: 't-shirts',
        subcategory: 'acid-wash',
        artist: 'VINTAGE',
        rating: 5,
        colors: ["Acid Black", "Acid Wash Blue"]
    })),

    // --- JERSEYS ---
    ...Array.from({ length: 8 }).map((_, i) => ({
        id: `jersey-${i}`,
        title: `Pro Moto Jersey ${i + 1}`,
        price: 5500,
        image: `/assets/products/jersey-${i}.jpg`,
        category: 'jerseys',
        artist: 'RACING',
        rating: 5
    })),

    // --- ACCESSORIES / CUSTOMIZED ITEMS ---
    // Mugs
    { id: 'mug-white', title: 'Sublimation Mug (Inner White)', price: 900, category: 'accessories', subcategory: 'mugs', rating: 4, image: '/assets/products/mug-white.jpg' },
    { id: 'mug-colored', title: 'Sublimation Mug (Inner + Handle Colored)', price: 1200, category: 'accessories', subcategory: 'mugs', rating: 5, image: '/assets/products/mug-colored.jpg' },
    { id: 'mug-magic', title: 'Magic Color Changing Mug', price: 1500, category: 'accessories', subcategory: 'mugs', rating: 5, image: '/assets/products/mug-magic.jpg' },

    // Flags
    ...Array.from({ length: 4 }).map((_, i) => ({
        id: `flag-${i}`,
        title: `Custom Tapestry Flag ${i + 1}`,
        price: 1900,
        image: `/assets/products/flag-${i}.jpg`,
        category: 'accessories',
        subcategory: 'flags',
        rating: 5
    })),

    // Tapestries
    ...Array.from({ length: 4 }).map((_, i) => ({
        id: `tapestry-${i}`,
        title: `Wall Tapestry ${i + 1}`,
        price: 2400,
        image: `/assets/products/tapestry.jpg`,
        category: 'accessories',
        subcategory: 'tapestries',
        rating: 5
    })),

    // Wristbands
    ...Array.from({ length: 4 }).map((_, i) => ({
        id: `wristband-${i}`,
        title: `Silicone Wristband ${i + 1}`,
        price: 499,
        image: `/assets/products/wristband-${i}.jpg`,
        category: 'accessories',
        subcategory: 'wristbands',
        rating: 4
    })),

    // Badges
    ...Array.from({ length: 6 }).map((_, i) => ({
        id: `badge-${i}`,
        title: `Button Badge ${i + 1}`,
        price: 299,
        image: `/assets/products/badge-${i}.jpg`,
        category: 'accessories',
        subcategory: 'badges',
        rating: 4
    })),

    // Wallet Cards
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `wallet-card-${i}`,
        title: `Metal Wallet Card ${i + 1}`,
        price: 1400,
        image: `/assets/products/wallet-card-${i}.jpg`,
        category: 'accessories',
        subcategory: 'wallet-cards',
        rating: 5
    })),

    // Keychains
    ...Array.from({ length: 6 }).map((_, i) => ({
        id: `keychain-${i}`,
        title: `Acrylic Keychain ${i + 1}`,
        price: 699,
        image: `/assets/products/keychain-${i}.jpg`,
        category: 'accessories',
        subcategory: 'keychains',
        rating: 5
    })),

    // Magnets
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `magnet-${i}`,
        title: `Fridge Magnet ${i + 1}`,
        price: 499,
        image: `/assets/products/magnet-${i}.jpg`,
        category: 'accessories',
        subcategory: 'magnets',
        rating: 4
    })),

    // Notebooks
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `notebook-${i}`,
        title: `Spiral Notebook ${i + 1}`,
        price: 899,
        image: `/assets/products/notebook-${i}.jpg`,
        category: 'accessories',
        subcategory: 'notebooks',
        rating: 4
    })),

    // Gift Boxes
    {
        id: 'gift-box-corporate',
        title: 'Corporate Gift Box (Set of 4)',
        price: 4999,
        image: '/assets/products/gift-box-corporate.jpg',
        category: 'accessories',
        subcategory: 'gift-boxes',
        rating: 5,
        artist: 'PREMIUM'
    },
    {
        id: 'gift-box-premium',
        title: 'Premium Gift Hamper',
        price: 7999,
        image: '/assets/products/gift-box-premium.jpg',
        category: 'accessories',
        subcategory: 'gift-boxes',
        rating: 5,
        artist: 'LUXURY'
    }
];
