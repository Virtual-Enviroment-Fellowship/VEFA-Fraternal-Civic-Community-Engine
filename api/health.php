<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - SYSTEM HEALTH & DIAGNOSTICS ENDPOINT
 * =============================================================================
 * File: api/health.php
 * Description: Real-time diagnostics for database, runtime, storage & webhooks.
 * 
 * © 2027 VEFA: Fraternal & Civic Community Engine. Contact: admin@vefa.club
 * =============================================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

require_once 'db.php';

$pdo = getDBConnection();
$dbStatus = ($pdo !== null) ? 'connected' : 'unconfigured_or_fallback';
$dbDriver = ($pdo !== null) ? $pdo->getAttribute(PDO::ATTR_DRIVER_NAME) : 'sqlite_memory';

$writable = is_writable(dirname(__DIR__));

echo json_encode([
    'status' => 'healthy',
    'version' => '2.4.0',
    'platform' => 'VEFA Community Engine',
    'timestamp' => gmdate('Y-m-d\TH:i:s\Z'),
    'php_version' => PHP_VERSION,
    'database' => [
        'status' => $dbStatus,
        'driver' => $dbDriver
    ],
    'storage' => [
        'writable' => $writable
    ],
    'modules' => [
        'twilio_sms' => true,
        'anti_blocker_scraper' => true,
        'stripe_gateway' => true,
        'year_end_eclipse_engine' => true
    ]
]);
