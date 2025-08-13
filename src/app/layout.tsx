import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import StructuredData from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "El Frijolito - Authentic Mexican Restaurant",
    template: "%s | El Frijolito"
  },
  description: "Experience authentic Mexican cuisine at El Frijolito. Fresh ingredients, traditional family recipes, and warm hospitality in a family-friendly atmosphere. Visit us for the best Mexican food in town.",
  keywords: [
    "Mexican restaurant", 
    "authentic Mexican food", 
    "tacos", 
    "burritos", 
    "enchiladas",
    "quesadillas",
    "family restaurant",
    "traditional Mexican cuisine",
    "fresh ingredients",
    "Mexican family recipes"
  ],
  authors: [{ name: "El Frijolito" }],
  creator: "El Frijolito",
  publisher: "El Frijolito",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elfrijolito.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-MX': '/es-MX',
    },
  },
  openGraph: {
    title: "El Frijolito - Authentic Mexican Restaurant",
    description: "Experience authentic Mexican cuisine with fresh ingredients and traditional family recipes.",
    type: "website",
    locale: "en_US",
    url: "https://elfrijolito.com",
    siteName: "El Frijolito",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'El Frijolito - Authentic Mexican Restaurant',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "El Frijolito - Authentic Mexican Restaurant",
    description: "Experience authentic Mexican cuisine with fresh ingredients and traditional recipes.",
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token',
    yandex: 'yandex-verification-token',
    yahoo: 'yahoo-site-verification-token',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData type="restaurant" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#228B22" />
        <meta name="msapplication-TileColor" content="#228B22" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow pt-16 lg:pt-20" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
