import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // El Frijolito brand colors
        brand: {
          'forest-green': '#228B22',
          'warm-orange': '#FF8C00',
          'golden-yellow': '#FFD700',
          'chili-red': '#DC143C',
          'cream': '#FFF8DC',
        },
        // Semantic color mappings for better UX
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd28d',
          400: '#5bb65b',
          500: '#228B22', // Forest green - main brand color
          600: '#1e7a1e',
          700: '#1a641a',
          800: '#185018',
          900: '#164316',
        },
        secondary: {
          50: '#fff8ed',
          100: '#ffeed4',
          200: '#ffdaa8',
          300: '#ffc071',
          400: '#ff9d38',
          500: '#FF8C00', // Warm orange
          600: '#e06800',
          700: '#b84f02',
          800: '#953f08',
          900: '#7a330a',
        },
        accent: {
          yellow: '#FFD700', // Golden yellow
          red: '#DC143C',     // Chili red
          cream: '#FFF8DC',   // Warm neutral
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Brand gradients for hero sections
        'brand-warm': 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
        'brand-fresh': 'linear-gradient(135deg, #228B22 0%, #32CD32 100%)',
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(255, 140, 0, 0.15)',
        'brand': '0 4px 14px 0 rgba(34, 139, 34, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;