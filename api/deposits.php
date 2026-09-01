<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - MULTI-PAYMENT DEPOSIT LEDGER & CONTRACT API
 * =============================================================================
 * File: api/deposits.php
 * =============================================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $action = $_GET['action'] ?? 'list';
    
    if ($action === 'contract') {
        $id = $_GET['id'] ?? 'dep-101';
        echo json_encode([
            'status' => 'success',
            'deposit_id' => $id,
            'amount' => 150.00,
            'contract_url' => "deposits.php?view=html&id={$id}",
            'terms' => 'Deposit confirms date and guarantees adherence to facility rules. 100% refundable upon steward inspection.'
        ]);
        exit;
    }

    echo json_encode([
        'status' => 'success',
        'deposits' => [
            [
                'id' => 'dep-101',
                'client_name' => 'Sarah Jenkins',
                'event_date' => '2026-10-24',
                'payment_method' => 'STRIPE',
                'amount' => 150.00,
                'status' => 'Approved & Date Locked',
                'created_at' => '2026-08-30T14:20:00Z'
            ],
            [
                'id' => 'dep-102',
                'client_name' => 'Robert Hayes',
                'event_date' => '2026-11-14',
                'payment_method' => 'CASHAPP ($cashtag)',
                'amount' => 150.00,
                'status' => 'Pending Review',
                'created_at' => '2026-08-31T09:15:00Z'
            ]
        ]
    ]);
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $clientName = trim($input['client_name'] ?? '');
    $eventDate = trim($input['event_date'] ?? '');
    $paymentMethod = strtoupper(trim($input['payment_method'] ?? 'STRIPE'));
    $amount = 150.00;

    if (empty($clientName) || empty($eventDate)) {
        http_response_code(400);
        echo json_encode(['error' => 'client_name and event_date are required.']);
        exit;
    }

    $id = 'dep-' . bin2hex(random_bytes(6));
    echo json_encode([
        'status' => 'success',
        'deposit_id' => $id,
        'amount' => $amount,
        'currency' => 'USD',
        'payment_method' => $paymentMethod,
        'status_note' => 'Deposit recorded and locked for steward inspection.'
    ]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
