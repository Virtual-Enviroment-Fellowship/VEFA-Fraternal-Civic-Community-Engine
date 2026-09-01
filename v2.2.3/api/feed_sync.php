<?php
/**
 * API: Incoming RSS / Atom Feed Synchronizer
 * Ingests blog and newsletter posts to populate the live ticker and corkboard
 */
header('Content-Type: application/json; charset=utf-8');

$feedUrl = trim($_GET['url'] ?? '');

if (empty($feedUrl)) {
    // Return sample synced items if no URL is provided
    echo json_encode([
        'status' => 'success',
        'isDemo' => true,
        'message' => '⚠️ [DEMO PLACEHOLDER: Connect your lodge RSS/Substack/Facebook feed in setup.html]',
        'items' => [
            [
                'title' => 'Stated Meeting & Installation Notice',
                'link' => '#',
                'pubDate' => date('M j, Y'),
                'description' => 'Regular stated meeting at 7:00 PM. All members in good standing are welcome.'
            ],
            [
                'title' => 'Veterans Household Kit Packing Session',
                'link' => '#',
                'pubDate' => date('M j, Y', strtotime('-2 days')),
                'description' => 'Assembling 10 complete Welcome Home kits for local veterans this Saturday morning.'
            ]
        ]
    ]);
    exit;
}

$ch = curl_init($feedUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 6);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0 Safari/537.36');
$xmlData = curl_exec($ch);
curl_close($ch);

$items = [];
if (!empty($xmlData)) {
    libxml_use_internal_errors(true);
    $xml = simplexml_load_string($xmlData);
    if ($xml) {
        // RSS 2.0
        if (isset($xml->channel->item)) {
            foreach ($xml->channel->item as $i) {
                $items[] = [
                    'title' => (string)$i->title,
                    'link' => (string)$i->link,
                    'pubDate' => (string)$i->pubDate,
                    'description' => strip_tags((string)$i->description)
                ];
                if (count($items) >= 5) break;
            }
        }
        // Atom
        elseif (isset($xml->entry)) {
            foreach ($xml->entry as $e) {
                $items[] = [
                    'title' => (string)$e->title,
                    'link' => (string)$e->link['href'],
                    'pubDate' => (string)$e->updated,
                    'description' => strip_tags((string)$e->summary ?: (string)$e->content)
                ];
                if (count($items) >= 5) break;
            }
        }
    }
}

echo json_encode(['status' => 'success', 'items' => $items]);
