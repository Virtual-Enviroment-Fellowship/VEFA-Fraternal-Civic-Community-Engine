<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.3.1) - IMAGE PROXY WITH MIME WHITELIST
 * =============================================================================
 * File: api/proxy.php
 * =============================================================================
 */

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

$url = trim($_GET['url'] ?? '');

if (empty($url) || !filter_var($url, FILTER_VALIDATE_URL)) {
    http_response_code(400);
    exit('Invalid image URL');
}

$parsed = parse_url($url);
$host = $parsed['host'] ?? '';
$ip = gethostbyname($host);

if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
    http_response_code(403);
    exit('SSRF Blocked');
}

$allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_USERAGENT => 'VEFA-Community-Proxy/2.3.1'
]);
$data = curl_exec($ch);
$mime = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

if (in_array(strtolower(explode(';', $mime)[0]), $allowedMimes)) {
    header("Content-Type: {$mime}");
    echo $data;
} else {
    http_response_code(415);
    exit('Unsupported Media Type');
}
