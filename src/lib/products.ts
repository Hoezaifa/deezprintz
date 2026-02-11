export interface Product {
    id: string;
    title: string;
    price: number;
    image: string | null;
    category: string;
    subcategory?: string;
    artist?: string;
    rating: number;
}

export const PRODUCTS: Product[] = [
    // --- FEATURED (Homepage) ---
    {
        id: "kanye-yeezus-shirt",
        title: "KANYE WEST YEEZUS T-SHIRT",
        artist: "KANYE WEST",
        price: 3200,
        image: null,
        rating: 5,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "kanye-west-hoodie",
        title: "KANYE WEST HOODIE",
        artist: "KANYE WEST",
        price: 5500,
        image: null,
        rating: 5,
        category: "hoodies",
        subcategory: "original"
    },
    {
        id: "night-met-shirt",
        title: "THE NIGHT WE MET",
        artist: "LORD HURON",
        price: 2800,
        image: null,
        rating: 5,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "seedhe-maut-shirt",
        title: "SEEDHE MAUT TSHIRT",
        artist: "SEEDHE MAUT",
        price: 2500,
        image: null,
        rating: 4,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "oversized-tee-tbsm",
        title: "OVERSIZED TEE",
        artist: "TBSM",
        price: 2900,
        image: null,
        rating: 5,
        category: "t-shirts",
        subcategory: "drop-shoulder"
    },
    // --- HOODIES ---
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `hoodie-${i}`,
        title: `Streetwear Hoodie ${i + 1}`,
        price: 4500,
        image: null,
        category: 'hoodies',
        artist: 'DEEZ ORIGINALS',
        rating: 5
    })),

    // --- T-SHIRTS ---
    // Regular
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `tshirt-reg-${i}`,
        title: `Regular Fit Graphic Tee ${i + 1}`,
        price: 2500,
        image: null,
        category: 't-shirts',
        subcategory: 'regular',
        artist: 'TBSM',
        rating: 4
    })),
    // Drop Shoulder
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `tshirt-drop-${i}`,
        title: `Oversized Drop Shoulder Tee ${i + 1}`,
        price: 2900,
        image: null,
        category: 't-shirts',
        subcategory: 'drop-shoulder',
        artist: 'OVERSIZED',
        rating: 5
    })),
    // Acid Wash
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `tshirt-acid-${i}`,
        title: `Vintage Acid Wash Tee ${i + 1}`,
        price: 3200,
        image: null,
        category: 't-shirts',
        subcategory: 'acid-wash',
        artist: 'VINTAGE',
        rating: 5
    })),

    // --- JERSEYS ---
    ...Array.from({ length: 8 }).map((_, i) => ({
        id: `jersey-${i}`,
        title: `Pro Moto Jersey ${i + 1}`,
        price: 5500,
        image: null,
        category: 'jerseys',
        artist: 'RACING',
        rating: 5
    })),

    // --- ACCESSORIES / CUSTOMIZED ITEMS ---
    // Mugs
    { id: 'mug-white', title: 'Sublimation Mug (Inner White)', price: 900, category: 'accessories', subcategory: 'mugs', rating: 4, image: null },
    { id: 'mug-colored', title: 'Sublimation Mug (Inner + Handle Colored)', price: 1200, category: 'accessories', subcategory: 'mugs', rating: 5, image: null },
    { id: 'mug-magic', title: 'Magic Color Changing Mug', price: 1500, category: 'accessories', subcategory: 'mugs', rating: 5, image: null },

    // Flags
    ...Array.from({ length: 4 }).map((_, i) => ({
        id: `flag-${i}`,
        title: `Custom Tapestry Flag ${i + 1}`,
        price: 1900,
        image: null,
        category: 'accessories',
        subcategory: 'flags',
        rating: 5
    })),

    // Tapestries
    ...Array.from({ length: 4 }).map((_, i) => ({
        id: `tapestry-${i}`,
        title: `Wall Tapestry ${i + 1}`,
        price: 2400,
        image: null,
        category: 'accessories',
        subcategory: 'tapestries',
        rating: 5
    })),

    // Wristbands
    ...Array.from({ length: 4 }).map((_, i) => ({
        id: `wristband-${i}`,
        title: `Silicone Wristband ${i + 1}`,
        price: 499,
        image: null,
        category: 'accessories',
        subcategory: 'wristbands',
        rating: 4
    })),

    // Badges
    ...Array.from({ length: 6 }).map((_, i) => ({
        id: `badge-${i}`,
        title: `Button Badge ${i + 1}`,
        price: 299,
        image: null,
        category: 'accessories',
        subcategory: 'badges',
        rating: 4
    })),

    // Wallet Cards
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `wallet-card-${i}`,
        title: `Metal Wallet Card ${i + 1}`,
        price: 1400,
        image: null,
        category: 'accessories',
        subcategory: 'wallet-cards',
        rating: 5
    })),

    // Keychains
    ...Array.from({ length: 6 }).map((_, i) => ({
        id: `keychain-${i}`,
        title: `Acrylic Keychain ${i + 1}`,
        price: 699,
        image: null,
        category: 'accessories',
        subcategory: 'keychains',
        rating: 5
    })),

    // Magnets
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `magnet-${i}`,
        title: `Fridge Magnet ${i + 1}`,
        price: 499,
        image: null,
        category: 'accessories',
        subcategory: 'magnets',
        rating: 4
    })),

    // Notebooks
    ...Array.from({ length: 5 }).map((_, i) => ({
        id: `notebook-${i}`,
        title: `Spiral Notebook ${i + 1}`,
        price: 899,
        image: null,
        category: 'accessories',
        subcategory: 'notebooks',
        rating: 4
    })),

    // Gift Boxes
    {
        id: 'gift-box-corporate',
        title: 'Corporate Gift Box (Set of 4)',
        price: 4999,
        image: null,
        category: 'accessories',
        subcategory: 'gift-boxes',
        rating: 5,
        artist: 'PREMIUM'
    },
    {
        id: 'gift-box-premium',
        title: 'Premium Gift Hamper',
        price: 7999,
        image: null,
        category: 'accessories',
        subcategory: 'gift-boxes',
        rating: 5,
        artist: 'LUXURY'
    }
];
