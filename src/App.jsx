
  import"./App.css"
  import { motion } from "framer-motion";
  import toast, { Toaster } from "react-hot-toast";
  import { Moon, Sun } from "lucide-react";
  import { useState, useEffect } from "react";
  import React from "react";
    import DrinksPage from "./pages/DrinksPage";
    import FastFoodPage from "./pages/FastFoodPage";
    import { auth, provider, signInWithPopup, signOut } from "./firebase";
    import AboutPage from "./pages/AboutPage";
    import NotFoundPage from "./pages/NotFoundPage";

    import FavoritesPage from "./pages/FavoritesPage"; // 🔥 yangi sahifa
    import frame from "./assets/frame.png";



    import bg1 from "./assets/bg1.jpg";
    import bg2 from "./assets/bg2.jpg";
    import bg3 from "./assets/bg3.jpg";

  import {
    
    Phone,
    Instagram,
    Send,
    Star,
    Truck,
    MapPin,
    Utensils,
    ShoppingCart,
    Heart
  } from "lucide-react";
  import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
  import bgImage from "./assets/food-bg.jpg";
  
  function Navbar({
    
    cartCount,
    favoritesCount,
    darkMode,
    toggleDarkMode,
    language,
    setLanguage,
  }) {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
  
    useEffect(() => {
      const saved = localStorage.getItem("user");
      if (saved) setUser(JSON.parse(saved));
    }, []);
  
    const handleLogin = async () => {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const userData = { email: result.user.email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success("Marhamat, TaomZone’ga xush kelibsiz! 🍴");
        setShowLogin(false);
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 2500);
      } catch {
        toast.error("❌ Login yoki parol noto‘g‘ri");
      }
    };
  
    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const userData = {
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        toast.success(`Xush kelibsiz, ${userData.name || "Foydalanuvchi"}! 🍴`);
        setShowLogin(false);
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 2500);
      } catch {
        toast.error("❌ Google orqali kirishda xatolik yuz berdi");
      }
    };
  
    const handleLogout = async () => {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("user");
      toast("Tizimdan chiqdingiz!");
    };
  
    const languages = [
      { code: "uz", label: "UZ" },
      { code: "ru", label: "RU" },
      { code: "en", label: "EN" },
    ];
  
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
  
        <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50 transition-colors duration-500">
          <div className="container mx-auto flex justify-between items-center py-4 px-6">
           {/* 🔶 Logo */}
<Link to="/" className="flex items-center space-x-2 group">
  <div className="relative">
    <img
      src="/images/amu.jpg"
      className="w-14 h-14 rounded-full object-cover ring-2 ring-orange-500 
                 shadow-[0_0_20px_rgba(255,140,0,0.6)] transition-transform duration-500 
                 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(255,180,0,0.9)]"
    />
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/20 to-transparent"></div>
  </div>
  <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text 
                   tracking-wide hidden sm:block">
    TAOMZONE
  </span>
</Link>

            {/* 🔹 Navigatsiya menyusi */}
            <ul className="flex gap-6 font-medium text-gray-800 dark:text-gray-200">
              <li>
                <Link
                  to="/fastfood"
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                >
                  {language === "ru"
                    ? "Фастфуд"
                    : language === "en"
                    ? "Fastfood"
                    : "Fastfood"}
                </Link>
              </li>
              <li>
                <Link
                  to="/milli"
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                >
                  {language === "ru"
                    ? "Национальные блюда"
                    : language === "en"
                    ? "National"
                    : "Milliy taomlar"}
                </Link>
              </li>
              <li>
                <Link
                  to="/drinks"
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                >
                  {language === "ru"
                    ? "Напитки"
                    : language === "en"
                    ? "Drinks"
                    : "Ichimliklar"}
                </Link>
              </li>
              <li>
                <Link
                  to="/dessert"
                  className="hover:text-orange-600 dark:hover:text-orange-400"
                >
                  {language === "ru"
                    ? "Десерты"
                    : language === "en"
                    ? "Desserts"
                    : "Shirinliklar"}
                </Link>
              </li>
  
              {/* 🟢 Biz haqimizda */}
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-600 dark:hover:text-orange-400 font-semibold"
                >
                  {language === "ru"
                    ? "О нас"
                    : language === "en"
                    ? "About"
                    : "Biz haqimizda"}
                </Link>
              </li>
            </ul>
  
            {/* 🔸 O‘ng taraf (til, dark mode, login) */}
            <div className="flex items-center gap-4">
              {/* 🌐 Til tanlash */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-500 transition cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
  
              {/* 🌗 Dark Mode */}
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-500 ${
                  darkMode ? "bg-gray-700 justify-end" : "bg-gray-300 justify-start"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
              </button>
  
              {/* ❤️ Yoqtirganlar */}
              <Link
                to="/favorites"
                className="relative group p-2 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 text-white shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-110"
              >
                <motion.div
                  whileHover={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.6 },
                  }}
                  animate={{
                    y: [0, -2, 0],
                    transition: { repeat: Infinity, duration: 1.8 },
                  }}
                >
                  <Heart size={22} fill="currentColor" />
                </motion.div>
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-red-600 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                    {favoritesCount}
                  </span>
                )}
              </Link>
  
              {/* 🛒 Savatcha */}
              {user ? (
                <Link
                  to="/order"
                  className="relative p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition"
                >
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() =>
                    toast.error("❗ Buyurtma berish uchun ro‘yxatdan o‘ting!")
                  }
                  className="relative p-2 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
                >
                  <ShoppingCart size={22} />
                </button>
              )}
  
              {/* 🔐 Login / Logout */}
              {!user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition"
                >
                  Kirish
                </motion.button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Chiqish
                </button>
              )}
            </div>
          </div>
        </nav>
  
        {/* 🧩 Login Modal */}
        {showLogin && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-3xl shadow-2xl text-gray-800 w-80 text-center"
            >
              <h3 className="text-2xl font-bold mb-4 text-orange-600">
                🔐 Tizimga kirish
              </h3>
  
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="password"
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
  
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold shadow-md"
              >
                Kirish
              </motion.button>
  
              {/* 🔵 GOOGLE LOGIN */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleGoogleLogin}
                className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google Icon"
                  className="w-5 h-5"
                />
                Google orqali kirish
              </motion.button>
  
              <button
                onClick={() => setShowLogin(false)}
                className="mt-3 text-gray-500 hover:text-red-500 text-sm"
              >
                ✖ Yopish
              </button>
            </motion.div>
          </motion.div>
        )}
  
        {/* ✅ Muvaffaqiyatli kirish MODAL */}
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[9999]"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center shadow-2xl border-2 border-green-500"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-3">
                ✅ Siz ro‘yxatdan muvaffaqiyatli o‘tdingiz!
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Endi siz buyurtma berishingiz mumkin 🍔
              </p>
            </motion.div>
          </motion.div>
        )}
      </>
      
    );
    
  }
   function Home({ language }) {
    const backgrounds = [bg1, bg2, bg3];
    const [currentBg, setCurrentBg] = useState(0);
    const [showQR, setShowQR] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentBg((prev) => (prev + 1) % backgrounds.length);
      }, 4000);
      return () => clearInterval(interval);
    }, []);
  
    const cards = [
      {
        icon: <Star className="w-10 h-10 text-yellow-300" />,
        title: "Bizning Reyting",
        text: "⭐ 4.9 — mijozlarimizning ishonchi va yuqori baholari!",
        link: "/rating",
      },
      {
        icon: <MapPin className="w-10 h-10 text-red-300" />,
        title: "Manzilimiz",
        text: "📍 Qashqadaryo viloyati, Kitob tumani",
        link: "/location",
      },
      {
        icon: <Utensils className="w-10 h-10 text-orange-300" />,
        title: "Taomlarimiz",
        text: "🍔🥘 Eng mazali fastfood va milliy taomlar!",
        link: "/allfoods",
      },
      {
        icon: <Truck className="w-10 h-10 text-green-300" />,
        title: "24/7 Dastavka",
        text: "🚚 Kun-u tun bepul va tezkor yetkazib berish!",
        link: "/delivery",
      },
    ];
  
    return (
      <div
        className="h-screen w-full overflow-y-scroll scroll-smooth snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* ================== 1️⃣ INTRO SECTION ================== */}
        <section className="snap-start h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-6">
          {/* 🔄 Orqa fon slayder */}
          {backgrounds.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt={`Background ${i}`}
              className="absolute inset-0 w-full h-full object-cover -z-10"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{
                opacity: currentBg === i ? 1 : 0,
                scale: currentBg === i ? 1 : 1.05,
              }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
            />
          ))}
  
{/* 💬 Intro yozuvlari */}
<motion.div
  initial={{ opacity: 0, y: -120, filter: "blur(10px)" }}
  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  className="max-w-3xl text-center text-white px-4"
>
  <motion.h1
    initial={{ opacity: 0, y: -100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.3, ease: "easeOut" }}
    className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight
    bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400 text-transparent bg-clip-text 
    drop-shadow-[0_0_20px_rgba(255,150,50,0.5)]"
  >
    🍴 TAOMZONE’ga xush kelibsiz
  </motion.h1>

  {/* --- Hero yozuv (luxury fon bilan uyg‘un, tepadan chiqib keladi) --- */}
  <motion.div
    className="mt-4 text-center relative z-20"
    initial={{ opacity: 0, y: -80 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
  >
    {/* 💫 Orqa fon nur effekti */}
    <div className="absolute inset-0 flex justify-center items-center -z-10">
      <div className="w-[600px] h-[220px] bg-gradient-to-r from-orange-500/30 via-yellow-400/20 to-red-500/30 blur-3xl rounded-full opacity-80"></div>
    </div>

    {/* 🌈 Shaffof oynali yozuvlar qutisi */}
    <motion.div
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, delay: 0.5, ease: "easeOut" }}
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 sm:p-10 shadow-2xl max-w-3xl mx-auto"
    >
      <motion.h2
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.02 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight 
                   bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 
                   text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(255,180,80,0.4)]"
      >
        Har bir luqmada —{" "}
        <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]">
          lazzatning uyg‘unligi
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="max-w-2xl mx-auto mt-4 text-sm md:text-lg text-white/90 leading-relaxed font-light"
      >
        Mahalliy mahsulotlardan tayyorlangan, sevgi va e’tibor bilan bezatilgan
        taomlarimiz sizni unutilmas{" "}
        <span className="text-yellow-300 font-semibold">ta’m sayohatiga</span>{" "}
        chorlaydi. Har bir taom — bizning san’atimiz va mehrimiz timsoli.
      </motion.p>
    </motion.div>
  </motion.div>

  {/* 🔘 QR Kod tugmasi (pastdan chiqib keladi) */}
  <motion.button
    onClick={() => setShowQR(true)}
    initial={{ opacity: 0, y: 80 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
    whileHover={{
      scale: 1.08,
      boxShadow: "0 0 25px rgba(255,180,0,0.8)",
    }}
    whileTap={{ scale: 0.95 }}
    className="mt-10 px-7 py-3 rounded-full text-base md:text-lg font-semibold tracking-wide
               bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
               text-black shadow-[0_0_25px_rgba(255,150,50,0.6)] hover:scale-105
               hover:from-yellow-300 hover:to-orange-400 transition-all duration-300"
  >
    📱 QR Kod orqali buyurtma berish
  </motion.button>
</motion.div>
{/* 🔳 QR Modal */}
{showQR && (
  <motion.div
    className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white p-8 rounded-3xl shadow-2xl text-gray-800 relative overflow-hidden"
    >
      <button
        onClick={() => setShowQR(false)}
        className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl"
      >
        ✖
      </button>

      {/* 🔸 Sarlavha */}
      <h3 className="text-3xl font-bold mb-6 text-center text-orange-600">
        📲 TAOMZONE 
      </h3>

      {/* 🔆 QR rasm (mahalliy frame.png dan) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <img
          src={frame}
          alt="QR menu"
          className="w-60 h-60 mx-auto rounded-2xl shadow-xl border border-gray-200"
        />

        {/* 💡 Yorug‘lik effekti (Apple-style nur chizig‘i) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent blur-md animate-pulse"></div>
      </motion.div>

      <p className="text-center mt-4 text-gray-600 text-lg">
        📸 Kamerangizni QR kodga yo‘naltiring
      </p>
    </motion.div>
  </motion.div>
)}


          {/* 👇 Scroll indikatori */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-10 text-white/70 text-sm font-light"
          >
            ↓ Pastga suring
          </motion.div>
        </section>
  
        {/* ================== 2️⃣ CARD SECTION ================== */}
        <section className="snap-start h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-6 relative">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold mb-16 
                       bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 text-transparent bg-clip-text"
          >
            Bizning Afzalliklarimiz
          </motion.h2>
  
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(255,255,255,0.4)",
                }}
                whileTap={{ scale: 0.96 }}
                className="rounded-2xl shadow-2xl p-6 text-center cursor-pointer 
                           bg-white/10 backdrop-blur-md border border-white/20
                           hover:bg-white/20 hover:shadow-2xl transition-all duration-500"
              >
                <Link to={card.link}>
                  <div className="flex justify-center mb-4">{card.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {card.title}
                  </h3>
                  <p className="text-white/85 leading-relaxed text-base">
                    {card.text}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
        {/* ================== IZOH (COMMENT) BO‘LIMI ================== */}
<section className="snap-start h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-6 relative overflow-hidden">
  <motion.h2
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="text-4xl md:text-5xl font-extrabold mb-12 text-center 
               bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 text-transparent bg-clip-text"
  >
    Mehmonlarimiz fikrlari
  </motion.h2>

  {/* 🔄 Yon tomondan aylanadigan izohlar */}
  <div className="relative w-full max-w-6xl overflow-hidden mb-10">
    <motion.div
      animate={{ x: ["0%", "-100%"] }}
      transition={{
        repeat: Infinity,
        duration: 30,
        ease: "linear",
      }}
      className="flex gap-6 w-[200%]"
    >
      {[...Array(2)].flatMap((_, loop) =>
        [
          {
            name: "Malika Rasulova",
            text: "Atmosfera zo‘r! Taomlar ham issiq, ham juda chiroyli taqdim etilgan 👌",
            stars: 5,
            date: "2025-10-30",
          },
          {
            name: "Javohir Akbarov",
            text: "Burgerlari juda yumshoq, sousi ham juda yoqimli ta’mda.",
            stars: 4,
            date: "2025-11-01",
          },
          {
            name: "Nilufar Mamatova",
            text: "Shirinliklar shunchaki ajoyib! Qayta kelaman albatta 😋",
            stars: 5,
            date: "2025-11-02",
          },
          {
            name: "Bekzod Karim",
            text: "Xizmat darajasi yuqori, ofitsiantlar samimiy va e’tiborli.",
            stars: 5,
            date: "2025-10-29",
          },
          {
            name: "Dildora S.",
            text: "Interyer zamonaviy va qulay, oilaviy dam olish uchun ideal joy!",
            stars: 5,
            date: "2025-10-28",
          },
          {
            name: "Ibrohimxo‘ja",
            text: "Lavashni birinchi marta bu darajada mazali yedim 👏",
            stars: 5,
            date: "2025-11-02",
          },
        ].map((c, i) => (
          <div
            key={`${loop}-${i}`}
            className="bg-white/10 border border-white/20 rounded-3xl shadow-xl p-6 min-w-[300px] md:min-w-[340px] backdrop-blur-md hover:bg-white/20 transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-yellow-300">
                {c.name}
              </h4>
              <span className="text-sm text-gray-400">{c.date}</span>
            </div>
            <div className="text-yellow-400 mb-2">
              {"⭐".repeat(c.stars)}
            </div>
            <p className="text-white/90 text-sm">{c.text}</p>
          </div>
        ))
      )}
    </motion.div>
  </div>

  {/* 💬 Fikr yozish formasi */}
  <motion.form
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2 }}
    onSubmit={(e) => {
      e.preventDefault();
      toast.success("✅ Fikringiz yuborildi!");
      e.target.reset();
    }}
    className="w-full max-w-lg bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl"
  >
    <h3 className="text-2xl font-bold text-center text-yellow-400 mb-5">
      O‘z fikringizni qoldiring ✍️
    </h3>
    <input
      type="text"
      name="name"
      placeholder="Ismingiz"
      maxLength="25"
      className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
    <textarea
      name="text"
      placeholder="Izohingiz..."
      maxLength="100"
      rows="3"
      className="w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />
    <div className="flex justify-center mt-5">
      <button
        type="submit"
        className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 font-semibold text-black shadow-[0_0_20px_rgba(255,150,50,0.5)] hover:scale-105 transition-transform duration-300"
      >
        Yuborish
      </button>
    </div>
  </motion.form>
  
</section>

       
      </div>
    );
  }
    function AllFoodsPage({ addToCart }) {
    // 🖼 Rasm fayllari
    const fastfoodImages = import.meta.glob("./assets/fastfood/*.{jpg,png}", {
      eager: true,
      import: "default",
    });
    const milliImages = import.meta.glob("./assets/milli/*.{jpg,png}", {
      eager: true,
      import: "default",
    });
    const ichimlikImages = import.meta.glob("./assets/drinks/*.{jpg,png}", {
      eager: true,
      import: "default",
    });
    const shirinlikImages = import.meta.glob("./assets/desserts/*.{jpg,png}", {
      eager: true,
      import: "default",
    });

    // 🧾 Nomi ro‘yxatlari
    const fastfoodNames = [
      "Burger",
      "Lavash",
      "Hot-Dog",
      "Fri Kartoshka",
      "Pizza",
      "Shaurma",
      "BBQ Pizza",
      "Donar",
      "Vaucher",
      "Mix Set",
      "Combo Menu",
      "Tandir Lavash",
    ];
    const milliNames = [
      "Palov",
      "Manti",
      "Lag'mon",
      "Norin",
      "Shashlik",
      "Somsa",
      "Kabob",
      "Tandir Go‘sht",
      "Chuchvara",
      "Qovurma Lag‘mon",
    ];
    const ichimlikNames = [
      "Coca-Cola",
      "Fanta",
      "Pepsi",
      "Sprite",
      "Sharbat",
      "Mineral suv",
      "Limonad",
      "Choy",
      "Kofe",
    ];
    const shirinlikNames = [
      "Tort",
      "Napoleon",
      "Medovik",
      "Donut",
      "Muffin",
      "Cheesecake",
      "Shokoladli pirojnoe",
      "Kremli rolik",
    ];

    // 🧩 Hammasini birlashtirish
    const allImages = [
      ...Object.values(fastfoodImages).map((img, i) => ({
        img,
        title: fastfoodNames[i] || `Fastfood ${i + 1}`,
        price: (15000 + i * 1000).toLocaleString() + " so'm",
      })),
      ...Object.values(milliImages).map((img, i) => ({
        img,
        title: milliNames[i] || `Milliy taom ${i + 1}`,
        price: (20000 + i * 1500).toLocaleString() + " so'm",
      })),
      ...Object.values(ichimlikImages).map((img, i) => ({
        img,
        title: ichimlikNames[i] || `Ichimlik ${i + 1}`,
        price: (8000 + i * 500).toLocaleString() + " so'm",
      })),
      ...Object.values(shirinlikImages).map((img, i) => ({
        img,
        title: shirinlikNames[i] || `Shirinlik ${i + 1}`,
        price: (10000 + i * 800).toLocaleString() + " so'm",
      })),
    ];
  <motion.button
    onClick={() => {
      setFavorites([...favorites, item]);
      toast.success(`${item.title} yoqtirilganlarga qo‘shildi ❤️`, {
        style: {
          background: "#1f1f1f",
          color: "#fff",
          border: "1px solid #f87171",
          boxShadow: "0 0 15px rgba(255,100,100,0.5)",
        },
      });
    }}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-xl"
  >
    ❤️ Yoqtirish
  </motion.button>

    // ⚙️ Kichik animatsiya variantlari
    const cardVariant = {
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
      <section className="min-h-screen relative px-6 py-20 text-white overflow-hidden">
        {/* 🌈 Fon oqimi */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-800 via-red-900 to-yellow-800 -z-10 blur-sm"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        {/* ✨ Yorug‘lik to‘lqini effekti */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -z-10"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 🏷 Sarlavha */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl font-extrabold text-amber-300 drop-shadow-[0_0_25px_rgba(255,200,100,0.7)]">
            🍽 Hamma Taomlar
          </h2>
          <p className="text-gray-200 mt-3 text-lg italic">
            Fastfood, milliy taomlar, ichimliklar va shirinliklar — barchasi bir joyda!
          </p>
        </motion.div>

        {/* 🍔 Kartalar grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {allImages.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{
                rotateY: 6,
                rotateX: -3,
                scale: 1.07,
                boxShadow: "0 0 35px rgba(255,200,100,0.6)",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
              className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl cursor-pointer group"
            >
              {/* ✨ Light reflection */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"
              />

              {/* 🍕 Rasm */}
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />

              {/* 📄 Matn */}
              <div className="p-5 flex flex-col items-center text-center gap-2">
                <motion.h3
                  className="text-white font-bold text-lg drop-shadow-lg"
                  whileHover={{ scale: 1.1, color: "#FFD580" }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-gray-200 text-sm">{item.price}</p>

                <motion.button
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.title} savatga qo‘shildi!`, {
                      style: {
                        background: "#1f1f1f",
                        color: "#fff",
                        border: "1px solid #facc15",
                        boxShadow: "0 0 15px rgba(255,200,100,0.5)",
                      },
                    });
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#fbbf24",
                    boxShadow: "0 0 20px rgba(255,200,100,0.8)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="mt-2 bg-amber-500 text-black font-medium px-4 py-2 rounded-xl transition-all"
                >
                  Savatga qo‘shish 🛒
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    );
  }

  function MilliPage({ addToCart }) {
    const images = import.meta.glob("./assets/milli/*.{jpg,png}", {
      eager: true,
      import: "default",
    });

    // Rasmlar va nomlarni olish
    const imageList = Object.entries(images).map(([path, img]) => {
      const fileName = path.split("/").pop().split(".")[0];
      const formattedName =
        fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, " ");
      return {
        img,
        name: formattedName,
        price: Math.floor(25000 + Math.random() * 20000), // Tasodifiy narx
      };
    });

    return (
      <section className="relative min-h-screen px-6 py-20 overflow-hidden">
        {/* 🍲 Orqa fon */}
        <img
          src={bgImage}
          alt="Milliy taomlar background"
          className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/70 via-red-900/60 to-yellow-800/60 -z-10"></div>

        {/* 🍲 Sarlavha */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-center text-yellow-300 mb-12 drop-shadow-[0_0_15px_rgba(255,200,0,0.9)]"
        >
          🍲 Milliy Taomlar
        </motion.h2>

        {/* 🍲 Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 z-10"
        >
          {imageList.map((food, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{
                scale: 1.07,
                rotate: 0.5,
                boxShadow: "0 0 25px rgba(255,180,0,0.4)",
              }}
              className="bg-white/10 dark:bg-gray-800/70 backdrop-blur-lg border border-yellow-400/30 rounded-2xl overflow-hidden shadow-md hover:shadow-yellow-500/30 transition-all cursor-pointer"
            >
              <img
                src={food.img}
                alt={food.name}
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-yellow-200 mb-2">
                  {food.name}
                </h3>
                <p className="text-orange-400 font-bold mb-3">
                  {food.price.toLocaleString()} so‘m
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    addToCart(food);
                    toast.success(`${food.name} savatga qo‘shildi!`);
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md"
                >
                  🛒 Savatga qo‘shish
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    );
  }function ShirinliklarPage({ addToCart }) {
    // 1️⃣ Rasm fayllarni yuklaymiz
    const dessertImages = import.meta.glob("./assets/desserts/*.{jpg,png,webp}", {
      eager: true,
      import: "default",
    });
  
    // 2️⃣ Har bir rasmni nom va narx bilan chiqaramiz
    const shirinliklar = Object.entries(dessertImages).map(([path, img], i) => {
      const name = path.split("/").pop().split(".")[0].replace(/_/g, " ");
      return {
        id: 2000 + i,     // ✅ unikal ID
        name,            // ✅ name (title emas!)
        title: name,     // fallback uchun
        img,             // ✅ rasm
        price: 15000 + i * 2000, // ✅ price number KO‘RINISHIDA
        size: null,      // ✅ addToCart formatiga mos kelishi uchun
      };
    });
  
    return (
      <section className="min-h-screen relative px-6 py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-red-900 to-orange-700 animate-gradient-move -z-10"></div>
  
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-extrabold text-pink-300 drop-shadow-lg">
            🍰 Barcha Shirinliklar Siz Uchun
          </h2>
          <p className="text-gray-300 mt-3 text-lg italic">
            Har bir luqma — zavq va shirinlik uyg‘unligi 🤍
          </p>
        </motion.div>
  
        {/* ✅ Shirinliklar grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 relative z-10">
          {shirinliklar.map((item, index) => (
            <motion.div
              key={item.id}  // ✅ endi unikal ID
              className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
              whileHover={{ scale: 1.08, rotate: Math.random() > 0.5 ? 1.5 : -1.5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-110"
              />
  
              <div className="p-4 text-center">
                <h3 className="text-pink-300 font-semibold text-lg group-hover:text-white transition-all">
                  {item.title}
                </h3>
  
                <p className="text-gray-200 mt-1">
                  {item.price.toLocaleString()} so‘m
                </p>
  
                <motion.button
                  onClick={() => addToCart(item)} // ✅ endi addToCart 100% to‘g‘ri ishlaydi
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-3 w-full bg-gradient-to-r from-pink-500 to-orange-400 text-black px-3 py-1 rounded-lg font-medium hover:from-pink-400 hover:to-orange-300 transition-all"
                >
                  Savatga qo‘shish 🛒
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }
    
  function FastfoodPage({ addToCart }) {
    // 📂 Fastfood papkadagi barcha rasmlar
    const images = import.meta.glob("./assets/fastfood/*.{jpg,png}", {
      eager: true,
      import: "default",
    });
    const imageList = Object.values(images);

    return (
      <section className="min-h-screen relative px-6 py-20">
        {/* 🔥 Orqa fon */}
        <img
          src={bgImage}
          alt="Fastfood background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        {/* 🔥 Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-orange-900/70 to-yellow-800/70 -z-10"></div>
        {/* 🔥 Naqsh (pattern) */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-20 -z-10"></div>

        {/* 🔥 Sarlavha */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-orange-300 text-center mb-12 drop-shadow-[0_0_15px_rgba(255,165,0,0.9)]"
        >
          🍔 Fastfood Taomlari
        </motion.h2>

        {/* 🔥 Gridda rasmlar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 relative z-10"
        >
          {imageList.map((img, index) => (
            <FoodCard
              key={index}
              img={img}
              title={`Fastfood ${index + 1}`}
              addToCart={addToCart}
            />
          ))}
        </motion.div>
      </section>
    );
  }

  function RatingPage() {
    const reviews = [
      { name: "Dilshod", text: "Taomlar juda mazali, xizmat zo‘r!", rating: 5 },
      { name: "Malika", text: "Atmosfera yoqdi, hamma narsasi a’lo.", rating: 4 },
      { name: "Jasur", text: "Yetkazib berish tez va sifatli 👍", rating: 5 },
      { name: "Sevinch", text: "Narxlar hamyonbop va xizmat yaxshi.", rating: 4 },
    ];
  
    const images = [
      "/reviews/review1.jpg",
      "/reviews/review2.jpg",
      "/reviews/review3.jpg",
    ];
  
    const [current, setCurrent] = React.useState(0);
  
    React.useEffect(() => {
      const interval = setInterval(
        () => setCurrent((prev) => (prev + 1) % images.length),
        3000
      );
      return () => clearInterval(interval);
    }, []);
  
    return (
      <section className="min-h-screen relative flex justify-center items-center px-6 py-16 text-white overflow-hidden">
        {/* 🔮 Dynamic gradient background */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(255,80,0,0.2), transparent 25%)," +
              "radial-gradient(circle at 90% 80%, rgba(255,220,0,0.15), transparent 25%)," +
              "linear-gradient(135deg, #0f0f10, #1a1a1c, #0b0b0d)",
            backgroundSize: "200% 200%",
            filter: "saturate(1.2) brightness(0.95)",
          }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[80px] -z-10"></div>
  
        {/* 💎 Main card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,180,70,0.25)] max-w-3xl w-full p-8 text-center"
        >
          <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,150,60,0.4)]">
            ⭐️🍴 TAOMZONE Reytinglari
          </h2>
  
          {/* 🖼 Slideshow */}
          <div className="w-full h-64 mb-8 overflow-hidden rounded-2xl border border-white/20 shadow-[0_0_25px_rgba(255,200,100,0.2)] flex justify-center items-center">
            <motion.img
              key={current}
              src={images[current]}
              alt="Review"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
  
          {/* 👇 Reviews */}
          <motion.div
            className="space-y-4 text-left"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(255,180,80,0.25)",
                }}
                className="bg-white/10 border border-white/10 p-5 rounded-2xl shadow-inner hover:shadow-[0_0_30px_rgba(255,150,60,0.2)] transition-all"
              >
                <p className="text-gray-200 italic mb-3">“{r.text}”</p>
                <div className="flex items-center gap-2">
                  {Array(r.rating)
                    .fill()
                    .map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <Star
                          className="text-yellow-400 drop-shadow-[0_0_6px_rgba(255,255,150,0.5)]"
                          size={20}
                          fill="currentColor"
                        />
                      </motion.div>
                    ))}
                  <span className="text-sm text-gray-400 ml-1">— {r.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    );
  }
 
function LocationPage() {
  return (
    <section className="min-h-screen relative flex flex-col justify-center items-center px-6 py-16 text-white overflow-hidden">
      {/* 🔮 Animated aurora gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255,100,0,0.2), transparent 25%)," +
            "radial-gradient(circle at 90% 80%, rgba(255,200,0,0.15), transparent 25%)," +
            "linear-gradient(135deg, #0d0d0e, #18181a, #101012)",
          backgroundSize: "200% 200%",
          filter: "saturate(1.2) brightness(0.9)",
        }}
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[70px] -z-10"></div>

      {/* 💎 Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,150,60,0.25)] max-w-4xl w-full p-8 text-center"
      >
        <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,180,60,0.4)] animate-pulse">
          📍 Bizning Manzil
        </h2>

        {/* 🗺 Google Maps */}
        <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,200,100,0.25)] border border-white/10 mb-8">
          <iframe
            title="Qashqadaryo Kitob tumani"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5989.304745419249!2d66.8789203!3d39.1231588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4c9c4cdcb6a7a7%3A0xa7f00d1c8f56c2b7!2sKitob%2C%20Qashqadaryo%20Region!5e0!3m2!1sen!2suz!4v1696512345678!5m2!1sen!2suz"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* 📌 Info Text */}
        <p className="mt-4 text-gray-200 text-lg font-medium">
          📌 <span className="text-orange-400 font-semibold">Manzil:</span> Qashqadaryo viloyati, Kitob tumani
          <br />
          🚖 <span className="text-orange-400 font-semibold">Yetkazib berish xizmati:</span>{" "}
          <span className="text-yellow-400 font-bold">24/7</span>
        </p>
      </motion.div>
    </section>
  );
}

function OrderPage({ cart, setCart }) {
  const [form, setForm] = useState({
    name: "",
    phone: "+998 ",
    address: "",
    payment: "Naqd",
    promo: "",
    map: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const orderId = Math.floor(100000 + Math.random() * 900000);
  const deliveryTime = "20–30 daqiqa";

  const total = cart.reduce((sum, el) => sum + el.price * el.quantity, 0);
  const discount = form.promo.toLowerCase() === "food10" ? total * 0.1 : 0;
  const finalTotal = total - discount;

  // ✅ Telefon formatlash (+998 XX XXX XX XX)
  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");
    if (!digits.startsWith("998")) digits = "998" + digits;
    digits = digits.slice(0, 12);

    return (
      "+998 " +
      digits.slice(3, 5) +
      " " +
      digits.slice(5, 8) +
      " " +
      digits.slice(8, 10) +
      " " +
      digits.slice(10, 12)
    ).trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert("Iltimos barcha maydonlarni to‘ldiring!");
      return;
    }
    setSubmitted(true);

    setTimeout(() => {
      setCart([]);
      window.location.href = "/";
    }, 5000);
  };

  // ✅ Buyurtma qabul qilingan oynasi
  if (submitted) {
    return (
      <section className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-12 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10 opacity-40"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(255,100,0,0.15), transparent 20%), radial-gradient(circle at 80% 80%, rgba(255,180,70,0.15), transparent 25%)",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center max-w-md w-full border border-white/20">
          <h2 className="text-2xl font-bold text-green-400 mb-3">
            ✅ Buyurtma qabul qilindi!
          </h2>
          <p className="text-gray-200 mb-1">Buyurtma raqami: {orderId}</p>
          <p className="text-gray-200 mb-2">
            Yetkazib berish vaqti: {deliveryTime}
          </p>
          <p className="text-sm text-gray-400">
            5 soniya ichida asosiy sahifaga qaytasiz...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative flex justify-center items-center px-6 py-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(20,20,25,1), rgba(30,30,35,1)), radial-gradient(circle at 30% 50%, rgba(255,100,0,0.1), transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,200,100,0.08), transparent 40%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
        
        {/* ✅ Ortga qaytish */}
        <button
          onClick={() => (window.location.href = "/")}
          className="mb-4 text-white underline hover:text-orange-400"
        >
          ← Ortga qaytish
        </button>

        <h2 className="text-3xl font-extrabold text-orange-400 mb-6 text-center">
          🛒 Sizning buyurtmangiz
        </h2>

        {/* ✅ Savat bo‘sh bo‘lsa */}
        {cart.length === 0 ? (
          <p className="text-gray-200 text-center text-lg">
            😔 Savat bo‘sh...
          </p>
        ) : (
          <>
            {/* ✅ Savat itemlari (rasm + nom + narx) */}
            <ul className="divide-y divide-gray-600/20 mb-6">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex items-center gap-4">
                  <img
                    src={item.img}
                    className="w-20 h-20 rounded-xl object-cover border border-white/20"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">
                      {item.name || item.title}
                    </h3>
                    <p className="text-sm text-gray-300">× {item.quantity}</p>
                  </div>

                  <p className="text-orange-400 font-bold">
                    {(item.price * item.quantity).toLocaleString()} so‘m
                  </p>
                </li>
              ))}
            </ul>

            {/* ✅ Savatni tozalash */}
            <button
              onClick={() => setCart([])}
              className="mb-4 text-red-400 underline"
            >
              Savatni tozalash ✖
            </button>

            {/* ✅ Jami narx */}
            <p className="text-lg font-bold text-center text-red-400">
              Jami: {finalTotal.toLocaleString()} so‘m
            </p>

            {/* ✅ Forma */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <input
                type="text"
                placeholder="👤 Ism"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border border-white/30 bg-white/10 text-gray-100 rounded-lg px-4 py-2"
              />

              <input
                type="tel"
                placeholder="📞 Telefon"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: formatPhone(e.target.value) })
                }
                className="w-full border border-white/30 bg-white/10 text-gray-100 rounded-lg px-4 py-2"
              />

              <textarea
                placeholder="📦 Manzil"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full border border-white/30 bg-white/10 text-gray-100 rounded-lg px-4 py-2"
              />

              <input
                type="text"
                placeholder="🎁 Promo kod (food10)"
                value={form.promo}
                onChange={(e) =>
                  setForm({ ...form, promo: e.target.value })
                }
                className="w-full border border-white/30 bg-white/10 text-gray-100 rounded-lg px-4 py-2"
              />

              <select
                value={form.payment}
                onChange={(e) =>
                  setForm({ ...form, payment: e.target.value })
                }
                className="w-full bg-white/10 border border-white/30 text-gray-100 px-4 py-2 rounded-lg"
              >
                <option>Naqd</option>
                <option>Karta</option>
                <option>Payme</option>
                <option>Click</option>
              </select>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                ✅ Buyurtmani tasdiqlash
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
function DeliveryPage() {
  const items = [
    {
      icon: "✅",
      color: "text-green-400",
      text: "Kitob tumani bo‘ylab bepul yetkazib berish",
      clickText: "🚚 Yetkazib berish 30 daqiqada!",
    },
    {
      icon: "🔥",
      color: "text-yellow-400",
      text: "Issiq va sifatli taom kafolati 🍔",
      clickText: "😋 Har doim issiq va yangi taom!",
    },
    {
      icon: "⏰",
      color: "text-blue-400",
      text: "24/7 xizmat — har vaqt buyurtma bera olasiz",
      clickText: "📞 Biz 24/7 buyurtmalarni qabul qilamiz!",
    },
  ];

  return (
    <section className="min-h-screen relative flex flex-col justify-center items-center px-6 py-20 text-white overflow-hidden">
      {/* 🌌 Animated background (aurora gradient) */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255,120,0,0.25), transparent 25%)," +
            "radial-gradient(circle at 80% 80%, rgba(255,230,100,0.15), transparent 25%)," +
            "linear-gradient(135deg, #0a0a0a, #161616, #0e0e0e)",
          backgroundSize: "200% 200%",
        }}
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[70px] -z-10"></div>

      {/* 🚚 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,150,60,0.25)] max-w-4xl w-full p-10 text-center"
      >
        <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,150,60,0.6)]">
          🚚 24/7 Dastavka
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="text-xl mb-10 leading-relaxed text-gray-200"
        >
          Buyurtmangizni{" "}
          <span className="font-extrabold text-orange-400 drop-shadow-[0_0_10px_rgba(255,140,0,1)]">
            30 daqiqa
          </span>{" "}
          ichida yetkazib beramiz! 🌙☀️
        </motion.p>

        {/* 📋 Delivery Features */}
        <ul className="space-y-6 text-left max-w-lg mx-auto">
          {items.map((item, idx) => (
            <motion.li
              key={idx}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toast.success(item.clickText)}
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition rounded-2xl px-6 py-5 shadow-lg cursor-pointer group border border-white/10"
            >
              <motion.span
                whileTap={{ scale: 1.4, rotate: 20 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`${item.color} text-3xl drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] group-hover:scale-125 transition`}
              >
                {item.icon}
              </motion.span>
              <span className="text-lg font-semibold text-gray-100 group-hover:text-orange-300 transition-all duration-300">
                {item.text}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
export default function App() {
  const [cart, setCart] = useState([]);
  const [language, setLanguage] = useState("uz");
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : true;
  });

  // 🌐 Internet tekshiruv
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // ⚠️ Internet yo‘q bo‘lsa — NotFoundPage
  if (!isOnline) {
    return <NotFoundPage />;
  }

  // 🌗 Dark Mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // ✅✅✅ TUZATILGAN SAVATGA QO‘SHISH (1 ta ham joying buzilmaydi)
  const addToCart = (item) => {
    const existing = cart.find(
      (c) => c.name === item.name && c.size === item.size
    );

    if (existing) {
      setCart(
        cart.map((c) =>
          c.name === item.name && c.size === item.size
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // ❤️ Yoqtirganlar
  const addToFavorites = (food) => {
    setFavorites((prev) => [...prev, food]);
  };

  return (
    <Router>
      {/* ✅ Navbar */}
      <Navbar
        cartCount={cart.reduce((sum, c) => sum + c.quantity, 0)}
        favoritesCount={favorites.length}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        language={language}
        setLanguage={setLanguage}
      />

      {/* 🔔 Toaster */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* 🔧 Asosiy qism */}
      <main className="transition-colors duration-700 text-gray-900 dark:text-gray-100 min-h-screen">
        <div className="pt-[72px]">
          <Routes>
            <Route path="/" element={<Home language={language} />} />

            <Route
              path="/fastfood"
              element={
                <FastFoodPage
                  addToCart={addToCart}
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                />
              }
            />

            <Route
              path="/milli"
              element={
                <MilliPage
                  addToCart={addToCart}
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                />
              }
            />

            <Route
              path="/order"
              element={<OrderPage cart={cart} setCart={setCart} />}
            />

            <Route path="/rating" element={<RatingPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />

            <Route
              path="/allfoods"
              element={
                <AllFoodsPage
                  addToCart={addToCart}
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                />
              }
            />

            <Route
              path="/dessert"
              element={
                <ShirinliklarPage
                  addToCart={addToCart}
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                />
              }
            />

            <Route
              path="/drinks"
              element={
                <DrinksPage
                  addToCart={addToCart}
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                />
              }
            />

            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  addToFavorites={addToFavorites}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}
