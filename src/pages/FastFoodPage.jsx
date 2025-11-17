import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Heart } from "lucide-react";

export default function FastFoodPage({ addToCart, addToFavorites }) {
  const [likedFoods, setLikedFoods] = useState([]);
  const [flyingHearts, setFlyingHearts] = useState([]); // ❤️ uchadigan yuraklar
  const foods = [
    { id: 1, name: "Burger", price: 25000, img: new URL("../assets/fastfood/1.jpg", import.meta.url).href },
    { id: 2, name: "Cheeseburger", price: 27000, img: new URL("../assets/fastfood/2.jpg", import.meta.url).href },
    { id: 3, name: "Hot Dog", price: 22000, img: new URL("../assets/fastfood/3.jpg", import.meta.url).href },
    { id: 4, name: "Double Burger", price: 30000, img: new URL("../assets/fastfood/4.jpg", import.meta.url).href },
    { id: 5, name: "Chicken Wrap", price: 26000, img: new URL("../assets/fastfood/5.jpg", import.meta.url).href },
    { id: 6, name: "Pizza Slice", price: 28000, img: new URL("../assets/fastfood/6.jpg", import.meta.url).href },
    { id: 7, name: "Fries Box", price: 18000, img: new URL("../assets/fastfood/7.jpg", import.meta.url).href },
    { id: 8, name: "Fried Chicken", price: 29000, img: new URL("../assets/fastfood/8.jpg", import.meta.url).href },
    { id: 9, name: "Club Sandwich", price: 24000, img: new URL("../assets/fastfood/9.jpg", import.meta.url).href },
    { id: 10, name: "Tacos", price: 27000, img: new URL("../assets/fastfood/10.jpg", import.meta.url).href },
    { id: 11, name: "Onion Rings", price: 20000, img: new URL("../assets/fastfood/11.jpg", import.meta.url).href },
    { id: 12, name: "Nachos", price: 21000, img: new URL("../assets/fastfood/12.jpg", import.meta.url).href },
    { id: 13, name: "Mini Pizza", price: 23000, img: new URL("../assets/fastfood/13.jpg", import.meta.url).href },
    { id: 14, name: "Cheese Fries", price: 24000, img: new URL("../assets/fastfood/14.jpg", import.meta.url).href },
    { id: 15, name: "Crispy Nuggets", price: 25000, img: new URL("../assets/fastfood/15.jpg", import.meta.url).href },
    { id: 16, name: "Steak Burger", price: 33000, img: new URL("../assets/fastfood/16.jpg", import.meta.url).href },
    { id: 17, name: "Loaded Fries", price: 27000, img: new URL("../assets/fastfood/17.jpg", import.meta.url).href },
    { id: 18, name: "Beef Wrap", price: 28000, img: new URL("../assets/fastfood/18.jpg", import.meta.url).href },
    { id: 19, name: "Mega Burger", price: 35000, img: new URL("../assets/fastfood/19.jpg", import.meta.url).href },
    { id: 20, name: "Zinger Sandwich", price: 30000, img: new URL("../assets/fastfood/20.jpg", import.meta.url).href },
  ];
  

  // ❤️ Yurakcha bosilganda
  const toggleLike = (food, index) => {
    const isLiked = likedFoods.includes(food.name);
    let updatedList;

    if (isLiked) {
      updatedList = likedFoods.filter((f) => f !== food.name);
      toast.error(`${food.name} yoqtirilganlardan olib tashlandi 💔`, {
        style: { background: "#1f1f1f", color: "#fff", border: "1px solid #f87171" },
      });
    } else {
      updatedList = [...likedFoods, food.name];
      if (addToFavorites) addToFavorites(food);
      toast.success(`${food.name} yoqtirilganlarga qo‘shildi ❤️`, {
        style: { background: "#1f1f1f", color: "#fff", border: "1px solid #ef4444" },
      });

      // ❤️ Uchadigan yurakcha qo‘shish
      const newHeart = { id: Date.now(), index };
      setFlyingHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setFlyingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1000);
    }

    setLikedFoods(updatedList);
  };

  return (
    <section className="relative min-h-screen px-6 py-20 text-white overflow-hidden">
      {/* 🔥 Orqa fon gradienti */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-700 -z-10"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* 🍔 Sarlavha */}
      <h2 className="text-5xl font-extrabold text-center text-amber-300 mb-12 drop-shadow-[0_0_25px_rgba(255,200,100,0.8)]">
        🍔 Fast Food Taomlari
      </h2>

      {/* 🍟 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative">
        {foods.map((food, i) => {
          const isLiked = likedFoods.includes(food.name);
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,180,70,0.5)" }}
              transition={{ type: "spring", stiffness: 150, damping: 10 }}
              className="relative bg-white/10 backdrop-blur-xl border border-orange-400/30 rounded-3xl overflow-hidden shadow-lg"
            >
              {/* ❤️ Yurakcha */}
              <button
                onClick={() => toggleLike(food, i)}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300"
              >
                <Heart
                  size={26}
                  strokeWidth={2.5}
                  color={isLiked ? "#ff4d4f" : "white"}
                  fill={isLiked ? "#ff4d4f" : "none"}
                  className={`transition-all duration-300 ${
                    isLiked ? "scale-110 drop-shadow-[0_0_10px_#ff4d4f]" : ""
                  }`}
                />
              </button>

              {/* 🍔 Rasm */}
              <motion.img
                src={food.img}
                alt={food.name}
                className="w-full h-52 object-cover rounded-t-3xl transition-transform duration-700 ease-out"
                whileHover={{ scale: 1.05 }}
              />

              {/* 🧡 Ma’lumot */}
              <div className="p-5 text-center flex flex-col items-center gap-2">
                <motion.h3
                  className="text-xl font-bold text-amber-200"
                  whileHover={{ scale: 1.1, color: "#FFD580" }}
                >
                  {food.name}
                </motion.h3>
                <p className="text-yellow-400 font-semibold">
                  {food.price.toLocaleString()} so‘m
                </p>

                {/* 🛒 Tugma */}
                <motion.button
                  onClick={() => {
                    addToCart(food);
                    toast.success(`${food.name} savatga qo‘shildi 🛒`, {
                      style: {
                        background: "#1f1f1f",
                        color: "#fff",
                        border: "1px solid #facc15",
                      },
                    });
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(255,200,100,0.7)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-black font-semibold rounded-full shadow-md"
                >
                  🛒 Savatga qo‘shish
                </motion.button>
              </div>
            </motion.div>
          );
        })}

        {/* ❤️ Uchib ketadigan yurakchalar */}
        {flyingHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ scale: 1, y: 0, opacity: 1 }}
            animate={{ scale: 0, y: -250, x: 280, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-red-500 text-4xl"
            style={{
              top: `${(h.index % 4) * 120 + 200}px`,
              left: `${(h.index % 4) * 250 + 150}px`,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>
    </section>
  );
}
