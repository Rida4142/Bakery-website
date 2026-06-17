const HeroSection = () => {
  return (
    <section className="mt-6">

      <div
        className="
        bg-gradient-to-r
        from-primary
        to-red-400
        rounded-3xl
        p-8
        text-white
        "
      >
        <div className="space-y-4">

          <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
            Fresh Daily
          </span>

          <h1 className="text-4xl font-bold">
            Freshly Baked Happiness Every Day
          </h1>

          <p className="text-white/90">
            Cakes, cookies, donuts and breads made with love and premium ingredients.
          </p>

          <div className="flex gap-3">

            <button
              className="
              bg-white
              text-primary
              px-6
              py-3
              rounded-xl
              font-semibold
              "
            >
              Order Now
            </button>

            <button
              className="
              border
              border-white
              px-6
              py-3
              rounded-xl
              "
            >
              Explore Menu
            </button>

          </div>

        </div>
      </div>

    </section>
  );
};

export default HeroSection;