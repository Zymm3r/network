export type AvailabilityStatus = 'available' | 'limited' | 'full' | 'advance';
export type CustomerType = 'couple' | 'family' | 'friends' | 'solo' | 'pregnant' | 'kids' | 'elderly';
export type UserRole = 'admin' | 'manager' | 'staff';

export interface HotelPackage {
  id: string;
  name: string;
  island: string;
  location: string;
  type: 'luxury' | 'standard' | 'budget' | 'boutique';
  pricePerNight: number;
  minNights: number;
  availability: AvailabilityStatus;
  customerTypes: CustomerType[];
  includes: string[];
  highlights: string[];
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  roomsLeft?: number;
  checkInTime: string;
  checkOutTime: string;
  phone: string;
  quickReply: string;
}

export interface TransportSchedule {
  id: string;
  route: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  type: 'speedboat' | 'ferry' | 'private_boat' | 'shuttle';
  price: number;
  availability: AvailabilityStatus;
  seatsLeft?: number;
  notes: string;
  operator: string;
  frequency: string;
}

export interface Activity {
  id: string;
  name: string;
  type: 'diving' | 'snorkeling' | 'island_hopping' | 'cultural' | 'adventure' | 'relaxation' | 'water_sports';
  location: string;
  island: string;
  duration: string;
  price: number;
  groupSize: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  availability: AvailabilityStatus;
  customerTypes: CustomerType[];
  includes: string[];
  highlights: string[];
  image: string;
  rating: number;
  bestTime: string;
  quickReply: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  type: 'cafe' | 'restaurant' | 'checkin_spot' | 'market' | 'pharmacy' | 'atm' | 'photo_spot';
  location: string;
  island: string;
  distance: string;
  walkTime: string;
  hours: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$';
  tags: string[];
  phone?: string;
  notes: string;
}

export interface StaffUser {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  department: string;
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

export const currentUser: StaffUser = {
  id: 'u1',
  name: 'Ayu Dewi',
  role: 'staff',
  avatar: 'AD',
  department: 'Guest Relations',
};

export const hotelPackages: HotelPackage[] = [
  {
    id: 'pkg-001',
    name: 'Coral Bay Infinity Suite',
    island: 'Gili Trawangan',
    location: 'North Beach, Gili T',
    type: 'luxury',
    pricePerNight: 2850000,
    minNights: 2,
    availability: 'available',
    customerTypes: ['couple', 'solo'],
    includes: ['Breakfast', 'Airport Transfer', 'Free Snorkeling Gear', 'Welcome Drink', 'Late Checkout'],
    highlights: ['Infinity pool', 'Direct beach access', 'Sunset view', 'Butler service'],
    image: 'https://images.unsplash.com/photo-1662792721650-545a15f07ff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyd2F0ZXIlMjBidW5nYWxvdyUyMG1hbGRpdmVzJTIwcmVzb3J0fGVufDF8fHx8MTc3NTk3ODY4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviews: 312,
    tags: ['Beachfront', 'Pool', 'Romantic', 'Adults Only'],
    roomsLeft: 3,
    checkInTime: '14:00',
    checkOutTime: '12:00',
    phone: '+62 370 638 xxx',
    quickReply: 'Hi! 🌴 Great news — Coral Bay Infinity Suite at Gili T still has availability starting tonight. Includes breakfast, airport transfer & free snorkeling gear. Rate from IDR 2,850,000/night. Would you like to reserve now?',
  },
  {
    id: 'pkg-002',
    name: 'Lombok Garden Family Resort',
    island: 'Lombok',
    location: 'Senggigi, Lombok',
    type: 'standard',
    pricePerNight: 1450000,
    minNights: 3,
    availability: 'available',
    customerTypes: ['family', 'kids', 'elderly'],
    includes: ['Breakfast', 'Kids Club Access', 'Pool', 'Shuttle to Beach', 'Welcome Fruit Basket'],
    highlights: ['Family suites', 'Kids pool', 'Playground', 'Babysitting available'],
    image: 'https://images.unsplash.com/photo-1746138616898-04119bdb9b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2YWNhdGlvbiUyMGJlYWNoJTIwdHJvcGljYWwlMjBob2xpZGF5fGVufDF8fHx8MTc3NTk3ODY5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviews: 541,
    tags: ['Family-friendly', 'Kids Club', 'Pool', 'Safe'],
    roomsLeft: 8,
    checkInTime: '14:00',
    checkOutTime: '11:00',
    phone: '+62 370 693 xxx',
    quickReply: 'Hello! 👨‍👩‍👧‍👦 Lombok Garden Family Resort is perfect for your family! Family suites with kids pool, playground & babysitting service. Rate from IDR 1,450,000/night (min 3 nights). Kids love it here!',
  },
  {
    id: 'pkg-003',
    name: 'Sunrise Boutique Villas',
    island: 'Gili Air',
    location: 'East Coast, Gili Air',
    type: 'boutique',
    pricePerNight: 1980000,
    minNights: 2,
    availability: 'limited',
    customerTypes: ['couple', 'friends', 'solo'],
    includes: ['Breakfast', 'Bicycle Rental', 'Yoga Session', 'Welcome Cocktail'],
    highlights: ['Sunrise views', 'Private terrace', 'Garden setting', 'Eco-friendly'],
    image: 'https://images.unsplash.com/photo-1766393195967-bb27203ba333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwaG90ZWx8ZW58MXx8fHwxNzc1OTc4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 228,
    tags: ['Boutique', 'Eco', 'Yoga', 'Quiet'],
    roomsLeft: 2,
    checkInTime: '13:00',
    checkOutTime: '11:00',
    phone: '+62 370 641 xxx',
    quickReply: '🌅 Only 2 rooms left at Sunrise Boutique Villas, Gili Air! Beautiful sunrise views, private terrace & daily yoga. Includes breakfast + bicycle rental. IDR 1,980,000/night. Book fast — almost full!',
  },
  {
    id: 'pkg-004',
    name: 'Gili Meno Secret Beach',
    island: 'Gili Meno',
    location: 'West Side, Gili Meno',
    type: 'luxury',
    pricePerNight: 3200000,
    minNights: 2,
    availability: 'advance',
    customerTypes: ['couple', 'solo'],
    includes: ['All Meals', 'Snorkeling Tour', 'Sunset Cruise', 'Spa Credit'],
    highlights: ['Secluded beach', 'All-inclusive option', 'Turtle sanctuary nearby', 'Pure privacy'],
    image: 'https://images.unsplash.com/photo-1762175066738-8f92f21377dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHN1bnNldCUyMHJvbWFudGljJTIwY291cGxlJTIwdHJhdmVsfGVufDF8fHx8MTc3NTk3ODY5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.95,
    reviews: 89,
    tags: ['Secluded', 'Honeymoon', 'All-inclusive', 'Luxury'],
    checkInTime: '15:00',
    checkOutTime: '12:00',
    phone: '+62 370 622 xxx',
    quickReply: '🐢 Gili Meno Secret Beach is our most exclusive property — perfect for a honeymoon! Advance booking required. All meals, snorkeling tour & sunset cruise included. IDR 3,200,000/night. Shall I check your dates?',
  },
  {
    id: 'pkg-005',
    name: 'Mataram Budget Inn',
    island: 'Lombok',
    location: 'Mataram City, Lombok',
    type: 'budget',
    pricePerNight: 380000,
    minNights: 1,
    availability: 'available',
    customerTypes: ['solo', 'friends'],
    includes: ['WiFi', 'Shared Kitchen', 'Locker Storage'],
    highlights: ['Central location', 'City access', 'Budget-friendly', 'Co-working space'],
    image: 'https://images.unsplash.com/photo-1743803983305-f6be9ff7228a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwY2FmZSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc1OTc4Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.3,
    reviews: 892,
    tags: ['Budget', 'Central', 'Backpacker', 'WiFi'],
    checkInTime: '12:00',
    checkOutTime: '11:00',
    phone: '+62 370 634 xxx',
    quickReply: '🎒 For budget travelers — Mataram Budget Inn is centrally located with great WiFi & co-working space. Only IDR 380,000/night, available now! Great base for exploring Lombok.',
  },
  {
    id: 'pkg-006',
    name: 'Senaru Jungle Retreat',
    island: 'Lombok',
    location: 'Senaru Village, Lombok',
    type: 'boutique',
    pricePerNight: 1200000,
    minNights: 2,
    availability: 'full',
    customerTypes: ['friends', 'solo', 'couple'],
    includes: ['Breakfast', 'Trekking Guide', 'Waterfall Visit'],
    highlights: ['Near Rinjani volcano', 'Jungle setting', 'Cool mountain air', 'Traditional village'],
    image: 'https://images.unsplash.com/photo-1638619394560-1bd8d1131d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbmQlMjBob3BwaW5nJTIwc3BlZWRib2F0JTIwb2NlYW58ZW58MXx8fHwxNzc1OTc4Njg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviews: 175,
    tags: ['Nature', 'Trekking', 'Mountain', 'Adventure'],
    checkInTime: '14:00',
    checkOutTime: '11:00',
    phone: '+62 370 657 xxx',
    quickReply: '⛰️ Senaru Jungle Retreat is unfortunately fully booked right now. Shall I check next available dates or suggest an alternative near Rinjani?',
  },
];

export const transportSchedules: TransportSchedule[] = [
  {
    id: 'tr-001',
    route: 'Bangsal → Gili Trawangan',
    from: 'Bangsal Harbour',
    to: 'Gili Trawangan',
    departureTime: '08:00',
    arrivalTime: '08:30',
    duration: '30 min',
    type: 'speedboat',
    price: 150000,
    availability: 'available',
    seatsLeft: 12,
    notes: 'Most popular morning departure. Book 1 day ahead in peak season.',
    operator: 'Fast Gili Express',
    frequency: 'Every 2 hours: 08:00, 10:00, 12:00, 14:00, 16:00',
  },
  {
    id: 'tr-002',
    route: 'Bangsal → Gili Air',
    from: 'Bangsal Harbour',
    to: 'Gili Air',
    departureTime: '09:00',
    arrivalTime: '09:20',
    duration: '20 min',
    type: 'speedboat',
    price: 120000,
    availability: 'available',
    seatsLeft: 8,
    notes: 'Quickest route. Also stops at Gili Meno on request.',
    operator: 'Blue Ocean Shuttle',
    frequency: 'Every 3 hours: 09:00, 12:00, 15:00, 17:30',
  },
  {
    id: 'tr-003',
    route: 'Bangsal → Gili Meno',
    from: 'Bangsal Harbour',
    to: 'Gili Meno',
    departureTime: '10:00',
    arrivalTime: '10:25',
    duration: '25 min',
    type: 'speedboat',
    price: 130000,
    availability: 'limited',
    seatsLeft: 3,
    notes: 'Limited seats remaining for today. Tomorrow fully available.',
    operator: 'Island Hopper Co.',
    frequency: '10:00 and 14:00 daily',
  },
  {
    id: 'tr-004',
    route: 'Lombok → Bali (Public Ferry)',
    from: 'Lembar Harbour',
    to: 'Padang Bai, Bali',
    departureTime: '06:00',
    arrivalTime: '10:00',
    duration: '4 hours',
    type: 'ferry',
    price: 55000,
    availability: 'available',
    notes: 'Budget option. Bring snacks. Car ferry — can take vehicles.',
    operator: 'ASDP Indonesia Ferry',
    frequency: 'Every 2 hours, 24/7',
  },
  {
    id: 'tr-005',
    route: 'Lombok → Bali (Fast Boat)',
    from: 'Teluk Nara Harbour',
    to: 'Amed, Bali',
    departureTime: '08:30',
    arrivalTime: '10:30',
    duration: '2 hours',
    type: 'speedboat',
    price: 350000,
    availability: 'limited',
    seatsLeft: 4,
    notes: 'Scenic route. Snorkeling stop at Gili optional. Book in advance!',
    operator: 'Eka Jaya Fast Boat',
    frequency: '08:30 only — one departure daily',
  },
  {
    id: 'tr-006',
    route: 'Private Charter (Any Route)',
    from: 'Custom',
    to: 'Custom',
    departureTime: 'Flexible',
    arrivalTime: 'Flexible',
    duration: 'Varies',
    type: 'private_boat',
    price: 2500000,
    availability: 'advance',
    notes: 'Full-day private charter. Snorkeling, island stops included. Min 24h booking.',
    operator: 'SeaWing Private Charters',
    frequency: 'On request — advance booking required',
  },
  {
    id: 'tr-007',
    route: 'Airport → Mataram / Senggigi',
    from: 'Lombok International Airport',
    to: 'Mataram / Senggigi',
    departureTime: 'On arrival',
    arrivalTime: '30–45 min',
    duration: '30–45 min',
    type: 'shuttle',
    price: 85000,
    availability: 'available',
    notes: 'Shared shuttle. No booking needed. Taxi also available — negotiate IDR 150k.',
    operator: 'Lombok Airport Shuttle',
    frequency: 'Every departure at airport exit',
  },
];

export const activities: Activity[] = [
  {
    id: 'act-001',
    name: 'PADI Discover Scuba Diving',
    type: 'diving',
    location: 'Shark Point, Gili T',
    island: 'Gili Trawangan',
    duration: '3 hours',
    price: 750000,
    groupSize: '2–6 people',
    difficulty: 'easy',
    availability: 'available',
    customerTypes: ['couple', 'friends', 'solo'],
    includes: ['Equipment', 'Certified Instructor', 'Underwater Photos', 'Certificate'],
    highlights: ['See reef sharks', 'Vibrant coral', 'No experience needed', 'Underwater photo'],
    image: 'https://images.unsplash.com/photo-1615023117977-2a548707f3d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3ViYSUyMGRpdmluZyUyMHVuZGVyd2F0ZXIlMjB0cm9waWNhbHxlbnwxfHx8fDE3NzU5Nzg2ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    bestTime: 'Morning (07:00–11:00)',
    quickReply: '🤿 Discover Scuba at Gili T — no experience needed! See reef sharks, vibrant coral & get an underwater photo. IDR 750,000/person. Morning slots available today!',
  },
  {
    id: 'act-002',
    name: '3 Gili Island Hopping',
    type: 'island_hopping',
    location: 'Gili Trawangan, Air & Meno',
    island: 'All Gili Islands',
    duration: 'Full Day (8 hours)',
    price: 350000,
    groupSize: '4–15 people',
    difficulty: 'easy',
    availability: 'available',
    customerTypes: ['family', 'friends', 'couple', 'kids', 'elderly'],
    includes: ['Boat', 'Snorkeling Gear', 'Lunch', 'Guide'],
    highlights: ['Visit all 3 Gilis', 'Snorkel with turtles', 'Lunch on beach', 'Sunset return'],
    image: 'https://images.unsplash.com/photo-1638619394560-1bd8d1131d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbmQlMjBob3BwaW5nJTIwc3BlZWRib2F0JTIwb2NlYW58ZW58MXx8fHwxNzc1OTc4Njg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    bestTime: 'Departs 09:00 daily',
    quickReply: '🏝️ 3 Gili Island Hopping — perfect for everyone! Visit all 3 islands, snorkel with turtles & enjoy beach lunch. IDR 350,000/person. Departs 09:00. Seats available!',
  },
  {
    id: 'act-003',
    name: 'Sunset Snorkeling Tour',
    type: 'snorkeling',
    location: 'Turtle Point, Gili Air',
    island: 'Gili Air',
    duration: '2 hours',
    price: 250000,
    groupSize: '2–10 people',
    difficulty: 'easy',
    availability: 'limited',
    customerTypes: ['couple', 'friends', 'family', 'elderly'],
    includes: ['Snorkel Gear', 'Life Jacket', 'Guide', 'Fresh Fruit'],
    highlights: ['Swim with sea turtles', 'Sunset views', 'Small group', 'Great for beginners'],
    image: 'https://images.unsplash.com/photo-1764099906950-3738f43131af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm9ya2VsaW5nJTIwY2xlYXIlMjB0dXJxdW9pc2UlMjB3YXRlciUyMGNvcmFsJTIwcmVlZnxlbnwxfHx8fDE3NzU5Nzg2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    bestTime: 'Afternoon 16:00–18:00',
    quickReply: '🐢 Sunset Snorkeling at Turtle Point — swim with wild turtles at golden hour! IDR 250,000/person. ⚠️ Only 3 spots left today — shall I reserve?',
  },
  {
    id: 'act-004',
    name: 'Mt. Rinjani Trekking (2D1N)',
    type: 'adventure',
    location: 'Senaru Base Camp',
    island: 'Lombok',
    duration: '2 Days 1 Night',
    price: 1800000,
    groupSize: '2–8 people',
    difficulty: 'challenging',
    availability: 'advance',
    customerTypes: ['friends', 'solo'],
    includes: ['Porter', 'Guide', 'Camping Gear', 'All Meals', 'Permit'],
    highlights: ['Active volcano crater', 'Crater lake', 'Sunrise above clouds', 'Epic adventure'],
    image: 'https://images.unsplash.com/photo-1766393195967-bb27203ba333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwaG90ZWx8ZW58MXx8fHwxNzc1OTc4Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.95,
    bestTime: 'Dry season: April–October',
    quickReply: '⛰️ Mt. Rinjani 2D1N Trek — Indonesia\'s most epic volcano! All-inclusive with porter & guide. IDR 1,800,000/person. ⚠️ Advance booking required (min 2 days prior). Not suitable for elderly/pregnant.',
  },
  {
    id: 'act-005',
    name: 'Cooking Class & Market Tour',
    type: 'cultural',
    location: 'Mataram Old Town',
    island: 'Lombok',
    duration: '4 hours',
    price: 450000,
    groupSize: '2–8 people',
    difficulty: 'easy',
    availability: 'available',
    customerTypes: ['couple', 'family', 'elderly', 'pregnant', 'kids'],
    includes: ['Market Visit', 'All Ingredients', 'Recipe Book', 'Meal', 'Certificate'],
    highlights: ['Local market tour', 'Learn 5 dishes', 'Take-home recipe book', 'Family-friendly'],
    image: 'https://images.unsplash.com/photo-1743803983305-f6be9ff7228a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwY2FmZSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc1OTc4Njk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    bestTime: 'Morning 08:00–12:00',
    quickReply: '👩‍🍳 Lombok Cooking Class — perfect for families & couples! Start at local market, learn 5 authentic dishes & enjoy your creation. IDR 450,000/person. Available this morning!',
  },
  {
    id: 'act-006',
    name: 'Surfing Lessons — Kuta Beach',
    type: 'water_sports',
    location: 'Kuta Beach, Lombok',
    island: 'Lombok',
    duration: '2 hours',
    price: 300000,
    groupSize: '1–4 people',
    difficulty: 'moderate',
    availability: 'available',
    customerTypes: ['friends', 'solo', 'couple'],
    includes: ['Board Rental', 'Instructor', 'Rash Guard', 'Video Footage'],
    highlights: ['World-class waves', 'Beginner & intermediate', 'Video of your session', 'Small groups'],
    image: 'https://images.unsplash.com/photo-1764099906950-3738f43131af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm9ya2VsaW5nJTIwY2xlYXIlMjB0dXJxdW9pc2UlMjB3YXRlciUyMGNvcmFsJTIwcmVlZnxlbnwxfHx8fDE3NzU5Nzg2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    bestTime: 'Early morning 07:00–09:00',
    quickReply: '🏄 Surf lesson at Kuta Beach — IDR 300,000/session with board, instructor & video of your ride! Great waves for beginners & intermediate. Available slots today!',
  },
];

export const nearbyPlaces: NearbyPlace[] = [
  {
    id: 'np-001',
    name: 'Scallywags Beach Club',
    type: 'restaurant',
    location: 'North Beach, Gili T',
    island: 'Gili Trawangan',
    distance: '150m',
    walkTime: '2 min',
    hours: '07:00–23:00',
    rating: 4.7,
    priceRange: '$$',
    tags: ['Beachfront', 'Western', 'Seafood', 'Cocktails'],
    phone: '+62 819 xxxx',
    notes: 'Best sunset view on the island. Reserve table for dinner — gets crowded.',
  },
  {
    id: 'np-002',
    name: 'Warung Sasak Local Food',
    type: 'restaurant',
    location: 'Central Area, Gili T',
    island: 'Gili Trawangan',
    distance: '300m',
    walkTime: '4 min',
    hours: '08:00–21:00',
    rating: 4.8,
    priceRange: '$',
    tags: ['Local', 'Authentic', 'Cheap', 'Vegetarian options'],
    notes: 'Best local ayam taliwang & plecing kangkung. Cash only. Very popular with locals.',
  },
  {
    id: 'np-003',
    name: 'Desa Seni Wellness Café',
    type: 'cafe',
    location: 'South End, Gili Air',
    island: 'Gili Air',
    distance: '500m',
    walkTime: '7 min',
    hours: '07:00–18:00',
    rating: 4.9,
    priceRange: '$$',
    tags: ['Healthy', 'Vegan', 'WiFi', 'Yoga'],
    notes: 'Great smoothie bowls. Free WiFi. Perfect work spot. Yoga classes at 07:30 & 17:00.',
  },
  {
    id: 'np-004',
    name: 'BRI ATM — Gili T Harbor',
    type: 'atm',
    location: 'Near Harbour, Gili T',
    island: 'Gili Trawangan',
    distance: '200m',
    walkTime: '3 min',
    hours: '24/7',
    rating: 3.8,
    priceRange: '$',
    tags: ['ATM', 'BRI', 'Bank'],
    notes: 'Frequently out of cash on weekends. Backup: Mandiri ATM 500m north. Max withdrawal IDR 1.5M.',
  },
  {
    id: 'np-005',
    name: 'Sunset Point — Gili Meno',
    type: 'photo_spot',
    location: 'West Beach, Gili Meno',
    island: 'Gili Meno',
    distance: '800m',
    walkTime: '10 min',
    hours: '17:30–19:00 best',
    rating: 5.0,
    priceRange: '$',
    tags: ['Sunset', 'Instagram', 'Free', 'Romantic'],
    notes: 'Most stunning sunset in all three Gilis. Arrive by 17:30 for best spot. Bring camera!',
  },
  {
    id: 'np-006',
    name: 'Lombok Central Market (Pasar)',
    type: 'market',
    location: 'Ampenan District, Mataram',
    island: 'Lombok',
    distance: '1.2km',
    walkTime: '15 min',
    hours: '05:00–12:00',
    rating: 4.5,
    priceRange: '$',
    tags: ['Local', 'Fresh produce', 'Souvenirs', 'Cultural'],
    notes: 'Best in early morning. Haggling expected. Great for spices, textiles & local snacks.',
  },
  {
    id: 'np-007',
    name: 'Kimia Farma Pharmacy',
    type: 'pharmacy',
    location: 'Main Road, Mataram',
    island: 'Lombok',
    distance: '600m',
    walkTime: '8 min',
    hours: '08:00–22:00',
    rating: 4.2,
    priceRange: '$',
    phone: '+62 370 621 xxx',
    tags: ['Pharmacy', 'Medicine', 'Sunscreen'],
    notes: 'Full range of medications. Staff speak some English. Stock sunscreen & sea sickness tablets.',
  },
  {
    id: 'np-008',
    name: 'Beach Check-in Photo Spot',
    type: 'checkin_spot',
    location: 'East Pier, Gili Air',
    island: 'Gili Air',
    distance: '100m',
    walkTime: '1 min',
    hours: 'Sunrise best',
    rating: 4.9,
    priceRange: '$',
    tags: ['Check-in', 'Instagram', 'Swing', 'Free'],
    notes: 'Famous beach swing & "Gili Air" sign. Best light at sunrise (06:00–07:30). Free access.',
  },
];

export const quickStats = {
  availablePackages: hotelPackages.filter(p => p.availability === 'available').length,
  limitedPackages: hotelPackages.filter(p => p.availability === 'limited').length,
  fullPackages: hotelPackages.filter(p => p.availability === 'full').length,
  availableActivities: activities.filter(a => a.availability === 'available').length,
  todayDepartures: transportSchedules.filter(t => t.availability !== 'full').length,
};

export const islands = ['All Islands', 'Gili Trawangan', 'Gili Air', 'Gili Meno', 'Lombok'];
export const customerTypeOptions: { value: CustomerType; label: string; emoji: string }[] = [
  { value: 'couple', label: 'Couple', emoji: '💑' },
  { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { value: 'friends', label: 'Friends', emoji: '👫' },
  { value: 'solo', label: 'Solo', emoji: '🧳' },
  { value: 'pregnant', label: 'Pregnant', emoji: '🤰' },
  { value: 'kids', label: 'With Kids', emoji: '👶' },
  { value: 'elderly', label: 'Elderly', emoji: '👴' },
];
