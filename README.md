# Kaniya - Kanyakumari Connect

Kaniya is a modern tourism discovery and planning platform for Kanniyakumari/Kanyakumari. It brings together places to visit, trip planning, stays, local experiences, food, festivals, official tourism contacts, emergency support, eBrochures, tour operators, photo/video galleries, and locally relevant things to buy in one responsive web application.

## Highlights

- Cinematic landing page with rotating hero sections for spiritual, beach, heritage, and nature travel themes.
- Destination discovery with category filtering, detail pages, maps-style metadata, timings, tickets, and travel tips.
- Smart itinerary planner with interests, duration, budget, route suggestions, and live weather fallback behavior.
- Stays directory with booking flow, reviews, local fallback data, and Supabase-ready content.
- Food and events guide with dishes, restaurants, nearby lookup, emergency contacts, and seasonal travel notes.
- Events and festivals calendar backed by shared event data.
- Things to Buy marketplace with authentic Kanyakumari souvenirs, snacks, spices, handloom, and uploaded local assets.
- Tour operators page populated with realistic operator contact data.
- DTPC and tourism information pages based on official Kanniyakumari district tourism resources.
- eBrochures page linking to official government tourism/contact resources and PDF references.
- TravelCare query board with local persistence for traveller questions.
- SOS drawer and footer emergency list using official emergency numbers.
- Search across places, food, stays, experiences, and things to buy.
- English/Tamil language toggle infrastructure.
- Vendor onboarding flow for stays and tour operators.
- Responsive design built for desktop and mobile.

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui-style component primitives
- Radix UI primitives
- Lucide React icons
- Sonner and custom toast components

### Data and Integrations

- Supabase REST API for optional hosted content collections.
- Local TypeScript data modules as deterministic fallback content.
- Browser localStorage for local vendor/review/query persistence.
- Vercel serverless function for nearby food and emergency lookups.
- OpenStreetMap Overpass API for nearby place discovery.

### Tooling

- ESLint
- Vitest
- Vite production build
- Vercel SPA rewrites

## Project Structure

```text
kanyakumari-connect/
  api/
    nearby.js                 # Vercel serverless function for nearby food/emergency lookups
  public/
    robots.txt
  src/
    assets/                   # Local image assets
    components/
      layout/                 # Navbar, footer, app layout
      ui/                     # Reusable UI primitives
      AIAssistant.tsx
      CinematicHero.tsx
      PlaceCard.tsx
    data/                     # Local fallback datasets
    hooks/                    # Shared hooks such as useCollection
    i18n/                     # English/Tamil translation context
    lib/                      # Supabase and local storage helpers
    pages/                    # Route-level pages
    App.tsx                   # Route configuration
    main.tsx                  # Application bootstrap
    index.css                 # Tailwind and design tokens
  supabase/
    schema.sql                # Database schema and seed content
  vite.config.ts
  vercel.json
  package.json
```

## Application Architecture

The app follows a clear page/data/component split.

### Routing Layer

`src/App.tsx` defines all routes with `react-router-dom`. Every primary page is rendered inside `Layout`, which provides:

- `Navbar`
- main route outlet
- `Footer`
- floating `AIAssistant`

Important routes:

```text
/                         Landing page
/places                   Destination listing
/places/:id               Destination detail
/itinerary                Trip planner
/stays                    Stays directory and booking flow
/experiences              Local experiences
/food                     Food, restaurants, emergency contacts
/events                   Events and festivals
/things-to-buy            Local products and souvenirs
/marketplace              Marketplace-style product grid
/operators                Tour operators
/dtpc                     Tourism and DTPC information
/ebrochures               Official resource links
/travelcare               Traveller query board
/search                   Global search
/onboard                  Vendor onboarding
```
### Serverless API

`api/nearby.js` provides a Vercel serverless endpoint:

```text
GET /api/nearby?type=food&lat=...&lon=...
GET /api/nearby?type=emergency&lat=...&lon=...
```

It queries multiple Overpass API endpoints, normalizes nearby restaurants, cafes, hospitals, and police stations, sorts by distance, and returns a compact JSON response.

## Core Features

### Landing Page

The home page combines high-impact destination storytelling with practical navigation:

- Cinematic hero carousel
- Quick action strip
- Iconic places preview
- Trip planning tools
- Weather guidance
- Stays preview
- Events and festivals timeline
- Food discovery section
- Hospitality service links
- Local onboarding call-to-action

### Places

The places experience includes:

- Category filtering for spiritual, heritage, nature, and beach destinations.
- Destination cards with image, rating, timing, region, and summary.
- Detail pages for richer descriptions, highlights, tips, ticket notes, and visitor guidance.

### Itinerary Planner

The itinerary page helps travellers build a practical route based on:

- Number of days
- Budget
- Interests
- Travel pace
- Live weather where available
- Seasonal fallback guidance

### Stays

The stays module supports:

- Curated hotel/resort/homestay listings
- Vendor-added stays
- Booking form
- Dummy payment state
- Guest reviews
- Supabase submission support for bookings and reviews

### Food and Nearby Discovery

The food page includes:

- Local dishes and snacks
- Restaurant suggestions
- Nearby restaurant lookup through geolocation and Overpass
- Emergency-service lookup
- Official emergency contact list

### Events and Festivals

Events are stored as typed event data and reused across:

- `/events`
- Landing page festival timeline

The data includes month, date range, location, category, image, and description.

### Things to Buy

The Things to Buy page highlights realistic Kanyakumari purchases:

- Seashell craft
- Conch/sangu keepsakes
- Palm-leaf products
- Coconut-shell craft
- Brass lamps and idols
- Banana chips and jackfruit chips
- Nagercoil snacks
- Clove, pepper, cinnamon, and masala packets
- Handloom textiles and cotton dhotis

### Tour Operators

The operators page lists realistic operator contacts and websites. It avoids fake rating inflation and invites users to contact providers directly.

### DTPC and Official Tourism Information

The DTPC page uses official Kanniyakumari district tourism contacts, including:

- District Tourist Office
- Tourism Department mobile support
- Hotel Tamil Nadu contact
- Vivekananda Rock Memorial tourism information centre
- District Collectorate contact

Each card links back to the official source.

### eBrochures

The eBrochures page links to official and government tourism resources instead of fake downloadable assets. Resources include:

- Kanniyakumari district tourist information
- Official Kumari Tourism portal
- Vivekananda Rock Memorial visitor information
- Tamil Nadu tourism PDF
- TTDC virtual tour portal
- District contact directory

### SOS and TravelCare

Emergency contact data is shared across:

- Navbar SOS drawer
- Footer
- Food page
- TravelCare page
- AI assistant emergency response

Current emergency contacts include national emergency response, police, fire, ambulance, district control centre, municipality, and tourism department support.

## Database Schema

The Supabase schema is in `supabase/schema.sql`.

Tables:

- `app_content` - JSON content collections keyed by `collection_key`.
- `vendor_applications` - submitted stay/operator applications.
- `bookings` - booking requests and dummy payment status.
- `reviews` - guest reviews for listings.

Row Level Security is enabled with public read/insert policies appropriate for demo/public submission flows.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The Vite config defaults to port `8080`.
