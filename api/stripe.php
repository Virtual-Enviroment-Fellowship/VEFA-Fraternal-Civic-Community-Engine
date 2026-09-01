<?php
/**
 * API: Native Stripe Checkout & Payment Handler
 * Handles live $150 hall deposits and auction lot checkouts
 */
header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? 'create_deposit_session';

if ($action === 'create_deposit_session') {
    $clientName = $input['client_name'] ?? 'Lodge Renter';
    $eventDate = $input['event_date'] ?? date('Y-m-d', strtotime('+30 days'));
    $stripeKey = $input['stripe_secret_key'] ?? '';

    // If no live Stripe Secret Key is configured, return demo checkout response
    if (empty($stripeKey)) {
        echo json_encode([
            'status' => 'demo_success',
            'isDemo' => true,
            'amount' => 150.00,
            'currency' => 'USD',
            'message' => '⚠️ [DEMO PLACEHOLDER: Connect your Stripe Secret Key in setup.html for live credit card processing]',
            'sessionId' => 'demo_session_' . time(),
            'checkoutUrl' => '#deposit-confirmed'
        ]);
        exit;
    }

    // Call live Stripe API via cURL
    $ch = curl_init('https://api.stripe.com/v1/checkout/sessions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, $stripeKey . ':');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'payment_method_types' => ['card'],
        'line_items' => [[
            'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                    'name' => "Hall Rental Reservation Deposit ($150 Refundable)",
                    'description' => "Event Date: {$eventDate} • Client: {$clientName}"
                ],
                'unit_amount' => 15000 // $150.00 in cents
            ],
            'quantity' => 1
        ]],
        'mode' => 'payment',
        'success_url' => $input['success_url'] ?? 'https://example.com/#deposit-success',
        'cancel_url' => $input['cancel_url'] ?? 'https://example.com/#deposit-cancelled'
    ]));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $sessionData = json_decode($response, true);
    if ($httpCode === 200 && !empty($sessionData['url'])) {
        echo json_encode([
            'status' => 'success',
            'isDemo' => false,
            'sessionId' => $sessionData['id'],
            'checkoutUrl' => $sessionData['url']
        ]);
    } else {
        http_response_code(400);
        echo json_encode([
            'status' => 'error',
            'message' => $sessionData['error']['message'] ?? 'Stripe error'
        ]);
    }
    exit;
}
