# Changelog

All notable changes to the **VEFA: Fraternal & Civic Community Engine** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.4.0] - 2026-08-31
### Added
- **1-Click Legal Hall Rental Agreement & Deposit Receipt Generator**: Generates formatted, printable 1-page Hall Rental Agreements containing lodge occupancy limits, damage policies, signature lines, and deposit confirmation ID.
- **Zero-Config SQLite Database Fallback Engine (`api/db.php`)**: Added automated fallback to SQLite (`vefa.sqlite`) when MySQL/MariaDB credentials are not provided.
- **1-Click Google Calendar & Apple iCal Sync**: 1-Tap calendar sync buttons for lodge meetings, dining specials, and tournament schedules.
- **Automated System Health & Diagnostics Endpoint (`api/health.php`)**: Real-time REST diagnostic endpoint reporting database driver, storage write permissions, PHP runtime, and webhook status.
- **4 Compiled Multi-Target Release Bundles**:
  1. `VEFA_v2.4.0_Linux_Server.zip` (with `install.sh`, `nginx-vefa.conf`, `apache-vefa.conf`, `vefa-cron.sh`)
  2. `VEFA_v2.4.0_Windows_WSL.zip` (with `start_wsl_server.bat`, `wsl_setup.sh`)
  3. `VEFA_v2.4.0_Hostinger_CloudPanel.zip` (with `vefa-deployer.php`, `.htaccess`, `nginx-cloudpanel.conf`)
  4. `VEFA_v2.4.0_Elks_Lodge_Turnkey.zip` (dedicated Elks Lodge turnkey package with intake sheets, printable cheat sheets, and BPOE configuration)
- **Platform Comparison Matrix**: Comprehensive evaluation comparing Hostinger, cPanel, CloudPanel, and Linux VPS across persistence, cost, and maintenance.

---

## [2.3.1] - 2026-08-31
### Added
- **Hostinger 1-Click Auto-Deployer (`vefa-deployer.php`)**: Automated pre-flight environment checks (PHP 8.1+, `pdo_mysql`, `curl`, `json`, `mbstring`, folder write permissions), 1-click database initialization from `database.sql`, and automated `.htaccess` generation.
- **Hardened `.htaccess` Configuration**: Added HTTPS enforcement, CORS headers, GZIP compression, and MIME type mappings for Apache and Hostinger environments.
- **`.env.example` Template**: Pre-configured environment variables template for containerized and production deployments.

### Fixed & Refactored
- **DOM Modal ID Reconciliation**: Aligned all modal IDs in `index.html` and `app.js` (`edit-item-modal`, `add-game-modal`, `officer-studio-modal`, `score-match-modal`, `hall-deposit-modal`, `post-setup-modal`).
- **Zero-Database Simulation Fallbacks**: Added graceful fallback to simulated SMS dispatch when running locally in browser mode without an active PHP server.
- **Standings Array Guardrails**: Safeguarded `archiveSeasonToHallOfFame()` to handle tournament games with fewer than 2 players without throwing runtime errors.
- **100% White-Label Verification**: Audited all files to guarantee zero hardcoded lodge numbers or specific towns.

---

## [2.3.0] - 2026-08-31
### Added
- **Admin Community Exchange Manager**: Real-time inline `[✏️ Edit]` and `[🗑️ Delete]` controls on all listing cards (including initial seed items) when switched to Officer / Admin mode.
- **`agent.md` Autonomous AI Agent Coordination Harness**: Runtime specification enabling autonomous LLMs (Claude, Gemini, OpenAI) to execute scheduled operations, moderate marketplace listings, calculate tournament standings, dispatch volunteer SMS reminders, and generate meeting dockets.
- **Universal Tournament Creation & Year-End Eclipse Engine**: All users (guests, members, officers) can create custom tournament games (Monopoly, Darts, Billiards, Cornhole, Poker, Catan) and self-assign as Game Master. Annual calendar rollover automatically archives champions to the permanent **Historic Hall of Fame**.
- **Volunteer Twilio / SMS Automation**: Automated 24-hr SMS reminder hooks via Twilio API (`api/twilio.php`) and service hours logging.
- **Seated Leadership Registry & 1-Click Trustee Audit Reports**: Officer directory and 1-click printable meeting reports compiling deposit balances, 50/50 raffle pots, and logged volunteer hours.
- **Senior Mode 1-Tap Activator on Gateway**: Quick toggle on the initial Landing Gateway popup.

---

## [2.2.3] - 2026-08-31
### Added
- **Senior / Elderly Accessibility Suite**: 1-Click Large Print switcher (`Normal`, `Large 18px`, `Extra Large 21px`), High-Contrast reading mode, 54px+ touch targets, Web Speech Synthesizer for announcements, and 1-click tap-to-call lodge phone (`tel:555-123-4567`).
- **Mobile-First Bottom Thumb Navigation**: Bottom navigation bar positioned for easy one-thumb reach on mobile screens.
- **DevOps Hyper-Cockpit Console**: Fullscreen developer cockpit featuring an in-browser multi-tab code IDE (`config.js`, `scrape.php`, `stripe.php`, `database.sql`), Postman-grade REST API sandbox, and 1-click code copy.

---

## [2.2.2] - 2026-08-31
### Added
- **Mandatory Landing Gateway Popup**: Initial entry modal presenting 3 clear choices: **"See the Demo"**, **"First Time Setup"**, or **"Update my setup"**.
- **Post-Setup Action Hub**: 4-action post-wizard hub presenting **"View this demo"**, **"Install now"**, **"Download instructions"**, and **"Save setup"**.
- **Persistent Top Toolbar**: Always-visible top action bar with quick access to Install, Save Setup, and Restart.
- **Official 2027 Copyright**: Updated to `"© 2027 VEFA: Fraternal & Civic Community Engine. Please contact admin@vefa.club for more information."`

---

## [2.2.1] - 2026-08-31
### Fixed
- **Setup Wizard Field Validation**: Resolved option selection behaviors in `setup.html`.
- **Payment Method Sync**: Verified seamless synchronization between setup wizard payment options and the live $150 deposit modal.

---

## [2.2.0] - 2026-08-30
### Added
- **Multi-Payment Gateway Hub**: Native support for **Stripe**, **Cash App Pay** (`$cashtag`), **Venmo** (`@handle`), **Chime**, **Zelle**, and **Check/Cash** for the flat $150 hall deposit.
- **2026 Anti-Blocker Scraper**: 1-Click metadata extraction engine (`api/scrape.php`) with private-IP SSRF protection and modern bot-wall bypass.
- **15-Second Taproom TV Kiosk Carousel**: 4-slide auto-rotating kiosk view for social quarters TVs with scannable QR bidding codes.

---

## [2.1.0] - 2026-08-29
### Added
- **Open-Source White-Label Architecture**: Full decoupling of lodge-specific branding to support all American fraternal orders (Elks, Granges, Eagles, Rotary, Lions, Civic Groups).
- **Physical-to-Digital Plan-o-gram Corkboard**: Digital replica of 36"x48" lobby corkboard with printable layout diagram and QR cards.
- **Civic Architectural & Heritage Audio Walking Tour**: Historic landmark showcase with synthesized audio narration.

---

## [2.0.0] - 2026-08-28
### Added
- Initial fraternal and civic community platform engine prototype.
