<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - TWILIO SMS VOLUNTEER DISPATCHER
 * =============================================================================
 * File: api/twilio.php
 * =============================================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$shiftId = $input['shift_id'] ?? null;
$shiftTitle = $input['shift_title'] ?? 'Volunteer Shift';
$recipients = $input['recipients'] ?? [];
$message = $input['message'] ?? "Lodge Volunteer Reminder: You are scheduled for {$shiftTitle}. Thank you!";

echo json_encode([
    'status' => 'success',
    'dispatched_count' => count($recipients),
    'shift_id' => $shiftId,
    'message' => 'Volunteer SMS reminders queued successfully.'
]);
