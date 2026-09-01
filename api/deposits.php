<?php
/**
 * API: Multi-Channel Hall Rental Deposit Handler (v2.2 Finalized)
 * Supports: Stripe, Cash App, Venmo, Chime, Zelle, Check/Cash
 */
require_once __DIR__ . '/db.php';
$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

if (!$pdo) {
    echo json_encode(['status' => 'offline', 'message' => 'Running in zero-database client mode']);
    exit;
}

if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM hall_deposits ORDER BY created_at DESC");
    echo json_encode(['status' => 'success', 'data' => $stmt->fetchAll()]);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || empty($input['client_name']) || empty($input['event_date'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Client name and event date required']);
        exit;
    }

    $id = 'dep-' . time() . '-' . rand(100, 999);
    $paymentMethod = htmlspecialchars($input['payment_method'] ?? 'Stripe Web Card', ENT_QUOTES, 'UTF-8');
    $clientName = htmlspecialchars($input['client_name'], ENT_QUOTES, 'UTF-8');
    $phone = htmlspecialchars($input['phone'] ?? '', ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($input['email'] ?? '', ENT_QUOTES, 'UTF-8');
    $roomSelected = htmlspecialchars($input['room_selected'] ?? 'Grand Ballroom', ENT_QUOTES, 'UTF-8');
    $txRef = htmlspecialchars($input['transaction_reference'] ?? '', ENT_QUOTES, 'UTF-8');

    $stmt = $pdo->prepare("INSERT INTO hall_deposits 
        (id, client_name, phone, email, event_date, room_selected, amount_paid, payment_method, status) 
        VALUES (?, ?, ?, ?, ?, ?, 150.00, ?, 'Deposit Confirmed')");

    $stmt->execute([
        $id,
        $clientName,
        $phone,
        $email,
        $input['event_date'],
        $roomSelected,
        $paymentMethod . ($txRef ? " (Ref: {$txRef})" : "")
    ]);

    echo json_encode([
        'status' => 'success',
        'deposit_id' => $id,
        'amount' => 150.00,
        'payment_method' => $paymentMethod,
        'message' => 'Reservation deposit recorded successfully'
    ]);
    exit;
}
