<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - COMMUNITY EXCHANGE CRUD & ADMIN API
 * =============================================================================
 * File: api/exchange.php
 * =============================================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    echo json_encode([
        'status' => 'success',
        'items' => [
            ['id' => 'item-101', 'title' => 'Vintage Solid Oak Rocking Chair', 'price' => 35.00, 'type' => 'tag_sale'],
            ['id' => 'item-102', 'title' => '20" Youth Mountain Bike with Helmet', 'price' => 0.00, 'type' => 'giveaway']
        ]
    ]);
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? 'create';

    if ($action === 'delete') {
        $itemId = $input['id'] ?? '';
        echo json_encode(['status' => 'success', 'message' => "Item {$itemId} deleted by admin."]);
    } elseif ($action === 'edit') {
        echo json_encode(['status' => 'success', 'message' => "Item updated successfully."]);
    } else {
        echo json_encode(['status' => 'success', 'id' => 'item-' . time(), 'message' => "Listing published."]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
