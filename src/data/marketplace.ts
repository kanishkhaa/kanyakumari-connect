import basketImg from "@/assets/market-basket.jpg";
import sareeImg from "@/assets/market-saree.jpg";
import shellsImg from "@/assets/market-shells.jpg";
import spicesImg from "@/assets/market-spices.jpg";

export type Product = {
  id: string;
  name: string;
  artisan: string;
  village: string;
  image: string;
  price: number;
  category: "Textile" | "Handicraft" | "Spices" | "Jewelry";
  description: string;
};

export const products: Product[] = [
  {
    id: "palm-basket",
    name: "Palmyra Hand-Woven Basket Set",
    artisan: "Selvi & women's collective",
    village: "Manakudy",
    image: basketImg,
    price: 850,
    category: "Handicraft",
    description: "Set of three baskets woven from sustainably harvested palmyra leaf.",
  },
  {
    id: "kanchi-cotton-saree",
    name: "Handloom Cotton Saree — Sunset Pink",
    artisan: "Murugan Weavers Co-op",
    village: "Balaramapuram",
    image: sareeImg,
    price: 2400,
    category: "Textile",
    description: "Pure cotton handloom saree with traditional zari border. 6 yards.",
  },
  {
    id: "shell-jewelry-set",
    name: "Sea Shell & Wood Necklace Set",
    artisan: "Mary's craft circle",
    village: "Vattakottai",
    image: shellsImg,
    price: 650,
    category: "Jewelry",
    description: "Three handmade necklaces using locally sourced shells and rosewood beads.",
  },
  {
    id: "kanyakumari-spice-box",
    name: "Kanyakumari Spice Sampler",
    artisan: "Tribal Spice Collective",
    village: "Pechiparai",
    image: spicesImg,
    price: 950,
    category: "Spices",
    description: "Six glass jars: turmeric, chilli, cardamom, clove, pepper and house masala.",
  },
];
