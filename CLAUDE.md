# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

El Frijolito is a comprehensive restaurant management system built with Next.js 15, featuring a customer-facing website and a complete admin dashboard for content management.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks
- `npx prisma generate` - Generate Prisma client after schema changes
- `npx prisma migrate dev` - Run database migrations in development
- `npx prisma studio` - Open Prisma Studio for database GUI

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom brand colors
- **Authentication**: NextAuth.js with credentials provider
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **TypeScript**: Strict configuration with custom types

### Backend & Database
- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js API Routes
- **Image Storage**: Cloudinary integration
- **File Uploads**: Next-Cloudinary

### Authentication & Security
- **Admin Auth**: NextAuth.js with role-based access control
- **Password Security**: bcryptjs hashing
- **Route Protection**: Middleware-based protection
- **Role Management**: SUPER_ADMIN, ADMIN, MANAGER, STAFF roles

## Architecture

### Database Schema
The Prisma schema (`prisma/schema.prisma`) includes comprehensive models for:
- **User Management**: Admin users with roles and security features
- **Restaurant Info**: Contact details, hours, social media, branding
- **Menu System**: Categories and items with full customization
- **Content Management**: Homepage sections, highlights, SEO settings
- **Media Management**: Cloudinary-integrated asset storage
- **Customer Interaction**: Contact inquiries, catering requests
- **Analytics**: Page views and activity tracking

### Project Structure

```
src/
├── app/
│   ├── admin/                 # Admin dashboard pages
│   │   ├── layout.tsx         # Admin layout with auth protection
│   │   ├── page.tsx           # Main dashboard
│   │   └── login/page.tsx     # Admin login
│   ├── api/                   # API routes
│   │   └── auth/[...nextauth] # NextAuth configuration
│   ├── layout.tsx             # Root layout with SEO
│   ├── page.tsx               # Homepage
│   ├── menu/page.tsx          # Menu page
│   └── globals.css            # Global styles with brand colors
├── components/
│   ├── admin/                 # Admin dashboard components
│   │   ├── AdminSidebar.tsx   # Navigation sidebar
│   │   └── AdminHeader.tsx    # Top navigation
│   ├── seo/                   # SEO components
│   │   └── StructuredData.tsx # JSON-LD schema
│   └── ui/                    # Reusable UI components
├── lib/
│   ├── db.ts                  # Database connection utilities
│   └── auth.ts                # NextAuth configuration
├── types/                     # TypeScript type definitions
│   ├── restaurant.ts          # Core business types
│   └── auth.ts                # Authentication types
└── generated/prisma/          # Generated Prisma client
```

## Brand Identity & Design System

### Colors (in Tailwind config)
- `brand-forest-green`: #228B22 (Primary)
- `brand-warm-orange`: #FF8C00 (Secondary)
- `brand-golden-yellow`: #FFD700 (Accent)
- `brand-chili-red`: #DC143C (Accent)
- `brand-cream`: #FFF8DC (Neutral)

### Design Principles
- Mobile-first responsive design (70%+ mobile traffic)
- Warm, family-friendly aesthetic
- Accessible design with proper contrast
- Mexican cultural elements integrated respectfully

## Admin Dashboard Features

### Completed (Phase 2)
- **Authentication System**: Secure login with role-based access
- **Dashboard Layout**: Responsive admin interface
- **Navigation**: Role-based menu with permissions
- **User Management**: Multi-role admin system
- **Database Integration**: Full Prisma setup

### Ready for Implementation
- **Restaurant Info Management**: Edit contact details, hours, social media
- **Menu Management**: CRUD operations for categories and items
- **Image Upload**: Cloudinary integration for photos
- **Homepage Content**: Customizable sections and highlights
- **SEO Management**: Meta tags, structured data, keywords
- **Analytics**: Page views and activity tracking

## Database Setup

1. Set up PostgreSQL database
2. Copy `.env.example` to `.env` and configure:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Random secret for JWT signing
   - `CLOUDINARY_*` - Cloudinary credentials for image uploads
3. Run `npx prisma migrate dev` to create database schema
4. Seed initial admin user (create seeding script)

## Security Features

- Password hashing with bcryptjs
- Account lockout after failed login attempts
- Session management with JWT
- Role-based route protection
- Input validation with Zod schemas
- SQL injection prevention via Prisma

## SEO & Performance

- Comprehensive meta tags and Open Graph
- JSON-LD structured data for restaurant discovery
- Optimized font loading with display:swap
- Mobile-first responsive design
- Image optimization ready for Cloudinary

## Development Notes

- All database operations use Prisma for type safety
- Admin routes are protected by middleware
- Forms use React Hook Form with Zod validation
- Components follow accessibility best practices
- Brand colors are consistently applied throughout
- Bilingual support ready (English/Spanish)

## Environment Variables Required

```
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```