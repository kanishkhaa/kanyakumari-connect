import type { Stay } from "@/data/stays";
import type { Operator } from "@/data/operators";
import { fetchCollection, saveCollection, insertRow, fetchTableRows } from "./supabaseContent";

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

export async function initMarketplaceFromSupabase() {
  cachedStays = await fetchCollection<Stay[]>("stays", []);
  cachedOperators = await fetchCollection<Operator[]>("operators", []);
  cachedReviews = await fetchCollection<Review[]>("reviews", []);

  // Fetch host applications from vendor_applications table or fallback collection
  const dbApps = await fetchTableRows<{ id: string; listing_type: string; status: string; payload: HostApplication }>("vendor_applications");
  if (dbApps && dbApps.length > 0) {
    cachedApplications = dbApps.map((row) => row.payload || (row as unknown as HostApplication));
  } else {
    cachedApplications = await fetchCollection<HostApplication[]>("host_applications", []);
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

export async function saveReview(review: Review) {
  cachedReviews = [review, ...cachedReviews];
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
  return cachedApplications;
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