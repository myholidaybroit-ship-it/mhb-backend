// Seed content mirrored from the MyHolidayBro Next.js front end.
// This is the initial dataset the admin loads into localStorage on first run.
// Every field here maps to something the front end renders.

const wix = (slug) =>
  `https://static.wixstatic.com/media/${slug}/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/${slug}`;

export const ADVENTURE_THEMES = [
  "Mountains", "Beaches", "Heritage", "Desert", "Backpacking", "Spiritual", "City Lights", "Tropical",
];

const SLUG = {
  bali: "nsplsh_657846644f576b59425177~mv2.jpg",
  thailand: "nsplsh_6a574b6b2d305a42557967~mv2_d_4439_3072_s_4_2.jpg",
  singapore: "nsplsh_df573ee0f6154a9a80b452293e2c0475~mv2.jpg",
  malaysia: "nsplsh_05291b47a88e40e986ad33b6de021909~mv2.jpg",
  vietnam: "11062b_a0faae69bec6475c834fa172822d6ba9~mv2.jpeg",
  dubai: "e7beb6_45e14c300a1f4d98a7b96422aaac6f10~mv2.jpg",
  maldives: "nsplsh_4d314f6278767357566859~mv2.jpg",
  maldives2: "nsplsh_6c543972716647376c6351~mv2_d_5464_3070_s_4_2.jpg",
  himachal: "nsplsh_c9a8db6c852e41de80d01c2d166a13ee~mv2.jpg",
  northeast: "nsplsh_ce21f1ca7cb74b3397fee018e612680b~mv2.jpg",
};
const img = (key) => wix(SLUG[key] || SLUG.bali);
// Cloudinary image helper (used by moments, whyUs, partners, contact collages)
const cld = (path) => `https://res.cloudinary.com/dyxxkrq8r/image/upload/${path}`;

// Helper to keep destination seed compact while complete.
const dest = (o) => ({
  overview: [],
  highlights: [],
  packages: [],
  itinerary: [],
  galleryKeys: [],
  visa: null,
  ...o,
});

export const SEED_DESTINATIONS = [
  dest({
    slug: "bali", name: "Bali", country: "Indonesia", region: "International", imageKey: "bali",
    image: img("bali"), fromPrice: "₹13,999", rating: 4.8, reviews: 412,
    tagline: "Temples, volcanoes, and beach-club sunsets.", bestTime: "Apr – Oct",
    idealFor: "Couples · Honeymoon · Friends", visa: "Free visa on arrival",
    themes: ["Beaches", "Tropical", "Spiritual"],
    overview: [
      "Bali is the island that does it all — emerald rice terraces in Ubud, surf beaches in Seminyak, clifftop temples at Uluwatu, and a volcano sunrise at Mount Batur. It's equal parts adventure, romance, and pure relaxation.",
      "Our Bali trips balance the icons with the hidden corners — a private waterfall most travellers miss, a Balinese cooking session, and sunset at Tanah Lot — all on private transfers with an English-speaking driver.",
    ],
    highlights: ["Mount Batur volcano sunrise", "Ubud rice terraces & monkey forest", "Water sports at Tanjung Benoa", "Tanah Lot sunset temple", "Uluwatu clifftop temple", "Seminyak beach clubs"],
    packages: [
      { name: "Bali Super Saver", days: 5, nights: 4, price: "₹13,999", original: "₹20,000", route: "Kuta · Ubud", tag: "Couple" },
      { name: "Bali Honeymoon Special", days: 6, nights: 5, price: "₹24,999", original: "₹34,000", route: "Ubud · Uluwatu", tag: "Honeymoon" },
      { name: "Bali Adventure Week", days: 7, nights: 6, price: "₹32,999", original: "₹44,000", route: "Ubud · Nusa Penida", tag: "Friends" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bali", desc: "Welcome at Ngurah Rai Airport and private transfer to your hotel. Evening at leisure." },
      { day: 2, title: "Kintamani & Ubud Village", desc: "Explore Ubud village, then head to Kintamani for sweeping Mount Batur volcano views." },
      { day: 3, title: "Water Sports & Tanah Lot", desc: "Parasailing, banana boat and jet ski at Tanjung Benoa, then a sunset at the sacred Tanah Lot temple." },
      { day: 4, title: "Uluwatu Tour", desc: "Free morning. Afternoon visit to the clifftop Uluwatu temple with a dramatic sunset backdrop." },
      { day: 5, title: "Departure", desc: "Breakfast, checkout and airport transfer as per your flight." },
    ],
  }),
  dest({
    slug: "thailand", name: "Thailand", country: "Thailand", region: "International", imageKey: "thailand",
    image: img("thailand"), fromPrice: "₹13,999", rating: 4.7, reviews: 526,
    tagline: "Island-hopping, street food, and city buzz.", bestTime: "Nov – Mar",
    idealFor: "Friends · Couples · Groups", visa: "Visa on arrival",
    themes: ["Beaches", "Backpacking", "Tropical"],
    overview: [
      "From the turquoise bays of Phi Phi to the neon energy of Bangkok, Thailand packs beaches, temples, markets and nightlife into one unforgettable trip.",
      "Our Thailand itineraries mix Phuket island days with Bangkok city nights, with speedboat tours, a floating market, and the Grand Palace all sorted for you.",
    ],
    highlights: ["Phi Phi & James Bond island tour", "Bangkok Grand Palace", "Phuket beaches & nightlife", "Floating & night markets", "Thai cooking experience", "Rooftop sky bars"],
    packages: [
      { name: "Thailand Super Saver", days: 4, nights: 3, price: "₹13,999", original: "₹20,000", route: "Phuket", tag: "Friends" },
      { name: "Phuket + Krabi Escape", days: 6, nights: 5, price: "₹27,999", original: "₹38,000", route: "Phuket · Krabi", tag: "Couple" },
      { name: "Bangkok + Pattaya Combo", days: 5, nights: 4, price: "₹22,999", original: "₹31,000", route: "Bangkok · Pattaya", tag: "Group" },
    ],
    itinerary: [
      { day: 1, title: "Arrival in Phuket", desc: "Airport pickup and transfer to your resort. Evening free for Patong beach." },
      { day: 2, title: "Phi Phi Island Tour", desc: "Speedboat tour to Phi Phi, Maya Bay and Khai Island with snorkeling and lunch." },
      { day: 3, title: "Phuket City & Big Buddha", desc: "Old town, Big Buddha and Karon viewpoint, evening at leisure." },
      { day: 4, title: "Departure", desc: "Breakfast and airport transfer for your flight home." },
    ],
  }),
  dest({ slug: "malaysia", name: "Malaysia", country: "Malaysia", region: "International", imageKey: "malaysia", image: img("malaysia"), fromPrice: "₹13,999", rating: 4.6, reviews: 318, tagline: "Skyline towers, rainforests, and island calm.", bestTime: "Dec – Feb", idealFor: "Family · Couples · Friends", visa: "Visa required (eNTRI/eVISA)", themes: ["City Lights", "Tropical"],
    highlights: ["Petronas Twin Towers", "Genting Highlands", "Batu Caves", "Langkawi cable car", "KL city tour", "Island day trip"],
    packages: [{ name: "Malaysia Super Saver", days: 5, nights: 4, price: "₹13,999", original: "₹19,000", route: "Kuala Lumpur", tag: "Couple" }, { name: "KL + Langkawi", days: 6, nights: 5, price: "₹29,999", original: "₹39,000", route: "KL · Langkawi", tag: "Family" }] }),
  dest({ slug: "vietnam", name: "Vietnam", country: "Vietnam", region: "International", imageKey: "vietnam", image: img("vietnam"), fromPrice: "₹27,000", rating: 4.7, reviews: 244, tagline: "Limestone bays, lantern towns, and great coffee.", bestTime: "Feb – Apr", idealFor: "Couples · Backpackers · Friends", visa: "e-Visa required", themes: ["Heritage", "Backpacking"] }),
  dest({ slug: "singapore", name: "Singapore", country: "Singapore", region: "International", imageKey: "singapore", image: img("singapore"), fromPrice: "₹21,999", rating: 4.8, reviews: 389, tagline: "Gardens, light shows, and a foodie skyline.", bestTime: "Year-round", idealFor: "Family · Couples", visa: "Visa required", themes: ["City Lights"] }),
  dest({ slug: "dubai", name: "Dubai", country: "UAE", region: "International", imageKey: "dubai", image: img("dubai"), fromPrice: "₹21,999", rating: 4.7, reviews: 471, tagline: "Desert dunes, gold souks, and record-breaking skylines.", bestTime: "Nov – Mar", idealFor: "Family · Couples · Friends", visa: "Visa on arrival (e-Visa)", themes: ["Desert", "City Lights"] }),
  dest({ slug: "maldives", name: "Maldives", country: "Maldives", region: "International", imageKey: "maldives", image: img("maldives"), fromPrice: "₹33,999", rating: 4.9, reviews: 286, tagline: "Overwater villas and impossibly blue lagoons.", bestTime: "Nov – Apr", idealFor: "Honeymoon · Couples", visa: "Free visa on arrival", themes: ["Beaches", "Tropical"] }),
  dest({ slug: "egypt", name: "Egypt", country: "Egypt", region: "International", imageKey: "northeast", image: img("northeast"), fromPrice: "₹62,999", rating: 4.6, reviews: 132, tagline: "Pyramids, Nile cruises, and ancient temples.", bestTime: "Oct – Apr", idealFor: "Heritage · Families", visa: "e-Visa required", themes: ["Desert", "Heritage"] }),
  dest({ slug: "turkey", name: "Turkey", country: "Turkey", region: "International", imageKey: "northeast", image: img("northeast"), fromPrice: "₹63,999", rating: 4.7, reviews: 158, tagline: "Hot-air balloons, bazaars, and two continents.", bestTime: "Apr – Jun · Sep – Nov", idealFor: "Couples · Friends", visa: "e-Visa required", themes: ["Heritage", "City Lights"] }),
  dest({ slug: "france-switzerland", name: "France + Switzerland", country: "France & Switzerland", region: "International", imageKey: "northeast", image: img("northeast"), fromPrice: "₹99,999", rating: 4.8, reviews: 96, tagline: "Paris romance meets Alpine snow peaks.", bestTime: "May – Sep", idealFor: "Honeymoon · Family", visa: "Schengen visa required", themes: ["Mountains", "City Lights"] }),
  dest({ slug: "greece", name: "Greece", country: "Greece", region: "International", imageKey: "singapore", image: img("singapore"), fromPrice: "₹99,999", rating: 4.8, reviews: 104, tagline: "Whitewashed islands and ancient ruins.", bestTime: "Apr – Oct", idealFor: "Honeymoon · Couples", visa: "Schengen visa required", themes: ["Beaches", "Heritage"] }),
  dest({ slug: "norway", name: "Norway", country: "Norway", region: "International", imageKey: "himachal", image: img("himachal"), fromPrice: "₹1,49,999", rating: 4.9, reviews: 72, tagline: "Fjords, northern lights, and midnight sun.", bestTime: "Jun – Aug · Nov – Mar", idealFor: "Couples · Adventure", visa: "Schengen visa required", themes: ["Mountains"] }),
  dest({ slug: "himachal", name: "Himachal", country: "India", region: "India", imageKey: "himachal", image: img("himachal"), fromPrice: "₹7,999", rating: 4.6, reviews: 532, tagline: "Snow roads, cafes, and mountain air.", bestTime: "Mar – Jun · Oct – Feb", idealFor: "Friends · Couples · Backpackers", themes: ["Mountains", "Backpacking", "Spiritual"] }),
  dest({ slug: "goa", name: "Goa", country: "India", region: "India", imageKey: "bali", image: img("bali"), fromPrice: "₹7,999", rating: 4.5, reviews: 612, tagline: "Beaches, shacks, and Portuguese lanes.", bestTime: "Nov – Feb", idealFor: "Friends · Couples", themes: ["Beaches", "Backpacking"] }),
  dest({ slug: "karnataka", name: "Karnataka", country: "India", region: "India", imageKey: "northeast", image: img("northeast"), fromPrice: "₹9,999", rating: 4.6, reviews: 214, tagline: "Coffee hills, ruins, and waterfalls.", bestTime: "Oct – Mar", idealFor: "Family · Friends", themes: ["Mountains", "Heritage"] }),
  dest({ slug: "kerala", name: "Kerala", country: "India", region: "India", imageKey: "vietnam", image: img("vietnam"), fromPrice: "₹11,999", rating: 4.7, reviews: 458, tagline: "Backwaters, tea estates, and Ayurveda.", bestTime: "Sep – Mar", idealFor: "Honeymoon · Family", themes: ["Beaches", "Mountains", "Spiritual"] }),
  dest({ slug: "rajasthan", name: "Rajasthan", country: "India", region: "India", imageKey: "dubai", image: img("dubai"), fromPrice: "₹19,999", rating: 4.7, reviews: 327, tagline: "Forts, palaces, and desert nights.", bestTime: "Oct – Mar", idealFor: "Family · Heritage", themes: ["Heritage", "Desert"] }),
  dest({ slug: "andaman", name: "Andaman", country: "India", region: "India", imageKey: "maldives", image: img("maldives"), fromPrice: "₹24,999", rating: 4.7, reviews: 198, tagline: "White-sand islands and coral reefs.", bestTime: "Oct – May", idealFor: "Honeymoon · Family", themes: ["Beaches", "Tropical"] }),
  dest({ slug: "kashmir", name: "Kashmir", country: "India", region: "India", imageKey: "himachal", image: img("himachal"), fromPrice: "₹24,999", rating: 4.8, reviews: 276, tagline: "Shikara rides, meadows, and snow.", bestTime: "Mar – Oct", idealFor: "Honeymoon · Family", themes: ["Mountains", "Spiritual"] }),
  dest({ slug: "sikkim", name: "Sikkim", country: "India", region: "India", imageKey: "northeast", image: img("northeast"), fromPrice: "₹19,999", rating: 4.7, reviews: 164, tagline: "Monasteries, lakes, and Himalayan views.", bestTime: "Mar – May · Oct – Dec", idealFor: "Couples · Friends", themes: ["Mountains", "Spiritual"] }),
  dest({ slug: "ladakh", name: "Ladakh", country: "India", region: "India", imageKey: "himachal", image: img("himachal"), fromPrice: "₹38,999", rating: 4.8, reviews: 211, tagline: "High passes, blue lakes, and stark beauty.", bestTime: "Jun – Sep", idealFor: "Adventure · Backpackers", themes: ["Mountains", "Backpacking", "Spiritual"] }),
];

export const SEED_WEEKENDS = [
  { id: "coorg-chikmagalur", name: "Coorg & Chikmagalur", subtitle: "Coffee country escape", from: "Bengaluru", to: "Coorg · Chikmagalur", region: "South", days: 3, nights: 2, salePrice: "₹9,999", originalPrice: "₹14,999", savings: "₹5,000", rating: 4.7, reviews: 412, bestTime: "Oct – Mar", tag: "Best Seller", status: "FILLING FAST", statusTone: "hot", image: wix("e7beb6_a4c7c25be4b046bbab4e0000027d35d3~mv2.png"), highlights: ["Abbey Falls", "Coffee estate walk", "Mullayanagiri peak"], description: "Two cool hill towns, a private coffee-estate stay and waterfalls galore — your ideal long weekend off the screen." },
  { id: "ooty-coonoor", name: "Ooty, Coonoor & Isha", subtitle: "Hills, gardens & calm", from: "Bengaluru", to: "Ooty · Coonoor", region: "South", days: 3, nights: 2, salePrice: "₹6,999", originalPrice: "₹9,999", savings: "₹3,000", rating: 4.6, reviews: 318, bestTime: "Sep – May", tag: "Weekend Saver", status: "BOOK NOW", statusTone: "ok", image: wix("e7beb6_791d93ea90f6469abfb1a0d7153a21dd~mv2.jpg"), highlights: ["Toy train ride", "Botanical Gardens", "Isha Yoga Center"], description: "Tea-garden mornings, the famous toy train, and a quiet evening at the Isha temple — three days, no rush." },
  { id: "dudhsagar-trek", name: "Dudhsagar Waterfalls Trek", subtitle: "Adventure & jungle trails", from: "Bengaluru", to: "Goa · Dudhsagar", region: "South", days: 3, nights: 2, salePrice: "₹8,999", originalPrice: "₹12,999", savings: "₹4,000", rating: 4.8, reviews: 261, bestTime: "Jun – Sep", tag: "Adventure", status: "FEW LEFT", statusTone: "low", image: wix("e7beb6_b674dab6cfb44f669182cd846d17a146~mv2.webp"), highlights: ["Dudhsagar falls", "Spice plantation", "Jungle jeep ride"], description: "Monsoon-fed cascades, jeep rides through Goan jungles and a sunset shack on the beach. Pure adrenaline." },
  { id: "lonavala-matheran", name: "Lonavala & Matheran", subtitle: "Lake camping + BBQ", from: "Mumbai", to: "Lonavala · Matheran", region: "West", days: 3, nights: 2, salePrice: "₹7,499", originalPrice: "₹9,999", savings: "₹2,500", rating: 4.5, reviews: 287, bestTime: "Jun – Feb", tag: "Weekend Trip", status: "BOOK NOW", statusTone: "ok", image: wix("e7beb6_008d2f6038454f38ada37c53dc9992ba~mv2.jpg"), highlights: ["Lakeside camp", "BBQ dinner", "Toy train Matheran"], description: "Camp under the stars in Lonavala, then take the morning train to car-free Matheran. Sahyadri weekend bliss." },
  { id: "hampi-badami", name: "Hampi & Badami", subtitle: "Boulders & ancient ruins", from: "Bengaluru", to: "Hampi · Badami", region: "South", days: 3, nights: 2, salePrice: "₹8,499", originalPrice: "₹12,499", savings: "₹4,000", rating: 4.7, reviews: 196, bestTime: "Oct – Mar", tag: "Heritage", status: "FILLING FAST", statusTone: "hot", image: wix("nsplsh_c9a8db6c852e41de80d01c2d166a13ee~mv2.jpg"), highlights: ["Virupaksha temple", "Coracle ride", "Badami cave temples"], description: "Wander a vanished kingdom — sunrise over boulders, river coracles, and the cave temples carved out of red rock." },
  { id: "pondicherry-auroville", name: "Pondicherry & Auroville", subtitle: "French quarter & beach", from: "Bengaluru", to: "Pondicherry", region: "South", days: 3, nights: 2, salePrice: "₹7,999", originalPrice: "₹11,999", savings: "₹4,000", rating: 4.8, reviews: 342, bestTime: "Oct – Mar", tag: "Couples", status: "BOOK NOW", statusTone: "ok", image: wix("nsplsh_4d314f6278767357566859~mv2.jpg"), highlights: ["White Town walk", "Auroville visit", "Promenade sunset"], description: "Cobbled French lanes, biking through Auroville, and a beach sunset that'll be on your wall for years." },
  { id: "vizag-araku", name: "Vizag & Araku Valley", subtitle: "Beach + coffee hills", from: "Hyderabad", to: "Vizag · Araku", region: "South", days: 3, nights: 2, salePrice: "₹9,499", originalPrice: "₹13,999", savings: "₹4,500", rating: 4.6, reviews: 218, bestTime: "Sep – Mar", tag: "Hills & Beach", status: "BOOK NOW", statusTone: "ok", image: wix("nsplsh_df573ee0f6154a9a80b452293e2c0475~mv2.jpg"), highlights: ["RK Beach", "Borra caves", "Coffee plantation"], description: "Train through the Eastern Ghats, sip tribal coffee in Araku, and unwind by the Bay of Bengal at sunset." },
  { id: "wayanad-forest", name: "Wayanad Spice Country", subtitle: "Ghats, coffee & elephants", from: "Bengaluru", to: "Wayanad", region: "South", days: 3, nights: 2, salePrice: "₹8,999", originalPrice: "₹12,999", savings: "₹4,000", rating: 4.7, reviews: 254, bestTime: "Sep – May", tag: "Nature", status: "FEW LEFT", statusTone: "low", image: wix("11062b_a0faae69bec6475c834fa172822d6ba9~mv2.jpeg"), highlights: ["Edakkal caves", "Banasura dam", "Spice farm stay"], description: "Ride through Bandipur into Kerala's green heart — spice farms, dam reservoirs and ancient rock-art caves." },
  { id: "bandipur-wildlife", name: "Bandipur & Mudumalai", subtitle: "Wildlife safari weekend", from: "Bengaluru", to: "Bandipur · Mudumalai", region: "South", days: 3, nights: 2, salePrice: "₹10,499", originalPrice: "₹14,999", savings: "₹4,500", rating: 4.8, reviews: 173, bestTime: "Oct – May", tag: "Wildlife", status: "FILLING FAST", statusTone: "hot", image: wix("nsplsh_ce21f1ca7cb74b3397fee018e612680b~mv2.jpg"), highlights: ["Dawn jeep safari", "Tiger reserve trek", "River resort stay"], description: "Two of India's best tiger reserves on one weekend — dawn safaris, riverside lodges, and zero phone signal." },
  { id: "yercaud-yelagiri", name: "Yercaud & Yelagiri", subtitle: "Twin hill stations", from: "Bengaluru", to: "Yercaud · Yelagiri", region: "South", days: 3, nights: 2, salePrice: "₹6,499", originalPrice: "₹9,499", savings: "₹3,000", rating: 4.5, reviews: 142, bestTime: "Sep – Mar", tag: "Quick Escape", status: "BOOK NOW", statusTone: "ok", image: wix("nsplsh_6c543972716647376c6351~mv2_d_5464_3070_s_4_2.jpg"), highlights: ["Pagoda Point", "Boat lake ride", "Punganur Lake"], description: "Two hill stations in one budget weekend — coffee estate viewpoints, paragliding skies and quiet lake mornings." },
];

export const SEED_HOME = {
  hero: {
    headline: "Plan your next Holiday",
    accentWord: "Holiday",
    subheading: "Handpicked trips, ready when you are.",
    searchPlaceholder: "Where do you want to go?",
    videoUrl: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779188622/Hero_MHB_Video_aicsk2.mp4",
  },
  travelers: {
    title: "How do you travel?",
    subtitle: "Trips made for every kind of crew.",
    items: [
      { name: "Couple", image: img("maldives") },
      { name: "Solo", image: img("bali") },
      { name: "Family", image: img("dubai") },
      { name: "Friends", image: img("thailand") },
    ],
  },
  bookings: {
    title: "Just booked this week",
    destinations: [
      { id: "all", label: "All Destinations" },
      { id: "bali", label: "Bali" },
      { id: "thailand", label: "Thailand" },
      { id: "vietnam", label: "Vietnam" },
      { id: "malaysia", label: "Malaysia" },
      { id: "singapore", label: "Singapore" },
      { id: "sg-my", label: "Singapore + Malaysia" },
      { id: "dubai", label: "Dubai" },
      { id: "maldives", label: "Maldives" },
      { id: "turkey", label: "Turkey" },
      { id: "egypt", label: "Egypt" },
      { id: "greece", label: "Greece" },
      { id: "france-swiss", label: "France + Switzerland" },
      { id: "norway", label: "Norway" },
      { id: "himachal", label: "Himachal" },
      { id: "kashmir", label: "Kashmir" },
      { id: "ladakh", label: "Ladakh" },
      { id: "sikkim", label: "Sikkim" },
      { id: "kerala", label: "Kerala" },
      { id: "andaman", label: "Andaman" },
      { id: "goa", label: "Goa" },
      { id: "rajasthan", label: "Rajasthan" },
      { id: "karnataka", label: "Karnataka" },
    ],
    priceRanges: [
      { id: "under50", label: "Under ₹50K", min: 0, max: 50000 },
      { id: "50to150", label: "₹50K to ₹1.5L", min: 50000, max: 150000 },
      { id: "150to250", label: "₹1.5L to ₹2.5L", min: 150000, max: 250000 },
      { id: "luxury", label: "Luxury", min: 250000, max: null },
    ],
    items: [
      { id: 1, initial: "S", name: "Shiv", city: "Hyderabad", timeAgo: "1hr ago", title: "Family Escape: 6 Nights in Kuala Lumpur and Singapore", location: "Singapore (3N) +1 more", tag: "FAMILY", nights: 6, priceText: "₹63,201", priceNum: 63201, image: img("singapore"), dests: ["singapore", "malaysia", "sg-my"] },
      { id: 2, initial: "A", name: "Abi", city: "Chennai", timeAgo: "2hr ago", title: "Couple Escape: 5 Nights in Langkawi", location: "Langkawi (5N)", tag: "COUPLE", nights: 5, priceText: "₹70,309", priceNum: 70309, image: img("malaysia"), dests: ["malaysia"] },
      { id: 3, initial: "H", name: "Hari", city: "Mumbai", timeAgo: "3hr ago", title: "Solo Holiday: 7 Nights in Bali", location: "Bali (7N)", tag: "SOLO", nights: 7, priceText: "₹54,999", priceNum: 54999, image: img("bali"), dests: ["bali"] },
      { id: 4, initial: "P", name: "Priya", city: "Bangalore", timeAgo: "5hr ago", title: "Couple Holiday: 6 Nights in Vietnam", location: "Hanoi (3N) +1 more", tag: "COUPLE", nights: 6, priceText: "₹47,500", priceNum: 47500, image: img("vietnam"), dests: ["vietnam"] },
      { id: 5, initial: "A", name: "Arjun", city: "Delhi", timeAgo: "6hr ago", title: "Honeymoon: 5 Nights in Maldives", location: "Maldives (5N)", tag: "COUPLE", nights: 5, priceText: "₹1,89,999", priceNum: 189999, image: img("maldives"), dests: ["maldives"] },
      { id: 6, initial: "N", name: "Neha", city: "Pune", timeAgo: "8hr ago", title: "Family Holiday: 8 Nights Singapore + Thailand", location: "Singapore (4N) +1 more", tag: "FAMILY", nights: 8, priceText: "₹89,999", priceNum: 89999, image: img("singapore"), dests: ["singapore", "thailand"] },
      { id: 7, initial: "R", name: "Rohan", city: "Kolkata", timeAgo: "12hr ago", title: "Solo Adventure: 5 Nights in Dubai", location: "Dubai (5N)", tag: "SOLO", nights: 5, priceText: "₹38,999", priceNum: 38999, image: img("dubai"), dests: ["dubai"] },
      { id: 8, initial: "K", name: "Karan", city: "Ahmedabad", timeAgo: "1d ago", title: "Friends Trip: 6 Nights in Thailand", location: "Phuket (3N) +1 more", tag: "FRIENDS", nights: 6, priceText: "₹52,499", priceNum: 52499, image: img("thailand"), dests: ["thailand"] },
      { id: 9, initial: "M", name: "Meera", city: "Jaipur", timeAgo: "1d ago", title: "Family Escape: 7 Nights in Kashmir", location: "Srinagar (3N) +1 more", tag: "FAMILY", nights: 7, priceText: "₹54,999", priceNum: 54999, image: img("himachal"), dests: ["kashmir"] },
      { id: 10, initial: "V", name: "Vikas", city: "Lucknow", timeAgo: "1d ago", title: "Solo Trek: 8 Nights in Ladakh", location: "Leh (5N) +1 more", tag: "SOLO", nights: 8, priceText: "₹68,999", priceNum: 68999, image: img("himachal"), dests: ["ladakh"] },
      { id: 11, initial: "T", name: "Tanvi", city: "Mumbai", timeAgo: "2d ago", title: "Honeymoon: 6 Nights in Bali", location: "Ubud (3N) +1 more", tag: "COUPLE", nights: 6, priceText: "₹78,999", priceNum: 78999, image: img("bali"), dests: ["bali"] },
      { id: 12, initial: "I", name: "Ishaan", city: "Goa", timeAgo: "2d ago", title: "Family Holiday: 6 Nights in Andaman", location: "Port Blair (3N) +1 more", tag: "FAMILY", nights: 6, priceText: "₹89,999", priceNum: 89999, image: img("maldives2"), dests: ["andaman"] },
      { id: 13, initial: "D", name: "Divya", city: "Hyderabad", timeAgo: "2d ago", title: "Luxury Romance: 5 Nights in Maldives", location: "Male (5N)", tag: "COUPLE", nights: 5, priceText: "₹2,79,000", priceNum: 279000, image: img("maldives"), dests: ["maldives"] },
      { id: 14, initial: "S", name: "Sahil", city: "Chandigarh", timeAgo: "2d ago", title: "Friends Getaway: 4 Nights in Goa", location: "North Goa (4N)", tag: "FRIENDS", nights: 4, priceText: "₹24,999", priceNum: 24999, image: img("thailand"), dests: ["goa"] },
      { id: 15, initial: "A", name: "Anjali", city: "Bangalore", timeAgo: "3d ago", title: "Family Escape: 7 Nights in Kerala Backwaters", location: "Alleppey (2N) +2 more", tag: "FAMILY", nights: 7, priceText: "₹49,999", priceNum: 49999, image: img("malaysia"), dests: ["kerala"] },
      { id: 16, initial: "R", name: "Rajat", city: "Mumbai", timeAgo: "3d ago", title: "Couple Holiday: 9 Nights France + Switzerland", location: "Paris (3N) +3 more", tag: "COUPLE", nights: 9, priceText: "₹2,99,000", priceNum: 299000, image: img("singapore"), dests: ["france-swiss"] },
      { id: 17, initial: "K", name: "Kavya", city: "Delhi", timeAgo: "3d ago", title: "Solo Adventure: 6 Nights in Himachal", location: "Manali (3N) +1 more", tag: "SOLO", nights: 6, priceText: "₹32,999", priceNum: 32999, image: img("himachal"), dests: ["himachal"] },
      { id: 18, initial: "F", name: "Farhan", city: "Bangalore", timeAgo: "4d ago", title: "Friends Trip: 6 Nights in Vietnam", location: "Ho Chi Minh (3N) +1 more", tag: "FRIENDS", nights: 6, priceText: "₹54,999", priceNum: 54999, image: img("vietnam"), dests: ["vietnam"] },
      { id: 19, initial: "P", name: "Pooja", city: "Mumbai", timeAgo: "4d ago", title: "Couple Escape: 6 Nights in Turkey", location: "Cappadocia (2N) +2 more", tag: "COUPLE", nights: 6, priceText: "₹83,999", priceNum: 83999, image: img("dubai"), dests: ["turkey"] },
      { id: 20, initial: "A", name: "Aditya", city: "Pune", timeAgo: "5d ago", title: "Family Holiday: 7 Nights in Greece", location: "Santorini (3N) +1 more", tag: "FAMILY", nights: 7, priceText: "₹1,49,999", priceNum: 149999, image: img("maldives"), dests: ["greece"] },
      { id: 21, initial: "S", name: "Sneha", city: "Indore", timeAgo: "5d ago", title: "Friends Trip: 6 Nights in Sikkim", location: "Gangtok (3N) +1 more", tag: "FRIENDS", nights: 6, priceText: "₹42,999", priceNum: 42999, image: img("northeast"), dests: ["sikkim"] },
      { id: 22, initial: "N", name: "Nikhil", city: "Jaipur", timeAgo: "6d ago", title: "Couple Heritage: 5 Nights in Rajasthan", location: "Udaipur (2N) +1 more", tag: "COUPLE", nights: 5, priceText: "₹39,999", priceNum: 39999, image: img("dubai"), dests: ["rajasthan"] },
      { id: 23, initial: "R", name: "Ridhi", city: "Mumbai", timeAgo: "6d ago", title: "Luxury Escape: 8 Nights in Norway", location: "Bergen (3N) +2 more", tag: "COUPLE", nights: 8, priceText: "₹3,29,000", priceNum: 329000, image: img("himachal"), dests: ["norway"] },
      { id: 24, initial: "Y", name: "Yash", city: "Surat", timeAgo: "6d ago", title: "Solo Adventure: 6 Nights in Egypt", location: "Cairo (3N) +1 more", tag: "SOLO", nights: 6, priceText: "₹74,999", priceNum: 74999, image: img("dubai"), dests: ["egypt"] },
    ],
  },
  packages: {
    title: "Packages by duration",
    tabs: [
      { id: "short", label: "3-5 Days", items: [
        { name: "Kerala", price: "₹9,999", image: img("malaysia") },
        { name: "Goa", price: "₹5,999", image: img("thailand") },
        { name: "Karnataka", price: "₹6,999", image: img("northeast") },
        { name: "Himachal", price: "₹6,999", image: img("himachal") },
        { name: "Kashmir", price: "₹13,999", image: img("himachal") },
        { name: "Rajasthan", price: "₹9,999", image: img("dubai") },
      ]},
      { id: "mid", label: "6-9 Days", items: [
        { name: "Singapore + Malaysia", price: "₹38,999", image: img("singapore") },
        { name: "Vietnam", price: "₹17,999", image: img("vietnam") },
        { name: "Bali", price: "₹14,999", image: img("bali") },
        { name: "Thailand", price: "₹14,999", image: img("thailand") },
        { name: "Dubai", price: "₹24,999", image: img("dubai") },
        { name: "Malaysia", price: "₹15,999", image: img("malaysia") },
      ]},
      { id: "long", label: "10+ Days", items: [
        { name: "France + Switzerland", price: "₹99,999", image: img("himachal") },
        { name: "Norway", price: "₹1,49,999", image: img("vietnam") },
        { name: "Greece", price: "₹99,999", image: img("maldives2") },
        { name: "Egypt", price: "₹62,999", image: img("dubai") },
        { name: "Turkey", price: "₹63,999", image: img("bali") },
        { name: "Maldives", price: "₹49,999", image: img("maldives") },
      ]},
    ],
  },
  stories: {
    title: "Straight from our travellers ❤️",
    score: "4.6",
    ratingText: "4.6/5 with 1,000 reviews",
    items: [
      { id: 1, name: "Aishwarya Bali Holiday", dest: "Bali", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219201/WhatsApp_Video_2026-05-16_at_1.31.18_PM_pa9p61.mp4" },
      { id: 2, name: "Harish Thailand Holiday", dest: "Thailand", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219202/WhatsApp_Video_2026-05-16_at_1.30.17_PM_ocsjjm.mp4" },
      { id: 3, name: "Priyadarshini & Family Singapore Holiday", dest: "Singapore", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219202/WhatsApp_Video_2026-05-16_at_1.31.13_PM_jx8yha.mp4" },
      { id: 4, name: "Mahesh Europe Holiday", dest: "Europe", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219202/WhatsApp_Video_2026-05-16_at_1.31.38_PM_iqwua5.mp4" },
      { id: 5, name: "Sneha Vietnam Holiday", dest: "Vietnam", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219203/WhatsApp_Video_2026-05-16_at_1.31.23_PM_ptaftv.mp4" },
      { id: 6, name: "Karthik Maldives Holiday", dest: "Maldives", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219203/WhatsApp_Video_2026-05-16_at_1.32.13_PM_nixdcw.mp4" },
      { id: 7, name: "Anjali Dubai Holiday", dest: "Dubai", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219204/WhatsApp_Video_2026-05-16_at_1.31.47_PM_dw1qae.mp4" },
      { id: 8, name: "Rohan Kashmir Holiday", dest: "Kashmir", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219205/WhatsApp_Video_2026-05-16_at_1.31.25_PM_csb8ta.mp4" },
      { id: 9, name: "Pooja Ladakh Holiday", dest: "Ladakh", video: "https://res.cloudinary.com/dyxxkrq8r/video/upload/v1779219213/WhatsApp_Video_2026-05-16_at_1.32.06_PM_dmnfiy.mp4" },
    ],
  },
  moments: {
    title: "Read the stories, then go for it",
    items: [
      { id: 1, initial: "S", name: "Shiv", city: "Hyderabad", caption: "6 Day Singapore + Malaysia escape", destination: "Singapore + Malaysia", duration: "6 Days · 5 Nights", rating: 5, title: "Felt like every detail was thought through", review: "The Singapore-KL combo was perfectly paced — Gardens by the Bay, Universal, Batu Caves, late-night Bukit Bintang. Zero travel stress, every transfer was on time, the hotel picks were spot on. Worth every rupee.", date: "May 2026", image: cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.35_PM_gmlnpp.jpg") },
      { id: 2, initial: "A", name: "Abi", city: "Chennai", caption: "5 Night couple in Langkawi", destination: "Langkawi, Malaysia", duration: "5 Days · 5 Nights", rating: 5, title: "Quietest, most romantic trip we've done", review: "Cable car, mangrove kayaking, a sunset cruise we'll talk about for years. Resort was beachfront with insane food. The MHB team handled visas and pickups — we just had to show up.", date: "Apr 2026", image: cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_eyigio.jpg") },
      { id: 3, initial: "P", name: "Priya", city: "Bangalore", caption: "6 Day Vietnam exploration", destination: "Hanoi · Halong · Hoi An", duration: "6 Days · 5 Nights", rating: 5, title: "Vietnam shifted something in me", review: "Hanoi street food walk, a postcard-perfect Halong overnight cruise, lantern-making in Hoi An. The itinerary mixed culture and chill perfectly — never felt rushed.", date: "Mar 2026", image: cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_1_buerwk.jpg") },
      { id: 4, initial: "H", name: "Hari", city: "Mumbai", caption: "7 Day Bali deep dive", destination: "Ubud · Seminyak · Uluwatu", duration: "7 Days · 6 Nights", rating: 5, title: "My first solo trip and they nailed it", review: "Ubud was my favourite — monkey forest, rice terraces, yoga at sunrise. The team mixed culture, beach, and downtime in the right doses. Even got me into a hidden waterfall most people miss.", date: "Feb 2026", image: cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.22.01_PM_y8n52r.jpg") },
      { id: 5, initial: "A", name: "Arjun", city: "Delhi", caption: "5 Night honeymoon in Maldives", destination: "Maldives", duration: "5 Days · 5 Nights", rating: 5, title: "Honeymoon goals, no exaggeration", review: "Overwater villa at sunrise, snorkeling with mantas, the seaplane ride — every moment felt cinematic. MHB handled everything from airport pickup to a private dinner on the sandbank.", date: "Feb 2026", image: cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_2_htpd1q.jpg") },
      { id: 6, initial: "N", name: "Neha", city: "Pune", caption: "8 Day Singapore + Thailand", destination: "Singapore · Phuket", duration: "8 Days · 7 Nights", rating: 5, title: "Family of 5 and the trip just worked", review: "Universal Studios for the kids, sky bars in Bangkok for us, beach days in Phuket. The MHB team adjusted activities on the fly — felt like having a personal trip manager.", date: "Jan 2026", image: cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.00_PM_ij9msi.jpg") },
      { id: 7, initial: "R", name: "Rohan", city: "Kolkata", caption: "5 Day Dubai solo adventure", destination: "Dubai · Abu Dhabi", duration: "5 Days · 4 Nights", rating: 5, title: "Desert safari was the unexpected highlight", review: "Sandboarding, falconry, BBQ under stars. Burj Khalifa at sunset was worth the splurge. MHB even sorted my last-minute add-on to Abu Dhabi without any fuss.", date: "Jan 2026", image: cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_1_jhjtxh.jpg") },
      { id: 8, initial: "K", name: "Karan", city: "Ahmedabad", caption: "6 Day Thailand with friends", destination: "Phuket · Phi Phi · Bangkok", duration: "6 Days · 5 Nights", rating: 5, title: "Group trip with zero stress", review: "Four of us, packed schedule. Beach clubs by day, rooftop bars by night. Activities were perfectly timed — no waiting in queues anywhere. MHB knew the right spots.", date: "Dec 2025", image: cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.21.56_PM_xizioz.jpg") },
      { id: 9, initial: "M", name: "Meera", city: "Jaipur", caption: "7 Day Kashmir family escape", destination: "Srinagar · Gulmarg · Sonmarg", duration: "7 Days · 6 Nights", rating: 5, title: "They cared for my parents like family", review: "Dal Lake shikara ride, Gulmarg gondola, Sonmarg meadows. Heaters in every room, home-cooked Kashmiri food. MHB even arranged a doctor when my mom felt unwell. Pure care.", date: "Dec 2025", image: cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.19.11_PM_lbbzqo.jpg") },
      { id: 10, initial: "T", name: "Tanvi", city: "Mumbai", caption: "6 Day Bali honeymoon", destination: "Uluwatu · Ubud · Jimbaran", duration: "6 Days · 5 Nights", rating: 5, title: "Six days of pure bliss", review: "Cliffside villa, romantic dinner at Jimbaran beach, couples spa. MHB slipped in a candlelit pool float surprise on our anniversary. Literal tears.", date: "Nov 2025", image: cld("v1779220322/WhatsApp_Image_2026-05-16_at_1.20.03_PM_gq7ecr.jpg") },
      { id: 11, initial: "V", name: "Vikas", city: "Lucknow", caption: "8 Day Ladakh solo trek", destination: "Leh · Pangong · Nubra", duration: "8 Days · 7 Nights", rating: 5, title: "Zero regrets, all altitude", review: "MHB's local guides knew every corner. Acclimatization stops were planned smartly. The Khardung La photo is now my desktop wallpaper.", date: "Oct 2025", image: cld("v1779220322/WhatsApp_Image_2026-05-16_at_1.19.05_PM_yvw52x.jpg") },
      { id: 12, initial: "I", name: "Ishaan", city: "Goa", caption: "6 Day Andaman family time", destination: "Havelock · Neil Island", duration: "6 Days · 5 Nights", rating: 5, title: "The kids didn't want to leave", review: "Snorkeling, kayaking, sea-walks. Radhanagar Beach water was unreal. MHB matched us to a family-friendly resort that the kids didn't want to leave.", date: "Oct 2025", image: cld("v1779220322/WhatsApp_Image_2026-05-16_at_1.19.11_PM_1_ohnlgn.jpg") },
      { id: 13, initial: "D", name: "Divya", city: "Hyderabad", caption: "5 Night luxury Maldives", destination: "Male · Private Island", duration: "5 Days · 5 Nights", rating: 5, title: "They overdelivered at every step", review: "Private overwater suite, butler service, a private island dinner. MHB upgraded our seaplane to a charter without us asking. Anniversary of a lifetime.", date: "Sep 2025", image: cld("v1779220322/WhatsApp_Image_2026-05-16_at_1.20.03_PM_1_ble2gz.jpg") },
      { id: 14, initial: "S", name: "Sahil", city: "Chandigarh", caption: "4 Day Goa friends getaway", destination: "North Goa", duration: "4 Days · 3 Nights", rating: 5, title: "Smoothest trip plan I've ever had", review: "Last-minute long weekend with the boys. Clubs, beaches, beach shacks, a fort sunset. MHB sorted villas and pickups in 24 hours.", date: "Sep 2025", image: cld("v1779220321/WhatsApp_Image_2026-05-16_at_1.18.59_PM_supqut.jpg") },
      { id: 15, initial: "N", name: "Nikhil", city: "Jaipur", caption: "5 Night Rajasthan heritage", destination: "Udaipur · Jaipur", duration: "5 Days · 5 Nights", rating: 5, title: "Boutique heritage stays, perfectly chosen", review: "City Palace, Amber Fort, lake-side dinners. MHB nailed the haveli picks. Local guides were knowledgeable, not the touristy kind.", date: "Aug 2025", image: cld("v1779220321/WhatsApp_Image_2026-05-16_at_1.18.59_PM_1_ytnrvn.jpg") },
      { id: 16, initial: "S", name: "Sneha", city: "Indore", caption: "6 Day Sikkim with friends", destination: "Gangtok · Pelling", duration: "6 Days · 5 Nights", rating: 5, title: "A Himalayan reset we needed", review: "Tsomgo Lake, Nathula Pass, Pelling sunsets. MHB handled permits which would've taken us forever. The momos at the Buddha statue stop — game changer.", date: "Aug 2025", image: cld("v1779220321/WhatsApp_Image_2026-05-16_at_1.18.58_PM_hodiar.jpg") },
      { id: 17, initial: "P", name: "Pooja", city: "Mumbai", caption: "6 Day Turkey couple escape", destination: "Cappadocia · Pamukkale · Istanbul", duration: "6 Days · 5 Nights", rating: 5, title: "Sleeping in stone never felt cooler", review: "Cappadocia balloon ride at dawn, Pamukkale's white terraces, Istanbul's bazaars. MHB curated boutique cave hotels — bucket list ticked.", date: "Jul 2025", image: cld("v1779220246/WhatsApp_Image_2026-05-16_at_1.18.58_PM_1_o6eczp.jpg") },
      { id: 18, initial: "A", name: "Aditya", city: "Pune", caption: "7 Day Greece family holiday", destination: "Athens · Santorini · Mykonos", duration: "7 Days · 6 Nights", rating: 5, title: "Effortless luxury for the whole family", review: "Kids ran around the Acropolis, we lounged in Oia. MHB knew which restaurants had kid menus and which beaches were calmer. Top-notch planning.", date: "Jun 2025", image: cld("v1779220204/WhatsApp_Image_2026-05-16_at_1.18.57_PM_ux0vpf.jpg") },
      { id: 19, initial: "R", name: "Ridhi", city: "Mumbai", caption: "8 Day Norway luxury escape", destination: "Bergen · Tromsø · Lofoten", duration: "8 Days · 7 Nights", rating: 5, title: "Bucket list level trip", review: "Fjords, northern lights, midnight cruises. MHB tied in private glass-igloo nights and a husky sled run. My partner cried watching the sky.", date: "May 2025", image: cld("v1779220202/WhatsApp_Image_2026-05-16_at_1.18.07_PM_xjjipr.jpg") },
      { id: 20, initial: "Y", name: "Yash", city: "Surat", caption: "6 Day Egypt solo adventure", destination: "Cairo · Luxor · Red Sea", duration: "6 Days · 5 Nights", rating: 5, title: "Hands down my best solo trip", review: "Pyramids at sunset hit different. Felucca on the Nile, Karnak temple at golden hour, Red Sea diving. MHB connected me to a brilliant Egyptologist guide.", date: "Apr 2025", image: cld("v1779220202/WhatsApp_Image_2026-05-16_at_1.18.06_PM_tefkbe.jpg") },
      { id: 21, initial: "R", name: "Rajat", city: "Mumbai", caption: "9 Day France + Switzerland", destination: "Paris · Lucerne · Interlaken", duration: "9 Days · 8 Nights", rating: 5, title: "Cobblestones and snow caps in one trip", review: "MHB's daily plan was just-right — never overpacked, plenty of room to wander. Booked the Mont Blanc helicopter add-on which was insane.", date: "Mar 2025", image: cld("v1779220202/WhatsApp_Image_2026-05-16_at_1.18.03_PM_qxifdm.jpg") },
    ],
  },
  partners: {
    title: "Tourism Board Partners",
    items: [
      { id: 1, name: "Dubai Tourism", logo: cld("v1779221910/DUBAI_TOURISM_a0dw39.avif"), image: img("dubai") },
      { id: 2, name: "Amazing Thailand", logo: cld("v1779221910/AMAZING_THAILAND_hiqc2e.avif"), image: img("thailand") },
      { id: 3, name: "Singapore Tourism", logo: cld("v1779221910/SINGAPORE_PASSION_MADE_POSSIBLE_dlud8q.avif"), image: img("singapore") },
      { id: 4, name: "Egypt Tourism", logo: cld("v1779221910/EGYPT_WHERE_IT_ALL_BEGINS_ddfeqc.avif"), image: img("dubai") },
      { id: 5, name: "Incredible India", logo: cld("v1779221910/MINISTRY_OF_TOURISM_zpuwyr.avif"), image: img("himachal") },
      { id: 6, name: "Maldives Tourism", logo: cld("v1779221910/MALDIVES_THE_SUNNY_SIDE_OF_LIFE_qukm1m.avif"), image: img("maldives") },
      { id: 7, name: "Tourism Malaysia", logo: cld("v1779221910/TOURISM_MALAYSIA_cifj1q.avif"), image: img("malaysia") },
      { id: 8, name: "Turkey Tourism", logo: cld("v1779221910/TURKEY_TOURISM_kyc9ki.avif"), image: img("northeast") },
    ],
  },
  whyUs: {
    eyebrow: "Why choose us",
    heading: "MyHolidayBro",
    quote: "Bro, lose yourself. Discover yourself.",
    bodyParagraphs: [
      "MyHolidayBro is your travel buddy that takes the work out of holidays — handpicked stays, custom itineraries, and a dedicated trip advisor, so all you do is show up and enjoy.",
      "Across 60+ destinations and 300+ delivered tours, we've made travel feel effortless for 1,000+ travellers — with 24/7 support and a best-price promise on every booking.",
    ],
    stats: [
      { value: "1,000+", label: "Happy travellers" },
      { value: "60+", label: "Destinations covered" },
      { value: "300+", label: "Tours delivered" },
      { value: "24/7", label: "Trip support" },
      { value: "100%", label: "Satisfaction" },
      { value: "Handpicked", label: "Itineraries" },
    ],
    collage: [
      cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.19.11_PM_lbbzqo.jpg"),
      cld("v1779220322/WhatsApp_Image_2026-05-16_at_1.19.05_PM_yvw52x.jpg"),
      cld("v1779220322/WhatsApp_Image_2026-05-16_at_1.20.03_PM_gq7ecr.jpg"),
      cld("v1779220321/WhatsApp_Image_2026-05-16_at_1.18.59_PM_supqut.jpg"),
    ],
  },
  featuredOn: {
    eyebrow: "Featured On",
    heading: "Recognised by leading press",
    items: [
      { name: "SiliconIndia · Startup City · Travel Tech 2023", src: "https://static.wixstatic.com/media/e7beb6_e6bfb02ae16c46c4b9475f0c6f5d8d20~mv2.jpeg/v1/crop/x_0,y_36,w_253,h_127/fill/w_708,h_350,al_c,lg_1,q_85,enc_avif,quality_auto/featured.jpeg", width: 708, height: 350, sub: "Travel Tech Startups · 2023" },
      { name: "YourStory", src: "https://static.wixstatic.com/media/e7beb6_a06072ca5f484e0f8e25554bf216e9bc~mv2.jpg/v1/fill/w_888,h_344,al_c,lg_1,q_85,enc_avif,quality_auto/e7beb6_a06072ca5f484e0f8e25554bf216e9bc~mv2.jpg", width: 888, height: 344, sub: "Founder Story · 2024" },
    ],
  },
  blogs: {
    eyebrow: "Blogs",
    heading: "Stories & guides",
    featured: {
      date: "Published on 8 Apr",
      read: "12 minutes read",
      title: "25 Best Places to Visit in May in India (2026 Travel Guide)",
      excerpt: "From snow-tipped Ladakh roads to the cool valleys of Sikkim — here are the destinations worth packing your bag for this May.",
      image: img("himachal"),
    },
    posts: [
      { id: 1, date: "Published on 30 Jul", read: "6 minutes read", title: "Why MyHolidayBro Is the Perfect Choice for Family Trips", image: img("bali") },
      { id: 2, date: "Published on 25 Jun", read: "5 minutes read", title: "Book Now, Pay Later with MyHolidayBro · Travel Now, Pay in EMIs", image: img("northeast") },
      { id: 3, date: "Published on 18 Sep", read: "9 minutes read", title: "How to Plan the Perfect Honeymoon: 10 Stays Couples Love", image: img("maldives") },
    ],
  },
  newsletter: {
    eyebrow: "Join the crew",
    heading: "Trip ideas, in your inbox",
    subheading: "The best deals, hidden gems, and travel hacks — twice a month, hand-picked by our team. Never spammy.",
    buttonLabel: "Subscribe",
    successMessage: "You're in. Keep an eye on your inbox 📬",
    footnote: "No spam. Unsubscribe anytime.",
    backgroundImage: img("maldives"),
  },
};

export const SEED_NAV = {
  logoBlack: "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779211833/MHB_Logo_Black_bdpszg.avif",
  logoWhite: "https://res.cloudinary.com/dyxxkrq8r/image/upload/v1779211833/MHB_Logo_Black_bdpszg.avif",
  items: [
    { label: "Destinations", href: "/destinations", highlight: false },
    { label: "Weekend Trips", href: "/weekends", highlight: true },
    { label: "Adventure Styles", href: "/adventure-styles", highlight: false },
    { label: "Moments", href: "/moments", highlight: false },
    { label: "Contact", href: "/contact", highlight: false },
  ],
};

export const SEED_FOOTER = {
  columns: [
    { title: "About MyHolidayBro", links: [
      { label: "About us", href: "/#why-us" }, { label: "Contact us", href: "/contact" },
      { label: "Careers", href: "/careers" }, { label: "Press", href: "/#featured-on" },
      { label: "Travel Stories", href: "/moments" },
    ]},
    { title: "Explore", links: [
      { label: "Destinations", href: "/destinations" }, { label: "Weekend Trips", href: "/weekends" },
      { label: "Adventure Styles", href: "/adventure-styles" }, { label: "Moments", href: "/moments" },
      { label: "Newsletter", href: "/newsletter" },
    ]},
    { title: "Help & Policies", links: [
      { label: "Help Centre · FAQ", href: "/faq" }, { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/terms#privacy" }, { label: "Cookie Policy", href: "/terms#privacy" },
      { label: "Refund Policy", href: "/terms#refunds" },
    ]},
    { title: "Account", links: [
      { label: "Log in", href: "/login" }, { label: "Create account", href: "/signup" },
      { label: "My wishlist", href: "/wishlist" }, { label: "My account", href: "/account" },
    ]},
  ],
  offices: [
    { city: "Hyderabad", address: "Level 6, N Heights, Hitech City, Hyderabad — 500081" },
    { city: "New Delhi", address: "Level 31, 1st Floor, Block L, Connaught Place, New Delhi — 110001" },
    { city: "London", address: "Kemp House, 160 City Road, London EC1V 2NX, UK" },
  ],
  contact: {
    phone: "+91 96666 98990",
    email: "contact@myholidaybro.com",
    whatsapp: "https://wa.me/message/BFYRF5O6RLEEB1",
  },
  social: [
    { network: "Instagram", url: "https://instagram.com/myholidaybro" },
    { network: "Facebook", url: "https://facebook.com/myholidaybro" },
    { network: "YouTube", url: "https://youtube.com/channel/UCMxPOv3BX5OCRNS-bZ_gH1g" },
    { network: "WhatsApp", url: "https://wa.me/message/BFYRF5O6RLEEB1" },
  ],
  copyright: "© 2026 MyHolidayBro. All rights reserved.",
};

export const SEED_CONTENT = {
  // Hero copy for the /faq page
  faqIntro: {
    eyebrow: "Help centre",
    title: "Frequently asked questions.",
    subtitle: "Booking, payments, visas, on-trip support. If you don't find what you need below, we're a WhatsApp message away.",
  },
  // FAQs grouped by category (mirrors the front-end /faq page)
  faqCategories: [
    { id: "bookings", title: "Bookings & Quotes", items: [
      { q: "How do I get a trip quote from MyHolidayBro?", a: "Drop us a message via the Contact page, WhatsApp us at +91 96666 98990, or email contact@myholidaybro.com with your dates, group size and rough destination. A trip captain replies in under 30 minutes during IST working hours with a draft itinerary." },
      { q: "How early should I plan my trip?", a: "For international and peak-season trips (Dec–Jan, May–Jun) we recommend 6–8 weeks ahead. For weekend getaways and most domestic destinations, 1–2 weeks works comfortably. We've also turned around last-minute trips in 48 hours — just ask." },
      { q: "Can I customise a package you've already published?", a: "Absolutely. Every itinerary on the site is a starting point — add nights, swap hotels, change activities, drop a city. Your trip captain rebuilds the plan and re-quotes within hours." },
    ]},
    { id: "payments", title: "Payments & Refunds", items: [
      { q: "What payment methods do you accept?", a: "UPI, all major credit and debit cards, net banking, and bank transfer. International cards are accepted for travellers outside India. We never store your card details on our servers — payments are processed via PCI-compliant gateways." },
      { q: "What's the payment schedule?", a: "Typically 25–40% to confirm the booking and the balance 21 days before departure. The exact split depends on the suppliers we're booking with (some hotels and airlines need full payment earlier)." },
      { q: "How fast do refunds reach me?", a: "Refunds for cancellations are processed within 7–10 working days from the date of approval, back to the original payment method. International card refunds may take an additional 3–5 days depending on your issuing bank." },
    ]},
    { id: "visas", title: "Visas & Documents", items: [
      { q: "Do you help with visas?", a: "Yes — for all the destinations we sell. We share the document checklist, review your application before submission, and book the appointment where the embassy requires it. Visa fees are pass-through; the assistance is included for booked trips." },
      { q: "What documents should I carry on the trip?", a: "Passport (valid for 6+ months from your return date), printed and digital copies of your e-tickets, hotel vouchers, insurance certificate, and visa pages. Your trip captain shares a single PDF bundle 48 hours before departure." },
    ]},
    { id: "on-trip", title: "On the trip", items: [
      { q: "Is there a number I can call mid-trip?", a: "Yes — every booking comes with 24×7 on-trip support. You get a dedicated WhatsApp group with your trip captain and the local ops team for the duration of your trip. We've handled missed flights, weather reroutes, and sudden requests at 2 AM." },
      { q: "What if my flight gets cancelled or delayed?", a: "Message us the moment you know. We'll rebook flights, adjust hotel check-ins, and reshuffle activities to keep your trip on track. If it's a force-majeure cancellation, we work with airlines and hotels to recover what's recoverable." },
      { q: "Are the local guides included?", a: "All the guided activities listed in your itinerary include the local guide. Most of our partner guides are mother-tongue speakers of the region and have worked with us for 3+ years." },
    ]},
    { id: "insurance", title: "Insurance & Safety", items: [
      { q: "Is travel insurance included?", a: "Basic travel insurance covering medical emergencies, trip cancellation and lost baggage is included on all international packages. You can also opt for an upgraded plan with adventure-sport coverage, COVID add-on, or higher claim limits at quote stage." },
      { q: "How do you vet hotels and partners?", a: "Every hotel on our list is either visited in person by a trip captain or vetted via a long-running partnership. Activities and adventure operators are checked annually for licensing, safety equipment and traveller feedback." },
    ]},
  ],
  faqs: [
    { q: "How do I book this trip?", a: "Pick a package, send an enquiry, and a dedicated MyHolidayBro advisor will get in touch to lock dates, customise the itinerary, and confirm your booking." },
    { q: "Can the itinerary be customised?", a: "Yes — every itinerary is a starting point. Add nights, swap hotels, upgrade rooms or add experiences." },
    { q: "What's the cancellation policy?", a: "Cancellation charges are a percentage of the total holiday cost and depend on how many days before departure we receive your written notice." },
    { q: "How long do refunds take?", a: "Refunds usually arrive within 3 – 4 working days once initiated, but can take up to 21 working days to reflect." },
    { q: "Do I need travel insurance?", a: "Yes — we consider adequate travel insurance essential. It's your responsibility to ensure your cover is suitable." },
  ],
  inclusions: [
    "Accommodation in hand-picked hotels", "Daily breakfast at the hotel",
    "All tours & transfers in a private vehicle", "Airport pickup and drop-off",
    "Dedicated MyHolidayBro trip advisor", "All applicable hotel taxes & service charges",
  ],
  exclusions: [
    "Airfare (unless a flight-inclusive package is chosen)", "GST and TCS as applicable",
    "Optional activities & water sports", "Travel insurance",
    "Personal expenses — tips, laundry, calls, alcohol", "Anything not mentioned under inclusions",
  ],
  cancellation: [
    { window: "30+ days before departure", refund: "Up to 90% refund (booking fee retained)" },
    { window: "15 – 29 days before", refund: "Up to 50% refund" },
    { window: "7 – 14 days before", refund: "Up to 25% refund" },
    { window: "Under 7 days / no-show", refund: "No refund" },
  ],
  payment: [
    "Partial booking amount confirms your slot — exact sum is set per tour operator.",
    "Balance is due within 3 days of paying the booking amount.",
    "Bookings within 30 days of departure require full payment immediately.",
    "Accepted methods: credit card, debit card, internet banking and bank transfers.",
  ],
  usps: [
    { title: "24×7 Assistance", desc: "Reach us any hour, on-trip or off." },
    { title: "Best Price Guaranteed", desc: "Direct local partners, no middlemen." },
    { title: "Dedicated Trip Advisor", desc: "One expert from planning to landing." },
    { title: "100% Satisfaction", desc: "Public reviews, honest service." },
  ],
  ageLimit: "5 – 65 yrs (younger/older travellers welcome on request)",
  reviews: [
    { name: "Aanya Mehta", initials: "AM", city: "Mumbai", rating: 5, title: "Better than I imagined", body: "Everything from the airport pickup to the very last meal was planned beautifully.", when: "Booked Honeymoon · 2 months ago" },
    { name: "Rohan Iyer", initials: "RI", city: "Bengaluru", rating: 5, title: "Smooth from start to finish", body: "We booked late and they still pulled off a great itinerary.", when: "Booked Friends Trip · 5 weeks ago" },
    { name: "Priya Sharma", initials: "PS", city: "Delhi NCR", rating: 4, title: "Worth every rupee", body: "Trip ran exactly on schedule, hotels were genuinely 4-star.", when: "Booked Family Trip · 3 months ago" },
  ],

  // ── Trip-detail page content (migrated from app/destinations/[slug]/TripDetail.js) ──
  // Cancellation refund tiers — the compact percentage cards (REFUND_TIERS).
  cancellationTiers: [
    { window: "30+ days", pct: 90, tone: "good" },
    { window: "15 – 29 days", pct: 50, tone: "mid" },
    { window: "7 – 14 days", pct: 25, tone: "low" },
    { window: "Under 7 days", pct: 0, tone: "none" },
  ],
  // Payment methods (PAY_METHODS). `icon` is a string key; the frontend maps it to an SVG.
  paymentMethods: [
    { label: "Credit card", icon: "wallet" },
    { label: "Debit card", icon: "wallet" },
    { label: "Internet banking", icon: "shield" },
    { label: "Bank transfer", icon: "bolt" },
  ],
  // The 2 payment-stage cards in TripDetail's "Payment policy" section.
  paymentStages: [
    { step: "01", amount: "Booking", title: "Partial amount", sub: "Sum is set per tour operator and confirms your slot", tone: "light" },
    { step: "02", amount: "Balance", title: "Within 3 days", sub: "Of paying the booking amount (or earlier if under 30 days to departure)", tone: "dark" },
  ],
  // Travel-diary testimonial carousel (TRAVEL_TESTIMONIALS).
  travelDiaries: [
    { name: "Aanya Mehta", initials: "AM", city: "Mumbai", trip: "Bali Honeymoon", body: "From airport pickup to the very last meal, every moment was planned with so much care. Our advisor even swapped two hotels last minute on our request without any fuss. Came home with stories to tell for years.", when: "2 months ago", color: "#fde68a", accent: "#92400e" },
    { name: "Rohan Iyer", initials: "RI", city: "Bengaluru", trip: "Thailand Group", body: "Booked late and still pulled off a phenomenal itinerary. The local driver was fantastic and the surprise property upgrades made our group trip absolutely unforgettable.", when: "5 weeks ago", color: "#bae6fd", accent: "#075985" },
    { name: "Priya Sharma", initials: "PS", city: "Delhi NCR", trip: "Kerala Family", body: "Trip ran exactly on schedule, hotels were genuinely 4-star, and our advisor checked in every single day. Worth every rupee — already planning our next booking.", when: "3 months ago", color: "#bbf7d0", accent: "#166534" },
    { name: "Arjun Kapoor", initials: "AK", city: "Pune", trip: "Maldives Escape", body: "Overwater villa, seaplane ride, private sandbank picnic — everything we dreamed of. The team handled all the visa paperwork so we just had to show up and relax.", when: "6 weeks ago", color: "#fbcfe8", accent: "#9d174d" },
    { name: "Snehal Jain", initials: "SJ", city: "Hyderabad", trip: "Ladakh Adventure", body: "Pangong, Nubra, Khardung La — paced so well that altitude never bothered us. Our guide knew every café and viewpoint. Truly the trip of a lifetime.", when: "4 months ago", color: "#ddd6fe", accent: "#5b21b6" },
  ],

  // ── Weekend-detail page content (migrated from app/weekends/[id]/WeekendDetail.js) ──
  weekendInclusions: [
    { icon: "bus", text: "Round-trip transport from your city" },
    { icon: "bed", text: "Stay in vetted boutique properties" },
    { icon: "utensils", text: "Daily breakfast included" },
    { icon: "ticket", text: "Activities & entry tickets covered" },
  ],
  weekendExclusions: [
    "Personal expenses (laundry, calls, tips)",
    "Lunches & dinners unless mentioned",
    "Any activity not in the itinerary",
    "Travel insurance",
  ],
};

export const SEED_ADVENTURE_STYLES = {
  kicker: "Adventure styles",
  heading: "How do you like to travel?",
  subheading: "Pick a style — we'll show trips that fit how you want to go.",
  styles: ADVENTURE_THEMES.map((name) => ({ name, tagline: "", image: "" })),
};

export const SEED_USERS = [
  { id: "u_demo", name: "Test User", email: "test@gmail.com", role: "Customer", createdAt: "2026-01-12" },
  { id: "u_aisha", name: "Aisha Khan", email: "aisha@example.com", role: "Customer", createdAt: "2026-05-20" },
  { id: "u_rohit", name: "Rohit Verma", email: "rohit@example.com", role: "Customer", createdAt: "2026-05-22" },
  { id: "u_neha", name: "Neha Reddy", email: "neha@example.com", role: "Customer", createdAt: "2026-05-25" },
];

// ---- Moments collections ----
// The story videos and postcard reviews authored above (inside SEED_HOME) are
// the live site content, but they're served from the `testimonials` and
// `moments` COLLECTIONS (edited on the admin Moments page) — not the home
// singleton. Derive the collections from the authored arrays, then strip the
// copies out of SEED_HOME so there's exactly one source of truth.
export const SEED_TESTIMONIALS = (SEED_HOME.stories.items || []).map((s, i) => ({
  id: `v_${s.id ?? i + 1}`, name: s.name, dest: s.dest, video: s.video, quote: s.quote || "", poster: s.poster || "", order: i,
}));
export const SEED_MOMENTS = (SEED_HOME.moments.items || []).map((c, i) => ({
  ...c, id: `m_${c.id ?? i + 1}`, order: i,
}));
SEED_HOME.stories = { title: SEED_HOME.stories.title };
SEED_HOME.moments = { title: SEED_HOME.moments.title };

// ---- Careers page: open roles, perks and intro copy ----
export const SEED_CAREERS = {
  email: "careers@myholidaybro.com",
  hero: {
    kicker: "Careers · MyHolidayBro",
    heading: "Build the holiday company you",
    accent: "wish existed",
    sub: "We're a small, very deliberate team obsessed with the craft of a great trip. If that sounds like your kind of room — come build with us.",
  },
  perks: [
    { t: "Real travel benefits", d: "Annual offsite trip + discounted MHB packages for you & your family." },
    { t: "Health cover", d: "Comprehensive medical insurance for you, your spouse and kids." },
    { t: "Hybrid by default", d: "Three days from the studio, two from wherever you concentrate best." },
    { t: "Learning budget", d: "₹50k/year for courses, conferences, books — no approvals needed." },
  ],
  roles: [
    { id: "rl1", team: "Trip Design", title: "Trip Captain · International", type: "Full-time · Hyderabad", blurb: "Curate international itineraries end-to-end — from first WhatsApp ping to landing back home. 2+ years in travel; obsessive about details." },
    { id: "rl2", team: "Trip Design", title: "Trip Captain · Domestic & Weekends", type: "Full-time · Hyderabad / Bangalore", blurb: "Own the domestic and weekend desk. You know your Coorgs from your Chikmagalurs and can plan a long-weekend in 12 minutes flat." },
    { id: "rl3", team: "Engineering", title: "Frontend Engineer (Next.js)", type: "Full-time · Remote-friendly", blurb: "Help us build a delightful booking experience. Next.js, React, CSS Modules. Bonus: you've shipped travel or marketplace UI." },
    { id: "rl4", team: "Ops", title: "On-trip Support Lead", type: "Full-time · Hyderabad", blurb: "Run the 24×7 traveller support pod. Calm under pressure, fluent across WhatsApp and ground-handler phone trees." },
    { id: "rl5", team: "Brand", title: "Content & Social Designer", type: "Contract / Full-time · Hyderabad", blurb: "Shoot, edit, ship — reels, photo edits, the occasional newsletter cover. A portfolio that doesn't scream stock-template." },
  ],
  fallback: {
    title: "Don't see your role?",
    body: "We're always open to surprising fits. Send a note to careers@myholidaybro.com — tell us what you'd build here and why.",
  },
};

// ---- Legal / policy page (/terms): full long-form policy content ----
export const SEED_POLICIES = {
  kicker: "Legal",
  title: "Terms of Use",
  accent: "Use",
  subtitle: "These Terms of Use form a binding agreement between you and MyHolidayBro when you use this website or any of our services. Please read them carefully.",
  lastUpdated: "Last updated · January 2026",
  contactEmail: "contact@myholidaybro.com",
  contactPhone: "+91 96666 98990",
  sections: [
    { id: "agreement", title: "Agreement", body: `These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("You", "User") and our affiliated entities (hereinafter referred to as "MyHolidayBro", "we", "us", "our"). The information, data and material ("Information") contained on this website ("Site") has been prepared solely for the purpose of providing information about MyHolidayBro and its partners and the services that they offer.

You agree that by accessing the Site, you have read, understood and agree to be bound by all of these Terms of Use. If you do not agree, you are expressly prohibited from using the Site and must discontinue use immediately.

MyHolidayBro reserves the right to alter, change, modify, add or remove portions of these Terms at any time. Changes are effective when posted on the Site. It is your responsibility to review the Terms regularly; continued use of the Site is deemed acceptance of amended Terms.` },
    { id: "eligibility", title: "Eligibility & use of the website", body: `You warrant that you are at least 18 years of age and possess the legal authority to enter into this agreement. If you are making travel reservations on behalf of another person, you agree to inform them of these Terms and to be financially responsible for all use of the Website. You also warrant that all information supplied is true, current, complete and accurate, and that the traveller is not an unaccompanied minor.` },
    { id: "representations", title: "User representations", body: `• All registration information you submit will be true, accurate, current and complete.
• You will maintain the accuracy of such information and update it as necessary.
• You have the legal capacity and agree to comply with the Terms of Use.
• You are not under 18 years of age — or, if a minor, you have parental permission.
• You will not access the Site through automated means (bots, scripts, scrapers).
• You will not use the Site for any illegal or unauthorised purpose.
• Your use of the Site will not violate any applicable law or regulation.

If you provide information that is untrue, inaccurate, not current or incomplete, we may suspend or terminate your account and refuse current or future use of the Site.` },
    { id: "holiday-contract", title: "Your holiday contract", body: `When a booking is made, the "lead name" on the booking guarantees they have authority to accept these terms on behalf of the party. After we receive your booking and appropriate payments, if the arrangements are available, we will issue a confirmation invoice. A binding agreement comes into existence when we dispatch this invoice to the lead name or your tour operator / travel agent.

Please check the details on your invoice carefully. In the event of any discrepancy, contact us immediately as it may not be possible to make changes later.` },
    { id: "documents", title: "Passports, visas, health requirements & travel documents", body: `It is your responsibility to ensure you are in possession of all necessary travel and health documents before departure. A full and valid passport is required for destinations we feature (including children) and visas may be required for overseas destinations. By availing our services you agree that MyHolidayBro can only help you apply for the visa and is not responsible for any issues — including delay, clarification or rejection by the embassy.` },
    { id: "insurance", title: "Insurance", body: `We consider adequate travel insurance to be essential. It is your responsibility to ensure the cover you purchase is suitable for your particular needs. MyHolidayBro cannot be held responsible for denied entry if you cannot provide details of insurance, and we will not be liable for losses that would otherwise have been covered by adequate insurance.` },
    { id: "payment", title: "Paying for your holiday", body: `To confirm your chosen arrangements, you may pay a partial amount (as chosen by the tour operator) or pay in full. If you choose to pay a partial sum, the remainder is due within 3 days of paying the partial amount. If we do not receive the balance in full and on time we may treat your booking as cancelled and cancellation charges will apply.

Cancellation fees, processing fees and insurance premiums are due immediately on invoicing. Travel documents are sent within 14 days after receipt of final payment. Bookings made less than 30 days before arrival require full payment immediately on receipt of written confirmation.

We accept payment by credit card, debit card, internet banking and bank transfers.` },
    { id: "convenience-fees", title: "Convenience fees", body: `Convenience fees are applicable for all payments made after the date of booking, except for transfers into our bank account. We reserve the right to withdraw waivers for convenience fees on payments made on the day of booking.

Credit-card fraud contingency: If you do not supply the correct credit / debit card billing address or cardholder information, the issue of tickets may be delayed and the overall cost may increase. We reserve the right to cancel your holiday if payment is declined or incorrect card information is supplied. We may also perform random checks to minimise credit-card fraud.` },
    { id: "price", title: "Your holiday price", body: `MyHolidayBro endeavours to display the most up-to-date and correct prices on our website. We reserve the right to raise or lower prices at any time. Occasionally an incorrect price may be shown due to an error — when we become aware of any such error we will notify you, and we reserve the right to cancel the booking if you do not wish to accept the price actually applicable.` },
    { id: "change-booking", title: "If you change your booking", body: `If, after our confirmation invoice has been issued, you wish to change your travel arrangements, we will do our utmost to make those changes — but it may not always be possible. Any request must be made by the lead name on the booking or your tour operator through MyHolidayBro.

Costs could increase the closer to your departure month the changes are made. Only one change of departure month per booking may be permitted; any change in departure month will be treated as a cancellation and full cancellation charges will apply. Certain arrangements may not be amended after they have been confirmed, and any alteration could incur a cancellation charge of up to 100% of that part of the arrangements.` },
    { id: "cancellation", title: "If you cancel your holiday", body: `You, or any member of your party, may cancel your travel arrangements at any time. Written notification by mail, fax or email from the lead name on the booking or your tour operator on your behalf must be received at our offices.

Our cancellation charges are a percentage of the total holiday cost and are based on how many days before departure we receive your cancellation notice (not when your correspondence was sent). Amendment charges are non-refundable.

If only some members of your party cancel, in addition to the applicable cancellation charges we will recalculate the holiday cost for the remaining travellers, which may include single-room supplements. In cases where supplier cancellation charges exceed the deposit, we may pass the charge on to you.` },
    { id: "we-change", title: "If we change or cancel your holiday", body: `Our tour operators plan arrangements many days in advance, so we reserve the right to make changes to and correct errors in holiday details both before and after bookings have been confirmed. We must also reserve the right to cancel confirmed bookings at any time.

Most changes are minor. If we have to make a major change or cancel, we will tell you as soon as possible and offer you the choice of accepting the changed arrangements or purchasing alternative arrangements of a similar standard. If the alternative is less expensive than your original, we will refund the difference; if more expensive, we will ask you to pay the difference.` },
    { id: "refunds", title: "Mode and duration of refunds", body: `• Refunds initiated from our systems usually realise in 3 – 4 working days, but can take up to 21 working days to reflect.
• Refund will be initiated only to the original mode of payment. Where this is not possible, refunds may be done to the buyer's banking account after KYC verification (typically 7 – 15 working days).
• All PayPal refunds after 60 days of transaction will be done only to the PayPal-linked email ID. Exceptions are handled case by case and we do not entertain cross-currency refunds.` },
    { id: "flights", title: "Flights", body: `We are not always in a position at the time of booking to confirm the carrier(s), aircraft type and flight timings used. Flight details shown on the website and confirmation invoice are for guidance only and subject to alteration. The latest timings are shown on the tickets dispatched approximately two weeks before departure. Flight times may change even after tickets are dispatched — we will contact you as soon as possible.

This website is our responsibility as your tour operator. It is not issued on behalf of and does not commit the airlines mentioned, or any airline whose services are used.` },
    { id: "behaviour", title: "Behaviour", body: `When you book a holiday with MyHolidayBro you accept responsibility for the proper conduct of yourself and your party. If we (or any person in authority) reasonably believe that you or any member of your party is behaving so as to cause or be likely to cause danger or upset, or damage to property, we are entitled to terminate the holiday of the person(s) concerned. No refunds will be made. You will be responsible for full payment for any damage or loss caused.` },
    { id: "complaints", title: "If you have a complaint", body: `In the event of any problem with your holiday arrangements while away, you must immediately inform the tour operator's representative, MyHolidayBro and the supplier of the service in question, and complete a report form whilst in resort. If you remain dissatisfied, please call or write to care@myholidaybro.com within 7 days of your return with your booking reference and full details.` },
    { id: "liability", title: "Our liability to you", body: `We will endeavour that your holiday arrangements are made, performed or provided with reasonable skill and care. If your contracted arrangements are not provided as promised or prove deficient due to our failure to use reasonable skill and care, we will make all reasonable efforts to rectify the same. We assume no liability for errors due to systematic issues, fluctuations in prices, availability of flights / hotels / cars, or the standards of service provided by third-party suppliers. Our maximum liability in such cases will be limited to refund of the booking amount, subject to MyHolidayBro receiving the same from the supplier.

We will not be responsible for any injury, illness, death, loss, damage, expense, cost or other claim arising from the act(s) and/or omission(s) of the affected person or any member of their party, or of any third party not connected with the provision of your arrangements which were unforeseeable or unavoidable.

Excursions, tours, activities or other events you book or pay for through anybody other than MyHolidayBro (or whilst on holiday) are not part of your package holiday provided by us. For any such local event your contract is with the supplier of that event and not with us.` },
    { id: "privacy", title: "Data protection & privacy", body: `In order to process your booking and meet your requirements, we must pass your personal details to the relevant suppliers. We may also hold your information for our future marketing purposes (such as informing you of promotional offers or sending our brochure). If you do not wish to receive these approaches, please change your communication preferences on the website. See our Privacy Policy for full details on how your personal details are used.` },
    { id: "special-requests", title: "Special requests & medical", body: `Any special request must be made at the time of booking. We will try to pass reasonable requests to the relevant supplier but cannot guarantee they will be met. The fact that a request is noted on your confirmation invoice is not confirmation that it will be met — failure to meet a special request is not a breach of contract unless we have specifically confirmed it.

Please advise us of any disabilities and special requirements at the time of booking. If we reasonably feel unable to accommodate the needs of the person(s) concerned, we will not confirm the booking, or will cancel it when we become aware of the details. For assistance contact contact@myholidaybro.com.` },
    { id: "disclaimer", title: "Disclaimer", body: `The Site is provided on an "as-is" and "as-available" basis. Your use of the Site and our services is at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the Site and your use thereof, including merchantability, fitness for a particular purpose, and non-infringement. We make no warranties about the accuracy or completeness of the Site's content or of any websites linked to the Site, and assume no liability or responsibility for content errors, personal injury, unauthorised access, bugs, viruses or any loss or damage incurred as a result of using the Site.` },
    { id: "limit-liability", title: "Limitation of liability", body: `To the maximum extent permitted by law, in no event shall MyHolidayBro be liable to any person or entity for any direct, indirect, incidental, special, exemplary, compensatory, consequential or punitive damages — including, but not limited to, loss of production, profit, revenue, contract, goodwill, reputation, business interruption, data or other intangible losses. Notwithstanding anything to the contrary, our liability to you for any cause whatsoever and regardless of the form of action will at all times be limited to the total amount of the transaction in question.` },
    { id: "indemnification", title: "Indemnification", body: `You agree to defend, indemnify and hold us harmless — including our subsidiaries, affiliates, directors, officers, agents, partners and employees — from and against any loss, damage, liability, claim or demand, including reasonable attorney's fees and expenses, made by any third party due to or arising out of: (1) use of the Website, (2) breach of these Terms of Use, (3) any breach of your representations and warranties, or (4) your violation of the rights of a third party, including intellectual property rights.` },
    { id: "force-majeure", title: "Force majeure", body: `A force majeure event is any event beyond MyHolidayBro's control, including but not limited to natural disasters, weather conditions, fire, nuclear incident, terrorist acts, riots, war, labour disputes, strikes, government actions, bankruptcy, machinery breakdown, network or system interruptions, internet or communications breakdown, quarantine, epidemic or pandemic. You agree that MyHolidayBro will have no liability and will make no refund in the event of any delay, cancellation, overbooking, strike, force majeure or other causes beyond their direct control.` },
    { id: "ownership", title: "Ownership & prohibited activities", body: `All trademarks, copyrights, service marks, logos, brands and other intellectual and proprietary rights associated with our services and displayed on this website are proprietary to us and owned or controlled by us or licensed to us. While you may make limited copies of your travel itinerary for personal use, you agree not to otherwise modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell information, software, products or services obtained from this website. Additionally, you agree not to:

• Make any speculative, false or fraudulent reservation.
• Access or copy content using any robot, spider, scraper or automated means without our written permission.
• Bypass or circumvent any access-limiting measures employed on the website.
• Take any action that imposes a disproportionately large load on our infrastructure.
• Frame, mirror or create derivative works from the Site.
• Decompile, disassemble or reverse-engineer any of our software.
• Attempt unauthorised access to the Site or its connected systems.
• Manipulate identifiers to disguise the origin of any content you transmit.

If your booking or account shows signs of fraud, abuse or suspicious activity, we may cancel any travel or service reservations associated with your name, email address or account, and close any associated accounts.` },
    { id: "jurisdiction", title: "Jurisdiction & applicable law", body: `These Terms & Conditions and any agreement to which they apply are governed by the laws of the courts in Bangalore, India. The courts in Bangalore, India shall have exclusive jurisdiction without regard to conflict-of-law principles. All guest claims must be submitted in writing and received by MyHolidayBro no later than sixty (60) days after the completion of the MyHolidayBro vacation. Claims not submitted and received within this time shall be deemed waived and barred.` },
    { id: "misc", title: "Miscellaneous", body: `• If any part of these Terms is determined to be indefinite, invalid or unenforceable, the rest shall continue in full force.
• The parties are independent contractors. These Terms do not create a partnership, franchise, joint venture, agency, fiduciary or employment relationship.
• We may assign any or all of our rights and obligations to others at any time.
• We will not be responsible for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.` },
  ],
};

export const SEED_SETTINGS = {
  brandName: "MyHolidayBro",
  tagline: "Bro, lose yourself. Discover yourself.",
  currency: "₹ INR",
  region: "India",
  supportEmail: "contact@myholidaybro.com",
  supportPhone: "+91 96666 98990",
  whatsapp: "919966698990",
  googleRating: "4.6",
  googleReviews: "1,000",
  // Used on the itinerary PDF closing "Contact / Meet us" page
  companyLegalName: "MyHolidayBro Pvt. Ltd.",
  officeAddress: "613, Tower B, Building - Noida One, Sector 62,\nNoida, Uttar Pradesh, IN - 201301",
};

// ---- Contact page singleton (migrated from app/contact/ContactPage.js) ----
export const SEED_CONTACT = {
  // Hero collage strip (HERO_COLLAGE) — array of image urls.
  heroCollage: [
    cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.35_PM_gmlnpp.jpg"),
    cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_eyigio.jpg"),
    cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_1_buerwk.jpg"),
    cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.22.01_PM_y8n52r.jpg"),
    cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_2_htpd1q.jpg"),
    cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.00_PM_ij9msi.jpg"),
    cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_1_jhjtxh.jpg"),
    cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.21.56_PM_xizioz.jpg"),
  ],
  // Companion desk cards (COMPANIONS). `icon` strings map to SVGs on the frontend.
  companions: [
    {
      label: "Holiday Designers",
      sub: "For all curated departures",
      icon: "sparkle",
      items: [
        { name: "Beach Escapes", icon: "beach" },
        { name: "Honeymoons", icon: "heart" },
        { name: "Family Trips", icon: "family" },
        { name: "Adventure", icon: "mountain" },
        { name: "Weekends", icon: "sun" },
        { name: "All-Girls", icon: "girls" },
      ],
    },
    {
      label: "Specialist Desks",
      sub: "For all custom requests",
      icon: "globe",
      items: [
        { name: "International Trips", icon: "plane" },
        { name: "Domestic Trips", icon: "flag" },
        { name: "Corporate Offsites", icon: "briefcase" },
        { name: "School & College", icon: "cap" },
      ],
    },
  ],
  // Quick-link cards (QUICK_LINKS).
  quickLinks: [
    { title: "Frequently Asked Questions", sub: "Everything travellers ask before they book", href: "/faq", image: cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.22.01_PM_y8n52r.jpg"), tint: "#fff4c2" },
    { title: "Stories by MyHolidayBro", sub: "Travel tales, lists & insider guides", href: "/moments", image: cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.34_PM_eyigio.jpg"), tint: "#d2f5e3" },
    { title: "MHB Insider Newsletter", sub: "One email a month. Big trip ideas.", href: "/newsletter", image: cld("v1779220323/WhatsApp_Image_2026-05-16_at_1.22.01_PM_2_htpd1q.jpg"), tint: "#cfe2ff" },
    { title: "Come Work With Us", sub: "Roles in design, ops & travel", href: "/careers", image: cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.35_PM_gmlnpp.jpg"), tint: "#ffd6e0" },
  ],
  // "Meet Your Trip Captains" side-panel background image.
  captainImage: cld("v1779220324/WhatsApp_Image_2026-05-16_at_1.32.35_PM_gmlnpp.jpg"),
  // Office locations rendered on the contact map.
  offices: [
    { city: "Hyderabad", address: "Level 6, N Heights, Hitech City, Hyderabad — 500081" },
    { city: "New Delhi", address: "Level 31, 1st Floor, Block L, Connaught Place, New Delhi — 110001" },
    { city: "London", address: "Kemp House, 160 City Road, London EC1V 2NX, UK" },
  ],
};

import {
  SEED_PLACES, SEED_HOTELS, SEED_TRANSPORTS, SEED_BLOCKS, SEED_ITINERARIES, SEED_TRIP_TEMPLATES,
} from "./itinerarySeed.js";

export const SEED = {
  destinations: SEED_DESTINATIONS,
  weekends: SEED_WEEKENDS,
  home: SEED_HOME,
  nav: SEED_NAV,
  footer: SEED_FOOTER,
  content: SEED_CONTENT,
  contact: SEED_CONTACT,
  adventureStyles: SEED_ADVENTURE_STYLES,
  users: SEED_USERS,
  settings: SEED_SETTINGS,
  testimonials: SEED_TESTIMONIALS,
  moments: SEED_MOMENTS,
  careers: SEED_CAREERS,
  policies: SEED_POLICIES,
  // Itinerary PDF generator
  itineraries: SEED_ITINERARIES,
  places: SEED_PLACES,
  hotels: SEED_HOTELS,
  transports: SEED_TRANSPORTS,
  blocks: SEED_BLOCKS,
  tripTemplates: SEED_TRIP_TEMPLATES,
};
