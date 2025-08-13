'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Main navigation header component for El Frijolito
 * Features:
 * - Mobile-first responsive design
 * - Sticky navigation on scroll
 * - Animated mobile menu
 * - Brand-consistent styling
 * - Accessibility optimized
 */

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationLinks = [
    { href: '/', label: 'Home', labelEs: 'Inicio' },
    { href: '/menu', label: 'Menu', labelEs: 'Menú' },
    { href: '/about', label: 'About', labelEs: 'Nosotros' },
    { href: '/contact', label: 'Contact', labelEs: 'Contacto' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-warm border-b border-accent-cream' 
          : 'bg-transparent'
        }
        ${className}
      `}
    >
      <nav 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo and brand name */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            onClick={closeMobileMenu}
            aria-label="El Frijolito Home"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              {/* Placeholder for logo - will be replaced with actual logo */}
              <div className="w-full h-full bg-brand-forest-green rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
                🌱
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-brand-forest-green group-hover:text-primary-600 transition-colors">
                El Frijolito
              </h1>
              <p className="text-xs text-brand-warm-orange font-medium">
                Auténtica Comida Mexicana
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-gray-700 hover:text-brand-forest-green font-medium transition-colors group"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-warm-orange transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* Call-to-action button */}
            <Link
              href="/contact"
              className="bg-brand-warm-orange hover:bg-secondary-600 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-warm hover:shadow-lg"
              aria-label="Contact El Frijolito"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-brand-forest-green transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`
            md:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isMobileMenuOpen 
              ? 'max-h-96 opacity-100 pb-6' 
              : 'max-h-0 opacity-0 pb-0'
            }
          `}
        >
          <div className="bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-warm border border-accent-cream">
            {navigationLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  block px-6 py-4 text-gray-700 hover:text-brand-forest-green hover:bg-accent-cream/50 
                  font-medium transition-colors
                  ${index !== navigationLinks.length - 1 ? 'border-b border-accent-cream' : ''}
                `}
                onClick={closeMobileMenu}
                aria-label={`Navigate to ${link.label}`}
              >
                <span className="block">{link.label}</span>
                <span className="block text-sm text-gray-500 mt-0.5">{link.labelEs}</span>
              </Link>
            ))}
            
            {/* Mobile CTA */}
            <div className="px-6 py-4">
              <Link
                href="/contact"
                className="block w-full bg-brand-warm-orange hover:bg-secondary-600 text-white text-center px-6 py-3 rounded-full font-medium transition-colors shadow-warm"
                onClick={closeMobileMenu}
                aria-label="Contact El Frijolito"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;