<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - RSS / JSON SYNDICATION FEED
 * =============================================================================
 * File: api/feed.php
 * =============================================================================
 */

$format = $_GET['format'] ?? 'rss';

if ($format === 'json') {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'title' => 'American Fraternal Lodge No. 100 Feed',
        'items' => [
            ['title' => 'Lodge Stated Meeting', 'date' => '2026-09-01', 'summary' => '1st and 3rd Tuesdays at 7:00 PM.'],
            ['title' => 'Monopoly Tournament', 'date' => '2026-09-03', 'summary' => 'Thursday at 6:30 PM in Social Quarters.']
        ]
    ]);
} else {
    header('Content-Type: application/rss+xml; charset=utf-8');
    echo '<?xml version="1.0" encoding="UTF-8"?>';
    echo '<rss version="2.0"><channel>';
    echo '<title>American Fraternal Lodge No. 100</title>';
    echo '<link>https://communitylodge100.org</link>';
    echo '<description>Lodge Announcements and Community Events</description>';
    echo '<item><title>Lodge Stated Meeting</title><description>1st and 3rd Tuesdays at 7:00 PM.</description></item>';
    echo '</channel></rss>';
}
