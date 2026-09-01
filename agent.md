# 🤖 VEFA Agentic AI Coordination Harness (`agent.md`)

> **Autonomous Agent Runtime Specification for VEFA Fraternal & Civic Community Engine (v2.3.1)**  
> © 2027 VEFA: Fraternal & Civic Community Engine. Contact: `admin@vefa.club`  
> Open-Source Standard: OpenAPI 3.1 & Model Context Protocol (MCP) Compatible

---

## 🎯 Purpose & Scope

This specification allows autonomous AI agents (Claude, Gemini, OpenAI Assistants, AutoGPT, LangChain, CrewAI) to coordinate, moderate, and administer the VEFA Community Platform.

When an administrator configures an AI agent harness, the agent can execute scheduled operations, moderate community marketplace listings, calculate tournament standings, dispatch volunteer SMS reminders via Twilio, and generate officer meeting dockets.

---

## 🛠️ Available Agent Tool Definitions

Autonomous agents connecting to this harness have access to the following tool interfaces mapped directly to [`openapi.json`](openapi.json):

### 1. `get_hall_deposits`
- **Description**: Retrieves pending and approved $150 hall reservation deposits across all payment channels (Stripe, Cash App, Venmo, Chime, Zelle, Check).
- **Endpoint**: `GET /api/deposits.php`
- **Parameters**: `status` (optional: `'Pending Review'`, `'Approved & Date Locked'`).

### 2. `update_deposit_status`
- **Description**: Updates the workflow state of a hall rental deposit.
- **Endpoint**: `POST /api/deposits.php`
- **Parameters**: `id` (string), `new_status` (enum: `'Approved & Date Locked'`, `'Post-Event Inspected'`, `'Deposit Refunded'`).

### 3. `moderate_exchange_listing`
- **Description**: Edits or removes inappropriate or obsolete listings in the Community Exchange.
- **Endpoint**: `POST /api/exchange.php`
- **Parameters**: `item_id` (string), `action` (`'edit'` | `'delete'`), `payload` (object).

### 4. `dispatch_volunteer_sms_reminders`
- **Description**: Sends automated SMS reminders to members who claimed volunteer shifts scheduled within the next 24 hours.
- **Endpoint**: `POST /api/twilio.php`
- **Parameters**: `shift_id` (string), `message_template` (string).

### 5. `eclipsed_year_tournament_archive`
- **Description**: Detects calendar year rollover (e.g. 2026 to 2027), archives season champions to the Historic Hall of Fame, and resets standings for the new season.
- **Parameters**: `year` (number), `season_name` (string).

### 6. `generate_trustee_meeting_docket`
- **Description**: Compiles financial deposits, claimed volunteer service hours, and auction proceeds into a structured executive report for lodge trustee meetings.
- **Output**: Formatted Markdown / HTML Trustee Audit Report.

---

## ⏰ Autonomous Agent Cron & Event Triggers

| Trigger Event | Timing | Agent Responsibility |
| :--- | :--- | :--- |
| **Daily Morning Rollcall** | `0 08:00 * * *` | Check upcoming volunteer shifts for the weekend; dispatch SMS reminders to claimed volunteers via `api/twilio.php`. |
| **Auction Closing Gavel** | Real-time Webhook | When auction timer expires, declare high bidder, trigger winner notification invoice, and log proceeds to charity ledger. |
| **Annual Year Eclipse** | `0 00:00 1 1 *` | Archive previous year's tournament champions to the Hall of Fame; send inaugural season broadcast to officers. |
| **Spam / Prohibited Goods Filter** | On Listing Post | Scan new exchange items for prohibited terms or malicious URLs; flag for officer review if flagged. |

---

## 🔒 Security & Guardrails
1. **White-Label Enforcement**: Agents must never inject hardcoded lodge numbers (e.g. `#1706`) or specific town names into templates.
2. **SSRF Safe Outbound Calls**: All outbound scraper and proxy calls must respect `FILTER_FLAG_NO_PRIV_RANGE`.
3. **Admin Audit Logging**: All automated agent actions must write an entry to `fraternal_audit_log` in `localStorage` or SQL `audit_logs` table.

---
© 2027 VEFA: Fraternal & Civic Community Engine. Contact: `admin@vefa.club`
