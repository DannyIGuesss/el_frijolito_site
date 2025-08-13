# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for "El Frijolito" using the App Router, TypeScript, and Tailwind CSS v4. The project is currently a fresh Next.js installation with default boilerplate content.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

## Architecture

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **TypeScript**: Configured with strict settings
- **Linting**: ESLint with Next.js core-web-vitals and TypeScript rules

## Project Structure

- `src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration
  - `page.tsx` - Home page (currently default Next.js boilerplate)
  - `globals.css` - Global Tailwind styles
- `public/` - Static assets (SVG icons)

## Key Configuration Files

- `next.config.ts` - Next.js configuration (currently minimal)
- `eslint.config.mjs` - ESLint flat config with Next.js rules
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind