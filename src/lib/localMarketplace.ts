import type { Stay } from "@/data/stays";
import type { Operator } from "@/data/operators";
import { fetchCollection, saveCollection, insertRow, fetchTableRows } from "./supabaseContent";
import type { Review as ReviewType } from "@/types/review";
import sampleReviews from "@/data/sampleReviews";
 

export type Review = {
  listingId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type HostApplication = {
  id: string;
  owner: string;
  business: string;
  listingType: string;
  town: string;
  phone: string;
  email: string;
  description: string;
  status: "approved" | "needs_review";
  submittedAt: string;
  documents: {
    idProof: boolean;
    ownership: boolean;
    license: boolean;
  };
};

// In-memory runtime cache for seamless UI rendering
let cachedStays: Stay[] = [];
let cachedOperators: Operator[] = [];
let cachedReviews: Review[] = [];
let cachedApplications: HostApplication[] = [];
const reviewListeners = new Set<() => void>();

const demoHostApplications: HostApplication[] = [
  { id: "demo-host-1", owner: "Meena Raj", business: "Cape View Homestay", listingType: "Homestay", town: "Kanyakumari", phone: "+91 98765 11001", email: "meena@capeview.example", description: "Family-run sea-view rooms close to the sunrise point.", status: "approved", submittedAt: "02 Aug 2026", documents: { idProof: true, ownership: true, license: true } },
  { id: "demo-host-2", owner: "Arun Kumar", business: "Western Ghats Trail Co.", listingType: "Tour operator", town: "Nagercoil", phone: "+91 98765 11002", email: "arun@ghatstrails.example", description: "Small-group day trips to waterfalls, dams and village trails.", status: "needs_review", submittedAt: "01 Aug 2026", documents: { idProof: true, ownership: true, license: false } },
  { id: "demo-host-3", owner: "Fathima Noor", business: "Sea Shell Crafts", listingType: "Local shop", town: "Kanyakumari", phone: "+91 98765 11003", email: "fathima@seashell.example", description: "Handmade shell art and locally sourced souvenir gifts.", status: "approved", submittedAt: "30 Jul 2026", documents: { idProof: true, ownership: true, license: true } },
  { id: "demo-host-4", owner: "Suresh Babu", business: "Thirparappu River Café", listingType: "Restaurant", town: "Thirparappu", phone: "+91 98765 11004", email: "suresh@rivercafe.example", description: "Traditional lunch and refreshments for waterfall visitors.", status: "needs_review", submittedAt: "28 Jul 2026", documents: { idProof: true, ownership: false, license: true } },
];

type StoredReview = {
  listing_id: string;
  guest_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

const notifyReviewListeners = () => reviewListeners.forEach((listener) => listener());

export async function initMarketplaceFromSupabase() {
  cachedStays = await fetchCollection<Stay[]>("stays", []);
  cachedOperators = await fetchCollection<Operator[]>("operators", []);
  const storedReviews = await fetchTableRows<StoredReview>("reviews", {
    select: "listing_id,guest_name,rating,comment,created_at",
    order: "created_at.desc",
  });
  if (storedReviews && storedReviews.length) {
    cachedReviews = storedReviews.map((review) => ({ listingId: review.listing_id, name: review.guest_name, rating: review.rating, comment: review.comment, createdAt: review.created_at }));
  } else {
    // Fall back to remote collection, or seeded sample reviews when empty
    const fetched = await fetchCollection<Review[]>("reviews", []);
    cachedReviews = fetched.length ? fetched : sampleReviews;
  }
  notifyReviewListeners();

  // Fetch host applications from vendor_applications table or fallback collection
  const dbApps = await fetchTableRows<{ id: string; listing_type: string; status: string; payload: HostApplication }>("vendor_applications");
  if (dbApps && dbApps.length > 0) {
    cachedApplications = dbApps.map((row) => row.payload || (row as unknown as HostApplication));
  } else {
    cachedApplications = await fetchCollection<HostApplication[]>("host_applications", []);
    if (cachedApplications.length === 0) cachedApplications = demoHostApplications;
  }
}

// Auto-trigger load
if (typeof window !== "undefined") {
  initMarketplaceFromSupabase();
}

export function getVendorStays(): Stay[] {
  return cachedStays;
}

export async function saveVendorStay(stay: Stay) {
  cachedStays = [stay, ...cachedStays];
  await saveCollection("stays", cachedStays);
}

export function getVendorOperators(): Operator[] {
  return cachedOperators;
}

export async function saveVendorOperator(operator: Operator) {
  cachedOperators = [operator, ...cachedOperators];
  await saveCollection("operators", cachedOperators);
}

export function getReviews(listingId: string): Review[] {
  return cachedReviews.filter((review) => review.listingId === listingId);
}

export function subscribeToReviews(listener: () => void) {
  reviewListeners.add(listener);
  return () => {
    reviewListeners.delete(listener);
  };
}

export async function saveReview(review: Review) {
  cachedReviews = [review, ...cachedReviews];
  notifyReviewListeners();
  await saveCollection("reviews", cachedReviews);
  await insertRow("reviews", {
    listing_type: "general",
    listing_id: review.listingId,
    guest_name: review.name,
    rating: review.rating,
    comment: review.comment,
  });
}

export function getHostApplications(): HostApplication[] {
  return cachedApplications.length ? cachedApplications : demoHostApplications;
}

export async function saveHostApplication(application: HostApplication) {
  cachedApplications = [application, ...cachedApplications];
  await saveCollection("host_applications", cachedApplications);
  await insertRow("vendor_applications", {
    id: application.id,
    listing_type: application.listingType,
    status: application.status,
    payload: application,
  });
}
