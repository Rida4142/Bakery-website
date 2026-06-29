// src/components/HeroSection.jsx
import { useBakery } from '../context/BakeryContext';

const HeroSection = () => {
  const { bakery } = useBakery();

  if (!bakery?.settings?.showHeroBanner) {
    return null;
  }

  const heroImage = bakery?.settings?.heroImage;
  const heroHeading = bakery?.settings?.heroHeading || bakery?.bakeryName;
  const heroSubheading = bakery?.settings?.heroSubheading;

  const backgroundStyle = heroImage
    ? { backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  const backgroundClasses = heroImage
    ? "bg-cover bg-center rounded-3xl p-8 text-white"
    : "bg-brand-primary rounded-3xl p-8 text-white";

  return (
    <section className="mt-6">
      <div
        className={backgroundClasses}
        style={backgroundStyle}
      >
        <div className="space-y-4 max-w-lg">

          <h1 className="text-4xl font-bold">
            {heroHeading}
          </h1>

          {heroSubheading && (
            <p className="text-white/90">
              {heroSubheading}
            </p>
          )}

          <div className="flex gap-3">

            <button
              className="
              bg-white
              text-brand-primary
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