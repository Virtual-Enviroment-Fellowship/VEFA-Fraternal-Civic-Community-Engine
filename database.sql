-- =============================================================================
-- VEFA: FRATERNAL & CIVIC COMMUNITY ENGINE (VERSION 2.3.1)
-- Relational Database Schema (MySQL / MariaDB)
-- © 2027 VEFA. Contact: admin@vefa.club
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `vefa_community_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `vefa_community_db`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(64) PRIMARY KEY,
  `email` VARCHAR(191) UNIQUE NOT NULL,
  `full_name` VARCHAR(128) NOT NULL,
  `role` ENUM('guest', 'member', 'gamemaster', 'officer', 'devops') DEFAULT 'guest',
  `phone` VARCHAR(32),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `exchange_items` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `item_type` ENUM('tag_sale', 'giveaway') NOT NULL,
  `price` DECIMAL(10,2) DEFAULT 0.00,
  `description` TEXT NOT NULL,
  `image_url` TEXT,
  `seller_name` VARCHAR(128) NOT NULL,
  `status` ENUM('available', 'claimed', 'sold', 'removed') DEFAULT 'available',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `auction_lots` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `cause` VARCHAR(255) NOT NULL,
  `current_bid` DECIMAL(10,2) NOT NULL,
  `starting_bid` DECIMAL(10,2) NOT NULL,
  `bid_count` INT DEFAULT 0,
  `highest_bidder` VARCHAR(128),
  `end_time` DATETIME NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `tournament_games` (
  `id` VARCHAR(64) PRIMARY KEY,
  `name` VARCHAR(128) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `game_master` VARCHAR(128) NOT NULL,
  `schedule` VARCHAR(128) NOT NULL,
  `season_year` INT DEFAULT 2026,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `hall_deposits` (
  `id` VARCHAR(64) PRIMARY KEY,
  `client_name` VARCHAR(128) NOT NULL,
  `event_date` DATE NOT NULL,
  `payment_method` VARCHAR(64) NOT NULL,
  `amount` DECIMAL(10,2) DEFAULT 150.00,
  `status` ENUM('Pending Review', 'Approved & Date Locked', 'Post-Event Inspected', 'Deposit Refunded') DEFAULT 'Pending Review',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `volunteer_shifts` (
  `id` VARCHAR(64) PRIMARY KEY,
  `title` VARCHAR(128) NOT NULL,
  `shift_date` VARCHAR(128) NOT NULL,
  `needed_volunteers` INT DEFAULT 2,
  `claimed_volunteers` JSON
) ENGINE=InnoDB;
