<?php
/**
 * =============================================================================
 * FRATERNAL & CIVIC COMMUNITY ENGINE (VERSION 2.2 OPEN-SOURCE - FINALIZED)
 * =============================================================================
 * API: 2026 Anti-Blocker Resilient Asset & Metadata Scraper
 * Security: SSRF Protection, IP Whitelist Filter, Output Sanitization
 * =============================================================================
 */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');

$input = json_decode(file_get_contents('php://input'), true);
$targetUrl = trim($input['url'] ?? ($_GET['url'] ?? ''));

if (empty($targetUrl)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Target URL is required']);
    exit;
}

if (!preg_match('/^https?:\/\//i', $targetUrl)) {
    $targetUrl = 'https://' . $targetUrl;
}

$parsedUrl = parse_url($targetUrl);
$domainHost = $parsedUrl['host'] ?? '';
$scheme = strtolower($parsedUrl['scheme'] ?? 'https');

// SECURITY: Restrict scheme to HTTP / HTTPS only
if ($scheme !== 'http' && $scheme !== 'https') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid URL protocol']);
    exit;
}

// SECURITY: SSRF Protection - Disallow localhost, private subnets & cloud metadata
$resolvedIp = gethostbyname($domainHost);
if (filter_var($resolvedIp, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
    http_response_code(403);
    echo json_encode(['status' => 'error', 'message' => 'Access to internal/private network addresses is blocked for security']);
    exit;
}

$baseUrl = "{$scheme}://{$domainHost}";

$result = [
    'status' => 'success',
    'url' => htmlspecialchars($targetUrl, ENT_QUOTES, 'UTF-8'),
    'title' => '',
    'description' => '',
    'logoUrl' => '',
    'bannerUrl' => '',
    'favicon' => "{$baseUrl}/favicon.ico",
    'source' => 'unknown'
];

/**
 * TIER 1: Modern Chrome 130 Browser Simulation via cURL
 */
function fetchWithModernBrowserHeaders($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_MAXREDIRS, 4);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate, br');
    curl_setopt($ch, CURLOPT_PROTOCOLS, CURLPROTO_HTTP | CURLPROTO_HTTPS);
    
    $headers = [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language: en-US,en;q=0.9',
        'Sec-Ch-Ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        'Sec-Ch-Ua-Mobile: ?0',
        'Sec-Ch-Ua-Platform: "Windows"',
        'Sec-Fetch-Dest: document',
        'Sec-Fetch-Mode: navigate',
        'Sec-Fetch-Site: none',
        'Sec-Fetch-User: ?1',
        'Upgrade-Insecure-Requests: 1'
    ];
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $html = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return ['code' => $httpCode, 'html' => $html];
}

$tier1 = fetchWithModernBrowserHeaders($targetUrl);

if ($tier1['code'] === 200 && !empty($tier1['html'])) {
    $html = $tier1['html'];
    $result['source'] = 'tier1_direct_html';

    if (preg_match('/<meta[^>]*property=["\']og:title["\'][^>]*content=["\']([^"\']+)["\']/i', $html, $m)) {
        $result['title'] = htmlspecialchars(html_entity_decode($m[1], ENT_QUOTES, 'UTF-8'), ENT_QUOTES, 'UTF-8');
    } elseif (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $m)) {
        $result['title'] = htmlspecialchars(trim(strip_tags(html_entity_decode($m[1], ENT_QUOTES, 'UTF-8'))), ENT_QUOTES, 'UTF-8');
    }

    if (preg_match('/<meta[^>]*property=["\']og:description["\'][^>]*content=["\']([^"\']+)["\']/i', $html, $m)) {
        $result['description'] = htmlspecialchars(html_entity_decode($m[1], ENT_QUOTES, 'UTF-8'), ENT_QUOTES, 'UTF-8');
    } elseif (preg_match('/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']/i', $html, $m)) {
        $result['description'] = htmlspecialchars(html_entity_decode($m[1], ENT_QUOTES, 'UTF-8'), ENT_QUOTES, 'UTF-8');
    }

    if (preg_match('/<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']/i', $html, $m)) {
        $img = $m[1];
        if (preg_match('/^\/\//', $img)) $img = 'https:' . $img;
        elseif (preg_match('/^\//', $img)) $img = $baseUrl . $img;
        $result['bannerUrl'] = htmlspecialchars($img, ENT_QUOTES, 'UTF-8');
        $result['logoUrl'] = htmlspecialchars($img, ENT_QUOTES, 'UTF-8');
    }

    if (preg_match('/<link[^>]*rel=["\']apple-touch-icon["\'][^>]*href=["\']([^"\']+)["\']/i', $html, $m)) {
        $icon = $m[1];
        if (preg_match('/^\/\//', $icon)) $icon = 'https:' . $icon;
        elseif (preg_match('/^\//', $icon)) $icon = $baseUrl . $icon;
        $result['logoUrl'] = htmlspecialchars($icon, ENT_QUOTES, 'UTF-8');
    }
}

/**
 * TIER 2: Whitelisted oEmbed Fallback
 */
if (empty($result['title']) || empty($result['logoUrl'])) {
    $oembedUrl = "https://iframe.ly/api/oembed?url=" . urlencode($targetUrl) . "&api_key=public";
    $oembedJson = @file_get_contents($oembedUrl);
    if ($oembedJson) {
        $data = json_decode($oembedJson, true);
        if ($data && !empty($data['title'])) {
            $result['source'] = 'tier2_oembed';
            $result['title'] = $result['title'] ?: htmlspecialchars($data['title'], ENT_QUOTES, 'UTF-8');
            $result['description'] = $result['description'] ?: htmlspecialchars($data['description'] ?? '', ENT_QUOTES, 'UTF-8');
            $result['bannerUrl'] = $result['bannerUrl'] ?: htmlspecialchars($data['thumbnail_url'] ?? '', ENT_QUOTES, 'UTF-8');
            $result['logoUrl'] = $result['logoUrl'] ?: htmlspecialchars($data['thumbnail_url'] ?? '', ENT_QUOTES, 'UTF-8');
        }
    }
}

/**
 * TIER 3: Direct Asset Probing
 */
if (empty($result['logoUrl'])) {
    $testIcons = [
        "{$baseUrl}/apple-touch-icon.png",
        "{$baseUrl}/assets/logo.png",
        "{$baseUrl}/favicon.ico"
    ];
    foreach ($testIcons as $iconPath) {
        $headers = @get_headers($iconPath);
        if ($headers && strpos($headers[0], '200') !== false) {
            $result['logoUrl'] = htmlspecialchars($iconPath, ENT_QUOTES, 'UTF-8');
            break;
        }
    }
}

if (empty($result['title'])) {
    $result['title'] = ucfirst(htmlspecialchars(str_replace(['www.', '.org', '.com', '.net'], '', $domainHost), ENT_QUOTES, 'UTF-8'));
}

echo json_encode($result);
