<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - 1-CLICK HOSTINGER & CPANEL AUTO-DEPLOYER
 * =============================================================================
 * File: vefa-deployer.php
 * Description: Automated pre-flight environment checks, 1-click database
 *              initialization from database.sql, and .htaccess generator.
 * 
 * © 2027 VEFA: Fraternal & Civic Community Engine. Contact: admin@vefa.club
 * =============================================================================
 */

$preflight = [
    'php_version' => version_compare(PHP_VERSION, '8.1.0', '>='),
    'pdo_mysql' => extension_loaded('pdo_mysql'),
    'curl' => extension_loaded('curl'),
    'json' => extension_loaded('json'),
    'mbstring' => extension_loaded('mbstring'),
    'writable' => is_writable(__DIR__)
];

$allPassed = !in_array(false, $preflight, true);
$message = '';
$installed = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['install_db'])) {
    $dbHost = trim($_POST['db_host'] ?? 'localhost');
    $dbName = trim($_POST['db_name'] ?? '');
    $dbUser = trim($_POST['db_user'] ?? '');
    $dbPass = trim($_POST['db_pass'] ?? '');

    if (!empty($dbName) && !empty($dbUser)) {
        try {
            $pdo = new PDO("mysql:host={$dbHost}", $dbUser, $dbPass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
            $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
            $pdo->exec("USE `{$dbName}`");

            $sqlFile = __DIR__ . '/database.sql';
            if (file_exists($sqlFile)) {
                $sql = file_get_contents($sqlFile);
                $pdo->exec($sql);
                $installed = true;
                $message = "🎉 Database tables created successfully for {$dbName}!";
            } else {
                $message = "⚠️ database.sql not found. Tables could not be imported.";
            }
        } catch (Exception $e) {
            $message = "❌ Database Error: " . htmlspecialchars($e->getMessage());
        }
    } else {
        $message = "⚠️ Please enter Database Name and Username.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>VEFA 1-Click Deployer (v2.4.0)</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #070d18; color: #f8fafc; padding: 2rem; display: flex; justify-content: center; }
        .box { background: #0f1c30; border: 2px solid #d4af37; border-radius: 16px; max-width: 650px; width: 100%; padding: 2rem; box-shadow: 0 0 30px rgba(212, 175, 55, 0.2); }
        .item { display: flex; justify-content: space-between; padding: 0.6rem 0; border-bottom: 1px solid rgba(212, 175, 55, 0.2); font-size: 0.95rem; }
        .btn { background: #d4af37; color: #070d18; border: none; padding: 0.75rem 1.5rem; border-radius: 9999px; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-block; }
        input { width: 100%; padding: 0.65rem; background: #0a1424; border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; color: #fff; margin-bottom: 1rem; box-sizing: border-box; }
    </style>
</head>
<body>
    <div class="box">
        <h2 style="color:#d4af37; margin-top:0;">🏨 VEFA Platform Auto-Deployer (v2.4.0)</h2>
        <p style="color:#94a3b8; font-size: 0.9rem;">Pre-Flight System Diagnostics for Hostinger, cPanel, CloudPanel & Linux VPS.</p>

        <h3>1. Pre-Flight Environment Checks</h3>
        <div class="item"><span>PHP 8.1+ (Current: <?= PHP_VERSION ?>)</span><span><?= $preflight['php_version'] ? '✅ Passed' : '❌ Failed' ?></span></div>
        <div class="item"><span>PDO MySQL Extension</span><span><?= $preflight['pdo_mysql'] ? '✅ Passed' : '❌ Failed' ?></span></div>
        <div class="item"><span>cURL Extension</span><span><?= $preflight['curl'] ? '✅ Passed' : '❌ Failed' ?></span></div>
        <div class="item"><span>JSON & Mbstring</span><span><?= ($preflight['json'] && $preflight['mbstring']) ? '✅ Passed' : '❌ Failed' ?></span></div>
        <div class="item"><span>Folder Write Permissions</span><span><?= $preflight['writable'] ? '✅ Passed' : '❌ Failed' ?></span></div>

        <?php if ($message): ?>
            <div style="background: rgba(16,185,129,0.15); border: 1px solid #10b981; padding: 1rem; border-radius: 8px; margin: 1.5rem 0;"><?= $message ?></div>
        <?php endif; ?>

        <?php if (!$installed): ?>
            <h3 style="margin-top: 2rem;">2. 1-Click MySQL Table Creator</h3>
            <form method="POST">
                <label style="font-size:0.85rem;">MySQL Host</label>
                <input type="text" name="db_host" value="localhost" required>

                <label style="font-size:0.85rem;">MySQL Database Name</label>
                <input type="text" name="db_name" placeholder="e.g. u123456_vefa" required>

                <label style="font-size:0.85rem;">MySQL Username</label>
                <input type="text" name="db_user" placeholder="e.g. u123456_admin" required>

                <label style="font-size:0.85rem;">MySQL Password</label>
                <input type="password" name="db_pass" placeholder="Database Password">

                <button type="submit" name="install_db" class="btn" style="width:100%;">⚡ Create Tables & Deploy</button>
            </form>
        <?php else: ?>
            <div style="text-align:center; margin-top:2rem;">
                <a href="index.html" class="btn">🚀 Launch Community Platform →</a>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
