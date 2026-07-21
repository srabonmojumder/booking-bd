import { NextResponse } from "next/server";

/**
 * Offline dummy-data backend for Booking BD.
 *
 * There is no real backend, so `NEXT_PUBLIC_API_ENDPOINT` points here
 * (http://localhost:3015/api-stub). Every server action in src/lib/actions
 * calls `${API_ENDPOINT}/<path>` and this catch-all route answers with
 * realistic, category-appropriate dummy data so the whole site looks "ready".
 *
 * To reconnect a real backend: set NEXT_PUBLIC_API_ENDPOINT in .env to your API
 * base URL and delete this src/app/api-stub folder. No other code changes are
 * needed — the data simply comes from the real API instead.
 */

const CITIES = [
  "Dhaka",
  "Cox's Bazar",
  "Sylhet",
  "Chattogram",
  "Bandarban",
  "Sreemangal",
  "Rangamati",
  "Khulna",
];

const REVIEW_TEXTS = ["Excellent", "Very Good", "Superb", "Wonderful", "Fabulous"];

// Category-appropriate names so cards never show generic "Hotel in Dhaka".
const NAMES: Record<string, string[]> = {
  hotel: [
    "Pan Pacific Sonargaon Dhaka",
    "Sayeman Beach Resort",
    "Grand Sultan Tea Resort & Golf",
    "Long Beach Hotel Cox's Bazar",
    "Radisson Blu Chattogram Bay View",
    "Hotel Sarina Dhaka",
    "Sea Pearl Beach Resort & Spa",
    "Nazimgarh Resort Sylhet",
  ],
  visa: [
    "Dubai Tourist Visa (UAE)",
    "Thailand Tourist Visa",
    "Malaysia eVisa",
    "Singapore Visa",
    "Saudi Arabia Visa",
    "Turkey e-Visa",
    "Schengen Visa (Europe)",
    "United Kingdom Visit Visa",
  ],
  "a2a-visa": [
    "Dubai Airport Transit Visa",
    "Doha Airport Transit Visa",
    "Istanbul Transit Visa",
    "Kuala Lumpur Transit Visa",
    "Bangkok Transit Visa",
    "Singapore Transit Visa",
  ],
  umrah: [
    "7 Nights Umrah Package",
    "10 Nights Umrah — Makkah & Madinah",
    "14 Nights Premium Umrah",
    "Ramadan Special Umrah",
    "Economy Umrah Package",
    "Family Umrah Package (5 Persons)",
    "Luxury 5-Star Umrah",
    "Group Umrah Package",
  ],
  car: [
    "Toyota Premio",
    "Honda Vezel",
    "Toyota Axio",
    "Nissan X-Trail",
    "Toyota Noah",
    "Mitsubishi Pajero",
    "Toyota Allion",
    "Honda Grace",
  ],
  transport: [
    "AC Tourist Bus (36 Seats)",
    "Luxury Microbus (11 Seats)",
    "Toyota Hiace Van",
    "Coaster Bus (30 Seats)",
    "Premium Sedan",
    "Reserve SUV",
  ],
  chauffeur: [
    "Executive Chauffeur Service",
    "Airport Pickup Chauffeur",
    "Full-Day City Chauffeur",
    "Wedding Car with Driver",
    "Corporate Chauffeur",
    "Luxury Sedan Chauffeur",
  ],
  "chauffeur-with-car": [
    "Toyota Premio with Driver",
    "Honda Vezel with Driver",
    "Noah Microbus with Driver",
    "Premium SUV with Driver",
    "Executive Sedan with Driver",
    "Hiace Van with Driver",
  ],
  tour: [
    "Cox's Bazar 3 Days 2 Nights",
    "Sylhet Tea Garden Tour",
    "Sundarbans 2-Day Cruise",
    "Bandarban Hill Adventure",
    "Saint Martin Island Trip",
    "Rangamati Lake Tour",
    "Sreemangal Nature Escape",
    "Kuakata Sea Beach Tour",
  ],
  event: [
    "Sundarbans Boat Safari",
    "Cox's Bazar Beach Activities",
    "Ratargul Swamp Forest Tour",
    "Nafakhum Waterfall Trek",
    "Tea Garden Cycling",
    "Old Dhaka Heritage Walk",
    "Saint Martin Snorkeling",
    "Nilgiri Hill Sunrise Tour",
  ],
};

// Airlines / routes for flight cards.
const FLIGHTS = [
  { airline: "Biman Bangladesh Airlines", from: ["DAC", "Dhaka"], to: ["CXB", "Cox's Bazar"] },
  { airline: "US-Bangla Airlines", from: ["DAC", "Dhaka"], to: ["ZYL", "Sylhet"] },
  { airline: "NOVOAIR", from: ["DAC", "Dhaka"], to: ["CGP", "Chattogram"] },
  { airline: "Air Astra", from: ["DAC", "Dhaka"], to: ["BZL", "Barishal"] },
  { airline: "Biman Bangladesh Airlines", from: ["CGP", "Chattogram"], to: ["DAC", "Dhaka"] },
  { airline: "US-Bangla Airlines", from: ["DAC", "Dhaka"], to: ["JSR", "Jashore"] },
];

const OVERVIEW =
  "Experience the best of Bangladesh with Booking BD — comfortable, reliable and affordable, with instant confirmation and 24/7 customer support. Enjoy a premium booking experience every step of the way.";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function catImage(category: string, i: number): string {
  switch (category) {
    case "hotel":
    case "umrah":
      return "/images/umrahh_hotel.png";
    case "car":
    case "transport":
    case "chauffeur":
    case "chauffeur-with-car":
      return i % 2 ? "/images/car_2.png" : "/images/car_1.png";
    case "tour":
    case "event":
    case "activities":
      return i % 2 ? "/images/bradcomed-banner.png" : "/images/banner.jpg";
    default:
      return "/images/banner.jpg";
  }
}

function catName(category: string, i: number): string {
  const arr = NAMES[category];
  if (arr) return arr[i % arr.length];
  const label = category.charAt(0).toUpperCase() + category.slice(1);
  return `${label} Package ${i + 1}`;
}

function catCity(category: string, i: number): string {
  if (category === "umrah") return "Makkah";
  return CITIES[i % CITIES.length];
}

function catAddress(category: string, i: number): string {
  if (category === "umrah") return "Makkah & Madinah, Saudi Arabia";
  if (category === "visa" || category === "a2a-visa") return "";
  return `${CITIES[i % CITIES.length]}, Bangladesh`;
}

function basePrice(category: string): number {
  const map: Record<string, number> = {
    hotel: 4500,
    visa: 6500,
    "a2a-visa": 7000,
    umrah: 185000,
    car: 3500,
    transport: 5000,
    chauffeur: 4000,
    "chauffeur-with-car": 4500,
    tour: 8500,
    event: 1500,
  };
  return map[category] ?? 4000;
}

function reviewData(i: number) {
  return {
    score_total: Number((4.2 + (i % 8) * 0.1).toFixed(1)),
    score_text: REVIEW_TEXTS[i % REVIEW_TEXTS.length],
    total_review: 60 + i * 17,
    rate_score: {},
  };
}

function makeItem(category: string, i: number) {
  const id = i + 1;
  const rev = reviewData(i);
  const city = catCity(category, i);
  const price = basePrice(category) + i * 500;
  const image = catImage(category, i);

  return {
    id,
    seller_id: 1,
    title: catName(category, i),
    name: catName(category, i),
    slug: `${category}-sample-${id}`,
    address: catAddress(category, i),
    // hotel-style cards read location.city.name / location.country.name
    location: {
      city: { name: city },
      country: { name: category === "umrah" ? "Saudi Arabia" : "Bangladesh" },
      map_lat: "23.8103",
      map_lng: "90.4125",
    },
    map_lat: "23.8103",
    map_lng: "90.4125",
    map_zoom: 12,
    price,
    sale_price: Math.round(price * 0.85),
    price_html: `৳${price}`,
    duration: 2 + (i % 6),
    working_day: 3 + (i % 5),
    express_working_day: 1 + (i % 3),
    star_rate: 3 + (i % 3),
    hotel_info: { type: "Deluxe Room", double: 1, single: 1 },
    service_including: [
      "Free WiFi",
      "Breakfast included",
      "Airport pickup",
      "24/7 support",
    ],
    image_url: image,
    image,
    thumbnail: image,
    banner_image_url: image,
    gallery: [
      image,
      "/images/banner.jpg",
      "/images/bradcomed-banner.png",
    ],
    overview: OVERVIEW,
    content: OVERVIEW,
    description: OVERVIEW,
    is_featured: 1,
    status: "publish",
    review_data: rev,
    review_score: rev.score_total,
    total_review: rev.total_review,
  };
}

function makeFlight(i: number) {
  const f = FLIGHTS[i % FLIGHTS.length];
  const rev = reviewData(i);
  const depHour = 6 + (i % 12);
  const durH = 1 + (i % 2);
  const arrHour = depHour + durH;
  const half = i % 2 ? 30 : 0;
  const price = 4500 + i * 900;
  return {
    id: i + 1,
    title: f.airline,
    airport_from: { code: f.from[0], name: f.from[1] },
    airport_to: { code: f.to[0], name: f.to[1] },
    departure_time: `2026-02-15T${pad(depHour)}:${pad(half)}:00`,
    arrival_time: `2026-02-15T${pad(arrHour)}:${pad(half + 15)}:00`,
    duration: durH,
    min_price: price,
    price,
    sale_price: price,
    review_data: rev,
    review_score: rev.score_total,
    total_review: rev.total_review,
  };
}

function makeList(category: string, count = 6) {
  if (category === "flight") {
    return Array.from({ length: count }, (_, i) => makeFlight(i));
  }
  return Array.from({ length: count }, (_, i) => makeItem(category, i));
}

function listResponse(category: string) {
  const data = makeList(category, 6);
  return {
    rows: {
      data,
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: data.length,
    },
    attributes: [],
    min_max_price: [0, 200000],
    tax_rate: 0,
    error: null,
  };
}

function featuredResponse(category: string) {
  return { rows: makeList(category, 8) };
}

function detailResponse(category: string, slug: string) {
  const row = { ...makeItem(category, 0), slug };
  return {
    row,
    gallery: row.gallery,
    review_list: { data: [] },
    booking_data: {},
    error: null,
  };
}

function locationsResponse(search: string) {
  let cities = CITIES;
  if (search) {
    const q = search.toLowerCase();
    const filtered = CITIES.filter((c) => c.toLowerCase().includes(q));
    cities = filtered.length ? filtered : CITIES;
  }
  const data = cities.map((city, i) => ({
    id: i + 1,
    title: city,
    name: city,
    image: "/images/banner.jpg",
    content: `${city}, Bangladesh`,
    slug: city.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  }));
  return {
    data,
    current_page: 1,
    last_page: 1,
    per_page: data.length,
    total: data.length,
    service_name: "",
  };
}

function destinationsResponse() {
  const rows = CITIES.map((city, i) => ({
    id: i + 1,
    name: city,
    title: city,
    path: city.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    slug: city.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    image_url: "/images/banner.jpg",
    content: `${city}, Bangladesh`,
  }));
  return { rows };
}

function build(slug: string[], search: string) {
  const parts = slug || [];
  const first = parts[0] || "";
  const last = parts[parts.length - 1] || "";

  if (last === "featured") return featuredResponse(first || "hotel");
  if (last === "service-names") {
    return { data: makeList(first || "hotel", 5).map((x) => x.title) };
  }
  if (first === "locations") return locationsResponse(search);
  if (first === "destination") {
    return parts.length > 1
      ? detailResponse("destination", parts[1])
      : destinationsResponse();
  }
  // /<service>/<slug> -> detail ; /<service> -> list
  if (parts.length >= 2) return detailResponse(first, parts[1]);
  return listResponse(first || "hotel");
}

async function handle(
  req: Request,
  ctx: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await ctx.params;
  const search = new URL(req.url).searchParams.get("search") || "";
  return NextResponse.json(build(slug, search));
}

export async function GET(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(req, ctx);
}

export async function POST(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(req, ctx);
}

export async function PUT(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(req, ctx);
}

export async function PATCH(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(req, ctx);
}

export async function DELETE(req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(req, ctx);
}
