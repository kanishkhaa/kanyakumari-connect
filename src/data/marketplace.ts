import basketImg from "@/assets/market-basket.jpg";
import sareeImg from "@/assets/market-saree.jpg";
import shellsImg from "@/assets/market-shells.jpg";
import foodImg from "@/assets/food-appam.jpg";
import buyBananaChipsImg from "@/assets/buy-bananachips.jpg";
import buyBrassImg from "@/assets/buy-brass.jpg";
import buyCinnamonImg from "@/assets/buy-cinnamon.jpg";
import buyCloveImg from "@/assets/buy-clove.jpg";
import buyCoconutShellImg from "@/assets/buy-coconutshell.jpg";
import buyDhotiImg from "@/assets/buy-dhoti.jpg";
import buyHandicraftsImg from "@/assets/buy-handicrafts.jpg";
import buyHandloomImg from "@/assets/buy-handloom.jpg";
import buyJackfruitChipsImg from "@/assets/buy-jackfruitchips.jpg";
import buyMixtureImg from "@/assets/buy-mixture.jpg";
import buyPalmImg from "@/assets/buy-palm.jpg";
import buyPalmLeafImg from "@/assets/buy-palmleaf.jpg";
import buySanguImg from "@/assets/buy-sangu.jpg";
import buySeashellImg from "@/assets/buy-seashell.jpg";

export type Product = {
  id: string;
  name: string;
  artisan: string;
  village: string;
  image: string;
  price: number;
  category:
    | "Sea Craft"
    | "Palm & Wood Craft"
    | "Brass & Metal Craft"
    | "Coconut Craft"
    | "Food Souvenir"
    | "Spices"
    | "Textile";
  description: string;
  whereToBuy: string;
};

export const productImages: Record<string, string> = {
  "seashell-crafts": buySeashellImg,
  "conch-shell-keepsakes": buySanguImg,
  "palm-leaf-products": buyPalmImg,
  "palm-leaf-framed-art": buyPalmLeafImg,
  "wood-bamboo-handicrafts": buyHandicraftsImg,
  "brass-lamps-idols": buyBrassImg,
  "coconut-shell-craft": buyCoconutShellImg,
  "banana-chips": buyBananaChipsImg,
  "jackfruit-chips": buyJackfruitChipsImg,
  "nagercoil-savouries": buyMixtureImg,
  "kanyakumari-clove-pepper": buyCloveImg,
  "cardamom-masala-packets": buyCinnamonImg,
  "handloom-textiles": buyHandloomImg,
  "cotton-dhotis-towels": buyDhotiImg,
};

export function productImage(product: Product) {
  return productImages[product.id] || product.image || shellsImg;
}

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
    id: "conch-shell-keepsakes",
    name: "Conch Shell Keepsakes and Sangu Decor",
    artisan: "Seafront shell craft sellers",
    village: "Kanyakumari Beach and temple streets",
    image: shellsImg,
    price: 200,
    category: "Sea Craft",
    description:
      "Polished conch shells, small sangu display pieces, shell keychains and desk curios are easy-to-pack keepsakes from the coastal bazaar.",
    whereToBuy: "Beach Road stalls, lanes behind Bhagavathi Amman Temple and established souvenir shops near the seafront.",
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
    id: "palm-leaf-framed-art",
    name: "Preserved Palm Leaf Drawings",
    artisan: "Palm craft artists",
    village: "Kanyakumari town",
    image: basketImg,
    price: 300,
    category: "Palm & Wood Craft",
    description:
      "Framed drawings and paintings on preserved palm leaves are a distinctive lightweight souvenir, often showing temples, coastal scenes and devotional motifs.",
    whereToBuy: "Poompuhar, Tamil Nadu craft shops and beach-side handicraft stores.",
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
    id: "brass-lamps-idols",
    name: "Brass Lamps, Idols and Puja Articles",
    artisan: "Tamil Nadu metal craft sellers",
    village: "Kanyakumari / Nagercoil",
    image: sareeImg,
    price: 550,
    category: "Brass & Metal Craft",
    description:
      "Small brass lamps, devotional idols and puja articles suit temple-route travellers who want a traditional Tamil Nadu craft piece.",
    whereToBuy: "Poompuhar Handicrafts Emporium, temple-street shops and verified handicraft stores.",
  },
  {
    id: "coconut-shell-craft",
    name: "Coconut Shell Vases, Bowls and Decor",
    artisan: "Wood and coco craft workshops",
    village: "Manakudy and Kanyakumari district",
    image: basketImg,
    price: 250,
    category: "Coconut Craft",
    description:
      "Coconut shell flower vases, small bowls and polished decor pieces are practical coastal craft buys from the district's wood-and-coco makers.",
    whereToBuy: "Local handicraft shops in Kanyakumari town, Manakudy-side workshops and craft counters.",
  },
  {
    id: "banana-chips",
    name: "Nendran Banana Chips and Jackfruit Chips",
    artisan: "Local snack makers",
    village: "Nagercoil and Kanyakumari",
    image: buyBananaChipsImg,
    price: 120,
    category: "Food Souvenir",
    description:
      "Crisp banana chips and jackfruit chips are popular edible souvenirs, often fried fresh and packed for travel.",
    whereToBuy: "Sweet shops, snack stores and markets in Nagercoil and Kanyakumari town.",
  },
  {
    id: "jackfruit-chips",
    name: "Jackfruit Chips",
    artisan: "Kumari snack makers",
    village: "Nagercoil and Kurunthancode",
    image: buyJackfruitChipsImg,
    price: 140,
    category: "Food Souvenir",
    description:
      "Jackfruit chips are sold alongside banana chips and mixtures, with sealed packets making them easier to carry on road and rail trips.",
    whereToBuy: "Nagercoil snack stores, Vadasery market area and packaged-snack counters in Kanyakumari.",
  },
  {
    id: "nagercoil-savouries",
    name: "Nagercoil Pakoda, Murukku and Mixture",
    artisan: "Traditional sweet and snack stalls",
    village: "Vadasery, Nagercoil",
    image: foodImg,
    price: 100,
    category: "Food Souvenir",
    description:
      "Pakoda, murukku, karasev, mixture and sweet boxes from Nagercoil are local favourites when bought fresh from long-running snack shops.",
    whereToBuy: "Vadasery and Nagercoil sweet stalls, especially shops that fry and pack snacks daily.",
  },
  {
    id: "kanyakumari-clove-pepper",
    name: "Kanyakumari Clove and Black Pepper",
    artisan: "Hill and market traders",
    village: "Maramalai, Karumparai, Velimalai and Nagercoil markets",
    image: buyCloveImg,
    price: 160,
    category: "Spices",
    description:
      "The district's Western Ghats belt is known for clove, with pepper also moving through Nagercoil's spice shops and markets.",
    whereToBuy: "Nagercoil markets, spice stores and verified packaged-food shops.",
  },
  {
    id: "cardamom-masala-packets",
    name: "Cardamom, Cinnamon and House Masala Packets",
    artisan: "Spice merchants",
    village: "Nagercoil and hill-produce markets",
    image: buyCinnamonImg,
    price: 180,
    category: "Spices",
    description:
      "Cardamom, cinnamon, turmeric, dried ginger and house masala blends are practical edible souvenirs when bought sealed and labelled.",
    whereToBuy: "Nagercoil spice stores, supermarkets and verified packaged-food shops around Kanyakumari.",
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
  {
    id: "cotton-dhotis-towels",
    name: "Cotton Dhotis, Towels and Everyday Handloom",
    artisan: "Co-op and textile sellers",
    village: "Kanyakumari / Nagercoil",
    image: sareeImg,
    price: 250,
    category: "Textile",
    description:
      "Light cotton dhotis, towels and daily-use handloom pieces are useful buys for travellers who prefer locally made textiles over decorative souvenirs.",
    whereToBuy: "Co-optex counters, Indco Products and established textile stores in Nagercoil.",
  },
];
