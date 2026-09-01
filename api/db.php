<?php
/**
 * API: Database Connection Handler (v2.2)
 */
header('Content-Type: application/json; charset=utf-8');

if (file_exists(__DIR__ . '/db_config.php')) {
    require_once __DIR__ . '/db_config.php';
} else {
    defined('DB_HOST') or define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
    defined('DB_NAME') or define('DB_NAME', getenv('DB_NAME') ?: 'fraternal_db');
    defined('DB_USER') or define('DB_USER', getenv('DB_USER') ?: 'root');
    defined('DB_PASS') or define('DB_PASS', getenv('DB_PASS') ?: '');
}

function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        return $pdo;
    } catch (PDOException $e) {
        return null;
    }
}
