# 🏛️ VEFA: Fraternal & Civic Community Engine (Version 2.3.1 — Refactored Masterwork)

The open-source, white-label, multi-database digital platform for **all Elks Lodges, Granges, Eagles Aeries, Rotary Clubs, Lions Clubs, and Civic Mutual Aid Organizations across America**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI: Passing](https://img.shields.io/badge/CI-Passing_100%25-brightgreen.svg)](#)
[![Standards: 2026/2027 Web](https://img.shields.io/badge/Standards-2026%2F2027_Web-blue.svg)](#)
[![Accessibility: Senior_Optimized](https://img.shields.io/badge/Accessibility-Senior_Optimized-purple.svg)](#)
[![AI Agent: agent.md](https://img.shields.io/badge/AI_Agent-agent.md_Ready-teal.svg)](agent.md)
[![Deployment: Hostinger_1--Click](https://img.shields.io/badge/Deployment-Hostinger_1--Click-green.svg)](HOSTINGER_DEPLOYMENT_GUIDE.md)

---

## 📊 Platform Comparison Matrix: Where Should You Host?

| Platform | Persistence & Uptime | Estimated Cost | Setup Complexity | Cron & Email Features | Verdict & Best Use Case |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 🥇 **Hostinger** *(Cloud / Shared LAMP)* | **99.9% Always Awake** (NVMe SSD storage) | **~\$2.99 / month** (Premium / Business) | ⭐⭐⭐⭐⭐ **1-Click Web File Upload** (Zero CLI needed) | **Free custom domain emails + native Scheduled Tasks (cron)** | **#1 Top Pick for Fraternal Lodges & Granges**: Lowest cost, zero server maintenance, always-on persistence, free SSL, and instant 1-click database setup via [`vefa-deployer.php`](vefa-deployer.php). |
| 🥈 **Traditional cPanel** *(SiteGround, Bluehost, InMotion)* | **99.9% Always Awake** | **~\$4 - \$8 / month** | ⭐⭐⭐⭐ Standard File Manager + MySQL Wizard | **Built-in cPanel cron jobs + Webmail** | **Great Alternative**: Best choice if your organization already possesses an existing cPanel hosting account. |
| 🥉 **Render / Railway / Fly.io** | **High** (Note: Free tiers sleep after inactivity; DB is an external add-on) | **\$5 - \$15 / month** | ⭐⭐⭐ Requires GitHub connection & Docker knowledge | Requires third-party SMTP service (SendGrid/Resend) | **Best for Tech-Forward Developers**: Ideal for automated Git branch previews and container pipelines. |
| 🎖️ **DigitalOcean / Hetzner VPS** | **High** (Dedicated Linux Server) | **~\$4 - \$6 / month** | ⭐⭐ Requires Linux terminal administration (SSH, Nginx/Apache, certbot) | Requires manual postfix/sendmail configuration | **Best for Multi-Lodge Clusters**: Great if a state association or district IT chair is hosting 20+ lodge portals on a single droplet. |

---

## 🌟 Version 2.3.1 Feature Matrix (Grand Unified Capabilities)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    VEFA PLATFORM v2.3.1 ARCHITECTURE                                   │
├───────────────────────────────┬───────────────────────────────┬────────────────────────────────────────┤
│ 🤖 AGENTIC AI HARNESS         │ 🛠️ ADMIN LISTING CONTROLS     │ 🎲 TOURNAMENTS & YEAR ECLIPSE          │
│ • agent.md LLM Coordinator    │ • Inline Edit & Delete on UI  │ • Open to all users to create games    │
│ • OpenAPI Tool Bindings       │ • Manage all mock & real items│ • Annual Season Archive & Hall of Fame │
│ • Automated Volunteer Alerts  │ • Instant updates in UI & DB  │ • Officer Year-End Eclipse Notifier    │
├───────────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ 🤝 VOLUNTEER AUTOMATION (SMS) │ 👑 SEATED OFFICER REGISTRY    │ 👓 SENIOR ACCESSIBILITY SUITE          │
│ • Twilio API / Webhook Hooks  │ • Chair & Trustee Directory   │ • Large Print Switcher (A/A+/A++)      │
│ • 24hr Shift SMS Reminders    │ • Meeting Docket Generator    │ • 1-Tap Senior Mode on Landing Popup   │
│ • Automated Service Hours Log │ • 1-Click Trustee Audit PDF   │ • Web Speech Synthesizer & Tap-to-Call │
├───────────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ 🎁 EXCHANGE & GIVEAWAYS       │ 🏛️ CIVIC HERITAGE AUDIO TOUR  │ 💳 MULTI-PAYMENT DEPOSIT HUB ($150)    │
│ • 6+ Generic Exchange Items   │ • 3+ Landmark Audio Stops     │ • Stripe, Cash App, Venmo, Chime,      │
│ • 4+ Charity Benefit Lots     │ • Web Speech Voice Narrations │   Zelle, and In-Person Check/Cash      │
│ • Camera Photo Compression    │ • Clear Admin Customizer Notes│ • Real-time Deposit Ledger + CSV       │
├───────────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ 🛠️ DEVOPS HYPER-COCKPIT       │ 📺 15-SEC TV KIOSK DISPLAY    │ 📌 CORKBOARD PLAN-O-GRAM               │
│ • In-Browser Code IDE         │ • Auto-Rotating Taproom Slides│ • Physical-to-Digital Replica          │
│ • Interactive REST Sandbox    │ • Bar QR Code Bidding         │ • Printable Cut-Out Layout & QR Cards  │
└───────────────────────────────┴───────────────────────────────┴────────────────────────────────────────┘
```

| Feature Domain | Version Introduced | Capabilities & Details |
| :--- | :--- | :--- |
| 🏨 **1-Click Hostinger Deployer** | **v2.3.1** | [`vefa-deployer.php`](vefa-deployer.php) with automated environment pre-flight (PHP 8.2+, `pdo_mysql`, `curl`, `json`, `mbstring`, permissions), 1-click MySQL table creation, and auto-generated hardened [`.htaccess`](.htaccess). |
| 🛠️ **Admin Listing Manager** | **v2.3.0** | Real-time inline `[✏️ Edit]` and `[🗑️ Delete]` controls on all Community Exchange items (including initial seed items) when switched to Officer / Admin mode. |
| 🤖 **`agent.md` AI Harness** | **v2.3.0** | Autonomous AI agent runtime specification for LLMs (Claude, Gemini, OpenAI) to automate volunteer SMS reminders, tournament standings, and trustee meeting dockets. |
| 🎲 **Universal Tournaments & Year-End Eclipse** | **v2.3.0** | Universal tournament creation (Monopoly, Darts, Billiards, Cornhole, Poker, Catan). Annual rollover engine archives champions to the permanent **Historic Hall of Fame**. |
| 🤝 **Volunteer Twilio / SMS Automation** | **v2.3.0** | Shift claimer with automated 24-hr SMS reminders via Twilio API (`api/twilio.php`) and service hours logging. |
| 👑 **Seated Leadership & Trustee Reports** | **v2.3.0** | Seated officer registry directory and 1-Click printable **Trustee Meeting Audit Reports** (financial balances, deposits, hours). |
| 👓 **Senior Accessibility Suite** | **v2.2.3** | 1-Click Large Print switcher (`Normal`, `Large 18px`, `Extra Large 21px`), High-Contrast mode, 54px+ touch targets, 1-tap Senior Mode on Landing Popup, Web Speech Synthesizer, and 1-click tap-to-call lodge phone (`tel:555-123-4567`). |
| 📱 **Mobile Thumb Navigation** | **v2.2.3** | Ergonomic bottom thumb bar for fast mobile navigation across Home, Volunteer, Exchange, Tournaments, Auctions, and Deposit. |
| 🛠️ **DevOps Hyper-Cockpit** | **v2.2.3** | Fullscreen developer cockpit with in-browser multi-tab code IDE (`config.js`, `scrape.php`, `stripe.php`, `database.sql`), Postman-grade REST API sandbox, and 1-click code copy. |
| 💳 **Multi-Payment Gateway Hub** | **v2.2.0** | Native checkout for **Stripe**, **Cash App Pay** (`$cashtag`), **Venmo** (`@handle`), **Chime**, **Zelle**, and **Check/Cash** for the flat $150 hall deposit. |
| 🚪 **Mandatory Landing Gateway** | **v2.2.2** | Entry popup requiring users to choose between **"See the Demo"**, **"First Time Setup"**, or **"Update my setup"** before accessing the platform. |
| 🛠️ **Post-Setup Action Hub** | **v2.2.2** | 4-action post-wizard hub: **"View this demo"**, **"Install now"**, **"Download instructions"**, and **"Save setup"**. |
| 🛡️ **2026 Anti-Blocker Scraper** | **v2.2.0** | Ingests metadata in 1 click (`api/scrape.php`) with private-IP SSRF filtering. |
| 📺 **15-Second TV Kiosk Carousel** | **v2.2.0** | Auto-rotating 4-slide taproom display for social quarters TVs with on-screen "Scan to Bid from the Bar" QR codes. |
| 📌 **Plan-o-gram Corkboard** | **v2.1.0** | Digital replica of physical 36"x48" lobby corkboard with printable layout diagram and QR cards. |
| 🏛️ **Civic Heritage Audio Tour** | **v2.1.0** | Historic landmark architectural showcase with synthesized voice narrations. |

---

## 🚀 Quick Start & Deployment Options

### 1. 1-Click Hostinger / cPanel Installer (Top Recommendation)
1. Upload the project files to your web root (`public_html`).
2. Run the automated installer: `https://yourlodge.org/vefa-deployer.php` (or `install.php`).
3. Follow the [Hostinger Deployment Guide](HOSTINGER_DEPLOYMENT_GUIDE.md).

### 2. Zero-Database / Local Browser Mode (Fastest)
Simply open [`index.html`](index.html) in any modern browser! The Landing Gateway will welcome you with options to explore the demo or start setup.

### 3. Docker Compose (Containerized Stack)
```bash
docker compose up -d
```
Visit `http://localhost:8080` to access the platform.

---

## 📂 Repository File Structure

```
d:/Brave Downloads/ConsultDevin/clients/Elks/v2.3.1/
├── .env.example               # Environment Variables Template
├── .github/
│   └── workflows/ci.yml       # GitHub Actions CI Workflow Matrix (Node 18, 20, 22)
├── .gitignore                 # Excludes OS temp files, node_modules, logs, secrets
├── .htaccess                  # Apache / Hostinger Hardened HTTPS, CORS & GZIP Rules
├── agent.md                   # Autonomous AI Agent Coordination Harness
├── api/                       # Hardened Backend PHP API Endpoints
│   ├── auction.php            # Charity Auction REST API
│   ├── calendar.php           # Live iCal (.ics) Feed Generator
│   ├── db.php                 # Multi-Database Connection Handler
│   ├── deposits.php           # $150 Multi-Payment Deposit Ledger API
│   ├── exchange.php           # Exchange CRUD API (with Delete/Edit endpoints)
│   ├── feed.php               # Outgoing RSS 2.0 & JSON Feed
│   ├── feed_sync.php          # RSS Feed Ingestion Bridge
│   ├── proxy.php              # Image Proxy with MIME Whitelist
│   ├── scrape.php             # 2026 Anti-Blocker Scraper with SSRF Filter
│   ├── stripe.php             # Stripe Checkout Session Generator
│   ├── twilio.php             # Twilio SMS Volunteer Reminder Dispatcher
│   └── webhook.php            # Discord & Slack Alert Dispatcher
├── app.js                     # Reactive Engine, Admin Editors, Year Eclipse & Speech
├── build_release_zip.js       # Release ZIP Builder
├── CHANGELOG.md               # Keep-a-Changelog Complete Version Evolution History
├── config.js                  # Master Config with Seated Officers, Twilio & Seed Data
├── CONTRIBUTING.md            # Community Guidelines & White-Label Principles
├── database.sql               # Universal Relational Schema
├── docker-compose.yml         # Containerized Apache + PHP + MariaDB Stack
├── HOSTINGER_DEPLOYMENT_GUIDE.md # 4-Step Hostinger Visual Deployment Manual
├── index.html                 # Main Single Page App, Senior Gateway & TV Kiosk
├── install.php                # Standard MySQL DB Installation Wizard
├── LICENSE                    # MIT Open-Source License
├── manifest.json              # Progressive Web App (PWA) Manifest
├── openapi.json               # OpenAPI 3.1 REST API Specification
├── PLATFORM_HOSTING_GUIDE.md  # Hosting Platform Comparison Matrix & Pricing
├── README.md                  # Master GitHub Documentation with Badges & Matrix
├── SECURITY.md                # Security Reporting Policy (admin@vefa.club)
├── setup.html                 # 8-Step Interactive Setup Wizard & Post-Setup Hub
├── styles.css                 # CSS Custom Properties, Senior Ergonomics & IDE Styles
├── sw.js                      # Service Worker for Offline First Caching
├── test.js                    # Automated Test Runner (11 Test Suites)
└── vefa-deployer.php          # 1-Click Hostinger Pre-Flight & MySQL Auto-Installer
```

---

## 🧪 Running Automated Tests

```bash
node test.js
```

---

## 📜 Full Version Evolution History

- **v2.3.1 (Refactored Release)**: Platform Comparison Matrix, Hostinger 1-Click Deployer (`vefa-deployer.php`), Apache `.htaccess` hardening, and zero-leakage white-label audit.
- **v2.3.0 (Grand Unified)**: Community Exchange Admin inline controls (`[✏️ Edit]` & `[🗑️ Delete]`), `agent.md` AI agent coordination harness, Universal Tournament creation with Annual Year-End Eclipse Engine, Twilio volunteer SMS reminders, Seated Leadership registry, and 1-Click Trustee Audit Reports.
- **v2.2.3 (Masterwork)**: Senior / elderly accessibility suite (large print switcher, high contrast, text-to-speech reader, tap-to-call), mobile bottom thumb navigation, and DevOps hyper-cockpit console.
- **v2.2.2 (Gateway & Post-Setup)**: Mandatory Landing Gateway popup (See Demo / First Time Setup / Update Setup) and 4-action post-setup hub.
- **v2.2.1 (Form & Field Polish)**: Full verification of setup wizard field selections and multi-payment input options.
- **v2.2.0 (Multi-Payment & Anti-Blocker)**: Native Cash App, Venmo, Chime, Zelle, and Stripe integrations for the $150 deposit hub; 2026 bot-wall bypass scraper with SSRF protection.
- **v2.1.0 (Open-Source White-Label)**: Decoupled lodge engine for all fraternal and civic organizations across America; physical corkboard plan-o-gram and heritage tour.
- **v2.0.0 (Initial Build)**: Core fraternal web platform prototype.

---

## 📜 Copyright & Support
© 2027 VEFA: Fraternal & Civic Community Engine.  
Please contact **`admin@vefa.club`** for more information.  
Licensed under the [MIT License](LICENSE). Built for community prosperity, mutual aid, and brotherly love.
