-- =========================================================
-- Enable required extension for UUID generation
-- =========================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- =========================================================
-- USERS TABLE
-- =========================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


-- =========================================================
-- TASKS TABLE
-- =========================================================
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    -- FK user
    user_id UUID NOT NULL,

    CONSTRAINT fk_tasks_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- =========================================================
-- INDEXES (Performance Boost)
-- =========================================================

-- Index to fetch tasks per user quickly
CREATE INDEX IF NOT EXISTS idx_tasks_user ON tasks(user_id);

-- Index to sort tasks by creation time (common use)
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);

-- Email quick lookup (login request)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
