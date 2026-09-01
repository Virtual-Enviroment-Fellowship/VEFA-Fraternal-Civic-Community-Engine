<?php
/**
 * API: Outgoing RSS 2.0 & JSON Feed Syndicator
 * Exports active tag sale listings and auction lots for external websites
 */
$format = strtolower($_GET['format'] ?? 'rss');

$items = [
    [
        'title' => 'Solid Oak Rocking Chair (Tag Sale $35)',
        'link' => 'https://example.com/#exchange',
        'desc' => 'Solid hardwood American rocker with honey gloss finish. 100% proceeds benefit youth sports.',
        'pubDate' => date(DATE_RSS)
    ],
    [
        'title' => 'County Fair VIP Family Experience (Charity Auction $275)',
        'link' => 'https://example.com/#auctions',
        'desc' => '4 all-day fair admission passes and grandstand seating benefiting veterans.',
        'pubDate' => date(DATE_RSS, strtotime('-1 day'))
    ]
];

if ($format === 'json') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'title' => 'Lodge Community Exchange & Auctions Feed',
        'home_page_url' => 'https://example.com',
        'items' => $items
    ], JSON_PRETTY_PRINT);
    exit;
}

header('Content-Type: application/rss+xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<rss version="2.0">
  <channel>
    <title>Lodge Community Marketplace & Auctions</title>
    <link>https://example.com</link>
    <description>Live feed of tag sale bargains, giveaways, and charity auctions</description>
    <language>en-us</language>
    <?php foreach ($items as $item): ?>
    <item>
      <title><?= htmlspecialchars($item['title']) ?></title>
      <link><?= htmlspecialchars($item['link']) ?></link>
      <description><?= htmlspecialchars($item['desc']) ?></description>
      <pubDate><?= $item['pubDate'] ?></pubDate>
    </item>
    <?php endforeach; ?>
  </channel>
</rss>
