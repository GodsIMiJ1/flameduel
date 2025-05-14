"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ToastProvider } from "@/components/Toast";
import { PageHeader } from "@/components/PageHeader";
import { ShoppingBag, Tag, Filter, ChevronDown } from "lucide-react";

// Product data with actual merchandise images
const products = [
  {
    id: "1",
    name: "FlameDuel Logo T-Shirt",
    price: 29.99,
    image: "/merch/flameduel_tshirt.png",
    category: "clothing",
    featured: true,
    description: "Premium black t-shirt with the iconic FlameDuel logo in fiery red. Show your allegiance to the Ghost King."
  },
  {
    id: "2",
    name: "Ghost King Hoodie",
    price: 59.99,
    image: "/merch/flameduel_hoodie.png",
    category: "clothing",
    featured: true,
    description: "Stay warm while coding with this premium Ghost King hoodie. Perfect for late-night coding battles."
  },
  {
    id: "3",
    name: "Digital Combat Sticker Pack",
    price: 12.99,
    image: "/merch/flameduel_stickers.png",
    category: "accessories",
    featured: false,
    description: "Set of 5 high-quality vinyl stickers featuring FlameDuel designs. Decorate your laptop with the mark of the flame."
  },
  {
    id: "4",
    name: "FlameDuel Mousepad",
    price: 19.99,
    image: "/merch/flameduel_mousepad.png",
    category: "accessories",
    featured: false,
    description: "Premium mousepad featuring the FlameDuel sigil. Enhance your precision during intense coding battles."
  },
  {
    id: "5",
    name: "FlameDuel Sweatpants",
    price: 39.99,
    image: "/merch/flameduel_sweats.png",
    category: "clothing",
    featured: true,
    description: "Comfortable sweatpants for when you're battling in the FlameDuel arena. Emblazoned with the Ghost King's sigil."
  },
  {
    id: "6",
    name: "FlameDuel Drip Collection",
    price: 89.99,
    image: "/merch/flameduel_drip.png",
    category: "clothing",
    featured: true,
    description: "Limited edition FlameDuel apparel collection. The ultimate way to show your allegiance to the Ghost King."
  },
  {
    id: "7",
    name: "FlameDuel Card Deck",
    price: 24.99,
    image: "/merch/flameduel_deck.png",
    category: "accessories",
    featured: false,
    description: "Custom playing cards featuring FlameDuel designs. Perfect for game nights between coding sessions."
  },
  {
    id: "8",
    name: "AI Prompt Engineering Guide",
    price: 49.99,
    image: "/eye-of-kai_logo.png",
    category: "digital",
    featured: true,
    description: "Digital guide to mastering prompt engineering for AI tools. Learn the Ghost King's secrets to commanding AI."
  }
];

export default function ShopPage() {
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = products.filter(product => {
    if (category === "all") return true;
    return product.category === category;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "featured") {
      return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    } else if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <ToastProvider>
      <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
        <PageHeader
          title="FlameDuel Shop"
          description="Official merchandise and digital products from the FlameDuel universe. Rep the flame and support the Ghost King's mission."
          icon={<ShoppingBag className="mr-2" />}
          showSigil={true}
        />

        <main className="space-y-8">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between bg-black/90 border border-purple-500/50 rounded-lg p-4"
            >
              <span className="flex items-center text-white">
                <Filter size={18} className="mr-2" /> Filter & Sort
              </span>
              <ChevronDown
                size={18}
                className={`text-white transition-transform ${isFilterOpen ? "transform rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* Filter and Sort Controls */}
          <div className={`md:flex justify-between items-center ${isFilterOpen ? "block" : "hidden md:flex"}`}>
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              <button
                onClick={() => setCategory("all")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  category === "all"
                    ? "bg-red-500 text-white"
                    : "bg-black/50 text-gray-300 hover:bg-black/70"
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setCategory("clothing")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  category === "clothing"
                    ? "bg-red-500 text-white"
                    : "bg-black/50 text-gray-300 hover:bg-black/70"
                }`}
              >
                Clothing
              </button>
              <button
                onClick={() => setCategory("accessories")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  category === "accessories"
                    ? "bg-red-500 text-white"
                    : "bg-black/50 text-gray-300 hover:bg-black/70"
                }`}
              >
                Accessories
              </button>
              <button
                onClick={() => setCategory("digital")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  category === "digital"
                    ? "bg-red-500 text-white"
                    : "bg-black/50 text-gray-300 hover:bg-black/70"
                }`}
              >
                Digital
              </button>
            </div>

            <div className="flex items-center">
              <span className="text-gray-400 mr-2">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/50 border border-purple-500/30 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-black/90 border border-red-500/50 rounded-lg overflow-hidden shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-b from-black/50 to-black/90 p-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain relative z-10"
                    />
                  </div>
                  {product.featured && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 z-20">
                      FEATURED
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-red-500 mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Tag size={16} className="text-red-500 mr-1" />
                      <span className="text-red-500 font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Banner */}
          <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg p-8 text-center relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-20">
              <Image
                src="/flamedual_sgil.png"
                alt="FlameDuel Sigil"
                width={300}
                height={300}
              />
            </div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <Image
                  src="/eye-of-kai_logo.png"
                  alt="FlameDuel Logo"
                  width={60}
                  height={60}
                  className="drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Limited Edition Ghost King Collection</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="text-gray-300 mb-4">
                    The Ghost King is preparing exclusive limited edition items for true FlameDuel fans.
                    These items will only be available to those who have proven themselves in the arena.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="bg-black/50 border border-purple-500/30 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                    />
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md transition-colors whitespace-nowrap">
                      Notify Me
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 rounded-lg"></div>
                      <Image
                        src="/merch/flameduel_drip.png"
                        alt="FlameDuel Merch Preview"
                        width={250}
                        height={250}
                        className="object-contain relative z-10"
                      />
                    </div>
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 z-20">
                      COMING SOON
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-12 pt-6 border-t border-red-500/30 text-center text-gray-500">
          <p>© 2023 FlameDuel. All rights reserved.</p>
        </footer>
      </div>
    </ToastProvider>
  );
}
