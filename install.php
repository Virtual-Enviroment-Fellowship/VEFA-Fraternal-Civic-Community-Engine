<?php
/**
 * 1-Click Database Setup & Diagnostics Wizard (v2.2)
 */
header('Content-Type: text/html; charset=utf-8');

$installed = false;
$error = null;
$messages = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db_host = trim($_POST['db_host'] ?? 'localhost');
    $db_name = trim($_POST['db_name'] ?? '');
    $db_user = trim($_POST['db_user'] ?? '');
    $db_pass = trim($_POST['db_pass'] ?? '');

    try {
        $dsn = "mysql:host={$db_host};dbname={$db_name};charset=utf8mb4";
        $pdo = new PDO($dsn, $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        $messages[] = "✓ Connected to MySQL database '{$db_name}' successfully!";

        $sqlPath = __DIR__ . '/database.sql';
        if (file_exists($sqlPath)) {
            $sql = file_get_contents($sqlPath);
            $pdo->exec($sql);
            $messages[] = "✓ Initialized all database tables from database.sql!";
        }

        $configContent = "<?php\n"
            . "define('DB_HOST', " . var_export($db_host, true) . ");\n"
            . "define('DB_NAME', " . var_export($db_name, true) . ");\n"
            . "define('DB_USER', " . var_export($db_user, true) . ");\n"
            . "define('DB_PASS', " . var_export($db_pass, true) . ");\n";

        if (!is_dir(__DIR__ . '/api')) {
            mkdir(__DIR__ . '/api', 0755, true);
        }
        file_put_contents(__DIR__ . '/api/db_config.php', $configContent);
        $messages[] = "✓ Generated api/db_config.php!";

        $installed = true;
    } catch (PDOException $e) {
        $error = "Database Error: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <title>Fraternal & Civic Platform | 1-Click Database Installer (v2.2)</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    body { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
    .install-box { width: 100%; max-width: 580px; padding: 2.5rem; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); }
  </style>
</head>
<body>
  <div class="install-box">
    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
      <span style="font-size: 2rem;">🐬</span>
      <div>
        <h1 style="font-size: 1.35rem; margin: 0;">1-Click Database Setup</h1>
        <span style="font-size: 0.8rem; color: var(--gold-accent);">Hostinger, cPanel & MySQL Ready (v2.2)</span>
      </div>
    </div>

    <?php if ($installed): ?>
      <div class="glass-card" style="padding: 1.5rem; border-left: 4px solid var(--emerald-green); margin-bottom: 1.5rem;">
        <h3 style="color: var(--emerald-green); margin-bottom: 0.5rem;">Installation Complete!</h3>
        <?php foreach ($messages as $m): ?>
          <p style="font-size: 0.86rem; margin-bottom: 0.25rem;"><?= htmlspecialchars($m) ?></p>
        <?php endforeach; ?>
      </div>
      <a href="index.html" class="btn-primary" style="width: 100%; justify-content: center;">Launch Community Platform →</a>
    <?php else: ?>
      <?php if ($error): ?>
        <div class="glass-card" style="padding: 1rem; border-left: 4px solid var(--crimson-red); margin-bottom: 1.2rem; font-size: 0.85rem; color: var(--crimson-red);">
          <?= htmlspecialchars($error) ?>
        </div>
      <?php endif; ?>

      <form method="POST">
        <div class="form-group">
          <label>Database Host</label>
          <input type="text" name="db_host" class="form-control" value="localhost" required>
        </div>
        <div class="form-group">
          <label>Database Name</label>
          <input type="text" name="db_name" class="form-control" placeholder="e.g. u123456_lodge" required>
        </div>
        <div class="form-group">
          <label>Database Username</label>
          <input type="text" name="db_user" class="form-control" placeholder="e.g. u123456_admin" required>
        </div>
        <div class="form-group">
          <label>Database Password</label>
          <input type="password" name="db_pass" class="form-control">
        </div>
        <button type="submit" class="btn-emerald" style="width: 100%; justify-content: center; margin-top: 1rem;">
          Connect & Initialize Database
        </button>
      </form>
    <?php endif; ?>
  </div>
</body>
</html>
