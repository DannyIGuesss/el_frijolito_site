import { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '@/components/seo/StructuredData';

/**
 * Menu page for El Frijolito
 * Features:
 * - Dynamic menu categories
 * - Responsive design
 * - SEO optimized
 * - Accessibility features
 * - Ready for database integration
 */

export const metadata: Metadata = {
  title: 'Menu - El Frijolito | Authentic Mexican Restaurant',
  description: 'Explore our authentic Mexican menu featuring traditional tacos, burritos, enchiladas, and more. Fresh ingredients, family recipes, and bold flavors.',
  keywords: ['Mexican menu', 'tacos', 'burritos', 'enchiladas', 'quesadillas', 'authentic Mexican food'],
  openGraph: {
    title: 'Menu - El Frijolito',
    description: 'Explore our authentic Mexican menu with traditional dishes and fresh ingredients.',
    type: 'website',
  },
};

export default function MenuPage() {
  // Placeholder categories - will be populated from database in Phase 2
  const menuCategories = [
    {
      id: 'appetizers',
      name: 'Appetizers',
      nameSpanish: 'Aperitivos',
      description: 'Start your meal with our delicious appetizers',
      emoji: '🥑',
    },
    {
      id: 'tacos',
      name: 'Tacos',
      nameSpanish: 'Tacos',
      description: 'Authentic tacos with traditional fillings',
      emoji: '🌮',
    },
    {
      id: 'burritos',
      name: 'Burritos',
      nameSpanish: 'Burritos',
      description: 'Large flour tortillas filled with your favorites',
      emoji: '🌯',
    },
    {
      id: 'quesadillas',
      name: 'Quesadillas',
      nameSpanish: 'Quesadillas',
      description: 'Grilled tortillas with melted cheese and fillings',
      emoji: '🧀',
    },
    {
      id: 'enchiladas',
      name: 'Enchiladas',
      nameSpanish: 'Enchiladas',
      description: 'Corn tortillas rolled with fillings and sauce',
      emoji: '🌶️',
    },
    {
      id: 'platillos-principales',
      name: 'Main Dishes',
      nameSpanish: 'Platillos Principales',
      description: 'Traditional Mexican main courses',
      emoji: '🍽️',
    },
    {
      id: 'beverages',
      name: 'Beverages',
      nameSpanish: 'Bebidas',
      description: 'Refreshing drinks to complement your meal',
      emoji: '🥤',
    },
    {
      id: 'desserts',
      name: 'Desserts',
      nameSpanish: 'Postres',
      description: 'Sweet endings to your Mexican feast',
      emoji: '🍰',
    },
  ];

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://elfrijolito.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Menu",
        "item": "https://elfrijolito.com/menu"
      }
    ]
  };

  return (
    <>
      <StructuredData type="menu" />
      <StructuredData type="breadcrumb" data={breadcrumbData} />
      
      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-brand-forest-green to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Our Menu
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-4">
            Menú Auténtico
          </p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover the authentic flavors of Mexico with dishes prepared using traditional 
            family recipes and the freshest ingredients.
          </p>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-12 bg-accent-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-warm p-8 text-center border-l-4 border-brand-warm-orange">
            <div className="text-4xl mb-4">👨‍🍳</div>
            <h2 className="text-2xl font-bold text-brand-forest-green mb-4">
              Menu Coming Soon!
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our chef is putting the finishing touches on our authentic Mexican menu. 
              Check back soon to see all our delicious offerings, or give us a call to 
              learn about today's specials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-brand-warm-orange hover:bg-secondary-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Call for Today's Specials
              </Link>
              <Link
                href="/"
                className="border-2 border-brand-forest-green text-brand-forest-green hover:bg-brand-forest-green hover:text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories Preview */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-forest-green mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get a preview of our menu categories. Each section will feature authentic 
              Mexican dishes made with love and traditional recipes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-warm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {category.emoji}
                  </div>
                  <h3 className="text-xl font-semibold text-brand-forest-green mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-brand-warm-orange font-medium mb-3">
                    {category.nameSpanish}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                
                <div className="px-6 pb-6">
                  <div className="bg-accent-cream rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500 mb-2">Items Coming Soon</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-brand-warm-orange h-2 rounded-full w-0 group-hover:w-full transition-all duration-1000"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-brand-forest-green text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Questions About Our Menu?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Our friendly staff is happy to help you choose the perfect dishes or 
            accommodate any dietary needs you may have.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="tel:+1234567890"
              className="bg-brand-warm-orange hover:bg-secondary-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-warm hover:shadow-lg w-full sm:w-auto"
            >
              Call Us Now
            </a>
            
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-forest-green px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
          
          {/* Special dietary notice */}
          <div className="bg-primary-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-accent-cream">
              Dietary Accommodations
            </h3>
            <p className="text-gray-200">
              We offer vegetarian, vegan, and gluten-free options. Please let us know 
              about any allergies or dietary restrictions when ordering.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}