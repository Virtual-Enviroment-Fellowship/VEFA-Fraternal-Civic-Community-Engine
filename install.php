<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.3.1) - 1-CLICK MYSQL INSTALLATION WIZARD
 * =============================================================================
 * File: install.php
 * © 2027 VEFA. Contact: admin@vefa.club
 * =============================================================================
 */

$message = '';
$status = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dbHost = trim($_POST['db_host'] ?? 'localhost');
    $dbName = trim($_POST['db_name'] ?? 'vefa_db');
    $dbUser = trim($_POST['db_user'] ?? 'root');
    $dbPass = trim($_POST['db_pass'] ?? '');

    try {
        $pdo = new PDO("mysql:host={$dbHost}", $dbUser, $dbPass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
        $pdo->exec("USE `{$dbName}`;");

        $sql = file_get_contents(__DIR__ . '/database.sql');
        $pdo->exec($sql);

        $status = 'success';
        $message = "Database `{$dbName}` initialized successfully with all tables!";
    } catch (\PDOException $e) {
        $status = 'error';
        $message = "Database connection failed: " . htmlspecialchars($e->getMessage());
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>VEFA 1-Click MySQL Installer (Version 2.3.1)</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    .install-box { max-width: 540px; margin: 3rem auto; padding: 2rem; background: var(--bg-surface); border: 2px solid var(--gold-accent); border-radius: var(--radius-md); }
  </style>
</head>
<body>
  <div class="install-box">
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <span style="font-size: 2.5rem;">🐬</span>
      <h2>VEFA 1-Click Database Installer</h2>
      <p style="color: var(--text-secondary); font-size: 0.88rem;">Initialize MySQL / MariaDB tables for your lodge web platform.</p>
    </div>

    <?php if ($status === 'success'): ?>
      <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid var(--emerald-green); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
        <strong style="color: var(--emerald-green);">✓ <?php echo $message; ?></strong>
      </div>
      <a href="index.html" class="btn-primary" style="width: 100%; justify-content: center;">Launch Web Platform →</a>
    <?php else: ?>
      <?php if ($status === 'error'): ?>
        <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid var(--crimson-red); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
          <strong style="color: var(--crimson-red);">✕ <?php echo $message; ?></strong>
        </div>
      <?php endif; ?>

      <form method="POST">
        <div class="form-group">
          <label>Database Host</label>
          <input type="text" name="db_host" class="form-control" value="localhost" required>
        </div>
        <div class="form-group">
          <label>Database Name</label>
          <input type="text" name="db_name" class="form-control" value="vefa_community_db" required>
        </div>
        <div class="form-group">
          <label>Database Username</label>
          <input type="text" name="db_user" class="form-control" value="root" required>
        </div>
        <div class="form-group">
          <label>Database Password</label>
          <input type="password" name="db_pass" class="form-control" placeholder="Password">
        </div>
        <button type="submit" class="btn-emerald" style="width: 100%; justify-content: center; margin-top: 1rem;">
          Run Database Initialization →
        </button>
      </form>
    <?php endif; ?>

    <div style="text-align: center; margin-top: 1.5rem; font-size: 0.76rem; color: var(--text-muted);">
      © 2027 VEFA: Fraternal & Civic Community Engine. Contact: admin@vefa.club
    </div>
  </div>
</body>
</html>
