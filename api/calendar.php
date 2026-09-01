<?php
/**
 * API: Live iCal / WebCal (.ics) Calendar Subscription Feed (v2.2)
 */
header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: inline; filename="lodge_events.ics"');

$events = [
    [
        'uid' => 'stated-meeting-1',
        'summary' => '1st Stated Meeting of the Month',
        'desc' => 'Regular fraternal stated meeting at 7:00 PM in the Lodge Quarters.',
        'dtstart' => '20260901T190000',
        'dtend' => '20260901T210000',
        'location' => 'Lodge Main Quarters'
    ],
    [
        'uid' => 'vol-bbq-2',
        'summary' => 'Annual Community Summer BBQ',
        'desc' => 'Lodge volunteer BBQ crew and hospitality for community families.',
        'dtstart' => '20260912T100000',
        'dtend' => '20260912T153000',
        'location' => 'Lodge Grounds'
    ]
];

echo "BEGIN:VCALENDAR\r\n";
echo "VERSION:2.0\r\n";
echo "PRODID:-//Fraternal & Civic Platform//Event Feed v2.2//EN\r\n";
echo "CALSCALE:GREGORIAN\r\n";
echo "METHOD:PUBLISH\r\n";
echo "X-WR-CALNAME:Lodge Events & Stated Meetings\r\n";

foreach ($events as $e) {
    echo "BEGIN:VEVENT\r\n";
    echo "UID:" . $e['uid'] . "@fraternalengine\r\n";
    echo "DTSTAMP:" . gmdate('Ymd\THis\Z') . "\r\n";
    echo "DTSTART:" . $e['dtstart'] . "\r\n";
    echo "DTEND:" . $e['dtend'] . "\r\n";
    echo "SUMMARY:" . $e['summary'] . "\r\n";
    echo "DESCRIPTION:" . $e['desc'] . "\r\n";
    echo "LOCATION:" . $e['location'] . "\r\n";
    echo "STATUS:CONFIRMED\r\n";
    echo "END:VEVENT\r\n";
}

echo "END:VCALENDAR\r\n";
