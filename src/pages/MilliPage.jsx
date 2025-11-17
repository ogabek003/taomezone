import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/food-bg.jpg";

export default function MilliPage({ addToCart }) {
  const images = import.meta.glob("../assets/milli/*.{jpg,png,webp}", {
    eager: true,
    import: "default",
  });

  const imageList = Object.entries(images).map(([path, img]) => {
    const fileName = path.split("/").pop().split(".")[0];
    const formattedName =
      fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, " ");
    const randomPrice = Math.floor(Math.random() * 20000) + 12000; // 12k–32k oralig‘ida narx
    return { img, title: formattedName, price: randomPrice };
  });

  return (
    <section className="relative min-h-screen px-6 py-20 overflow-hidden">
      {/* 🌅 Orqa fon */}
      <motion.img
        src={bgImage}
        alt="Milliy taomlar background"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-red-900/70 to-yellow-800/70 -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gold-scale.png')] opacity-20 -z-10"></div>

      {/* 🌟 Sarlavha */}
      <motion.h2
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-center text-amber-300 mb-14 drop-shadow-[0_0_25px_rgba(255,220,100,0.9)] tracking-wide"
      >
        🍛 Milliy Taomlar
      </motion.h2>

      {/* 🧿 Kartalar grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10"
      >
        {imageList.map(({ img, title, price }, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 50, scale: 0.9 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
            whileHover={{
              scale: 1.08,
              rotate: 0.5,
              boxShadow: "0 0 40px rgba(255,200,100,0.6)",
              transition: { duration: 0.4 },
            }}
            className="group bg-white/10 backdrop-blur-2xl border border-amber-400/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-amber-400/50 transition-all duration-300 cursor-pointer"
          >
            {/* 🥘 Rasm */}
            <motion.div className="relative overflow-hidden">
              <motion.img
                src={img}
                alt={title}
                className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-700 ease-out"
                whileHover={{ scale: 1.15 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>

            {/* 🌿 Ma’lumot */}
            <div className="p-5 text-center">
              <h3 className="text-xl font-bold text-amber-200 mb-2 tracking-wide drop-shadow-md">
                {title}
              </h3>
              <p className="text-orange-300 font-semibold mb-3 text-lg">
                {price.toLocaleString()} so‘m
              </p>

              <motion.button
                whileHover={{
                  scale: 1.1,
                  background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                  boxShadow: "0 0 20px rgba(255,190,50,0.6)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addToCart({ name: title, price, img })}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold shadow-md hover:text-white transition-all duration-300"
              >
                🛒 Savatga qo‘shish
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
