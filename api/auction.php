<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.3.1) - CHARITY AUCTION BIDDING API
 * =============================================================================
 * File: api/auction.php
 * =============================================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    echo json_encode([
        'status' => 'success',
        'lots' => [
            ['id' => 'auc-201', 'title' => 'County Fair VIP Family Package', 'current_bid' => 285.00, 'bid_count' => 14],
            ['id' => 'auc-202', 'title' => 'Handcrafted Black Walnut Mantle Clock', 'current_bid' => 420.00, 'bid_count' => 19],
            ['id' => 'auc-203', 'title' => 'Archival Historic Main Street Lithograph', 'current_bid' => 195.00, 'bid_count' => 9],
            ['id' => 'auc-204', 'title' => 'Chef\'s 5-Course Banquet Dinner for 8', 'current_bid' => 560.00, 'bid_count' => 22]
        ]
    ]);
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $aucId = $input['id'] ?? '';
    $bidAmount = floatval($input['amount'] ?? 0);
    $bidder = trim($input['bidder'] ?? 'Member');

    echo json_encode([
        'status' => 'success',
        'message' => "Bid of \${$bidAmount} placed on {$aucId} by {$bidder}."
    ]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
