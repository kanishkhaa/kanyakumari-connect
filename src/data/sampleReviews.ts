import type { Review } from "@/types/review";

const now = Date.now();
const days = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000).toISOString();

const sampleReviews: Review[] = [
  { listingId: "annai-resorts-spa", name: "Priya R.", rating: 5, comment: "Beautiful resort with excellent service and sea views.", createdAt: days(30) },
  { listingId: "annai-resorts-spa", name: "Arjun K.", rating: 5, comment: "Spa and pool were top notch. Highly recommended.", createdAt: days(90) },
  { listingId: "annai-resorts-spa", name: "Leena S.", rating: 4, comment: "Lovely location — rooms were spacious.", createdAt: days(150) },

  { listingId: "sparsa-resorts-kanyakumari", name: "David M.", rating: 5, comment: "Calm place and helpful staff, enjoyed the garden villa.", createdAt: days(60) },
  { listingId: "sparsa-resorts-kanyakumari", name: "Nisha P.", rating: 4, comment: "Great stay for a relaxed trip.", createdAt: days(120) },
  { listingId: "sparsa-resorts-kanyakumari", name: "Ravi T.", rating: 4, comment: "Nice location; food can improve.", createdAt: days(200) },

  { listingId: "hotel-sea-view", name: "Sunita L.", rating: 4, comment: "Excellent proximity to attractions and ferry.", createdAt: days(20) },
  { listingId: "hotel-sea-view", name: "Manoj B.", rating: 4, comment: "Good sea view rooms, friendly staff.", createdAt: days(75) },
  { listingId: "hotel-sea-view", name: "Anita J.", rating: 4, comment: "Comfortable stay for short visits.", createdAt: days(160) },

  // Additional reviews for other stays — at least 2-3 per property
  { listingId: "hotel-temple-citi", name: "Gopal V.", rating: 4, comment: "Handy location near temple and station.", createdAt: days(45) },
  { listingId: "hotel-temple-citi", name: "Meera S.", rating: 4, comment: "Good value for money.", createdAt: days(140) },

  { listingId: "hotel-sangam", name: "Karthik R.", rating: 4, comment: "Clean rooms and helpful staff.", createdAt: days(88) },
  { listingId: "hotel-sangam", name: "Sangeeta P.", rating: 3, comment: "Rooms were okay; location is convenient.", createdAt: days(210) },

  { listingId: "hotel-sea-face", name: "Olivia H.", rating: 5, comment: "Perfect seaside location, excellent breakfast.", createdAt: days(12) },
  { listingId: "hotel-sea-face", name: "Ramesh K.", rating: 4, comment: "Friendly staff and good view.", createdAt: days(95) },

  { listingId: "hotel-sea-land", name: "Kiran D.", rating: 4, comment: "Good for sunrise watchers.", createdAt: days(33) },
  { listingId: "hotel-sea-land", name: "Shalini M.", rating: 4, comment: "Comfortable stay with basic amenities.", createdAt: days(120) },

  { listingId: "hotel-singaar-international", name: "Vikram S.", rating: 4, comment: "Great conference facilities.", createdAt: days(70) },
  { listingId: "hotel-singaar-international", name: "Priyanka A.", rating: 4, comment: "Spacious rooms and good food.", createdAt: days(180) },

  // Fallback handful for other properties
  { listingId: "hotel-jebasakthy", name: "Suresh N.", rating: 4, comment: "Convenient location.", createdAt: days(44) },
  { listingId: "hotel-samudra", name: "Anjali K.", rating: 4, comment: "Family friendly and affordable.", createdAt: days(110) },
  { listingId: "hotel-sun-park", name: "Rohit P.", rating: 3, comment: "Good location but rooms are dated.", createdAt: days(190) },

  { listingId: "new-cape-hotel", name: "Meenakshi T.", rating: 3, comment: "Practical for rail travellers.", createdAt: days(34) },
  { listingId: "ramraj-regency", name: "Aravind L.", rating: 4, comment: "Solid mid-range option.", createdAt: days(240) },

  // Keep adding simple reviews for coverage
  { listingId: "hotel-tri-sea", name: "Latha R.", rating: 4, comment: "Great sunrise views.", createdAt: days(28) },
  { listingId: "ttdc-hotel-tamilnadu", name: "Kumar P.", rating: 4, comment: "Spacious and reliable.", createdAt: days(85) },
  { listingId: "hotel-gopinivas-grand", name: "Kavitha S.", rating: 4, comment: "Polished and centrally located.", createdAt: days(132) },

  { listingId: "hotel-wins", name: "Saji M.", rating: 3, comment: "Good budget option.", createdAt: days(76) },
  { listingId: "hotel-anand", name: "Balaji R.", rating: 3, comment: "Clean rooms, basic amenities.", createdAt: days(50) },

  { listingId: "hotel-raghavi-tourist-home", name: "Deepa N.", rating: 3, comment: "Simple and convenient.", createdAt: days(210) },
  { listingId: "manickam-tourist-home", name: "Raja S.", rating: 4, comment: "Friendly host and neat rooms.", createdAt: days(60) },

  { listingId: "hotel-rani-residency", name: "Naveen K.", rating: 4, comment: "Good for bus travellers.", createdAt: days(98) },
  { listingId: "hotel-coral-kanyakumari", name: "Aruna P.", rating: 4, comment: "Quiet and comfortable.", createdAt: days(142) },

  { listingId: "hotel-jeyam", name: "Valsa R.", rating: 3, comment: "Practical stay with room service.", createdAt: days(176) },
  { listingId: "hotel-viswa-grand", name: "Manikandan T.", rating: 4, comment: "Good conference facilities.", createdAt: days(64) },

  { listingId: "hotel-udupi-international", name: "Anu G.", rating: 4, comment: "Excellent vegetarian food options.", createdAt: days(26) },
  { listingId: "hotel-jubilee", name: "Sathya P.", rating: 3, comment: "Nice location, average rooms.", createdAt: days(160) },

  { listingId: "hotel-cape-inn", name: "Nandakumar S.", rating: 4, comment: "Peaceful and close to sunset point.", createdAt: days(48) },
  { listingId: "hotel-ocean-heritage", name: "Lakshmi R.", rating: 4, comment: "Lovely sea-facing rooms.", createdAt: days(38) },

  { listingId: "hotel-green-park", name: "Kamal H.", rating: 3, comment: "Affordable and functional.", createdAt: days(202) },
  { listingId: "anantya-resorts", name: "Rohini S.", rating: 5, comment: "Beautiful lake-side retreat.", createdAt: days(18) },
  { listingId: "aanantham-resort", name: "Vivek R.", rating: 4, comment: "Relaxing garden cottages.", createdAt: days(66) },

  { listingId: "khalifa-travels", name: "Nandhini S.", rating: 5, comment: "The day plan was clear, the car arrived on time, and we had enough time at each Kanyakumari landmark.", createdAt: days(18) },
  { listingId: "khalifa-travels", name: "Vijay P.", rating: 4, comment: "Helpful for arranging a family airport pickup and a comfortable local sightseeing day.", createdAt: days(97) },
  { listingId: "khalifa-travels", name: "Asha M.", rating: 5, comment: "Responsive communication and a flexible itinerary that suited our group well.", createdAt: days(164) },
  { listingId: "kk-tours-travels", name: "Rohan G.", rating: 5, comment: "Our cab was clean and the driver suggested sensible timings for the sunrise and temple visits.", createdAt: days(26) },
  { listingId: "kk-tours-travels", name: "Meera D.", rating: 5, comment: "Well-organised trip with friendly support from pickup through the return journey.", createdAt: days(84) },
  { listingId: "kk-tours-travels", name: "Anil K.", rating: 4, comment: "Good local knowledge and a comfortable vehicle for our Kanyakumari and Rameswaram route.", createdAt: days(141) },
  { listingId: "fly-memories-travel-tours", name: "Divya R.", rating: 5, comment: "They made our multi-day South India trip easy to plan and kept every transfer smooth.", createdAt: days(21) },
  { listingId: "fly-memories-travel-tours", name: "Sanjay V.", rating: 4, comment: "Thoughtful itinerary suggestions and dependable coordination for a family holiday.", createdAt: days(109) },
  { listingId: "fly-memories-travel-tours", name: "Farah A.", rating: 5, comment: "The team was patient with our changes and helped us build a relaxed travel schedule.", createdAt: days(177) },
  { listingId: "flybook-tours-travels", name: "Karthik N.", rating: 5, comment: "Our tempo traveller was well maintained and the driver was courteous throughout the trip.", createdAt: days(12) },
  { listingId: "flybook-tours-travels", name: "Priya J.", rating: 4, comment: "A practical choice for group travel; the arrangements and timings were handled professionally.", createdAt: days(72) },
  { listingId: "flybook-tours-travels", name: "Suresh B.", rating: 5, comment: "Easy booking, clean vehicle and helpful advice for our Kanyakumari area itinerary.", createdAt: days(152) },
  { listingId: "subash-travels", name: "Lakshmi T.", rating: 4, comment: "The local sightseeing plan was convenient and the driver was helpful with our elderly parents.", createdAt: days(37) },
  { listingId: "subash-travels", name: "Manoj S.", rating: 5, comment: "Prompt pickup and reliable support when we needed to adjust our hotel and travel timings.", createdAt: days(118) },
  { listingId: "subash-travels", name: "Geetha P.", rating: 4, comment: "A smooth, budget-friendly option for getting around Kanyakumari district.", createdAt: days(192) },
  { listingId: "kanyakumari-travels", name: "Rahul I.", rating: 5, comment: "Excellent route planning for our Kanyakumari, Trivandrum and Rameswaram holiday.", createdAt: days(15) },
  { listingId: "kanyakumari-travels", name: "Shreya K.", rating: 4, comment: "The cab was comfortable, and the team made the sightseeing schedule easy for our children.", createdAt: days(91) },
  { listingId: "kanyakumari-travels", name: "Arun P.", rating: 5, comment: "Quick replies, fair guidance and a memorable local tour from sunrise to sunset.", createdAt: days(170) },
];

export default sampleReviews;
