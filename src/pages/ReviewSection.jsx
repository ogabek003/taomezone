import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

function ReviewSection() {
  const [reviews, setReviews] = useState([
    { name: "Ali", rating: 5, text: "Taomlar juda mazali! 😋" },
    { name: "Malika", rating: 4, text: "Tez yetkazish xizmati yoqdi 🚀" },
    { name: "Jasur", rating: 5, text: "Servis zo‘r, yana buyurtma beraman!" },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text || !newReview.rating) return;
    setReviews([...reviews, newReview]);
    setNewReview({ name: "", text: "", rating: 0 });
  };

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-white py-16 px-6 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold mb-10 text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]"
      >
        ⭐ Foydalanuvchilar izohlari
      </motion.h2>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center max-w-xl w-full shadow-[0_0_25px_rgba(255,140,0,0.4)]"
      >
        <h3 className="text-2xl font-semibold text-orange-300 mb-2">
          {reviews[currentIndex].name}
        </h3>
        <div className="flex justify-center mb-4">
          {[...Array(reviews[currentIndex].rating)].map((_, i) => (
            <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
          ))}
        </div>
        <p className="text-lg text-gray-200 italic">
          “{reviews[currentIndex].text}”
        </p>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-white/5 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg w-full max-w-lg text-center"
      >
        <input
          type="text"
          placeholder="Ismingiz..."
          className="w-full mb-3 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
        />
        <textarea
          placeholder="Izoh yozing..."
          className="w-full mb-3 p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none"
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
        />
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <Star
              key={num}
              size={28}
              onClick={() => setNewReview({ ...newReview, rating: num })}
              className={`cursor-pointer ${
                num <= newReview.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400"
              } transition`}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow-[0_0_15px_rgba(255,140,0,0.7)] transition"
        >
          Izoh qoldirish
        </button>
      </form>
    </section>
  );
}

export default ReviewSection;
