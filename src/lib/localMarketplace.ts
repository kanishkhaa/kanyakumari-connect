import type { Stay } from "@/data/stays";
import type { Operator } from "@/data/operators";

export type Review = {
  listingId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const stayKey = "kaniya.vendor.stays";
const operatorKey = "kaniya.vendor.operators";
const reviewKey = "kaniya.reviews";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || "") as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getVendorStays() {
  return read<Stay[]>(stayKey, []);
}

export function saveVendorStay(stay: Stay) {
  write(stayKey, [stay, ...getVendorStays()]);
}

export function getVendorOperators() {
  return read<Operator[]>(operatorKey, []);
}

export function saveVendorOperator(operator: Operator) {
  write(operatorKey, [operator, ...getVendorOperators()]);
}

export function getReviews(listingId: string) {
  return read<Review[]>(reviewKey, []).filter((review) => review.listingId === listingId);
}

export function saveReview(review: Review) {
  write(reviewKey, [review, ...read<Review[]>(reviewKey, [])]);
}
