<?php
/**
 * =============================================================================
 * FRATERNAL & CIVIC COMMUNITY ENGINE (VERSION 2.2 OPEN-SOURCE - FINALIZED)
 * =============================================================================
 * API: Safe Asset Proxy & Local Cache Engine
 * Security: SSRF Protection, MIME-type Whitelisting, Security Headers
 * =============================================================================
 */
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

$url = trim($_GET['url'] ?? '');

if (empty($url) || !preg_match('/^https?:\/\//i', $url)) {
    http_response_code(400);
    echo "Invalid image URL format";
    exit;
}

$parsed = parse_url($url);
$host = $parsed['host'] ?? '';

// SECURITY: SSRF Protection
$ip = gethostbyname($host);
if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
    http_response_code(403);
    echo "Blocked: Access to internal IP addresses prohibited";
    exit;
}

$cacheDir = __DIR__ . '/../assets/cache';
if (!is_dir($cacheDir)) {
    mkdir($cacheDir, 0755, true);
}

$hash = md5($url);
$cachedFile = "{$cacheDir}/{$hash}";

if (file_exists($cachedFile) && (time() - filemtime($cachedFile) < 86400 * 7)) {
    $mime = mime_content_type($cachedFile) ?: 'image/jpeg';
    header("Content-Type: {$mime}");
    header("Cache-Control: public, max-age=604800");
    readfile($cachedFile);
    exit;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_MAXREDIRS, 3);
curl_setopt($ch, CURLOPT_TIMEOUT, 6);
curl_setopt($ch, CURLOPT_PROTOCOLS, CURLPROTO_HTTP | CURLPROTO_HTTPS);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0 Safari/537.36');
$data = curl_exec($ch);
$contentType = strtolower(curl_getinfo($ch, CURLINFO_CONTENT_TYPE) ?: '');
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// SECURITY: Whitelist Image Content Types only
$allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon'];
$isAllowedMime = false;

foreach ($allowedMimes as $allowed) {
    if (strpos($contentType, $allowed) !== false) {
        $isAllowedMime = true;
        break;
    }
}

if ($httpCode === 200 && !empty($data) && $isAllowedMime) {
    file_put_contents($cachedFile, $data);
    header("Content-Type: {$contentType}");
    header("Cache-Control: public, max-age=604800");
    echo $data;
} else {
    http_response_code(404);
    echo "Image could not be safely fetched or verified";
}
