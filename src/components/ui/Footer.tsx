import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Footer component for El Frijolito
 * Features:
 * - Restaurant contact information
 * - Social media links
 * - Business hours
 * - Brand-consistent styling
 * - Mobile-responsive layout
 * - Accessibility optimized
 */

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  // Business hours - will be made dynamic in Phase 2
  const businessHours = [
    { day: 'Monday - Thursday', hours: '11:00 AM - 9:00 PM' },
    { day: 'Friday - Saturday', hours: '11:00 AM - 10:00 PM' },
    { day: 'Sunday', hours: '12:00 PM - 8:00 PM' },
  ];

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/catering', label: 'Catering' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.297-3.323.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.807.875 1.297 2.026 1.297 3.323 0 1.297-.49 2.448-1.297 3.323-.875.807-2.026 1.297-3.323 1.297zm7.718-1.39c-.245.735-.612 1.39-1.093 1.934-.612.612-1.297 1.093-2.026 1.297-.735.245-1.39.245-2.125.245s-1.39 0-2.125-.245c-.735-.204-1.414-.685-2.026-1.297-.481-.544-.848-1.199-1.093-1.934-.245-.735-.245-1.39-.245-2.125s0-1.39.245-2.125c.245-.735.612-1.39 1.093-1.934.612-.612 1.291-1.093 2.026-1.297.735-.245 1.39-.245 2.125-.245s1.39 0 2.125.245c.735.204 1.414.685 2.026 1.297.481.544.848 1.199 1.093 1.934.245.735.245 1.39.245 2.125s0 1.39-.245 2.125z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: 'Yelp',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className={`bg-brand-forest-green text-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-brand-warm-orange rounded-full flex items-center justify-center text-white font-bold text-lg">
                🌱
              </div>
              <div>
                <h3 className="text-xl font-bold">El Frijolito</h3>
                <p className="text-sm text-accent-cream">Auténtica Comida Mexicana</p>
              </div>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Bringing authentic Mexican flavors to your table with fresh ingredients, 
              traditional recipes, and warm hospitality. Family-owned and operated since 2020.
            </p>
            
            {/* Social media links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-300 hover:text-brand-warm-orange transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent-cream">Quick Links</h4>
            <nav>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-brand-warm-orange transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Business hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent-cream">Hours</h4>
            <div className="space-y-2">
              {businessHours.map((schedule, index) => (
                <div key={index} className="text-sm">
                  <div className="text-gray-300">{schedule.day}</div>
                  <div className="text-white font-medium">{schedule.hours}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-accent-cream">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 mt-0.5 text-brand-warm-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div className="text-gray-300">
                  123 Main Street<br />
                  Anytown, ST 12345
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-brand-warm-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+1234567890" className="text-gray-300 hover:text-brand-warm-orange transition-colors">
                  (123) 456-7890
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-brand-warm-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:info@elfrijolito.com" className="text-gray-300 hover:text-brand-warm-orange transition-colors">
                  info@elfrijolito.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-primary-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 mb-4 md:mb-0">
              © {currentYear} El Frijolito. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-brand-warm-orange transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-brand-warm-orange transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;