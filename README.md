# 🏛️ VEFA: Fraternal & Civic Community Engine (Version 2.3.1 — Refactored Release)

The open-source, white-label, multi-database digital platform for **all Elks Lodges, Granges, Eagles Aeries, Rotary Clubs, Lions Clubs, and Civic Mutual Aid Organizations across America**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![CI: Passing](https://img.shields.io/badge/CI-Passing_100%25-brightgreen.svg)](#)
[![Standards: 2026/2027 Web](https://img.shields.io/badge/Standards-2026%2F2027_Web-blue.svg)](#)
[![Accessibility: Senior_Optimized](https://img.shields.io/badge/Accessibility-Senior_Optimized-purple.svg)](#)
[![AI Agent: agent.md](https://img.shields.io/badge/AI_Agent-agent.md_Ready-teal.svg)](agent.md)

---

## 🌟 Version 2.3.1 Feature Matrix

| Feature Domain | Capabilities |
| :--- | :--- |
| 🛠️ **Admin Listing Manager** | Live inline `[✏️ Edit]` and `[🗑️ Delete]` controls on all Community Exchange items (including initial seed items). |
| 🤖 **`agent.md` AI Harness** | Autonomous AI agent runtime specification for LLMs (Claude, Gemini, OpenAI) to automate volunteer reminders, tournament brackets, and trustee reports. |
| 🎲 **Universal Tournaments & Year-End Eclipse** | Open game creation for all members (Monopoly, Darts, Billiards, Cornhole). Annual rollover engine archives champions to the permanent **Hall of Fame**. |
| 🤝 **Volunteer Twilio / SMS Automation** | Shift claimer with automated 24-hr SMS reminders via Twilio API (`api/twilio.php`) and service hours logging. |
| 👑 **Seated Leadership & Trustee Reports** | Officer registry directory and 1-Click printable **Trustee Meeting Audit Reports** (financial balances, deposits, hours). |
| 👓 **Senior Accessibility Suite** | 1-Click Large Print switcher (`Normal`, `Large 18px`, `Extra Large 21px`), High-Contrast mode, 54px+ touch targets, 1-tap Senior Mode on Landing Popup, Web Speech Synthesizer, and 1-click tap-to-call lodge phone. |
| 📱 **Mobile Thumb Navigation** | Ergonomic bottom thumb bar for fast mobile navigation. |
| 💳 **Multi-Payment Gateway Hub** | Native checkout for **Stripe**, **Cash App Pay** (`$cashtag`), **Venmo** (`@handle`), **Chime**, **Zelle**, and **Check/Cash** for the flat $150 hall deposit. |
| 🚪 **Mandatory Landing Gateway** | Entry popup with 3 choices: **"See the Demo"**, **"First Time Setup"**, or **"Update my setup"**. |
| 🛡️ **2026 Anti-Blocker Scraper** | Ingests metadata in 1 click (`api/scrape.php`) with private-IP SSRF filtering. |

---

## 🚀 Quick Start Options

### 1. Zero-Database / Local Browser Mode (Fastest)
Open [`index.html`](index.html) in any modern browser.

### 2. 1-Click MySQL Installer (Hostinger, cPanel, Apache)
Run the automated installer at: `http://yourdomain.com/install.php`

### 3. Docker Compose Stack
```bash
docker compose up -d
```
Visit `http://localhost:8080` to access the platform.

---

## 🧪 Running Automated Tests

```bash
node test.js
```

---

## 📜 Copyright & Support
© 2027 VEFA: Fraternal & Civic Community Engine.  
Please contact **`admin@vefa.club`** for more information.  
Licensed under the [MIT License](LICENSE).
