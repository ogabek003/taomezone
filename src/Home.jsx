function Home({ language }) {
    const cards = [
      {
        icon: <Star className="w-10 h-10 text-yellow-300" />,
        title:
          language === "ru"
            ? "Наш рейтинг"
            : language === "en"
            ? "Our Rating"
            : "Bizning Reyting",
        text:
          language === "ru"
            ? "⭐ 4.9 — доверие и высокая оценка наших клиентов!"
            : language === "en"
            ? "⭐ 4.9 — trusted and highly rated by our customers!"
            : "⭐ 4.9 — mijozlarimizning ishonchi va yuqori baholari!",
        link: "/rating",
      },
      {
        icon: <MapPin className="w-10 h-10 text-red-300" />,
        title:
          language === "ru"
            ? "Наш адрес"
            : language === "en"
            ? "Our Address"
            : "Manzilimiz",
        text:
          language === "ru"
            ? "Кашкадарьинская область, Китабский район 📍"
            : language === "en"
            ? "Qashqadaryo, Kitob district 📍"
            : "Qashqadaryo, Kitob tumani 📍",
        link: "/location",
      },
      {
        icon: <Utensils className="w-10 h-10 text-orange-300" />,
        title:
          language === "ru"
            ? "Наши блюда"
            : language === "en"
            ? "Our Dishes"
            : "Taomlarimiz",
        text:
          language === "ru"
            ? "Самые вкусные фастфуды и национальные блюда 🍔🥘"
            : language === "en"
            ? "The tastiest fast foods and national dishes 🍔🥘"
            : "Eng mazali fastfood va milliy taomlar 🍔🥘",
        link: "/allfoods",
      },
      {
        icon: <Truck className="w-10 h-10 text-green-300" />,
        title:
          language === "ru"
            ? "24/7 Доставка"
            : language === "en"
            ? "24/7 Delivery"
            : "24/7 Dastavka",
        text:
          language === "ru"
            ? "Бесплатная и быстрая доставка круглосуточно 🚚"
            : language === "en"
            ? "Free and fast delivery 24/7 🚚"
            : "Kun-u tun bepul va tezkor yetkazib berish 🚚",
        link: "/delivery",
      },
    ];
  
    return (
      <section className="py-16">
        <h3 className="text-3xl font-bold text-center mb-10 text-orange-600">
          {language === "ru"
            ? "Добро пожаловать!"
            : language === "en"
            ? "Welcome!"
            : "Xush kelibsiz!"}
        </h3>
  
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
          {cards.map((card, idx) => (
            <Link
              to={card.link}
              key={idx}
              className="p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <div className="flex flex-col items-center text-center">
                {card.icon}
                <h4 className="mt-3 text-xl font-bold">{card.title}</h4>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{card.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }
  