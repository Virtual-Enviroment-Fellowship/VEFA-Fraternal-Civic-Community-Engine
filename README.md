# 🏛️ VEFA: Fraternal & Civic Community Engine (Version 2.2.3 — Masterwork Edition)

The open-source, white-label, multi-database digital platform for **all Elks Lodges, Granges, Eagles Aeries, Rotary Clubs, Lions Clubs, and Civic Mutual Aid Organizations across America**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI: Passing](https://img.shields.io/badge/CI-Passing_100%25-brightgreen.svg)](#)
[![Standards: 2026/2027 Web](https://img.shields.io/badge/Standards-2026%2F2027_Web-blue.svg)](#)
[![Accessibility: Senior_Optimized](https://img.shields.io/badge/Accessibility-Senior_Optimized-purple.svg)](#)
[![PWA: Offline_Ready](https://img.shields.io/badge/PWA-Offline_Ready-emerald.svg)](#)

---

## 🌟 Masterwork Feature Matrix

| Feature Domain | Capabilities |
| :--- | :--- |
| 👓 **Senior Accessibility Suite** | 1-Click Large Print text switcher (`Normal`, `Large 18px`, `Extra Large 21px`), High-Contrast reading mode, 54px+ touch targets, Web Speech "Read Aloud" synthesizer, and 1-click tap-to-call lodge phone. |
| 📱 **Mobile Thumb Navigation** | Ergonomic bottom thumb bar for fast mobile navigation across Home, Volunteers, Exchange, Tournaments, Auctions, and Hall Deposits. |
| 🛠️ **DevOps Hyper-Cockpit** | In-browser multi-tab code IDE (`config.js`, `scrape.php`, `stripe.php`, `database.sql`), Postman-grade REST API sandbox, 1-click code copying & zip export. |
| ⭐ **Officer Command Center** | Floating admin bar, live $150 deposit ledger with CSV export, status workflows (`Approved`, `Inspected`, `Refunded`), and breaking ticker broadcast dispatcher. |
| 🎲 **Game Master Tournaments** | Persistent tournament tracking for **Monopoly**, Darts, Billiards, Poker, or any custom game. Self-assignment of the `Game Master` title with schedule calendar sync. |
| 🤝 **Community Pillars Hub** | 1-Click volunteer shift claimer (service hours logger), 50/50 charity raffle pot counter, and Social Quarters taproom daily specials. |
| 💳 **Multi-Payment Gateway Hub** | Native checkout for **Stripe**, **Cash App Pay** (`$cashtag`), **Venmo** (`@handle`), **Chime**, **Zelle**, and **Check/Cash** for the flat $150 hall deposit. |
| 🚪 **Mandatory Landing Gateway** | Entry popup requiring users to select between **"See the Demo"**, **"First Time Setup"**, or **"Update my setup"** before entering. |
| 🛠️ **Post-Setup Action Hub** | 4-way post-wizard hub: **"View this demo"**, **"Install now"**, **"Download instructions"**, and **"Save setup"**. |
| 🛡️ **2026 Anti-Blocker Scraper** | Ingests logos, banners, mottos, and metadata in 1 click (`api/scrape.php`) with SSRF protection and modern bot-wall bypass. |
| 📺 **15-Second TV Kiosk Carousel** | Auto-rotating 4-slide taproom display for social quarters TVs with on-screen "Scan to Bid from the Bar" QR codes. |

---

## 🚀 Quick Start Options

### 1. Zero-Database / Local Browser Mode (Fastest)
Simply open [`index.html`](index.html) in any modern browser! The Landing Gateway will welcome you with options to explore the demo or start setup.

### 2. Self-Hosted MySQL / MariaDB Stack (Hostinger, cPanel, Apache)
1. Upload all files to your web server (e.g. `public_html/`).
2. Run the 1-Click Database Installer at: `http://yourdomain.com/install.php`
3. Enter your database credentials to automatically initialize all tables.

### 3. Docker Compose (1-Command Local Dev)
```bash
docker compose up -d
```
Visit `http://localhost:8080` to access the platform.

---

## 📂 Repository File Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI Workflow Matrix
├── api/                       # Hardened Backend PHP API Endpoints
│   ├── auction.php            # Charity Auction Bidding REST API
│   ├── calendar.php           # Live iCalendar (.ics) Feed Generator
│   ├── db.php                 # Multi-Database Connection Handler
│   ├── deposits.php           # $150 Multi-Payment Deposit Ledger API
│   ├── exchange.php           # Tag Sale & Giveaway Item API
│   ├── feed.php               # Outgoing RSS 2.0 & JSON Syndication
│   ├── feed_sync.php          # Ingests WordPress/Facebook/Substack Feeds
│   ├── proxy.php              # Image Asset Proxy with MIME Whitelist
│   ├── scrape.php             # 2026 Anti-Blocker Scraper with SSRF Filter
│   ├── stripe.php             # Stripe Checkout Session Generator
│   └── webhook.php            # Discord & Slack Alert Dispatcher
├── app.js                     # Core Reactive Engine, Speech Synthesizer & GM Logic
├── CHANGELOG.md               # Version Evolution History
├── config.js                  # Configuration File with Seed Tournaments & Keys
├── CONTRIBUTING.md            # Guidelines for Open-Source Contributors
├── database.sql               # Universal Relational Schema
├── docker-compose.yml         # Containerized Apache + PHP + MariaDB Stack
├── index.html                 # Main Single Page App & TV Kiosk View
├── install.php                # 1-Click MySQL Installation Wizard
├── LICENSE                    # MIT Open-Source License
├── manifest.json              # Progressive Web App (PWA) Manifest
├── openapi.json               # OpenAPI 3.1 REST API Specification
├── README.md                  # Master GitHub Documentation
├── SECURITY.md                # Security Reporting Policy
├── setup.html                 # 8-Step Interactive First-Launch Setup Wizard
├── styles.css                 # CSS Custom Properties, Senior Ergonomics & IDE Styles
├── sw.js                      # Service Worker for Offline First Caching
└── test.js                    # Automated Test Runner (44 Tests Passing)
```

---

## 🧪 Running Automated Tests

Execute the zero-dependency test runner with Node.js:
```bash
node test.js
```

Expected Output:
```
=======================================================
 🦌 VEFA ENGINE v2.2.3 — 2026/2027 AUTOMATED TEST RUNNER
=======================================================
Test Suite 1: VEFA Copyright & Contact Information -> PASS
Test Suite 2: Senior / Elderly Accessibility & Mobile Ergonomics -> PASS
Test Suite 3: Landing Gateway Popup & Selection Logic -> PASS
Test Suite 4: Post-Setup Action Hub (4 Actions) -> PASS
Test Suite 5: Developer (DevOps) Hyper-Cockpit Console -> PASS
Test Suite 6: Officer Executive Command Center & Deposit Ledger -> PASS
Test Suite 7: Tournament Engine & Game Master Custom Games (Monopoly) -> PASS
Test Suite 8: Community Pillars Hub (Volunteers & 50/50 Raffle) -> PASS
Test Suite 9: Multi-Payment Gateway Hub (Stripe/Cash App/Venmo/Chime/Zelle) -> PASS
Test Suite 10: SSRF & XSS Security Hardening -> PASS
=======================================================
 RESULTS: 44 Passed, 0 Failed
=======================================================
```

---

## 📜 Copyright & Support
© 2027 VEFA: Fraternal & Civic Community Engine.  
Please contact **`admin@vefa.club`** for more information.  
Licensed under the [MIT License](LICENSE). Built for community prosperity, mutual aid, and brotherly love.
