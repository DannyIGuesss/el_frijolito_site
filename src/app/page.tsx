import Image from "next/image";
import Link from "next/link";

/**
 * El Frijolito Homepage
 * Features:
 * - Hero section with brand messaging
 * - Restaurant highlights
 * - Call-to-action sections
 * - Mobile-first responsive design
 * - SEO optimized content
 */

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-brand-warm-orange/20 via-brand-golden-yellow/10 to-transparent" />
        <div className="absolute inset-0 bg-brand-fresh opacity-5" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Brand logo/icon */}
            <div className="mb-8 animate-bounce-gentle">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-brand-forest-green rounded-full flex items-center justify-center text-white text-4xl lg:text-5xl mx-auto shadow-brand">
                🌱
              </div>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-slide-up">
              <span className="text-brand-forest-green">El Frijolito</span>
            </h1>
            
            {/* Tagline */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-brand-warm-orange font-semibold mb-4 animate-slide-up">
              Auténtica Comida Mexicana
            </p>
            
            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
              Experience the authentic flavors of Mexico with fresh ingredients, 
              traditional family recipes, and warm hospitality that makes every meal special.
            </p>
            
            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
              <Link
                href="/menu"
                className="bg-brand-warm-orange hover:bg-secondary-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-warm hover:shadow-lg hover:scale-105 w-full sm:w-auto"
                aria-label="View our menu"
              >
                View Our Menu
              </Link>
              
              <Link
                href="/contact"
                className="border-2 border-brand-forest-green text-brand-forest-green hover:bg-brand-forest-green hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 w-full sm:w-auto"
                aria-label="Contact us for orders"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Highlights */}
      <section className="py-16 lg:py-20 bg-accent-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-forest-green mb-4">
              Why Choose El Frijolito?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're passionate about bringing you the most authentic Mexican dining experience 
              with quality you can taste in every bite.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fresh Ingredients */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-warm-orange rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform">
                🥑
              </div>
              <h3 className="text-xl font-semibold text-brand-forest-green mb-3">
                Fresh Ingredients
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We source the freshest local ingredients daily to ensure every dish 
                is bursting with authentic Mexican flavors.
              </p>
            </div>
            
            {/* Family Recipes */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-chili-red rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="text-xl font-semibold text-brand-forest-green mb-3">
                Family Traditions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our recipes have been passed down through generations, 
                bringing you the authentic taste of traditional Mexican cuisine.
              </p>
            </div>
            
            {/* Warm Hospitality */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-brand-golden-yellow rounded-full flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform">
                ❤️
              </div>
              <h3 className="text-xl font-semibold text-brand-forest-green mb-3">
                Warm Hospitality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Experience the warmth of Mexican hospitality in our family-friendly 
                atmosphere where everyone is treated like familia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-forest-green mb-4">
              Popular Dishes
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover some of our most beloved traditional Mexican dishes
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center text-brand-warm-orange hover:text-secondary-600 font-semibold transition-colors"
            >
              View Full Menu
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Placeholder for popular dishes - will be populated from menu data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-warm hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-brand-warm-orange to-brand-golden-yellow flex items-center justify-center text-white text-4xl">
                  🌮
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-forest-green mb-2">
                    Coming Soon
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Delicious authentic Mexican dishes will be featured here once our menu is added.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-brand-warm-orange font-semibold text-lg">
                      From $12.99
                    </span>
                    <button className="text-brand-forest-green hover:text-primary-600 font-medium transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 lg:py-20 bg-brand-forest-green text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Experience Authentic Mexican Cuisine?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Visit us today or place your order for pickup. We can't wait to serve you!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="bg-brand-warm-orange hover:bg-secondary-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-warm hover:shadow-lg w-full sm:w-auto"
            >
              Order Now
            </Link>
            
            <Link
              href="/menu"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-forest-green px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 w-full sm:w-auto"
            >
              View Menu
            </Link>
          </div>
          
          {/* Contact info */}
          <div className="mt-12 pt-8 border-t border-primary-700">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+1234567890" className="hover:text-brand-warm-orange transition-colors">
                  (123) 456-7890
                </a>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>123 Main Street, Anytown, ST 12345</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
