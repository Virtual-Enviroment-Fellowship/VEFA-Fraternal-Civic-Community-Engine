<?php
/**
 * API: Authentication & Role Management (v2.2)
 */
require_once __DIR__ . '/db.php';
$pdo = getDBConnection();
$method = $_SERVER['REQUEST_METHOD'];

if (!$pdo) {
    echo json_encode(['status' => 'offline', 'message' => 'Running in zero-database client mode']);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    
    $stmt = $pdo->prepare("SELECT id, role, full_name, email, member_number FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        echo json_encode(['status' => 'success', 'user' => $user]);
    } else {
        echo json_encode(['status' => 'success', 'user' => [
            'role' => 'member',
            'full_name' => 'Brother / Sister Member',
            'member_number' => '100-42'
        ]]);
    }
    exit;
}
