/**
 * =============================================================================
 * VEFA: FRATERNAL & CIVIC COMMUNITY ENGINE (VERSION 2.2.3 - MASTERWORK EDITION)
 * =============================================================================
 * File: config.js
 * Description: Master configuration module with Multi-Payment Gateway, Tournament
 *              Engine (Game Master), Community Pillars, and 2027 VEFA Metadata.
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

  // Section Layout & Visibility Settings (Officer Modifiable)
  sectionLayout: [
    { id: "hero", name: "Hero & Civic Mission", visible: true },
    { id: "community-pillars", name: "Community Pillars (Volunteers, Taproom & Sunshine)", visible: true },
    { id: "exchange", name: "Community Exchange & Tag Sale", visible: true },
    { id: "tournaments", name: "Lounge Tournament & Custom Game Arena", visible: true },
    { id: "auctions", name: "Charity Auction & 50/50 Raffle Arena", visible: true },
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
    
    statusNote: "⚠️ [DEMO PLACEHOLDER: Connect your Stripe, Cash App ($Cashtag), or Venmo in setup.html]"
  },

  // Bidirectional Live Feed Bridge
  feedBridge: {
    enableIncomingFeedSync: true,
    incomingRssFeedUrl: "",
    enableOutgoingRssFeed: true,
    outgoingRssPath: "api/feed.php?format=rss",
    outgoingJsonPath: "api/feed.php?format=json",
    statusNote: "⚠️ [DEMO PLACEHOLDER: Enter your RSS/Substack/Facebook feed URL in setup.html to stream announcements]"
  },

  // Calendar Integrations
  calendar: {
    enableLiveICalFeed: true,
    iCalFeedUrl: "api/calendar.php?feed=events",
    enableGoogleCalendarLink: true,
    enableOutlookCalendarLink: true,
    optionalExternalBookingUrl: "",
    statusNote: "⚠️ [DEMO PLACEHOLDER: Connect your Google Calendar / iCal feed in setup.html]"
  },

  // Webhook Automations (Discord / Slack / Zapier)
  webhooks: {
    enabled: false,
    discordWebhookUrl: "",
    slackWebhookUrl: "",
    zapierWebhookUrl: "",
    notifyOnAuctionBid: true,
    notifyOnVolunteerSignup: true,
    notifyOnHallDeposit: true,
    notifyOnTournamentMatch: true,
    statusNote: "⚠️ [DEMO PLACEHOLDER: Paste your Discord/Slack webhook URL in setup.html to receive mobile notifications]"
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
    standings: [
      { player: "Steve H. (GM)", score: 24, rank: 1, wins: 12 },
      { player: "Chris P.", score: 20, rank: 2, wins: 10 },
      { player: "Danielle V.", score: 16, rank: 3, wins: 8 }
    ]
  }
];

/**
 * Community Volunteer Shifts
 */
const GENERIC_SEED_SHIFTS = [
  { id: "shift-1", title: "Friday Fish Fry Grill Master", date: "Friday 5:00 PM - 7:30 PM", needed: 2, claimed: ["Dave R."], isDemo: true },
  { id: "shift-2", title: "Sunday Pancake Breakfast Host", date: "Sunday 8:30 AM - 11:00 AM", needed: 3, claimed: ["Sarah M."], isDemo: true },
  { id: "shift-3", title: "Veterans Aid Welcome Kit Assembly", date: "Saturday 10:00 AM - 1:00 PM", needed: 4, claimed: ["Jim B.", "Tom B."], isDemo: true }
];

/**
 * Transparent Generic Seed Data
 */
const GENERIC_SEED_ITEMS = [
  {
    id: "item-101",
    title: "Solid Oak Rocking Chair (Refinished)",
    category: "furniture",
    type: "tag_sale",
    price: 35.00,
    condition: "Like New",
    sellerName: "Lodge Member (Demo)",
    sellerContact: "555-123-4567",
    pickupLocation: "Lodge Main Quarters (100 Main St)",
    description: "Solid hardwood American rocker with honey gloss finish. 100% of proceeds benefit our Youth Sports Fund.",
    image: "https://images.unsplash.com/photo-1580481077197-094c48aa795a?auto=format&fit=crop&w=600&q=80",
    badge: "⚠️ DEMO LISTING (Post Real Items via + Post Item)",
    isDemoPlaceholder: true,
    status: "available",
    postedDate: "2026-08-28"
  },
  {
    id: "item-102",
    title: "20\" Youth Mountain Bike with Helmet",
    category: "sports",
    type: "giveaway",
    price: 0.00,
    condition: "Good",
    sellerName: "Community Friend (Demo)",
    sellerContact: "555-123-4568",
    pickupLocation: "Lodge Rear Parking Area",
    description: "Free giveaway for a local child! Fully tuned with responsive brakes, safety reflectors, and clean chain.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80",
    badge: "⚠️ DEMO GIVEAWAY ($0 Free)",
    isDemoPlaceholder: true,
    status: "available",
    postedDate: "2026-08-29"
  }
];

const GENERIC_SEED_AUCTIONS = [
  {
    id: "auc-201",
    title: "County Fair VIP Family Experience & Food Pass",
    cause: "Veterans Welcome Home Kit Fund ($600 Bed Package)",
    currentBid: 275.00,
    startingBid: 75.00,
    bidCount: 12,
    highestBidder: "Member #42 (Demo)",
    estValue: 450.00,
    minIncrement: 15.00,
    endTime: "2026-09-07T20:00:00",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
    description: "4 All-Day Admission Passes to the regional fair, VIP grandstand seating, and complimentary food vouchers.",
    isDemoPlaceholder: true,
    badge: "⚠️ DEMO AUCTION LOT",
    bids: [
      { bidder: "Dave R.", amount: 200.00, time: "2 hrs ago" },
      { bidder: "Mark T.", amount: 275.00, time: "30 mins ago" }
    ]
  }
];

const GENERIC_SEED_PINS = [
  { id: "pin-1", title: "Next Stated Meeting: 1st & 3rd Tuesdays", col: 1, row: 1, color: "gold", type: "notice", isDemo: true },
  { id: "pin-2", title: "Free Kids Bike Giveaway (Item #102)", col: 2, row: 1, color: "green", type: "exchange", isDemo: true },
  { id: "pin-3", title: "Auction: County Fair VIP Pass ($275)", col: 3, row: 1, color: "purple", type: "auction", isDemo: true },
  { id: "pin-4", title: "Monopoly Tournament: Thursday 6:30 PM", col: 1, row: 2, color: "gold", type: "notice", isDemo: true },
  { id: "pin-5", title: "Hall Deposit ($150) Web Payment Active", col: 2, row: 2, color: "gold", type: "notice", isDemo: true }
];
