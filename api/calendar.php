<?php
/**
 * =============================================================================
 * VEFA PLATFORM (v2.4.0) - ICALENDAR FEED & CALENDAR SYNC GENERATOR
 * =============================================================================
 * File: api/calendar.php
 * =============================================================================
 */

header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: inline; filename="lodge_events.ics"');

echo "BEGIN:VCALENDAR\r\n";
echo "VERSION:2.0\r\n";
echo "PRODID:-//VEFA//Fraternal Community Platform v2.4.0//EN\r\n";
echo "CALSCALE:GREGORIAN\r\n";
echo "METHOD:PUBLISH\r\n";
echo "X-WR-CALNAME:Lodge Stated Meetings & Tournaments\r\n";
echo "X-WR-TIMEZONE:America/New_York\r\n";

// Meeting Event
echo "BEGIN:VEVENT\r\n";
echo "UID:event-meeting-100@vefa.club\r\n";
echo "DTSTAMP:" . gmdate('Ymd\THis\Z') . "\r\n";
echo "DTSTART:20260901T190000\r\n";
echo "SUMMARY:Lodge Stated Meeting & Committee Reports\r\n";
echo "DESCRIPTION:Regular business meeting of the lodge.\r\n";
echo "LOCATION:Lodge Social Quarters & Hall, 100 Main St\r\n";
echo "END:VEVENT\r\n";

// Monopoly Tournament
echo "BEGIN:VEVENT\r\n";
echo "UID:event-monopoly-100@vefa.club\r\n";
echo "DTSTAMP:" . gmdate('Ymd\THis\Z') . "\r\n";
echo "DTSTART:20260903T183000\r\n";
echo "SUMMARY:Classic Monopoly Championship (Game Master Dave)\r\n";
echo "DESCRIPTION:4-Player Table Bracket Tournament.\r\n";
echo "LOCATION:Lodge Social Quarters\r\n";
echo "END:VEVENT\r\n";

echo "END:VCALENDAR\r\n";
