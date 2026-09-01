<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - MULTI-DATABASE CONNECTOR (MYSQL & SQLITE)
 * =============================================================================
 * File: api/db.php
 * Description: Connects to MySQL/MariaDB with automatic SQLite fallback.
 * 
 * © 2027 VEFA: Fraternal & Civic Community Engine. Contact: admin@vefa.club
 * =============================================================================
 */

function getDBConnection() {
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $db   = getenv('DB_NAME') ?: 'vefa_community_db';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: '';
    $charset = 'utf8mb4';

    // 1. Try MySQL Connection
    try {
        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_TIMEOUT            => 2
        ];
        return new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
        // 2. Graceful Fallback to SQLite (vefa.sqlite)
        try {
            $sqlitePath = dirname(__DIR__) . '/vefa.sqlite';
            $pdo = new PDO("sqlite:" . $sqlitePath);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $pdo;
        } catch (\Exception $sqliteEx) {
            return null;
        }
    }
}
