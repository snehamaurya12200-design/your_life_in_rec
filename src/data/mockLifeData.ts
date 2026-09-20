import { Chapter, Persona, Receipt } from '../types';

export const PERSONAS: Persona[] = [
  {
    id: 'maya',
    name: 'Maya Lin',
    subtitle: 'Architectural Designer • Brooklyn & Hudson Valley',
    tagline: '18 months of burnt studio deadlines, 2 AM coffee runs, a sudden departure, and slow reconstruction.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    period: '2023 — 2024',
    totalSpent: 4820.45,
    receiptsCount: 22,
    defaultChapterId: 'ch1',
  },
  {
    id: 'julian',
    name: 'Julian Vance',
    subtitle: 'Emergency Medical Tech • Seattle',
    tagline: 'Life charted between 12-hour ambulance shifts, 24-hour diners, thrifted records, and quiet rain.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    period: '2023 — 2024',
    totalSpent: 3940.10,
    receiptsCount: 19,
    defaultChapterId: 'ch2',
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    subtitle: 'Freelance Essayist • Montreal & Lisbon',
    tagline: 'Train sleeper cars, international book stalls, espresso tabs, and foreign language dictionaries.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    period: '2023 — 2024',
    totalSpent: 5160.80,
    receiptsCount: 21,
    defaultChapterId: 'ch3',
  }
];

export const INITIAL_CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    numeral: 'I',
    title: 'The Year of Midnight Neon',
    subtitle: 'Studio deadlines, fluorescent diners, and surviving on adrenaline',
    timeframe: 'Jan 2023 — May 2023',
    summary: 'The transactions from this period are dense with caffeine, late-night ride shares across misty bridges, and hasty takeout eaten standing over drafting tables.',
    narrativeText: [
      'In January, the days shrank until only the receipts marked the passage of sun and dusk. Every night had its numerical signature: $4.75 for drip coffee at 9:15 PM, then $22.40 for bodega dumplings at 1:40 AM.',
      'We thought ambition looked like progress. Looking through the thermal tape now, it looks like a person trying very hard not to fall asleep before their youth was finished.',
      'Notice how the ride-share timestamps inch later into the morning. The city charges surcharges between 2:00 AM and 4:00 AM; the receipt doesn\'t explain why, but the body remembers.'
    ],
    receiptsCount: 6,
    receiptIds: ['rc-101', 'rc-102', 'rc-103', 'rc-104', 'rc-105', 'rc-106'],
    theme: 'Midnight & Adrenaline',
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    pullQuote: 'The receipts don’t lie: I was awake when the city was dreaming, and asleep when the world wanted to talk.'
  },
  {
    id: 'ch2',
    numeral: 'II',
    title: 'Departure Gate 14',
    subtitle: 'The fracture point, packing boxes, and a one-way ticket',
    timeframe: 'Jun 2023 — Oct 2023',
    summary: 'The sudden shift in merchant geography: storage unit deposits, emergency hardware store visits, packing tape, and an airline ticket bought at 3:12 AM on an impulse.',
    narrativeText: [
      'There is a receipt from June 14th from the corner hardware store: three rolls of reinforced packing tape and a box cutter. Total: $19.82. That is where the old apartment dissolved into cardboard.',
      'Two weeks later, the airline confirmation arrived via email: one carry-on, one window seat, destination unknown to everyone except the credit card statement.',
      'When you look at someone’s life in receipts, you can pinpoint the exact afternoon their courage outran their fear.'
    ],
    receiptsCount: 5,
    receiptIds: ['rc-201', 'rc-202', 'rc-203', 'rc-204', 'rc-205'],
    theme: 'Transit & Rupture',
    coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    pullQuote: 'A single boarding pass costs less than a month of quiet unhappiness.'
  },
  {
    id: 'ch3',
    numeral: 'III',
    title: 'The Anatomy of Quiet',
    subtitle: 'Second-hand bookstores, pantry restocking, and wooden spoons',
    timeframe: 'Nov 2023 — Mar 2024',
    summary: 'The pace slows down. Midnight transactions drop to zero. In their place: bulk loose-leaf tea, used paperback novels, sourdough flour, and train passes along the river.',
    narrativeText: [
      'The receipts in autumn smelled of rain and thrift shops. An oil lamp for $14. A cast-iron skillet for $22. Two used paperbacks with someone else\'s marginalia penciled inside the cover.',
      'Healing does not announce itself with a parade; it shows up on a Sunday grocery receipt that includes fresh rosemary instead of instant noodles.',
      'The bank sends monthly summaries with pie charts, but the pie chart misses the fact that the $18 spent at the local florist kept an entire week from turning gray.'
    ],
    receiptsCount: 5,
    receiptIds: ['rc-301', 'rc-302', 'rc-303', 'rc-304', 'rc-305'],
    theme: 'Sanctuary & Restoration',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    pullQuote: 'You begin to survive when you buy food that takes longer than five minutes to cook.'
  },
  {
    id: 'ch4',
    numeral: 'IV',
    title: 'The Architecture of Becoming',
    subtitle: 'Tools, community rituals, and deliberate investments',
    timeframe: 'Apr 2024 — Present',
    summary: 'Transactions are intentional now: high-quality drafting vellum, shared dinner bills with new friends, seeds for the windowsill, and renewal fees for dreams.',
    narrativeText: [
      'The ledger entries now have names attached. Dinner for four at the trattoria. Splitting the bill with three other people who laugh at the same terrible jokes.',
      'The ghost subscriptions were canceled on a Tuesday morning in April. No more paying $9.99 a month for an app designed to measure sleep that was never slept.',
      'What remains is a living archive: proof that money is not just arithmetic, but the trace paper of human consciousness across space and time.'
    ],
    receiptsCount: 4,
    receiptIds: ['rc-401', 'rc-402', 'rc-403', 'rc-404'],
    theme: 'Community & Horizon',
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    pullQuote: 'Every receipt is a temporary contract with the universe: I gave a piece of my labor, and received this brief warmth.'
  }
];

export const INITIAL_RECEIPTS: Receipt[] = [
  // Chapter 1: The Year of Midnight Neon
  {
    id: 'rc-101',
    merchant: 'NIGHT OWL ALL-NIGHT DINER',
    subtitle: 'Booth 4 • Counter Ticket #82',
    category: 'midnight',
    date: '2023-01-18',
    time: '02:43 AM',
    hour24: 2,
    total: 21.85,
    items: [
      { id: 'i-1', name: 'Two Eggs Over Easy & Hash', quantity: 1, price: 11.50 },
      { id: 'i-2', name: 'Rye Toast (Heavy Butter)', quantity: 1, price: 3.50 },
      { id: 'i-3', name: 'Endless Black Drip Coffee', quantity: 2, price: 4.50 },
      { id: 'i-4', name: 'State Sales Tax (8.875%)', quantity: 1, price: 2.35 }
    ],
    paymentMethod: 'Apple Pay (Mastercard •••• 4912)',
    location: {
      city: 'Brooklyn, NY',
      neighborhood: 'Greenpoint',
      address: '942 Manhattan Ave'
    },
    emotion: 'vulnerable',
    memoryNote: 'Could not sleep after the final design critique was rejected. Sat alone in the corner booth watching rain slide down neon glass, sketching alternatives on greasy paper napkins.',
    marginalia: 'Napkin sketch still preserved in drafting notebook p. 44.',
    tags: ['Late Night', 'Caffeine', 'Drafting Solitude', 'Rain'],
    connectedReceiptIds: ['rc-102', 'rc-103'],
    chapterId: 'ch1',
    polaroidUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rc-102',
    merchant: 'METRO COMMUTE CARS',
    subtitle: 'Ride #9921 • Bridge Surcharge',
    category: 'transit',
    date: '2023-01-18',
    time: '03:48 AM',
    hour24: 3,
    total: 38.60,
    items: [
      { id: 'i-5', name: 'Base Fare (Williamsburg to Crown Hts)', quantity: 1, price: 24.00 },
      { id: 'i-6', name: 'Late Night High-Demand Surge (1.4x)', quantity: 1, price: 9.60 },
      { id: 'i-7', name: 'Driver Gratuity', quantity: 1, price: 5.00 }
    ],
    paymentMethod: 'Mastercard •••• 4912',
    location: {
      city: 'Brooklyn, NY',
      neighborhood: 'Williamsburg Bridge'
    },
    emotion: 'solitary',
    memoryNote: 'The driver had soft Turkish jazz playing on the radio. Neither of us said a word. The bridge cables looked like harp strings against the smog.',
    tags: ['Transit', 'Surge', 'Silence'],
    connectedReceiptIds: ['rc-101'],
    chapterId: 'ch1'
  },
  {
    id: 'rc-103',
    merchant: 'CORNER APOTHECARY & WELLNESS',
    subtitle: '24-Hour Express Lane',
    category: 'health',
    date: '2023-02-04',
    time: '11:15 PM',
    hour24: 23,
    total: 26.40,
    items: [
      { id: 'i-8', name: 'Severe Congestion Day/Night Caps', quantity: 1, price: 13.99 },
      { id: 'i-9', name: 'Echinacea & Honey Drops', quantity: 1, price: 5.49 },
      { id: 'i-10', name: 'Electrolyte Sparkling Water (Lemon)', quantity: 2, price: 4.50 },
      { id: 'i-11', name: 'Local Bag Fee', quantity: 1, price: 0.10 }
    ],
    paymentMethod: 'Apple Pay •••• 4912',
    location: {
      city: 'Brooklyn, NY',
      neighborhood: 'Bed-Stuy',
      address: '412 Nostrand Ave'
    },
    emotion: 'vulnerable',
    memoryNote: 'Fever spiked right before the deadline presentation. Stood in the brightly lit fluorescent aisle shivering in an oversized wool coat.',
    tags: ['Health', 'Fever', 'Deadline'],
    connectedReceiptIds: ['rc-101', 'rc-104'],
    chapterId: 'ch1'
  },
  {
    id: 'rc-104',
    merchant: 'STUDIO BLUEPRINT & SUPPLY CO.',
    subtitle: 'Architectural Supplies & Plotting',
    category: 'culture',
    date: '2023-02-12',
    time: '08:20 AM',
    hour24: 8,
    total: 84.15,
    items: [
      { id: 'i-12', name: 'Vellum Tracing Roll 36" x 50yd', quantity: 1, price: 42.00 },
      { id: 'i-13', name: 'Rotring Rapidograph 0.35mm Nib', quantity: 1, price: 28.50 },
      { id: 'i-14', name: 'Drafting Dots (Pack of 500)', quantity: 1, price: 8.50 }
    ],
    paymentMethod: 'Visa •••• 1084',
    location: {
      city: 'New York, NY',
      neighborhood: 'SoHo',
      address: '78 Mercer St'
    },
    emotion: 'searching',
    memoryNote: 'Buying fresh vellum is like buying fresh hope. You believe that on this virgin white paper, you will finally solve the structural dilemma.',
    tags: ['Tools', 'Architecture', 'Morning Light'],
    connectedReceiptIds: ['rc-103', 'rc-105'],
    chapterId: 'ch1'
  },
  {
    id: 'rc-105',
    merchant: 'LITTLE TOKYO RAMEN HOUSE',
    subtitle: 'Table 7 • Counter Service',
    category: 'sustenance',
    date: '2023-03-22',
    time: '09:45 PM',
    hour24: 21,
    total: 31.50,
    items: [
      { id: 'i-15', name: 'Black Garlic Tonkotsu Ramen', quantity: 1, price: 18.50 },
      { id: 'i-16', name: 'Seasoned Nitamago Egg', quantity: 1, price: 3.00 },
      { id: 'i-17', name: 'Asahi Draft Beer (Pint)', quantity: 1, price: 8.00 }
    ],
    paymentMethod: 'Mastercard •••• 4912',
    location: {
      city: 'New York, NY',
      neighborhood: 'East Village',
      address: '112 St. Marks Pl'
    },
    emotion: 'solitary',
    memoryNote: 'Ate alone with my elbows tucked in. The steam fogged my glasses. Looking around, everyone in the restaurant was also eating alone and staring at their phones.',
    tags: ['Food', 'Solitude', 'Warmth'],
    connectedReceiptIds: ['rc-106'],
    chapterId: 'ch1'
  },
  {
    id: 'rc-106',
    merchant: 'SPOTIFY DIGITAL AB',
    subtitle: 'Monthly Family Premium Plan',
    category: 'subscriptions',
    date: '2023-04-01',
    time: '06:00 AM',
    hour24: 6,
    total: 16.99,
    items: [
      { id: 'i-18', name: 'Family Plan (6 Accounts)', quantity: 1, price: 16.99 }
    ],
    paymentMethod: 'Autopay Mastercard •••• 4912',
    location: {
      city: 'Cloud Services',
      neighborhood: 'Stockholm Server Node'
    },
    emotion: 'tender',
    memoryNote: 'Kept paying for the family plan for 11 months after the breakup because I did not have the heart to kick her off her playlists.',
    marginalia: 'Ghost subscription #1.',
    tags: ['Subscription', 'Ghost Spend', 'Memory'],
    connectedReceiptIds: ['rc-403'],
    chapterId: 'ch1'
  },

  // Chapter 2: Departure Gate 14
  {
    id: 'rc-201',
    merchant: 'ACE INDUSTRIAL HARDWARE',
    subtitle: 'Register 3 • Moving Supplies',
    category: 'escape',
    date: '2023-06-14',
    time: '04:15 PM',
    hour24: 16,
    total: 42.75,
    items: [
      { id: 'i-19', name: 'Heavy Duty Box Tape 3-Pack', quantity: 1, price: 16.99 },
      { id: 'i-20', name: 'Wardrobe Box with Metal Bar', quantity: 2, price: 18.50 },
      { id: 'i-21', name: 'Retractable Utility Knife', quantity: 1, price: 4.99 }
    ],
    paymentMethod: 'Apple Pay •••• 4912',
    location: {
      city: 'Brooklyn, NY',
      neighborhood: 'Greenpoint',
      address: '687 Manhattan Ave'
    },
    emotion: 'vulnerable',
    memoryNote: 'The moment of decision. The cashier asked if I was building something exciting. I said, "No, I am taking something apart."',
    tags: ['Moving', 'Decision', 'Boxes'],
    connectedReceiptIds: ['rc-202', 'rc-203'],
    chapterId: 'ch2',
    polaroidUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rc-202',
    merchant: 'TAP AIR PORTUGAL',
    subtitle: 'Flight TP 0104 • JFK to LIS',
    category: 'transit',
    date: '2023-07-02',
    time: '03:12 AM',
    hour24: 3,
    total: 489.20,
    items: [
      { id: 'i-22', name: 'Economy Basic Fare (One-Way)', quantity: 1, price: 380.00 },
      { id: 'i-23', name: 'Checked Baggage (23kg)', quantity: 1, price: 65.00 },
      { id: 'i-24', name: 'Selected Window Seat 24A', quantity: 1, price: 28.00 },
      { id: 'i-25', name: 'Aviation Security Surcharge', quantity: 1, price: 16.20 }
    ],
    paymentMethod: 'Visa Signature •••• 1084',
    location: {
      city: 'New York / Lisbon',
      neighborhood: 'JFK Terminal 5'
    },
    emotion: 'escapist',
    memoryNote: 'Bought on the kitchen floor amidst half-packed cardboard boxes at three in the morning. Hands were shaking as I clicked confirm. No return date.',
    marginalia: 'The pivotal receipt of the decade.',
    tags: ['Flight', 'Departure', 'One-Way', 'Pivot'],
    connectedReceiptIds: ['rc-201', 'rc-204'],
    chapterId: 'ch2',
    polaroidUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rc-203',
    merchant: 'GOODWILL INDUSTRIES THRIFT',
    subtitle: 'Donation Drop-off & Cleanout',
    category: 'culture',
    date: '2023-07-10',
    time: '02:00 PM',
    hour24: 14,
    total: 0.00,
    items: [
      { id: 'i-26', name: '6 Large Bags Household & Clothing (Donation Receipt)', quantity: 6, price: 0.00 }
    ],
    paymentMethod: 'Tax Deduction Form Filed',
    location: {
      city: 'Queens, NY',
      neighborhood: 'Long Island City'
    },
    emotion: 'tender',
    memoryNote: 'Donated five years of architecture monographs, clothes I wore to meetings that never went anywhere, and four spare mugs. Felt lighter by two hundred pounds.',
    tags: ['Letting Go', 'Donation', 'Purge'],
    connectedReceiptIds: ['rc-201'],
    chapterId: 'ch2'
  },
  {
    id: 'rc-204',
    merchant: 'PASTÉIS DE BELÉM',
    subtitle: 'Balcão Histórico • Lisboa',
    category: 'sustenance',
    date: '2023-07-16',
    time: '10:30 AM',
    hour24: 10,
    total: 6.80,
    items: [
      { id: 'i-27', name: 'Pastel de Nata (Warm with Cinnamon)', quantity: 3, price: 4.20 },
      { id: 'i-28', name: 'Bica (Double Espresso)', quantity: 1, price: 1.40 },
      { id: 'i-29', name: 'Água das Pedras Salgadas', quantity: 1, price: 1.20 }
    ],
    paymentMethod: 'Wise Euro Debit •••• 7731',
    location: {
      city: 'Lisbon, Portugal',
      neighborhood: 'Belém',
      address: 'R. de Belém 84-92'
    },
    emotion: 'celebratory',
    memoryNote: 'First morning in Lisbon. The tiles were blinding in the Atlantic sunlight. The pastry was warm, dusted with cinnamon, and tasted like having survived.',
    tags: ['Lisbon', 'Sugar', 'Sunlight', 'New Shore'],
    connectedReceiptIds: ['rc-202', 'rc-205'],
    chapterId: 'ch2',
    polaroidUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rc-205',
    merchant: 'LIVRARIA BERTRAND CHIADO',
    subtitle: 'Oldest Bookshop in the World (Est. 1732)',
    category: 'culture',
    date: '2023-08-04',
    time: '04:40 PM',
    hour24: 16,
    total: 32.50,
    items: [
      { id: 'i-30', name: 'The Book of Disquiet (Fernando Pessoa)', quantity: 1, price: 18.00 },
      { id: 'i-31', name: 'Hand-sewn Linen Journal (Blank)', quantity: 1, price: 14.50 }
    ],
    paymentMethod: 'Wise Euro Debit •••• 7731',
    location: {
      city: 'Lisbon, Portugal',
      neighborhood: 'Chiado',
      address: 'R. Garrett 73'
    },
    emotion: 'searching',
    memoryNote: 'Stamp on the inside cover: "Bought at Bertrand, Chiado". Sat at A Brasileira with a bica and wrote the first three sentences of a novel I may never finish.',
    tags: ['Books', 'Linen', 'Pessoa'],
    connectedReceiptIds: ['rc-204', 'rc-301'],
    chapterId: 'ch2'
  },

  // Chapter 3: The Anatomy of Quiet
  {
    id: 'rc-301',
    merchant: 'COLUMBIA RIVER THRIFT & CURIOS',
    subtitle: 'Vintage Goods & Restorations',
    category: 'culture',
    date: '2023-11-12',
    time: '01:15 PM',
    hour24: 13,
    total: 38.00,
    items: [
      { id: 'i-32', name: '1960s Cast Brass Desk Lamp (Re-wired)', quantity: 1, price: 28.00 },
      { id: 'i-33', name: 'Woolen Tartan Throw (Pendleton Mill end)', quantity: 1, price: 10.00 }
    ],
    paymentMethod: 'Cash',
    location: {
      city: 'Hood River, OR',
      neighborhood: 'Downtown Historic Dist.'
    },
    emotion: 'tender',
    memoryNote: 'The brass lamp casts a pool of honey-colored light across the pine desk. For the first time in three years, nightfall felt cozy rather than threatening.',
    tags: ['Vintage', 'Home', 'Warmth'],
    connectedReceiptIds: ['rc-302', 'rc-303'],
    chapterId: 'ch3',
    polaroidUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rc-302',
    merchant: 'COMMUNITY GRAIN & APOTHECARY',
    subtitle: 'Bulk Whole Foods Co-op',
    category: 'sustenance',
    date: '2023-12-05',
    time: '11:20 AM',
    hour24: 11,
    total: 44.30,
    items: [
      { id: 'i-34', name: 'Organic Heritage Rye Flour (2kg)', quantity: 1, price: 8.50 },
      { id: 'i-35', name: 'Mountain Wildflower Raw Honey', quantity: 1, price: 14.00 },
      { id: 'i-36', name: 'Loose Leaf Chamomile & Lavender', quantity: 1, price: 9.80 },
      { id: 'i-37', name: 'Salted French Butter (Cultured)', quantity: 1, price: 12.00 }
    ],
    paymentMethod: 'Apple Pay •••• 4912',
    location: {
      city: 'Portland, OR',
      neighborhood: 'Hawthorne',
      address: '3815 SE Belmont'
    },
    emotion: 'mundane',
    memoryNote: 'First loaf of sourdough baked on a Sunday morning. The house smelled of malt and toasted grain. I didn’t check my email until Monday morning.',
    tags: ['Groceries', 'Sourdough', 'Patience'],
    connectedReceiptIds: ['rc-301'],
    chapterId: 'ch3'
  },
  {
    id: 'rc-303',
    merchant: 'NORTHWEST TIMBER TRAINS',
    subtitle: 'Cascades Route • Seat 12C',
    category: 'transit',
    date: '2024-01-14',
    time: '08:45 AM',
    hour24: 8,
    total: 36.00,
    items: [
      { id: 'i-38', name: 'Amtrak Cascades Regional Transit Ticket', quantity: 1, price: 32.00 },
      { id: 'i-39', name: 'Cafe Car Hot Mint Tea', quantity: 1, price: 4.00 }
    ],
    paymentMethod: 'Visa •••• 1084',
    location: {
      city: 'Portland to Seattle',
      neighborhood: 'Union Station'
    },
    emotion: 'solitary',
    memoryNote: 'Watching the Puget Sound slide by through rain-streaked observation windows. The rhythm of steel wheels is the best metronome for thinking.',
    tags: ['Train', 'Cascades', 'Rain'],
    connectedReceiptIds: ['rc-304'],
    chapterId: 'ch3'
  },
  {
    id: 'rc-304',
    merchant: 'BOTANICAL NURSERY & GREENHOUSE',
    subtitle: 'Spring Seedlings & Clay Pots',
    category: 'rituals',
    date: '2024-02-28',
    time: '02:30 PM',
    hour24: 14,
    total: 51.20,
    items: [
      { id: 'i-40', name: 'Hand-thrown Terracotta Planter 10"', quantity: 2, price: 28.00 },
      { id: 'i-41', name: 'Monstera Deliciosa Rooted Cutting', quantity: 1, price: 15.00 },
      { id: 'i-42', name: 'Organic Potting Compost Blend', quantity: 1, price: 8.20 }
    ],
    paymentMethod: 'Mastercard •••• 4912',
    location: {
      city: 'Portland, OR',
      neighborhood: 'Division St'
    },
    emotion: 'celebratory',
    memoryNote: 'Decided that if I was buying plants that take six months to unfurl a leaf, I was staying here for a while.',
    tags: ['Plants', 'Roots', 'Terracotta'],
    connectedReceiptIds: ['rc-301', 'rc-401'],
    chapterId: 'ch3',
    polaroidUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rc-305',
    merchant: 'VALLEY VETERINARY CLINIC',
    subtitle: 'Emergency Clinic Observation',
    category: 'health',
    date: '2024-03-11',
    time: '10:15 PM',
    hour24: 22,
    total: 312.00,
    items: [
      { id: 'i-43', name: 'Emergency Triage & Consultation', quantity: 1, price: 145.00 },
      { id: 'i-44', name: 'Subcutaneous Hydration Therapy', quantity: 1, price: 85.00 },
      { id: 'i-45', name: 'Antibiotic Injectable Course (Cefazolin)', quantity: 1, price: 82.00 }
    ],
    paymentMethod: 'Visa •••• 1084',
    location: {
      city: 'Portland, OR',
      neighborhood: 'West Hills'
    },
    emotion: 'vulnerable',
    memoryNote: 'Barnaby ate a mystery mushroom behind the woodshed. Spent four hours sitting on linoleum in the waiting room whispering encouragement into his velvety ears. He recovered completely.',
    tags: ['Barnaby', 'Vet', 'Love', 'Vulnerability'],
    connectedReceiptIds: ['rc-304'],
    chapterId: 'ch3'
  },

  // Chapter 4: The Architecture of Becoming
  {
    id: 'rc-401',
    merchant: 'ARCHETYPE RESTORATION STUDIO',
    subtitle: 'Studio Lease & Shared Workshop',
    category: 'rituals',
    date: '2024-04-01',
    time: '10:00 AM',
    hour24: 10,
    total: 650.00,
    items: [
      { id: 'i-46', name: 'Bench Space 4B Monthly Membership', quantity: 1, price: 550.00 },
      { id: 'i-47', name: 'Woodshop & Kiln Safety Orientation', quantity: 1, price: 100.00 }
    ],
    paymentMethod: 'ACH Bank Transfer (Chase)',
    location: {
      city: 'Portland, OR',
      neighborhood: 'Industrial Eastside',
      address: '1012 SE Water Ave'
    },
    emotion: 'searching',
    memoryNote: 'Signed the studio lease for my independent historic preservation practice. The windows face Mt. Hood on clear days. Smells of sawdust and bees wax.',
    tags: ['Studio', 'Independence', 'Vocation'],
    connectedReceiptIds: ['rc-104', 'rc-402'],
    chapterId: 'ch4',
    polaroidUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rc-402',
    merchant: 'OSTERIA DEL BOSCO',
    subtitle: 'Table 4 • Dinner for Four',
    category: 'sustenance',
    date: '2024-05-18',
    time: '08:45 PM',
    hour24: 20,
    total: 184.50,
    items: [
      { id: 'i-48', name: 'Handmade Tagliatelle with Chanterelles', quantity: 2, price: 56.00 },
      { id: 'i-49', name: 'Wood-fired Sourdough Focaccia & Burrata', quantity: 1, price: 22.00 },
      { id: 'i-50', name: 'Bottle of 2019 Nebbiolo d’Alba', quantity: 1, price: 74.00 },
      { id: 'i-51', name: 'Olive Oil Cake with Whipped Mascarpone', quantity: 2, price: 20.00 },
      { id: 'i-52', name: 'Gratuity & Kitchen Health Surcharge', quantity: 1, price: 12.50 }
    ],
    paymentMethod: 'Mastercard •••• 4912',
    location: {
      city: 'Portland, OR',
      neighborhood: 'Kerns',
      address: '2240 NE Glisan St'
    },
    emotion: 'celebratory',
    memoryNote: 'Celebrated the first restored timber beam client project. Maya, Leo, Clara, and Sam. We lingered until the candles burned down to puddles of wax on the wooden tabletop.',
    tags: ['Feast', 'Friends', 'Milestone'],
    connectedReceiptIds: ['rc-401'],
    chapterId: 'ch4',
    polaroidUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rc-403',
    merchant: 'CLOUD ACCOUNT MANAGEMENT',
    subtitle: 'Subscription Cancellation Confirmation',
    category: 'subscriptions',
    date: '2024-06-01',
    time: '09:15 AM',
    hour24: 9,
    total: 0.00,
    items: [
      { id: 'i-53', name: 'Canceled: Unused Sleep Tracker Premium', quantity: 1, price: 0.00 },
      { id: 'i-54', name: 'Canceled: Obsolete CAD Cloud Seat', quantity: 1, price: 0.00 },
      { id: 'i-55', name: 'Monthly Savings Achieved: $54.98/mo', quantity: 1, price: 0.00 }
    ],
    paymentMethod: 'Digital Confirmation #CC-88219',
    location: {
      city: 'Personal Ledger',
      neighborhood: 'Clean Slate'
    },
    emotion: 'celebratory',
    memoryNote: 'Finally audited all recurring card payments. Canceled seven things I hadn’t touched in a year. Felt like washing every window in a house.',
    tags: ['Ghost Subscriptions', 'Freedom', 'Clarity'],
    connectedReceiptIds: ['rc-106'],
    chapterId: 'ch4'
  },
  {
    id: 'rc-404',
    merchant: 'WILDFLOWER BOTANICAL SEED CO.',
    subtitle: 'Heirloom Perennial Packet Order',
    category: 'rituals',
    date: '2024-07-08',
    time: '11:40 AM',
    hour24: 11,
    total: 24.60,
    items: [
      { id: 'i-56', name: 'Pacific Coast Poppy Seed Mix', quantity: 1, price: 6.50 },
      { id: 'i-57', name: 'Sweet Alyssum Fragrant Groundcover', quantity: 1, price: 5.50 },
      { id: 'i-58', name: 'Purple Coneflower (Echinacea Purpurea)', quantity: 2, price: 9.00 },
      { id: 'i-59', name: 'Recycled Postal Mailer', quantity: 1, price: 3.60 }
    ],
    paymentMethod: 'Apple Pay •••• 4912',
    location: {
      city: 'Corvallis, OR',
      neighborhood: 'Mail Order Dispatch'
    },
    emotion: 'tender',
    memoryNote: 'Planting things that will not flower until next summer. The ultimate receipt of faith in tomorrow.',
    tags: ['Seeds', 'Future', 'Hope'],
    connectedReceiptIds: ['rc-304'],
    chapterId: 'ch4',
    polaroidUrl: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=400&q=80'
  }
];

export const CATEGORY_INFO: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  sustenance: { label: 'Sustenance & Bread', color: '#b45309', bg: '#fef3c7', icon: 'Utensils' },
  midnight: { label: 'Midnight Fuel', color: '#6d28d9', bg: '#ede9fe', icon: 'Moon' },
  transit: { label: 'Transit & Passages', color: '#0369a1', bg: '#e0f2fe', icon: 'Compass' },
  escape: { label: 'Escapes & Leaps', color: '#be123c', bg: '#ffe4e6', icon: 'Plane' },
  health: { label: 'Body & Repair', color: '#047857', bg: '#d1fae5', icon: 'HeartPulse' },
  culture: { label: 'Culture & Printed Word', color: '#92400e', bg: '#fef3c7', icon: 'BookOpen' },
  subscriptions: { label: 'Ghost Subscriptions', color: '#475569', bg: '#f1f5f9', icon: 'Clock' },
  rituals: { label: 'Rituals & Grounding', color: '#15803d', bg: '#dcfce7', icon: 'Sparkles' },
};

export const EMOTION_INFO: Record<string, { label: string; tone: string; dotColor: string }> = {
  vulnerable: { label: 'Vulnerable', tone: 'Moments of strain, doubt, or physical exhaustion', dotColor: '#f43f5e' },
  celebratory: { label: 'Celebratory', tone: 'Milestones, breakthroughs, and earned treats', dotColor: '#10b981' },
  solitary: { label: 'Solitary Quiet', tone: 'Alone with thoughts in a crowded world', dotColor: '#6366f1' },
  searching: { label: 'Searching & Tools', tone: 'In pursuit of solutions and craft', dotColor: '#f59e0b' },
  mundane: { label: 'Mundane Sustenance', tone: 'The quiet glue of daily survival', dotColor: '#64748b' },
  escapist: { label: 'Escapist Leaps', tone: 'Breaking free from the predictable track', dotColor: '#ec4899' },
  tender: { label: 'Tender Memory', tone: 'Purchases wrapped around human affection', dotColor: '#8b5cf6' },
};
