-- =============================================================================
-- VEFA: FRATERNAL & CIVIC COMMUNITY ENGINE (VERSION 2.4.0)
-- File: database.sql
-- Relational Schema for MySQL, MariaDB, and SQLite
-- © 2027 VEFA: Fraternal & Civic Community Engine. Contact: admin@vefa.club
-- =============================================================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(191) UNIQUE,
    role ENUM('guest', 'member', 'officer', 'gamemaster', 'devops') DEFAULT 'guest',
    member_number VARCHAR(64) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS hall_deposits (
    id VARCHAR(64) PRIMARY KEY,
    client_name VARCHAR(128) NOT NULL,
    event_date DATE NOT NULL,
    payment_method VARCHAR(64) NOT NULL,
    amount DECIMAL(10,2) DEFAULT 150.00,
    status VARCHAR(64) DEFAULT 'Pending Review',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS exchange_items (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(64) NOT NULL,
    price DECIMAL(10,2) DEFAULT 0.00,
    type VARCHAR(32) DEFAULT 'giveaway',
    seller_name VARCHAR(128),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tournament_games (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    game_master VARCHAR(128) NOT NULL,
    season_year INT DEFAULT 2026,
    rules TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(64) NOT NULL,
    payload TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
