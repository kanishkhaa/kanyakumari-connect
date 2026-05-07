import basketImg from "@/assets/market-basket.jpg";
import sareeImg from "@/assets/market-saree.jpg";
import shellsImg from "@/assets/market-shells.jpg";
import spicesImg from "@/assets/market-spices.jpg";
import foodImg from "@/assets/food-appam.jpg";

export type Product = {
  id: string;
  name: string;
  artisan: string;
  village: string;
  image: string;
  price: number;
  category: "Sea Craft" | "Palm & Wood Craft" | "Food Souvenir" | "Spices" | "Textile";
  description: string;
  whereToBuy: string;
};

export const products: Product[] = [
  {
    id: "seashell-crafts",
    name: "Seashell Souvenirs and Shell Jewellery",
    artisan: "Beachfront craft stalls",
    village: "Kanyakumari Beach Road",
    image: shellsImg,
    price: 150,
    category: "Sea Craft",
    description:
      "Decorative conch shells, shell necklaces, earrings, curios, pen stands and small home decor pieces are among the most common Kanyakumari souvenirs.",
    whereToBuy: "Beach Road stalls, Poompuhar Handicrafts Emporium and local souvenir shops near the seafront.",
  },
  {
    id: "palm-leaf-products",
    name: "Palm Leaf Articles and Framed Palm Drawings",
    artisan: "Local palm craft makers",
    village: "Kanyakumari town and nearby villages",
    image: basketImg,
    price: 250,
    category: "Palm & Wood Craft",
    description:
      "Palm-leaf baskets, mats, small boxes, drawings and framed keepsakes reflect the district's coastal craft traditions.",
    whereToBuy: "Souvenir shops around the beach, Tamil Nadu craft outlets and local market lanes.",
  },
  {
    id: "wood-bamboo-handicrafts",
    name: "Wood, Bamboo and Brass Handicrafts",
    artisan: "Tamil Nadu craft sellers",
    village: "Kanyakumari and Nagercoil",
    image: sareeImg,
    price: 400,
    category: "Palm & Wood Craft",
    description:
      "Wooden showpieces, bamboo articles, brass idols and carved devotional souvenirs are widely sold for gifting and home decor.",
    whereToBuy: "Poompuhar, Tamil Nadu Crafts, Indco outlets and established handicraft shops.",
  },
  {
    id: "banana-chips",
    name: "Nendran Banana Chips and Jackfruit Chips",
    artisan: "Local snack makers",
    village: "Nagercoil and Kanyakumari",
    image: foodImg,
    price: 120,
    category: "Food Souvenir",
    description:
      "Crisp banana chips and jackfruit chips are popular edible souvenirs, often fried fresh and packed for travel.",
    whereToBuy: "Sweet shops, snack stores and markets in Nagercoil and Kanyakumari town.",
  },
  {
    id: "spice-packets",
    name: "Pepper, Cardamom, Clove and Masala Packets",
    artisan: "Hill and market traders",
    village: "Pechiparai belt and Nagercoil markets",
    image: spicesImg,
    price: 180,
    category: "Spices",
    description:
      "Kanyakumari's Western Ghats links make pepper, cardamom, clove, cinnamon and house masala blends practical take-home buys.",
    whereToBuy: "Nagercoil markets, spice stores and verified packaged-food shops.",
  },
  {
    id: "handloom-textiles",
    name: "Handloom Textiles and Cotton Sarees",
    artisan: "Co-op and textile emporiums",
    village: "Kanyakumari / Nagercoil",
    image: sareeImg,
    price: 900,
    category: "Textile",
    description:
      "Cotton sarees, handloom fabrics and simple traditional textiles are available through cooperative and state emporium-style shops.",
    whereToBuy: "Tamil Nadu Co-optex Sales Emporium, Indco Products and textile shops in Nagercoil.",
  },
];
