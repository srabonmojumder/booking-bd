import { NextResponse } from "next/server";

/**
 * Offline dummy-data backend for Booking BD.
 *
 * There is no real backend, so `NEXT_PUBLIC_API_ENDPOINT` points here
 * (http://localhost:3015/api-stub). Every server action in src/lib/actions
 * calls `${API_ENDPOINT}/<path>` and this catch-all route answers with
 * realistic, type-shaped dummy data so the whole site looks "ready":
 *
 *   GET /api-stub/visa                 -> list of visas          (rows.data[])
 *   GET /api-stub/hotel/featured       -> featured hotels        (rows[])
 *   GET /api-stub/car/some-slug        -> single car detail      (row)
 *   GET /api-stub/locations            -> search-form locations  (data[])
 *   GET /api-stub/destination          -> footer destinations    (rows[])
 *
 * To reconnect a real backend: set NEXT_PUBLIC_API_ENDPOINT in .env to your API
 * base URL and delete this src/app/api-stub folder. No other code changes are
 * needed — the data simply comes from the real API instead.
 */

// Real images that exist in /public/images so <Image> renders offline.
const IMAGES = [
  "/images/banner.jpg",
  "/images/car_1.png",
  "/images/car_2.png",
  "/images/umrahh_hotel.png",
  "/images/bradcomed-banner.png",
  "/images/business_1.png",
  "/images/business_2.png",
  "/images/whoochoose_1.png",
  "/images/whoochoose_2.png",
  "/images/whoochoose_3.png",
];

const CITIES = [
  "Dhaka",
  "Cox's Bazar",
  "Sylhet",
  "Chattogram",
  "Sreemangal",
  "Bandarban",
  "Rangamati",
  "Khulna",
];

const REVIEW_TEXTS = ["Excellent", "Very Good", "Superb", "Wonderful", "Fabulous"];

function labelFor(category: string): string {
  const map: Record<string, string> = {
    visa: "Visa",
    "a2a-visa": "Airport Visa",
    hotel: "Hotel",
    car: "Car",
    event: "Activity",
    tour: "Tour Package",
    umrah: "Umrah Package",
    transport: "Transport",
    chauffeur: "Chauffeur",
    flight: "Flight",
  };
  return map[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
  const city = CITIES[i % CITIES.length];
  const title = `${labelFor(category)} in ${city}`;
  const price = 3500 + i * 750;
  const image = IMAGES[i % IMAGES.length];
  const review = reviewData(i);

  return {
    id,
    seller_id: 1,
    title,
    name: title,
    slug: `${category}-sample-${id}`,
    address: `${city}, Bangladesh`,
    location: `${city}, Bangladesh`,
    map_lat: "23.8103",
    map_lng: "90.4125",
    map_zoom: 12,
    price,
    sale_price: Math.round(price * 0.85),
    price_html: `৳${price}`,
    duration: 2 + (i % 5),
    working_day: 3 + (i % 5),
    express_working_day: 1 + (i % 3),
    service_including: [
      "Free WiFi",
      "Breakfast included",
      "Airport pickup",
      "24/7 support",
    ],
    image_url: image,
    image,
    banner_image_url: IMAGES[(i + 1) % IMAGES.length],
    gallery: [
      IMAGES[i % IMAGES.length],
      IMAGES[(i + 1) % IMAGES.length],
      IMAGES[(i + 2) % IMAGES.length],
    ],
    overview:
      "Enjoy a premium experience with Booking BD. This is sample content shown while no backend is connected — set NEXT_PUBLIC_API_ENDPOINT to your real API to replace it with live data. Comfortable, reliable and affordable options across Bangladesh.",
    content: "Sample Booking BD demo content.",
    description: "Sample Booking BD demo content.",
    is_featured: 1,
    status: "publish",
    review_data: review,
    review_score: review,
  };
}

function makeList(category: string, count = 6) {
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
    min_max_price: [0, 20000],
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

function locationsResponse() {
  const data = CITIES.map((city, i) => ({
    id: i + 1,
    title: city,
    name: city,
    image: IMAGES[i % IMAGES.length],
    content: `${city}, Bangladesh`,
    slug: slugify(city),
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
    path: slugify(city),
    slug: slugify(city),
    image_url: IMAGES[i % IMAGES.length],
    content: `${city}, Bangladesh`,
  }));
  return { rows };
}

function build(slug: string[]) {
  const parts = slug || [];
  const first = parts[0] || "";
  const last = parts[parts.length - 1] || "";

  if (last === "featured") return featuredResponse(first || "hotel");
  if (last === "service-names") {
    return { data: makeList(first || "hotel", 5).map((x) => x.title) };
  }
  if (first === "locations") return locationsResponse();
  if (first === "destination") {
    return parts.length > 1
      ? detailResponse("destination", parts[1])
      : destinationsResponse();
  }
  // /<service>/<slug> -> detail ; /<service> -> list
  if (parts.length >= 2) return detailResponse(first, parts[1]);
  return listResponse(first || "hotel");
}

async function handle(ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params;
  return NextResponse.json(build(slug));
}

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(ctx);
}

export async function POST(_req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(ctx);
}

export async function PUT(_req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(ctx);
}

export async function PATCH(_req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(ctx);
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  return handle(ctx);
}
