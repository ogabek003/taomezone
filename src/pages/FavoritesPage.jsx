import React from "react";
import { Heart } from "lucide-react";

export default function FavoritesPage({ favorites, addToFavorites }) {
  return (
    <section className="min-h-screen px-6 py-20 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <h2 className="text-4xl font-extrabold text-center text-amber-400 mb-10 drop-shadow-[0_0_15px_rgba(255,200,100,0.5)]">
        ❤️ Yoqtirgan Taomlaringiz
      </h2>

      {favorites.length === 0 ? (
        <p className="text-center text-lg text-gray-400">
          Hozircha hech narsa yo‘q 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((food, i) => (
            <div
              key={i}
              className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-orange-400/30 rounded-3xl overflow-hidden shadow-lg"
            >
              {/* ❤️ Yurakcha */}
              <button
                onClick={() => addToFavorites(food)}
                className="absolute top-3 right-3 bg-white/40 dark:bg-black/30 p-2 rounded-full hover:bg-white/70 dark:hover:bg-black/50 transition"
              >
                <Heart color="#ff4d4f" fill="#ff4d4f" size={24} />
              </button>

              {/* 🍔 Rasm */}
              <img
                src={food.img}
                alt={food.title}
                className="w-full h-52 object-cover rounded-t-3xl"
              />

              {/* 🧡 Ma’lumot */}
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold text-amber-200">
                  {food.title}
                </h3>
                <p className="text-yellow-400 font-semibold">
                  {food.price?.toLocaleString()} so‘m
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}


