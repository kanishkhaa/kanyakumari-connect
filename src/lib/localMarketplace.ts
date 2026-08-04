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
const reviewListeners = new Set<() => void>();

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
  cachedReviews = storedReviews.length
    ? storedReviews.map((review) => ({ listingId: review.listing_id, name: review.guest_name, rating: review.rating, comment: review.comment, createdAt: review.created_at }))
    : await fetchCollection<Review[]>("reviews", []);
  notifyReviewListeners();

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
