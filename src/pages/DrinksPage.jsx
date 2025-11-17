import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Heart } from "lucide-react";

export default function DrinksPage({ addToCart, addToFavorites }) {
  const [likedDrinks, setLikedDrinks] = useState([]);

  const drinks = [
    { id: 1, name: "Coca Cola 0.5L", price: 8000, img: new URL("../assets/drinks/cola.jpg", import.meta.url).href },
    { id: 2, name: "Pepsi 0.5L", price: 8000, img: new URL("../assets/drinks/pepsi.png", import.meta.url).href },
    { id: 3, name: "Fanta 0.5L", price: 8000, img: new URL("../assets/drinks/fanta.jpg", import.meta.url).href },
    { id: 4, name: "Sprite 0.5L", price: 8000, img: new URL("../assets/drinks/sprite.webp", import.meta.url).href },
    { id: 5, name: "Lipton", price: 9000, img: new URL("../assets/drinks/lipton.jpg", import.meta.url).href },
    { id: 6, name: "Nestea", price: 9000, img: new URL("../assets/drinks/nestea.jpg", import.meta.url).href },
    { id: 7, name: "Red Bull", price: 17000, img: new URL("../assets/drinks/redbull.jpg", import.meta.url).href },
    { id: 8, name: "Burn", price: 16000, img: new URL("../assets/drinks/burn.jpg", import.meta.url).href },
    { id: 9, name: "Monster", price: 18000, img: new URL("../assets/drinks/monster.jpg", import.meta.url).href },
    { id: 10, name: "Aqua", price: 6000, img: new URL("../assets/drinks/aqua.jpg", import.meta.url).href },
    { id: 11, name: "Suv (gazsiz)", price: 5000, img: new URL("../assets/drinks/suv.jpg", import.meta.url).href },
    { id: 12, name: "Olma sharbati", price: 15000, img: new URL("../assets/drinks/apple.jpg", import.meta.url).href },
    { id: 13, name: "Apelsin sharbati", price: 15000, img: new URL("../assets/drinks/orange.jpg", import.meta.url).href },
    { id: 14, name: "Anor sharbati", price: 16000, img: new URL("../assets/drinks/pomegranate.jpg", import.meta.url).href },
    { id: 15, name: "Mango smoothie", price: 17000, img: new URL("../assets/drinks/mango.jpg", import.meta.url).href },
    { id: 16, name: "Vanil Milkshake", price: 14000, img: new URL("../assets/drinks/milkshake.jpg", import.meta.url).href },
    { id: 17, name: "Shokolad Milkshake", price: 14000, img: new URL("../assets/drinks/chocolate-shake.jpg", import.meta.url).href },
    { id: 18, name: "Iced Coffee", price: 15000, img: new URL("../assets/drinks/icedcoffee.webp", import.meta.url).href },
    { id: 19, name: "Latte", price: 16000, img: new URL("../assets/drinks/latte.jpg", import.meta.url).href },
    { id: 20, name: "Cappuccino", price: 16000, img: new URL("../assets/drinks/cappuccino.webp", import.meta.url).href },
    { id: 21, name: "Espresso", price: 13000, img: new URL("../assets/drinks/espresso.webp", import.meta.url).href },
    { id: 22, name: "Choy (Qora)", price: 8000, img: new URL("../assets/drinks/blacktea.webp", import.meta.url).href },
    { id: 23, name: "Choy (Yashil)", price: 8000, img: new URL("../assets/drinks/greentea.jpg", import.meta.url).href },
    { id: 24, name: "Sharbat (multi-fruit)", price: 16000, img: new URL("../assets/drinks/multifruit.webp", import.meta.url).href },
  ];
  

  const toggleLike = (drink) => {
    const isLiked = likedDrinks.includes(drink.name);
    let updatedList;

    if (isLiked) {
      updatedList = likedDrinks.filter((d) => d !== drink.name);
      toast.error(`${drink.name} yoqtirilganlardan olib tashlandi 💔`, {
        style: { background: "#1f1f1f", color: "#fff", border: "1px solid #f87171" },
      });
    } else {
      updatedList = [...likedDrinks, drink.name];
      if (addToFavorites) addToFavorites(drink);
      toast.success(`${drink.name} yoqtirilganlarga qo‘shildi ❤️`, {
        style: { background: "#1f1f1f", color: "#fff", border: "1px solid #ef4444" },
      });
    }
    setLikedDrinks(updatedList);
  };

  return (
    <section className="relative min-h-screen px-6 py-20 overflow-hidden text-white">
      {/* 🌊 Fon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-br from-sky-900 via-blue-900 to-cyan-800 bg-[length:400%_400%] animate-[gradientMove_15s_ease_infinite] -z-10"
      ></motion.div>

      {/* 🧊 Sarlavha */}
      <motion.h2
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-5xl font-extrabold text-center text-cyan-300 mb-14 drop-shadow-[0_0_25px_rgba(0,255,255,0.7)]"
      >
        🥤 Ichimliklar
      </motion.h2>

      {/* 🍹 Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
        }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 z-10"
      >
        {drinks.map((drink, i) => {
          const isLiked = likedDrinks.includes(drink.name);
          return (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1 } },
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(0,255,255,0.35)" }}
              className="relative bg-white/10 backdrop-blur-lg border border-cyan-400/30 rounded-2xl overflow-hidden shadow-md hover:shadow-cyan-400/40 transition-all cursor-pointer"
            >
              {/* ❤️ Yurakcha */}
              <button
                onClick={() => toggleLike(drink)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300"
              >
                <Heart
                  size={22}
                  strokeWidth={2.3}
                  color={isLiked ? "#ff4d4f" : "white"}
                  fill={isLiked ? "#ff4d4f" : "none"}
                  className="transition-all duration-300"
                />
              </button>

              {/* 🧊 Rasm */}
              <motion.img
                src={drink.img}
                alt={drink.name}
                className="w-full h-48 object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                whileHover={{ scale: 1.06 }}
              />

              {/* 📋 Ma’lumot */}
              <div className="p-4 text-center">
                <h3 className="text-cyan-200 font-semibold text-lg mb-2">{drink.name}</h3>
                <p className="text-teal-300 font-bold mb-3">{drink.price.toLocaleString()} so‘m</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    addToCart(drink);
                    toast.success(`${drink.name} savatga qo‘shildi!`);
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-md hover:shadow-cyan-300/40 transition-all"
                >
                  🛒 Savatga qo‘shish
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 🎨 Gradient harakati */}
      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>
    </section>
  );
}
