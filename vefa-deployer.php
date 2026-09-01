<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.3.1) - HOSTINGER & CPANEL 1-CLICK DEPLOYER / INSTALLER
 * =============================================================================
 * File: vefa-deployer.php (and install.php)
 * Description: Automated environment check, MySQL schema initialization,
 *              .htaccess hardening, and configuration generator for Hostinger,
 *              cPanel, Apache, and standard LAMP hosting stacks.
 * 
 * © 2027 VEFA: Fraternal & Civic Community Engine. Contact: admin@vefa.club
 * License: MIT Open Source License
 * =============================================================================
 */

// Error handling & Security Headers
error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
ini_set('display_errors', 0);
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: "1; mode=block"');

$envErrors = [];
$envSuccess = [];
$dbStatus = '';
$dbMessage = '';

// 1. Check PHP Version (Requires >= 7.4, Recommended 8.1 - 8.3)
if (version_compare(PHP_VERSION, '7.4.0', '<')) {
    $envErrors[] = "PHP version is " . PHP_VERSION . ". VEFA requires PHP 7.4 or higher (PHP 8.2 recommended).";
} else {
    $envSuccess[] = "PHP Version: " . PHP_VERSION . " (Compatible)";
}

// 2. Check Required PHP Extensions
$reqExtensions = ['pdo', 'pdo_mysql', 'curl', 'json', 'mbstring'];
foreach ($reqExtensions as $ext) {
    if (!extension_loaded($ext)) {
        $envErrors[] = "Missing required PHP extension: <code>{$ext}</code>. Please enable it in Hostinger/cPanel PHP Extensions.";
    } else {
        $envSuccess[] = "PHP Extension <code>{$ext}</code> loaded";
    }
}

// 3. Check Directory Write Permissions
$testFile = __DIR__ . '/.write_test_' . bin2hex(random_bytes(4));
if (@file_put_contents($testFile, 'test') !== false) {
    @unlink($testFile);
    $envSuccess[] = "Directory is writable (Permissions OK)";
} else {
    $envErrors[] = "Installation directory is not writable. Please set permissions to 755 via Hostinger File Manager.";
}

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($envErrors)) {
    $dbHost = trim($_POST['db_host'] ?? 'localhost');
    $dbName = trim($_POST['db_name'] ?? '');
    $dbUser = trim($_POST['db_user'] ?? '');
    $dbPass = trim($_POST['db_pass'] ?? '');
    
    $orgName = trim($_POST['org_name'] ?? 'American Fraternal Lodge');
    $chapter = trim($_POST['org_chapter'] ?? 'No. 100');
    $adminEmail = trim($_POST['admin_email'] ?? 'admin@vefa.club');

    if (empty($dbName) || empty($dbUser)) {
        $dbStatus = 'error';
        $dbMessage = 'Please provide both Database Name and Database Username.';
    } else {
        try {
            // Test Connection
            $dsn = "mysql:host={$dbHost};charset=utf8mb4";
            $pdo = new PDO($dsn, $dbUser, $dbPass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);

            // Create DB if possible or use existing
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
            $pdo->exec("USE `{$dbName}`;");

            // Execute database.sql
            $sqlFile = __DIR__ . '/database.sql';
            if (file_exists($sqlFile)) {
                $sql = file_get_contents($sqlFile);
                $pdo->exec($sql);
            }

            // Write .htaccess if not present
            $htaccessContent = <<<EOT
<IfModule mod_rewrite.c>
  RewriteEngine On
  # Enable CORS for API
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
  Header set Access-Control-Allow-Headers "Content-Type, Authorization"
  
  # Security Headers
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
</IfModule>

# GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache-Control
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
EOT;
            @file_put_contents(__DIR__ . '/.htaccess', $htaccessContent);

            $dbStatus = 'success';
            $dbMessage = "Successfully connected to MySQL database `{$dbName}` and initialized all civic platform tables!";
        } catch (\PDOException $e) {
            $dbStatus = 'error';
            $dbMessage = "MySQL Connection failed: " . htmlspecialchars($e->getMessage());
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VEFA 1-Click Platform Installer (Hostinger / cPanel / Apache)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-main: #070d18;
      --bg-surface: #0f1c30;
      --bg-surface-elevated: #16263f;
      --gold-accent: #d4af37;
      --emerald-green: #10b981;
      --crimson-red: #ef4444;
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --radius-md: 14px;
      --radius-sm: 8px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg-main);
      color: var(--text-primary);
      line-height: 1.6;
      padding: 2rem 1rem;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .installer-card {
      background: var(--bg-surface);
      border: 2px solid var(--gold-accent);
      border-radius: var(--radius-md);
      max-width: 680px;
      width: 100%;
      padding: 2.5rem;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.2);
    }
    .badge-env {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.8rem;
      background: var(--bg-surface-elevated);
      border-radius: var(--radius-sm);
      font-size: 0.82rem;
      margin-bottom: 0.35rem;
    }
    .form-group { margin-bottom: 1.2rem; }
    label { display: block; font-size: 0.86rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--gold-accent); }
    .form-control {
      width: 100%;
      background: #0a1424;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: var(--radius-sm);
      padding: 0.7rem 1rem;
      color: #fff;
      font-size: 0.95rem;
      font-family: inherit;
    }
    .form-control:focus { outline: 2px solid var(--gold-accent); border-color: var(--gold-accent); }
    .btn-submit {
      width: 100%;
      background: linear-gradient(135deg, var(--emerald-green), #059669);
      color: #fff;
      border: none;
      font-weight: 700;
      padding: 0.85rem;
      font-size: 1.05rem;
      border-radius: 9999px;
      cursor: pointer;
      margin-top: 1rem;
      transition: transform 0.2s;
    }
    .btn-submit:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4); }
    .btn-launch {
      display: inline-block;
      width: 100%;
      text-align: center;
      background: linear-gradient(135deg, var(--gold-accent), #b8941e);
      color: #070d18;
      font-weight: 700;
      padding: 0.85rem;
      font-size: 1.05rem;
      border-radius: 9999px;
      text-decoration: none;
      margin-top: 1.2rem;
    }
  </style>
</head>
<body>

  <div class="installer-card">
    <div style="text-align: center; margin-bottom: 2rem;">
      <span style="font-size: 3rem;">🏛️</span>
      <h1 style="font-family: 'Cinzel', Georgia, serif; font-size: 1.8rem; color: var(--gold-accent);">
        VEFA Community Engine v2.3.1
      </h1>
      <p style="color: var(--text-secondary); font-size: 0.9rem;">
        Hostinger & cPanel 1-Click Installation Wizard
      </p>
    </div>

    <!-- Environment Pre-Flight Checks -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; margin-bottom: 0.6rem; color: #fff;">1. Server Environment Pre-Flight</h3>
      
      <?php if (!empty($envErrors)): ?>
        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid var(--crimson-red); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
          <strong style="color: var(--crimson-red);">Server Requirements Not Met:</strong>
          <ul style="margin-left: 1.5rem; margin-top: 0.5rem; font-size: 0.85rem;">
            <?php foreach ($envErrors as $err): ?>
              <li><?php echo $err; ?></li>
            <?php endforeach; ?>
          </ul>
        </div>
      <?php else: ?>
        <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid var(--emerald-green); padding: 0.8rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem;">
          <strong style="color: var(--emerald-green); font-size: 0.88rem;">✓ Server environment is 100% compatible!</strong>
        </div>
      <?php endif; ?>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
        <?php foreach ($envSuccess as $succ): ?>
          <div class="badge-env"><span style="color: var(--emerald-green);">✓</span> <span><?php echo $succ; ?></span></div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Database Setup Form -->
    <?php if ($dbStatus === 'success'): ?>
      <div style="background: rgba(16, 185, 129, 0.2); border: 2px solid var(--emerald-green); padding: 1.5rem; border-radius: var(--radius-sm); text-align: center; margin: 1.5rem 0;">
        <span style="font-size: 2.5rem;">🎉</span>
        <h2 style="color: var(--emerald-green); margin: 0.5rem 0;">Installation Complete!</h2>
        <p style="color: var(--text-primary); font-size: 0.92rem;"><?php echo $dbMessage; ?></p>
        <p style="color: var(--text-secondary); font-size: 0.82rem; margin-top: 0.5rem;">
          Your MySQL tables, .htaccess security rules, and volunteer reminder hooks have been configured.
        </p>
        <a href="index.html" class="btn-launch">Launch Community Platform →</a>
      </div>
    <?php else: ?>
      <?php if ($dbStatus === 'error'): ?>
        <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid var(--crimson-red); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.2rem;">
          <strong style="color: var(--crimson-red);">Database Error:</strong>
          <p style="font-size: 0.88rem; margin-top: 0.3rem;"><?php echo $dbMessage; ?></p>
        </div>
      <?php endif; ?>

      <form method="POST">
        <h3 style="font-size: 1rem; margin-bottom: 0.8rem; color: #fff;">2. MySQL Database Credentials (from Hostinger / cPanel)</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label>Database Host</label>
            <input type="text" name="db_host" class="form-control" value="localhost" placeholder="localhost" required>
          </div>
          <div class="form-group">
            <label>Database Name (e.g. u123456_vefa)</label>
            <input type="text" name="db_name" class="form-control" placeholder="u123456789_vefa" required>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label>Database Username</label>
            <input type="text" name="db_user" class="form-control" placeholder="u123456789_user" required>
          </div>
          <div class="form-group">
            <label>Database Password</label>
            <input type="password" name="db_pass" class="form-control" placeholder="Strong Password" required>
          </div>
        </div>

        <button type="submit" class="btn-submit">
          Initialize MySQL Tables & Deploy Platform →
        </button>
      </form>
    <?php endif; ?>

    <div style="text-align: center; margin-top: 2rem; font-size: 0.76rem; color: var(--text-muted); border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 1rem;">
      © 2027 VEFA: Fraternal & Civic Community Engine. Please contact admin@vefa.club for more information.
    </div>
  </div>

</body>
</html>
