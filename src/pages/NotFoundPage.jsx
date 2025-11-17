import React from "react";
import { motion } from "framer-motion";
import { WifiOff } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#0d0d0d] via-[#161616] to-[#1a1a1a] text-white text-center px-6 relative">
      
      {/* 🔄 Loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="w-28 h-28 border-8 border-gray-700 border-t-red-500 rounded-full mb-8 shadow-[0_0_25px_rgba(255,0,0,0.5)]"
      ></motion.div>

      {/* 🚫 Internet yo‘q */}
      <WifiOff size={80} className="text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-red-400 mb-2">
        Internet ulanmagan!
      </h1>
      <p className="text-gray-400 max-w-md mx-auto">
        Iltimos, tarmoqni tekshiring va qayta urinib ko‘ring.  
        Internet yo‘q bo‘lgani uchun sayt vaqtincha ishlamayapti.
      </p>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.reload()}
        className="mt-8 bg-gradient-to-r from-red-500 to-orange-500 
                   text-white px-6 py-3 rounded-full font-semibold shadow-lg 
                   hover:shadow-red-600/40 transition"
      >
        Qayta urinish 🔁
      </motion.button>

      {/* 🌌 Fon effekt */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-400/10 blur-3xl pointer-events-none"></div>
    </div>
  );
}

export default NotFoundPage;
