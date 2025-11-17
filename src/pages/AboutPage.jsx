import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Send, Phone, LogOut } from "lucide-react";

function AboutPage() {
  const images = [
    "/images/about1.jpg",
    "/images/about2.jpg",
    "/images/about3.jpg",
    "/images/about4.jpg",
    "/images/about5.jpg",
    "/images/about6.jpg",
  ];

  const [index, setIndex] = useState(0);

  // 🔁 Slayder avtomatik o‘zgaradi
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // 🚫 Faqat yon scrollni o‘chiradi
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
      document.documentElement.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0d0d0d] via-[#161616] to-[#1a1a1a] text-white overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        
        {/* 🔶 Sarlavha */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-6 drop-shadow-lg"
        >
          🍴 Biz haqimizda
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mb-10 leading-relaxed text-gray-300 max-w-3xl mx-auto"
        >
          <strong className="text-orange-400">TaomZone</strong> — zamonaviy fastfood
          va milliy taomlar restorani. Biz 2021-yilda Toshkent shahrida
          ochilganmiz va minglab mijozlarga sifatli taomlar taqdim etib kelmoqdamiz.
          Bizning maqsad — har bir mijoz uchun qulaylik, lazzat va ishonchni ta’minlash! 🍕🍔
        </motion.p>

        {/* 🖼 Slayder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,140,0,0.4)] mb-16"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt={`Slayder ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* 🔘 Slayder indikatorlari */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i === index ? 1.3 : 1,
                  opacity: i === index ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
                className={`w-3 h-3 rounded-full ${
                  i === index ? "bg-orange-500" : "bg-gray-600"
                }`}
              ></motion.div>
            ))}
          </div>
        </motion.div>

        {/* 🕰 Restoran ma’lumotlari */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-[#1b1b1b]/80 border border-[#333] rounded-3xl p-8 shadow-lg mb-16"
        >
          <h2 className="text-2xl font-bold text-orange-400 mb-3">
            Restoran haqida qisqacha
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <strong>TaomZone</strong> 2021-yil 17-iyun kuni ochilgan.  
            Biz Toshkent shahri, Yunusobod tumanida joylashganmiz.  
            Bizda professional oshpazlar, shirinlik ustalari va mijozlarga
            do‘stona jamoa ishlaydi.  
            🕘 Ish vaqti: har kuni 09:00 — 23:00.
          </p>
        </motion.div>

        {/* 📞 Kontakt bloklari */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center items-center mb-16"
        >
          {/* Telegram */}
          <motion.a
            href="https://t.me/sheyx713"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl 
                       flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-blue-700/50 transition"
          >
            <Send size={34} />
            <span className="mt-2 font-semibold">Telegram</span>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            className="bg-gradient-to-br from-pink-600 to-pink-500 text-white rounded-2xl 
                       flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-pink-700/50 transition"
          >
            <Instagram size={34} />
            <span className="mt-2 font-semibold">Instagram</span>
          </motion.a>

          {/* Telefon */}
          <motion.a
            href="tel:+998906746212"
            whileHover={{ scale: 1.08 }}
            className="bg-gradient-to-br from-green-600 to-green-500 text-white rounded-2xl 
                       flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-green-700/50 transition"
          >
            <Phone size={34} />
            <span className="mt-2 font-semibold">+998 90 674 62 12</span>
          </motion.a>

          {/* Profil */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-2xl 
                       flex flex-col items-center justify-center p-6 shadow-lg hover:shadow-gray-600/50 transition"
          >
            <img
              src="/images/amu.jpg"
              alt="Profil"
              className="w-16 h-16 rounded-full mb-3 border-2 border-orange-400 object-cover"
            />
            <span className="font-semibold">Profil</span>
            <motion.button  
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => (window.location.href = "/")}
              className="mt-3 bg-gradient-to-r from-red-500 to-orange-500 px-4 py-1 rounded-lg 
                         text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition"
            >
              <LogOut size={16} /> Chiqish
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutPage;
