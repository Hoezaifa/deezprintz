import { getCloudinaryUrl } from "@/lib/cloudinary";

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
    images?: string[]; // Optional: List of exact image URLs (overrides auto-generation)
    sizePricing?: { [key: string]: number }; // Optional: Override price based on size
    bulkOptions?: { qty: number, pricePerItem: number }[]; // Optional: Bulk quantity options
}

export async function getProducts() {
    return PRODUCTS
}

export const PRODUCTS: Product[] = [
    // --- FEATURED ---
    {
        id: "kanye-yeezus-shirt",
        title: "KANYE WEST YEEZUS T-SHIRT",
        artist: "KANYE WEST",
        price: 3200,
        image: getCloudinaryUrl('/assets/products/regular-t-shirts/kanye-yeezus-shirt-v1.jpg'),
        images: [],
        rating: 5,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "kanye-west-hoodie",
        title: "KeNYE WEST HOODIE",
        artist: "KANYE WEST",
        price: 5500,
        image: getCloudinaryUrl('/assets/products/hoodies/kanye-west-hoodie-v1.jpg'),
        images: [],
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
        image: getCloudinaryUrl('/assets/products/regular-t-shirts/night-met-shirt-v1.jpg'),
        images: [],
        rating: 5,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "seedhe-maut-shirt",
        title: "SEEDHE MAUT TSHIRT",
        artist: "SEEDHE MAUT",
        price: 2500,
        image: getCloudinaryUrl('/assets/products/regular-t-shirts/seedhe-maut-shirt-v1.jpg'),
        images: [],
        rating: 4,
        category: "t-shirts",
        subcategory: "graphic"
    },
    {
        id: "oversized-tee-tbsm",
        title: "OVERSIZED TEE",
        artist: "TBSM",
        price: 2900,
        image: getCloudinaryUrl('/assets/products/drop-shoulder-t-shirts/oversized-tee-tbsm-v1.jpg'),
        images: [],
        rating: 5,
        category: "t-shirts",
        subcategory: "drop-shoulder",
        colors: ["Black", "White", "Olive", "Sand"]
    },

    // --- HOODIES (Expanded Loop) ---
    {
        id: "hoodie-1",
        title: "Streetwear Hoodie 1",
        price: 4500,
        image: getCloudinaryUrl("/assets/products/hoodies/hoodie-1-v1.jpg"),
        images: [],
        category: 'hoodies',
        artist: 'DEEZ ORIGINALS',
        rating: 5,
        colors: ["Black", "White", "Grey", "Navy"]
    },
    {
        id: "hoodie-2",
        title: "Streetwear Hoodie 2",
        price: 4500,
        image: getCloudinaryUrl("/assets/products/hoodies/hoodie-2-v1.jpg"),
        images: [],
        category: 'hoodies',
        artist: 'DEEZ ORIGINALS',
        rating: 5,
        colors: ["Black", "White", "Grey", "Navy"]
    },
    {
        id: "hoodie-3",
        title: "Streetwear Hoodie 3",
        price: 4500,
        image: getCloudinaryUrl("/assets/products/hoodies/hoodie-3-v1.jpg"),
        images: [],
        category: 'hoodies',
        artist: 'DEEZ ORIGINALS',
        rating: 5,
        colors: ["Black", "White", "Grey", "Navy"]
    },

    // --- REGULAR T-SHIRTS ---
    {
        id: "sample-v1",
        title: "Cigar Curse",
        price: 1800,
        // Main image for the card
        image: "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1771522535/sample-v1.jpg",

        // EXPLICIT LIST OF ALL IMAGES
        images: [
            "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1771522535/sample-v1.jpg",
            "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1771522535/sample-v2_xuxtfn.jpg",
        ],
        category: 't-shirts',
        subcategory: 'regular',
        artist: ' ',
        rating: 4,
        colors: ["Black", "White", "Blue", "Red"]
    },
    {
        id: "tshirt-reg-2",
        title: "Regular Fit Graphic Tee 2",
        price: 2500,
        image: "https://res.cloudinary.com/dsjnjbsgi/image/upload/v1771522535/sample-v1.jpg",
        images: [],
        category: 't-shirts',
        subcategory: 'regular',
        artist: 'TBSM',
        rating: 4,
        colors: ["Black", "White", "Blue", "Red"]
    },

    // --- DROP SHOULDER T-SHIRTS ---
    {
        id: "tshirt-drop-1",
        title: "Oversized Drop Shoulder Tee 1",
        price: 2900,
        image: getCloudinaryUrl("/assets/products/drop-shoulder-t-shirts/tshirt-drop-1.jpg"),
        images: [],
        category: 't-shirts',
        subcategory: 'drop-shoulder',
        artist: 'OVERSIZED',
        rating: 5,
        colors: ["Black", "beige", "White"]
    },
    {
        id: "tshirt-drop-2",
        title: "Oversized Drop Shoulder Tee 2",
        price: 2900,
        image: getCloudinaryUrl("/assets/products/drop-shoulder-t-shirts/tshirt-drop-2.jpg"),
        images: [],
        category: 't-shirts',
        subcategory: 'drop-shoulder',
        artist: 'OVERSIZED',
        rating: 5,
        colors: ["Black", "beige", "White"]
    },

    // --- ACID WASH T-SHIRTS ---
    {
        id: "tshirt-acid-1",
        title: "Vintage Acid Wash Tee 1",
        price: 3200,
        image: getCloudinaryUrl("/assets/products/acid-wash-t-shirts/tshirt-acid-1.jpg"),
        images: [],
        category: 't-shirts',
        subcategory: 'acid-wash',
        artist: 'VINTAGE',
        rating: 5,
        colors: ["Acid Black", "Acid Wash Blue"]
    },

    // --- JERSEYS ---
    {
        id: "jersey-1",
        title: "Pro Moto Jersey 1",
        price: 5500,
        image: getCloudinaryUrl("/assets/products/jerseys/jersey-1.jpg"),
        images: [],
        category: 'jerseys',
        artist: 'RACING',
        rating: 5
    },
    {
        id: "jersey-2",
        title: "Pro Moto Jersey 2",
        price: 5500,
        image: getCloudinaryUrl("/assets/products/jerseys/jersey-2.jpg"),
        images: [],
        category: 'jerseys',
        artist: 'RACING',
        rating: 5
    },

    // --- MUGS ---
    {
        id: 'mug-white',
        title: 'Sublimation Mug (Inner White)',
        price: 900,
        category: 'accessories',
        subcategory: 'mugs',
        rating: 4,
        image: getCloudinaryUrl('/assets/products/mugs/mug-white.jpg'),
        images: [],
        // Mugs: White color only for this specific product
        colors: ["White"],
    },
    {
        id: 'mug-colored',
        title: 'Sublimation Mug (Inner + Handle Colored)',
        price: 1200,
        category: 'accessories',
        subcategory: 'mugs',
        rating: 5,
        image: getCloudinaryUrl('/assets/products/mugs/mug-colored.jpg'),
        images: [],
        // Mugs: Colored options
        colors: ["Red", "Green", "Black", "Blue"],
    },

    // --- FLAGS ---
    {
        id: "flag-1",
        title: "Customized Digital Flag", // Renamed from "Custom Tapestry Flag 1"
        price: 1900, // Starting price for smallest size
        image: getCloudinaryUrl("/assets/products/flags/flag-1.jpg"),
        images: [],
        category: 'accessories',
        subcategory: 'flags',
        rating: 5,
        // Flags: Dynamic Size Pricing
        sizePricing: {
            "24\"x36\"": 1900,
            "36\"x48\"": 2500,
            "48\"x60\"": 3200
        }
    },

    // --- TAPESTRIES ---
    {
        id: "tapestry-1",
        title: "Wall Tapestry 1",
        price: 2400, // Starting price
        image: getCloudinaryUrl("/assets/products/tapestries/tapestry-1.jpg"),
        images: [],
        category: 'accessories',
        subcategory: 'tapestries',
        rating: 5,
        // Tapestries: Dynamic Size Pricing
        sizePricing: {
            "24\"x36\"": 2400,
            "36\"x48\"": 3000,
            "48\"x60\"": 3800
        }
    },

    // --- WRISTBANDS ---
    {
        id: "wristband-1",
        title: "Silicone Wristband 1",
        price: 60, // Base price/unit for smallest bulk
        image: getCloudinaryUrl("/assets/products/wristbands/wristband-1.jpg"),
        images: [],
        category: 'accessories',
        subcategory: 'wristbands',
        rating: 4,
        colors: ["Black", "White", "Blue", "Red", "Yellow", "Glow"],
        // Wristbands: Bulk Options Only
        bulkOptions: [
            { qty: 50, pricePerItem: 60 },   // 3000 Total
            { qty: 100, pricePerItem: 40 },  // 4000 Total
            { qty: 200, pricePerItem: 38 }   // 7600 Total
        ]
    },

    // --- BADGES ---
    {
        id: "badge-1",
        title: "Button Badge 1",
        price: 50, // Base price
        image: getCloudinaryUrl("/assets/products/badges/badge-1.jpg"),
        images: [],
        category: 'accessories',
        subcategory: 'badges',
        rating: 4,
        // Badges: No Colors, Bulk Options
        bulkOptions: [
            { qty: 10, pricePerItem: 50 },
            { qty: 25, pricePerItem: 45 },
            { qty: 50, pricePerItem: 40 },
            { qty: 75, pricePerItem: 35 },
            { qty: 100, pricePerItem: 25 }
        ]
    },

    // --- WALLET CARDS ---
    {
        id: "wallet-card-1",
        title: "Metal Wallet Card 1",
        price: 200, // Fixed Price
        image: getCloudinaryUrl("/assets/products/wallet-cards/wallet-card-1.jpg"),
        images: [],
        category: 'accessories',
        subcategory: 'wallet-cards',
        rating: 5
    },

    // --- KEYCHAINS ---
    {
        id: "keychain-1",
        title: "Acrylic Keychain 1",
        price: 699,
        image: getCloudinaryUrl("/assets/products/keychains/keychain-1.jpg"),
        images: [],
        category: 'accessories',
        subcategory: 'keychains',
        rating: 5
    },

    // --- MAGNETS ---
    {
        id: "magnet-1",
        title: "Fridge Magnet 1",
        price: 499,
        image: getCloudinaryUrl("/assets/products/magnets/magnet-1.jpg"),
        images: [],
        category: 'accessories',
        subcategory: 'magnets',
        rating: 4
    },

    // --- NOTEBOOKS ---
    {
        id: "notebook-1",
        title: "Spiral Notebook 1",
        price: 899,
        image: getCloudinaryUrl("/assets/products/notebooks/notebook-1.jpg"),
        images: [],
        category: 'accessories',
        subcategory: 'notebooks',
        rating: 4
    },

    // --- GIFT BOXES ---
    {
        id: 'gift-box-corporate',
        title: 'Corporate Gift Box (Set of 4)',
        price: 4999,
        image: getCloudinaryUrl('/assets/products/gift-boxes/gift-box-corporate.jpg'),
        images: [],
        category: 'accessories',
        subcategory: 'gift-boxes',
        rating: 5,
        artist: 'PREMIUM'
    },
    {
        id: 'gift-box-premium',
        title: 'Premium Gift Hamper',
        price: 7999,
        image: getCloudinaryUrl('/assets/products/gift-boxes/gift-box-premium.jpg'),
        images: [],
        category: 'accessories',
        subcategory: 'gift-boxes',
        rating: 5,
        artist: 'LUXURY'
    }
];
