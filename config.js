/**
 * =============================================================================
 * VEFA: FRATERNAL & CIVIC COMMUNITY ENGINE (VERSION 2.3.1 - REFACTORED RELEASE)
 * =============================================================================
 * File: config.js
 * Description: Master configuration module with:
 *              - Seated Officer & Leadership Registry
 *              - Twilio SMS / Webhook Volunteer Reminders
 *              - Annual Tournament Year-Eclipse State (2026 -> 2027 Rollover)
 *              - Complete Generic Datasets (Exchange, Auctions, Audio Tour, Pins)
 *              - Multi-Payment Hub (Stripe, Cash App, Venmo, Chime, Zelle, Check)
 * 
 * Copyright (c) 2027 VEFA: Fraternal & Civic Community Engine.
 * Please contact admin@vefa.club for more information.
 * License: MIT Open Source License (https://opensource.org/licenses/MIT)
 * =============================================================================
 */

const ACTIVE_PRESET = 'ELKS'; // 'ELKS' | 'GRANGE' | 'EAGLES' | 'ROTARY' | 'LIONS' | 'CIVIC'

const FRATERNAL_CONFIG = {
  preset: ACTIVE_PRESET,
  organizationName: "American Fraternal Lodge",
  chapterNumber: "No. 100",
  shortName: "Community Lodge #100",
  orderType: "Benevolent and Protective Order of Elks (BPOE)",
  motto: "Charity • Justice • Brotherly Love • Fidelity",
  nationalTheme: "Be The Difference",
  districtJurisdiction: "District 1 • State Association",
  activeSeasonYear: 2026,
  copyrightNotice: "© 2027 VEFA: Fraternal & Civic Community Engine. Please contact admin@vefa.club for more information.",

  // Contact Details
  address: "100 Main Street, Anytown, USA 12345",
  locationDistrict: "Historic Downtown Civic District",
  phoneMain: "(555) 123-4567",
  phoneOffice: "(555) 123-4568",
  email: "contact@communitylodge100.org",
  websiteUrl: "https://communitylodge100.org",
  meetingSchedule: "1st & 3rd Tuesdays at 7:00 PM (Summer: 1st Tuesday only)",

  // Custom Branding Assets
  branding: {
    logoUrl: "assets/logo.png",
    bannerUrl: "assets/banner.png",
    customCrestEmoji: "🦌",
    primaryThemeColor: "#0a192f",
    accentThemeColor: "#d4af37"
  },

  // Seated Leadership & Officers Registry
  seatedOfficers: [
    { title: "Exalted Ruler / President", name: "Philip R. Stender Sr., PDD", term: "2026-2027", phone: "(555) 123-4567" },
    { title: "Esteemed Leading Knight / VP", name: "Joann Donnel", term: "2026-2027", phone: "(555) 123-4568" },
    { title: "Esteemed Loyal Knight", name: "Darren Lawler", term: "2026-2027", phone: "(555) 123-4569" },
    { title: "Lodge Secretary", name: "Lisa Morissette, PER", term: "2026-2027", phone: "(555) 123-4570" },
    { title: "Lodge Treasurer", name: "Fred 'Jake' Jacobs", term: "2026-2027", phone: "(555) 123-4571" },
    { title: "Chairman of Trustees", name: "Seth Miller, PER", term: "2026-2027", phone: "(555) 123-4572" }
  ],

  // Section Layout & Visibility Settings (Officer Modifiable)
  sectionLayout: [
    { id: "hero", name: "Hero & Civic Mission", visible: true },
    { id: "community-pillars", name: "Community Pillars (Volunteers, Taproom & Sunshine)", visible: true },
    { id: "exchange", name: "Community Exchange & 100% Free Giveaways", visible: true },
    { id: "auctions", name: "Charity Auction & 50/50 Raffle Arena", visible: true },
    { id: "heritage-tour", name: "Civic Heritage & Audio Walking Tour", visible: true },
    { id: "tournaments", name: "Lounge Tournament & Custom Game Arena", visible: true },
    { id: "planogram", name: "Lobby Plan-o-gram Corkboard", visible: true },
    { id: "facilities", name: "Facility Showcase & $150 Hall Deposit Hub", visible: true }
  ],

  // Hall Rental Deposit Policy ($150 Flat Refundable Deposit)
  hallRental: {
    depositAmount: 150.00,
    currency: "USD",
    currencySymbol: "$",
    terms: "Deposit locks in priority review by the Hall Steward. 100% refundable upon post-event inspection.",
    ballroomCapacity: 150,
    kitchenCapacity: 120
  },

  // Multi-Payment Gateway Hub (Stripe, Cash App, Venmo, Chime, Zelle, In-Person Check)
  payments: {
    enabled: true,
    supportedMethods: ["stripe", "cashapp", "venmo", "chime", "zelle", "check_cash"],
    
    // 1. Stripe (Apple Pay, Google Pay, Credit/Debit Cards)
    stripePublishableKey: "", // Paste pk_live_... or pk_test_... in setup.html
    stripeSecretKey: "",      // Paste sk_live_... or sk_test_... in setup.html
    
    // 2. Cash App Pay
    cashAppHandle: "$Lodge100Community", // Your lodge Cashtag
    
    // 3. Venmo
    venmoHandle: "@Lodge100-Charity",    // Your lodge Venmo handle
    
    // 4. Chime & Zelle
    chimeSign: "$Lodge100Anytown",       // Your Chime tag
    zelleRecipient: "treasurer@communitylodge100.org", // Zelle email or phone
    
    // 5. In-Person Check / Cash
    checkPayableTo: "American Fraternal Lodge No. 100",
    
    statusNote: "⚠️ [Admin Note: Connect your live Stripe or Cash App handle in setup.html]"
  },

  // Volunteer Automation & Notification Integrations (Twilio / Discord / Slack)
  webhooks: {
    enabled: false,
    discordWebhookUrl: "",
    slackWebhookUrl: "",
    twilio: {
      accountSid: "",
      authToken: "",
      fromPhoneNumber: "+15551234567",
      enableShiftReminders: true
    },
    notifyOnAuctionBid: true,
    notifyOnVolunteerSignup: true,
    notifyOnHallDeposit: true,
    notifyOnTournamentMatch: true,
    notifyOnYearEclipse: true,
    statusNote: "⚠️ [Admin Note: Configure Discord or Twilio in setup.html for automated reminders]"
  },

  // Bidirectional Live Feed Bridge
  feedBridge: {
    enableIncomingFeedSync: true,
    incomingRssFeedUrl: "",
    enableOutgoingRssFeed: true,
    outgoingRssPath: "api/feed.php?format=rss",
    outgoingJsonPath: "api/feed.php?format=json"
  },

  // Physical-to-Digital Corkboard Sizing
  bulletinBoard: {
    dimensions: "36x48",
    gridCols: 4,
    gridRows: 3,
    title: "Lobby Bulletin Board & Plan-o-gram"
  },

  // Database Backend Connector
  database: {
    type: "localStorage",
    supabaseUrl: "",
    supabaseAnonKey: "",
    apiBaseUrl: "api/"
  }
};

/**
 * Persistently Tracked Custom Tournament Games & Standings (Game Master Engine)
 */
const GENERIC_SEED_GAMES = [
  {
    id: "game-monopoly",
    name: "Classic Monopoly Championship",
    category: "Board Game",
    gameMaster: "Brother Dave (Game Master)",
    schedule: "Every Thursday at 6:30 PM",
    format: "4-Player Table Bracket",
    rules: "Official Tournament Rules • 90-Min Time Cap • Top 2 Advance",
    seasonYear: 2026,
    standings: [
      { player: "Dave R. (GM)", score: 4200, rank: 1, wins: 5 },
      { player: "Sarah M.", score: 3850, rank: 2, wins: 4 },
      { player: "Tom B.", score: 2900, rank: 3, wins: 2 },
      { player: "Officer Jim", score: 2400, rank: 4, wins: 1 }
    ]
  },
  {
    id: "game-billiards",
    name: "8-Ball Billiards Ladder",
    category: "Lounge Cue Sports",
    gameMaster: "Mike S. (Game Master)",
    schedule: "Tuesdays & Saturdays at 7:00 PM",
    format: "Continuous Ladder Challenge",
    rules: "BCA 8-Ball Standard • Best of 3 Frames",
    seasonYear: 2026,
    standings: [
      { player: "Alex G.", score: 18, rank: 1, wins: 18 },
      { player: "Mike S. (GM)", score: 15, rank: 2, wins: 15 },
      { player: "Frank K.", score: 11, rank: 3, wins: 11 },
      { player: "Lisa W.", score: 9, rank: 4, wins: 9 }
    ]
  },
  {
    id: "game-darts",
    name: "Cricket & 501 Darts League",
    category: "Lounge Target Sports",
    gameMaster: "Steve H. (Game Master)",
    schedule: "Wednesdays at 7:30 PM",
    format: "Round Robin League",
    rules: "Soft/Steel Tip Standard • Open to All Members",
    seasonYear: 2026,
    standings: [
      { player: "Steve H. (GM)", score: 24, rank: 1, wins: 12 },
      { player: "Chris P.", score: 20, rank: 2, wins: 10 },
      { player: "Danielle V.", score: 16, rank: 3, wins: 8 }
    ]
  },
  {
    id: "game-cornhole",
    name: "Lodge Lawn Cornhole Cup",
    category: "Lawn Sports",
    gameMaster: "Jake T. (Game Master)",
    schedule: "Sundays at 2:00 PM (Summer Series)",
    format: "Double Elimination Pairs",
    rules: "ACO Standard 27-ft Pitch • First to 21 Points",
    seasonYear: 2026,
    standings: [
      { player: "Team Gold (Jake & Bob)", score: 32, rank: 1, wins: 16 },
      { player: "Team Silver (Dan & Sam)", score: 26, rank: 2, wins: 13 },
      { player: "The Aces (Ray & Tom)", score: 18, rank: 3, wins: 9 }
    ]
  }
];

/**
 * Tournament Historic Hall of Fame (Archived Eclipsed Seasons)
 */
const GENERIC_HALL_OF_FAME = [
  {
    year: 2025,
    game: "Classic Monopoly Championship",
    champion: "Sarah M.",
    runnerUp: "Dave R.",
    winningScore: 4850,
    archivedDate: "2026-01-01"
  },
  {
    year: 2025,
    game: "8-Ball Billiards Ladder",
    champion: "Alex G.",
    runnerUp: "Mike S.",
    winningScore: 24,
    archivedDate: "2026-01-01"
  }
];

/**
 * Community Volunteer Shifts & Service Hours
 */
const GENERIC_SEED_SHIFTS = [
  { id: "shift-1", title: "Friday Fish Fry Grill Master & Server", date: "Friday 5:00 PM - 7:30 PM", needed: 2, claimed: ["Dave R."], isDemo: false },
  { id: "shift-2", title: "Sunday Pancake Breakfast Host & Greeter", date: "Sunday 8:30 AM - 11:00 AM", needed: 3, claimed: ["Sarah M."], isDemo: false },
  { id: "shift-3", title: "Veterans Aid Welcome Kit Assembly Crew", date: "Saturday 10:00 AM - 1:00 PM", needed: 4, claimed: ["Jim B.", "Tom B."], isDemo: false },
  { id: "shift-4", title: "Charity Bingo Caller & Ticket Assistant", date: "Wednesday 6:00 PM - 9:00 PM", needed: 2, claimed: ["Lisa W."], isDemo: false },
  { id: "shift-5", title: "Lodge Grounds & Flowerbeds Beautification", date: "Saturday 8:00 AM - 11:00 AM", needed: 5, claimed: ["Officer Jim"], isDemo: false }
];

/**
 * Full Rich Community Exchange Seed Data (Giveaways & Tag Sale)
 */
const GENERIC_SEED_ITEMS = [
  {
    id: "item-101",
    title: "Vintage Solid Oak Rocking Chair (Refinished)",
    category: "furniture",
    type: "tag_sale",
    price: 35.00,
    originalValue: 120.00,
    condition: "Like New",
    sellerName: "Lodge Member (Brother Bob)",
    sellerContact: "(555) 123-4567",
    pickupLocation: "Lodge Main Quarters (100 Main St)",
    description: "Beautifully restored solid American oak rocker from the 1950s. Sturdy dowel construction, honey gloss finish. 100% of proceeds benefit our Youth Sports Fund!",
    image: "https://images.unsplash.com/photo-1580481077197-094c48aa795a?auto=format&fit=crop&w=600&q=80",
    badge: "Lodge Benefit",
    status: "available",
    postedDate: "2026-08-28"
  },
  {
    id: "item-102",
    title: "20\" Youth Mountain Bike with Safety Helmet",
    category: "sports",
    type: "giveaway",
    price: 0.00,
    originalValue: 180.00,
    condition: "Good",
    sellerName: "Community Family (Sarah J.)",
    sellerContact: "(555) 123-4568",
    pickupLocation: "Lodge Rear Parking Area",
    description: "100% Free giveaway for a local child! Fully tuned with responsive brakes, safety reflectors, and clean chain. Comes with matching youth helmet. Ready for riding!",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80",
    badge: "🎁 100% Free Giveaway",
    status: "available",
    postedDate: "2026-08-29"
  },
  {
    id: "item-103",
    title: "5-Drawer Heavy Duty Rolling Tool Chest & Wrench Set",
    category: "tools",
    type: "tag_sale",
    price: 45.00,
    originalValue: 240.00,
    condition: "Good",
    sellerName: "Tom 'Mac' McCarthy, PER",
    sellerContact: "(555) 123-4567",
    pickupLocation: "100 Main St, Downstairs Workshop",
    description: "Heavy-duty red steel rolling tool chest with smooth ball-bearing drawers. Includes a starter SAE chrome wrench set. Great for DIY workshop or garage.",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80",
    badge: "Member Tag Sale",
    status: "available",
    postedDate: "2026-08-30"
  },
  {
    id: "item-104",
    title: "Complete Kindergarten Learning & Backpack Bundle",
    category: "sports",
    type: "giveaway",
    price: 0.00,
    originalValue: 65.00,
    condition: "Brand New",
    sellerName: "Lodge 'Backpacks for Kids' Committee",
    sellerContact: "(555) 123-4568",
    pickupLocation: "Lodge Main Office, 100 Main St",
    description: "Brand new backpack packed with crayons, notebooks, safety scissors, glue sticks, and reading cards for local school children entering kindergarten. Free for any family in need!",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    badge: "🎁 Free Community Aid",
    status: "available",
    postedDate: "2026-08-31"
  },
  {
    id: "item-105",
    title: "Centennial Fraternal Cast Brass Bell & Medallion",
    category: "furniture",
    type: "tag_sale",
    price: 25.00,
    originalValue: 90.00,
    condition: "Vintage",
    sellerName: "Estate of Dave Robinson Sr.",
    sellerContact: "(555) 123-4567",
    pickupLocation: "Lodge Social Quarters Display Case",
    description: "Authentic heavy cast brass ceremonial bell with engraved heraldry crest and cardinal virtues. Wonderful collector piece for a fraternal home.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    badge: "Fraternal Collectible",
    status: "available",
    postedDate: "2026-08-25"
  },
  {
    id: "item-106",
    title: "Commercial 30-Cup Stainless Coffee Urn & Server",
    category: "tools",
    type: "tag_sale",
    price: 20.00,
    originalValue: 85.00,
    condition: "Like New",
    sellerName: "Kitchen Committee",
    sellerContact: "(555) 123-4567",
    pickupLocation: "Downstairs Commercial Kitchen, 100 Main St",
    description: "Commercial stainless steel percolating coffee maker. Tested, sanitized, and brews 30 cups in 25 minutes. Ideal for church gatherings, reunions, or parties.",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
    badge: "Kitchen Surplus",
    status: "available",
    postedDate: "2026-08-27"
  }
];

/**
 * Full Rich Charity Fundraiser Auction Arena Seed Data
 */
const GENERIC_SEED_AUCTIONS = [
  {
    id: "auc-201",
    title: "County Fair VIP Family Package & Food Pass",
    cause: "Veterans Welcome Home Kit Fund ($600 Bed Package)",
    currentBid: 285.00,
    startingBid: 75.00,
    bidCount: 14,
    highestBidder: "Mark T. (Member #42)",
    estValue: 450.00,
    minIncrement: 15.00,
    endTime: "2026-09-07T20:00:00",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    description: "4 All-Day Passes to the historic regional fair, VIP grandstand seating, 4 Famous Lodge Steak Sandwiches with peppers & onions, and complimentary food vouchers!",
    bids: [
      { bidder: "Dave R.", amount: 200.00, time: "2 hrs ago" },
      { bidder: "Lisa M.", amount: 240.00, time: "1 hr ago" },
      { bidder: "Mark T.", amount: 285.00, time: "18 mins ago" }
    ]
  },
  {
    id: "auc-202",
    title: "Handcrafted Solid Black Walnut Fraternal Mantle Clock",
    cause: "State Special Olympics Over-the-Edge Team",
    currentBid: 420.00,
    startingBid: 120.00,
    bidCount: 19,
    highestBidder: "Darren L. (Lodge Officer)",
    estValue: 650.00,
    minIncrement: 20.00,
    endTime: "2026-09-08T19:30:00",
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80",
    description: "Custom built by a master woodworker and 30-year lodge brother. Made from local fallen walnut with inlaid brass roman numerals, quartz silent movement, and engraved emblem.",
    bids: [
      { bidder: "Jake J.", amount: 320.00, time: "5 hrs ago" },
      { bidder: "Philip S.", amount: 380.00, time: "2 hrs ago" },
      { bidder: "Darren L.", amount: 420.00, time: "45 mins ago" }
    ]
  },
  {
    id: "auc-203",
    title: "Archival Historic Main Street Lithograph (Conservation Framed)",
    cause: "Historic Civic District Preservation & Beacon Grant",
    currentBid: 195.00,
    startingBid: 50.00,
    bidCount: 9,
    highestBidder: "Wanda R. (Community Friend)",
    estValue: 350.00,
    minIncrement: 15.00,
    endTime: "2026-09-09T21:00:00",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    description: "Archival reproduction map of the historic civic borough showing river mills, Railroad Square, and the 1876 Town Music Hall. Conservation museum glass with mahogany frame.",
    bids: [
      { bidder: "Joann D.", amount: 150.00, time: "6 hrs ago" },
      { bidder: "Justin F.", amount: 175.00, time: "3 hrs ago" },
      { bidder: "Wanda R.", amount: 195.00, time: "1 hr ago" }
    ]
  },
  {
    id: "auc-204",
    title: "Chef's 5-Course Banquet Dinner for 8 in Grand Ballroom",
    cause: "Kindergarten 'Backpacks for Kids' & Youth Scholarships",
    currentBid: 560.00,
    startingBid: 200.00,
    bidCount: 22,
    highestBidder: "Seth M. (Trustee)",
    estValue: 800.00,
    minIncrement: 25.00,
    endTime: "2026-09-10T20:30:00",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    description: "An unforgettable private dining experience prepared by executive guest chefs in the upstairs Grand Ballroom. Includes 5 courses, wine pairings, and private server.",
    bids: [
      { bidder: "Lisa M.", amount: 450.00, time: "1 day ago" },
      { bidder: "Darren L.", amount: 500.00, time: "4 hrs ago" },
      { bidder: "Seth M.", amount: 560.00, time: "30 mins ago" }
    ]
  }
];

/**
 * Historic Civic Heritage & Audio Walking Tour Landmarks
 */
const GENERIC_SEED_LANDMARKS = [
  {
    id: "tour-1",
    name: "Town Hall & Historic Civic Music Hall",
    year: "1876",
    style: "Gothic Revival Architecture",
    desc: "Originally constructed as a majestic Gothic Revival music hall; a masterclass in adaptive reuse serving as our community's civic and artistic core.",
    significance: "Civic Anchor & Cultural Landmark",
    audioDuration: "2m 15s",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tour-2",
    name: "Historic Main Street Railroad Square",
    year: "1856",
    style: "Italianate Masonry",
    desc: "The cornerstone of the 19th-century commercial boom following the arrival of regional rail lines that connected local textile mills to the nation.",
    significance: "Historic Commercial Hub",
    audioDuration: "1m 45s",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tour-3",
    name: "Memorial Public Library & Reading Room",
    year: "1901",
    style: "Classical Revival",
    desc: "Features monumental columns, rigorous classical symmetry, and decorative entablatures celebrating universal public enlightenment and literacy.",
    significance: "Public Education & Heritage",
    audioDuration: "2m 05s",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80"
  }
];

/**
 * Lobby Bulletin Board Plan-o-gram Pushpins
 */
const GENERIC_SEED_PINS = [
  { id: "pin-1", title: "Next Stated Meeting: 1st & 3rd Tuesdays", col: 1, row: 1, color: "gold", type: "notice", isDemo: false },
  { id: "pin-2", title: "Free Kids Bike Giveaway (Item #102)", col: 2, row: 1, color: "green", type: "exchange", isDemo: false },
  { id: "pin-3", title: "Auction: County Fair VIP Pass ($285)", col: 3, row: 1, color: "purple", type: "auction", isDemo: false },
  { id: "pin-4", title: "Monopoly Tournament: Thursday 6:30 PM", col: 4, row: 1, color: "gold", type: "tourney", isDemo: false },
  { id: "pin-5", title: "Friday Fish Fry Special: Baked Haddock", col: 1, row: 2, color: "gold", type: "taproom", isDemo: false },
  { id: "pin-6", title: "Free Kindergarten Backpack Aid (#104)", col: 2, row: 2, color: "green", type: "exchange", isDemo: false },
  { id: "pin-7", title: "Auction: Walnut Mantle Clock ($420)", col: 3, row: 2, color: "purple", type: "auction", isDemo: false },
  { id: "pin-8", title: "Hall Deposit ($150) Web Payment Active", col: 4, row: 2, color: "gold", type: "rental", isDemo: false }
];
