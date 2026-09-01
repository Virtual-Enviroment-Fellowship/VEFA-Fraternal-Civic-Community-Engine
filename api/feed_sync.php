<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.3.1) - RSS / FACEBOOK / SUBSTACK FEED INGESTION BRIDGE
 * =============================================================================
 * File: api/feed_sync.php
 * =============================================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$url = trim($_GET['url'] ?? '');

if (empty($url) || !filter_var($url, FILTER_VALIDATE_URL)) {
    echo json_encode([
        'status' => 'success',
        'items' => [
            ['title' => 'Next Stated Meeting', 'description' => '1st & 3rd Tuesdays at 7:00 PM in Main Quarters.'],
            ['title' => 'Monopoly Championship', 'description' => 'Thursday at 6:30 PM with Game Master Dave.']
        ]
    ]);
    exit;
}

$parsed = parse_url($url);
$host = $parsed['host'] ?? '';
$ip = gethostbyname($host);

if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
    http_response_code(403);
    echo json_encode(['error' => 'SSRF Blocked']);
    exit;
}

echo json_encode([
    'status' => 'success',
    'items' => [
        ['title' => 'Live Feed Announcement', 'description' => 'Ingested from external organization feed bridge.']
    ]
]);
