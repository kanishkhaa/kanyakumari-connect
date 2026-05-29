# Kaniya - Kanyakumari Connect

Kaniya is a modern tourism discovery and planning platform for Kanniyakumari/Kanyakumari. It brings together places to visit, trip planning, stays, local experiences, food, festivals, official tourism contacts, emergency support, eBrochures, tour operators, photo/video galleries, and locally relevant things to buy in one responsive web application.

The project is built as a frontend-first React application with local fallback datasets and optional Supabase-backed dynamic content. It is designed to work reliably in local development while still supporting production content updates through the database.

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

### Data Layer

Most content lives in `src/data/*.ts` as typed local fallback data. Pages that support live content use `useCollection(collectionKey, fallback)` from `src/hooks/useCollection.ts`.

The hook calls `fetchCollection` from `src/lib/supabaseContent.ts`:

1. If Supabase is configured, fetch `payload` from `public.app_content`.
2. If Supabase is unavailable, not configured, empty, or errors, use the local fallback.

This keeps the app useful offline and during development while allowing production content to be updated from Supabase.

Current Supabase-style collection keys include:

```text
stays
operators
events
places
products
```

### Persistence Layer

Some user-generated or demo interactions are stored locally:

- Vendor stays and operators
- Listing reviews
- TravelCare queries

This is handled through `src/lib/localMarketplace.ts` and direct `localStorage` usage in page-level flows.

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

Product images are mapped through `productImage()` so local uploaded `buy-*` assets can be used consistently across Things to Buy, Marketplace, and Search.

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

## Environment Variables

Supabase is optional. Without these variables, the app uses local fallback content.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

If `VITE_SUPABASE_ANON_KEY` is missing, `fetchCollection` returns fallback data.

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

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
npm test
```

### Lint

```bash
npm run lint
```

## Deployment

The project includes `vercel.json` for Vercel deployment:

- SPA routes rewrite to `index.html`.
- `api/nearby.js` is configured as a serverless function with a 20-second max duration.

For production:

1. Configure Supabase environment variables if live content is required.
2. Apply `supabase/schema.sql` to the Supabase project.
3. Deploy to Vercel or any static host that supports SPA fallback routing.

## Content Management Notes

- Add local fallback records in `src/data`.
- Add official or uploaded images in `src/assets`.
- For Things to Buy images, import the asset in `src/data/marketplace.ts` and map it in `productImages`.
- For live content, update `public.app_content.payload` in Supabase with the matching collection key.
- Keep official contact and emergency data source-linked whenever possible.

## Design System

The visual system is defined in `src/index.css` using CSS variables and Tailwind utilities.

Main design elements:

- Warm sand backgrounds
- Sunset orange primary color
- Ocean teal secondary color
- Editorial serif headings
- Rounded cards and soft shadows
- Responsive grids and mobile-friendly sections

Reusable components live under `src/components/ui`, with layout-level composition in `src/components/layout`.

## Quality and Verification

Recommended checks before shipping:

```bash
npm run build
npm run lint
npm test
```

For visual changes, verify at minimum:

- Home page hero and timeline
- Places listing and detail page
- Things to Buy and Marketplace image mapping
- Navbar SOS drawer
- Mobile navigation
- `/operators`, `/dtpc`, and `/ebrochures`

## Known Considerations

- Some user-generated data is stored in `localStorage` for demo behavior.
- Supabase content is optional and falls back to local data.
- Nearby discovery depends on Overpass API availability.
- Several UI packages are installed for future expansion, though not every package is used on every page.

## License

This project is private unless a license is added by the project owner.
