/**
 * Structured Data component for SEO optimization
 * Implements JSON-LD schema for better search engine understanding
 */

interface StructuredDataProps {
  type: 'restaurant' | 'menu' | 'breadcrumb';
  data?: any;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  let structuredData;

  switch (type) {
    case 'restaurant':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "El Frijolito",
        "alternateName": "El Frijolito Mexican Restaurant",
        "description": "Authentic Mexican restaurant serving traditional cuisine with fresh ingredients and family recipes in a warm, welcoming atmosphere.",
        "image": [
          // Will be populated with actual images in Phase 2
          "https://example.com/el-frijolito-hero.jpg"
        ],
        "telephone": "+1-123-456-7890",
        "email": "info@elfrijolito.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Main Street",
          "addressLocality": "Anytown",
          "addressRegion": "ST",
          "postalCode": "12345",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "40.7580",
          "longitude": "-73.9855"
        },
        "openingHours": [
          "Mo-Th 11:00-21:00",
          "Fr-Sa 11:00-22:00", 
          "Su 12:00-20:00"
        ],
        "servesCuisine": ["Mexican", "Latin American"],
        "acceptsReservations": true,
        "priceRange": "$$",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
        "currenciesAccepted": "USD",
        "hasMenu": "/menu",
        "url": "https://elfrijolito.com",
        "sameAs": [
          "https://www.facebook.com/elfrijolito",
          "https://www.instagram.com/elfrijolito",
          "https://www.yelp.com/biz/el-frijolito"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.5",
          "reviewCount": "127"
        }
      };
      break;

    case 'menu':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Menu",
        "name": "El Frijolito Menu",
        "description": "Authentic Mexican cuisine menu featuring traditional dishes, tacos, burritos, enchiladas, and more.",
        "inLanguage": ["en", "es"],
        "hasMenuSection": [
          {
            "@type": "MenuSection",
            "name": "Appetizers",
            "alternateName": "Aperitivos",
            "description": "Traditional Mexican appetizers to start your meal"
          },
          {
            "@type": "MenuSection", 
            "name": "Tacos",
            "description": "Authentic tacos with traditional fillings"
          },
          {
            "@type": "MenuSection",
            "name": "Burritos", 
            "description": "Large flour tortillas filled with your favorites"
          },
          {
            "@type": "MenuSection",
            "name": "Main Dishes",
            "alternateName": "Platillos Principales",
            "description": "Traditional Mexican main courses"
          }
        ]
      };
      break;

    case 'breadcrumb':
      structuredData = data || {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://elfrijolito.com"
          }
        ]
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;