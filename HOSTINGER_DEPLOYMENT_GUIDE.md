# 🏨 Hostinger 4-Step Deployment Guide (v2.4.0)

> **Visual 1-Click Deployment Manual for Lodge Administrators**  
> © 2027 VEFA: Fraternal & Civic Community Engine. Contact: `admin@vefa.club`

---

## Step 1: Upload Files in Hostinger hPanel
1. Open **Hostinger hPanel** (`hpanel.hostinger.com`).
2. Go to **Files** ➔ **File Manager** ➔ `public_html`.
3. Upload `VEFA_v2.4.0_Hostinger_CloudPanel.zip` and extract directly into `public_html`.

---

## Step 2: Create MySQL Database in hPanel
1. Go to **Databases** ➔ **MySQL Databases**.
2. Set Database Name: `u123456_vefa`
3. Set Username: `u123456_admin`
4. Set Password: `[Secure Password]`

---

## Step 3: Run the 1-Click Deployer
1. Open in your web browser:
   ```
   https://yourlodge.org/vefa-deployer.php
   ```
2. Review pre-flight checkmarks (PHP 8.1+, PDO, cURL, JSON, Mbstring).
3. Enter database credentials and click **"Create Tables & Deploy"**.

---

## Step 4: Schedule Daily Volunteer Reminders (Cron)
1. In hPanel, go to **Advanced** ➔ **Cron Jobs**.
2. Type: **Custom**
3. Schedule: **Daily at 8:00 AM** (`0 8 * * *`)
4. Command: `php /home/u123456/public_html/api/twilio.php`

---
© 2027 VEFA. Contact: `admin@vefa.club`
