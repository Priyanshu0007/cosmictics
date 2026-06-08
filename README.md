# ✦ Cosmictics — GPU-Accelerated Cosmetics E-Commerce

**A high-performance, immersive cosmetics e-commerce storefront built with Next.js 16 (App Router), React 19, Tailwind CSS 4, and TypeScript — featuring real-time WebGPU-powered visuals via TypeGPU & Redraw, persistent cart/favorites with Redux Toolkit, and an interactive GPU-accelerated swatch laboratory.**

[![Live Site](https://img.shields.io/badge/🚀_Live_Site-cosmictics.vercel.app-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://cosmictics.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![WebGPU](https://img.shields.io/badge/WebGPU-TypeGPU-8C3DD4?style=for-the-badge&logo=webgl&logoColor=white)](https://github.com/nicschumann/typegpu)

---

[![Home Page](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@a6bf46fe64f76ed7d36d5722f8c330e7eaa60148/cosmictics/cosmictics-home-page.png)](https://cosmictics.vercel.app/)

*Home page — featuring WebGPU-rendered animated gradient curves, glassmorphic product cards with Redraw-powered neon borders, and an obsidian dark cosmic aesthetic*

---

## 📋 Table of Contents

- [Live URL](#-live-url)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [Features](#-features)
- [WebGPU Rendering Pipeline](#-webgpu-rendering-pipeline)
- [State Management](#-state-management)
- [Design System](#-design-system)
- [Getting Started](#-getting-started)
- [Scripts Reference](#-scripts-reference)

---

## 🌐 Live URL

| Platform | URL | Purpose |
|-------------|-----|---------|
| 🟢 **Vercel Production** | [cosmictics.vercel.app](https://cosmictics.vercel.app/) | Public-facing live cosmetics storefront |

---

## 📸 Screenshots

### 🏠 Home / Landing Page
[![Landing Page](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@a6bf46fe64f76ed7d36d5722f8c330e7eaa60148/cosmictics/cosmictics-home-page.png)](https://cosmictics.vercel.app/)

### 🛍️ Products Catalog
[![Products Page](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@a6bf46fe64f76ed7d36d5722f8c330e7eaa60148/cosmictics/cosmictics-products-page.png)](https://cosmictics.vercel.app/)

### 🔍 Product Detail View
[![Product Detail Page](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@a6bf46fe64f76ed7d36d5722f8c330e7eaa60148/cosmictics/cosmictics-product-detail-page.png)](https://cosmictics.vercel.app/)

### 📝 Blog & Editorial Section
[![Blog Page](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@a6bf46fe64f76ed7d36d5722f8c330e7eaa60148/cosmictics/cosmictics-blog-page.png)](https://cosmictics.vercel.app/)

### 🎨 WebGPU Cosmic Swatch Laboratory
[![WebGPU Swatch Lab](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@a6bf46fe64f76ed7d36d5722f8c330e7eaa60148/cosmictics/cosmictics-web-gpu.png)](https://cosmictics.vercel.app/)

### 🖌️ WebGPU Drawing Canvas (Rest State)
[![WebGPU Rest State](https://cdn.jsdelivr.net/gh/Priyanshu0007/CDN@a6bf46fe64f76ed7d36d5722f8c330e7eaa60148/cosmictics/cosmictics-web-gpu-rest.png)](https://cosmictics.vercel.app/)

---

## 🛠️ Tech Stack

### Core Framework

| Technology | Version | Role |
|------------|---------|------|
| [Next.js](https://nextjs.org) | `16.2.6` | React Framework (App Router) |
| [React](https://react.dev) | `19.2.6` | UI library |
| [TypeScript](https://www.typescriptlang.org) | `6.0.3` | Type-safe application logic |

### Styling

| Technology | Version | Role |
|------------|---------|------|
| [Tailwind CSS](https://tailwindcss.com) | `4.3.0` | Utility-first styling framework |
| [PostCSS](https://postcss.org) | `8.5.3` | CSS post-processing & transformations |
| Google Fonts | — | `Outfit` (sans-serif body) + `Playfair Display` (serif headings) |

### GPU Rendering & Canvas

| Technology | Version | Role |
|------------|---------|------|
| [TypeGPU](https://github.com/nicschumann/typegpu) | `0.11.6` | WebGPU abstraction layer for type-safe GPU compute & rendering |
| [unplugin-typegpu](https://www.npmjs.com/package/unplugin-typegpu) | `0.11.4` | Webpack plugin for TypeGPU shader compilation |
| Redraw (custom mock) | — | GPU-accelerated 2D vector drawing engine for canvas effects |
| React-Redraw (custom mock) | — | React binding for Redraw canvas with declarative render/animate API |

### State Management & Persistence

| Technology | Version | Role |
|------------|---------|------|
| [Redux Toolkit](https://redux-toolkit.js.org) | `2.12.0` | Global state management for cart and favorites |
| [React-Redux](https://react-redux.js.org) | `9.3.0` | React bindings for Redux store |
| [Redux Persist](https://github.com/rt2zz/redux-persist) | `6.0.0` | LocalStorage-backed persistence for cart and wishlist data |

### Utilities & UI Libraries

| Technology | Version | Role |
|------------|---------|------|
| [react-icons](https://react-icons.github.io/react-icons/) | `5.6.0` | Comprehensive icon library (Ant Design, Font Awesome, Feather) |
| [react-share](https://www.npmjs.com/package/react-share) | `5.3.0` | Social media sharing (Facebook, WhatsApp, Telegram) |
| [react-slideshow-image](https://www.npmjs.com/package/react-slideshow-image) | `4.4.0` | Animated product image slideshows and hero carousels |

---

## 🏗️ Architecture Overview

```
                        ┌────────────────────────┐
                        │     Client Browser     │
                        │  (WebGPU / Canvas 2D)  │
                        └───────────┬────────────┘
                                    │
                                    │ HTTP Requests
                                    ▼
                        ┌────────────────────────┐
                        │   Vercel Edge Network  │
                        └───────────┬────────────┘
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        ▼ (App Router / Client Components)                      ▼ (GPU Pipeline)
  ┌───────────┐                                           ┌───────────────┐
  │  Next.js  │                                           │    TypeGPU    │
  │App Server │                                           │   + Redraw    │
  └─────┬─────┘                                           └───────┬───────┘
        │                                                         │
        ├─► / (Home: Hero, Products, Blog)                        ├─► CosmicAuraBackground
        ├─► /details/[id] (Product Details)                       │   (Mouse-tracking orbital rings)
        ├─► /blog/[id] (Blog Article View)                        ├─► RedrawHeroCanvas
        │                                                         │   (Animated gradient curves)
        │   ┌─────────────────────┐                               ├─► CosmicSwatchLab
        └──►│   Redux Toolkit     │                               │   (Interactive drawing canvas)
            │  + Redux Persist    │                               └─► RedrawBorder / RedrawCircleBorder
            │  (Cart & Favorites) │                                   (GPU-rendered card borders)
            └─────────────────────┘
```

### Key Architectural Decisions

- **Next.js 16 App Router**: Leverages React Server Components architecture with `'use client'` directives for interactive WebGPU components, achieving optimal code-splitting.
- **WebGPU-First Rendering**: All background animations, card hover borders, and the Swatch Lab canvas are powered by GPU-accelerated rendering through TypeGPU and Redraw, with graceful CSS fallbacks for unsupported browsers.
- **Custom Redraw Mock**: A high-fidelity local mock (`src/redraw_mock/`) provides the `fitPath`, `GradientAlongPath`, `SingleStrokeBrush`, and `Feather` APIs, aliased via webpack config to intercept `redraw` and `react-redraw` imports.
- **Client-Side State Persistence**: Redux Toolkit combined with `redux-persist` ensures cart and wishlist data survive browser refreshes via `localStorage`, with serializable action check middleware configured to ignore persist lifecycle actions.
- **Dynamic Imports with SSR Protection**: All WebGPU-dependent components (`RedrawHeroCanvas`, `CosmicAuraBackground`, `CosmicSwatchLab`) are loaded via `next/dynamic` with `ssr: false` to prevent server-side rendering errors.

---

## 📁 Project Structure

```
cosmictics/
├── public/                             # Static public assets
│   ├── banner.png                      # Promotional banner image
│   ├── blog/                           # Blog post cover images
│   ├── category/                       # Category section images
│   ├── cosmetic.png                    # Hero cosmetic product render
│   ├── favicon.ico                     # Site favicon
│   ├── feature/                        # Feature showcase images
│   ├── hero/                           # Hero slideshow product images
│   ├── logo.png                        # Cosmictics brand logo
│   └── product/                        # Product catalog images
│
├── src/
│   ├── app/                            # Next.js App Router pages
│   │   ├── blog/
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Blog article detail view
│   │   ├── details/
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Product detail page (image gallery, compare, share)
│   │   ├── globals.css                 # Global Tailwind directives, theme tokens & custom utilities
│   │   ├── layout.tsx                  # Root layout (NavBar, Footer, Cart, Fav, CosmicAura)
│   │   └── page.tsx                    # Home page (Hero, Features, Products, Categories, SwatchLab, Blog)
│   │
│   ├── components/                     # Reusable UI components
│   │   ├── BlogCard.tsx                # Blog post card for editorial grid
│   │   ├── BlogSection.tsx             # Blog section container on home page
│   │   ├── Cart.tsx                    # Slide-out shopping cart overlay
│   │   ├── CartProduct.tsx             # Individual cart item row component
│   │   ├── CartStardustCanvas.tsx      # GPU particle effects inside cart panel
│   │   ├── Category.tsx                # Category filter tabs and product grid
│   │   ├── CategoryCard.tsx            # Individual category selector card
│   │   ├── Comment.tsx                 # Blog post comment display
│   │   ├── Compare.tsx                 # Product comparison card
│   │   ├── CosmicAuraBackground.tsx    # ★ Global GPU background (orbital rings + mouse trail)
│   │   ├── CosmicSwatchLab.tsx         # ★ Interactive GPU swatch drawing laboratory
│   │   ├── Fav.tsx                     # Slide-out favorites/wishlist overlay
│   │   ├── FavProduct.tsx              # Individual wishlist item row component
│   │   ├── Features.tsx                # Feature highlights section
│   │   ├── FeaturesCard.tsx            # Individual feature card
│   │   ├── Footer.tsx                  # Site footer with branding links
│   │   ├── Hero.tsx                    # Hero section (WebGPU canvas + slideshow + CTA)
│   │   ├── ImageSlideShow.tsx          # Image slideshow for product detail pages
│   │   ├── NavBar.tsx                  # Navigation bar with cart/fav toggle
│   │   ├── NewArrival.tsx              # New arrivals product grid section
│   │   ├── ProductCard.tsx             # Product card with GPU border, cart & fav actions
│   │   ├── RedrawBorder.tsx            # ★ GPU-rendered animated neon border for cards
│   │   ├── RedrawCircleBorder.tsx      # ★ GPU-rendered circular border animation
│   │   ├── RedrawHeroCanvas.tsx        # ★ WebGPU hero background (animated gradient curves)
│   │   ├── Share.tsx                   # Social sharing buttons (Facebook, WhatsApp, Telegram)
│   │   ├── SimilarBlogCard.tsx         # Sidebar similar blog post card
│   │   └── SlideShow.tsx              # Hero product slideshow component
│   │
│   ├── redraw_mock/                    # High-fidelity local mock of Redraw GPU library
│   │   ├── index.ts                    # Core API: fitPath, GradientAlongPath, SingleStrokeBrush, Feather
│   │   └── react.tsx                   # React bindings: RedrawCanvas component
│   │
│   ├── redux/                          # State management layer
│   │   ├── fetaures/
│   │   │   ├── cartSlice.ts            # Cart state: add, remove, increment, decrement
│   │   │   └── favSlice.ts             # Favorites/wishlist state: add, remove, toggle
│   │   ├── hook.ts                     # Typed Redux hooks (useAppDispatch, useAppSelector)
│   │   └── store.ts                    # Redux store config with persist middleware
│   │
│   └── utils/                          # Data and helper utilities
│       ├── blogData.ts                 # Static blog article data (title, content, images, tags)
│       ├── helper.ts                   # Shared utility functions
│       └── productData.ts             # Static product catalog data (name, price, images, ratings)
│
├── next.config.js                      # Next.js config (TypeGPU plugin, Redraw webpack alias)
├── tailwind.config.ts                  # Tailwind CSS content paths and theme extension
├── tsconfig.json                       # TypeScript configuration
├── postcss.config.js                   # PostCSS pipeline with Tailwind
├── package.json                        # Dependencies & execution scripts
└── .gitignore                          # Git exclusion rules
```

> Components marked with ★ are GPU-accelerated via TypeGPU / Redraw.

---

## 🗺️ Pages & Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Client (CSR) | Home — Hero with WebGPU animated background, feature highlights, new arrivals grid, category filters, GPU Swatch Lab, blog editorial section |
| `/details/[id]` | Client (CSR) | Product detail — multi-image slideshow, product info, similar product comparisons, social sharing |
| `/blog/[id]` | Client (CSR) | Blog article — full editorial content, comments section, similar posts sidebar |

---

## 🚀 Features

- **WebGPU-Powered Global Background**: An always-on `CosmicAuraBackground` renders mouse-tracking orbital rings, cursor trails, and ambient glow effects in real-time using GPU shaders — with smooth lerp-based easing and idle infinity-pattern floating.
- **GPU-Accelerated Hero Canvas**: The `RedrawHeroCanvas` draws 6 animated cosmetic-inspired gradient curves with staggered draw-in effects, automatic boomerang looping, and per-curve glow feathering — falling back to pure SVG/CSS animation on unsupported browsers.
- **Interactive Cosmic Swatch Laboratory**: A fully interactive drawing canvas where users can select from 5 cosmetic formulations (Stellar Aurora, Astro Gold, Comet Teal, Nebula Rose, Supernova Black) and paint GPU-rendered gradient strokes with glow effects. Supports replay animation, clear, and palette export.
- **GPU-Rendered Card Borders**: Product cards feature `RedrawBorder` — a hover-activated GPU-rendered animated neon border that traces the card perimeter with gradient color transitions.
- **Persistent Cart & Wishlist**: Full shopping cart and favorites system powered by Redux Toolkit + Redux Persist, surviving browser refreshes via localStorage. Includes quantity increment/decrement, item removal, and total calculation.
- **Product Image Slideshow**: Animated slideshows using `react-slideshow-image` for both hero sections and product detail pages.
- **Social Sharing**: One-click sharing to Facebook, WhatsApp, and Telegram via `react-share` on product and blog detail pages.
- **Category-Based Product Filtering**: Tab-based category system allowing users to filter products by type (lipstick, foundation, eyeshadow, etc.) with smooth layout transitions.
- **Blog Editorial System**: Curated beauty blog with article cards, full-content detail views, similar post recommendations, and comment display.
- **Glassmorphic UI System**: Unified `glass-card` utility providing frosted glass container styling with `backdrop-filter: blur()`, semi-transparent backgrounds, and subtle border highlights.
- **Dynamic Cart Particle Effects**: The cart panel features a `CartStardustCanvas` — GPU-rendered particle stardust effects inside the shopping cart overlay.

---

## 🎮 WebGPU Rendering Pipeline

Cosmictics uses a multi-layered GPU rendering approach across the application:

```
                  ┌──────────────────────────────────────┐
                  │        WebGPU / TypeGPU Runtime       │
                  └──────────────┬───────────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
  ┌──────────────┐      ┌──────────────┐      ┌──────────────────┐
  │ Background   │      │  Hero Canvas │      │   Swatch Lab     │
  │ Orbital Aura │      │  Curve Anim  │      │ Interactive Draw │
  └──────┬───────┘      └──────┬───────┘      └──────┬───────────┘
         │                     │                     │
         ▼                     ▼                     ▼
  Mouse-tracking         6 gradient curves      5 formulation palettes
  orbital ellipses       with staggered         + 30-stroke pool
  + cursor trail         draw-in animation      + replay animation
  + idle float pattern   + boomerang loop       + glow feathering
```

### Rendering APIs Used

| API | Usage | Component |
|-----|-------|-----------|
| `fitPath()` | Fits SVG path strings to canvas dimensions | All GPU canvases |
| `GradientAlongPath` | Applies multi-color gradient along stroke paths | Hero, Background, Swatch Lab |
| `SingleStrokeBrush` | Creates brush objects with configurable width and effects | All GPU canvases |
| `Feather.glow()` | Adds configurable radius glow/feather to brush strokes | Hero, Background, Swatch Lab |
| `animation()` | Time-based animation with boomerang support | Hero Canvas |
| `RedrawCanvas` | React component providing render/animate lifecycle | All GPU components |

### Graceful Fallback

When WebGPU is not supported (e.g. older browsers), the Hero canvas falls back to:
- Pure CSS radial gradients with `blur()` and `animate-pulse`
- Inline SVG with animated `stroke-dasharray` for curve drawing effects

---

## 🔄 State Management

```
                  ┌────────────────────────┐
                  │    Redux Store         │
                  │   (configureStore)      │
                  └──────────┬─────────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
     ┌────────────────┐           ┌────────────────┐
     │  cartSlice.ts  │           │  favSlice.ts   │
     └────────┬───────┘           └────────┬───────┘
              │                            │
     Actions:                     Actions:
     • addToCart                   • addToFav
     • removeFromCart              • removeFromFav
     • incrementQty
     • decrementQty
              │                            │
              └──────────┬─────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   Redux Persist      │
              │   (localStorage)     │
              └──────────────────────┘
```

### Typed Hooks

```typescript
// src/redux/hook.ts
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#EC2D9E` | Primary magenta — CTAs, highlights, ratings, active states |
| `--color-accent-teal` | `#3FCEBC` | Secondary teal — prices, badges, lab accents |
| `--color-obsidian` | `#07070A` | Deep black background base |
| `--color-obsidian-light` | `#0F0F16` | Elevated card background |
| `--color-card-dark` | `rgba(18, 18, 26, 0.5)` | Glassmorphic card base |

### Typography

| Font | Family | Usage |
|------|--------|-------|
| [Outfit](https://fonts.google.com/specimen/Outfit) | `--font-sans` | Body text, navigation, buttons, labels |
| [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | `--font-serif` | Hero headings, section titles, product names |

### Custom Utilities

| Utility Class | Description |
|---------------|-------------|
| `glass-card` | Frosted glass container — `blur(12px)` backdrop, `rgba(15,15,24,0.45)` bg, subtle border |
| `navLink` | Animated navigation link with underline slide-in on hover |
| `glow-text-magenta` | Magenta text shadow glow effect |
| `glow-text-teal` | Teal text shadow glow effect |
| `ambient-glow-magenta` | Pulsing radial magenta background glow |
| `ambient-glow-teal` | Pulsing radial teal background glow |

### Design Principles

- **Obsidian Dark Aesthetic**: A deep, nearly-black base (`#07070A`) creates maximum contrast for vibrant neon accents and GPU-rendered light effects.
- **Glassmorphism**: Unified frosted glass containers with backdrop blur create depth and visual layering throughout the application.
- **GPU-Enhanced Interactions**: Hover states on product cards trigger WebGPU-rendered neon border animations, elevating standard CSS transitions.
- **Cosmic Color Theory**: A carefully balanced palette of magenta (`#EC2D9E`), teal (`#3FCEBC`), violet (`#8C3DD4`), and indigo (`#5C46EF`) creates a celestial, high-fashion atmosphere.
- **Responsive Grid Layouts**: 12-column grid system adapting from multi-column desktop layouts to single-column mobile stacks.

---

## 💻 Getting Started

### Prerequisites

- Node.js `>= 24`
- [Bun](https://bun.sh) (recommended) or npm
- A WebGPU-compatible browser (Chrome 113+, Edge 113+, Firefox Nightly) for full GPU effects

### Installation

```bash
# Clone the repository
git clone https://github.com/Priyanshu0007/cosmictics.git
cd cosmictics

# Install dependencies
bun install
# or
npm install

# Run the development server
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the live project.

> **Note**: The `--webpack` flag is automatically appended to `dev` and `build` scripts to enable the TypeGPU unplugin integration.

---

## 📜 Scripts Reference

| Command | Description |
|---------|-------------|
| `bun dev` / `npm run dev` | Starts the Next.js development server with webpack (TypeGPU enabled) |
| `bun run build` / `npm run build` | Builds the optimized production package with webpack |
| `bun start` / `npm run start` | Starts the production server for deployed code |
| `bun run lint` / `npm run lint` | Checks file syntax and code formatting standards |

---

**Built with ♥ by [Priyanshu Gupta](https://priyanshu0007.vercel.app)**

[![GitHub](https://img.shields.io/badge/GitHub-Priyanshu0007-181717?style=flat-square&logo=github)](https://github.com/Priyanshu0007)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-22c55e?style=flat-square&logo=vercel)](https://priyanshu0007.vercel.app)
