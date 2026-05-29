create table if not exists public.app_content (
  collection_key text primary key,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.vendor_applications (
  id uuid primary key default gen_random_uuid(),
  listing_type text not null check (listing_type in ('stay', 'operator')),
  status text not null default 'needs_review',
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  listing_type text not null,
  listing_id text not null,
  listing_name text not null,
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  check_in date,
  check_out date,
  payment_status text not null default 'dummy_pending',
  amount numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  listing_type text not null,
  listing_id text not null,
  guest_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

alter table public.app_content enable row level security;
alter table public.vendor_applications enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "Read public content" on public.app_content;
create policy "Read public content" on public.app_content for select using (true);

drop policy if exists "Submit vendor applications" on public.vendor_applications;
create policy "Submit vendor applications" on public.vendor_applications for insert with check (true);

drop policy if exists "Submit bookings" on public.bookings;
create policy "Submit bookings" on public.bookings for insert with check (true);

drop policy if exists "Read reviews" on public.reviews;
create policy "Read reviews" on public.reviews for select using (true);

drop policy if exists "Submit reviews" on public.reviews;
create policy "Submit reviews" on public.reviews for insert with check (true);

insert into public.app_content (collection_key, payload)
values
  ('stays', '[]'::jsonb),
  ('products', $$[
    {
      "id": "seashell-crafts",
      "name": "Seashell Souvenirs and Shell Jewellery",
      "artisan": "Beachfront craft stalls",
      "village": "Kanyakumari Beach Road",
      "image": "",
      "price": 150,
      "category": "Sea Craft",
      "description": "Decorative conch shells, shell necklaces, earrings, curios, pen stands and small home decor pieces are among the most common Kanyakumari souvenirs.",
      "whereToBuy": "Beach Road stalls, Poompuhar Handicrafts Emporium and local souvenir shops near the seafront."
    },
    {
      "id": "conch-shell-keepsakes",
      "name": "Conch Shell Keepsakes and Sangu Decor",
      "artisan": "Seafront shell craft sellers",
      "village": "Kanyakumari Beach and temple streets",
      "image": "",
      "price": 200,
      "category": "Sea Craft",
      "description": "Polished conch shells, small sangu display pieces, shell keychains and desk curios are easy-to-pack keepsakes from the coastal bazaar.",
      "whereToBuy": "Beach Road stalls, lanes behind Bhagavathi Amman Temple and established souvenir shops near the seafront."
    },
    {
      "id": "palm-leaf-products",
      "name": "Palm Leaf Articles and Framed Palm Drawings",
      "artisan": "Local palm craft makers",
      "village": "Kanyakumari town and nearby villages",
      "image": "",
      "price": 250,
      "category": "Palm & Wood Craft",
      "description": "Palm-leaf baskets, mats, small boxes, drawings and framed keepsakes reflect the district's coastal craft traditions.",
      "whereToBuy": "Souvenir shops around the beach, Tamil Nadu craft outlets and local market lanes."
    },
    {
      "id": "palm-leaf-framed-art",
      "name": "Preserved Palm Leaf Drawings",
      "artisan": "Palm craft artists",
      "village": "Kanyakumari town",
      "image": "",
      "price": 300,
      "category": "Palm & Wood Craft",
      "description": "Framed drawings and paintings on preserved palm leaves are a distinctive lightweight souvenir, often showing temples, coastal scenes and devotional motifs.",
      "whereToBuy": "Poompuhar, Tamil Nadu craft shops and beach-side handicraft stores."
    },
    {
      "id": "wood-bamboo-handicrafts",
      "name": "Wood, Bamboo and Brass Handicrafts",
      "artisan": "Tamil Nadu craft sellers",
      "village": "Kanyakumari and Nagercoil",
      "image": "",
      "price": 400,
      "category": "Palm & Wood Craft",
      "description": "Wooden showpieces, bamboo articles, brass idols and carved devotional souvenirs are widely sold for gifting and home decor.",
      "whereToBuy": "Poompuhar, Tamil Nadu Crafts, Indco outlets and established handicraft shops."
    },
    {
      "id": "brass-lamps-idols",
      "name": "Brass Lamps, Idols and Puja Articles",
      "artisan": "Tamil Nadu metal craft sellers",
      "village": "Kanyakumari / Nagercoil",
      "image": "",
      "price": 550,
      "category": "Brass & Metal Craft",
      "description": "Small brass lamps, devotional idols and puja articles suit temple-route travellers who want a traditional Tamil Nadu craft piece.",
      "whereToBuy": "Poompuhar Handicrafts Emporium, temple-street shops and verified handicraft stores."
    },
    {
      "id": "coconut-shell-craft",
      "name": "Coconut Shell Vases, Bowls and Decor",
      "artisan": "Wood and coco craft workshops",
      "village": "Manakudy and Kanyakumari district",
      "image": "",
      "price": 250,
      "category": "Coconut Craft",
      "description": "Coconut shell flower vases, small bowls and polished decor pieces are practical coastal craft buys from the district's wood-and-coco makers.",
      "whereToBuy": "Local handicraft shops in Kanyakumari town, Manakudy-side workshops and craft counters."
    },
    {
      "id": "banana-chips",
      "name": "Nendran Banana Chips and Jackfruit Chips",
      "artisan": "Local snack makers",
      "village": "Nagercoil and Kanyakumari",
      "image": "",
      "price": 120,
      "category": "Food Souvenir",
      "description": "Crisp banana chips and jackfruit chips are popular edible souvenirs, often fried fresh and packed for travel.",
      "whereToBuy": "Sweet shops, snack stores and markets in Nagercoil and Kanyakumari town."
    },
    {
      "id": "jackfruit-chips",
      "name": "Jackfruit Chips",
      "artisan": "Kumari snack makers",
      "village": "Nagercoil and Kurunthancode",
      "image": "",
      "price": 140,
      "category": "Food Souvenir",
      "description": "Jackfruit chips are sold alongside banana chips and mixtures, with sealed packets making them easier to carry on road and rail trips.",
      "whereToBuy": "Nagercoil snack stores, Vadasery market area and packaged-snack counters in Kanyakumari."
    },
    {
      "id": "nagercoil-savouries",
      "name": "Nagercoil Pakoda, Murukku and Mixture",
      "artisan": "Traditional sweet and snack stalls",
      "village": "Vadasery, Nagercoil",
      "image": "",
      "price": 100,
      "category": "Food Souvenir",
      "description": "Pakoda, murukku, karasev, mixture and sweet boxes from Nagercoil are local favourites when bought fresh from long-running snack shops.",
      "whereToBuy": "Vadasery and Nagercoil sweet stalls, especially shops that fry and pack snacks daily."
    },
    {
      "id": "kanyakumari-clove-pepper",
      "name": "Kanyakumari Clove and Black Pepper",
      "artisan": "Hill and market traders",
      "village": "Maramalai, Karumparai, Velimalai and Nagercoil markets",
      "image": "",
      "price": 160,
      "category": "Spices",
      "description": "The district's Western Ghats belt is known for clove, with pepper also moving through Nagercoil's spice shops and markets.",
      "whereToBuy": "Nagercoil markets, spice stores and verified packaged-food shops."
    },
    {
      "id": "cardamom-masala-packets",
      "name": "Cardamom, Cinnamon and House Masala Packets",
      "artisan": "Spice merchants",
      "village": "Nagercoil and hill-produce markets",
      "image": "",
      "price": 180,
      "category": "Spices",
      "description": "Cardamom, cinnamon, turmeric, dried ginger and house masala blends are practical edible souvenirs when bought sealed and labelled.",
      "whereToBuy": "Nagercoil spice stores, supermarkets and verified packaged-food shops around Kanyakumari."
    },
    {
      "id": "handloom-textiles",
      "name": "Handloom Textiles and Cotton Sarees",
      "artisan": "Co-op and textile emporiums",
      "village": "Kanyakumari / Nagercoil",
      "image": "",
      "price": 900,
      "category": "Textile",
      "description": "Cotton sarees, handloom fabrics and simple traditional textiles are available through cooperative and state emporium-style shops.",
      "whereToBuy": "Tamil Nadu Co-optex Sales Emporium, Indco Products and textile shops in Nagercoil."
    },
    {
      "id": "cotton-dhotis-towels",
      "name": "Cotton Dhotis, Towels and Everyday Handloom",
      "artisan": "Co-op and textile sellers",
      "village": "Kanyakumari / Nagercoil",
      "image": "",
      "price": 250,
      "category": "Textile",
      "description": "Light cotton dhotis, towels and daily-use handloom pieces are useful buys for travellers who prefer locally made textiles over decorative souvenirs.",
      "whereToBuy": "Co-optex counters, Indco Products and established textile stores in Nagercoil."
    }
  ]$$::jsonb),
  ('operators', $$[
    {
      "id": "khalifa-travels",
      "name": "Khalifa Travels",
      "type": "General",
      "rating": 0,
      "reviews": 0,
      "phone": "+91 99943 54798",
      "email": "info@khalifatravels.com",
      "speciality": "Kanyakumari-district travel agency offering car hire, guided group tours and holiday packages.",
      "verified": true,
      "website": "https://www.khalifatravels.com/"
    },
    {
      "id": "kk-tours-travels",
      "name": "KK Tours & Travels",
      "type": "General",
      "rating": 0,
      "reviews": 0,
      "phone": "+91 98883 94442",
      "email": "booking@kktoursntravels.com",
      "speciality": "Kanyakumari local sightseeing, holiday packages and cab booking support.",
      "verified": true,
      "website": "https://www.kktoursntravels.com/"
    },
    {
      "id": "fly-memories-travel-tours",
      "name": "Fly Memories Travel & Tours",
      "type": "General",
      "rating": 0,
      "reviews": 0,
      "phone": "+91 94425 04890",
      "email": "info@flymemories.com",
      "speciality": "Family-owned Kanyakumari-district operator for Kumari, South India and Sri Lanka tour packages.",
      "verified": true,
      "website": "https://www.flymemories.com/contactus.php"
    },
    {
      "id": "flybook-tours-travels",
      "name": "Flybook Tours & Travels",
      "type": "General",
      "rating": 0,
      "reviews": 0,
      "phone": "+91 98652 32346",
      "email": "info@flybooktoursandtravels.com",
      "speciality": "Marthandam/Kanyakumari travel agency for group tours, car hire, air, train and bus ticketing.",
      "verified": true,
      "website": "https://www.flybooktoursandtravels.com/"
    },
    {
      "id": "subash-travels",
      "name": "Subash Travels",
      "type": "General",
      "rating": 0,
      "reviews": 0,
      "phone": "+91 97892 40405",
      "email": "subash9817@gmail.com",
      "speciality": "Atchankulam-based Kanyakumari travel agency for sightseeing, vehicle booking, hotels and travel guides.",
      "verified": true,
      "website": "https://www.subashtravel.in/"
    }
  ]$$::jsonb),
  ('events', '[
    {
      "id": "suchindram-margazhi-car-festival",
      "title": "Suchindram Margazhi Car Festival",
      "date": "December / January",
      "month": "January",
      "location": "Thanumalayan Temple, Suchindram",
      "category": "Spiritual",
      "image": "https://upload.wikimedia.org/wikipedia/commons/7/76/Suchindram_Temple_Gopuram.jpg",
      "description": "The famous 10-day Margazhi festival at Suchindram features temple processions and the car festival that draws devotees from across Kanyakumari district."
    }
  ]'::jsonb)
on conflict (collection_key) do update set payload = excluded.payload, updated_at = now();
