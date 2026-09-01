<?php
/**
 * API: Tag Sale & Giveaway Exchange Endpoints (v2.2)
 */
require_once __DIR__ . '/db.php';
$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

if (!$pdo) {
    echo json_encode(['status' => 'offline', 'message' => 'Running in zero-database client mode']);
    exit;
}

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM exchange_items WHERE status = 'available' ORDER BY created_at DESC");
    echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['title'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Title is required']);
        exit;
    }

    $id = 'item-' . time() . '-' . rand(100, 999);
    $stmt = $pdo->prepare("INSERT INTO exchange_items 
        (id, title, category, type, price, item_condition, seller_name, seller_contact, pickup_location, description, image_url, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'available')");

    $stmt->execute([
        $id,
        $input['title'],
        $input['category'] ?? 'general',
        $input['type'] ?? 'tag_sale',
        $input['price'] ?? 0.00,
        $input['item_condition'] ?? 'Good',
        $input['seller_name'] ?? 'Lodge Member',
        $input['seller_contact'] ?? '',
        $input['pickup_location'] ?? 'Lodge Main Quarters',
        $input['description'] ?? '',
        $input['image_url'] ?? ''
    ]);

    echo json_encode(['status' => 'success', 'id' => $id, 'message' => 'Listing created']);
    exit;
}
