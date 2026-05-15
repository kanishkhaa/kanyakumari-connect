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
  ('operators', '[
    {
      "id": "tip-of-india-tours",
      "name": "Tip of India Tours",
      "type": "General",
      "rating": 4.8,
      "reviews": 412,
      "phone": "+91 94422 11122",
      "email": "info@tipofindiatours.com",
      "speciality": "Full district circuit, sunrise-sunset points, palace routes and South India extensions",
      "verified": true
    }
  ]'::jsonb),
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
