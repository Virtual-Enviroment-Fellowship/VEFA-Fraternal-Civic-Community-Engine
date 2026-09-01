<?php
/**
 * API: Webhook Automation Dispatcher (v2.2)
 */
header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['url'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Webhook URL and payload required']);
    exit;
}

$url = $input['url'];
$payload = $input['payload'] ?? ['content' => 'Lodge Test Ping'];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo json_encode(['status' => 'success', 'http_code' => $httpCode]);
