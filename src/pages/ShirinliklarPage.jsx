import React, { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ShirinliklarPage({ addToCart, addToFavorites, favorites }) {
  const [flyingHearts, setFlyingHearts] = useState([]);

  const desserts = [
    { title: "Donut", price: 12000, img: "https://images.unsplash.com/photo-1606312619070-b7d8e6e6c2e3" },
    { title: "Cheesecake", price: 15000, img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87" },
    { title: "Waffle", price: 13000, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
  ];

  // ❤️ Yurakcha bosilganda animatsiya
  const handleFavorite = (item, index) => {
    addToFavorites(item);

    // Uchuvchi yurakcha yaratish
    const newHeart = { id: Date.now(), index };
    setFlyingHearts((prev) => [...prev, newHeart]);

    // 1.2 soniyada o‘chirish
    setTimeout(() => {
      setFlyingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <section className="min-h-screen relative px-6 py-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-rose-950 to-purple-900 -z-10"></div>

      <h2 className="text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
        🍰 Shirinliklar — Kayfiyat Manba
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {desserts.map((item, i) => {
          const isFavorite = favorites?.some((f) => f.title === item.title);

          return (
            <div key={i} className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg p-2">
              {/* ❤️ Yurakcha tugma */}
              <button
                onClick={() => handleFavorite(item, i)}
                className="absolute top-3 right-3 bg-white/40 p-2 rounded-full backdrop-blur-md hover:bg-white/60 transition"
              >
                <Heart
                  size={22}
                  color={isFavorite ? "#ff4d4f" : "#fff"}
                  fill={isFavorite ? "#ff4d4f" : "none"}
                />
              </button>

              {/* ❤️ Uchuvchi animatsion yurakcha */}
              <AnimatePresence>
                {flyingHearts
                  .filter((h) => h.index === i)
                  .map((h) => (
                    <motion.div
                      key={h.id}
                      initial={{ opacity: 1, y: 0, scale: 1 }}
                      animate={{ opacity: 0, y: -80, scale: 1.8 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="absolute top-6 right-6 text-pink-400 text-2xl pointer-events-none"
                    >
                      ❤️
                    </motion.div>
                  ))}
              </AnimatePresence>

              {/* Taom rasmi */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-44 object-cover rounded-xl"
              />

              <div className="p-4 text-center space-y-1">
                <h3 className="font-bold text-lg bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.price.toLocaleString()} so‘m</p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 w-full bg-pink-500 text-black py-1.5 rounded-lg hover:bg-pink-400 transition font-semibold"
                >
                  🛒 Savatga qo‘shish
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
