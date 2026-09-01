-- =============================================================================
-- FRATERNAL & CIVIC COMMUNITY ENGINE (VERSION 2.2 OPEN-SOURCE)
-- DATABASE SCHEMA: MYSQL / MARIADB / SUPABASE POSTGRESQL
-- LICENSE: MIT OPEN SOURCE
-- =============================================================================

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role` VARCHAR(32) NOT NULL DEFAULT 'guest',
  `full_name` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) UNIQUE NOT NULL,
  `phone` VARCHAR(64) DEFAULT NULL,
  `member_number` VARCHAR(64) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `exchange_items` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `type` VARCHAR(32) NOT NULL DEFAULT 'tag_sale',
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `item_condition` VARCHAR(64) DEFAULT 'Good',
  `seller_name` VARCHAR(128) NOT NULL,
  `seller_contact` VARCHAR(128) NOT NULL,
  `pickup_location` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` LONGTEXT DEFAULT NULL,
  `status` VARCHAR(32) NOT NULL DEFAULT 'available',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `auction_items` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `cause` VARCHAR(255) NOT NULL,
  `current_bid` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `starting_bid` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `bid_count` INT NOT NULL DEFAULT 0,
  `highest_bidder` VARCHAR(128) DEFAULT 'Starting Bid',
  `est_value` DECIMAL(10,2) DEFAULT NULL,
  `min_increment` DECIMAL(10,2) NOT NULL DEFAULT 10.00,
  `end_time` DATETIME NOT NULL,
  `image_url` LONGTEXT DEFAULT NULL,
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `hall_deposits` (
  `id` VARCHAR(64) PRIMARY KEY,
  `client_name` VARCHAR(128) NOT NULL,
  `phone` VARCHAR(64) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `event_date` DATE NOT NULL,
  `room_selected` VARCHAR(128) DEFAULT 'Grand Ballroom',
  `amount_paid` DECIMAL(10,2) NOT NULL DEFAULT 150.00,
  `payment_method` VARCHAR(64) DEFAULT 'Web Card Payment',
  `status` VARCHAR(64) NOT NULL DEFAULT 'Deposit Confirmed',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `feed_cache` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `feed_url` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `pub_date` VARCHAR(128) NOT NULL,
  `description` TEXT NOT NULL,
  `cached_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
