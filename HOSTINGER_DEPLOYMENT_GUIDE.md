# 🏨 Hostinger 1-Click Deployment Guide for VEFA Platform (v2.3.1)

> **The Definitive Step-by-Step Guide to Hosting the VEFA Fraternal & Civic Community Engine on Hostinger**  
> © 2027 VEFA: Fraternal & Civic Community Engine. Contact: `admin@vefa.club`

---

## 🌟 Why Hostinger is the #1 Recommended Platform for Fraternal & Civic Lodges

| Requirement | Hostinger Capability | Why It Matters for a Civic Lodge |
| :--- | :--- | :--- |
| **Persistence & 99.9% Uptime** | Cloud & Shared Web Hosting with NVMe storage | The website, deposit records, tournament standings, and community listings stay online 24/7/365 without server maintenance headaches. |
| **Low Non-Profit Cost** | ~$2.99/month (Premium / Business Plan) | Extremely affordable for lodge budgets; includes free domain for 1 year. |
| **Free SSL Certificate** | Unlimited Free Let's Encrypt SSL with auto-renewal | Essential for Stripe credit card checkouts and member privacy (`https://`). |
| **PHP 8.1 - 8.3 Support** | Native toggle in hPanel (cPanel alternative) | Optimized performance for all VEFA backend APIs (`api/twilio.php`, `api/deposits.php`, `api/scrape.php`). |
| **Free Custom Domain Emails** | e.g. `exaltedruler@yourlodge.org`, `secretary@yourlodge.org` | Professional officer communications and official correspondence. |
| **Automated Cron Jobs** | Native Scheduled Tasks tool in hPanel | Runs autonomous AI triggers from `agent.md` (e.g. 8:00 AM volunteer SMS rollcall, auction gavel closures). |
| **1-Click File Manager & Git** | Drag-and-drop ZIP upload with 1-click extraction | 2-minute deployment with zero terminal commands needed. |

---

## 🚀 4-Step 1-Click Hostinger Deployment Procedure

### Step 1: Upload the Release ZIP
1. Log in to your **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Websites** ➔ click **Manage** on your domain.
3. In the sidebar, click **Files** ➔ **File Manager** (or connect via FTP).
4. Navigate into the **`public_html`** folder.
5. Click **Upload** ➔ Select `VEFA_v2.3.1_Hostinger_Release.zip`.
6. Right-click the uploaded ZIP and select **Extract** directly into `public_html`.

---

### Step 2: Create a MySQL Database in Hostinger hPanel
1. In hPanel, go to **Databases** ➔ **MySQL Databases**.
2. Create a new database:
   - **Database Name**: `vefa_db` (Hostinger will prefix it, e.g., `u123456789_vefa_db`)
   - **Username**: `vefa_user` (e.g., `u123456789_vefa_user`)
   - **Password**: `[Generate a secure password]`
3. Click **Create**. Note down these 3 values!

---

### Step 3: Run the 1-Click Web Installer
1. Open your browser and navigate to:
   ```
   https://yourlodge.org/vefa-deployer.php
   ```
   *(or `https://yourlodge.org/install.php`)*
2. The installer will automatically verify:
   - PHP Version (8.1 - 8.3)
   - Extensions (`pdo_mysql`, `curl`, `json`, `mbstring`)
   - Write permissions
3. Enter the MySQL Database Name, Username, and Password from Step 2.
4. Click **Initialize MySQL Tables & Deploy Platform →**.
5. You will see: `✓ Successfully connected to MySQL database and initialized all tables!`
6. Click **Launch Community Platform →**!

---

### Step 4: (Optional) Configure Automated Volunteer Reminders via Cron
To enable daily automatic Twilio SMS reminders for claimed volunteer shifts:
1. In Hostinger hPanel, go to **Advanced** ➔ **Cron Jobs**.
2. Set Type to **Custom**.
3. Set Time to **Once a day (8:00 AM)**: `0 8 * * *`.
4. Enter the command:
   ```bash
   php /home/u123456789/public_html/api/twilio.php
   ```
5. Click **Save**.

---

## 🏆 Alternative Hosting Platform Comparisons

| Platform | Type | Monthly Cost | Ease of Setup | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Hostinger** *(Top Pick)* | Shared / Cloud LAMP | ~$2.99 / mo | ⭐⭐⭐⭐⭐ (Easiest) | **All Lodges & Granges** wanting a turnkey, persistent website with custom emails & databases. |
| **cPanel (Bluehost/SiteGround)** | Shared cPanel | ~$4 - $8 / mo | ⭐⭐⭐⭐⭐ (Very Easy) | Organizations already possessing a traditional cPanel hosting account. |
| **Render / Railway** | Cloud PaaS | Free / ~$5 / mo | ⭐⭐⭐⭐ (Medium) | Tech-forward developers wanting Git-based auto-deploys via Docker. |
| **DigitalOcean / Hetzner VPS** | Dedicated Linux VPS | ~$4 - $6 / mo | ⭐⭐⭐ (Advanced) | DevOps teams running multiple lodges in a single container cluster. |

---

## 📞 Support & Lodge Assistance
Have questions or need assistance deploying to your lodge domain?  
Contact the open-source community stewards at:  
📧 **`admin@vefa.club`**
