<?php
/**
 * API: Charity Auction & Live Bidding Endpoints (v2.2)
 */
require_once __DIR__ . '/db.php';
$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

if (!$pdo) {
    echo json_encode(['status' => 'offline', 'message' => 'Running in zero-database client mode']);
    exit;
}

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM auction_items ORDER BY created_at DESC");
    echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? 'bid';

    if ($action === 'bid') {
        $aucId = $input['auction_id'] ?? '';
        $amount = floatval($input['amount'] ?? 0);
        $bidder = $input['bidder_name'] ?? 'Anonymous';

        $stmt = $pdo->prepare("SELECT * FROM auction_items WHERE id = ?");
        $stmt->execute([$aucId]);
        $auc = $stmt->fetch();

        if ($auc && $amount > $auc['current_bid']) {
            $upd = $pdo->prepare("UPDATE auction_items SET current_bid = ?, highest_bidder = ?, bid_count = bid_count + 1 WHERE id = ?");
            $upd->execute([$amount, $bidder, $aucId]);
            echo json_encode(['status' => 'success', 'message' => 'Bid accepted', 'current_bid' => $amount]);
        } else {
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'Bid must exceed current highest bid']);
        }
        exit;
    }
}
