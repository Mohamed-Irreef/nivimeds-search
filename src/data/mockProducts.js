export const mockProducts = [
    {
        id: "p1",
        name: "Dolo 650 Tablet",
        brand: "Micro Labs Ltd",
        category: "Pain Relief",
        price: 35.00,
        mrp: 35.00,
        requires_prescription: false,
        form: "Tablet",
        tags: ["paracetamol", "fever", "pain relief", "headache"],
        is_generic: false,
        image: "https://via.placeholder.com/150?text=Dolo+650",
        stock_status: "InStock",
        rating: 4.8,
        reviews: 1240,
        generic_alternative_id: "g1"
    },
    {
        id: "g1",
        name: "Paracetamol 650mg Tablet",
        brand: "GenericPharm",
        category: "Pain Relief",
        price: 18.00,
        mrp: 20.00,
        requires_prescription: false,
        form: "Tablet",
        tags: ["paracetamol", "fever", "pain relief", "generic"],
        is_generic: true,
        image: "https://via.placeholder.com/150?text=Paracetamol",
        stock_status: "InStock",
        rating: 4.5,
        reviews: 320
    },
    {
        id: "p2",
        name: "Cetaphil Gentle Skin Cleanser",
        brand: "Galderma",
        category: "Skin Care",
        price: 335.00,
        mrp: 350.00,
        requires_prescription: false,
        form: "Liquid",
        tags: ["face wash", "cleanser", "dry skin", "sensitive skin"],
        is_generic: false,
        image: "https://via.placeholder.com/150?text=Cetaphil",
        stock_status: "InStock",
        rating: 4.7,
        reviews: 5800
    },
    {
        id: "p3",
        name: "Himalaya Purifying Neem Face Wash",
        brand: "Himalaya Wellness",
        category: "Skin Care",
        price: 140.00,
        mrp: 150.00,
        requires_prescription: false,
        form: "Gel",
        tags: ["face wash", "cleanser", "oily skin", "acne", "organic", "herbal"],
        is_generic: false,
        image: "https://via.placeholder.com/150?text=Himalaya+Neem",
        stock_status: "InStock",
        rating: 4.6,
        reviews: 8200
    },
    {
        id: "p4",
        name: "Accu-Chek Active Blood Glucose Meter",
        brand: "Roche",
        category: "Diabetes",
        price: 950.00,
        mrp: 1100.00,
        requires_prescription: false,
        form: "Device",
        tags: ["glucometer", "diabetes", "blood sugar monitor"],
        is_generic: false,
        image: "https://via.placeholder.com/150?text=Accu-Chek",
        stock_status: "InStock",
        rating: 4.5,
        reviews: 2100
    },
    {
        id: "p5",
        name: "Shelcal 500 Tablet",
        brand: "Torrent Pharmaceuticals",
        category: "Vitamins & Supplements",
        price: 115.00,
        mrp: 120.00,
        requires_prescription: false,
        form: "Tablet",
        tags: ["calcium", "vitamin d3", "bone health"],
        is_generic: false,
        image: "https://via.placeholder.com/150?text=Shelcal+500",
        stock_status: "InStock",
        rating: 4.4,
        reviews: 950
    },
    {
        id: "p6",
        name: "Janumet 50mg/500mg Tablet",
        brand: "MSD Pharmaceuticals",
        category: "Diabetes",
        price: 320.00,
        mrp: 350.00,
        requires_prescription: true,
        form: "Tablet",
        tags: ["metformin", "sitagliptin", "blood sugar"],
        is_generic: false,
        image: "https://via.placeholder.com/150?text=Janumet",
        stock_status: "InStock",
        rating: 4.7,
        reviews: 450
    }
];

export const autocompleteSuggestions = {
    Medicines: [
        { name: "Dolo 650 Tablet", id: "p1" },
        { name: "Cetaphil Gentle Skin Cleanser", id: "p2" },
        { name: "Himalaya Purifying Neem Face Wash", id: "p3" }
    ],
    Brands: [
        { name: "Himalaya Wellness", count: 42 },
        { name: "Micro Labs Ltd", count: 18 },
        { name: "Galderma", count: 12 }
    ],
    Categories: [
        { name: "Pain Relief", term: "pain relief" },
        { name: "Skin Care", term: "skin care" },
        { name: "Diabetes", term: "diabetes" }
    ],
    Conditions: [
        { name: "Fever", term: "fever" },
        { name: "Acne", term: "acne" }
    ]
};
